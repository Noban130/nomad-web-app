import React, { useState, useRef, useEffect } from 'react';
import { Autocomplete } from '@react-google-maps/api';

const PlacesAutocomplete = ({ onPlaceSelected }) => {
    const [autocomplete, setAutocomplete] = useState(null);
    const inputRef = useRef(null);

    const handlePlaceChanged = () => {
        const place = autocomplete.getPlace();
        onPlaceSelected(place);
    };

    return (
        <Autocomplete
            onLoad={setAutocomplete}
            onPlaceChanged={handlePlaceChanged}
        >
        <input
            type="text"
            placeholder="Enter a location"
            ref={inputRef}
            style={{ 
                width: '100%',
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                gap: 10,
                borderRadius: 6,
                backgroundColor: '#eee',
                cursor: 'pointer',
                border: 'none',
                outline: 'none',
            }}
        />
        </Autocomplete>
    );
};

export default PlacesAutocomplete;
