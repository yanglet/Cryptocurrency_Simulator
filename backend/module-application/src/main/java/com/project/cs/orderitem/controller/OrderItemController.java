package com.project.cs.orderitem.controller;

import com.project.cs.member.entity.Member;
import com.project.cs.orderitem.response.Holdings;
import com.project.cs.orderitem.service.OrderItemService;
import com.project.cs.security.annotation.LoginMember;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("v1/api/orderItems")
public class OrderItemController {
    private final OrderItemService orderItemService;

    @ApiOperation("보유 자산 조회")
    @GetMapping
    @ApiImplicitParams({
            @ApiImplicitParam(name = "Authorization", value = "사용자 인증을 위한 accessToken", paramType = "header", required = true),
    })
    public ResponseEntity<Holdings> getOrders(@LoginMember Member member) {
        return ResponseEntity.ok(orderItemService.getOrderItems(member));
    }
}
