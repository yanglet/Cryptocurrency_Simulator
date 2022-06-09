package com.project.cs.post.controller;

import com.project.cs.member.entity.Member;
import com.project.cs.post.repository.PostRepository;
import com.project.cs.post.request.PostRequest;
import com.project.cs.post.response.PostDto;
import com.project.cs.post.response.PostResponse;
import com.project.cs.post.response.SimplePostDto;
import com.project.cs.post.service.PostService;
import com.project.cs.security.annotation.LoginMember;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/api/posts")
public class PostController {
    private final PostService postService;
    private final PostRepository postRepository;

    @ApiOperation("게시글 목록 조회")
    @GetMapping
    public ResponseEntity<Page<SimplePostDto>> getPosts(Pageable pageable){
        Page<SimplePostDto> dtoPages = postRepository.findAllOrderById(pageable)
                .map(p -> new SimplePostDto(p));
        return ResponseEntity.ok(dtoPages);
    }

    @ApiOperation("게시글 작성")
    @PostMapping("/post")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "Authorization", value = "사용자 인증을 위한 accessToken", paramType = "header", required = true)
    })
    public ResponseEntity<PostResponse> post(@Validated @RequestBody PostRequest postRequest,
                                            @LoginMember Member member) throws IOException {
        Long id = postService.post(postRequest, member);

        return new ResponseEntity(new PostResponse(id), HttpStatus.CREATED);
    }

    @ApiOperation("게시글 상세 조회")
    @GetMapping("/{post_id}")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "Authorization", value = "사용자 인증을 위한 accessToken", paramType = "header", required = true)
    })
    public ResponseEntity<PostDto> getPost(@PathVariable("post_id") Long id){
        return ResponseEntity.ok(new PostDto(postRepository.findById(id).orElseThrow()));
    }

    @ApiOperation("게시글 수정")
    @PostMapping("/{post_id}")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "Authorization", value = "사용자 인증을 위한 accessToken", paramType = "header", required = true)
    })
    public ResponseEntity<PostResponse> update(@PathVariable("post_id") Long id,
                                               @Validated @RequestBody PostRequest postRequest,
                                               @LoginMember Member member) throws IOException {
        postService.update(id, postRequest);
        return ResponseEntity.ok(new PostResponse(id));
    }

    @ApiOperation("게시글 삭제")
    @DeleteMapping("/{post_id}")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "Authorization", value = "사용자 인증을 위한 accessToken", paramType = "header", required = true)
    })
    @ResponseStatus(HttpStatus.NON_AUTHORITATIVE_INFORMATION)
    public void delete(@PathVariable("post_id") Long id){
        postRepository.deleteById(id);
    }
}
