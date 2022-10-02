package com.project.cs.order.repository;

import com.project.cs.member.entity.Member;
import com.project.cs.member.entity.QMember;
import com.project.cs.order.entity.Order;
import com.project.cs.order.entity.QOrder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.project.cs.member.entity.QMember.*;
import static com.project.cs.member.entity.QMember.member;
import static com.project.cs.order.entity.QOrder.*;

@RequiredArgsConstructor
public class OrderRepositoryImpl implements OrderRepositoryCustom{
    private final JPAQueryFactory queryFactory;

    @Override
    public Order findByIdFetch(Long orderId) {
        return queryFactory.selectFrom(order)
                .leftJoin(order.member, member).fetchJoin()
                .where(order.id.eq(orderId))
                .fetchOne();
    }

    @Override
    public List<Order> findByMemberAndStatus(Member member, String status) {
        return queryFactory.selectFrom(order)
                .where(order.member.eq(member), order.status.eq(status))
                .fetch();
    }
}
