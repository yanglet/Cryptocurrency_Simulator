package com.project.cs.cryptocurrency.repository;

import com.project.cs.cryptocurrency.dto.CryptocurrencyDto;
import com.project.cs.cryptocurrency.feignclient.Market;
import com.project.cs.cryptocurrency.feignclient.UpbitFeignClient;
import com.project.cs.cryptocurrency.dto.MarketDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Arrays;
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
            cryptocurrencies.get(i).setId(Market.getId(markets.get(i).getMarket()));
        }

        return cryptocurrencies;
    }

    public CryptocurrencyDto findByMarket(String market){
        CryptocurrencyDto cryptocurrencyDto = feignClient.getCryptocurrencies(market).get(0);
        return cryptocurrencyDto;
    }

    public List<CryptocurrencyDto> findByMarkets(String markets){
        List<CryptocurrencyDto> cryptocurrencies = feignClient.getCryptocurrencies(markets);
        List<String> marketList = Arrays.asList(markets.split(","));
        List<MarketDto> marketDtoList = new ArrayList<>();

        for(MarketDto marketDto : findAllMarkets()){
            if( marketList.contains(marketDto.getMarket()) ){
                marketDtoList.add(marketDto);
            }
        }

        for(int i=0; i<cryptocurrencies.size(); i++){
            cryptocurrencies.get(i).setName(marketDtoList.get(i));
            cryptocurrencies.get(i).setId(Market.getId(marketDtoList.get(i).getMarket()));
        }

        return cryptocurrencies;
    }
}
