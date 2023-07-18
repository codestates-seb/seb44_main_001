package com.momo.chat.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class RoomsDto {
    private List<RoomResponseDto> rooms;

    @Builder
    public RoomsDto(List<RoomResponseDto> rooms) {
        this.rooms = rooms;
    }
}
