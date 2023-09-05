package com.momo.category.controller;

import com.momo.category.dto.CategoryPostDto;
import com.momo.category.dto.CategoryResponseDto;
import com.momo.category.service.CategoryService;
import com.momo.location.dto.LocationDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }
    @GetMapping
    public ResponseEntity<List<CategoryResponseDto>> getAllCategories() {
        List<CategoryResponseDto> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(categories);
    }
    @PostMapping
    public ResponseEntity<CategoryResponseDto> createCategory(@RequestBody CategoryPostDto categoryPostDto) {
        CategoryResponseDto createdCategory = categoryService.createCategory(categoryPostDto);
        if (createdCategory != null) {
            return ResponseEntity.ok(createdCategory);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @PatchMapping("/{categoryId}")
    public ResponseEntity<CategoryResponseDto> updateCategory(@PathVariable Long categoryId, @RequestBody CategoryPostDto categoryPostDto) {
        CategoryResponseDto updatedCategory = categoryService.updateCategory(categoryId, categoryPostDto);
        if (updatedCategory != null) {
            return ResponseEntity.ok(updatedCategory);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("/{categoryId}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long categoryId) {
        boolean deleted = categoryService.deleteCategory(categoryId);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{categoryId}")
    public ResponseEntity<CategoryResponseDto> getCategoryById(@PathVariable Long categoryId) {
        CategoryResponseDto categoryResponseDto = categoryService.getCategoryById(categoryId);
        if (categoryResponseDto != null) {
            return ResponseEntity.ok(categoryResponseDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}