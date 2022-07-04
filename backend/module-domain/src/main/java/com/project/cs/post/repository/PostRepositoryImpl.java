package com.project.cs.post.repository;

import com.project.cs.comment.entity.QComment;
import com.project.cs.member.entity.QMember;
import com.project.cs.post.entity.Post;
import com.project.cs.post.entity.QPost;
import com.project.cs.ranking.entity.QRanking;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.project.cs.comment.entity.QComment.*;
import static com.project.cs.member.entity.QMember.*;
import static com.project.cs.post.entity.QPost.*;
import static com.project.cs.ranking.entity.QRanking.*;

@RequiredArgsConstructor
public class PostRepositoryImpl implements PostRepositoryCustom{
    private final JPAQueryFactory queryFactory;
    @Override
    public Post findByIdFetch(Long id) {
        return queryFactory.selectFrom(post)
                .leftJoin(post.member, member).fetchJoin()
                .leftJoin(member.ranking, ranking).fetchJoin()
                .leftJoin(post.comments, comment).fetchJoin()
                .leftJoin(comment.member, member).fetchJoin()
                .where(post.id.eq(id))
                .fetchOne();
    }

    @Override
    public List<Post> findAllFetch() {
        return queryFactory.selectFrom(post)
                .leftJoin(post.member, member).fetchJoin()
                .leftJoin(member.ranking, ranking).fetchJoin()
                .orderBy(post.id.desc())
                .fetch();
    }
}
