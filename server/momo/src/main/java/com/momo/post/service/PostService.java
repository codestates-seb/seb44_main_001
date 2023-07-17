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

    public PostService(PostRepository postRepository, PostMapper postMapper, MemberRepository memberRepository, CategoryRepository categoryRepository, LocationRepository locationRepository) {
        this.postRepository = postRepository;
        this.postMapper = postMapper;
        this.memberRepository = memberRepository;
        this.categoryRepository = categoryRepository;
        this.locationRepository = locationRepository;
    }

    public List<PostResponseDto> getPostsByMember(Long memberId, int page) {
        // 특정 멤버에 해당하는 글 목록을 가져오는 로직 구현
        int pageSize = 12;
        Pageable pageable = PageRequest.of(page - 1, pageSize, Sort.by("postId").descending());

        Page<Post> postPage = postRepository.findByMember_MemberId(memberId, pageable);

        List<PostResponseDto> responseDtoList = postPage.getContent().stream()
                .map(post -> {
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
                    return responseDto;
                })
                .collect(Collectors.toList());

        return responseDtoList;
    }

    public List<PostResponseDto> getAllPosts(int page) {
        int pageSize = 12;
        Pageable pageable = PageRequest.of(page - 1, pageSize, Sort.by("postId").descending());
        Page<Post> postPage = postRepository.findAll(pageable);

        return postPage.getContent().stream()
                .map(post -> {
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
                    return responseDto;
                })
                .collect(Collectors.toList());
    }

    public PostResponseDto getPostById(Long postId, int page) {
        Post post = postRepository.findById(postId).orElse(null);
        if (post == null) {
            throw new NotFoundException("Post not found");
        }

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

        return responseDto;
    }


    public PostResponseDto createPost(PostPostDto postDto) {
        String title = postDto.getTitle();
        String content = postDto.getContent();
        Long memberId = postDto.getMemberId();
        Long categoryId = postDto.getCategoryId();
        Long locationId = postDto.getLocationId();
        List<String> tags = postDto.getTags(); // 새로운 태그 추가

        LocalDateTime createdAt = LocalDateTime.now();
        String processedContent = processContent(content);
        List<String> processedTags = processTags(tags); // 태그 처리 추가

        Post post = new Post();
        post.setTitle(title);
        post.setContent(processedContent);
        post.setTags(processedTags); // 태그 설정
        post.setCreatedAt(createdAt);

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException("ID가 " + memberId + "인 멤버를 찾을 수 없습니다."));
        post.setMember(member);

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new NotFoundException("ID가 " + categoryId + "인 카테고리를 찾을 수 없습니다."));
        post.setCategory(category);

        Location location = locationRepository.findById(locationId)
                .orElseThrow(() -> new NotFoundException("ID가 " + locationId + "인 멤버를 찾을 수 없습니다."));
        post.setLocation(location);


        Post savedPost = postRepository.save(post);
        PostResponseDto responseDto = postMapper.postToPostResponseDto(savedPost);
        responseDto.setMemberInfo(MemberInfo.builder()
                .memberId(memberId)
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
        return responseDto;
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

        if (postDto.getMemberId() != null) {
            Member member = memberRepository.findById(postDto.getMemberId())
                    .orElseThrow(() -> new NotFoundException("ID가 " + postDto.getMemberId() + "인 멤버를 찾을 수 없습니다."));
            post.setMember(member);
        }

        if (postDto.getCategoryId() != null) {
            Category category = categoryRepository.findById(postDto.getCategoryId())
                    .orElseThrow(() -> new NotFoundException("ID가 " + postDto.getCategoryId() + "인 카테고리를 찾을 수 없습니다."));
            post.setCategory(category);
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
        PostResponseDto responseDto = postMapper.postToPostResponseDto(updatedPost);

        // 업데이트된 값들을 응답 객체에 설정
        responseDto.setMemberInfo(MemberInfo.builder()
                .memberId(post.getMember().getMemberId())
                .nickname(post.getMember().getNickname())
                .profileImage(post.getMember().getProfileImage())
                .build());
        responseDto.setCategoryInfo(CategoryInfo.builder()
                .categoryId(post.getCategory().getCategoryId())
                .name(post.getCategory().getName())
                .build());
        return responseDto;
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


    public List<PostResponseDto> searchPosts(String keyword, int page) {
        if (keyword == null || keyword.isEmpty()) {
            return Collections.emptyList();
        }
        int pageSize = 12;
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

        List<PostResponseDto> responseDtoList = postPage.getContent().stream()
                .map(post -> {
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
                    return responseDto;
                })
                .collect(Collectors.toList());

        return responseDtoList;
    }
    public List<PostResponseDto> searchPostsByLocation(String keyword, Long locationId, int page) {
        int pageSize = 12;
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

        List<PostResponseDto> responseDtoList = postPage.getContent().stream()
                .map(post -> {
                    PostResponseDto responseDto = postMapper.postToPostResponseDto(post);
                    responseDto.setMemberInfo(MemberInfo.builder()
                            .memberId(post.getMember().getMemberId())
                            .nickname(post.getMember().getNickname())
                            .profileImage(post.getMember().getProfileImage())
                            .build());
                    responseDto.setLocationInfo(LocationInfo.builder()
                            .locationId(post.getLocation().getLocationId())
                            .city(post.getLocation().getCity())
                            .province(post.getLocation().getProvince())
                            .build());
                    responseDto.setCategoryInfo(CategoryInfo.builder()
                            .categoryId(post.getCategory().getCategoryId())
                            .name(post.getCategory().getName())
                            .build());
                    return responseDto;
                })
                .collect(Collectors.toList());

        return responseDtoList;
    }
    public List<PostResponseDto> searchPostsByCategory(String keyword, Long categoryId, int page) {
        int pageSize = 12;
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

        List<PostResponseDto> responseDtoList = postPage.getContent().stream()
                .map(post -> {
                    PostResponseDto responseDto = postMapper.postToPostResponseDto(post);
                    responseDto.setMemberInfo(MemberInfo.builder()
                            .memberId(post.getMember().getMemberId())
                            .nickname(post.getMember().getNickname())
                            .profileImage(post.getMember().getProfileImage())
                            .build());
                    responseDto.setLocationInfo(LocationInfo.builder()
                            .locationId(post.getLocation().getLocationId())
                            .city(post.getLocation().getCity())
                            .province(post.getLocation().getProvince())
                            .build());
                    responseDto.setCategoryInfo(CategoryInfo.builder()
                            .categoryId(post.getCategory().getCategoryId())
                            .name(post.getCategory().getName())
                            .build());
                    return responseDto;
                })
                .collect(Collectors.toList());

        return responseDtoList;
    }
    public List<PostResponseDto> searchPostsByCategoryAndLocation(Long categoryId, Long locationId, String keyword, int page) {
        int pageSize = 12;
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

        List<PostResponseDto> responseDtoList = postPage.getContent().stream()
                .map(post -> {
                    PostResponseDto responseDto = postMapper.postToPostResponseDto(post);
                    responseDto.setMemberInfo(MemberInfo.builder()
                            .memberId(post.getMember().getMemberId())
                            .nickname(post.getMember().getNickname())
                            .profileImage(post.getMember().getProfileImage())
                            .build());
                    responseDto.setLocationInfo(LocationInfo.builder()
                            .locationId(post.getLocation().getLocationId())
                            .city(post.getLocation().getCity())
                            .province(post.getLocation().getProvince())
                            .build());
                    responseDto.setCategoryInfo(CategoryInfo.builder()
                            .categoryId(post.getCategory().getCategoryId())
                            .name(post.getCategory().getName())
                            .build());
                    return responseDto;
                })
                .collect(Collectors.toList());

        return responseDtoList;
    }






//    public List<PostResponseDto> searchPostsByLocation(String keyword, Long locationId, int page) {
//        int pageSize = 12;
//        Pageable pageable = PageRequest.of(page - 1, pageSize, Sort.by("postId").descending());
//
//        Specification<Post> searchSpecification = (root, query, criteriaBuilder) -> {
//            Predicate keywordPredicate = criteriaBuilder.or(
//                    criteriaBuilder.like(root.get("title"), "%" + keyword + "%"),
//                    criteriaBuilder.like(root.get("content"), "%" + keyword + "%")
//            );
//
//            return keywordPredicate;
//        };
//
//        Specification<Post> locationFilterSpecification = (root, query, criteriaBuilder) -> {
//            Predicate locationPredicate = criteriaBuilder.equal(root.get("location").get("locationId"), locationId);
//            return locationPredicate;
//        };
//
//        Specification<Post> finalSpecification = Specification.where(locationFilterSpecification)
//                .and(searchSpecification);
//
//        Page<Post> postPage = postRepository.findAll(finalSpecification, pageable);
//
//        List<PostResponseDto> responseDtoList = postPage.getContent().stream()
//                .map(post -> {
//                    PostResponseDto responseDto = postMapper.postToPostResponseDto(post);
//                    responseDto.setMemberInfo(MemberInfo.builder()
//                            .memberId(post.getMember().getMemberId())
//                            .nickname(post.getMember().getNickname())
//                            .profileImage(post.getMember().getProfileImage())
//                            .build());
//                    responseDto.setLocationInfo(LocationInfo.builder()
//                            .locationId(post.getLocation().getLocationId())
//                            .city(post.getLocation().getCity())
//                            .province(post.getLocation().getProvince())
//                            .build());
//                    responseDto.setCategoryInfo(CategoryInfo.builder()
//                            .categoryId(post.getCategory().getCategoryId())
//                            .name(post.getCategory().getName())
//                            .build());
//                    return responseDto;
//                })
//                .collect(Collectors.toList());
//
//        return responseDtoList;
//    }
//    public List<PostResponseDto> searchPostsByCategory(String keyword, Long categoryId, int page) {
//        int pageSize = 12;
//        Pageable pageable = PageRequest.of(page - 1, pageSize, Sort.by("postId").descending());
//
//        Specification<Post> searchSpecification = (root, query, criteriaBuilder) -> {
//            Predicate keywordPredicate = criteriaBuilder.or(
//                    criteriaBuilder.like(root.get("title"), "%" + keyword + "%"),
//                    criteriaBuilder.like(root.get("content"), "%" + keyword + "%")
//            );
//
//            return keywordPredicate;
//        };
//
//        Specification<Post> categoryFilterSpecification = (root, query, criteriaBuilder) -> {
//            Predicate categoryPredicate = criteriaBuilder.equal(root.get("category").get("categoryId"), categoryId);
//            return categoryPredicate;
//        };
//
//        Specification<Post> finalSpecification = Specification.where(categoryFilterSpecification)
//                .and(searchSpecification);
//
//        Page<Post> postPage = postRepository.findAll(finalSpecification, pageable);
//
//        List<PostResponseDto> responseDtoList = postPage.getContent().stream()
//                .map(post -> {
//                    PostResponseDto responseDto = postMapper.postToPostResponseDto(post);
//                    responseDto.setMemberInfo(MemberInfo.builder()
//                            .memberId(post.getMember().getMemberId())
//                            .nickname(post.getMember().getNickname())
//                            .profileImage(post.getMember().getProfileImage())
//                            .build());
//                    responseDto.setLocationInfo(LocationInfo.builder()
//                            .locationId(post.getLocation().getLocationId())
//                            .city(post.getLocation().getCity())
//                            .province(post.getLocation().getProvince())
//                            .build());
//                    responseDto.setCategoryInfo(CategoryInfo.builder()
//                            .categoryId(post.getCategory().getCategoryId())
//                            .name(post.getCategory().getName())
//                            .build());
//                    return responseDto;
//                })
//                .collect(Collectors.toList());
//
//        return responseDtoList;
//    }

//    public List<PostResponseDto> searchPostsByCategoryAndLocation(String keyword, Long categoryId, Long locationId, int page) {
//        int pageSize = 12;
//        Pageable pageable = PageRequest.of(page - 1, pageSize, Sort.by("postId").descending());
//
//        Specification<Post> categoryFilterSpecification = (root, query, criteriaBuilder) -> {
//            Predicate categoryPredicate = criteriaBuilder.equal(root.get("category").get("categoryId"), categoryId);
//            return categoryPredicate;
//        };
//
//        Specification<Post> locationFilterSpecification = (root, query, criteriaBuilder) -> {
//            Predicate locationPredicate = criteriaBuilder.equal(root.get("location").get("locationId"), locationId);
//            return locationPredicate;
//        };
//
//        Specification<Post> finalSpecification = Specification.where(categoryFilterSpecification)
//                .and(locationFilterSpecification);
//
//        Page<Post> postPage = postRepository.findAll(finalSpecification, pageable);
//
//        List<PostResponseDto> responseDtoList = postPage.getContent().stream()
//                .filter(post -> post.getTitle().contains(keyword) || post.getContent().contains(keyword))
//                .map(post -> {
//                    PostResponseDto responseDto = postMapper.postToPostResponseDto(post);
//                    responseDto.setMemberInfo(MemberInfo.builder()
//                            .memberId(post.getMember().getMemberId())
//                            .nickname(post.getMember().getNickname())
//                            .profileImage(post.getMember().getProfileImage())
//                            .build());
//                    responseDto.setLocationInfo(LocationInfo.builder()
//                            .locationId(post.getLocation().getLocationId())
//                            .city(post.getLocation().getCity())
//                            .province(post.getLocation().getProvince())
//                            .build());
//                    responseDto.setCategoryInfo(CategoryInfo.builder()
//                            .categoryId(post.getCategory().getCategoryId())
//                            .name(post.getCategory().getName())
//                            .build());
//                    return responseDto;
//                })
//                .collect(Collectors.toList());
//
//        return responseDtoList;
//    }

    public List<PostResponseDto> getPostsByLocation(Long locationId, int page) {
        int pageSize = 12;
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

        List<PostResponseDto> responseDtoList = postPage.getContent().stream()
                .map(post -> {
                    PostResponseDto responseDto = postMapper.postToPostResponseDto(post);
                    responseDto.setMemberInfo(
                            MemberInfo.builder()
                                    .memberId(post.getMember().getMemberId())
                                    .nickname(post.getMember().getNickname())
                                    .profileImage(post.getMember().getProfileImage())
                                    .build()
                    );
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
                    return responseDto;
                })
                .collect(Collectors.toList());

        return responseDtoList;
    }

    public List<PostResponseDto> getPostsByCategory(Long categoryId, int page) {
        int pageSize = 12;
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

        List<PostResponseDto> responseDtoList = postPage.getContent().stream()
                .map(post -> {
                    PostResponseDto responseDto = postMapper.postToPostResponseDto(post);
                    responseDto.setMemberInfo(
                            MemberInfo.builder()
                                    .memberId(post.getMember().getMemberId())
                                    .nickname(post.getMember().getNickname())
                                    .profileImage(post.getMember().getProfileImage())
                                    .build()
                    );
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

                    return responseDto;
                })
                .collect(Collectors.toList());

        return responseDtoList;
    }

    public List<PostResponseDto> getPostsByCategoryAndLocation(Long categoryId, Long locationId, int page) {
        int pageSize = 12;
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

            List<PostResponseDto> responseDtoList = postPage.getContent().stream()
                    .map(post -> {
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
                        return responseDto;
                    })
                    .collect(Collectors.toList());

            return responseDtoList;
        }
    }
