package com.ssafy.fullerting.global.s3.controller;

import com.ssafy.fullerting.global.s3.entity.response.S3Response;
import com.ssafy.fullerting.global.s3.servcie.AmazonS3Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/file")
public class AmazonS3Controller {
    private final AmazonS3Service amazonS3Service;

    @PostMapping("/uploadFile")
    public ResponseEntity<S3Response> uploadFile(List<MultipartFile> multipartFiles){
        log.info("들어옴?");
        return ResponseEntity.ok(amazonS3Service.uploadFile(multipartFiles));
    }

    @DeleteMapping("/deleteFile")
    public ResponseEntity<String> deleteFile(@RequestParam String fileName){
        amazonS3Service.deleteFile(fileName);
        return ResponseEntity.ok(fileName);
    }
}