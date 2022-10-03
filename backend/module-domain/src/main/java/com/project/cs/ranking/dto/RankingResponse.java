package com.project.cs.ranking.dto;

import com.project.cs.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RankingResponse {
    private Long memberId;
    private String email;
    private String name;
    private RankingDto ranking;

    public RankingResponse(Member member) {
        this.memberId = member.getId();
        this.email = member.getEmail();
        this.name = member.getName();
        this.ranking = new RankingDto(member.getRanking());
    }
}
