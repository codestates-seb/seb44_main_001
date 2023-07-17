package com.momo.post.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LocationInfo {
    private Long locationId;
    private String city;
    private String province;

    @Builder
    public LocationInfo(Long locationId, String city, String province) {
        this.locationId = locationId;
        this.city = city;
        this.province = province;
    }
}
