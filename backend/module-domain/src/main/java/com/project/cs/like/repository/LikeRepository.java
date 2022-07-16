package com.project.cs.like.repository;

import com.project.cs.like.entity.Like;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeRepository extends JpaRepository<Like, Long>, LikeRepositoryCustom {
}
