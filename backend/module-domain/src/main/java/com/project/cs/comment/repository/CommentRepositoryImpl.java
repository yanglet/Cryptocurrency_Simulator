package com.project.cs.comment.repository;

import com.project.cs.comment.entity.Comment;
import com.project.cs.comment.entity.QComment;
import com.project.cs.member.entity.QMember;
import com.project.cs.post.repository.PostRepository;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.project.cs.comment.entity.QComment.*;
import static com.project.cs.member.entity.QMember.*;

@RequiredArgsConstructor
public class CommentRepositoryImpl implements CommentRepositoryCustom{
    private final JPAQueryFactory queryFactory;

    @Override
    public List<Comment> findByPostId(Long postId) {
        return queryFactory.selectFrom(comment)
                .leftJoin(comment.member, member).fetchJoin()
                .where(comment.post.id.eq(postId))
                .fetch();
    }
}
