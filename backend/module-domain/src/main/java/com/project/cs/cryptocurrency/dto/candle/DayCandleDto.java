package com.project.cs.cryptocurrency.dto.candle;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
public class DayCandleDto {
    private String market;
    private String candle_date_time_utc; //	캔들 기준 시각(UTC 기준)
    private String candle_date_time_kst; //	캔들 기준 시각(KST 기준)
    private BigDecimal opening_price; // 시가
    private BigDecimal high_price; // 고가
    private BigDecimal low_price; // 저가
    private BigDecimal trade_price; // 종가
    private Long timestamp; // 해당 캔들에서 마지막 틱이 저장된 시각
    private BigDecimal candle_acc_trade_price; // 누적 거래 금액
    private BigDecimal candle_acc_trade_volume; // 누적 거래량
    private Double prev_closing_price; // 전일 종가(UTC 0시 기준)
    private Double change_price; // 전일 종가 대비 변화 금액
    private Double change_rate; // 전일 종가 대비 변화량

    @Builder
    public DayCandleDto(String market, String candle_date_time_utc, String candle_date_time_kst, BigDecimal opening_price, BigDecimal high_price, BigDecimal low_price, BigDecimal trade_price, Long timestamp, BigDecimal candle_acc_trade_price, BigDecimal candle_acc_trade_volume, Double prev_closing_price, Double change_price, Double change_rate) {
        this.market = market;
        this.candle_date_time_utc = candle_date_time_utc;
        this.candle_date_time_kst = candle_date_time_kst;
        this.opening_price = opening_price;
        this.high_price = high_price;
        this.low_price = low_price;
        this.trade_price = trade_price;
        this.timestamp = timestamp;
        this.candle_acc_trade_price = candle_acc_trade_price;
        this.candle_acc_trade_volume = candle_acc_trade_volume;
        this.prev_closing_price = prev_closing_price;
        this.change_price = change_price;
        this.change_rate = change_rate;
    }
}
