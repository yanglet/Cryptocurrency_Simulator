package com.project.cs.ranking.dto;

import com.project.cs.ranking.entity.Ranking;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RankingDto {
    private Integer rank;
    private Double profit;

    public RankingDto(Ranking ranking) {
        this.rank = ranking.getRank();
        this.profit = ranking.getProfit();
    }
}
