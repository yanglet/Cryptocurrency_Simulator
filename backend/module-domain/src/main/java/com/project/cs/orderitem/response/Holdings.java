package com.project.cs.orderitem.response;

import com.project.cs.member.response.MemberDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class Holdings {
    private MemberDto member;
    private List<OrderItemDto> orderItems;
}
