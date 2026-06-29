import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString });

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Named export (useful for some files)
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Default export (this specifically fixes your seed.ts file!)
export default prisma;