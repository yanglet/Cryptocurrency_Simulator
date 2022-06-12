package com.project.cs.comment.service;

import com.project.cs.comment.entity.Comment;
import com.project.cs.comment.repository.CommentRepository;
import com.project.cs.comment.request.CommentRequest;
import com.project.cs.member.entity.Member;
import com.project.cs.post.entity.Post;
import com.project.cs.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    public Long comment(Long postId,
                        CommentRequest commentRequest,
                        Member member){
        Comment comment = Comment.of(commentRequest.getContent(),
                member,
                postRepository.findById(postId).orElseThrow());

        return commentRepository.save(comment).getId();
    }

    @Transactional
    public void update(Long commentId,
                       CommentRequest commentRequest,
                       Member member){
        Comment comment = commentRepository.findById(commentId).orElseThrow();

        if(comment.getMember().getId() != member.getId()){
            throw new AccessDeniedException("access denied");
        }

        comment.change(commentRequest.getContent());
    }

    @Transactional
    public void delete(Long postId, Long commentId, Member member){
        Post post = postRepository.findById(postId).orElseThrow();
        Comment comment = commentRepository.findById(commentId).orElseThrow();

        if(post.getMember().getId() != member.getId() || comment.getMember().getId() != member.getId()){
            throw new AccessDeniedException("access denied");
        }

        commentRepository.delete(comment);
    }
}
