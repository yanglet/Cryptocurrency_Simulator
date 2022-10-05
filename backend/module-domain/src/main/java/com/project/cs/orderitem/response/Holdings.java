package com.project.cs.orderitem.response;

import com.project.cs.member.response.MemberDto;
import com.project.cs.member.response.OMGMemberDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
public class Holdings {
    private List<OMGMemberDto> member;
    private List<OrderItemDto> orderItems;

    public Holdings(OMGMemberDto member, List<OrderItemDto> orderItems) {
        this.member = List.of(member);
        this.orderItems = orderItems;
    }
}
