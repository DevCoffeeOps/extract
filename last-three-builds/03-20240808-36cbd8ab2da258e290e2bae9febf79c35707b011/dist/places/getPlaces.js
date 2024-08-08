import { googleMapsSearchText } from './googleMapsSearchText.js';
import { getCoordinates } from '../coordinates/getCoordinates.js';
export async function getPlaces(keyword, cityState, radius = 5000) {
    const coordinates = await getCoordinates(cityState);
    const results = await googleMapsSearchText(keyword, coordinates.lat, coordinates.lng, radius);
    return results;
}
