import { promises as fs } from 'fs';
import { getPlaces } from './places/getPlaces.js';
import { writeToOutput } from './utils/index.js';
const EXTRACT__KEYWORD = process.env.EXTRACT__KEYWORD;
const EXTRACT__CITY_STATE = process.env.EXTRACT__CITY_STATE;
const EXTRACT__GOOGLE_MAPS_API_KEY = process.env.EXTRACT__GOOGLE_MAPS_API_KEY;
const EXTRACT__OUTPUT_DIR = process.env.EXTRACT__OUTPUT_DIR;
if (!EXTRACT__KEYWORD || !EXTRACT__CITY_STATE || !EXTRACT__GOOGLE_MAPS_API_KEY || !EXTRACT__OUTPUT_DIR) {
    throw `ERR: missing required env variable. received ${EXTRACT__KEYWORD}, ${EXTRACT__CITY_STATE}, ${EXTRACT__GOOGLE_MAPS_API_KEY}, ${EXTRACT__OUTPUT_DIR}`;
}
async function main() {
    await fs.mkdir(EXTRACT__OUTPUT_DIR, { recursive: true });
    console.log(`extractPlaces("${EXTRACT__KEYWORD}", "${EXTRACT__CITY_STATE}")\n`);
    const runningShoeStores = await getPlaces(EXTRACT__KEYWORD, EXTRACT__CITY_STATE);
    await writeToOutput(JSON.stringify(runningShoeStores, null, 2));
}
main().then().catch((err) => {
    return console.log(err);
});
