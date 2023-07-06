package com.momo.location.service;

import com.momo.exception.NotFoundException;
import com.momo.location.dto.LocationDto;
import com.momo.location.entity.Location;
import com.momo.location.mapper.LocationMapper;
import com.momo.location.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LocationService {

    private final LocationRepository locationRepository;
    private final LocationMapper locationDtoMapper;

    @Autowired
    public LocationService(LocationRepository locationRepository, LocationMapper locationDtoMapper) {
        this.locationRepository = locationRepository;
        this.locationDtoMapper = locationDtoMapper;
    }

    public List<LocationDto> getAllLocations() {
        List<Location> locations = locationRepository.findAll();
        return locations.stream()
                .map(locationDtoMapper::locationToLocationDto)
                .collect(Collectors.toList());
    }

    public LocationDto createLocation(LocationDto locationDto) {
        Location location = locationDtoMapper.locationDtoToLocation(locationDto);
        Location savedLocation = locationRepository.save(location);
        return locationDtoMapper.locationToLocationDto(savedLocation);
    }

    public LocationDto getLocationById(Long locationId) {
        Location location = locationRepository.findById(locationId)
                .orElseThrow(() -> new NotFoundException("Location with ID " + locationId + " not found"));
        return locationDtoMapper.locationToLocationDto(location);
    }

    public LocationDto updateLocation(Long locationId, LocationDto locationDto) {
        Location existingLocation = locationRepository.findById(locationId)
                .orElseThrow(() -> new NotFoundException("Location with ID " + locationId + " not found"));

        existingLocation.setCity(locationDto.getCity());
        existingLocation.setProvince(locationDto.getProvince());

        Location updatedLocation = locationRepository.save(existingLocation);
        return locationDtoMapper.locationToLocationDto(updatedLocation);
    }

    public void deleteLocation(Long locationId) {
        Location location = locationRepository.findById(locationId)
                .orElseThrow(() -> new NotFoundException("Location with ID " + locationId + " not found"));
        locationRepository.delete(location);
    }
}