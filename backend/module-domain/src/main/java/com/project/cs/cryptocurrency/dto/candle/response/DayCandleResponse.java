package com.project.cs.cryptocurrency.dto.candle.response;

import com.project.cs.cryptocurrency.dto.candle.DayCandleDto;
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
public class DayCandleResponse {
    private String market;
    private String candle_date_time_utc; //	캔들 기준 시각(UTC 기준)
    private String candle_date_time_kst; //	캔들 기준 시각(KST 기준)
    private List<BigDecimal> prices = new ArrayList<>(); // 시가, 고가, 저가, 종가 순으로 담길 리스트
    private BigDecimal candle_acc_trade_price; // 누적 거래 금액
    private BigDecimal candle_acc_trade_volume; // 누적 거래량

    @Builder
    public DayCandleResponse(DayCandleDto dayCandleDto) {
        this.market = dayCandleDto.getMarket();
        this.candle_date_time_utc = dayCandleDto.getCandle_date_time_utc();
        this.candle_date_time_kst = dayCandleDto.getCandle_date_time_kst();
        this.prices = Arrays.asList(dayCandleDto.getOpening_price(), dayCandleDto.getHigh_price(), dayCandleDto.getLow_price(), dayCandleDto.getTrade_price());
        this.candle_acc_trade_price = dayCandleDto.getCandle_acc_trade_price();
        this.candle_acc_trade_volume = dayCandleDto.getCandle_acc_trade_volume();
    }
}
