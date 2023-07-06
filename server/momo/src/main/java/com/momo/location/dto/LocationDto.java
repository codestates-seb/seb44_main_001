package com.momo.location.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LocationDto {
    private Long locationId;
    private String city;
    private String province;
}
