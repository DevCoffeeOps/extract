import { googleMapsGeocode } from "./googleMapsGeocode";

export async function getCoordinates(cityState: string){
    const coordinates = await googleMapsGeocode(cityState);
    return coordinates;
}
