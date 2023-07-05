package com.momo.post.service;

import com.momo.exception.NotFoundException;
import com.momo.post.dto.PostPatchDto;
import com.momo.post.dto.PostPostDto;
import com.momo.post.dto.PostResponseDto;
import com.momo.post.entity.Post;
import com.momo.post.mapper.PostMapper;
import com.momo.post.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {
    private final PostRepository postRepository;
    private final PostMapper postMapper;

    @Autowired
    public PostService(PostRepository postRepository, PostMapper postMapper) {
        this.postRepository = postRepository;
        this.postMapper = postMapper;
    }

    public List<PostResponseDto> getPostsByCategoryAndRegion(Long categoryId, Long memberId) {
        return null;
    }

    public PostResponseDto createPost(PostPostDto postDto) {
        Post post = postMapper.postPostDtoToPost(postDto);
        Post savedPost = postRepository.save(post);
        return postMapper.postToPostResponseDto(savedPost);
    }

    public PostResponseDto updatePost(Long postId, PostPatchDto postDto) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException("ID가 " + postId + "인 게시물을 찾을 수 없습니다."));
        postMapper.updatePostFromPostPatchDto(postDto, post);
        Post updatedPost = postRepository.save(post);
        return postMapper.postToPostResponseDto(updatedPost);
    }

    public void deletePost(Long postId) {
        if (!postRepository.existsById(postId)) {
            throw new NotFoundException("ID가 " + postId + "인 게시물을 찾을 수 없습니다.");
        }
        postRepository.deleteById(postId);
    }
}