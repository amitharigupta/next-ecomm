import { sql } from "drizzle-orm";
import { index, integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", ({
  id: serial("id").primaryKey(),
  fname: varchar("fname", { length: 100 }).notNull(),
  lname: varchar("lname", { length: 100 }).notNull(),
  email: varchar("email", { length: 100 }).unique().notNull(),
  password: varchar("password", { length: 100 }),
  provider: varchar("provider", { length: 20 }),
  externalId: varchar("external_id", { length: 100 }).notNull(),
  image: text("image"),
  role: varchar("role", { length: 100 }).notNull().default("customer"),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
}));


export const products = pgTable("products", ({
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  image: text("image"),
  description: text("description"),
  price: integer("price").notNull(),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
}));

export const warehouses = pgTable("warehouses", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  pincode: varchar("pincode", { length: 6 }).notNull(),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
}, (table) => {
  return {
    pincodeIdx: index("pincode_idx").on(table.pincode)
  }
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  warehouseId: integer("warehouse_id").references(() => warehouses.id, { onDelete: "cascade" }).notNull(),
  totalPrice: integer("total_price").notNull(),
  status: varchar("status", { length: 20 }).default("pending"),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
});

export const deliveryPersons = pgTable("delivery_persons", {
  id: serial("id").primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  phone: varchar('phone', { length: 13 }).notNull(),
  warehouseId: integer('warehouse_id').references(() => warehouses.id, { onDelete: "cascade" }).notNull(),
  orderId: integer('order_id').references(() => orders.id, { onDelete: "set null" }).notNull(),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
});

export const inventories = pgTable("inventories", {
  id: serial("id").primaryKey(),
  sku: varchar("sku", { length: 8 }).unique().notNull(),
  orderId: integer("order_id").references(() => orders.id, { onDelete: 'set null' }),
  warehouseId: integer("warehouse_id").references(() => warehouses.id, { onDelete: 'cascade' }),
  productId: integer("product_id").references(() => products.id, { onDelete: "cascade" }),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
});
