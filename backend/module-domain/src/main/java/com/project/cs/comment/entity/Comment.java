package com.project.cs.comment.entity;

import com.project.cs.common.entity.BaseEntity;
import com.project.cs.member.entity.Member;
import com.project.cs.post.entity.Post;
import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Setter(AccessLevel.PRIVATE)
public class Comment extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long id;
    private String content;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    @Builder
    public Comment(String content, Member member, Post post) {
        this.content = content;
        this.member = member;
        this.post = post;
    }

    // 생성 메서드
    public static Comment of(String content, Member member, Post post) {
        Comment comment = new Comment();
        comment.setContent(content);
        comment.setMember(member);
        comment.setPost(post);
        post.getComments().add(comment);

        return comment;
    }

    public void change(String content) {
        this.content = content;
    }
}
