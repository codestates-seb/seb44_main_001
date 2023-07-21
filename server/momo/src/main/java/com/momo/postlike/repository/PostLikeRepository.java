package com.momo.postlike.repository;

import com.momo.post.entity.Post;
import com.momo.postlike.entity.PostLike;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostLikeRepository extends JpaRepository<PostLike, Long> {
    List<PostLike> findByPost_PostIdAndMember_MemberId(Long postId, Long memberId);
    long countByPost_PostId(Long postId);

    long countByPost(Post post);

    boolean existsByPost_PostIdAndMember_MemberId(Long postId, Long memberId);

    Page<PostLike> findByMember_MemberIdAndIsLikedTrue(Long memberId, Pageable pageable);
}