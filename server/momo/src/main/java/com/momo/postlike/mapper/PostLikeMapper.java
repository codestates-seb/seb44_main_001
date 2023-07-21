package com.momo.postlike.mapper;

import com.momo.postlike.dto.PostLikePatchDto;
import com.momo.postlike.dto.PostLikePostDto;
import com.momo.postlike.dto.PostLikeResponseDto;
import com.momo.postlike.entity.PostLike;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PostLikeMapper {
    PostLike postLikePostDtoToPostLike(PostLikePostDto postLikePostDto);
    PostLike postLikePatchDtoToPostLike(PostLikePatchDto postLikePatchDto);
    PostLike postLikeResponseDtoToPostLike(PostLikeResponseDto postLikeResponseDto);
    PostLikeResponseDto postLikeToPostLikeResponseDto(PostLike postLike);
}
