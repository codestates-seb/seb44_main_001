package com.momo.comment.service;

import com.momo.comment.dto.CommentPatchDto;
import com.momo.comment.dto.CommentPostDto;
import com.momo.comment.entity.Comment;
import com.momo.comment.repository.CommentRepository;
import com.momo.exception.BusinessLogicException;
import com.momo.exception.ExceptionCode;
import com.momo.member.entity.Member;
import com.momo.member.repository.MemberRepository;
import com.momo.post.entity.Post;
import com.momo.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class CommentService {
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final MemberRepository memberRepository;
    public Page<Comment> getCommentPage(Long postId, int page, int size) {
        verifyPostId(postId);
        return commentRepository.findAllComments(postId, PageRequest.of(page - 1, size, Sort.by(Sort.Direction.ASC, "createdAt")));
    }

    private void verifyPostId(Long postId) {
        if (postRepository.findById(postId).isEmpty()){
            throw new BusinessLogicException(ExceptionCode.POST_NOT_FOUND);
        }
    }

    public Comment addComment(Long postId, CommentPostDto postDto) {
        Post post = getExistingPost(postId);
        Member member = getExistingMember(postDto.getMemberId());

        Comment comment = Comment.builder()
                .content(postDto.getContent())
                .isPostWriter(checkSameWriter(post, member))
                .build();

        comment.addMember(member);
        comment.addPost(post);

        return commentRepository.save(comment);
    }

    private Boolean checkSameWriter(Post post, Member member) {
        return post.getMember().getMemberId() == member.getMemberId();
    }

    public Comment updateComment(Long commentId, CommentPatchDto patchDto) {
        Comment comment = getExistingComment(commentId);
        Member member = getExistingMember(patchDto.getMemberId());

        verifyCommentWriter(comment, member);
        comment.updateContent(patchDto.getContent());

        return commentRepository.save(comment);
    }

    private void verifyCommentWriter(Comment comment, Member member) {
        if (comment.getMember().getMemberId() != member.getMemberId()) {
            throw new BusinessLogicException(ExceptionCode.COMMENT_MEMBER_NOT_MATCH);
        }
    }

    private Comment getExistingComment(Long commentId) {
        return Optional.ofNullable(commentRepository.findById(commentId))
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND))
                .get();
    }

    private Post getExistingPost(Long postId) {
        return Optional.ofNullable(postRepository.findById(postId))
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND))
                .get();
    }

    private Member getExistingMember(Long memberId) {
        return Optional.ofNullable(memberRepository.findById(memberId))
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND))
                .get();
    }


    public void deleteComment(Long commentId, Long memberId) {
        Comment comment = getExistingComment(commentId);
        Member member = getExistingMember(memberId);

        verifyCommentWriter(comment, member);

        commentRepository.delete(comment);
    }
}
