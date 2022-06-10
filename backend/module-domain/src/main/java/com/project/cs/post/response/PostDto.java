package com.project.cs.post.response;

import com.project.cs.comment.response.CommentDto;
import com.project.cs.member.response.MemberDto;
import com.project.cs.post.entity.Post;
import com.project.cs.post.entity.UploadFile;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
public class PostDto {
    private Long id;
    private String title;
    private String content;
    private UploadFile uploadFile;
    private List<CommentDto> comments;
    private MemberDto member;

    public PostDto(Post post) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.uploadFile = post.getUploadFile();
        // lazyinitializationexception 주의하자
        this.comments = post.getComments()
                .stream()
                .map(c -> new CommentDto(c))
                .collect(Collectors.toList());
        this.member = new MemberDto(post.getMember());
    }
}
