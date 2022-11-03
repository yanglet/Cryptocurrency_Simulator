package com.project.cs.post.service;

import com.project.cs.post.entity.Post;
import com.project.cs.post.entity.UploadFile;
import com.project.cs.post.exception.FileUploadException;
import com.project.cs.post.repository.PostRepository;
import com.project.cs.post.repository.UploadFileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class UploadFileUtils {
    private final String fileDirName = "C:\\Users\\Yanglet\\Cryptocurrency_Simulator\\frontend\\public\\images\\";
    private final PostRepository postRepository;
    private final UploadFileRepository uploadFileRepository;

    public String getFullPath(String filename) {
        return fileDirName + filename;
    }

    public String createSavedFileName(String originalFilename) {
        String ext = extractExt(originalFilename);
        String uuid = UUID.randomUUID().toString();
        return uuid + "." + ext;
    }

    public String extractExt(String originalFilename) {
        int pos = originalFilename.lastIndexOf(".");
        return originalFilename.substring(pos + 1);
    }

    public Long saveFile(MultipartFile multipartFile, Long postId) {
        if (multipartFile == null || multipartFile.isEmpty()) {
            return -1L;
        }

        String originalFilename = multipartFile.getOriginalFilename();
        String savedFileName = createSavedFileName(originalFilename);
        transferTo(multipartFile, savedFileName);

        Post post = postRepository.findByIdFetch(postId);

        UploadFile uploadFile = UploadFile.builder()
                .originalFileName(originalFilename)
                .savedFileName(savedFileName)
                .post(post)
                .build();

        UploadFile save = uploadFileRepository.save(uploadFile);

        return save.getId() == null ? -1L : save.getId();
    }

    private void transferTo(MultipartFile multipartFile, String savedFileName) {
        try {
            multipartFile.transferTo(new File(getFullPath(savedFileName)));
        } catch (Exception e) {
            throw new FileUploadException();
        }
    }
}
