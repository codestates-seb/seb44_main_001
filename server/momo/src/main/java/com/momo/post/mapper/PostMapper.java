package com.momo.post.mapper;

import com.momo.post.dto.PostPatchDto;
import com.momo.post.dto.PostPostDto;
import com.momo.post.dto.PostResponseDto;
import com.momo.post.entity.Post;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;


@Mapper(componentModel = "spring")
public interface PostMapper {
    PostResponseDto postToPostResponseDto(Post post);
    Post postPostDtoToPost(PostPostDto postPostDto);
    Post postPatchDtoToPost(PostPatchDto postPatchDto);
    void updatePostFromPostPatchDto(PostPatchDto postPatchDto, @MappingTarget Post post);
}