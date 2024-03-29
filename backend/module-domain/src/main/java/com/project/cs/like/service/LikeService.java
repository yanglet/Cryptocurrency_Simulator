package com.project.cs.like.service;

import com.project.cs.cryptocurrency.dto.CryptocurrencyDto;
import com.project.cs.cryptocurrency.repository.CryptocurrencyRepository;
import com.project.cs.like.entity.Like;
import com.project.cs.like.repository.LikeRepository;
import com.project.cs.like.response.LikeResponse;
import com.project.cs.member.entity.Member;
import com.project.cs.member.exception.NotLoggedInException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class LikeService {
    private final LikeRepository likeRepository;
    private final CryptocurrencyRepository cryptocurrencyRepository;

    public List<CryptocurrencyDto> getLikes(Member member) {
        List<Like> likeList = likeRepository.findByMember(member);
        String markets = getLikesMarkets(likeList);

        if (markets.isBlank()) {
            return new ArrayList<>();
        }

        return cryptocurrencyRepository.findByMarkets(markets);
    }

    public LikeResponse save(Member member, String market) {
        loginCheck(member);

        Like like = Like.builder()
                .market(market)
                .member(member)
                .build();

        return new LikeResponse(likeRepository.save(like).getId());
    }

    public void delete(Member member, String market) {
        Like like = likeRepository.findByMemberAndMarket(member, market);
        likeRepository.delete(like);
    }

    private String getLikesMarkets(List<Like> likeList) {
        String markets = "";

        for (Like like : likeList) {
            if (!markets.contains(like.getMarket())) {
                markets += like.getMarket() + ",";
            }
        }

        if (markets.isBlank()) {
            return markets;
        }

        return markets.substring(0, markets.length() - 1);
    }

    private void loginCheck(Member member) {
        if (member == null) {
            throw new NotLoggedInException();
        }
    }
}
