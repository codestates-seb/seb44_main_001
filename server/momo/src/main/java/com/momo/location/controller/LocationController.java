package com.momo.location.controller;

import com.momo.location.dto.LocationDto;
import com.momo.location.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/locations")
public class LocationController {

    private final LocationService locationService;

    @Autowired
    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    @GetMapping
    public ResponseEntity<List<LocationDto>> getAllLocations() {
        List<LocationDto> locations = locationService.getAllLocations();
        return ResponseEntity.ok(locations);
    }

    @PostMapping
    public ResponseEntity<LocationDto> createLocation(@RequestBody LocationDto locationDto) {
        LocationDto createdLocation = locationService.createLocation(locationDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdLocation);
    }

    @GetMapping("/{locationId}")
    public ResponseEntity<LocationDto> getLocationById(@PathVariable Long locationId) {
        LocationDto location = locationService.getLocationById(locationId);
        return ResponseEntity.ok(location);
    }

    @PatchMapping("/{locationId}")
    public ResponseEntity<LocationDto> updateLocation(@PathVariable Long locationId, @RequestBody LocationDto locationDto) {
        LocationDto updatedLocation = locationService.updateLocation(locationId, locationDto);
        return ResponseEntity.ok(updatedLocation);
    }

    @DeleteMapping("/{locationId}")
    public ResponseEntity<Void> deleteLocation(@PathVariable Long locationId) {
        locationService.deleteLocation(locationId);
        return ResponseEntity.noContent().build();
    }
}