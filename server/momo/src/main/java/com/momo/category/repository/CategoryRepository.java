package com.momo.category.repository;

import com.momo.category.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    @Override
    <S extends Category> S save(S entity);

    @Override
    List<Category> findAll();

    @Override
    void deleteById(Long id);
    Category findByCategoryId(Long categoryId);
}
