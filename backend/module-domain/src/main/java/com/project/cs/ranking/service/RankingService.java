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

        for (Member member : members) {
            BigDecimal tradePrice = BigDecimal.valueOf(0);
            BigDecimal presentPrice = BigDecimal.valueOf(0);

            List<OrderItem> orderItems = orderItemRepository.findByMember(member);
            for (OrderItem oi : orderItems) {
                tradePrice = tradePrice.add(BigDecimal.valueOf(Double.parseDouble(oi.getPrice()) * oi.getVolume()));
                for (CryptocurrencyDto c : cryptocurrencies) {
                    if (c.getMarket().equals(oi.getMarket())) {
                        presentPrice = presentPrice.add(c.getTrade_price().multiply(BigDecimal.valueOf(oi.getVolume())));
                    }
                }
            }
            Double result = presentPrice.compareTo(BigDecimal.valueOf(0)) == 0 ? 0.0 : presentPrice.subtract(tradePrice).doubleValue();
            Double profit = presentPrice.compareTo(BigDecimal.valueOf(0)) == 0 ? 0.0 : (result / presentPrice.doubleValue()) * 100.0;

            member.getRanking().changeProfit(profit);
        }

        members.sort((o1, o2) -> {
            if(o1.getRanking().getProfit() < o2.getRanking().getProfit()){
                return 1;
            }
            return 0;
        });

        for(int i=0; i<members.size(); i++){
            members.get(members.size() - (i + 1)).getRanking().changeRank(i + 1);
        }
    }
}
