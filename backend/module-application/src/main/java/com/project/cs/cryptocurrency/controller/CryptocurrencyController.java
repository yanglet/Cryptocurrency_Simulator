package com.project.cs.cryptocurrency.controller;

import com.project.cs.cryptocurrency.dto.CryptocurrencyDto;
import com.project.cs.cryptocurrency.dto.candle.MinuteCandleDto;
import com.project.cs.cryptocurrency.repository.CryptocurrencyRepository;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/api/cryptocurrencies")
public class CryptocurrencyController {
    private final CryptocurrencyRepository cryptocurrencyRepository;

    @ApiOperation("모든 가상화폐 조회")
    @GetMapping
    public ResponseEntity<List<CryptocurrencyDto>> getCryptocurrencies(){
        return ResponseEntity.ok(cryptocurrencyRepository.findAll());
    }
}
