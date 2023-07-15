package com.momo.post.service;

import com.momo.post.dto.CategoryRangeDto;
import com.momo.post.dto.LocationRangeDto;

public class RangeDtoHelper {
    public static LocationRangeDto getLocationRangeDto(Long locationId) {
        switch (locationId.intValue()) {
            case 1:
                return new LocationRangeDto(18L, 42L);
            case 2:
                return new LocationRangeDto(43L, 50L);
            case 3:
                return new LocationRangeDto(51L, 65L);
            case 4:
                return new LocationRangeDto(66L, 70L);
            case 5:
                return new LocationRangeDto(71L, 78L);
            case 6:
                return new LocationRangeDto(79L, 83L);
            case 7:
                return new LocationRangeDto(84L, 88L);
            case 8:
                return new LocationRangeDto(89L, 90L);
            case 9:
                return new LocationRangeDto(91L, 91L);
            case 10:
                return new LocationRangeDto(92L, 122L);
            case 11:
                return new LocationRangeDto(123L, 140L);
            case 12:
                return new LocationRangeDto(141L, 151L);
            case 13:
                return new LocationRangeDto(152L, 166L);
            case 14:
                return new LocationRangeDto(167L, 189L);
            case 15:
                return new LocationRangeDto(190L, 207L);
            case 16:
                return new LocationRangeDto(208L, 221L);
            case 17:
                return new LocationRangeDto(222L, 243L);
            default:
                return null;
        }
    }
    public static CategoryRangeDto getCategoryRangeDto(Long categoryId) {
        if (categoryId.equals(1L)) {
            return new CategoryRangeDto(1L, 8L);
        }
        return null;
    }
}