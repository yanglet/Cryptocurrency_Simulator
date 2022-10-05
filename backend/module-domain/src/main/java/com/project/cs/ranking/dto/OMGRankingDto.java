package com.project.cs.ranking.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.project.cs.ranking.entity.Ranking;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class OMGRankingDto {
    private Long id;
    private Integer rank;
    private Double profit;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy년 MM월 dd일", timezone = "Asia/Seoul")
    private LocalDateTime createTime;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy년 MM월 dd일", timezone = "Asia/Seoul")
    private LocalDateTime modifiedTime;

    public OMGRankingDto(Ranking ranking) {
        this.id = ranking.getId();
        this.rank = ranking.getRank();
        this.profit = Double.valueOf(String.format("%.2f", ranking.getProfit()));
        this.createTime = ranking.getCreateTime();
        this.modifiedTime = ranking.getModifiedTime();
    }
}
