import axios from "axios"

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// Use the Places library from the Maps JavaScript API instead of direct HTTP calls
export const GetPlaceDetails = async (data) => {
    try {
        // Create a Places service instance
        const service = new window.google.maps.places.PlacesService(document.createElement('div'));

        return new Promise((resolve, reject) => {
            service.textSearch({
                query: data.textQuery,
                language: data.languageCode || "en"
            }, (results, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                    resolve({
                        data: {
                            places: results.map(place => ({
                                photos: place.photos?.map(photo => ({
                                    reference: photo.getUrl()
                                })) || [],
                                displayName: place.name,
                                formattedAddress: place.formatted_address,
                                rating: place.rating
                            }))
                        }
                    });
                } else {
                    reject(new Error(`Places API error: ${status}`));
                }
            });
        });
    } catch (error) {
        console.error('Error in GetPlaceDetails:', error);
        throw error;
    }
};

// Remove PHOTO_REF_URL as we're getting direct URLs from the Places service
export const PHOTO_REF_URL = null;
