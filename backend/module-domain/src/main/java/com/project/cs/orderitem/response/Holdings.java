package com.project.cs.orderitem.response;

import com.project.cs.member.response.MemberDto;
import com.project.cs.member.response.OMGMemberDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.List;

@Getter
public class Holdings {
    private List<OMGMemberDto> member;
    private List<OrderItemDto> orderItems;
//    private BigDecimal totalPrice; // 총 평가 금액
    private BigDecimal totalTradePrice; // 총 매수 금액
//    private BigDecimal totalProfitPrice; // 총 평가 손익
//    private Double profit; // 총 평가 수익률

    @Builder

    public Holdings(OMGMemberDto member, List<OrderItemDto> orderItems, BigDecimal totalTradePrice) {
        this.member = List.of(member);
        this.orderItems = orderItems;
        this.totalTradePrice = totalTradePrice;
    }
}
