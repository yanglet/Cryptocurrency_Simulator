package com.project.cs.cryptocurrency.controller;

import com.project.cs.cryptocurrency.dto.candle.response.DayCandleResponse;
import com.project.cs.cryptocurrency.dto.candle.response.MinuteCandleResponse;
import com.project.cs.cryptocurrency.dto.candle.response.MonthCandleResponse;
import com.project.cs.cryptocurrency.dto.candle.response.WeekCandleResponse;
import com.project.cs.cryptocurrency.repository.CandleRepository;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/api/candles")
public class CandleController {
    private final CandleRepository candleRepository;

    @ApiOperation("시세 캔들 조회, 분 단위 ( Minute )")
    @GetMapping("/minutes/{unit}")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "unit", value = "분 단위"),
            @ApiImplicitParam(name = "market", value = "마켓 코드")
    })
    public ResponseEntity<List<MinuteCandleResponse>> getMinuteCandles(@PathVariable("unit") Integer unit,
                                                                       @RequestParam("market") String market) {
        return ResponseEntity.ok(candleRepository.findAllMinuteCandles(unit, market)
                .stream()
                .map(c -> new MinuteCandleResponse(c))
                .collect(Collectors.toList()));
    }

    @ApiOperation("시세 캔들 조회, 일 단위 ( Day )")
    @GetMapping("/days")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "market", value = "마켓 코드")
    })
    public ResponseEntity<List<DayCandleResponse>> getDayCandles(@RequestParam("market") String market) {
        return ResponseEntity.ok(candleRepository.findAllDayCandles(market)
                .stream()
                .map(c -> new DayCandleResponse(c))
                .collect(Collectors.toList()));
    }

    @ApiOperation("시세 캔들 조회, 주 단위 ( Week )")
    @GetMapping("/weeks")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "market", value = "마켓 코드")
    })
    public ResponseEntity<List<WeekCandleResponse>> getWeekCandles(@RequestParam("market") String market) {
        return ResponseEntity.ok(candleRepository.findAllWeekCandles(market)
                .stream()
                .map(c -> new WeekCandleResponse(c))
                .collect(Collectors.toList()));
    }

    @ApiOperation("시세 캔들 조회, 월 단위 ( Month )")
    @GetMapping("/months")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "market", value = "마켓 코드")
    })
    public ResponseEntity<List<MonthCandleResponse>> getMonthCandles(@RequestParam("market") String market) {
        return ResponseEntity.ok(candleRepository.findAllMonthCandles(market)
                .stream()
                .map(c -> new MonthCandleResponse(c))
                .collect(Collectors.toList()));
    }
}
