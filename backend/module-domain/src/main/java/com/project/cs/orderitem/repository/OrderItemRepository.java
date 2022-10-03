package com.project.cs.orderitem.repository;

import com.project.cs.member.entity.Member;
import com.project.cs.order.entity.Order;
import com.project.cs.orderitem.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long>, OrderItemRepositoryCustom {
    OrderItem findByMemberAndMarket(Member member, String market);
    boolean existsByMemberAndMarket(Member member, String market);
}