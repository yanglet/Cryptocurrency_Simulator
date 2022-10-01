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
    private final CryptocurrencyRepository cryptocurrencyRepository;
    private final OrderItemService orderItemService;

    // 주문
    public OrderResponse order(OrderRequest orderRequest, Member member){
        // if 시장가 주문 -> 바로 체결 -> completeOrder
        // completeOrder 밑의 로직 두개가 completeOrder 안에 있음
        // 매도의 경우는 체결시 orderItem 삭제
        // 매수의 경우는 체결시 orderItem 저장

        // if 지정가 주문 -> order 저장만 -> saveOrder
        // 매도 매수 관계없이 order 저장
        if(ORDER_TYPE_LIMIT.equals(orderRequest.getOrdType())){ // 지정가
            return saveOrder(orderRequest, member);
        }else {
            CryptocurrencyDto cryptocurrency = cryptocurrencyRepository.findByMarket(orderRequest.getMarket());

            if(ORDER_TYPE_MARKET.equals(orderRequest.getOrdType())){ // 시장가 매도

            }else if(ORDER_TYPE_PRICE.equals(orderRequest.getOrdType())){ // 시장가 매수

            }
        }
        return null;
    }

    // 주문 저장
    public OrderResponse saveOrder(OrderRequest orderRequest, Member member){
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

        return new OrderResponse(orderRepository.save(order).getId());
    }

    // 주문 체결
    // 매도의 경우는 orderItem을 삭제하는 로직
    // 매수의 경우는 orderItem을 저장하는 로직
    public void completeOrder(Order order){
        order.changeStatus(ORDER_STATUS_COMPLETE);

        if(TYPE_ASK.equals(order.getType())){ // 매도
            orderItemService.deleteOrderItem(order);
        }else if(TYPE_BID.equals(order.getType())) { // 매수
            orderItemService.saveOrderItem(order);
        }
    }

    public void cancelOrder(){

    }
}
