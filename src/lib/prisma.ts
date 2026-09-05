import { PrismaClient } from '../generated/prisma';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const connectionString = process.env.DATABASE_URL || 'file:./dev.db';
const dbPath = connectionString.startsWith('file:') ? connectionString.slice(5) : connectionString;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

let prisma: PrismaClient;

if (globalForPrisma.prisma) {
  prisma = globalForPrisma.prisma;
} else {
  const adapter = new PrismaBetterSqlite3({ url: dbPath });
  prisma = new PrismaClient({ adapter });
}

export { prisma };

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
