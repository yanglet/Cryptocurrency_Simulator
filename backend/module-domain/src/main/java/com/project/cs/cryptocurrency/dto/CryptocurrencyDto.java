package com.project.cs.cryptocurrency.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
public class CryptocurrencyDto {
    private String market; // 마켓코드
    private String korean_name; // 한글명
    private String english_name; // 영어명
    private BigDecimal trade_price; // 현재가
    private BigDecimal high_price; // 고가
    private BigDecimal low_price; // 저가
    private String change; // 변화상태 ( EVEN, RISE, FALL )
    private BigDecimal acc_trade_price_24h; // 거래대금
    private BigDecimal acc_trade_volume_24h; // 거래량
    private BigDecimal signed_change_rate; // 부호가 있는 변화율 ( 전일대비 )
    private BigDecimal signed_change_price; // 부호가 있는 변화금액 ( 전일대비 )

    @Builder
    public CryptocurrencyDto(String market, String korean_name, String english_name, BigDecimal trade_price, BigDecimal high_price, BigDecimal low_price, String change, BigDecimal acc_trade_price_24h, BigDecimal acc_trade_volume_24h, BigDecimal signed_change_rate, BigDecimal signed_change_price) {
        this.market = market;
        this.korean_name = korean_name;
        this.english_name = english_name;
        this.trade_price = trade_price;
        this.high_price = high_price;
        this.low_price = low_price;
        this.change = change;
        this.acc_trade_price_24h = acc_trade_price_24h;
        this.acc_trade_volume_24h = acc_trade_volume_24h;
        this.signed_change_rate = signed_change_rate;
        this.signed_change_price = signed_change_price;
    }

    public void setName(MarketDto marketDto){
        this.korean_name = marketDto.getKorean_name();
        this.english_name = marketDto.getEnglish_name();
    }
}
