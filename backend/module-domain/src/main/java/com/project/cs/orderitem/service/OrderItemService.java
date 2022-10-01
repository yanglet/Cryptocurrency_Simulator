package com.project.cs.orderitem.service;

import com.project.cs.order.entity.Order;
import com.project.cs.orderitem.entity.OrderItem;
import com.project.cs.orderitem.repository.OrderItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderItemService {
    private final OrderItemRepository orderItemRepository;

    public void deleteOrderItem(Order order){
        orderItemRepository.deleteByOrder(order);
    }

    public void saveOrderItem(Order order){
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
