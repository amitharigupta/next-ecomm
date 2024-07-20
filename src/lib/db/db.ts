import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const queryString = process.env.POSTGRES_DB_URL as string;

export const connection = postgres(queryString);

export const db = drizzle(connection);


