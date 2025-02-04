import { defineConfig } from "drizzle-kit";


export default defineConfig({
  schema: './src/lib/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_DB_URL as string,
  },

});
