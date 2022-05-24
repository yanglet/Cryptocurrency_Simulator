package com.project.cs.orderitem.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class OrderItem {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orderitem_id")
    private Long id;
    private String koreanName;
    private String englishName;
    private String market;
    private String price; // 매수가
    private Double size; // 수량

    @Builder
    public OrderItem(String koreanName, String englishName, String market, String price, Double size) {
        this.koreanName = koreanName;
        this.englishName = englishName;
        this.market = market;
        this.price = price;
        this.size = size;
    }
}
