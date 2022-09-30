package com.project.cs.order.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Positive;

@Getter
@AllArgsConstructor
public class OrderRequest {
    @NotEmpty
    private String koreanName;
    @NotEmpty
    private String englishName;
    @NotEmpty
    private String market; // 마켓 코드
    @NotEmpty
    private String side; // 주문 종류 - bid(매수), ask(매도)
    @Positive
    private Double volume; // 주문량
    @NotEmpty
    @Positive
    private String price; // 주문 가격 - 해당 가상화폐의 현재가
    @NotEmpty
    private String orderType; // 주문 타입 - limit(지정가), price(시장가 매수), market(시장가 매도)
    @NotEmpty
    private String type; // 매도 / 매수 - ask / bid
    @NotEmpty
    private String ordType; // 지정가 / 시장가 매수 / 시장가 매도 - limit / price / market
    @NotEmpty
    private String status; // 완료 / 대기 / 취소 - complete / wait / cancel
}
