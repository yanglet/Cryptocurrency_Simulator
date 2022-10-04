package com.project.cs.post.entity;

import com.project.cs.common.entity.BaseEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "uploadFile")
public class UploadFile extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "uploadFile_id")
    private Long id;
    private String originalFileName;
    private String savedFileName;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    @Builder
    public UploadFile(String originalFileName, String savedFileName, Post post) {
        this.originalFileName = originalFileName;
        this.savedFileName = savedFileName;
        this.post = post;
    }
}
