package com.project.cs.cryptocurrency.dto.candle.response;

import com.project.cs.cryptocurrency.dto.candle.DayCandleDto;
import com.project.cs.cryptocurrency.dto.candle.MonthCandleDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class MonthCandleResponse {
    private String market;
    private String candle_date_time_utc; //	캔들 기준 시각(UTC 기준)
    private String candle_date_time_kst; //	캔들 기준 시각(KST 기준)
    private List<BigDecimal> prices = new ArrayList<>(); // 시가, 고가, 저가, 종가 순으로 담길 리스트
    private BigDecimal candle_acc_trade_price; // 누적 거래 금액
    private BigDecimal candle_acc_trade_volume; // 누적 거래량

    @Builder
    public MonthCandleResponse(MonthCandleDto monthCandleDto) {
        this.market = monthCandleDto.getMarket();
        this.candle_date_time_utc = monthCandleDto.getCandle_date_time_utc();
        this.candle_date_time_kst = monthCandleDto.getCandle_date_time_kst();
        this.prices = Arrays.asList(monthCandleDto.getOpening_price(), monthCandleDto.getHigh_price(), monthCandleDto.getLow_price(), monthCandleDto.getTrade_price());
        this.candle_acc_trade_price = monthCandleDto.getCandle_acc_trade_price();
        this.candle_acc_trade_volume = monthCandleDto.getCandle_acc_trade_volume();
    }
}

