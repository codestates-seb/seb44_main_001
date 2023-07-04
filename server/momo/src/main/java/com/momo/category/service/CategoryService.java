package com.momo.category.service;

import com.momo.category.dto.CategoryDTO;
import com.momo.category.entity.Category;
import com.momo.category.mapper.CategoryMapper;
import com.momo.category.repository.CategoryRepository;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    public CategoryService(CategoryRepository categoryRepository, CategoryMapper categoryMapper) {
        this.categoryRepository = categoryRepository;
        this.categoryMapper = categoryMapper;
    }

    public CategoryDTO getCategoryById(Long categoryId) {
        Category category = categoryRepository.findByCategoryId(categoryId);
        if (category != null) {
            return categoryMapper.categoryToDTO(category);
        } else {
            return null;
        }
    }

    public CategoryDTO createCategory(CategoryDTO categoryDTO) {
        Category category = categoryMapper.categoryDTOToEntity(categoryDTO);
        category = categoryRepository.save(category);
        return categoryMapper.categoryToDTO(category);
    }
}