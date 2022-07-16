package com.project.cs.like.repository;

import com.project.cs.like.entity.Like;
import com.project.cs.member.entity.Member;
import com.project.cs.member.entity.QMember;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.project.cs.like.entity.QLike.like;

@RequiredArgsConstructor
public class LikeRepositoryImpl implements LikeRepositoryCustom {
    private final JPAQueryFactory queryFactory;
    @Override
    public List<Like> findByMember(Member member) {
        return queryFactory.selectFrom(like)
                .where( QMember.member.eq(member) )
                .fetch();
    }

    @Override
    public Like findByMemberAndMarket(Member member, String market) {
        return queryFactory.selectFrom(like)
                .where( QMember.member.eq(member)
                        ,like.market.eq(market) )
                .fetchOne();
    }
}
