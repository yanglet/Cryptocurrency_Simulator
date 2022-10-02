package com.project.cs.orderitem.response;

import com.project.cs.orderitem.entity.OrderItem;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class OrderItemDto {
    private Long id;
    private String koreanName;
    private String englishName;
    private String market;
    private String type; // 매도 / 매수 - ask / bid
    private String ordType; // 지정가 / 시장가 매수 / 시장가 매도 - limit / price / market
    private String price; // 체결가
    private Double volume; // 수량

    public OrderItemDto(OrderItem orderItem) {
        this.id = orderItem.getId();
        this.koreanName = orderItem.getKoreanName();
        this.englishName = orderItem.getEnglishName();
        this.market = orderItem.getMarket();
        this.type = orderItem.getType();
        this.ordType = orderItem.getOrdType();
        this.price = orderItem.getPrice();
        this.volume = orderItem.getVolume();
    }
}
