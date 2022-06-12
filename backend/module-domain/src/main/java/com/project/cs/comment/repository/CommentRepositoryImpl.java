package com.project.cs.comment.repository;

import com.project.cs.comment.entity.Comment;
import com.project.cs.comment.entity.QComment;
import com.project.cs.post.repository.PostRepository;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.project.cs.comment.entity.QComment.*;

@RequiredArgsConstructor
public class CommentRepositoryImpl implements CommentRepositoryCustom{
    private final JPAQueryFactory queryFactory;

    @Override
    public List<Comment> findByPostId(Long postId) {
        return queryFactory.selectFrom(comment)
                .where(comment.post.id.eq(postId))
                .fetch();
    }
}
