package com.project.cs.test.service;

import com.project.cs.cryptocurrency.dto.candle.DayCandleDto;
import com.project.cs.cryptocurrency.repository.CandleRepository;
import com.project.cs.test.entity.Test;
import com.project.cs.test.repository.TestRepository;
import com.project.cs.test.request.TestRequest;
import com.project.cs.test.request.TestSaveRequest;
import com.project.cs.test.response.TestResponse;
import com.project.cs.test.response.TestSaveResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class TestService {
    private final CandleRepository candleRepository;
    private final TestRepository testRepository;

    public TestSaveResponse save(TestSaveRequest testSaveRequest){
        Test test = Test.builder()
                .price(testSaveRequest.getPrice())
                .time(testSaveRequest.getTime())
                .build();

        return new TestSaveResponse(testRepository.save(test).getId());
    }

    public TestResponse test(TestRequest testRequest) {
        String testTime = testRequest.getTime();
        LocalDateTime parseTime = LocalDateTime.parse(testTime);
        LocalDateTime target = LocalDateTime.of(2017, 9, 30, 23, 59, 59);

        if (parseTime.isAfter(target)) {
            DayCandleDto dayCandle = candleRepository.findByDay(testRequest.getMarket(), parseTime);
            BigDecimal resultMoney = getResultMoney(testRequest, dayCandle.getTrade_price());

            return new TestResponse(String.valueOf(resultMoney));
        }
        Test test = testRepository.findByTime(testTime);
        BigDecimal resultMoney = getResultMoney(testRequest, test.getPrice());

        return new TestResponse(String.valueOf(resultMoney));
    }

    private BigDecimal getResultMoney(TestRequest testRequest, BigDecimal price) {
        double volume = Double.valueOf(testRequest.getMoney()) / Double.valueOf(String.valueOf(price));
        DayCandleDto curDayCandle = candleRepository.findByDay(testRequest.getMarket(), LocalDateTime.now());
        BigDecimal resultMoney = curDayCandle.getTrade_price().multiply(BigDecimal.valueOf(volume));
        return resultMoney;
    }
}
