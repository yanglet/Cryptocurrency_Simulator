package com.project.cs.order.repository;

import com.project.cs.member.entity.Member;
import com.project.cs.order.entity.Order;

import java.util.List;

public interface OrderRepositoryCustom {
    Order findByIdFetch(Long orderId);
    List<Order> findByMemberAndStatus(Member member, String status);
    List<Order> findByMemberAndStatusAndNoticeYn(Member member);
}
