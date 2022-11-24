package com.project.cs.orderitem.repository;

import com.project.cs.member.entity.Member;
import com.project.cs.member.entity.QMember;
import com.project.cs.order.entity.Order;
import com.project.cs.order.entity.QOrder;
import com.project.cs.orderitem.entity.OrderItem;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.project.cs.orderitem.entity.QOrderItem.orderItem;

@RequiredArgsConstructor
public class OrderItemRepositoryImpl implements OrderItemRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<OrderItem> findByMember(Member member) {
        return queryFactory.selectFrom(orderItem)
                .leftJoin(orderItem.member, QMember.member).fetchJoin()
                .leftJoin(orderItem.order, QOrder.order).fetchJoin()
                .where(orderItem.member.eq(member))
                .fetch();
    }

    @Override
    public OrderItem findByOrder(Order order) {
        return queryFactory.selectFrom(orderItem)
                .leftJoin(orderItem.member, QMember.member).fetchJoin()
                .leftJoin(orderItem.order, QOrder.order).fetchJoin()
                .where(orderItem.order.eq(order))
                .fetchOne();
    }

    @Override
    public List<OrderItem> findByTargetYn(boolean targetYn) {
        return queryFactory.selectFrom(orderItem)
                .leftJoin(orderItem.member, QMember.member).fetchJoin()
                .leftJoin(orderItem.order, QOrder.order).fetchJoin()
                .where(orderItem.order.targetYn.eq(targetYn))
                .fetch();
    }

    @Override
    public OrderItem findByIdFetch(Long id) {
        return queryFactory.selectFrom(orderItem)
                .leftJoin(orderItem.member, QMember.member).fetchJoin()
                .leftJoin(orderItem.order, QOrder.order).fetchJoin()
                .where(orderItem.id.eq(id))
                .fetchOne();
    }
}
