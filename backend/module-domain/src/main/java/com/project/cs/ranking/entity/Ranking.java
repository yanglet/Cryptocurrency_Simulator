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
    private Integer ranking; // rank 라는 변수명은 에러가 남,,
    private Double profit;

    @Builder
    public Ranking(Integer ranking, Double profit) {
        this.ranking = ranking;
        this.profit = profit;
    }
}
