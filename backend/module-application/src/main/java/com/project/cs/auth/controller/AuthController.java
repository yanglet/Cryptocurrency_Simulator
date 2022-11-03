package com.project.cs.auth.controller;

import com.project.cs.member.entity.Member;
import com.project.cs.member.request.SigninRequest;
import com.project.cs.member.request.SignupRequest;
import com.project.cs.member.response.SigninResponse;
import com.project.cs.member.response.SignupResponse;
import com.project.cs.member.service.MemberService;
import com.project.cs.security.jwt.JwtProvider;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/api/auth")
public class AuthController {
    private final MemberService memberService;
    private final JwtProvider jwtProvider;

    @ApiOperation("회원가입")
    @PostMapping("/signup")
    public ResponseEntity<SignupResponse> signup(@Validated @RequestBody SignupRequest signUpRequest) {
        return new ResponseEntity(memberService.signup(signUpRequest), HttpStatus.CREATED);
    }

    @ApiOperation("회원 로그인")
    @PostMapping("/login")
    public ResponseEntity<SigninResponse> signin(@Validated @RequestBody SigninRequest signinRequest) {
        Member member = memberService.signin(signinRequest);
        String accessToken = jwtProvider.generateAccessToken(member);

        return ResponseEntity.ok(new SigninResponse(accessToken));
    }
}
