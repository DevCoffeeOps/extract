import processedData from '../../data/processed/running_shoe_stores.json' assert { type: 'json' };

import { PrismaClient, RunningShoeStore } from "@prisma/client";
import { RunningShoeStoreService } from '../utils/DbClientFactory';

async function main() {
    const prisma = new PrismaClient()
    const runningShoeStoreService = new RunningShoeStoreService(prisma);
    const runningShoeStores = await runningShoeStoreService.findAll();
    for (const runningShoeStore of runningShoeStores) {
        await runningShoeStoreService.delete(runningShoeStore.id);
    }
    const ops = processedData.map(async (runningShoeStore: any) => {
        return await runningShoeStoreService.create(runningShoeStore);
    })
    await Promise.all(ops);
    await printAll(runningShoeStoreService);
    await prisma.$disconnect();
}

async function printAll(runningShoeStoreService: RunningShoeStoreService) {
    const runningShoeStores = await runningShoeStoreService.findAll();
    console.log("await runningShoeStoreService.findAll()", JSON.stringify(runningShoeStores, null, 4));
}

main().then().catch(err => console.log(err));
