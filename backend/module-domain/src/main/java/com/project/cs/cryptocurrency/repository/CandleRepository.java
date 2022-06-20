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
    
    public List<MinuteCandleDto> findAllMinuteCandles(Integer unit, String market){
        return feignClient.getMinuteCandles(unit, market, 200);
    }
    
    public List<DayCandleDto> findAllDayCandles(String market){
        return feignClient.getDayCandles(market, 200);
    }
    
    public List<WeekCandleDto> findAllWeekCandles(String market){
        return feignClient.getWeekCandles(market, 200);
    }
    
    public List<MonthCandleDto> findAllMonthCandles(String market){
        return feignClient.getMonthCandles(market, 200);
    }
}
