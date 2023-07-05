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

    @GetMapping("/{categoryId}/{memberId}")
    public List<PostResponseDto> getPostsByCategoryAndRegion(
            @PathVariable Long categoryId,
            @PathVariable Long memberId
    ) {
        return postService.getPostsByCategoryAndRegion(categoryId, memberId);
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
        PostResponseDto responseDto = postService.updatePost(postId, postDto);
        responseDto.setMemberId(postDto.getMemberId());
        responseDto.setCategoryId(postDto.getCategoryId());
        return responseDto;
    }

    @DeleteMapping("/{postId}/{memberId}")
    public void deletePost(
            @PathVariable Long postId,
            @PathVariable Long memberId
    ) {
        postService.deletePost(postId, memberId);
    }
}