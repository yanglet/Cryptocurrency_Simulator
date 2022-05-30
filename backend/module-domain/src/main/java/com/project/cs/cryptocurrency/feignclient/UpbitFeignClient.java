package com.project.cs.cryptocurrency.feignclient;

import com.project.cs.cryptocurrency.dto.CryptocurrencyDto;
import com.project.cs.cryptocurrency.dto.MarketDto;
import com.project.cs.cryptocurrency.dto.candle.DayCandleDto;
import com.project.cs.cryptocurrency.dto.candle.MinuteCandleDto;
import com.project.cs.cryptocurrency.dto.candle.MonthCandleDto;
import com.project.cs.cryptocurrency.dto.candle.WeekCandleDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "feign", url = "https://api.upbit.com/v1", configuration = FeignConfig.class)
public interface UpbitFeignClient {
    @RequestMapping(method = RequestMethod.GET, value = "/market/all")
    List<MarketDto> getMarkets();

    @GetMapping("/ticker")
    List<CryptocurrencyDto> getCryptocurrencies(@RequestParam("markets") String markets);

    @GetMapping("/candles/minutes/{unit}")
    List<MinuteCandleDto> getMinuteCandles(@PathVariable("unit") Integer unit,
                                        @RequestParam("market") String market,
                                        @RequestParam("count") int count);

    @GetMapping("/candles/days")
    List<DayCandleDto> getDayCandles(@RequestParam("market") String market,
                                     @RequestParam("count") int count);

    @GetMapping("/candles/weeks")
    List<WeekCandleDto> getWeekCandles(@RequestParam("market") String market,
                                       @RequestParam("count") int count);

    @GetMapping("/candles/months")
    List<MonthCandleDto> getMonthCandles(@RequestParam("market") String market,
                                         @RequestParam("count") int count);
}

