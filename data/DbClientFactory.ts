import { FileMeta, Prisma, PrismaClient } from "@prisma/client";
import { BaseDbClient } from "./BaseDbClient";

export class FileMetaService extends BaseDbClient<FileMeta, Prisma.FileMetaCreateInput, Prisma.FileMetaUpdateInput> {
    constructor(prisma: PrismaClient) {
        super(prisma, 'fileMeta')
    }
}
