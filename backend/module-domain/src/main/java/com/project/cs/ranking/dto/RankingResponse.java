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
    private Long rankingId;
    private Integer rank;
    private Double profit;

    public RankingResponse(Member member) {
        this.memberId = member.getId();
        this.email = member.getEmail();
        this.name = member.getName();
        this.rankingId = member.getRanking().getId();
        this.rank = member.getRanking().getRank();
        this.profit = Double.valueOf(String.format("%.2f", member.getRanking().getProfit()));
    }
}
