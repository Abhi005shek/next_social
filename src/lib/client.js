import { PrismaClient } from "@prisma/client";

// Declare a global variable to store the PrismaClient instance
const globalForPrisma = global;

if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = new PrismaClient();
}

const prisma = globalForPrisma.prisma;

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
