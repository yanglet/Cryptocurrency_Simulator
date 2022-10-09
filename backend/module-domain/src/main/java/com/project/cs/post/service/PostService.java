package com.project.cs.post.service;

import com.project.cs.comment.repository.CommentRepository;
import com.project.cs.member.entity.Member;
import com.project.cs.member.exception.NotLoggedInException;
import com.project.cs.post.entity.Post;
import com.project.cs.post.entity.UploadFile;
import com.project.cs.post.repository.PostRepository;
import com.project.cs.post.repository.UploadFileRepository;
import com.project.cs.post.request.PostRequest;
import com.project.cs.post.request.PostSaveRequest;
import com.project.cs.post.response.PostDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class PostService {
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final UploadFileUtils uploadFileUtils;
    private final UploadFileRepository uploadFileRepository;

    public List<PostDto> getPosts(){
        List<UploadFile> uploadFiles = uploadFileRepository.findAllFetch();

        return postRepository.findAllFetch()
                .stream()
                .map(p -> new PostDto(p,
                        uploadFiles
                                .stream()
                                .filter(u -> u.getPost().getId() == p.getId())
                                .distinct()
                                .collect(Collectors.toList())))
                .collect(Collectors.toList());
    }

    public PostDto getPost(Long postId){
        Post post = postRepository.findByIdFetch(postId);
        return new PostDto(post, uploadFileRepository.findByPost(post));
    }

    public PostDto post(PostSaveRequest postSaveRequest, Member member) throws IOException {
        loginCheck(member);

        Post post = Post.builder()
                .title(postSaveRequest.getTitle())
                .content(postSaveRequest.getContent())
                .member(member)
                .build();

        Post save = postRepository.save(post);

        postSaveRequest.getMultipartFiles().forEach(f -> uploadFileUtils.saveFile(f, save.getId()));

        return new PostDto(save, uploadFileRepository.findByPost(save));
    }

    public PostDto update(Long postId, PostSaveRequest postSaveRequest, Member member) {
        loginCheck(member);

        Post post = postRepository.findByIdFetch(postId);

        if(post.getMember().getId() != member.getId()){
            throw new AccessDeniedException("access denied");
        }

        post.change(postSaveRequest.getTitle(), postSaveRequest.getContent());

        uploadFileRepository.deleteAll(uploadFileRepository.findByPost(post));

        postSaveRequest.getMultipartFiles().forEach(f -> uploadFileUtils.saveFile(f, post.getId()));

        return new PostDto(post, uploadFileRepository.findByPost(post));
    }

    public void delete(Long postId, Member member){
        loginCheck(member);

        Post post = postRepository.findByIdFetch(postId);

        if(post.getMember().getId() != member.getId()){
            throw new AccessDeniedException("access denied");
        }

        commentRepository.deleteAll(post.getComments());

        if(uploadFileRepository.existsByPost(post)){
            uploadFileRepository.deleteAll(uploadFileRepository.findByPost(post));
        }

        postRepository.delete(post);
    }

    private void loginCheck(Member member) {
        if(member == null){
            throw new NotLoggedInException();
        }
    }

}
