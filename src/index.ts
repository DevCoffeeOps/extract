import { getPlaces } from './places/getPlaces.js';
import { writeToOutput } from './utils/index.js';

const EXTRACT__KEYWORD = process.env.EXTRACT__KEYWORD;
const EXTRACT__CITY_STATE = process.env.EXTRACT__CITY_STATE;
const EXTRACT__GOOGLE_MAPS_API_KEY = process.env.EXTRACT__GOOGLE_MAPS_API_KEY;

if (!EXTRACT__KEYWORD || !EXTRACT__CITY_STATE || !EXTRACT__GOOGLE_MAPS_API_KEY) {
    throw `ERR: missing required env variable. received ${EXTRACT__KEYWORD}, ${EXTRACT__CITY_STATE}, ${EXTRACT__GOOGLE_MAPS_API_KEY}`
}

async function main() {
    console.log(`extractPlaces("${EXTRACT__KEYWORD}", "${EXTRACT__CITY_STATE}")\n`)
    const runningShoeStores = await getPlaces(EXTRACT__KEYWORD!, EXTRACT__CITY_STATE!);
    await writeToOutput(JSON.stringify(runningShoeStores, null, 2));
}

main().then().catch(err => console.log(err))
