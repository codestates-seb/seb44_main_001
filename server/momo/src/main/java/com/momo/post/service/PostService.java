package com.momo.post.service;

import com.momo.category.entity.Category;
import com.momo.category.repository.CategoryRepository;
import com.momo.exception.NotFoundException;
import com.momo.location.entity.Location;
import com.momo.location.repository.LocationRepository;
import com.momo.member.entity.Member;
import com.momo.member.repository.MemberRepository;
import com.momo.post.dto.PostPatchDto;
import com.momo.post.dto.PostPostDto;
import com.momo.post.dto.PostResponseDto;
import com.momo.post.entity.Post;
import com.momo.post.mapper.PostMapper;
import com.momo.post.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.Predicate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.yaml.snakeyaml.tokens.Token.ID.Tag;

@Service
public class PostService {
    private final PostRepository postRepository;
    private final PostMapper postMapper;
    private final MemberRepository memberRepository;
    private final CategoryRepository categoryRepository;

    private final LocationRepository locationRepository;

    @Autowired
    public PostService(PostRepository postRepository, PostMapper postMapper, MemberRepository memberRepository, CategoryRepository categoryRepository, LocationRepository locationRepository) {
        this.postRepository = postRepository;
        this.postMapper = postMapper;
        this.memberRepository = memberRepository;
        this.categoryRepository = categoryRepository;
        this.locationRepository = locationRepository;
    }
    public PostResponseDto getPostById(Long postId) {
        Post post = postRepository.findById(postId)
                .orElse(null);

        if (post == null) {
            return null;
        }

        PostResponseDto responseDto = postMapper.postToPostResponseDto(post);
        responseDto.setMemberId(post.getMember().getMemberId());
        responseDto.setCategoryId(post.getCategory().getCategoryId());
        responseDto.setLocationId(post.getLocation().getLocationId());
        return responseDto;
    }

//    public List<PostResponseDto> getPostsByCategoryAndPost(Long categoryId, Long postId, Long memberId, Long locationId, int page) {
//        int pageSize = 12;
//        Pageable pageable = PageRequest.of(page - 1, pageSize, Sort.by("postId").descending());
//
//        Page<Post> postPage;
//        if (categoryId == null && postId == null && memberId == null && locationId == null) {
//            // 전체 글 목록을 가져오는 경우
//            postPage = postRepository.findAll(pageable);
//        } else {
//            // 특정 카테고리, 글, 멤버, 위치에 해당하는 글 목록을 가져오는 경우
//            postPage = postRepository.findByCategory_CategoryIdAndPostIdAndMember_MemberIdAndLocation_LocationId(categoryId, postId, memberId, locationId, pageable);
//        }
//
//        List<PostResponseDto> responseDtoList = postPage.getContent().stream()
//                .map(post -> {
//                    PostResponseDto responseDto = postMapper.postToPostResponseDto(post);
//                    responseDto.setMemberId(post.getMember().getMemberId());
//                    responseDto.setCategoryId(post.getCategory().getCategoryId());
//                    responseDto.setLocationId(post.getLocation().getLocationId());
//                    return responseDto;
//                })
//                .collect(Collectors.toList());
//
//        return responseDtoList;
//    }


    public List<PostResponseDto> getAllPosts(int page) {
        int pageSize = 12;
        Pageable pageable = PageRequest.of(page - 1, pageSize, Sort.by("postId").descending());
        Page<Post> postPage = postRepository.findAll(pageable);

        return postPage.getContent().stream()
                .map(post -> {
                    PostResponseDto responseDto = postMapper.postToPostResponseDto(post);
                    responseDto.setMemberId(post.getMember().getMemberId());
                    responseDto.setCategoryId(post.getCategory().getCategoryId());
                    responseDto.setLocationId(post.getLocation().getLocationId());
                    return responseDto;
                })
                .collect(Collectors.toList());
    }

    public List<PostResponseDto> getPostsByCategory(Long categoryId, int page) {
        // 특정 카테고리에 해당하는 글 목록을 가져오는 로직 구현
        int pageSize = 12;
        Pageable pageable = PageRequest.of(page - 1, pageSize, Sort.by("postId").descending());

        Page<Post> postPage = postRepository.findByCategory_CategoryId(categoryId, pageable);

        List<PostResponseDto> responseDtoList = postPage.getContent().stream()
                .map(post -> {
                    PostResponseDto responseDto = postMapper.postToPostResponseDto(post);
                    responseDto.setMemberId(post.getMember().getMemberId());
                    responseDto.setCategoryId(post.getCategory().getCategoryId());
                    responseDto.setLocationId(post.getLocation().getLocationId());
                    return responseDto;
                })
                .collect(Collectors.toList());

        return responseDtoList;
    }

    public List<PostResponseDto> getPostsByMember(Long memberId, int page) {
        // 특정 멤버에 해당하는 글 목록을 가져오는 로직 구현
        int pageSize = 12;
        Pageable pageable = PageRequest.of(page - 1, pageSize, Sort.by("postId").descending());

        Page<Post> postPage = postRepository.findByMember_MemberId(memberId, pageable);

        List<PostResponseDto> responseDtoList = postPage.getContent().stream()
                .map(post -> {
                    PostResponseDto responseDto = postMapper.postToPostResponseDto(post);
                    responseDto.setMemberId(post.getMember().getMemberId());
                    responseDto.setCategoryId(post.getCategory().getCategoryId());
                    responseDto.setLocationId(post.getLocation().getLocationId());
                    return responseDto;
                })
                .collect(Collectors.toList());

        return responseDtoList;
    }

    public List<PostResponseDto> getPostsByLocation(Long locationId, int page) {
        // 특정 위치에 해당하는 글 목록을 가져오는 로직 구현
        int pageSize = 12;
        Pageable pageable = PageRequest.of(page - 1, pageSize, Sort.by("postId").descending());

        Page<Post> postPage = postRepository.findByLocation_LocationId(locationId, pageable);

        List<PostResponseDto> responseDtoList = postPage.getContent().stream()
                .map(post -> {
                    PostResponseDto responseDto = postMapper.postToPostResponseDto(post);
                    responseDto.setMemberId(post.getMember().getMemberId());
                    responseDto.setCategoryId(post.getCategory().getCategoryId());
                    responseDto.setLocationId(post.getLocation().getLocationId());
                    return responseDto;
                })
                .collect(Collectors.toList());

        return responseDtoList;
    }

    public List<PostResponseDto> getPostsByCategoryAndLocation(Long categoryId, Long locationId, int page) {
        // categoryId와 locationId에 해당하는 글 목록을 가져오는 로직 구현
        int pageSize = 12;
        Pageable pageable = PageRequest.of(page - 1, pageSize, Sort.by("postId").descending());

        Page<Post> postPage = postRepository.findByCategory_CategoryIdAndLocation_LocationId(categoryId, locationId, pageable);

        List<PostResponseDto> responseDtoList = postPage.getContent().stream()
                .map(post -> {
                    PostResponseDto responseDto = postMapper.postToPostResponseDto(post);
                    responseDto.setMemberId(post.getMember().getMemberId());
                    responseDto.setCategoryId(post.getCategory().getCategoryId());
                    responseDto.setLocationId(post.getLocation().getLocationId());
                    return responseDto;
                })
                .collect(Collectors.toList());

        return responseDtoList;
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
        responseDto.setMemberId(memberId);
        responseDto.setCategoryId(categoryId);
        responseDto.setLocationId(locationId);
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
        responseDto.setMemberId(memberId);
        responseDto.setCategoryId(postDto.getCategoryId());
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
        int pageSize = 12;
        Pageable pageable = PageRequest.of(page - 1, pageSize, Sort.by("postId").descending());

        Specification<Post> specification = (root, query, criteriaBuilder) -> {
            Predicate keywordPredicate = criteriaBuilder.or(
                    criteriaBuilder.like(root.get("title"), "%" + keyword + "%"),
                    criteriaBuilder.like(root.get("content"), "%" + keyword + "%")
            );

            return keywordPredicate;
        };

        Page<Post> postPage = postRepository.findAll(specification, pageable);

        List<PostResponseDto> responseDtoList = postPage.getContent().stream()
                .map(post -> {
                    PostResponseDto responseDto = postMapper.postToPostResponseDto(post);
                    responseDto.setMemberId(post.getMember().getMemberId());
                    responseDto.setCategoryId(post.getCategory().getCategoryId());
                    responseDto.setLocationId(post.getLocation().getLocationId());
                    return responseDto;
                })
                .collect(Collectors.toList());

        return responseDtoList;
    }
    public List<PostResponseDto> searchPostsByLocation(String keyword, Long locationId, int page) {
        int pageSize = 12;
        Pageable pageable = PageRequest.of(page - 1, pageSize, Sort.by("postId").descending());

        Specification<Post> specification = (root, query, criteriaBuilder) -> {
            Predicate keywordPredicate = criteriaBuilder.or(
                    criteriaBuilder.like(root.get("title"), "%" + keyword + "%"),
                    criteriaBuilder.like(root.get("content"), "%" + keyword + "%")
            );

            Predicate locationPredicate = criteriaBuilder.equal(root.get("location").get("locationId"), locationId);

            return criteriaBuilder.and(keywordPredicate, locationPredicate);
        };

        Page<Post> postPage = postRepository.findAll(specification, pageable);

        List<PostResponseDto> responseDtoList = postPage.getContent().stream()
                .map(post -> {
                    PostResponseDto responseDto = postMapper.postToPostResponseDto(post);
                    responseDto.setMemberId(post.getMember().getMemberId());
                    responseDto.setCategoryId(post.getCategory().getCategoryId());
                    responseDto.setLocationId(post.getLocation().getLocationId());
                    return responseDto;
                })
                .collect(Collectors.toList());

        return responseDtoList;
    }
    public List<PostResponseDto> searchPostsByCategory(String keyword, Long categoryId, int page) {
        int pageSize = 12;
        Pageable pageable = PageRequest.of(page - 1, pageSize, Sort.by("postId").descending());

        Specification<Post> specification = (root, query, criteriaBuilder) -> {
            Predicate keywordPredicate = criteriaBuilder.or(
                    criteriaBuilder.like(root.get("title"), "%" + keyword + "%"),
                    criteriaBuilder.like(root.get("content"), "%" + keyword + "%")
            );

            Predicate categoryPredicate = criteriaBuilder.equal(root.get("category").get("categoryId"), categoryId);

            return criteriaBuilder.and(keywordPredicate, categoryPredicate);
        };

        Page<Post> postPage = postRepository.findAll(specification, pageable);

        List<PostResponseDto> responseDtoList = postPage.getContent().stream()
                .map(post -> {
                    PostResponseDto responseDto = postMapper.postToPostResponseDto(post);
                    responseDto.setMemberId(post.getMember().getMemberId());
                    responseDto.setCategoryId(post.getCategory().getCategoryId());
                    responseDto.setLocationId(post.getLocation().getLocationId());
                    return responseDto;
                })
                .collect(Collectors.toList());

        return responseDtoList;
    }
    public List<PostResponseDto> searchPostsByLocationAndCategory(String keyword, Long locationId, Long categoryId, int page) {
        int pageSize = 12;
        Pageable pageable = PageRequest.of(page - 1, pageSize, Sort.by("postId").descending());

        Specification<Post> specification = (root, query, criteriaBuilder) -> {
            Predicate keywordPredicate = criteriaBuilder.or(
                    criteriaBuilder.like(root.get("title"), "%" + keyword + "%"),
                    criteriaBuilder.like(root.get("content"), "%" + keyword + "%")
            );

            Predicate locationPredicate = criteriaBuilder.equal(root.get("location").get("locationId"), locationId);
            Predicate categoryPredicate = criteriaBuilder.equal(root.get("category").get("categoryId"), categoryId);

            return criteriaBuilder.and(keywordPredicate, locationPredicate, categoryPredicate);
        };

        Page<Post> postPage = postRepository.findAll(specification, pageable);

        List<PostResponseDto> responseDtoList = postPage.getContent().stream()
                .map(post -> {
                    PostResponseDto responseDto = postMapper.postToPostResponseDto(post);
                    responseDto.setMemberId(post.getMember().getMemberId());
                    responseDto.setCategoryId(post.getCategory().getCategoryId());
                    responseDto.setLocationId(post.getLocation().getLocationId());
                    return responseDto;
                })
                .collect(Collectors.toList());

        return responseDtoList;
    }
}