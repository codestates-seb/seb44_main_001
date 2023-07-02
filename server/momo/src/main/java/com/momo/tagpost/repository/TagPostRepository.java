package com.momo.tagpost.repository;

import com.momo.tagpost.entity.TagPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagPostRepository extends JpaRepository<TagPost, Long> {
}
