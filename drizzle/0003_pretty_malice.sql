ALTER TABLE "warehouses" RENAME COLUMN "pinCode" TO "pincode";--> statement-breakpoint
DROP INDEX IF EXISTS "pincode_idx";--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "pincode_idx" ON "warehouses" USING btree ("pincode");