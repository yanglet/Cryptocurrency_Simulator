package com.project.cs.member.response;

import com.project.cs.member.entity.Member;
import com.project.cs.ranking.dto.RankingDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class OMGMemberDto {
    private Long id;
    private String email;
    private String password;
    private String name;
    private BigDecimal balance;
    private String role;
    private List<RankingDto> ranking;

    public OMGMemberDto(Member member) {
        this.id = member.getId();
        this.email = member.getEmail();
        this.password = member.getPassword();
        this.name = member.getName();
        this.balance = member.getBalance();
        this.role = member.getRole();
        this.ranking = List.of(new RankingDto(member.getRanking()));
    }
}
