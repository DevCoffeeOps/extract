import fs from 'fs/promises';
import { MongoClient, ServerApiVersion } from 'mongodb';

export async function writeToStorage(str: string) {
    if (process.env.EXTRACT__STORAGE_TYPE === 'file') {
        await fs.writeFile(process.env.EXTRACT__FILE_PATH!, str);
        console.log('written to.. file://' + process.env.EXTRACT__FILE_PATH);
    }
    else if (process.env.EXTRACT__STORAGE_TYPE === 'mongo') {
        const client = new MongoClient(process.env.EXTRACT__MONGO_URI!, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
        try {
            const places = JSON.parse(str).places;
            console.log(JSON.stringify(places, null, 2))
            await client.connect();
            
            const database = client.db(process.env.EXTRACT__DB_NAME);
            const collection = database.collection(process.env.EXTRACT__COLLECTION_NAME!);

            const insertManyResult = await collection.insertMany(places);
            console.log(`Successfully wrote to MongoDB! ${insertManyResult}`);
        } finally {
            await client.close();
        }
    }
}
