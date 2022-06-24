package com.project.cs.security.jwt.exception;

import com.project.cs.exception.ForbiddenException;

public class TokenIsInvalidException extends ForbiddenException {
    public TokenIsInvalidException() {
    super("Token is invalid");
}
}
