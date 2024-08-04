require('dotenv').config({ path: '.env.local' });

import axios from "axios";

export async function googleMapsSearchText(keyword: string, lat: number, lng: number, radius: number) {
    const PLACES_API_URL = 'https://places.googleapis.com/v1/places:searchText';

    const postData = {
        textQuery: keyword,
        maxResultCount: 10,
        locationBias: {
            circle: {
                center: {
                    latitude: lat,
                    longitude: lng
                },
                radius
            }
        }
    };

    const headers = {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': process.env.GOOGLE_MAPS_API_KEY,
        'X-Goog-FieldMask': '*'
    };

    try {
        const response = await axios.post(PLACES_API_URL, postData, { headers });
        return response.data;
    } catch (error: any) {
        console.error('Error calling Google Maps API:', error.response.data);
        throw error;
    }
}
