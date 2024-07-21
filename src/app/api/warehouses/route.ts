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
