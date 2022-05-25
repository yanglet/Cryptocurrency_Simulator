package com.project.cs.like.entity;

import com.project.cs.common.entity.BaseEntity;
import com.project.cs.member.entity.Member;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "likes")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Like extends BaseEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "like_id")
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
    private String koreanName;
    private String englishName;
    private String market;

    @Builder
    public Like(Member member, String koreanName, String englishName, String market) {
        this.member = member;
        this.koreanName = koreanName;
        this.englishName = englishName;
        this.market = market;
    }
}
