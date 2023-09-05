package com.momo.postlike.controller;

import com.momo.post.dto.PostResponseDto;
import com.momo.postlike.dto.PostLikePostDto;
import com.momo.postlike.dto.PostLikeResponseDto;
import com.momo.postlike.entity.PostLike;
import com.momo.postlike.repository.PostLikeRepository;
import com.momo.postlike.service.PostLikeService;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/likes")
public class PostLikeController {

    private final PostLikeService postLikeService;
    private final PostLikeRepository postLikeRepository;

    public PostLikeController(PostLikeService postLikeService, PostLikeRepository postLikeRepository) {
        this.postLikeService = postLikeService;
        this.postLikeRepository = postLikeRepository;
    }

    @GetMapping("/{postId}")
    public ResponseEntity<Long> getPostLikeCount(@PathVariable Long postId) {
        long likeCount = postLikeService.getPostLikeCount(postId);
        return ResponseEntity.ok(likeCount);
    }

    @GetMapping("/{postId}/{memberId}")
    public ResponseEntity<Boolean> isPostLikedByMember(@PathVariable Long postId, @PathVariable Long memberId) {
        boolean isLiked = postLikeService.isPostLikedByMember(postId, memberId);
        return ResponseEntity.ok(isLiked);
    }

    @PostMapping("/{postId}/{memberId}")
    public ResponseEntity<PostLikeResponseDto> createPostLike(@PathVariable Long postId, @PathVariable Long memberId,
                                                              @RequestBody PostLikePostDto postLikePostDto) {
        boolean isLiked = postLikePostDto.isLiked();
        postLikeService.createPostLike(postId, memberId, isLiked);
        long likeCount = postLikeService.getPostLikeCount(postId);

        boolean updatedIsLiked = postLikeRepository.existsByPost_PostIdAndMember_MemberId(postId, memberId);
        PostLikeResponseDto responseDto = new PostLikeResponseDto(likeCount, updatedIsLiked);

        return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
    }

    @DeleteMapping("/{postId}/{memberId}")
    public ResponseEntity<PostLikeResponseDto> removePostLike(@PathVariable Long postId, @PathVariable Long memberId) {
        postLikeService.deletePostLike(postId, memberId);

        long likeCount = postLikeRepository.countByPost_PostId(postId);
        boolean isLiked = postLikeRepository.existsByPost_PostIdAndMember_MemberId(postId, memberId);

        PostLikeResponseDto responseDto = new PostLikeResponseDto(likeCount, isLiked);
        return ResponseEntity.ok(responseDto);
    }
}
