package com.project.cs.order.service;

import com.project.cs.cryptocurrency.dto.CryptocurrencyDto;
import com.project.cs.cryptocurrency.repository.CryptocurrencyRepository;
import com.project.cs.member.entity.Member;
import com.project.cs.order.entity.Order;
import com.project.cs.order.repository.OrderRepository;
import com.project.cs.order.request.OrderRequest;
import com.project.cs.order.response.OrderResponse;
import com.project.cs.orderitem.entity.OrderItem;
import com.project.cs.orderitem.repository.OrderItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final CryptocurrencyRepository cryptocurrencyRepository;

    /**
     * 주문
     *
     * 시장가 -> 바로 처리 가능
     *
     * 지정가 -> 가격을 비교해서 가격이 같으면 주문 처리 가능
     *       -> 지정된 가격을 기준으로 계속 데이터를 불러와서 맞는지 확인해야함
     *       -> 사용자가 조금만 있어도 API 호출 제한에 걸림 ,,
     *       API 요청 제한 분당 600회, 초당 10회
     *
     * 생각
     * 1. 메서드가 계속 돌아가도록 해도되나? ( 멀티 쓰레드이기 때문에 괜찮기는 할듯 )
     *  1-1. 그런데 터무니 없는 값을 지정가로 설정해서 몇달이 돌아가도록 된다면? ,,
     * 2. 1초마다 API를 호출해서 처리해도 되나?
     */

    /**
     * 주문 처리 후 수익률, 랭킹이 바뀌는 것이 반영이 되어야함
     * -> 실시간 X, 하루에 한 번
     */
    public OrderResponse order(OrderRequest orderRequest, Member member){
        CryptocurrencyDto cryptocurrencyDto = cryptocurrencyRepository.findByMarket(orderRequest.getMarket());

        OrderItem orderItem = OrderItem.builder()
                .koreanName(cryptocurrencyDto.getKorean_name())
                .englishName(cryptocurrencyDto.getEnglish_name())
                .market(cryptocurrencyDto.getMarket())
                .size(Double.valueOf(orderRequest.getVolume()))
                .price(orderRequest.getPrice())
                .build();

        if( orderRequest.getOrderType().equals("price") ){ // 시장가 주문 - 매수
            Order result = getOrderResult(orderRequest, member, orderItem);
            return new OrderResponse(result.getId());
        }else if( orderRequest.getOrderType().equals("market") ){ // 시장가 주문 - 매도
            Order result = getOrderResult(orderRequest, member, orderItem);
            return new OrderResponse(result.getId());
        }else if( orderRequest.getOrderType().equals("limit") ) { // 지정가 주문
            if( orderRequest.getSide().equals("bid") ){ // 지정가 매수

            }else if( orderRequest.getSide().equals("ask") ) { // 지정가 매도

            }
        }
        return null;
    }

    private Order getOrderResult(OrderRequest orderRequest, Member member, OrderItem orderItem) {
        if(orderRequest.getSide().equals("bid")){
            member.buy(orderRequest.getPrice());
        } else if (orderRequest.getSide().equals("ask")){
            member.sell(orderRequest.getPrice());
        }

        Order order = Order.builder()
                .orderItem(orderItem)
                .member(member)
                .build();

        orderItemRepository.save(orderItem);

        Order result = orderRepository.save(order);

        return result;
    }

}
