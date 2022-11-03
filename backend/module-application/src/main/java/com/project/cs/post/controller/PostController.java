package com.project.cs.post.controller;

import com.project.cs.member.entity.Member;
import com.project.cs.post.request.PostRequest;
import com.project.cs.post.request.PostSaveRequest;
import com.project.cs.post.response.PostDto;
import com.project.cs.post.service.PostService;
import com.project.cs.security.annotation.LoginMember;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/api/posts")
public class PostController {
    private final PostService postService;

    @ApiOperation("게시글 목록 조회")
    @GetMapping
    public ResponseEntity<List<PostDto>> getPosts() {
        return ResponseEntity.ok(postService.getPosts());
    }

    @ApiOperation("게시글 작성")
    @PostMapping(value = "/post", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    @ApiImplicitParams({
            @ApiImplicitParam(name = "Authorization", value = "사용자 인증을 위한 accessToken", paramType = "header", required = true)
    })
    public ResponseEntity<PostDto> post(@Validated @RequestPart(value = "requestData") PostRequest requestData,
                                        @RequestPart(value = "requestFiles", required = false) List<MultipartFile> requestFiles,
                                        @LoginMember Member member) throws IOException {
        return ResponseEntity.ok(postService.post(new PostSaveRequest(requestData, requestFiles), member));
    }

    @ApiOperation("게시글 상세 조회")
    @GetMapping("/{postId}")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "Authorization", value = "사용자 인증을 위한 accessToken", paramType = "header", required = true)
    })
    public ResponseEntity<PostDto> getPost(@PathVariable("postId") Long postId) {
        return ResponseEntity.ok(postService.getPost(postId));
    }

    @ApiOperation("게시글 수정")
    @PostMapping(value = "/{postId}", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    @ApiImplicitParams({
            @ApiImplicitParam(name = "Authorization", value = "사용자 인증을 위한 accessToken", paramType = "header", required = true)
    })
    public ResponseEntity<PostDto> update(@PathVariable("postId") Long postId,
                                          @Validated @RequestPart(value = "requestData") PostRequest requestData,
                                          @RequestPart(value = "requestFiles", required = false) List<MultipartFile> requestFiles,
                                          @LoginMember Member member) {
        return ResponseEntity.ok(postService.update(postId, new PostSaveRequest(requestData, requestFiles), member));
    }

    @ApiOperation("게시글 삭제")
    @DeleteMapping("/{postId}")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "Authorization", value = "사용자 인증을 위한 accessToken", paramType = "header", required = true)
    })
    @ResponseStatus(HttpStatus.NON_AUTHORITATIVE_INFORMATION)
    public void delete(@PathVariable("postId") Long postId,
                       @LoginMember Member member) {
        postService.delete(postId, member);
    }
}
