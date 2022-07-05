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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/api/posts")
public class PostController {
    private final PostService postService;
    private final PostRepository postRepository;

    @ApiOperation("게시글 목록 조회")
    @GetMapping
    public ResponseEntity<List<SimplePostDto>> getPosts(){;
        return ResponseEntity.ok(postRepository.findAllFetch()
                .stream()
                .map(p -> new SimplePostDto(p))
                .collect(Collectors.toList()));
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
        return ResponseEntity.ok(new PostDto(postRepository.findByIdFetch(id)));
    }

    @ApiOperation("게시글 수정")
    @PostMapping("/{post_id}")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "Authorization", value = "사용자 인증을 위한 accessToken", paramType = "header", required = true)
    })
    public ResponseEntity<PostResponse> update(@PathVariable("post_id") Long postId,
                                               @Validated @RequestBody PostRequest postRequest,
                                               @LoginMember Member member) throws IOException {
        postService.update(postId, postRequest, member);
        return ResponseEntity.ok(new PostResponse(postId));
    }

    @ApiOperation("게시글 삭제")
    @DeleteMapping("/{post_id}")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "Authorization", value = "사용자 인증을 위한 accessToken", paramType = "header", required = true)
    })
    @ResponseStatus(HttpStatus.NON_AUTHORITATIVE_INFORMATION)
    public void delete(@PathVariable("post_id") Long postId,
                       @LoginMember Member member){
        postService.delete(postId, member);
    }
}
