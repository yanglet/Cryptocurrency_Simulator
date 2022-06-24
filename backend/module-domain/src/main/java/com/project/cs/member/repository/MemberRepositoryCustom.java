package com.project.cs.member.repository;

import com.project.cs.member.entity.Member;

import java.util.List;

public interface MemberRepositoryCustom {
    List<Member> findAllFetch();
    Member findByIdFetch(Long id);
}
