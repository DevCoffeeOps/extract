import { FileMetaService } from '../../DbClientFactory';

import { PrismaClient } from '@prisma/client'
import { createRandomFileMetaCreateInput } from './createRandomFileMeta';

export async function seed() {
    const prisma = new PrismaClient()
    const fileMetaService = new FileMetaService(prisma);

    const existingFileMetas = await fileMetaService.findAll();
    for (const f of existingFileMetas) {
        await fileMetaService.delete(f.id);
    }

    const mockFileMeta = createRandomFileMetaCreateInput();
    const mockFileMeta2 = createRandomFileMetaCreateInput();
    await fileMetaService.create(mockFileMeta);
    await fileMetaService.create(mockFileMeta2);

    const fileMetas = await fileMetaService.findAll();
    console.log(JSON.stringify(fileMetas, null, 4));

    await prisma.$disconnect();
}

console.log('Seeding database...')
seed().then(() => console.log("Database seeded!")).catch(err => console.log(err))
