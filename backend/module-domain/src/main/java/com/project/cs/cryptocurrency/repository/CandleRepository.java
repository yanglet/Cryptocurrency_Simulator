package com.project.cs.cryptocurrency.repository;

import com.project.cs.cryptocurrency.dto.candle.DayCandleDto;
import com.project.cs.cryptocurrency.dto.candle.MinuteCandleDto;
import com.project.cs.cryptocurrency.dto.candle.MonthCandleDto;
import com.project.cs.cryptocurrency.dto.candle.WeekCandleDto;
import com.project.cs.cryptocurrency.feignclient.UpbitFeignClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class CandleRepository {
    private final UpbitFeignClient feignClient;
    
    public List<MinuteCandleDto> findAllMinuteCandles(Integer unit, String market, int count){
        return feignClient.getMinuteCandles(unit, market, count);
    }
    
    public List<DayCandleDto> findAllDayCandles(String market, int count){
        return feignClient.getDayCandles(market, count);
    }
    
    public List<WeekCandleDto> findAllWeekCandles(String market, int count){
        return feignClient.getWeekCandles(market, count);
    }
    
    public List<MonthCandleDto> findAllMonthCandles(String market, int count){
        return feignClient.getMonthCandles(market, count);
    }
}
