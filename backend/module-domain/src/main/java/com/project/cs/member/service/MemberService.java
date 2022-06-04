package com.project.cs.member.service;

import com.project.cs.member.entity.Member;
import com.project.cs.member.exception.MemberDuplicateException;
import com.project.cs.member.repository.MemberRepository;
import com.project.cs.member.request.SigninRequest;
import com.project.cs.member.request.SignupRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberService {
    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public Long signup(SignupRequest signUpRequest){
        if( memberRepository.existsByEmail(signUpRequest.getEmail()) ){
            throw new MemberDuplicateException();
        }

        Member member = Member.builder()
                .email(signUpRequest.getEmail())
                .password(passwordEncoder.encode(signUpRequest.getPassword()))
                .name(signUpRequest.getName())
                .balance(signUpRequest.getBalance())
                .role("ROLE_USER")
                .ranking(null)
                .build();

        Member result = memberRepository.save(member);

        return result.getId();
    }
}
