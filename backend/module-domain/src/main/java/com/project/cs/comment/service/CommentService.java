package com.project.cs.comment.service;

import com.project.cs.comment.entity.Comment;
import com.project.cs.comment.exception.CommentNotFoundException;
import com.project.cs.comment.repository.CommentRepository;
import com.project.cs.comment.request.CommentRequest;
import com.project.cs.comment.response.CommentDto;
import com.project.cs.comment.response.CommentResponse;
import com.project.cs.member.entity.Member;
import com.project.cs.member.exception.NotLoggedInException;
import com.project.cs.post.entity.Post;
import com.project.cs.post.exception.PostNotFoundException;
import com.project.cs.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class CommentService {
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    public CommentResponse comment(Long postId,
                                   CommentRequest commentRequest,
                                   Member member) {
        loginCheck(member);

        Comment comment = Comment.of(commentRequest.getContent(),
                member,
                postRepository.findById(postId).orElseThrow(PostNotFoundException::new));

        return new CommentResponse(commentRepository.save(comment).getId());
    }

    public CommentResponse update(Long commentId,
                                  CommentRequest commentRequest,
                                  Member member) {
        loginCheck(member);

        Comment comment = commentRepository.findById(commentId).orElseThrow(CommentNotFoundException::new);

        if (comment.getMember().getId() != member.getId()) {
            throw new AccessDeniedException("access denied");
        }

        comment.change(commentRequest.getContent());

        return new CommentResponse(commentId);
    }

    public void delete(Long postId, Long commentId, Member member) {
        loginCheck(member);

        Post post = postRepository.findById(postId).orElseThrow(PostNotFoundException::new);
        Comment comment = commentRepository.findById(commentId).orElseThrow(CommentNotFoundException::new);

        if (post.getMember().getId() == member.getId() || comment.getMember().getId() == member.getId()) {
            commentRepository.delete(comment);
        } else {
            throw new AccessDeniedException("access denied");
        }
    }

    public List<CommentDto> getComments(Long postId) {
        return commentRepository.findByPostId(postId)
                .stream()
                .map(c -> new CommentDto(c))
                .collect(Collectors.toList());
    }

    private void loginCheck(Member member) {
        if (member == null) {
            throw new NotLoggedInException();
        }
    }
}
