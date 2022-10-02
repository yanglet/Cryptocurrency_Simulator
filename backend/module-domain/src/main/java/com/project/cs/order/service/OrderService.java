package com.project.cs.order.service;

import com.project.cs.member.entity.Member;
import com.project.cs.order.entity.Order;
import com.project.cs.order.repository.OrderRepository;
import com.project.cs.order.request.OrderRequest;
import com.project.cs.order.response.OrderResponse;
import com.project.cs.orderitem.repository.OrderItemRepository;
import com.project.cs.orderitem.service.OrderItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.project.cs.order.service.OrderStatusConstants.*;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final OrderItemService orderItemService;

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
        Order order = saveOrder(orderRequest, member);

        if (ORDER_TYPE_LIMIT.equals(orderRequest.getOrdType())) { // 지정가
            if(TYPE_BID.equals(orderRequest.getType())){
                order.getMember().buy(order.getPrice(), order.getVolume());
            }
            return new OrderResponse(order.getId());
        }
        // 시장가
        if (ORDER_TYPE_MARKET.equals(orderRequest.getOrdType())) { // 시장가 매도
            if(!orderItemRepository.existsByMemberAndMarket(member, orderRequest.getMarket())){
                throw new IllegalArgumentException();
            }
            completeOrder(order);
            return new OrderResponse(order.getId());
        } else if (ORDER_TYPE_PRICE.equals(orderRequest.getOrdType())) { // 시장가 매수
            completeOrder(order);
            return new OrderResponse(order.getId());
        }

        return null;
    }

    // 주문 저장
    public Order saveOrder(OrderRequest orderRequest, Member member){
        Order order = Order.builder()
                .koreanName(orderRequest.getKoreanName())
                .englishName(orderRequest.getEnglishName())
                .market(orderRequest.getMarket())
                .type(orderRequest.getType())
                .ordType(orderRequest.getOrdType())
                .status(ORDER_STATUS_WAIT)
                .price(orderRequest.getPrice())
                .volume(orderRequest.getVolume())
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
    public void completeOrder(Order order){ // 여기서의 order 는 전부 초기화 되어 있는 상태의 영속성 상태의 order
        order.changeStatus(ORDER_STATUS_COMPLETE);

        if(TYPE_ASK.equals(order.getType())){ // 매도
            orderItemService.deleteOrderItem(order);
            order.getMember().sell(order.getPrice(), order.getVolume());
        }else if(TYPE_BID.equals(order.getType())) { // 매수
            orderItemService.saveOrderItem(order);
            order.getMember().buy(order.getPrice(), order.getVolume());
        }
    }

    /**
     * - 주문 취소 -
     *
     * -> status 를 취소로 바꿈 & 지정가 매수 주문이었다면 돈을 다시 돌려줘야함
     */
    public void cancelOrder(Long orderId, Member member){
        if(member == null){
            throw new IllegalArgumentException("로그인 후에 이용해주세요.");
        }
        Order order = orderRepository.findById(orderId).orElseThrow();
        order.changeStatus(ORDER_STATUS_CANCEL);

        if(TYPE_BID.equals(order.getType())){
            order.getMember().sell(order.getPrice(), order.getVolume());
        }
    }
}
