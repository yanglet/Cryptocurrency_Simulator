package com.project.cs.post.request;

import com.project.cs.post.entity.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotEmpty;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostRequest {
    @NotEmpty
    private String title;
    @NotEmpty
    private String content;
    private MultipartFile multipartFile;
}
