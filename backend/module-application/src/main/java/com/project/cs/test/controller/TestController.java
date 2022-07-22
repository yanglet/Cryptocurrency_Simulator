package com.project.cs.test.controller;

import com.project.cs.test.request.TestRequest;
import com.project.cs.test.request.TestSaveRequest;
import com.project.cs.test.response.TestResponse;
import com.project.cs.test.response.TestSaveResponse;
import com.project.cs.test.service.TestService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/api/tests")
public class TestController {
    private final TestService testService;

    @ApiOperation("비트코인 투자 테스트")
    @PostMapping
    public ResponseEntity<TestResponse> test(@Validated @RequestBody TestRequest testRequest){
        TestResponse testResponse = testService.test(testRequest);
        return ResponseEntity.ok(testResponse);
    }

    @ApiOperation("비트코인 투자 테스트 정보 추가")
    @PostMapping("/test")
    public ResponseEntity<TestSaveResponse> save(@Validated @RequestBody TestSaveRequest testSaveRequest){
        TestSaveResponse testSaveResponse = testService.save(testSaveRequest);
        return ResponseEntity.ok(testSaveResponse);
    }
}
