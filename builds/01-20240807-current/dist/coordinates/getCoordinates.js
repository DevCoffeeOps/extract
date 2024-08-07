import { googleMapsGeocode } from "./googleMapsGeocode.js";
export async function getCoordinates(cityState) {
    const coordinates = await googleMapsGeocode(cityState);
    return coordinates;
}
