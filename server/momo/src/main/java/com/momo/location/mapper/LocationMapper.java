package com.momo.location.mapper;

import com.momo.location.dto.LocationDto;
import com.momo.location.entity.Location;
import org.springframework.stereotype.Component;

@Component
public class LocationMapper {

    public LocationDto locationToLocationDto(Location location) {
        LocationDto locationDto = new LocationDto();
        locationDto.setLocationId(location.getLocationId());
        locationDto.setCity(location.getCity());
        locationDto.setProvince(location.getProvince());
        return locationDto;
    }

    public Location locationDtoToLocation(LocationDto locationDto) {
        Location location = new Location();
        location.setLocationId(locationDto.getLocationId());
        location.setCity(locationDto.getCity());
        location.setProvince(locationDto.getProvince());
        return location;
    }
}