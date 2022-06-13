package com.project.cs.comment.repository;

import com.project.cs.comment.entity.Comment;

import java.util.List;

public interface CommentRepositoryCustom {
    List<Comment> findByPostId(Long postId);
}
