package com.project.cs.post.service;

import com.project.cs.post.entity.UploadFile;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
public class UploadFileUtils {
    private final String fileDirName = "C:\\Users\\Yanglet\\cryptocurrency_simulator_files\\";

    public String getFullPath(String filename){
        return fileDirName + filename;
    }

    // 실제 서버에 저장되는 파일이름 ( uuid를 이용해서 유일성 보장 )
    public String createSavedFileName(String originalFilename){
        String ext = extractExt(originalFilename);
        String uuid = UUID.randomUUID().toString();
        return uuid + "." + ext;
    }

    // 확장자 추출
    public String extractExt(String originalFilename){
        int pos = originalFilename.lastIndexOf(".");
        return originalFilename.substring(pos + 1);
    }

    public UploadFile createUploadFile(MultipartFile multipartFile) throws IOException {
        if(multipartFile == null){
            return null;
        }

        String originalFilename = multipartFile.getOriginalFilename();
        String savedFileName = createSavedFileName(originalFilename);

        multipartFile.transferTo(new File(getFullPath(savedFileName)));

        return new UploadFile(originalFilename, savedFileName);
    }
}
