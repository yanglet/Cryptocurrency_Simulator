package com.project.cs.post.repository;

import com.project.cs.post.entity.UploadFile;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.project.cs.post.entity.QPost.post;
import static com.project.cs.post.entity.QUploadFile.uploadFile;

@RequiredArgsConstructor
public class UploadFileRepositoryImpl implements UploadFileRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<UploadFile> findAllFetch() {
        return queryFactory.selectFrom(uploadFile)
                .leftJoin(uploadFile.post, post).fetchJoin()
                .fetch();
    }
}
