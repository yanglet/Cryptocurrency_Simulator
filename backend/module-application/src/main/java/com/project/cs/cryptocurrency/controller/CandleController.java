package com.project.cs.cryptocurrency.controller;

import com.project.cs.cryptocurrency.dto.candle.DayCandleDto;
import com.project.cs.cryptocurrency.dto.candle.MinuteCandleDto;
import com.project.cs.cryptocurrency.dto.candle.MonthCandleDto;
import com.project.cs.cryptocurrency.dto.candle.WeekCandleDto;
import com.project.cs.cryptocurrency.repository.CandleRepository;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/api/candles")
public class CandleController {
    private final CandleRepository candleRepository;

    @ApiOperation("시세 캔들 조회, 분 단위 ( Minute )")
    @GetMapping("/minutes/{unit}")
    public ResponseEntity<List<MinuteCandleDto>> getMinuteCandles(@PathVariable("unit") Integer unit,
                                                                  @RequestParam("market") String market,
                                                                  @RequestParam("count") int count){
        return ResponseEntity.ok(candleRepository.findAllMinuteCandles(unit, market, count));
    }

    @ApiOperation("시세 캔들 조회, 일 단위 ( Day )")
    @GetMapping("/days")
    public ResponseEntity<List<DayCandleDto>> getDayCandles(@RequestParam("market") String market,
                                                            @RequestParam("count") int count){
        return ResponseEntity.ok(candleRepository.findAllDayCandles(market, count));
    }

    @ApiOperation("시세 캔들 조회, 주 단위 ( Week )")
    @GetMapping("/weeks")
    public ResponseEntity<List<WeekCandleDto>> getWeekCandles(@RequestParam("market") String market,
                                                              @RequestParam("count") int count){
        return ResponseEntity.ok(candleRepository.findAllWeekCandles(market, count));
    }

    @ApiOperation("시세 캔들 조회, 월 단위 ( Month )")
    @GetMapping("/months")
    public ResponseEntity<List<MonthCandleDto>> getMonthCandles(@RequestParam("market") String market,
                                                                @RequestParam("count") int count){
        return ResponseEntity.ok(candleRepository.findAllMonthCandles(market, count));
    }
}
