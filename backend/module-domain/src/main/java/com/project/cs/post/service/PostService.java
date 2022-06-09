package com.project.cs.post.service;

import com.project.cs.member.entity.Member;
import com.project.cs.post.entity.Post;
import com.project.cs.post.repository.PostRepository;
import com.project.cs.post.request.PostRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final UploadFileUtils uploadFileUtils;

    public Long post(PostRequest postRequest, Member member) throws IOException {
        Post post = Post.builder()
                .title(postRequest.getTitle())
                .content(postRequest.getContent())
                .uploadFile(uploadFileUtils.createUploadFile(postRequest.getMultipartFile()))
                .member(member)
                .build();

        return postRepository.save(post).getId();
    }

    @Transactional
    public void update(Long id, PostRequest postRequest) throws IOException {
        Post post = postRepository.findById(id).orElseThrow();

        if( post.getUploadFile().getOriginalFileName() != postRequest.getMultipartFile().getOriginalFilename() ){
            post.change(postRequest.getTitle(), postRequest.getContent(), uploadFileUtils.createUploadFile(postRequest.getMultipartFile()));
        }else{
            post.change(postRequest.getTitle(), postRequest.getContent(), post.getUploadFile());
        }
    }

}
