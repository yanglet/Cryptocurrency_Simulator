package com.project.cs.member.response;

import com.project.cs.member.entity.Member;
import com.project.cs.ranking.entity.Ranking;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MemberDto {
    private Long id;
    private String email;
    private String password;
    private String name;
    private Double balance;
    private String role;
    private Ranking ranking;

    public MemberDto(Member member) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.balance = balance;
        this.role = role;
        this.ranking = ranking;
    }
}
