package com.project.cs.post.repository;

import com.project.cs.post.entity.Post;
import com.project.cs.post.entity.UploadFile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UploadFileRepository extends JpaRepository<UploadFile, Long>, UploadFileRepositoryCustom {
    List<UploadFile> findByPost(Post post);
    boolean existsByPost(Post post);
}
