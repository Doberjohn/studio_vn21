import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: Pool | undefined;
};

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

let url: URL;
try {
  url = new URL(connectionString);
} catch (error) {
  throw new Error(
    `Invalid DATABASE_URL format. Expected format: postgresql://user:password@host:port/database`,
  );
}

const isSupabase = url.hostname.includes("supabase.co");
const isDirectConnection = url.port === "5432";

if (isSupabase && isDirectConnection && process.env.NODE_ENV === "production") {
  console.warn(
    "⚠️  Using direct Supabase connection (port 5432) in production. " +
      "For Vercel/serverless, use the connection pooler (port 6543). " +
      "Get it from Supabase Dashboard > Settings > Database > Connection Pooling",
  );
}

const pool =
  globalForPrisma.pool ??
  new Pool({
    connectionString,
    max: 1,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 20000,
    ssl: isSupabase
      ? {
          rejectUnauthorized: false,
        }
      : undefined,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.pool = pool;

const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
