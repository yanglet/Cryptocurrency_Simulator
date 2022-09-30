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

import static com.project.cs.order.service.OrderStatusConstants.*;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final CryptocurrencyRepository cryptocurrencyRepository;

    // 주문
    public OrderResponse order(OrderRequest orderRequest, Member member){
        // if 시장가 주문 -> 바로 체결 -> completeOrder
        // completeOrder 밑의 로직 두개가 completeOrder 안에 있음
        // 매도의 경우는 체결시 orderItem 삭제
        // 매수의 경우는 체결시 orderItem 저장

        // if 지정가 주문 -> order 저장만 -> saveOrder
        // 매도 매수 관계없이 order 저장
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
                .status(orderRequest.getStatus())
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

        OrderItem orderItem = OrderItem.builder()
                .koreanName(order.getKoreanName())
                .englishName(order.getEnglishName())
                .market(order.getMarket())
                .type(order.getType())
                .ordType(order.getOrdType())
                .price(order.getPrice())
                .volume(order.getVolume())
                .member(order.getMember())
                .order(order)
                .build();

        orderItemRepository.save(orderItem);
    }
}
