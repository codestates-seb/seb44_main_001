package com.momo.post.repository;

import com.momo.post.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    Page<Post> findByCategory_CategoryIdAndPostIdAndMember_MemberIdAndLocation_LocationId(Long categoryId, Long postId, Long memberId, Long locationId, Pageable pageable);

    Page<Post> findByCategory_CategoryId(Long categoryId, Pageable pageable);

    Page<Post> findByMember_MemberId(Long memberId, Pageable pageable);

    Page<Post> findByLocation_LocationId(Long locationId, Pageable pageable);

    Page<Post> findByCategory_CategoryIdAndLocation_LocationId(Long categoryId, Long locationId, Pageable pageable);

    Page<Post> findAll(Specification<Post> specification, Pageable pageable);
}