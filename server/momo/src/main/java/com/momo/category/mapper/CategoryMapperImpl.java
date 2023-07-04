package com.momo.category.mapper;

import com.momo.category.dto.CategoryDTO;
import com.momo.category.entity.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapperImpl implements CategoryMapper {

    @Override
    public CategoryDTO categoryToDTO(Category category) {
        if (category == null) {
            return null;
        }

        CategoryDTO categoryDTO = new CategoryDTO();

        categoryDTO.setCategoryId(category.getCategoryId());
        categoryDTO.setName(category.getName());

        return categoryDTO;
    }

    @Override
    public Category categoryDTOToEntity(CategoryDTO categoryDTO) {
        if (categoryDTO == null) {
            return null;
        }

        Category category = new Category();

        category.setCategoryId(categoryDTO.getCategoryId());
        category.setName(categoryDTO.getName());

        return category;
    }
}