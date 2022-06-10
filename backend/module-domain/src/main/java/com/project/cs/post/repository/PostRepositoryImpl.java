package com.project.cs.post.repository;

import com.project.cs.comment.entity.QComment;
import com.project.cs.member.entity.QMember;
import com.project.cs.post.entity.Post;
import com.project.cs.post.entity.QPost;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.project.cs.comment.entity.QComment.*;
import static com.project.cs.member.entity.QMember.*;
import static com.project.cs.post.entity.QPost.*;

@RequiredArgsConstructor
public class PostRepositoryImpl implements PostRepositoryCustom{
    private final JPAQueryFactory queryFactory;
    @Override
    public Post findByIdFetch(Long id) {
        return queryFactory.selectFrom(post)
                .leftJoin(post.member, member).fetchJoin()
                .leftJoin(post.comments, comment).fetchJoin()
                .fetchOne();
    }

    @Override
    public List<Post> findAllFetch() {
        return queryFactory.selectFrom(post)
                .leftJoin(post.member, member).fetchJoin()
                .orderBy(post.id.desc())
                .fetch();
    }
}
