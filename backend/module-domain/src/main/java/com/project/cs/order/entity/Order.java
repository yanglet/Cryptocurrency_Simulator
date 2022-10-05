package com.project.cs.order.entity;

import com.project.cs.common.entity.BaseEntity;
import com.project.cs.member.entity.Member;
import com.project.cs.orderitem.entity.OrderItem;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.mapping.Join;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(
        name = "orders",
        indexes = @Index(name = "idx_status", columnList = "status")
)
public class Order extends BaseEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long id;
    private String koreanName;
    private String englishName;
    private String market;
    private String type; // 매도 / 매수 - ask / bid
    private String ordType; // 지정가 / 시장가 매수 / 시장가 매도 - limit / price / market
    private String status; // 완료 / 대기 / 취소 - complete / wait / cancel
    private String price; // 주문가
    private Double volume; // 수량
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder
    public Order(String koreanName, String englishName, String market, String type, String ordType, String status, String price, Double volume, Member member) {
        this.koreanName = koreanName;
        this.englishName = englishName;
        this.market = market;
        this.type = type;
        this.ordType = ordType;
        this.status = status;
        this.price = price;
        this.volume = volume;
        this.member = member;
    }

    public void changeStatus(String status){
        this.status = status;
    }
}
