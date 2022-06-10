package com.project.cs.post.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;

@Getter
@Embeddable
@NoArgsConstructor
public class UploadFile {
    private String originalFileName;
    private String savedFileName;

    public UploadFile(String originalFileName, String savedFileName) {
        this.originalFileName = originalFileName;
        this.savedFileName = savedFileName;
    }
}
