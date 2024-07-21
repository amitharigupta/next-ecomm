import { db } from "@/lib/db/db";
import { products } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const product = await db.select().from(products).where(eq(products.id, parseInt(id))).limit(1);

    if (product.length > 0) {
      return Response.json({ status: 200, data: product[0] }, { status: 200 });
    } else {
      return Response.json({ status: 404, message: 'Product not found' }, { status: 404 });
    }

  } catch (error) {
    return Response.json({ status: 500, message: 'Failed to fetch product' + error }, { status: 500 });
  }
}
