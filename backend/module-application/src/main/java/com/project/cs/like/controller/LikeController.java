package com.project.cs.like.controller;

import com.project.cs.cryptocurrency.dto.CryptocurrencyDto;
import com.project.cs.like.response.LikeResponse;
import com.project.cs.like.service.LikeService;
import com.project.cs.member.entity.Member;
import com.project.cs.security.annotation.LoginMember;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/api/likes")
public class LikeController {
    private final LikeService likeService;

    @ApiOperation("관심 목록 조회")
    @GetMapping
    @ApiImplicitParams({
            @ApiImplicitParam(name = "Authorization", value = "사용자 인증을 위한 accessToken", paramType = "header", required = true)
    })
    public ResponseEntity<List<CryptocurrencyDto>> getLikes(@LoginMember Member member){
        List<CryptocurrencyDto> likeList = likeService.getLikes(member);
        return ResponseEntity.ok(likeList);
    }

    @ApiOperation("관심 목록 추가")
    @PostMapping("/like")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "Authorization", value = "사용자 인증을 위한 accessToken", paramType = "header", required = true),
            @ApiImplicitParam(name = "market", value = "마켓 코드", paramType = "query", required = true)
    })
    public ResponseEntity<LikeResponse> addLike(@LoginMember Member member,
                                                @RequestParam("market") String market){
        Long id = likeService.save(member, market);
        return ResponseEntity.ok(new LikeResponse(id));
    }

    @ApiOperation("관심 목록 삭제")
    @DeleteMapping("/like")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "Authorization", value = "사용자 인증을 위한 accessToken", paramType = "header", required = true),
            @ApiImplicitParam(name = "market", value = "마켓 코드", paramType = "query", required = true)
    })
    public void deleteLike(@LoginMember Member member,
                           @RequestParam("market") String market){
        likeService.delete(member, market);
    }
}
