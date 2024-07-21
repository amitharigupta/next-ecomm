import { db } from "@/lib/db/db";
import { deliveryPersons, warehouses } from "@/lib/db/schema";
import { deliveryPersonSchema } from "@/lib/validators/deliverPersonSchema";
import { desc, eq } from "drizzle-orm";

export async function POST(request: Response) {
  let validatedData;
  try {
    const requestedData = await request.json();

    validatedData = await deliveryPersonSchema.parse(requestedData);

  } catch (error) {
    return Response.json({ status: 500, message: "Error while validating delivery person" + error }, { status: 500 });
  }

  try {

    await db.insert(deliveryPersons).values(validatedData);

    return Response.json({ status: 201, message: "Delivery person created successfully", data: validatedData }, { status: 201 });

  } catch (error) {
    return Response.json({ status: 500, message: "Error while creating delivery person" + error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const allDeliveyPersons = await db.select({
      id: deliveryPersons.id,
      name: deliveryPersons.name,
      phone: deliveryPersons.phone,
      warehouseName: warehouses.name
    }).from(deliveryPersons).leftJoin(warehouses, eq(deliveryPersons.warehouseId, warehouses.id)).orderBy(desc(deliveryPersons.id));

    if (allDeliveyPersons.length > 0) {
      return Response.json({ status: 200, message: "All delivery person fetched successfully", data: allDeliveyPersons }, { status: 200 });
    } else {
      return Response.json({ status: 404, message: "No delivery person found" }, { status: 404 });
    }
  } catch (error) {
    return Response.json({ status: 500, message: "Error while getting delivery person" + error }, { status: 500 });
  }
}
