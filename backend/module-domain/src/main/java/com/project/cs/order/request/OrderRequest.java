package com.project.cs.order.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Positive;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest {
    @NotEmpty
    private String koreanName;
    @NotEmpty
    private String englishName;
    @NotEmpty
    private String market; // 마켓 코드
    @Positive
    private Double volume; // 주문량
    @NotEmpty
    @Positive
    private String price; // 주문 가격 - 해당 가상화폐의 현재가
    @NotEmpty
    private String type; // 매도 / 매수 - ask / bid
    @NotEmpty
    private String ordType; // 지정가 / 시장가 매수 / 시장가 매도 - limit / price / market
    private List<Integer> range = new ArrayList<>();
}
