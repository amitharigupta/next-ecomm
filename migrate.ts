import { connection, db } from "@/lib/db/db"
import { migrate } from "drizzle-orm/postgres-js/migrator"

(async () => {
  await migrate(db, { migrationsFolder: './drizzle' });
  console.log('Database migration completed successfully');
  await connection.end();
})();
