package com.project.cs.orderitem.service;

import com.project.cs.member.entity.Member;
import com.project.cs.member.repository.MemberRepository;
import com.project.cs.member.response.OMGMemberDto;
import com.project.cs.order.entity.Order;
import com.project.cs.orderitem.entity.OrderItem;
import com.project.cs.orderitem.repository.OrderItemRepository;
import com.project.cs.orderitem.response.Holdings;
import com.project.cs.orderitem.response.OrderItemDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderItemService {
    private final OrderItemRepository orderItemRepository;
    private final MemberRepository memberRepository;

    public Holdings getOrderItems(Member member) {
        List<OrderItem> orderItems = orderItemRepository.findByMember(member);
        BigDecimal totalTradePrice = BigDecimal.valueOf(0);

        for (OrderItem oi : orderItems) {
            totalTradePrice = totalTradePrice.add(new BigDecimal(oi.getPrice()).multiply(BigDecimal.valueOf(oi.getVolume())));
        }

        return new Holdings(new OMGMemberDto(memberRepository.findByIdFetch(member.getId())),
                orderItems.stream()
                        .map(OrderItemDto::new)
                        .collect(Collectors.toList()), totalTradePrice
        );
    }

    public void deleteOrderItem(Member member, String market) {
        OrderItem orderItem = orderItemRepository.findByMemberAndMarket(member, market);
        orderItemRepository.delete(orderItem);
    }

    public void saveOrderItem(Order order) {
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
