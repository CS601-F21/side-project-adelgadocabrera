import { PrismaClient } from "@prisma/client";

/**
 * I don't like using var instead of let/const
 * but it was the only way of making it work.
 */
declare global {
  var prisma: PrismaClient | undefined;
}

var prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
