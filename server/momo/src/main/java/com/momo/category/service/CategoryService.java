package com.momo.category.service;

import com.momo.category.entity.Category;
import com.momo.category.mapper.CategoryMapper;
import com.momo.category.dto.CategoryPostDto;
import com.momo.category.dto.CategoryResponseDto;
import com.momo.category.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    public CategoryService(CategoryRepository categoryRepository, CategoryMapper categoryMapper) {
        this.categoryRepository = categoryRepository;
        this.categoryMapper = categoryMapper;
    }

    public CategoryResponseDto getCategoryById(Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElse(null);
        if (category != null) {
            return categoryMapper.categoryToResponseDto(category);
        } else {
            return null;
        }
    }

    public CategoryResponseDto createCategory(CategoryPostDto categoryPostDto) {
        Category category = categoryMapper.categoryPostDtoToEntity(categoryPostDto);
        category = categoryRepository.save(category);
        return categoryMapper.categoryToResponseDto(category);
    }

    public List<CategoryResponseDto> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        return categoryMapper.categoriesToResponseDtoList(categories);
    }
    public CategoryResponseDto updateCategory(Long categoryId, CategoryPostDto categoryPostDto) {
        Category category = categoryRepository.findById(categoryId)
                .orElse(null);
        if (category != null) {
            // 업데이트할 필드가 있는 경우에만 업데이트 수행
            if (categoryPostDto.getName() != null) {
                category.setName(categoryPostDto.getName());
            }
            // 필요한 필드 업데이트 추가 가능

            category = categoryRepository.save(category);
            return categoryMapper.categoryToResponseDto(category);
        } else {
            return null;
        }
    }

    public boolean deleteCategory(Long categoryId) {
        if (categoryRepository.existsById(categoryId)) {
            categoryRepository.deleteById(categoryId);
            return true;
        } else {
            return false;
        }
    }
}