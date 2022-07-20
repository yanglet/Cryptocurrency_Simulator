package com.project.cs.test.controller;

import com.project.cs.test.request.TestRequest;
import com.project.cs.test.response.TestResponse;
import com.project.cs.test.service.TestService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class TestController {
    private final TestService testService;

    @ApiOperation("비트코인 투자 테스트")
    @PostMapping("/v1/api/tests")
    public ResponseEntity<TestResponse> test(@Validated @RequestBody TestRequest testRequest){
        TestResponse testResponse = testService.test(testRequest);
        return ResponseEntity.ok(testResponse);
    }
}
