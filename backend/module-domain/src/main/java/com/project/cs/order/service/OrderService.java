package com.project.cs.order.service;

import com.project.cs.order.repository.OrderRepository;
import com.project.cs.orderitem.repository.OrderItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;

    /**
     * 매수
     * 지정가 -> 가격을 비교해서 가격이 같으면 구매가능
     * 시장가 -> 바로 그 때 가격으로 구매가능
     *       -> 지정된 가격을 기준으로 계속 데이터를 불러와서 맞는지 확인해야함
     *       -> 사용자가 조금만 있어도 API 호출 제한에 걸림 ,,
     */
    public void buy(){

    }

    /**
     * 매도
     * 지정가 -> 가격을 비교해서 가격이 같으면 판매가능
     * 시장가 -> 바로 그 때 가격으로 판매가능
     *       -> 지정된 가격을 기준으로 계속 데이터를 불러와서 맞는지 확인해야함
     *       -> 사용자가 조금만 있어도 API 호출 제한에 걸림 ,,
     */
    public void sell(){

    }
}
