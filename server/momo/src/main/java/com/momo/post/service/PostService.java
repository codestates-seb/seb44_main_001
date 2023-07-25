package com.momo.post.service;

import com.momo.category.entity.Category;
import com.momo.category.repository.CategoryRepository;
import com.momo.exception.NotFoundException;
import com.momo.location.entity.Location;
import com.momo.location.repository.LocationRepository;
import com.momo.member.entity.Member;
import com.momo.member.repository.MemberRepository;
import com.momo.post.dto.*;
import com.momo.post.entity.Post;
import com.momo.post.mapper.PostMapper;
import com.momo.post.repository.PostRepository;
import com.momo.postlike.entity.PostLike;
import com.momo.postlike.repository.PostLikeRepository;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import javax.persistence.criteria.*;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;
import static com.momo.post.service.RangeDtoHelper.getCategoryRangeDto;
import static com.momo.post.service.RangeDtoHelper.getLocationRangeDto;


@Service
public class PostService {
    private final PostRepository postRepository;
    private final PostMapper postMapper;
    private final MemberRepository memberRepository;
    private final CategoryRepository categoryRepository;
    private final LocationRepository locationRepository;
    private final PostLikeRepository postLikeRepository;

    public PostService(PostRepository postRepository, PostMapper postMapper, MemberRepository memberRepository, CategoryRepository categoryRepository, LocationRepository locationRepository, PostLikeRepository postLikeRepository) {
        this.postRepository = postRepository;
        this.postMapper = postMapper;
        this.memberRepository = memberRepository;
        this.categoryRepository = categoryRepository;
        this.locationRepository = locationRepository;
        this.postLikeRepository = postLikeRepository;
    }

    private PostResponseDto createPostResponseDto(Post post) {
        PostResponseDto responseDto = postMapper.postToPostResponseDto(post);
        responseDto.setMemberInfo(MemberInfo.builder()
                .memberId(post.getMember().getMemberId())
                .nickname(post.getMember().getNickname())
                .profileImage(post.getMember().getProfileImage())
                .build());
        responseDto.setCategoryInfo(CategoryInfo.builder()
                .categoryId(post.getCategory().getCategoryId())
                .name(post.getCategory().getName())
                .build());
        responseDto.setLocationInfo(LocationInfo.builder()
                .locationId(post.getLocation().getLocationId())
                .city(post.getLocation().getCity())
                .province(post.getLocation().getProvince())
                .build());
        responseDto.setImageUrl(post.getImageUrl());

        return responseDto;
    }

    public List<PostResponseDto> getAllPosts(int page) {
        int pageSize = 9;
        Pageable pageable = PageRequest.of(page - 1, pageSize, Sort.by("postId").descending());
        Page<Post> postPage = postRepository.findAll(pageable);

        return postPage.getContent().stream()
                .map(this::createPostResponseDto)
                .collect(Collectors.toList());
    }

    public PostResponseDto getPostById(Long postId, int page) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new NotFoundException("Post not found"));

        return createPostResponseDto(post);
    }

    public PostResponseDto createPost(PostPostDto postDto) {
        Post post = new Post();
        post.setTitle(postDto.getTitle());
        post.setContent(processContent(postDto.getContent()));
        post.setTags(processTags(postDto.getTags()));
        post.setCreatedAt(LocalDateTime.now());
        post.setCommentCount(0L);

        Member member = memberRepository.findById(postDto.getMemberId())
                .orElseThrow(() -> new NotFoundException("ID가 " + postDto.getMemberId() + "인 멤버를 찾을 수 없습니다."));
        post.setMember(member);

        Category category = categoryRepository.findById(postDto.getCategoryId())
                .orElseThrow(() -> new NotFoundException("ID가 " + postDto.getCategoryId() + "인 카테고리를 찾을 수 없습니다."));
        post.setCategory(category);

        Location location = locationRepository.findById(postDto.getLocationId())
                .orElseThrow(() -> new NotFoundException("ID가 " + postDto.getLocationId() + "인 location을 찾을 수 없습니다."));
        post.setLocation(location);

        Post savedPost = postRepository.save(post);

        return createPostResponseDto(savedPost);
    }

    private String processContent(String content) {
        // 처리 로직 추가
        return content;
    }

    private List<String> processTags(List<String> tags) {
        // 태그 처리 로직 추가
        return tags;
    }

    public PostResponseDto updatePost(Long postId, Long memberId, PostPatchDto postDto) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException("ID가 " + postId + "인 게시물을 찾을 수 없습니다."));

        // Update member
        if (postDto.getMemberId() != null) {
            Member member = memberRepository.findById(postDto.getMemberId())
                    .orElseThrow(() -> new NotFoundException("ID가 " + postDto.getMemberId() + "인 멤버를 찾을 수 없습니다."));
            post.setMember(member);
        }

        // Update category
        if (postDto.getCategoryId() != null) {
            Category category = categoryRepository.findById(postDto.getCategoryId())
                    .orElseThrow(() -> new NotFoundException("ID가 " + postDto.getCategoryId() + "인 카테고리를 찾을 수 없습니다."));
            post.setCategory(category);
        }

        // Update location
        if (postDto.getLocationId() != null) {
            Location location = locationRepository.findById(postDto.getLocationId())
                    .orElseThrow(() -> new NotFoundException("ID가 " + postDto.getLocationId() + "인 위치를 찾을 수 없습니다."));
            post.setLocation(location);
        }

        if (postDto.getTags() != null) {
            List<String> tags = processTags(postDto.getTags());
            post.setTags(tags);
        }

        if (postDto.getTitle() != null) {
            post.setTitle(postDto.getTitle());
        }

        if (postDto.getContent() != null) {
            post.setContent(postDto.getContent());
        }

        post.setEditedAt(LocalDateTime.now());

        Post updatedPost = postRepository.save(post);
        return createPostResponseDto(updatedPost);
    }


    public void deletePost(Long postId, Long memberId) {
        Optional<Post> postOptional = postRepository.findById(postId);
        if (postOptional.isEmpty()) {
            throw new NotFoundException("ID가 " + postId + "인 게시물을 찾을 수 없습니다.");
        }
        Post post = postOptional.get();
        if (!post.getMember().getMemberId().equals(memberId)) {
            throw new NotFoundException("ID가 " + memberId + "인 멤버가 게시물에 접근할 수 없습니다.");
        }
        postRepository.delete(post);
    }
    public List<PostResponseDto> getPostsByMember(Long memberId, int page) {
        int pageSize = 3;
        Pageable pageable = PageRequest.of(page - 1, pageSize, Sort.by("postId").descending());

        Page<Post> postPage = postRepository.findByMember_MemberId(memberId, pageable);

        return postPage.getContent().stream()
                .map(this::createPostResponseDto)
                .collect(Collectors.toList());
    }
    public List<PostResponseDto> getPostsByLocation(Long locationId, int page) {
        int pageSize = 9;
        Pageable pageable = PageRequest.of(page - 1, pageSize, Sort.by("postId").descending());

        Page<Post> postPage;
        if (locationId >= 1 && locationId <= 17) {
            LocationRangeDto locationRangeDto = getLocationRangeDto(locationId);
            if (locationRangeDto != null) {
                postPage = postRepository.findByLocation_LocationIdBetween(
                        locationRangeDto.getStartLocationId(),
                        locationRangeDto.getEndLocationId(),
                        pageable
                );
            } else {
                return new ArrayList<>();
            }
        } else {
            postPage = postRepository.findByLocation_LocationId(locationId, pageable);
        }

        return postPage.getContent().stream()
                .map(this::createPostResponseDto)
                .collect(Collectors.toList());
    }

    public List<PostResponseDto> getPostsByCategory(Long categoryId, int page) {
        int pageSize = 9;
        Pageable pageable = PageRequest.of(page - 1, pageSize, Sort.by("postId").descending());

        Page<Post> postPage;
        if (categoryId == 1) {
            CategoryRangeDto categoryRangeDto = getCategoryRangeDto(categoryId);
            if (categoryRangeDto != null) {
                postPage = postRepository.findByCategory_CategoryIdBetween(
                        categoryRangeDto.getStartCategoryId(),
                        categoryRangeDto.getEndCategoryId(),
                        pageable
                );
            } else {
                return new ArrayList<>();
            }
        } else {
            postPage = postRepository.findByCategory_CategoryId(categoryId, pageable);
        }

        return postPage.getContent().stream()
                .map(this::createPostResponseDto)
                .collect(Collectors.toList());
    }

    public List<PostResponseDto> getPostsByCategoryAndLocation(Long categoryId, Long locationId, int page) {
        int pageSize = 9;
        Pageable pageable = PageRequest.of(page - 1, pageSize, Sort.by("postId").descending());

        Page<Post> postPage;

        if (categoryId.equals(1L) && locationId <= 17) {
            LocationRangeDto locationRangeDto = RangeDtoHelper.getLocationRangeDto(locationId);
            CategoryRangeDto categoryRangeDto = RangeDtoHelper.getCategoryRangeDto(categoryId);
            if (locationRangeDto != null && categoryRangeDto != null) {
                postPage = postRepository.findByCategory_CategoryIdBetweenAndLocation_LocationIdBetween(
                        categoryRangeDto.getStartCategoryId(),
                        categoryRangeDto.getEndCategoryId(),
                        locationRangeDto.getStartLocationId(),
                        locationRangeDto.getEndLocationId(),
                        pageable
                );
            } else {
                return new ArrayList<>();
            }
        } else if (categoryId.equals(1L) && locationId > 17) {
            CategoryRangeDto categoryRangeDto = RangeDtoHelper.getCategoryRangeDto(categoryId);
            if (categoryRangeDto != null) {
                postPage = postRepository.findByCategory_CategoryIdBetweenAndLocation_LocationId(
                        categoryRangeDto.getStartCategoryId(),
                        categoryRangeDto.getEndCategoryId(),
                        locationId,
                        pageable
                );
            }else {
                return new ArrayList<>();
            }
        } else if (!categoryId.equals(1L) && locationId >= 1 && locationId <= 17) {
            LocationRangeDto locationRangeDto = RangeDtoHelper.getLocationRangeDto(locationId);
            if (locationRangeDto != null) {
                postPage = postRepository.findByCategory_CategoryIdAndLocation_LocationIdBetween(
                        categoryId,
                        locationRangeDto.getStartLocationId(),
                        locationRangeDto.getEndLocationId(),
                        pageable
                );
            } else {
                return new ArrayList<>();
            }
        } else {
            postPage = postRepository.findByCategory_CategoryIdAndLocation_LocationId(categoryId, locationId, pageable);
        }

        return postPage.getContent().stream()
                .map(this::createPostResponseDto)
                .collect(Collectors.toList());
    }
    public List<PostResponseDto> searchPosts(String keyword, int page) {
        if (keyword == null || keyword.isEmpty()) {
            return Collections.emptyList();
        }
        int pageSize = 9;
        Pageable pageable = PageRequest.of(page - 1, pageSize, Sort.by("postId").descending());

        Specification<Post> specification = (root, query, criteriaBuilder) -> {
            Predicate keywordPredicate = criteriaBuilder.or(
                    criteriaBuilder.like(root.get("title"), "%" + keyword + "%"),
                    criteriaBuilder.like(root.get("content"), "%" + keyword + "%")
            );

            Predicate tagPredicate = criteriaBuilder.isTrue(criteriaBuilder.literal(false));
            if (keyword != null) {
                Expression<Collection<String>> tagsExpr = root.get("tags");
                tagPredicate = criteriaBuilder.isMember(keyword, tagsExpr);
            }

            return criteriaBuilder.or(keywordPredicate, tagPredicate);
        };

        Page<Post> postPage = postRepository.findAll(specification, pageable);

        return postPage.getContent().stream()
                .map(this::createPostResponseDto)
                .collect(Collectors.toList());
    }
    public List<PostResponseDto> searchPostsByLocation(String keyword, Long locationId, int page) {
        int pageSize = 9;
        Pageable pageable = PageRequest.of(page - 1, pageSize, Sort.by("postId").descending());

        Specification<Post> searchSpecification = (root, query, criteriaBuilder) -> {
            Predicate keywordPredicate = criteriaBuilder.or(
                    criteriaBuilder.like(root.get("title"), "%" + keyword + "%"),
                    criteriaBuilder.like(root.get("content"), "%" + keyword + "%")
            );

            return keywordPredicate;
        };

        Specification<Post> locationFilterSpecification = (root, query, criteriaBuilder) -> {
            Predicate locationPredicate;
            if (locationId >= 1 && locationId <= 17) {
                LocationRangeDto locationRangeDto = RangeDtoHelper.getLocationRangeDto(locationId);
                if (locationRangeDto != null) {
                    locationPredicate = criteriaBuilder.between(
                            root.get("location").get("locationId"),
                            locationRangeDto.getStartLocationId(),
                            locationRangeDto.getEndLocationId()
                    );
                } else {
                    return criteriaBuilder.disjunction();
                }
            } else {
                locationPredicate = criteriaBuilder.equal(root.get("location").get("locationId"), locationId);
            }
            return locationPredicate;
        };

        Specification<Post> finalSpecification = Specification.where(locationFilterSpecification)
                .and(searchSpecification);

        Page<Post> postPage = postRepository.findAll(finalSpecification, pageable);

        return postPage.getContent().stream()
                .map(this::createPostResponseDto)
                .collect(Collectors.toList());
    }
    public List<PostResponseDto> searchPostsByCategory(String keyword, Long categoryId, int page) {
        int pageSize = 9;
        Pageable pageable = PageRequest.of(page - 1, pageSize, Sort.by("postId").descending());

        Specification<Post> searchSpecification = (root, query, criteriaBuilder) -> {
            Predicate keywordPredicate = criteriaBuilder.or(
                    criteriaBuilder.like(root.get("title"), "%" + keyword + "%"),
                    criteriaBuilder.like(root.get("content"), "%" + keyword + "%")
            );

            return keywordPredicate;
        };

        Specification<Post> categoryFilterSpecification = (root, query, criteriaBuilder) -> {
            Predicate categoryPredicate;
            if (categoryId == 1) {
                CategoryRangeDto categoryRangeDto = getCategoryRangeDto(categoryId);
                if (categoryRangeDto != null) {
                    categoryPredicate = criteriaBuilder.between(
                            root.get("category").get("categoryId"),
                            categoryRangeDto.getStartCategoryId(),
                            categoryRangeDto.getEndCategoryId()
                    );
                } else {
                    return criteriaBuilder.disjunction();
                }
            } else {
                categoryPredicate = criteriaBuilder.equal(root.get("category").get("categoryId"), categoryId);
            }
            return categoryPredicate;
        };

        Specification<Post> finalSpecification = Specification.where(categoryFilterSpecification)
                .and(searchSpecification);

        Page<Post> postPage = postRepository.findAll(finalSpecification, pageable);

        return postPage.getContent().stream()
                .map(this::createPostResponseDto)
                .collect(Collectors.toList());
    }
    public List<PostResponseDto> searchPostsByCategoryAndLocation(Long categoryId, Long locationId, String keyword, int page) {
        int pageSize = 9;
        Pageable pageable = PageRequest.of(page - 1, pageSize, Sort.by("postId").descending());

        Specification<Post> searchSpecification = (root, query, criteriaBuilder) -> {
            Predicate keywordPredicate = criteriaBuilder.or(
                    criteriaBuilder.like(root.get("title"), "%" + keyword + "%"),
                    criteriaBuilder.like(root.get("content"), "%" + keyword + "%")
            );

            return keywordPredicate;
        };

        Specification<Post> categoryLocationFilterSpecification = (root, query, criteriaBuilder) -> {
            Predicate categoryPredicate;
            if (categoryId.equals(1L)) {
                CategoryRangeDto categoryRangeDto = RangeDtoHelper.getCategoryRangeDto(categoryId);
                if (categoryRangeDto != null) {
                    categoryPredicate = criteriaBuilder.between(
                            root.get("category").get("categoryId"),
                            categoryRangeDto.getStartCategoryId(),
                            categoryRangeDto.getEndCategoryId()
                    );
                } else {
                    return criteriaBuilder.disjunction();
                }
            } else {
                categoryPredicate = criteriaBuilder.equal(root.get("category").get("categoryId"), categoryId);
            }

            Predicate locationPredicate;
            if (locationId >= 1 && locationId <= 17) {
                LocationRangeDto locationRangeDto = RangeDtoHelper.getLocationRangeDto(locationId);
                if (locationRangeDto != null) {
                    locationPredicate = criteriaBuilder.between(
                            root.get("location").get("locationId"),
                            locationRangeDto.getStartLocationId(),
                            locationRangeDto.getEndLocationId()
                    );
                } else {
                    return criteriaBuilder.disjunction();
                }
            } else {
                locationPredicate = criteriaBuilder.equal(root.get("location").get("locationId"), locationId);
            }

            Predicate categoryLocationPredicate = criteriaBuilder.and(categoryPredicate, locationPredicate);
            return categoryLocationPredicate;
        };

        Specification<Post> finalSpecification = Specification.where(categoryLocationFilterSpecification)
                .and(searchSpecification);

        Page<Post> postPage = postRepository.findAll(finalSpecification, pageable);

        return postPage.getContent().stream()
                .map(this::createPostResponseDto)
                .collect(Collectors.toList());
    }
    public List<PostResponseDto> getPostLikedByMember(Long memberId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<PostLike> likedPostsPage = postLikeRepository.findByMember_MemberIdAndIsLikedTrue(memberId, pageable);
        List<PostResponseDto> postResponseDtos = new ArrayList<>();

        for (PostLike postLike : likedPostsPage.getContent()) {
            Post post = postLike.getPost();

            MemberInfo memberInfo = MemberInfo.builder()
                    .memberId(post.getMember().getMemberId())
                    .nickname(post.getMember().getNickname())
                    .profileImage(post.getMember().getProfileImage())
                    .build();

            CategoryInfo categoryInfo = CategoryInfo.builder()
                    .categoryId(post.getCategory().getCategoryId())
                    .name(post.getCategory().getName())
                    .build();

            LocationInfo locationInfo = LocationInfo.builder()
                    .locationId(post.getLocation().getLocationId())
                    .city(post.getLocation().getCity())
                    .province(post.getLocation().getProvince())
                    .build();

            // 태그 정보
            List<String> tags = post.getTags();

            // 좋아요 여부
            boolean isLiked = true;

            // 좋아요 수
            Long postLikeCount = post.getPostLikeCount();

            // 댓글 수
            Long commentCount = post.getCommentCount();

            // 이미지 URL
            String imageUrl = post.getImageUrl();

            PostResponseDto postResponseDto = new PostResponseDto(
                    post.getPostId(),
                    post.getTitle(),
                    post.getContent(),
                    post.getCreatedAt(),
                    post.getEditedAt(),
                    categoryInfo,
                    locationInfo,
                    memberInfo,
                    tags,
                    isLiked,
                    postLikeCount,
                    commentCount,
                    imageUrl // 이미지 URL 추가
            );

            postResponseDtos.add(postResponseDto);
        }

        return postResponseDtos;
    }

}