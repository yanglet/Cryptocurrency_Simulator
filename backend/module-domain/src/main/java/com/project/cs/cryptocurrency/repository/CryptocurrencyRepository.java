package com.project.cs.cryptocurrency.repository;

import com.project.cs.cryptocurrency.dto.CryptocurrencyDto;
import com.project.cs.cryptocurrency.feignclient.Market;
import com.project.cs.cryptocurrency.feignclient.UpbitFeignClient;
import com.project.cs.cryptocurrency.dto.MarketDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class CryptocurrencyRepository {
    private final UpbitFeignClient feignClient;

    public List<MarketDto> findAllMarkets(){
        return feignClient.getMarkets();
    }

    public List<CryptocurrencyDto> findAll(){
        List<MarketDto> markets = findAllMarkets().stream().filter(m -> m.getMarket().contains("KRW")).collect(Collectors.toList());
        List<CryptocurrencyDto> cryptocurrencies = feignClient.getCryptocurrencies(Market.getAllMarketCode());

        for(int i=0; i<markets.size(); i++){
            cryptocurrencies.get(i).setName(markets.get(i));
        }

        return cryptocurrencies;
    }
}
