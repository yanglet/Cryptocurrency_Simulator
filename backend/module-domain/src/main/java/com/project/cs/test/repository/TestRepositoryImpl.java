package com.project.cs.test.repository;

import com.project.cs.test.entity.Test;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import static com.project.cs.test.entity.QTest.test;

@RequiredArgsConstructor
public class TestRepositoryImpl implements TestRepositoryCustom{
    private final JPAQueryFactory queryFactory;

    @Override
    public Test findByTime(String time) {
        return queryFactory.selectFrom(test)
                .where( test.time.contains(getTestTIme(time)) )
                .fetchOne();
    }

    // yyyy-mm-dd ... 형식에서 yyyy-mm만 가져옴
    private String getTestTIme(String time){
        String[] split = time.split("-");
        return split[0] + "-" + split[1];
    }
}
