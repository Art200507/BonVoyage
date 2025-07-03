import axios from "axios"

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// Use the PlacesService from the Maps JavaScript API
export const GetPlaceDetails = async (data) => {
    try {
        if (!window.google?.maps?.places?.PlacesService) {
            throw new Error('Google Maps PlacesService API is not loaded');
        }
        // Create a dummy div for the PlacesService
        let serviceDiv = document.getElementById('places-service-dummy-div');
        if (!serviceDiv) {
            serviceDiv = document.createElement('div');
            serviceDiv.id = 'places-service-dummy-div';
            serviceDiv.style.display = 'none';
            document.body.appendChild(serviceDiv);
        }
        const service = new window.google.maps.places.PlacesService(serviceDiv);
        // Wrap the callback API in a Promise
        const results = await new Promise((resolve, reject) => {
            service.textSearch({ query: data.textQuery }, (results, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                    resolve(results);
                } else {
                    reject(new Error('PlacesService textSearch failed: ' + status));
                }
            });
        });
        // Map the results to your expected structure
        return {
            data: {
                places: results.map(place => ({
                    photos: place.photos?.map(photo => ({
                        reference: photo.getUrl({ maxWidth: 400 }),
                    })) || [],
                    displayName: place.name,
                    formattedAddress: place.formatted_address,
                    rating: place.rating,
                }))
            }
        };
    } catch (error) {
        console.error('Error in GetPlaceDetails:', error);
        throw error;
    }
};

// Remove PHOTO_REF_URL as we're getting direct URLs from the Places service
export const PHOTO_REF_URL = null;
