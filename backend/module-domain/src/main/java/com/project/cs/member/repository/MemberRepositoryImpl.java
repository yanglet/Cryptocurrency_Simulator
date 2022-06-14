package com.project.cs.member.repository;

import com.project.cs.member.entity.Member;
import com.project.cs.member.entity.QMember;
import com.project.cs.ranking.entity.QRanking;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.project.cs.member.entity.QMember.*;

@RequiredArgsConstructor
public class MemberRepositoryImpl implements MemberRepositoryCustom{
    private final JPAQueryFactory queryFactory;

    @Override
    public List<Member> findAllFetch() {
        return queryFactory.selectFrom(member)
                .leftJoin(member.ranking, QRanking.ranking).fetchJoin()
                .fetch();
    }
}
