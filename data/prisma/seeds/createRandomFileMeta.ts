import { faker } from '@faker-js/faker';
import { Prisma } from '@prisma/client';

export function createRandomFileMetaCreateInput(): Prisma.FileMetaCreateInput {
    return {
        name: faker.string.uuid(),
        path: faker.system.directoryPath(),
        size: faker.number.int({ min: 1, max: 100 }),
        type: faker.system.fileType(),
        createdAt: faker.date.anytime(),
        updatedAt: faker.date.anytime(),
        description: faker.lorem.sentence()
    };
}

export function createRandomFileMetaUpdateInput(): Prisma.FileMetaUpdateInput {
    return {
        name: faker.string.uuid(),
        path: faker.system.directoryPath(),
        size: faker.number.int({ min: 1, max: 100 }),
        type: faker.system.fileType(),
        createdAt: faker.date.anytime(),
        updatedAt: faker.date.anytime(),
        description: faker.lorem.sentence()
    };
}
