package com.project.cs.order.controller;

import com.project.cs.member.entity.Member;
import com.project.cs.order.request.OrderRequest;
import com.project.cs.order.response.OrderDto;
import com.project.cs.order.response.OrderResponse;
import com.project.cs.order.service.OrderService;
import com.project.cs.security.annotation.LoginMember;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("v1/api/orders")
public class OrderController {
    private final OrderService orderService;

    @ApiOperation("주문 내역 조회")
    @GetMapping
    @ApiImplicitParams({
            @ApiImplicitParam(name = "Authorization", value = "사용자 인증을 위한 accessToken", paramType = "header", required = true),
    })
    public ResponseEntity<List<OrderDto>> getOrders(@RequestParam String status,
                                                    @LoginMember Member member){
        return ResponseEntity.ok(orderService.getOrders(member, status));
    }

    @ApiOperation("주문하기")
    @PostMapping("/order")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "Authorization", value = "사용자 인증을 위한 accessToken", paramType = "header", required = true),
    })
    public ResponseEntity<OrderResponse> order(@RequestBody @Validated OrderRequest orderRequest,
                                               @LoginMember Member member){
        return ResponseEntity.ok(orderService.order(orderRequest, member));
    }

    @ApiOperation("주문 취소")
    @DeleteMapping("/{orderId}")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "Authorization", value = "사용자 인증을 위한 accessToken", paramType = "header", required = true),
    })
    public void cancelOrder(@PathVariable Long orderId,
                            @LoginMember Member member){
        orderService.cancelOrder(orderId, member);
    }

    @ApiOperation("체결 주문 알림 조회")
    @GetMapping("/notice")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "Authorization", value = "사용자 인증을 위한 accessToken", paramType = "header", required = true),
    })
    public ResponseEntity<List<OrderDto>> getNoticeOrders(@LoginMember Member member){
        return ResponseEntity.ok(orderService.getNoticeOrders(member));
    }
}