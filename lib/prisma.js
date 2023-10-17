import { PrismaClient } from '@prisma/client'

const globalForPrisma = global;
globalForPrisma.prisma = globalForPrisma.prisma || new PrismaClient({ log: ['query'] });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = globalForPrisma.prisma;
}

export const prisma = globalForPrisma.prisma;