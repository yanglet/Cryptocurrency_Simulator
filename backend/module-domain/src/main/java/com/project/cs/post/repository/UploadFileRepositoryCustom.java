package com.project.cs.post.repository;

import com.project.cs.post.entity.UploadFile;

import java.util.List;

public interface UploadFileRepositoryCustom {
    List<UploadFile> findAllFetch();
}
