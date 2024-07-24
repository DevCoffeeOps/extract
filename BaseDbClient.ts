import { PrismaClient } from '@prisma/client'
import { Assert } from 'ts-runtime-checks';

export class BaseDbClient<T, CreateInput, UpdateInput> {
  protected prisma: PrismaClient;
  protected model: any;

  constructor(prisma: PrismaClient, model: string) {
    this.prisma = prisma;
    this.model = this.prisma[model as keyof PrismaClient];
  }

  async create(data: Assert<CreateInput>): Promise<T> {
    return this.model.create({ data })
  }

  async findAll(): Promise<T[]> {
    return this.model.findMany()
  }

  async findOne(id: number): Promise<T | null> {
    return this.model.findUnique({ where: { id } })
  }

  async update(id: number, data: Assert<UpdateInput>): Promise<T> {
    return this.model.update({
      where: { id },
      data,
    })
  }

  async delete(id: number): Promise<T> {
    return this.model.delete({ where: { id } })
  }
}
