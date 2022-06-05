package com.project.cs.member.controller;

import com.project.cs.member.entity.Member;
import com.project.cs.member.repository.MemberRepository;
import com.project.cs.member.response.MemberDto;
import com.project.cs.security.annotation.LoginMember;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/api/members")
public class MemberController {
    private final MemberRepository memberRepository;

    @ApiOperation("모든 회원 정보 조회")
    @GetMapping
    public ResponseEntity<List<MemberDto>> getMembers(){
        return ResponseEntity.ok(memberRepository.findAll()
                .stream()
                .map(MemberDto::new)
                .collect(Collectors.toList()));
    }

    @ApiOperation("회원 상세 정보 조회")
    @GetMapping("/me")
    public ResponseEntity<MemberDto> getMember(@LoginMember Member member){
        return ResponseEntity.ok(new MemberDto(member));
    }
}
