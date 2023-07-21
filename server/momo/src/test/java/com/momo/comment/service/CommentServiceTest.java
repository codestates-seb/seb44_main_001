package com.momo.comment.service;

import com.momo.comment.dto.CommentPatchDto;
import com.momo.comment.dto.CommentPostDto;
import com.momo.comment.entity.Comment;
import com.momo.comment.repository.CommentRepository;
import com.momo.exception.BusinessLogicException;
import com.momo.member.entity.Member;
import com.momo.member.repository.MemberRepository;
import com.momo.post.entity.Post;
import com.momo.post.repository.PostRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class CommentServiceTest {
    @Autowired
    PostRepository postRepository;
    @Autowired
    MemberRepository memberRepository;
    @Autowired
    CommentRepository commentRepository;
    @Autowired
    CommentService commentService;

    Member member;
    Member member2;
    Post post;
    Post post2;
    Comment comment;

    @BeforeEach
    void setCommentPostMember(){
        member = new Member();
        member.setNickname("micho");
        member.setProfileImage("ex0000");
        member = memberRepository.save(member);

        member2 = new Member();
        member2.setNickname("micho2");
        member2.setProfileImage("ex0002");
        member2 = memberRepository.save(member2);

        post = new Post();
        post.setTitle("hello");
        post.setContent("hello spring");
        post.setMember(member);
        post = postRepository.save(post);

        post2 = new Post();
        post.setTitle("hello");
        post.setContent("hello spring");
        post.setMember(member);
        post2 = postRepository.save(post2);

        comment = Comment.builder()
                .content("spring")
                .isPostWriter(false)
                .member(member2)
                .post(post)
                .build();
        comment = commentRepository.save(comment);
    }
    @Test
    @DisplayName("댓글 등록1 - postId 없음 - 에러")
    void postComment1(){
        //given
        Long postId = 1234L;
        CommentPostDto postDto = new CommentPostDto();
        postDto.setMemberId(member.getMemberId());
        postDto.setContent("i love spring");

        //when
        Assertions.assertThatThrownBy(
                () -> commentService.addComment(postId, postDto)
        ).isInstanceOf(BusinessLogicException.class);
    }

    @Test
    @DisplayName("댓글 등록2 - memberId 없음 - 에러")
    void postComment2(){
        //given
        Long postId = post.getPostId();
        System.out.println(postId);
        CommentPostDto postDto = new CommentPostDto();
        postDto.setMemberId(12345L);
        postDto.setContent("i love spring");

        //when
        Assertions.assertThatThrownBy(
                () -> commentService.addComment(postId, postDto)
        ).isInstanceOf(BusinessLogicException.class);
    }

    @Test
    @DisplayName("댓글 등록3 - postId/memberId 정상동작(글 작성자가 답변 작성)")
    void postComment3(){
        //given
        Long postId = post.getPostId();
        CommentPostDto postDto = new CommentPostDto();
        postDto.setMemberId(member.getMemberId());
        postDto.setContent("i love spring");

        //when
        Comment comment = commentService.addComment(postId, postDto);

        //then
        Assertions.assertThat(comment.getIsPostWriter()).isTrue();
        Assertions.assertThat(comment.getContent()).isEqualTo(postDto.getContent());
        Assertions.assertThat(comment.getMember().getMemberId()).isEqualTo(postDto.getMemberId());
        Assertions.assertThat(comment.getPost().getPostId()).isEqualTo(postId);
    }

    @Test
    @DisplayName("댓글 등록4 - postId/memberId 정상동작(글 작성자가 아닌 사람이 답변 작성)")
    void postComment4(){
        //given
        Long postId = post.getPostId();
        CommentPostDto postDto = new CommentPostDto();
        postDto.setMemberId(member2.getMemberId());
        postDto.setContent("i love spring");
        Comment comment = commentService.addComment(postId, postDto);



        //then
        Assertions.assertThat(comment.getIsPostWriter()).isFalse();
        Assertions.assertThat(comment.getContent()).isEqualTo(postDto.getContent());
        Assertions.assertThat(comment.getMember().getMemberId()).isEqualTo(postDto.getMemberId());
        Assertions.assertThat(comment.getPost().getPostId()).isEqualTo(postId);
    }

    @Test
    @DisplayName("댓글 수정1 - commentId 없음 - 에러")
    void updateComment1(){
        //given
        Long commentId = 1234L;
        CommentPatchDto patchDto = CommentPatchDto.builder()
                .memberId(comment.getMember().getMemberId())
                .content("spring2")
                .build();

        //when
        //then
        Assertions.assertThatThrownBy(
                () -> commentService.updateComment(commentId, patchDto)
        ).isInstanceOf(BusinessLogicException.class);
    }

    @Test
    @DisplayName("댓글 수정2 - memberId 없음 - 에러")
    void updateComment2(){
        //given
        Long commentId = comment.getCommentId();
        CommentPatchDto patchDto = CommentPatchDto.builder()
                .memberId(1234L)
                .content("spring2")
                .build();

        //when
        //then
        Assertions.assertThatThrownBy(
                () -> commentService.updateComment(commentId, patchDto)
        ).isInstanceOf(BusinessLogicException.class);
    }

    @Test
    @DisplayName("댓글 수정3 - memberId가 댓글 작성자가 아님 - 에러")
    void updateComment3(){
        //given
        Long commentId = comment.getCommentId();
        CommentPatchDto patchDto = CommentPatchDto.builder()
                .memberId(member.getMemberId())
                .content("spring2")
                .build();

        //when
        //then
        Assertions.assertThatThrownBy(
                () -> commentService.updateComment(commentId, patchDto)
        ).isInstanceOf(BusinessLogicException.class);
    }

    @Test
    @DisplayName("댓글 수정4 - 정상동작")
    void updateComment4(){
        //given
        Long commentId = comment.getCommentId();
        CommentPatchDto patchDto = CommentPatchDto.builder()
                .memberId(member2.getMemberId())
                .content("spring2")
                .build();

        //when
        Comment updateComment = commentService.updateComment(commentId, patchDto);
        Comment originalComment = commentRepository.findById(comment.getCommentId()).get();

        //then
        Assertions.assertThat(originalComment.getContent()).isEqualTo(updateComment.getContent());
    }

    @Test
    @DisplayName("댓글 삭제1 - commentId 없음 - 에러")
    void deleteComment1(){
        //given
        Long commentId = 1234L;
        Long memberId = member.getMemberId();

        //when
        Assertions.assertThatThrownBy(
                () -> commentService.deleteComment(commentId, memberId)
        ).isInstanceOf(BusinessLogicException.class);
    }

    @Test
    @DisplayName("댓글 삭제3 - memberId 없음 - 에러")
    void deleteComment2(){
        //given
        Long commentId = comment.getCommentId();
        Long memberId = 1234L;

        //when
        Assertions.assertThatThrownBy(
                () -> commentService.deleteComment(commentId, memberId)
        ).isInstanceOf(BusinessLogicException.class);
    }

    @Test
    @DisplayName("댓글 삭제3 - member가 Comment를 작성하지 않음 - 에러")
    void deleteComment3(){
        //given
        Long commentId = comment.getCommentId();
        Long memberId = member.getMemberId();

        //when
        Assertions.assertThatThrownBy(
                () -> commentService.deleteComment(commentId, memberId)
        ).isInstanceOf(BusinessLogicException.class);
    }

    @Test
    @DisplayName("댓글 삭제4 - 정상동작, member, post 연관관계 확인")
    void deleteComment4(){
        //given
        Long commentId = comment.getCommentId();
        Long memberId = member2.getMemberId();

        //when
        commentService.deleteComment(commentId, memberId);

        //then
        Assertions.assertThat(commentRepository.findById(commentId).isEmpty()).isTrue();
        Assertions.assertThat(member2.getComments().stream().findAny().isEmpty()).isTrue();
        Assertions.assertThat(post.getComments().stream().findAny().isEmpty()).isTrue();
    }

    @Test
    @DisplayName("댓글 목록1 - post 없을 때 - 에러")
    void getComments1(){
        Assertions.assertThatThrownBy(
                () -> commentService.getCommentPage(1234L, 1, 4)
        ).isInstanceOf(BusinessLogicException.class);
    }

    @Test
    @DisplayName("댓글 목록2 - 정상동작 - 첫 페이지")
    void getComments2(){
        //given
        Comment comment1 = Comment.builder()
                .content("spring")
                .isPostWriter(false)
                .member(member2)
                .post(post2)
                .build();
        commentRepository.save(comment1);

        Comment comment2 = Comment.builder()
                .content("spring")
                .isPostWriter(false)
                .member(member2)
                .post(post2)
                .build();
        commentRepository.save(comment2);

        Comment comment3 = Comment.builder()
                .content("spring")
                .isPostWriter(false)
                .member(member2)
                .post(post2)
                .build();
        commentRepository.save(comment3);

        Comment comment4 = Comment.builder()
                .content("spring")
                .isPostWriter(false)
                .member(member2)
                .post(post2)
                .build();
        commentRepository.save(comment4);

        //when
        Page<Comment> comments = commentService.getCommentPage(post2.getPostId(), 1, 3);

        //then
        Assertions.assertThat(comments.getTotalElements()).isEqualTo(4);
        Assertions.assertThat(comments.getTotalPages()).isEqualTo(2);
        Assertions.assertThat(comments.getContent().get(0).getCommentId()).isEqualTo(comment1.getCommentId());
        Assertions.assertThat(comments.getContent().get(1).getCommentId()).isEqualTo(comment2.getCommentId());
        Assertions.assertThat(comments.getContent().get(2).getCommentId()).isEqualTo(comment3.getCommentId());
    }

    @Test
    @DisplayName("댓글 목록3 - 정상동작 - 마지막 페이지")
    void getComments3(){
        //given
        Comment comment1 = Comment.builder()
                .content("spring")
                .isPostWriter(false)
                .member(member2)
                .post(post2)
                .build();
        commentRepository.save(comment1);

        Comment comment2 = Comment.builder()
                .content("spring")
                .isPostWriter(false)
                .member(member2)
                .post(post2)
                .build();
        commentRepository.save(comment2);

        Comment comment3 = Comment.builder()
                .content("spring")
                .isPostWriter(false)
                .member(member2)
                .post(post2)
                .build();
        commentRepository.save(comment3);

        Comment comment4 = Comment.builder()
                .content("spring")
                .isPostWriter(false)
                .member(member2)
                .post(post2)
                .build();
        commentRepository.save(comment4);

        //when
        Page<Comment> comments = commentService.getCommentPage(post2.getPostId(), 2, 3);

        //then
        Assertions.assertThat(comments.getTotalElements()).isEqualTo(4);
        Assertions.assertThat(comments.getTotalPages()).isEqualTo(2);
        Assertions.assertThat(comments.getContent().get(0).getCommentId()).isEqualTo(comment4.getCommentId());
    }


}