package com.momo.comment.repository;

import com.momo.comment.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Query(value = "select c from Comment c join fetch c.member m where c.post.postId = :postId",
            countQuery = "select count(c) from Comment c where c.post.postId = :postId")
    Page<Comment> findAllComments(@Param("postId") Long postId, Pageable pageable);
}
