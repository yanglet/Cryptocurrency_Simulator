package com.project.cs.member.service;

import com.project.cs.member.entity.Member;
import com.project.cs.member.exception.MemberDuplicateException;
import com.project.cs.member.exception.PasswordMismatchException;
import com.project.cs.member.repository.MemberRepository;
import com.project.cs.member.request.SigninRequest;
import com.project.cs.member.request.SignupRequest;
import com.project.cs.member.response.MemberDto;
import com.project.cs.member.response.SignupResponse;
import com.project.cs.ranking.entity.Ranking;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {
    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public List<MemberDto> getMembers() {
        return memberRepository.findAllFetch()
                .stream()
                .map(MemberDto::new)
                .collect(Collectors.toList());
    }

    public MemberDto getMember(Long memberId) {
        return new MemberDto(memberRepository.findByIdFetch(memberId));
    }

    public SignupResponse signup(SignupRequest signUpRequest) {
        if (memberRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new MemberDuplicateException();
        }
        Ranking ranking = Ranking.builder()
                .rank((int) memberRepository.count() + 1)
                .profit(0.0)
                .build();

        Member member = Member.builder()
                .email(signUpRequest.getEmail())
                .password(passwordEncoder.encode(signUpRequest.getPassword()))
                .name(signUpRequest.getName())
                .balance(signUpRequest.getBalance())
                .role("ROLE_USER")
                .ranking(ranking)
                .build();

        Member result = memberRepository.save(member);

        return new SignupResponse(result.getId());
    }

    public Member signin(SigninRequest signinRequest) {
        Member member = memberRepository.findByEmail(signinRequest.getEmail());
        checkPassword(signinRequest.getPassword(), member.getPassword());

        return member;
    }

    private void checkPassword(String loginPassword, String password) {
        if (!passwordEncoder.matches(loginPassword, password)) {
            throw new PasswordMismatchException();
        }
    }
}
