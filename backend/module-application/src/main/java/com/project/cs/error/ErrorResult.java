package com.project.cs.error;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ErrorResult<T> {
    private String statusCode;
    private String message;
}
