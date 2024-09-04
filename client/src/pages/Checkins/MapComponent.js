import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import axios from 'axios';
import { debounce } from 'lodash';
import { useContextApi } from '../../api/ContextApi';

const containerStyle = {
    width: '100%',
    height: '100%'
};

const MapComponent = (props) => {
    let state = useContextApi()
    let [BackendUrl] = state.BackendUrl
    let { Long, setLong, Lat, setLat, type, Places, setPlaces, setSelectedPlace, setShowPopup } = props;
    const [map, setMap] = useState(null);
    const [radius, setRadius] = useState(1500);

    const fetchPlaces = async (center, radius) => {
        try {
            let response = await axios.get(`${BackendUrl}/places/google-places`, {
                params: {
                    location: `${center.lat},${center.lng}`,
                    radius: radius,
                    type: type,
                }
            });
            setPlaces(response.data.data.results);
        } catch (error) {
            console.error("Error fetching places:", error);
        }
    };

    const handleMapLoad = (mapInstance) => {
        setMap(mapInstance);
    };

    const getRadiusFromZoom = (zoom) => {
        const zoomLevelToRadiusMap = {
            10: 5000,
            11: 4000,
            12: 3000,
            13: 2000,
            14: 1500,
            15: 1000,
            16: 500,
            17: 250,
            18: 200,
            19: 150,
            20: 100,
        };
        return zoomLevelToRadiusMap[zoom] || 1500;
    };

    const debouncedFetchPlaces = useCallback(
        debounce((center, newRadius) => {
            fetchPlaces(center, newRadius);
        }, 500),
        []
    );

    const handleBoundsChanged = () => {
        if (map) {
            const center = map.getCenter();
            const zoom = map.getZoom();
            const newRadius = getRadiusFromZoom(zoom);
            setRadius(newRadius);
            setLat(center.lat());
            setLong(center.lng());
            debouncedFetchPlaces({ lat: center.lat(), lng: center.lng() }, newRadius);
        }
    };

    const selectPlace = (place) => {
        setShowPopup(true);
        setSelectedPlace(place);
    };

    useEffect(() => {
        fetchPlaces({ lat: Lat, lng: Long }, radius);
    }, [type]);

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat: Lat, lng: Long }}
            zoom={18}
            onLoad={handleMapLoad}
            onDragEnd={handleBoundsChanged}
            onZoomChanged={handleBoundsChanged}
        >
            {Places?.map(place => (
                <Marker
                    key={place.place_id}
                    position={{ lat: place.geometry.location.lat, lng: place.geometry.location.lng }}
                    onClick={() => selectPlace(place)}
                />
            ))}
        </GoogleMap>
    );
};

export default MapComponent;
