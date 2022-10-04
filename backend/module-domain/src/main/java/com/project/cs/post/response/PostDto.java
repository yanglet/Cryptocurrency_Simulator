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
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
public class PostDto {
    private Long id;
    private String title;
    private String content;
    private List<CommentDto> comments = new ArrayList<>();
    private List<UploadFileDto> uploadFiles = new ArrayList<>();
    private String name;
    private String email;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy년 MM월 dd일", timezone = "Asia/Seoul")
    private LocalDateTime createTime;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy년 MM월 dd일", timezone = "Asia/Seoul")
    private LocalDateTime modifiedTime;

    public PostDto(Post post, List<UploadFile> uploadFiles) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        // lazyinitializationexception 주의하자
        this.comments = post.getComments() == null ? new ArrayList<>() :
                post.getComments()
                .stream()
                .map(CommentDto::new)
                .collect(Collectors.toList());
        this.uploadFiles = uploadFiles.stream().map(UploadFileDto::new).collect(Collectors.toList());
        this.name = post.getMember().getName();
        this.email = post.getMember().getEmail();
        this.createTime = post.getCreateTime();
        this.modifiedTime = post.getModifiedTime();
    }
}
