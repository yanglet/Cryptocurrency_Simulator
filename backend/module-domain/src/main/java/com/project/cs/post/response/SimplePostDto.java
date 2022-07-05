package com.project.cs.post.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.project.cs.comment.response.CommentDto;
import com.project.cs.member.response.MemberDto;
import com.project.cs.post.entity.Post;
import com.project.cs.post.entity.UploadFile;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class SimplePostDto {
    private Long id;
    private String title;
    private String content;
    private String name;
    private String email;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime createTime;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime modifiedTime;

    public SimplePostDto(Post post) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.name = post.getMember().getName();
        this.email = post.getMember().getEmail();
        this.createTime = post.getCreateTime();
        this.modifiedTime = post.getModifiedTime();
    }
}
