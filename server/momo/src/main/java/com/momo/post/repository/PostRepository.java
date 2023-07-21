package com.momo.post.repository;

import com.momo.post.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long>, JpaSpecificationExecutor<Post> {
    Page<Post> findByCategory_CategoryIdAndLocation_LocationId(Long categoryId, Long locationId, Pageable pageable);

    Page<Post> findByCategory_CategoryId(Long categoryId, Pageable pageable);

    Page<Post> findByMember_MemberId(Long memberId, Pageable pageable);

    Page<Post> findByLocation_LocationId(Long locationId, Pageable pageable);

    Page<Post> findByCategory_CategoryIdAndLocation_LocationId(Long categoryId, Long locationId, Long endLocationId, Pageable pageable);

    Page<Post> findAll(Specification<Post> specification, Pageable pageable);

    Page<Post> findByLocation_LocationIdBetween(Long i, Long i1, Pageable pageable);

    Page<Post> findByCategory_CategoryIdBetween(Long startCategoryId, Long endCategoryId, Pageable pageable);


    Page<Post> findByCategory_CategoryIdAndLocation_LocationIdBetween(Long categoryId, Long startLocationId, Long endLocationId, Pageable pageable);

    Page<Post> findByCategory_CategoryIdBetweenAndLocation_LocationId(
            Long startCategoryId,
            Long endCategoryId,
            Long locationId,
            Pageable pageable
    );
    Page<Post> findByCategory_CategoryIdBetweenAndLocation_LocationIdBetween(
            Long startCategoryId,
            Long endCategoryId,
            Long startLocationId,
            Long endLocationId,
            Pageable pageable
    );

    Page<Post> findByTitleContainingAndLocation_LocationIdBetween(String keyword, Long startLocationId, Long endLocationId, Pageable pageable);

    Page<Post> findByTitleContainingAndContentContainingAndLocation_LocationId(String title, String content, Long locationId, Pageable pageable);
}