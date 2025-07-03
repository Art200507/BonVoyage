import React, { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { useGoogleMapsLoader } from './GoogleMapsLoader';

const LocationSearch = ({ onSelect, className }) => {
    const wrapperRef = useRef(null);
    const autocompleteRef = useRef(null);
    const { isLoaded, error } = useGoogleMapsLoader();

    useEffect(() => {
        if (isLoaded && window.google?.maps?.places && wrapperRef.current && !autocompleteRef.current) {
            try {
                // Remove any previous autocomplete element
                wrapperRef.current.innerHTML = '';
                // Create the new PlaceAutocompleteElement
                const placeAutocomplete = new window.google.maps.places.PlaceAutocompleteElement({
                    includedPrimaryTypes: ['locality', 'political'], // restrict to cities
                });
                placeAutocomplete.className = className || '';
                autocompleteRef.current = placeAutocomplete;
                wrapperRef.current.appendChild(placeAutocomplete);
                // Listen for place selection
                placeAutocomplete.addEventListener('gmp-select', async (event) => {
                    const placePrediction = event.placePrediction;
                    const place = placePrediction.toPlace();
                    await place.fetchFields({ fields: ['displayName', 'formattedAddress', 'location', 'id'] });
                    onSelect({
                        label: place.displayName,
                        placeId: place.id,
                        mainText: place.displayName,
                        secondaryText: place.formattedAddress,
                        location: place.location,
                    });
                });
            } catch (err) {
                console.error('Failed to initialize PlaceAutocompleteElement:', err);
                toast.error('Failed to initialize location search');
            }
        }
    }, [isLoaded, className, onSelect]);

    if (error) {
        return (
            <div className="p-4 rounded-xl bg-red-50 text-red-500 border border-red-100">
                <p>{error}</p>
            </div>
        );
    }

    if (!isLoaded) {
        return (
            <div className="p-4 rounded-xl bg-gray-50">
                <p className="text-gray-500">Loading location search...</p>
            </div>
        );
    }

    return (
        <div ref={wrapperRef} className="relative" />
    );
};

export default LocationSearch;