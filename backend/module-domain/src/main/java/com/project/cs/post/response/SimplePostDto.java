package com.project.cs.post.response;

import com.project.cs.comment.response.CommentDto;
import com.project.cs.member.response.MemberDto;
import com.project.cs.post.entity.Post;
import com.project.cs.post.entity.UploadFile;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SimplePostDto {
    private Long id;
    private String title;
    private String content;
    private MemberDto member;

    public SimplePostDto(Post post) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.member = new MemberDto(post.getMember());
    }
}
