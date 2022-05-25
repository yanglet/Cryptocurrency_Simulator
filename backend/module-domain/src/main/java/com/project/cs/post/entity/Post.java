package com.project.cs.post.entity;

import com.project.cs.comment.entity.Comment;
import com.project.cs.common.entity.BaseEntity;
import com.project.cs.member.entity.Member;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Post extends BaseEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Long id;
    private String title;
    private String content;
//    private UploadFile uploadFile;
    @OneToMany(mappedBy = "post")
    private List<Comment> comments;
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
}
