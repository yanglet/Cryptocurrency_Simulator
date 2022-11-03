package com.project.cs.comment.controller;

import com.project.cs.comment.request.CommentRequest;
import com.project.cs.comment.response.CommentDto;
import com.project.cs.comment.response.CommentResponse;
import com.project.cs.comment.service.CommentService;
import com.project.cs.member.entity.Member;
import com.project.cs.security.annotation.LoginMember;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("v1/api/posts")
public class CommentController {
    private final CommentService commentService;

    @ApiOperation("댓글 작성")
    @PostMapping("/{post_id}/comments/comment")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "Authorization", value = "사용자 인증을 위한 accessToken", paramType = "header", required = true)
    })
    public ResponseEntity<CommentResponse> comment(@PathVariable("post_id") Long postId,
                                                   @Validated @RequestBody CommentRequest commentRequest,
                                                   @LoginMember Member member) {
        return new ResponseEntity(commentService.comment(postId, commentRequest, member), HttpStatus.CREATED);
    }

    @ApiOperation("댓글 조회")
    @GetMapping("/{post_id}/comments")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "Authorization", value = "사용자 인증을 위한 accessToken", paramType = "header", required = true)
    })
    public ResponseEntity<List<CommentDto>> getComments(@PathVariable("post_id") Long postId) {
        return ResponseEntity.ok(commentService.getComments(postId));
    }

    @ApiOperation("댓글 수정")
    @PostMapping("/{post_id}/comments/{comment_id}")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "Authorization", value = "사용자 인증을 위한 accessToken", paramType = "header", required = true)
    })
    public ResponseEntity<CommentResponse> update(@PathVariable("post_id") Long postId,
                                                  @PathVariable("comment_id") Long commentId,
                                                  @LoginMember Member member,
                                                  @Validated @RequestBody CommentRequest commentRequest) {
        return ResponseEntity.ok(commentService.update(commentId, commentRequest, member));
    }

    @ApiOperation("댓글 삭제")
    @DeleteMapping("/{post_id}/comments/{comment_id}")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "Authorization", value = "사용자 인증을 위한 accessToken", paramType = "header", required = true)
    })
    @ResponseStatus(HttpStatus.NON_AUTHORITATIVE_INFORMATION)
    public void delete(@PathVariable("post_id") Long postId,
                       @PathVariable("comment_id") Long commentId,
                       @LoginMember Member member) {
        commentService.delete(postId, commentId, member);
    }
}
