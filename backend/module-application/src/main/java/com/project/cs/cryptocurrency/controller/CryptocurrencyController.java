package com.project.cs.cryptocurrency.controller;

import com.project.cs.cryptocurrency.dto.CryptocurrencyDto;
import com.project.cs.cryptocurrency.repository.CryptocurrencyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/api/cryptocurrencies")
public class CryptocurrencyController {

    private final CryptocurrencyRepository cryptocurrencyRepository;

    @GetMapping
    public List<CryptocurrencyDto> getCryptocurrencies(){
        return cryptocurrencyRepository.findAll();
    }
}
