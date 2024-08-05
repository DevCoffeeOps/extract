import { googleMapsSearchText } from './googleMapsSearchText';
import { getCoordinates } from '../coordinates/getCoordinates';

export async function getPlaces(keyword: string, cityState: string, radius: number = 5000) {
    const coordinates = await getCoordinates(cityState);
    const results = await googleMapsSearchText(keyword, coordinates.lat, coordinates.lng, radius)
    return results;
}
