package com.project.cs.post.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.project.cs.post.entity.UploadFile;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Setter
public class UploadFileDto {
    private Long id;
    private String originalFileName;
    private String savedFileName;
    @JsonFormat(pattern = "yyyy년 MM월 dd일")
    private LocalDateTime createdTime;
    @JsonFormat(pattern = "yyyy년 MM월 dd일")
    private LocalDateTime modifiedTime;

    public UploadFileDto(UploadFile uploadFile) {
        this.id = uploadFile.getId();
        this.originalFileName = uploadFile.getOriginalFileName();
        this.savedFileName = uploadFile.getSavedFileName();
        this.createdTime = uploadFile.getCreateTime();
        this.modifiedTime = uploadFile.getModifiedTime();
    }
}
