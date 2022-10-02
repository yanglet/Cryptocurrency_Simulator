package com.project.cs.order.service;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

/**
 * private String type; // 매도 / 매수 - ask / bid
 * private String ordType; // 지정가 / 시장가 매수 / 시장가 매도 - limit / price / market
 * private String status; // 완료 / 대기 / 취소 - complete / wait / cancel
 */
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class OrderStatusConstants {
    public static String ORDER_STATUS_WAIT = "wait"; // 대기
    public static String ORDER_STATUS_COMPLETE = "complete"; // 완료
    public static String ORDER_STATUS_CANCEL = "cancel"; // 취소
    public static String TYPE_ASK = "ask"; // 매도
    public static String TYPE_BID = "bid"; // 매수
    public static String ORDER_TYPE_LIMIT = "limit"; // 지정가
    public static String ORDER_TYPE_PRICE = "price"; // 시장가 매수
    public static String ORDER_TYPE_MARKET = "market"; // 시장가 매도
}
