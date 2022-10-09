package com.project.cs.order.entity;

import com.project.cs.common.converter.BooleanToYnConverter;
import com.project.cs.common.entity.BaseEntity;
import com.project.cs.member.entity.Member;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(
        name = "orders",
        indexes = {
                @Index(name = "idx_status", columnList = "status"),
                @Index(name = "idx_notice_yn", columnList = "noticeYn")
        }
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
    @Convert(converter = BooleanToYnConverter.class)
    private boolean noticeYn; // 체결됐을 때 주문의 알림 여부
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder
    public Order(String koreanName, String englishName, String market, String type, String ordType, String status, String price, Double volume, boolean noticeYn, Member member) {
        this.koreanName = koreanName;
        this.englishName = englishName;
        this.market = market;
        this.type = type;
        this.ordType = ordType;
        this.status = status;
        this.price = price;
        this.volume = volume;
        this.noticeYn = noticeYn;
        this.member = member;
    }

    public void changeStatus(String status){
        this.status = status;
    }

    public void changeNoticeYn(){
        this.noticeYn = !this.noticeYn;
    }
}
