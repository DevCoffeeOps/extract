require('dotenv').config({ path: '.env.local' });

import { getPlaces } from './places/getPlaces';
import { jsonAsString, writeToRaw } from '../fileUtils';

async function main() {
    const USAGE_STRING = 'Usage: node program.js <keyword> <cityState>';

    const args = process.argv.slice(2);
    if (args.length !== 2) console.log(USAGE_STRING)

    const [keyword, cityState] = args;

    if (!keyword || !cityState || typeof keyword !== 'string' || typeof cityState !== 'string') {
        console.log(USAGE_STRING);
    }
    
    console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
    console.log(`% extractPlaces("${keyword}", "${cityState}") %`)
    console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')

    const runningShoeStores = await getPlaces(keyword, cityState);
    const str = await jsonAsString(runningShoeStores);
    await writeToRaw(str);
}

main().then().catch(err => console.log(err))
