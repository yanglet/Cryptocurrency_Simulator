package com.project.cs.member.entity;

import com.project.cs.common.entity.BaseEntity;
import com.project.cs.ranking.entity.Ranking;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Member extends BaseEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;
    private String email;
    private String password;
    private String name;
    private Double balance; // 주문가능 금액 (보유 금액)
    private String role;
    @OneToOne(fetch = FetchType.EAGER) // 즉시로딩 명시
    @JoinColumn(name = "ranking_id")
    private Ranking ranking;

    @Builder
    public Member(String email, String password, String name, Double balance, Ranking ranking, String role) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.balance = balance;
        this.ranking = ranking;
        this.role = role;
    }
}
