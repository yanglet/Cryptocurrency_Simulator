package com.project.cs.post.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostSaveRequest {
    private String title;
    private String content;
    private List<MultipartFile> multipartFiles = new ArrayList<>();

    public PostSaveRequest(PostRequest postRequest, List<MultipartFile> multipartFiles) {
        this.title = postRequest.getTitle();
        this.content = postRequest.getContent();
        this.multipartFiles = multipartFiles == null ? new ArrayList<>() : multipartFiles;
    }
}
