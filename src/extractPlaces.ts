require('dotenv').config({ path: '.env.local' });

import { getPlaces } from './places/getPlaces';
import * as path from 'path';
import { promises as fs } from 'fs';

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

export async function jsonAsString(data: any) {
    return JSON.stringify(data, null, 2);
}

export async function writeToRaw(str: string) {
    const filepath = path.join(__dirname, '../data/raw', 'googlemaps_places_running_shoe_stores.json')
    await fs.writeFile(filepath, str);
    console.log('written to.. vscode://file' + filepath);
}

main().then().catch(err => console.log(err))
