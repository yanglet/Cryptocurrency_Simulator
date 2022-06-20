package com.project.cs.cryptocurrency.dto.candle.response;

import com.project.cs.cryptocurrency.dto.candle.DayCandleDto;
import com.project.cs.cryptocurrency.dto.candle.WeekCandleDto;
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
public class WeekCandleResponse {
    private String market;
    private String candle_date_time_utc; //	캔들 기준 시각(UTC 기준)
    private String candle_date_time_kst; //	캔들 기준 시각(KST 기준)
    private List<BigDecimal> prices = new ArrayList<>(); // 시가, 고가, 저가, 종가 순으로 담길 리스트
    private BigDecimal candle_acc_trade_price; // 누적 거래 금액
    private BigDecimal candle_acc_trade_volume; // 누적 거래량

    @Builder
    public WeekCandleResponse(WeekCandleDto weekCandleDto) {
        this.market = weekCandleDto.getMarket();
        this.candle_date_time_utc = weekCandleDto.getCandle_date_time_utc();
        this.candle_date_time_kst = weekCandleDto.getCandle_date_time_kst();
        this.prices = Arrays.asList(weekCandleDto.getOpening_price(), weekCandleDto.getHigh_price(), weekCandleDto.getLow_price(), weekCandleDto.getTrade_price());
        this.candle_acc_trade_price = weekCandleDto.getCandle_acc_trade_price();
        this.candle_acc_trade_volume = weekCandleDto.getCandle_acc_trade_volume();
    }
}

