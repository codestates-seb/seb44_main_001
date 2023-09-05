package com.momo.post.controller;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.momo.exception.NotFoundException;
import com.momo.post.dto.PostPatchDto;
import com.momo.post.dto.PostPostDto;
import com.momo.post.dto.PostResponseDto;
import com.momo.post.service.PostService;
import com.momo.postlike.service.PostLikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/posts")
public class PostController {

    private final PostService postService;
    private final PostLikeService postLikeService;


    @Autowired
    public PostController( PostService postService, PostLikeService postLikeService) {
        this.postService = postService;
        this.postLikeService = postLikeService;
    }

    @GetMapping("/{postId}")
    public ResponseEntity<PostResponseDto> getPostById(
            @PathVariable Long postId,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(required = false) Long memberId
    ) {
        try {
            PostResponseDto responseDto = postService.getPostById(postId, page);

            if (memberId != null) {
                boolean isLiked = postLikeService.isPostLikedByMember(postId, memberId);
                responseDto.setLiked(isLiked);
            }

            return new ResponseEntity<>(responseDto, HttpStatus.OK);
        } catch (NotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
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

    @GetMapping("/search/location")
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

    @GetMapping("/search/category")
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

    @GetMapping("/search/category-location")
    public ResponseEntity<List<PostResponseDto>> searchPostsByCategoryAndLocation(
            @RequestParam String keyword,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) Long locationId,
            @RequestParam(defaultValue = "1") int page
    ) {
        List<PostResponseDto> responseDtoList;
        if (locationId != null && categoryId != null) {
            responseDtoList = postService.searchPostsByCategoryAndLocation(categoryId, locationId, keyword, page);
        } else {
            responseDtoList = postService.searchPosts(keyword, page);
        }
        return new ResponseEntity<>(responseDtoList, HttpStatus.OK);
    }
    @GetMapping("/like/member/{memberId}")
    public ResponseEntity<List<PostResponseDto>> getPostLikedByMember(
            @PathVariable Long memberId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "9") int size) {
        List<PostResponseDto> likedPosts = postService.getPostLikedByMember(memberId, page, size);
        return ResponseEntity.ok(likedPosts);
    }
    @PostMapping
    public PostResponseDto createPost(@RequestBody PostPostDto postDto) {
        return postService.createPost(postDto);
    }
    @PatchMapping("/{postId}/update")
    public PostResponseDto updatePost(
            @PathVariable("postId") Long postId,
            @RequestBody PostPatchDto postDto
    ) {
        Long memberId = postDto.getMemberId();
        return postService.updatePost(postId, memberId, postDto);
    }

    @DeleteMapping("/{postId}/{memberId}")
    public void deletePost(
            @PathVariable Long postId,
            @PathVariable Long memberId
    ) {
        postService.deletePost(postId, memberId);
    }
    @PostMapping("/upload-imag")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        try {

            String imageUrl = postService.saveImageToS3(file);
            return ResponseEntity.ok(imageUrl);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}