package com.laptrinhjavaweb.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

import com.laptrinhjavaweb.response.ErrorResponse;

import io.jsonwebtoken.SignatureException;

@ControllerAdvice
@RestController
public class GlobalExceptionHandler {

    @ExceptionHandler(SignatureException.class)
    public ResponseEntity<ErrorResponse> handleSignatureException(SignatureException ex) {
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.UNAUTHORIZED.value(), "Token không hợp lệ hoặc đã bị thay đổi.");
        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }

}
