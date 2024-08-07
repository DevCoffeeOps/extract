import axios from "axios";
export async function googleMapsSearchText(keyword, lat, lng, radius) {
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
        'X-Goog-Api-Key': process.env.EXTRACT__GOOGLE_MAPS_API_KEY,
        'X-Goog-FieldMask': '*'
    };
    try {
        const response = await axios.post(PLACES_API_URL, postData, { headers });
        return response.data;
    }
    catch (error) {
        console.error('Error calling Google Maps API:', error.response.data);
        throw error;
    }
}
