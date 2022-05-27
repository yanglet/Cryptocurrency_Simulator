package com.project.cs.cryptocurrency.feignclient;

import com.project.cs.cryptocurrency.dto.CryptocurrencyDto;
import com.project.cs.cryptocurrency.dto.MarketDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "feign", url = "https://api.upbit.com/v1", configuration = FeignConfig.class)
public interface UpbitFeignClient {
    @RequestMapping(method = RequestMethod.GET, value = "/market/all")
    List<MarketDto> getMarkets();
    @GetMapping("/ticker")
    List<CryptocurrencyDto> getCryptocurrencies(@RequestParam("markets") String markets);
}

