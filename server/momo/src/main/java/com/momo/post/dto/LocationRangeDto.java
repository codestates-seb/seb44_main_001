package com.momo.post.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LocationRangeDto {
    private Long startLocationId;
    private Long endLocationId;

    public LocationRangeDto(Long startLocationId, Long endLocationId) {
        this.startLocationId = startLocationId;
        this.endLocationId = endLocationId;
    }

    public boolean isInRange(Long locationId) {
        return locationId >= startLocationId && locationId <= endLocationId;
    }
}