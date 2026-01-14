'use client';

import { useEffect, useRef } from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { useGoogleMapsLoader } from './GoogleMapsLoader';

export function LocationInput({ value, onChange, error }) {
    const inputRef = useRef(null);
    const autocompleteRef = useRef(null);
    const { isLoaded } = useGoogleMapsLoader();

    useEffect(() => {
        if (isLoaded && inputRef.current && !autocompleteRef.current) {
            autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
                types: ['(cities)'],
                componentRestrictions: { country: 'us' },
            });

            autocompleteRef.current.addListener('place_changed', () => {
                const place = autocompleteRef.current.getPlace();
                if (place.formatted_address) {
                    onChange(place.formatted_address);
                }
            });
        }

        return () => {
            if (autocompleteRef.current) {
                window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
            }
        };
    }, [onChange, isLoaded]);

    if (!isLoaded) {
        return (
            <div className="space-y-2">
                <Label>Location</Label>
                <div className="w-full h-10 bg-gray-100 animate-pulse rounded"></div>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            <Label>Location</Label>
            <Input
                ref={inputRef}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Where do you want to go?"
                error={error}
                className="w-full"
            />
        </div>
    );
} 