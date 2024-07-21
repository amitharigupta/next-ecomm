import { db } from "@/lib/db/db";
import { warehouses } from "@/lib/db/schema";
import { warehouseSchema } from "@/lib/validators/warehouseSchema";

export async function POST(request: Request, response: Response) {
  let validatedData;
  try {
    const requestData = await request.json();
    validatedData = await warehouseSchema.parse(requestData)

  } catch (error) {
    return Response.json({ status: 500, message: "Error while validating warehouses" + error }, { status: 500 })
  }

  try {
    await db.insert(warehouses).values(validatedData);

    return Response.json({ status: 201, message: "Warehouse created successfully", data: validatedData }, { status: 201 })
  } catch (error) {
    return Response.json({ status: 500, message: "Error while creating warehouses" + error }, { status: 500 })
  }
}

export async function GET() {
  try {
    const allWarehouses = await db.select().from(warehouses);
    if (allWarehouses.length > 0) {
      return Response.json({ status: 200, message: "All warehouses fetched successfully", data: allWarehouses }, { status: 200 })
    } else {
      return Response.json({ status: 404, message: "No warehouses found" }, { status: 404 })
    }
  } catch (error) {
    return Response.json({ status: 500, message: "Error while fetching warehouses" + error }, { status: 500 })
  }
}
