import axios from 'axios';

export async function googleMapsGeocode(cityState: string) {
    const GOOGLE_MAPS_API_KEY = process.env.EXTRACT__GOOGLE_MAPS_API_KEY;
    if (!GOOGLE_MAPS_API_KEY) throw TypeError("process.env.GOOGLE_MAPS_API_KEY is missing");
    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(cityState)}&key=${GOOGLE_MAPS_API_KEY}`;
    const response = await axios.get(geocodingUrl);
    const location = response.data.results[0].geometry.location;
    return {
        lat: location.lat,
        lng: location.lng,
    };
}
