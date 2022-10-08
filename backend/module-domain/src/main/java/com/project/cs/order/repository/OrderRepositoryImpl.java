package com.project.cs.order.repository;

import com.project.cs.member.entity.Member;
import com.project.cs.member.entity.QMember;
import com.project.cs.order.entity.Order;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.project.cs.member.entity.QMember.member;
import static com.project.cs.order.entity.QOrder.order;

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

    @Override
    public List<Order> findByMemberAndStatusAndNoticeYn(Member member) {
        return queryFactory.selectFrom(order)
                .leftJoin(order.member, QMember.member).fetchJoin()
                .where(
                        order.member.eq(member),
                        order.status.eq("complete"),
                        order.noticeYn.eq(false)
                )
                .fetch();
    }
}
