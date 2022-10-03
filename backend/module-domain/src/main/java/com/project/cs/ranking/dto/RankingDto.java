package com.project.cs.ranking.dto;

import com.project.cs.ranking.entity.Ranking;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RankingDto {
    private Long id;
    private Integer rank;
    private Double profit;

    public RankingDto(Ranking ranking) {
        this.id = ranking.getId();
        this.rank = ranking.getRank();
        this.profit = Double.valueOf(String.format("%.2f", ranking.getProfit()));
    }
}
