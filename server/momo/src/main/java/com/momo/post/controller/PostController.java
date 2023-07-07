package com.momo.post.controller;

import com.momo.post.dto.PostPatchDto;
import com.momo.post.dto.PostPostDto;
import com.momo.post.dto.PostResponseDto;
import com.momo.post.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<PostResponseDto> getPostsByCategoryAndPost(
            @PathVariable(required = false) Long categoryId,
            @PathVariable(required = false) Long postId,
            @PathVariable(required = false) Long memberId,
            @PathVariable(required = false) Long locationId,
            @RequestParam(defaultValue = "1") int page
    ) {
        List<PostResponseDto> responseDtoList = postService.getPostsByCategoryAndPost(categoryId, postId, memberId, locationId, page);
        if (responseDtoList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            PostResponseDto responseDto = responseDtoList.get(0);
            return new ResponseEntity<>(responseDto, HttpStatus.OK);
        }
    }
    @GetMapping
    public List<PostResponseDto> getAllPosts(
            @RequestParam(defaultValue = "1") int page
    ) {
        return postService.getAllPosts(page);
    }
    @GetMapping("/category")
    public List<PostResponseDto> getPostsByCategory(
            @RequestParam("categoryId") Long categoryId,
            @RequestParam(defaultValue = "1") int page
    ) {
        return postService.getPostsByCategory(categoryId, page);
    }

    @GetMapping("/member")
    public List<PostResponseDto> getPostsByMember(
            @RequestParam("memberId") Long memberId,
            @RequestParam(defaultValue = "1") int page
    ) {
        return postService.getPostsByMember(memberId, page);
    }

    @GetMapping("/location")
    public List<PostResponseDto> getPostsByLocation(
            @RequestParam("locationId") Long locationId,
            @RequestParam(defaultValue = "1") int page
    ) {
        return postService.getPostsByLocation(locationId, page);
    }

    @GetMapping("/category-location")
    public List<PostResponseDto> getPostsByCategoryAndLocation(
            @RequestParam("categoryId") Long categoryId,
            @RequestParam("locationId") Long locationId,
            @RequestParam(defaultValue = "1") int page
    ) {
        return postService.getPostsByCategoryAndLocation(categoryId, locationId, page);
    }
    @GetMapping("/search")
    public ResponseEntity<List<PostResponseDto>> searchPosts(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "1") int page
    ) {
        List<PostResponseDto> responseDtoList = postService.searchPosts(keyword, page);
        return new ResponseEntity<>(responseDtoList, HttpStatus.OK);
    }
    @GetMapping("/search")
    public ResponseEntity<List<PostResponseDto>> searchPostsByLocation(
            @RequestParam String keyword,
            @RequestParam(required = false) Long locationId,
            @RequestParam(defaultValue = "1") int page
    ) {
        List<PostResponseDto> responseDtoList;
        if (locationId != null) {
            responseDtoList = postService.searchPostsByLocation(keyword, locationId, page);
        } else {
            responseDtoList = postService.searchPosts(keyword, page);
        }
        return new ResponseEntity<>(responseDtoList, HttpStatus.OK);
    }
    @GetMapping("/search")
    public ResponseEntity<List<PostResponseDto>> searchPostsByCategory(
            @RequestParam String keyword,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(defaultValue = "1") int page
    ) {
        List<PostResponseDto> responseDtoList;
        if (categoryId != null) {
            responseDtoList = postService.searchPostsByCategory(keyword, categoryId, page);
        } else {
            responseDtoList = postService.searchPosts(keyword, page);
        }
        return new ResponseEntity<>(responseDtoList, HttpStatus.OK);
    }
    @GetMapping("/search")
    public ResponseEntity<List<PostResponseDto>> searchPostsByLocationAndCategory(
            @RequestParam String keyword,
            @RequestParam(required = false) Long locationId,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(defaultValue = "1") int page
    ) {
        List<PostResponseDto> responseDtoList;
        if (locationId != null && categoryId != null) {
            responseDtoList = postService.searchPostsByLocationAndCategory(keyword, locationId, categoryId, page);
        } else {
            responseDtoList = postService.searchPosts(keyword, page);
        }
        return new ResponseEntity<>(responseDtoList, HttpStatus.OK);
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