package com.momo.member.repository;

import com.momo.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);

    Optional<Member> findByNickname(String nickname);

    @Query(value = "select m from Member m where m.nickname like :nickname% order by m.nickname")
    List<Member> findByNicknameStartsWithOrderByNickname(String nickname);
}
