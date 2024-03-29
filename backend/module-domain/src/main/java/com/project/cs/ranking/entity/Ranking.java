package com.project.cs.ranking.entity;

import com.project.cs.common.entity.BaseEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Ranking extends BaseEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ranking_id")
    private Long id;
    @Column(name = "ranking")
    private Integer rank;
    private Double profit;

    @Builder
    public Ranking(Integer rank, Double profit) {
        this.rank = rank;
        this.profit = profit;
    }

    public void changeProfit(Double profit){
        this.profit = profit;
    }

    public void changeRank(Integer rank){
        this.rank = rank;
    }
}
