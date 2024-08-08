import fs from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export async function writeToOutput(str) {
    const filepath = path.join(process.env.EXTRACT__OUTPUT_DIR, 'googlemaps_places_running_shoe_stores.json');
    await fs.writeFile(filepath, str);
    console.log('written to.. file://' + filepath);
}
