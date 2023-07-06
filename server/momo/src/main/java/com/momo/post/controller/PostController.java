package com.momo.post.controller;

import com.momo.post.dto.PostPatchDto;
import com.momo.post.dto.PostPostDto;
import com.momo.post.dto.PostResponseDto;
import com.momo.post.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostController {
    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/{categoryId}/{postId}/{memberId}/{locationId}")
    public List<PostResponseDto> getPostsByCategoryAndPost(
            @PathVariable Long categoryId,
            @PathVariable Long postId,
            @PathVariable Long memberId,
            @PathVariable Long locationId
    ) {
        return postService.getPostsByCategoryAndPost(categoryId, postId, memberId, locationId);
    }

    @PostMapping
    public PostResponseDto createPost(@RequestBody PostPostDto postDto) {
        return postService.createPost(postDto);
    }

    @PatchMapping("/{postId}")
    public PostResponseDto updatePost(
            @PathVariable Long postId,
            @RequestBody PostPatchDto postDto
    ) {
        Long memberId = postDto.getMemberId();
        Long locationId = postDto.getLocationId(); // 추가된 부분
        return postService.updatePost(postId, memberId, locationId, postDto);
    }

    @DeleteMapping("/{postId}/{memberId}")
    public void deletePost(
            @PathVariable Long postId,
            @PathVariable Long memberId
    ) {
        postService.deletePost(postId, memberId);
    }
}