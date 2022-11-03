package com.project.cs.like.repository;

import com.project.cs.cryptocurrency.feignclient.Market;
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
        List<Like> likes = queryFactory.selectFrom(like)
                .where(like.member.eq(member))
                .fetch();

        likes.sort((o1, o2) -> (int) (Market.getId(o1.getMarket()) - Market.getId(o2.getMarket())));

        return likes;
    }

    @Override
    public Like findByMemberAndMarket(Member member, String market) {
        return queryFactory.selectFrom(like)
                .where(like.member.eq(member)
                        , like.market.eq(market))
                .fetchOne();
    }
}
