package com.project.cs.like.repository;

import com.project.cs.like.entity.Like;
import com.project.cs.member.entity.Member;

import java.util.List;

public interface LikeRepositoryCustom {
    List<Like> findByMember(Member member);
    Like findByMemberAndMarket(Member member, String market);
}
