//package com.momo.post.service;
//
//import com.momo.post.entity.Post;
//import com.momo.post.repository.PostRepository;
//import org.junit.jupiter.api.Assertions;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.MockitoAnnotations;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import com.momo.post.dto.PostPatchDto;
//import com.momo.post.dto.PostPostDto;
//import com.momo.post.dto.PostResponseDto;
//
//import java.util.Optional;
//
//import static org.mockito.Mockito.*;
//
//@SpringBootTest
//public class PostServiceTest {
//
//    @Autowired
//    private PostRepository postRepository;
//
//    @Autowired
//    private PostService postService;
//
//    @BeforeEach
//    public void setup() {
//        MockitoAnnotations.openMocks(this);
//    }
//
//    @Test
//    public void testCreatePostWithoutMemberIdShouldThrowError() {
//        // Given
//        PostPostDto postDto = new PostPostDto();
//        postDto.setContent("Test Content");
//
//        // When
//        Assertions.assertThrows(IllegalArgumentException.class, () -> {
//            postService.createPost(postDto);
//        });
//
//        // Then
//        // Verify that postRepository.save() was not called
//        verify(postRepository, never()).save(any());
//    }
//
//    @Test
//    public void testUpdatePost1WithoutMemberIdShouldThrowError() {
//        // Given
//        Long postId = 1L;
//        PostPatchDto postDto = new PostPatchDto();
//        postDto.setContent("Updated Content");
//
//        // When
//        Assertions.assertThrows(IllegalArgumentException.class, () -> {
//            postService.updatePost(postId, null, postDto);
//        });
//
//        // Then
//        // Verify that postRepository.findById() was not called
//        verify(postRepository, never()).findById(any());
//    }
//
//    @Test
//    public void testUpdatePost2WithNonAuthorMemberIdShouldThrowError() {
//        // Given
//        Long postId = 1L;
//        Long memberId = 2L;
//        PostPatchDto postDto = new PostPatchDto();
//        postDto.setContent("Updated Content");
//
//        Post post = new Post();
//        post.setPostId(postId);
//        post.setMemberId(1L); // Assume the post is created by member with ID 1
//
//        when(postRepository.findById(postId)).thenReturn(Optional.of(post));
//
//        // When
//        Assertions.assertThrows(IllegalArgumentException.class, () -> {
//            postService.updatePost(postId, memberId, postDto);
//        });
//
//        // Then
//        // Verify that postRepository.findById() was called once
//        verify(postRepository, times(1)).findById(postId);
//        // Verify that postRepository.save() was not called
//        verify(postRepository, never()).save(any());
//    }
//
//    @Test
//    public void testUpdatePostWithValidMemberIdShouldUpdateSuccessfully() {
//        // Given
//        Long postId = 1L;
//        Long memberId = 1L; // Assume the post is created by member with ID 1
//        PostPatchDto postDto = new PostPatchDto();
//        postDto.setContent("Updated Content");
//
//        Post post = new Post();
//        post.setPostId(postId);
//        post.setMemberId(memberId);
//
//        when(postRepository.findById(postId)).thenReturn(Optional.of(post));
//        when(postRepository.save(any())).thenReturn(post);
//
//        // When
//        PostResponseDto updatedPostDto = postService.updatePost(postId, memberId, postDto);
//
//        // Then
//        // Verify that postRepository.findById() was called once
//        verify(postRepository, times(1)).findById(postId);
//        // Verify that postRepository.save() was called once
//        verify(postRepository, times(1)).save(any());
//        // Verify that the returned PostResponseDto matches the updated content
//        Assertions.assertEquals(postDto.getContent(), updatedPostDto.getContent());
//    }
//
//    @Test
//    public void testDeletePostWithoutMemberIdShouldThrowError() {
//        // Given
//        Long postId = 1L;
//
//        // When
//        Assertions.assertThrows(IllegalArgumentException.class, () -> {
//            postService.deletePost(postId, null);
//        });
//
//        // Then
//        // Verify that postRepository.deleteById() was not called
//        verify(postRepository, never()).deleteById(any());
//    }
//}