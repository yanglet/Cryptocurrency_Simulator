package com.project.cs.ranking.service;

import com.project.cs.cryptocurrency.dto.CryptocurrencyDto;
import com.project.cs.cryptocurrency.repository.CryptocurrencyRepository;
import com.project.cs.member.entity.Member;
import com.project.cs.member.repository.MemberRepository;
import com.project.cs.orderitem.entity.OrderItem;
import com.project.cs.orderitem.repository.OrderItemRepository;
import com.project.cs.ranking.dto.RankingResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class RankingService {
    private final MemberRepository memberRepository;
    private final CryptocurrencyRepository cryptocurrencyRepository;
    private final OrderItemRepository orderItemRepository;

    @Transactional(readOnly = true)
    public List<RankingResponse> getRankings(){
        return memberRepository.findAllFetchByRankings()
                .stream()
                .map(RankingResponse::new)
                .collect(Collectors.toList());
    }

    public void initRankings(){
        List<CryptocurrencyDto> cryptocurrencies = cryptocurrencyRepository.findAll();
        List<Member> members = memberRepository.findAllFetchByRankings();

        members.stream().forEach(m -> {
            BigDecimal tradePrice = BigDecimal.valueOf(0);
            BigDecimal presentPrice = BigDecimal.valueOf(0);

            List<OrderItem> orderItems = orderItemRepository.findByMember(m);
            for(OrderItem oi : orderItems){
                tradePrice.add(BigDecimal.valueOf(Double.valueOf(oi.getPrice()) * oi.getVolume()));
                for(CryptocurrencyDto c : cryptocurrencies){
                    if(c.getMarket().equals(oi.getMarket())){
                        presentPrice.add(c.getTrade_price().multiply(BigDecimal.valueOf(oi.getVolume())));
                    }
                }
            }
            Double result = presentPrice.doubleValue() - tradePrice.doubleValue();

            m.getRanking().changeProfit(result / presentPrice.doubleValue() * 100);
        });

        members.sort((o1, o2) -> {
            if(o1.getRanking().getProfit() < o2.getRanking().getProfit()){
                return 1;
            }
            return 0;
        });

        members.stream().forEach(m -> {
            for(int i=0; i<members.size(); i++){
                m.getRanking().changeRank(i + 1);
            }
        });
    }
}
