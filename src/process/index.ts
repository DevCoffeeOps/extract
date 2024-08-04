import { jsonAsString, writeToProcessed } from "../fileUtils";
import { createRunningShoeStore } from "./createRunningShoeStore";
const rawDataList = require('../../data/raw/googlemaps_places_running_shoe_stores.json');

async function main() {
    const processedData = rawDataList.places.map((rawData: any) => createRunningShoeStore(rawData));
    const processedDataAsJsonString = await jsonAsString(processedData);
    await writeToProcessed(processedDataAsJsonString);
}

main().then().catch(err => console.log(err));
