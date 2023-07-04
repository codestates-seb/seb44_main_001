package com.momo.advice;

import com.momo.exception.BusinessLogicException;
import com.momo.response.ErrorResponse;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionAdvice {

    @ExceptionHandler(value = {BusinessLogicException.class})
    public ResponseEntity handleBusinessLogicException(BusinessLogicException e) {
        final ErrorResponse response = ErrorResponse.of(e.getExceptionCode());
        log.debug("# BusinessLogicException: {}-{}", e.getExceptionCode(), e.getMessage());

        return new ResponseEntity<>(response,
                                    HttpStatus.valueOf(e.getExceptionCode().getStatus())
        );
    }
}
