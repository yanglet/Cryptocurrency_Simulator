package com.project.cs.comment.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;

@Getter
@Setter
@AllArgsConstructor
public class CommentRequest {
    @NotEmpty
    private String content;
}
