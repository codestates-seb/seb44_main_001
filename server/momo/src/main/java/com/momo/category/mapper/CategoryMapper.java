package com.momo.category.mapper;

import com.momo.category.dto.CategoryPatchDto;
import com.momo.category.dto.CategoryPostDto;
import com.momo.category.dto.CategoryResponseDto;
import com.momo.category.entity.Category;
import com.momo.location.dto.LocationDto;
import com.momo.location.entity.Location;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    CategoryMapper INSTANCE = Mappers.getMapper(CategoryMapper.class);

    CategoryResponseDto categoryToResponseDto(Category category);

    @Mapping(target = "categoryId", ignore = true)
    Category categoryPostDtoToEntity(CategoryPostDto categoryPostDto);

    @Mapping(target = "categoryId", ignore = true)
    Category categoryPatchDtoToEntity(CategoryPatchDto categoryPatchDto);

    List<CategoryResponseDto> categoriesToResponseDtoList(List<Category> categories);
}