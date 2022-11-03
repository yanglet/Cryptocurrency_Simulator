package com.project.cs.comment.repository;

import com.project.cs.comment.entity.Comment;
import com.project.cs.comment.entity.QComment;
import com.project.cs.member.entity.QMember;
import com.project.cs.post.repository.PostRepository;
import com.project.cs.ranking.entity.QRanking;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.project.cs.comment.entity.QComment.*;
import static com.project.cs.member.entity.QMember.*;
import static com.project.cs.ranking.entity.QRanking.*;

@RequiredArgsConstructor
public class CommentRepositoryImpl implements CommentRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<Comment> findByPostId(Long postId) {
        return queryFactory.selectFrom(comment)
                .leftJoin(comment.member, member).fetchJoin()
                .leftJoin(member.ranking, ranking).fetchJoin()
                .where(comment.post.id.eq(postId))
                .fetch();
    }
}
