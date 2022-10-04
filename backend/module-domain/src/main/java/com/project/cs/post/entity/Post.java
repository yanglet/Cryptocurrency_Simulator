package com.project.cs.post.entity;

import com.project.cs.comment.entity.Comment;
import com.project.cs.common.entity.BaseEntity;
import com.project.cs.member.entity.Member;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Post extends BaseEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Long id;
    private String title;
    private String content;
    @OneToMany(mappedBy = "post")
    private List<Comment> comments = new ArrayList<>();
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder
    public Post(String title, String content, List<Comment> comments, Member member) {
        this.title = title;
        this.content = content;
        this.comments = comments;
        this.member = member;
    }

    public void change(String title, String content){
        this.title = title;
        this.content = content;
    }
}
