package com.momo.chat.scheduler;

import com.momo.chat.entity.ChatPing;
import com.momo.chat.entity.MemberChatroom;
import com.momo.chat.repository.ChatPingRepository;
import com.momo.chat.repository.MemberChatroomRepository;
import com.momo.member.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Component
public class ChatScheduler {
    private final MemberChatroomRepository memberChatroomRepository;
    private final ChatPingRepository chatPingRepository;

    @Scheduled(fixedDelay = 30000L)
    public void setOfflineScheduler() {
        log.info("Set Offline Scheduler working...");
        List<ChatPing> pingNotUpdated = chatPingRepository.getPingNotUpdated(Long.valueOf(System.currentTimeMillis()));
        pingNotUpdated.stream()
                .forEach(cp -> chatPingRepository.delete(cp));
        List<Member> members = pingNotUpdated.stream()
                .map(cp -> cp.getMember())
                .collect(Collectors.toList());

        List<MemberChatroom> memberChatrooms = memberChatroomRepository.findByMemberIn(members);
        memberChatrooms.stream()
                .forEach(mc -> {
                    mc.setOffline();
                    memberChatroomRepository.save(mc);
                });
    }
}
