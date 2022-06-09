package com.project.cs.comment.response;

import com.project.cs.comment.entity.Comment;
import com.project.cs.member.entity.Member;
import com.project.cs.member.response.MemberDto;
import com.project.cs.post.entity.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CommentDto {
    private String content;
    private MemberDto member;

    public CommentDto(Comment comment) {
        this.content = comment.getContent();
        this.member = new MemberDto(comment.getMember());
    }
}
