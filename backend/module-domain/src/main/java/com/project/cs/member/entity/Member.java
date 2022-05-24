package com.project.cs.member.entity;

import com.project.cs.ranking.entity.Ranking;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Member {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;
    private String email;
    private String password;
    private String name;
    private Double balance; // 주문가능 금액 (보유 금액)
    private Double avgPrice; // 매수 평균가
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ranking_id")
    private Ranking ranking;

    @Builder
    public Member(String email, String password, String name, Double balance, Double avgPrice, Ranking ranking) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.balance = balance;
        this.avgPrice = avgPrice;
        this.ranking = ranking;
    }
}
