package com.project.cs.member.controller;

import com.project.cs.member.entity.Member;
import com.project.cs.member.response.MemberDto;
import com.project.cs.member.service.MemberService;
import com.project.cs.security.annotation.LoginMember;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/api/members")
public class MemberController {
    private final MemberService memberService;

    @ApiOperation("모든 회원 정보 조회")
    @GetMapping
    public ResponseEntity<List<MemberDto>> getMembers() {
        return ResponseEntity.ok(memberService.getMembers());
    }

    @ApiOperation("회원 상세 정보 조회")
    @GetMapping("/me")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "Authorization", value = "사용자 인증을 위한 accessToken", paramType = "header", required = true)
    })
    public ResponseEntity<MemberDto> getMember(@LoginMember Member member) {
        return ResponseEntity.ok(memberService.getMember(member.getId()));
    }
}
