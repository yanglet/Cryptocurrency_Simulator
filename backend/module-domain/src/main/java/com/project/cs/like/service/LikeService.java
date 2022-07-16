package com.project.cs.like.service;

import com.project.cs.cryptocurrency.dto.CryptocurrencyDto;
import com.project.cs.cryptocurrency.repository.CryptocurrencyRepository;
import com.project.cs.like.entity.Like;
import com.project.cs.like.repository.LikeRepository;
import com.project.cs.like.response.LikeResponse;
import com.project.cs.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LikeService {
    private final LikeRepository likeRepository;
    private final CryptocurrencyRepository cryptocurrencyRepository;

    public List<CryptocurrencyDto> getLikes(Member member){
        List<Like> likeList = likeRepository.findByMember(member);
        String markets = getLikesMarkets(likeList);

        return cryptocurrencyRepository.findByMarkets(markets);
    }

    public Long save(Member member, String market){
        Like like = Like.builder()
                .market(market)
                .member(member)
                .build();

        return likeRepository.save(like).getId();
    }

    public void delete(Member member, String market){
        Like like = likeRepository.findByMemberAndMarket(member, market);
        likeRepository.delete(like);
    }

    private String getLikesMarkets(List<Like> likeList){
        String markets = "";

        for(Like like : likeList){
            markets += like.getMarket() + ",";
        }

        return markets;
    }
}
