package com.project.cs.test.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Positive;
import java.math.BigDecimal;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TestSaveRequest {
    @NotEmpty
    private String time; // yyyy-mm 형태
    @Positive
    @NotEmpty
    private BigDecimal price;
}
