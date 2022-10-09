package com.project.cs.error;

import com.project.cs.comment.exception.CommentNotFoundException;
import com.project.cs.exception.ForbiddenException;
import com.project.cs.exception.NotFoundException;
import com.project.cs.member.exception.InsufficientBalanceException;
import com.project.cs.member.exception.MemberDuplicateException;
import com.project.cs.member.exception.NotLoggedInException;
import com.project.cs.order.exception.InsufficientVolumeException;
import com.project.cs.orderitem.exception.OrderItemNotFoundException;
import com.project.cs.post.exception.PostNotFoundException;
import com.project.cs.security.jwt.exception.TokenHasExpiredException;
import com.project.cs.security.jwt.exception.TokenIsInvalidException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@RestControllerAdvice("com.project.cs")
@Slf4j
public class ApiExceptionHandler {
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler
    protected ErrorResult handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        log.error("handleMethodArgumentNotValidException", e);
        return new ErrorResult("400", "입력값이 잘못되었습니다.");
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler
    protected ErrorResult handleCommentNotFoundException(CommentNotFoundException e){
        log.error("handleCommentNotFoundException", e);
        return new ErrorResult("400", "해당 댓글을 찾을 수 없습니다.");
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler
    protected ErrorResult handleInsufficientBalanceException(InsufficientBalanceException e){
        log.error("handleInsufficientBalanceException", e);
        return new ErrorResult("400", "보유 금액이 부족합니다.");
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler
    protected ErrorResult handleInsufficientVolumeException(InsufficientVolumeException e){
        log.error("handleInsufficientVolumeException", e);
        return new ErrorResult("400", "주문 수량이 보유 수량보다 많습니다.");
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler
    protected ErrorResult handleOrderItemNotFoundException(OrderItemNotFoundException e){
        log.error("handleOrderItemNotFoundException", e);
        return new ErrorResult("400", "해당 보유 자산을 찾을 수 없습니다.");
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler
    protected ErrorResult handlePostNotFoundException(PostNotFoundException e){
        log.error("handlePostNotFoundException", e);
        return new ErrorResult("400", "해당 게시글을 찾을 수 없습니다.");
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler
    protected ErrorResult handleMemberDuplicateException(MemberDuplicateException e){
        log.error("handleMemberDuplicateException", e);
        return new ErrorResult("400", "중복된 아이디입니다.");
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler
    protected ErrorResult handleMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException e){
        log.error("MethodArgumentTypeMismatchException", e);
        return new ErrorResult("400", "Enum 타입 바인딩 오류입니다.");
    }

    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler
    protected ErrorResult handleNotLoggedInException(NotLoggedInException e){
        log.error("handleNotLoggedInException", e);
        return new ErrorResult("403", "로그인 후 이용해주세요.");
    }

    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler
    protected ErrorResult handleForbiddenException(ForbiddenException e){
        log.error("handleForbiddenException", e);
        return new ErrorResult("403", "접근이 불가합니다.");
    }

    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler
    protected ErrorResult handleTokenHasExpiredException(TokenHasExpiredException e){
        log.error("handleTokenHasExpiredException", e);
        return new ErrorResult("403", "토큰이 만료되었습니다.");
    }

    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler
    protected ErrorResult handleTokenIsInvalidException(TokenIsInvalidException e){
        log.error("handleTokenIsInvalidException", e);
        return new ErrorResult("403", "토큰이 유효하지 않습니다.");
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler
    protected ErrorResult handleNotFoundException(NotFoundException e){
        log.error("handleForbiddenException", e);
        return new ErrorResult("404", "해당 요청에 대한 응답을 찾을 수 없습니다.");
    }

    @ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
    @ExceptionHandler
    protected ErrorResult handleHttpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException e){
        log.error("handleHttpRequestMethodNotSupportedException", e);
        return new ErrorResult("405", "지원하지않는 Http Method 입니다.");
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler
    protected ErrorResult handleException(Exception e){
        log.error("handleException", e);
        return new ErrorResult("500", "서버 오류입니다.");
    }
}
