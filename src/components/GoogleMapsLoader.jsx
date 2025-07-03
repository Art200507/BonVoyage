import { useEffect, useState } from 'react';

// Global state to track script loading
let isScriptLoading = false;
let scriptLoadPromise = null;
const CALLBACK_NAME = 'initGoogleMaps';

export function useGoogleMapsLoader() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // If already loaded, don't reload
        if (window.google?.maps?.places && window.google.maps.places.PlaceAutocompleteElement && window.google.maps.places.Place) {
            setIsLoaded(true);
            return;
        }

        // Use the correct API key (try both env vars for compatibility)
        const apiKey = import.meta.env.VITE_GOOGLE_PLACE_API_KEY || import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
        if (!apiKey) {
            const error = 'Google Maps API key is missing';
            console.error(error);
            setError(error);
            return;
        }

        // Check if script is already being loaded
        if (isScriptLoading) {
            // Wait for existing load to complete
            scriptLoadPromise?.then(() => {
                setIsLoaded(true);
            }).catch((err) => {
                setError(err.message);
            });
            return;
        }

        if (!scriptLoadPromise) {
            isScriptLoading = true;
            scriptLoadPromise = new Promise((resolve, reject) => {
                try {
                    // Define the callback function
                    window[CALLBACK_NAME] = function () {
                        if (window.google?.maps?.places && window.google.maps.places.PlaceAutocompleteElement && window.google.maps.places.Place) {
                            resolve();
                        } else {
                            reject(new Error('Places library failed to load'));
                        }
                    };

                    // Check if script already exists
                    const existingScript = document.querySelector(`script[src*="maps.googleapis.com/maps/api/js"]`);
                    if (existingScript) {
                        existingScript.remove();
                    }

                    // Load the Google Maps script with only the 'places' library
                    const script = document.createElement('script');
                    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=${CALLBACK_NAME}&loading=async`;
                    script.async = true;
                    script.defer = true;

                    script.onerror = (err) => {
                        const error = 'Failed to load Google Maps API';
                        console.error(error, err);
                        reject(new Error(error));
                        isScriptLoading = false;
                        // Don't delete callback here as it might be needed for retry
                    };

                    document.head.appendChild(script);
                } catch (err) {
                    console.error('Error setting up Google Maps:', err);
                    reject(err);
                    isScriptLoading = false;
                }
            });

            scriptLoadPromise
                .then(() => {
                    setIsLoaded(true);
                    setError(null);
                    isScriptLoading = false;
                    // Only delete callback after successful load
                    delete window[CALLBACK_NAME];
                })
                .catch((err) => {
                    setError(err.message);
                    isScriptLoading = false;
                    scriptLoadPromise = null;
                    // Only delete callback after error
                    delete window[CALLBACK_NAME];
                });
        }

        return () => {
            // Cleanup only when component unmounts and loading is complete
            if (!isScriptLoading) {
                scriptLoadPromise = null;
                delete window[CALLBACK_NAME];
            }
        };
    }, []);

    return { isLoaded, error };
} 