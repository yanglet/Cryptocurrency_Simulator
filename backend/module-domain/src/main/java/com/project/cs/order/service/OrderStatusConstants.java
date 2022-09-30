package com.project.cs.order.service;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class OrderStatusConstants {
    public static String ORDER_STATUS_WAIT = "wait";
    public static String ORDER_STATUS_COMPLETE = "complete";
    public static String ORDER_STATUS_CANCEL = "cancel";
}
