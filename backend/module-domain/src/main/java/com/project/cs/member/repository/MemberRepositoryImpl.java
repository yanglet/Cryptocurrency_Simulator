package com.project.cs.member.repository;

import com.project.cs.member.entity.Member;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.project.cs.member.entity.QMember.member;
import static com.project.cs.ranking.entity.QRanking.ranking;

@RequiredArgsConstructor
public class MemberRepositoryImpl implements MemberRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<Member> findAllFetch() {
        return queryFactory.selectFrom(member)
                .leftJoin(member.ranking, ranking).fetchJoin()
                .fetch();
    }

    @Override
    public Member findByIdFetch(Long id) {
        return queryFactory.selectFrom(member)
                .leftJoin(member.ranking, ranking).fetchJoin()
                .where(member.id.eq(id))
                .fetchOne();
    }

    @Override
    public List<Member> findAllFetchByRankings() {
        return queryFactory.selectFrom(member)
                .leftJoin(member.ranking, ranking).fetchJoin()
                .orderBy(member.ranking.rank.asc())
                .fetch();
    }
}
