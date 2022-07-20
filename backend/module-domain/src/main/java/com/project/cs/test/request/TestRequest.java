package com.project.cs.test.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Positive;

@Getter
@AllArgsConstructor
public class TestRequest {
    @NotEmpty
    private String market;
    @NotEmpty
    @Positive
    private String money; // 테스트 투자 금액
    @NotEmpty
    private String time; // 과거 시간 포맷 : yyyy-MM-dd'T'HH:mm:ss'Z' or yyyy-MM-dd HH:mm:ss
}
