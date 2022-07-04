package com.project.cs.member.response;

import com.project.cs.member.entity.Member;
import com.project.cs.ranking.dto.RankingDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
public class SimpleMemberDto {
    private Long id;
    private String email;
    private String password;
    private String name;
    private BigDecimal balance;
    private String role;

    public SimpleMemberDto(Member member) {
        this.id = member.getId();
        this.email = member.getEmail();
        this.password = member.getPassword();
        this.name = member.getName();
        this.balance = member.getBalance();
        this.role = member.getRole();
    }
}
