import { jsonAsString, writeToProcessed } from "../utils";
import { createRunningShoeStore } from "./createRunningShoeStore";

import rawDataList from '../../data/raw/googlemaps_places_running_shoe_stores.json' assert { type: 'json' };

async function main() {
    const processedData = rawDataList.places.map((rawData: any) => createRunningShoeStore(rawData));
    const processedDataAsJsonString = await jsonAsString(processedData);
    await writeToProcessed(processedDataAsJsonString);
}

main().then().catch(err => console.log(err));
