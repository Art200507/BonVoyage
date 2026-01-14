import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { useGoogleMapsLoader } from './GoogleMapsLoader';

const LocationSearch = ({ onSelect, className }) => {
    const [query, setQuery] = useState('');
    const [predictions, setPredictions] = useState([]);
    const [showPredictions, setShowPredictions] = useState(false);
    const wrapperRef = useRef(null);
    const serviceRef = useRef(null);
    const { isLoaded, error } = useGoogleMapsLoader();

    useEffect(() => {
        if (isLoaded && window.google?.maps?.places) {
            try {
                serviceRef.current = new window.google.maps.places.AutocompleteService();
            } catch (err) {
                console.error('Failed to initialize AutocompleteService:', err);
                toast.error('Failed to initialize location search');
            }
        }
    }, [isLoaded]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowPredictions(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputChange = async (e) => {
        const value = e.target.value;
        setQuery(value);
        setShowPredictions(true);

        if (!value.trim() || !serviceRef.current) {
            setPredictions([]);
            return;
        }

        try {
            const request = {
                input: value,
                types: ['(cities)']
            };

            const response = await serviceRef.current.getPlacePredictions(request);
            setPredictions(response?.predictions || []);
        } catch (error) {
            console.error('Error getting place predictions:', error);
            setPredictions([]);
        }
    };

    const handlePredictionClick = (prediction) => {
        setQuery(prediction.description);
        setShowPredictions(false);
        onSelect({
            label: prediction.description,
            placeId: prediction.place_id,
            mainText: prediction.structured_formatting.main_text,
            secondaryText: prediction.structured_formatting.secondary_text
        });
    };

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
        <div ref={wrapperRef} className="relative">
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Enter a city name"
                className={className}
            />
            {showPredictions && predictions.length > 0 && (
                <div className="absolute z-50 w-full mt-2 bg-white/90 backdrop-blur-lg rounded-xl border border-gray-200 shadow-lg overflow-hidden">
                    {predictions.map((prediction) => (
                        <div
                            key={prediction.place_id}
                            className="p-4 hover:bg-coral-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
                            onClick={() => handlePredictionClick(prediction)}
                        >
                            <div className="font-medium text-gray-800">
                                {prediction.structured_formatting.main_text}
                            </div>
                            <div className="text-sm text-gray-500">
                                {prediction.structured_formatting.secondary_text}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LocationSearch;