import { db } from "@/lib/db/db";
import { products } from "@/lib/db/schema";
import { productSchema } from "@/lib/validators/productSchema";
import { desc } from "drizzle-orm";
import { writeFile } from "node:fs/promises";
import path from "node:path";

// Create a new product
export async function POST(request: Request) {
  // Todo: check user access
  const data = await request.formData();
  let validatedData;

  try {
    validatedData = productSchema.parse({
      name: data.get("name")?.toString()!,
      image: data.get("image") as File,
      price: Number(data.get("price")),
      description: data.get("description")?.toString()!,
    });
  } catch (error) {
    return Response.json({ message: error }, { status: 400, });
  }

  const fileName = `${Date.now()}${path.extname(validatedData.image.name)}`; //${validatedData.image.name.split('.')[1]}

  try {
    const buffer = Buffer.from(await validatedData.image.arrayBuffer());

    await writeFile(path.join(process.cwd(), "public/assets", fileName), buffer);
  } catch (error) {
    return Response.json({ message: 'Failed to save the file to fs' + error }, { status: 500 });
  }

  try {
    await db.insert(products).values({ ...validatedData, image: fileName })
  } catch (err) {
    // todo: remove stored image from fs
    return Response.json({ message: 'Failed to store product into database' }, { status: 500 });
  }

  return Response.json({ message: 'Product added successfully', data: { ...validatedData, image: fileName } }, { status: 201 });
}

// Get All Products
export async function GET() {
  try {
    const allProducts = await db.select().from(products).orderBy(desc(products.id));

    return Response.json({ status: 200, message: "All Products fetched successfully", data: allProducts }, { status: 200 });
  } catch (err) {
    return Response.json({ status: 500, message: 'Failed to fetch products' + err }, { status: 500 });
  }
}

