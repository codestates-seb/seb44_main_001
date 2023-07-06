package com.momo.post.service;

import com.momo.category.entity.Category;
import com.momo.category.repository.CategoryRepository;
import com.momo.exception.NotFoundException;
import com.momo.member.entity.Member;
import com.momo.member.repository.MemberRepository;
import com.momo.post.dto.PostPatchDto;
import com.momo.post.dto.PostPostDto;
import com.momo.post.dto.PostResponseDto;
import com.momo.post.entity.Post;
import com.momo.post.mapper.PostMapper;
import com.momo.post.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {
    private final PostRepository postRepository;
    private final PostMapper postMapper;
    private final MemberRepository memberRepository;
    private final CategoryRepository categoryRepository;

    @Autowired
    public PostService(PostRepository postRepository, PostMapper postMapper, MemberRepository memberRepository, CategoryRepository categoryRepository) {
        this.postRepository = postRepository;
        this.postMapper = postMapper;
        this.memberRepository = memberRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<PostResponseDto> getPostsByCategoryAndRegion(Long categoryId, Long memberId) {
        return null;
    }

    public PostResponseDto createPost(PostPostDto postDto) {
        String title = postDto.getTitle();
        String content = postDto.getContent();
        Long memberId = postDto.getMemberId();
        Long categoryId = postDto.getCategoryId();
        List<String> tags = postDto.getTags(); // 새로운 태그 추가

        LocalDateTime createdAt = LocalDateTime.now();
        String processedContent = processContent(content);
        List<String> processedTags = processTags(tags); // 태그 처리 추가

        Post post = new Post();
        post.setTitle(title);
        post.setContent(processedContent);
        post.setTags(processedTags); // 태그 설정
        post.setCreatedAt(createdAt);

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException("ID가 " + memberId + "인 멤버를 찾을 수 없습니다."));
        post.setMember(member);

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new NotFoundException("ID가 " + categoryId + "인 카테고리를 찾을 수 없습니다."));
        post.setCategory(category);

        Post savedPost = postRepository.save(post);
        PostResponseDto responseDto = postMapper.postToPostResponseDto(savedPost);
        responseDto.setMemberId(memberId);
        responseDto.setCategoryId(categoryId);
        return responseDto;
    }

    private String processContent(String content) {
        // 처리 로직 추가
        return content;
    }

    private List<String> processTags(List<String> tags) {
        // 태그 처리 로직 추가
        return tags;
    }

    public PostResponseDto updatePost(Long postId, PostPatchDto postDto) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException("ID가 " + postId + "인 게시물을 찾을 수 없습니다."));

        if (postDto.getMemberId() != null) {
            Member member = memberRepository.findById(postDto.getMemberId())
                    .orElseThrow(() -> new NotFoundException("ID가 " + postDto.getMemberId() + "인 멤버를 찾을 수 없습니다."));
            post.setMember(member);
        }

        if (postDto.getCategoryId() != null) {
            Category category = categoryRepository.findById(postDto.getCategoryId())
                    .orElseThrow(() -> new NotFoundException("ID가 " + postDto.getCategoryId() + "인 카테고리를 찾을 수 없습니다."));
            post.setCategory(category);
        }

        if (postDto.getTags() != null) {
            List<String> tags = processTags(postDto.getTags());
            post.setTags(tags);
        }

        post.setEditedAt(LocalDateTime.now());

        Post updatedPost = postRepository.save(post);
        PostResponseDto responseDto = postMapper.postToPostResponseDto(updatedPost);

        // 업데이트된 값들을 응답 객체에 설정
        responseDto.setMemberId(post.getMember().getMemberId());
        responseDto.setCategoryId(post.getCategory().getCategoryId());

        return responseDto;
    }

    public void deletePost(Long postId, Long memberId) {
        Optional<Post> postOptional = postRepository.findById(postId);
        if (postOptional.isEmpty()) {
            throw new NotFoundException("ID가 " + postId + "인 게시물을 찾을 수 없습니다.");
        }
        Post post = postOptional.get();
        if (!post.getMember().getMemberId().equals(memberId)) {
            throw new NotFoundException("ID가 " + memberId + "인 멤버가 게시물에 접근할 수 없습니다.");
        }
        postRepository.delete(post);
    }
}
