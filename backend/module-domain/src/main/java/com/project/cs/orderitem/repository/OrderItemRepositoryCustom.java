package com.project.cs.orderitem.repository;

import com.project.cs.member.entity.Member;
import com.project.cs.order.entity.Order;
import com.project.cs.orderitem.entity.OrderItem;

import java.util.List;

public interface OrderItemRepositoryCustom {
    List<OrderItem> findByMember(Member member);
    OrderItem findByOrder(Order order);
    List<OrderItem> findByTargetYn(boolean targetYn);
    OrderItem findByIdFetch(Long id);
}
