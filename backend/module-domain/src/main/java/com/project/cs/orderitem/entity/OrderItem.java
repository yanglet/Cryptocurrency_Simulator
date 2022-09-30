package com.project.cs.orderitem.entity;

import com.project.cs.common.entity.BaseEntity;
import com.project.cs.member.entity.Member;
import com.project.cs.order.entity.Order;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class OrderItem extends BaseEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orderitem_id")
    private Long id;
    private String koreanName;
    private String englishName;
    private String market;
    private String type; // 매도 / 매수 - ask / bid
    private String ordType; // 지정가 / 시장가 매수 / 시장가 매도 - limit / price / market
    private String price; // 체결가
    private Double volume; // 수량
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;

    @Builder
    public OrderItem(String koreanName, String englishName, String market, String type, String ordType, String price, Double volume, Member member, Order order) {
        this.koreanName = koreanName;
        this.englishName = englishName;
        this.market = market;
        this.type = type;
        this.ordType = ordType;
        this.price = price;
        this.volume = volume;
        this.member = member;
        this.order = order;
    }
}
