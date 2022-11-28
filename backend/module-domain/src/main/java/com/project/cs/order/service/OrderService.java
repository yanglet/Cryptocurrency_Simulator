package com.project.cs.order.service;

import com.project.cs.member.entity.Member;
import com.project.cs.member.exception.InsufficientBalanceException;
import com.project.cs.member.exception.NotLoggedInException;
import com.project.cs.order.entity.Order;
import com.project.cs.order.exception.InsufficientVolumeException;
import com.project.cs.order.repository.OrderRepository;
import com.project.cs.order.request.OrderRequest;
import com.project.cs.order.response.OrderDto;
import com.project.cs.order.response.OrderResponse;
import com.project.cs.orderitem.entity.OrderItem;
import com.project.cs.orderitem.exception.OrderItemNotFoundException;
import com.project.cs.orderitem.repository.OrderItemRepository;
import com.project.cs.orderitem.service.OrderItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

import static com.project.cs.order.service.OrderStatusConstants.*;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final OrderItemService orderItemService;
    private final EntityManager entityManager;

    /**
     * - 주문 -
     *
     * 지정가
     * -> 단순히 주문만 저장하고 끝.
     * -> 배치에서 처리
     * -> 근데 매수의 경우 돈을 미리 빼가고 취소시에 돌려주어야함
     *
     * 시장가
     * 시장가는 주문이 현재의 시세로 들어온다는 가정하에 구현
     * -> 바로 처리할 수 있음.
     * -> completeOrder 호출하기 전에 매도의 경우는 orderItem 이 있는지 확인하는 로직 필요
     * -> orderItem 은 member and market 으로 찾을 수 있음(?)
     * -> completeOrder 호출
     */
    public OrderResponse order(OrderRequest orderRequest, Member member) {
        loginCheck(member);
        if (ORDER_TYPE_LIMIT.equals(orderRequest.getOrdType())) { // 지정가
            if (TYPE_BID.equals(orderRequest.getType())) { // 매수
                /**
                 * entityManager.detach(order) 하는 이유
                 * order 의 member 가 초기화 되지 않은 상태로 order 가 영속 상태이면
                 * 영속성 컨텍스트에 member 가 초기화 되지 않은 order 가 올라가 있으므로
                 * fetch join 을 날려서 가져오려 해도 이미 영속성 컨텍스트에 올라가 있는 order 가 조회됨
                 * 따라서 detach (비영속 상태로 만듦) 해서 fetch join 으로 가져와야
                 * member 가 초기화 된 order 를 가져올 수 있음
                 */
                BigDecimal needBalance = BigDecimal.valueOf(Double.valueOf(orderRequest.getPrice()) * orderRequest.getVolume());
                if (member.getBalance().compareTo(needBalance) < 0) { // 보유 금액 부족
                    throw new InsufficientBalanceException();
                }

                Order order = saveOrder(orderRequest, member);

                entityManager.detach(order);
                orderRepository.findByIdFetch(order.getId())
                        .getMember().buy(order.getPrice(), order.getVolume());

                return new OrderResponse(order.getId());
            } else if (TYPE_ASK.equals(orderRequest.getType())) { // 매도
                if (!orderItemRepository.existsByMemberAndMarket(member, orderRequest.getMarket())) {
                    throw new OrderItemNotFoundException();
                }

                OrderItem orderItem = orderItemRepository.findByMemberAndMarket(member, orderRequest.getMarket());
                if (orderItem.getVolume() - orderRequest.getVolume() < 0) {
                    throw new InsufficientVolumeException();
                }

                Order order = saveOrder(orderRequest, member);

                entityManager.detach(order);

                return new OrderResponse(order.getId());
            }
        } else { // 시장가
            if (ORDER_TYPE_MARKET.equals(orderRequest.getOrdType())) { // 시장가 매도
                if (!orderItemRepository.existsByMemberAndMarket(member, orderRequest.getMarket())) {
                    throw new OrderItemNotFoundException();
                }

                OrderItem orderItem = orderItemRepository.findByMemberAndMarket(member, orderRequest.getMarket());
                if (orderItem.getVolume() - orderRequest.getVolume() < 0) {
                    throw new InsufficientVolumeException();
                }

                Order order = saveOrder(orderRequest, member);
                completeOrder(order);
                return new OrderResponse(order.getId());
            } else if (ORDER_TYPE_PRICE.equals(orderRequest.getOrdType())) { // 시장가 매수
                BigDecimal needBalance = BigDecimal.valueOf(Double.valueOf(orderRequest.getPrice()) * orderRequest.getVolume());
                if (member.getBalance().compareTo(needBalance) < 0) { // 보유 금액 부족
                    throw new InsufficientBalanceException();
                }

                Order order = saveOrder(orderRequest, member);
                completeOrder(order);
                return new OrderResponse(order.getId());
            }
        }

        return null;
    }

    // 주문 저장
    public Order saveOrder(OrderRequest orderRequest, Member member) {
        boolean noticeYn = !ORDER_TYPE_LIMIT.equals(orderRequest.getOrdType()); // 시장가 거래는 알림없음
        boolean targetYn = rangeCheck(orderRequest.getRange());

        Order order = Order.builder()
                .koreanName(orderRequest.getKoreanName())
                .englishName(orderRequest.getEnglishName())
                .market(orderRequest.getMarket())
                .type(orderRequest.getType())
                .ordType(orderRequest.getOrdType())
                .status(ORDER_STATUS_WAIT)
                .price(orderRequest.getPrice())
                .volume(orderRequest.getVolume())
                .noticeYn(noticeYn)
                .targetYn(targetYn)
                .lowerBound(targetYn ? orderRequest.getRange().get(0) : 0)
                .upperBound(targetYn ? orderRequest.getRange().get(1) : 0)
                .member(member)
                .build();

        return orderRepository.save(order);
    }

    /**
     * - 주문 체결 -
     *
     * 매도
     * -> orderItem 을 삭제하고 member 의 보유 금액에 매도된 금액만큼 더해줘야함
     *
     * 매수
     * -> orderItem 을 저장하고 member 의 보유 금액에 매수된 금액만큼 빼줘야함
     */
    public void completeOrder(Order order) {
        /**
         * entityManager.detach(order) 하는 이유
         * order 의 member 가 초기화 되지 않은 상태로 order 가 영속 상태이면
         * 영속성 컨텍스트에 member 가 초기화 되지 않은 order 가 올라가 있으므로
         * fetch join 을 날려서 가져오려 해도 이미 영속성 컨텍스트에 올라가 있는 order 가 조회됨
         * 따라서 detach (비영속 상태로 만듦) 해서 fetch join 으로 가져와야
         * member 가 초기화 된 order 를 가져올 수 있음
         */
        entityManager.detach(order);
        Order fetchOrder = orderRepository.findByIdFetch(order.getId());
        fetchOrder.changeStatus(ORDER_STATUS_COMPLETE);

        if (TYPE_ASK.equals(order.getType())) { // 매도
            fetchOrder.getMember().sell(order.getPrice(), order.getVolume());

            OrderItem orderItem = orderItemRepository.findByMemberAndMarket(order.getMember(), order.getMarket());

            if (orderItem.getVolume() - order.getVolume() > 0) {
                orderItem.change(order.getType(), order.getVolume(), order.getPrice(), fetchOrder);
                return;
            }

            orderItemService.deleteOrderItem(fetchOrder.getMember(), fetchOrder.getMarket());
        } else if (TYPE_BID.equals(order.getType())) { // 매수
            if (!ORDER_TYPE_LIMIT.equals(order.getOrdType())) {
                fetchOrder.getMember().buy(order.getPrice(), order.getVolume());
            }

            if (orderItemRepository.existsByMemberAndMarket(order.getMember(), order.getMarket())) {
                orderItemRepository.findByMemberAndMarket(order.getMember(), order.getMarket())
                        .change(order.getType(), order.getVolume(), order.getPrice(), fetchOrder);
                return;
            }

            orderItemService.saveOrderItem(order);
        }
    }

    /**
     * 목표 수익률에 따른 주문 체결 ( 무조건 시장가 매도만 체결 )
     *
     * 배치에서 orderItem.order.targetYn 이 Y인 애들을 불러와서
     * 목표 수익률에 해당하는 price랑 현재가가 일치한다면 이 함수 호출
     */
    public void completeSecondOrder(OrderItem orderItem, double price, String type) {
        entityManager.detach(orderItem);
        OrderItem fetchOrderItem = orderItemRepository.findByIdFetch(orderItem.getId());

        Order order = Order.builder()
                .koreanName(fetchOrderItem.getKoreanName())
                .englishName(fetchOrderItem.getEnglishName())
                .market(fetchOrderItem.getMarket())
                .type(TYPE_ASK)
                .ordType(ORDER_TYPE_MARKET)
                .status(ORDER_STATUS_COMPLETE)
                .price(String.valueOf(price))
                .volume(fetchOrderItem.getVolume())
                .noticeYn(true)
                .targetYn(false)
                .lowerBound(0)
                .upperBound(0)
                .member(fetchOrderItem.getMember())
                .build();

        orderRepository.save(order);

        fetchOrderItem.getMember().sell(String.valueOf(price), orderItem.getVolume());

        orderItemRepository.delete(orderItem);
    }

    /**
     * - 주문 취소 -
     *
     * -> status 를 취소로 바꿈 & 지정가 매수 주문이었다면 돈을 다시 돌려줘야함
     */
    public void cancelOrder(Long orderId, Member member) {
        loginCheck(member);
        Order order = orderRepository.findByIdFetch(orderId);

        if (order.getStatus().equals(ORDER_STATUS_WAIT)) {
            order.changeStatus(ORDER_STATUS_CANCEL);
        }

        if (TYPE_BID.equals(order.getType())) {
            order.getMember().sell(order.getPrice(), order.getVolume());
        }
    }

    public List<OrderDto> getOrders(Member member, String status) {
        loginCheck(member);

        return orderRepository.findByMemberAndStatus(member, status)
                .stream()
                .map(OrderDto::new)
                .collect(Collectors.toList());
    }

    public List<OrderDto> getNoticeOrders(Member member) {
        loginCheck(member);

        List<Order> orders = orderRepository.findByMemberAndStatusAndNoticeYn(member);
        orders.forEach(Order::changeNoticeYn);

        return orders
                .stream()
                .map(OrderDto::new)
                .collect(Collectors.toList());
    }

    /**
     * orderItem 에 목표 수익률을 체크 했는지 안했는지 type 추가
     * orderItem 에 목표 수익률 두개 upperBound, lowerBound 추가
     * type으로 목표 수익률을 체크한 orderItem 이라면 배치 추가
     * -> 현재가랑 매수 가격이랑 비교해서
     * -> upperBound, lowerBound 의 %에 해당하는 price 인지 확인해서 시장가 매도하는 job
     *
     * 근데 그 이전에 order 가 체결될 때 orderItem이 생성되므로
     * order 도 이에 대한 상태 추가가 필요함.
     *
     * 아니지 orderItem에 order가 들어있으니까 order에만 상태 추가하면 될듯 ?
     *
     * 결과적으로 orderItem 에 upperBound, lowerBound 추가하고
     * order에 목표 수익률 체크했는지에 대한 상태 추가하고
     * orderItem ( order 가 fetch join 된 )를 돌리면서
     * ( orderItem의 order가 목표수익률 체크했는지 보려고 fetch join )
     * 가격이 맞을 때 시장가 매수 때려주는 job만 있으면 된다?
     */

    private boolean rangeCheck(List<Integer> range) {
        if(range.isEmpty() || range.get(0) > 0 || range.get(1) < 0){
            return false;
        }

        return true;
    }

    private String getOrderPrice(String price, Integer profit) {
        Integer result = Integer.valueOf(price) + Integer.valueOf(price) * profit / 100;
        return String.valueOf(result);
    }

    private void loginCheck(Member member) {
        if (member == null) {
            throw new NotLoggedInException();
        }
    }
}
