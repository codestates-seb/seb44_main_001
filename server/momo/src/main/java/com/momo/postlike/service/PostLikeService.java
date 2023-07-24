package com.momo.postlike.service;

import com.momo.post.dto.CategoryInfo;
import com.momo.post.dto.LocationInfo;
import com.momo.post.dto.MemberInfo;
import com.momo.post.dto.PostResponseDto;
import com.momo.post.entity.Post;
import com.momo.postlike.dto.PostLikeResponseDto;
import com.momo.member.repository.MemberRepository;
import com.momo.post.repository.PostRepository;
import com.momo.postlike.entity.PostLike;
import com.momo.postlike.repository.PostLikeRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PostLikeService {

    private final PostLikeRepository postLikeRepository;
    private final PostRepository postRepository;
    private final MemberRepository memberRepository;


    public PostLikeService(PostLikeRepository postLikeRepository, PostRepository postRepository, MemberRepository memberRepository) {
        this.postLikeRepository = postLikeRepository;
        this.postRepository = postRepository;
        this.memberRepository = memberRepository;
    }

    public boolean isPostLikedByMember(Long postId, Long memberId) {
        List<PostLike> postLikes = postLikeRepository.findByPost_PostIdAndMember_MemberId(postId, memberId);
        return !postLikes.isEmpty();
    }

    public long getPostLikeCount(Long postId) {
        return postLikeRepository.countByPost_PostId(postId);
    }

    public ResponseEntity<PostLikeResponseDto> createPostLike(Long postId, Long memberId, boolean isLiked) {
        boolean isAlreadyLiked = postLikeRepository.existsByPost_PostIdAndMember_MemberId(postId, memberId);
        if (isAlreadyLiked) {
            throw new IllegalStateException("The member has already liked the post");
        }

        PostLike postLike = new PostLike();
        Post post = postRepository.getById(postId);
        postLike.setPost(post);
        postLike.setMember(memberRepository.getById(memberId));
        postLike.setLiked(true); // 좋아요를 누를 때 is_liked를 true로 설정
        postLikeRepository.save(postLike);

        // 게시글의 좋아요 개수 갱신
        updatePostLikeCount(postId);

        long likeCount = postLikeRepository.countByPost_PostId(postId);
        boolean updatedIsLiked = postLikeRepository.existsByPost_PostIdAndMember_MemberId(postId, memberId);
        PostLikeResponseDto responseDto = new PostLikeResponseDto(likeCount, updatedIsLiked);

        return ResponseEntity.ok(responseDto);
    }


    public ResponseEntity<PostLikeResponseDto> deletePostLike(Long postId, Long memberId) {
        List<PostLike> postLikes = postLikeRepository.findByPost_PostIdAndMember_MemberId(postId, memberId);
        if (!postLikes.isEmpty()) {
            PostLike postLike = postLikes.get(0);
            postLikeRepository.delete(postLike);

            // 게시글의 좋아요 개수 갱신
            updatePostLikeCount(postId);

            long likeCount = postLikeRepository.countByPost_PostId(postId);
            boolean isLiked = postLikeRepository.existsByPost_PostIdAndMember_MemberId(postId, memberId);
            PostLikeResponseDto responseDto = new PostLikeResponseDto(likeCount, isLiked);

            return ResponseEntity.ok(responseDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    private void updatePostLikeCount(Long postId) {
        long likeCount = postLikeRepository.countByPost_PostId(postId);
        Post post = postRepository.getById(postId);
        post.setPostLikeCount(likeCount);
        postRepository.save(post); // 업데이트된 postLikeCount를 저장
    }
}
