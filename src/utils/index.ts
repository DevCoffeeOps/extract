import fs from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function jsonAsString(data: any) {
    return JSON.stringify(data, null, 2);
}

export async function writeToRaw(str: string) {
    const filepath = path.join(__dirname, '../../data/raw', 'googlemaps_places_running_shoe_stores.json')
    await fs.writeFile(filepath, str);
    console.log('written to.. vscode://file' + filepath);
}


export async function writeToProcessed(str: string) {
    const filepath = path.join(__dirname, '../../data/processed', 'running_shoe_stores.json')
    await fs.writeFile(filepath, str);
    console.log('written to.. vscode://file' + filepath);
}

