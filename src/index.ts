import { getPlaces } from './places/getPlaces.js';
import { writeToStorage } from './utils/index.js';

async function main() {
    console.log(`extractPlaces("${process.env.EXTRACT__KEYWORD}", "${process.env.EXTRACT__CITY_STATE}")\n`)
    const places = await getPlaces(process.env.EXTRACT__KEYWORD!, process.env.EXTRACT__CITY_STATE!);
    await writeToStorage(JSON.stringify(places, null, 2));
}

main().then().catch(err => console.log(err))
