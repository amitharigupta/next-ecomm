import { db } from "@/lib/db/db";
import { inventories, products, warehouses } from "@/lib/db/schema";
import { inventorySchema } from "@/lib/validators/inventorySchema";
import { desc, eq } from "drizzle-orm";

export async function POST(request: Request) {
  let validatedData;
  try {
    const requestData = await request.json();
    validatedData = await inventorySchema.parse(requestData);
  } catch (error) {
    return Response.json({ status: 400, message: "Error while validating inventory schema" }, { status: 400 });
  }

  try {
    await db.insert(inventories).values(validatedData);

    return Response.json({ status: 201, message: "Inventory created successfully", data: validatedData }, { status: 201 });
  } catch (error) {
    return Response.json({ status: 500, message: "Error while creating inventory into database" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const allInventories = await
      db.select({
        id: inventories.id,
        sku: inventories.sku,
        warehouse: warehouses.name,
        products: products.name
      })
        .from(inventories)
        .leftJoin(warehouses, eq(inventories.warehouseId, warehouses.id))
        .leftJoin(products, eq(inventories.productId, products.id))
        .orderBy(desc(inventories.id));

    if (allInventories.length > 0) {
      return Response.json({ status: 200, message: "Inventories fetched successfully" }, { status: 200 })
    } else {
      return Response.json({ status: 404, message: "No inventories found" }, { status: 404 })
    }
  } catch (error) {
    return Response.json({ status: 500, message: "Failed to fetch inventories" }, { status: 500 })
  }
}
