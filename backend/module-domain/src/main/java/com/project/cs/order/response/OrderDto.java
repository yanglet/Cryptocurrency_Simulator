package com.project.cs.order.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.project.cs.order.entity.Order;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class OrderDto {
    private Long id;
    private String koreanName;
    private String englishName;
    private String market;
    private String type; // 매도 / 매수 - ask / bid
    private String ordType; // 지정가 / 시장가 매수 / 시장가 매도 - limit / price / market
    private String status; // 완료 / 대기 / 취소 - complete / wait / cancel
    private String price; // 주문가
    private Double volume; // 수량
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy년 MM월 dd일", timezone = "Asia/Seoul")
    private LocalDateTime createTime;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy년 MM월 dd일", timezone = "Asia/Seoul")
    private LocalDateTime modifiedTime;

    public OrderDto(Order order) {
        this.id = order.getId();
        this.koreanName = order.getKoreanName();
        this.englishName = order.getEnglishName();
        this.market = order.getMarket();
        this.type = order.getType();
        this.ordType = order.getOrdType();
        this.status = order.getStatus();
        this.price = order.getPrice();
        this.volume = order.getVolume();
        this.createTime = order.getCreateTime();
        this.modifiedTime = order.getModifiedTime();
    }
}
