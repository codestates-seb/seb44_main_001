package com.momo.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    MEMBER_ALREADY_IN_ROOM(404, "MEMBER_ALREADY_IN_ROOM"),
    MEMBER_NOT_ROOMKING(404, "MEMBER_NOT_ROOMKING"),
    MEMBER_DUPLICATED(404, "MEMBER_DUPLICATED"),
    POST_NOT_FOUND(404, "Post not found"),
    CANNOT_CHANGE_QUESTION(403, "Question can not change"),
    CANNOT_READ_QUESTION(403, "Question can not read"),
    QUESTION_USER_NOT_MATCH(403, "Question and user don't match"),

    COMMENT_NOT_FOUND(404, "Comment not found"),
    COMMENT_MEMBER_NOT_MATCH(403, "Cannot change comment because memberId is different"),

    JWT_TOKEN_EXPIRED(401, "JWT Token expired");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
