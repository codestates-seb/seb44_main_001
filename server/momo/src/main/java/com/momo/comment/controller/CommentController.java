package com.momo.comment.controller;

import com.momo.comment.dto.CommentDto;
import com.momo.comment.dto.CommentPatchDto;
import com.momo.comment.dto.CommentPostDto;
import com.momo.comment.entity.Comment;
import com.momo.comment.service.CommentService;
import com.momo.response.MultiResponseDto;
import com.momo.response.PageInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/comments")
@RequiredArgsConstructor
@Slf4j
public class CommentController {
    private final CommentService commentService;

    @GetMapping("/{postId}")
    public MultiResponseDto getAnswers(@PathVariable Long postId,
                                       @RequestParam(defaultValue = "1") int page,
                                       @RequestParam(defaultValue = "5") int size){
        log.info("{} {}", page, size);
        Page<Comment> commentPage = commentService.getCommentPage(postId, page, size);
        PageInfo pageInfo = PageInfo.builder()
                .page(page)
                .size(size)
                .totalElements(commentPage.getTotalElements())
                .totalPages(commentPage.getTotalPages())
                .build();

        List<CommentDto> comments = commentPage.getContent().stream()
                .map(comment -> CommentDto.from(comment))
                .collect(Collectors.toList());

        return MultiResponseDto.<CommentDto>builder()
                .pageInfo(pageInfo)
                .data(comments)
                .build();
    }

    @PostMapping("/{postId}")
    public CommentDto postComment(@PathVariable Long postId,
                                  @RequestBody CommentPostDto postDto){
        log.info("{} {}", postDto.getMemberId(), postDto.getContent());
        Comment comment = commentService.addComment(postId, postDto);
        return CommentDto.from(comment);
    }

    @PatchMapping("/{commentId}")
    public CommentDto updateComment(@PathVariable Long commentId,
                                    @RequestBody CommentPatchDto patchDto){
        log.info("{} {}", patchDto.getMemberId(), patchDto.getContent());
        Comment comment = commentService.updateComment(commentId, patchDto);
        return CommentDto.from(comment);
    }

    @DeleteMapping("/{commentId}/{memberId}")
    public ResponseEntity deleteComment(@PathVariable Long commentId,
                                        @PathVariable Long memberId) {
        commentService.deleteComment(commentId, memberId);

        return ResponseEntity.noContent().build();
    }
}
