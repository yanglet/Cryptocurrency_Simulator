package com.project.cs.post.repository;

import com.project.cs.post.entity.Post;

import java.util.List;

public interface PostRepositoryCustom {
    Post findByIdFetch(Long id);
    List<Post> findAllFetch();
}
