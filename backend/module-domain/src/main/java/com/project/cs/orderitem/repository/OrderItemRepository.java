package com.project.cs.orderitem.repository;

import com.project.cs.member.entity.Member;
import com.project.cs.order.entity.Order;
import com.project.cs.orderitem.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    void deleteByOrder(Order order);
    boolean existsByMemberAndMarket(Member member, String market);
}