package com.project.cs.member.repository;

import com.project.cs.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long>{
    Member findByEmail(String email);
    Boolean existsByEmail(String email);
}
