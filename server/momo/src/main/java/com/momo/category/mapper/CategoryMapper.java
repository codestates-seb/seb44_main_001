package com.momo.category.mapper;

import com.momo.category.dto.CategoryDTO;
import com.momo.category.entity.Category;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CategoryMapper {
    CategoryMapper INSTANCE = Mappers.getMapper(CategoryMapper.class);

    CategoryDTO categoryToDTO(Category category);

    Category categoryDTOToEntity(CategoryDTO categoryDTO);
}