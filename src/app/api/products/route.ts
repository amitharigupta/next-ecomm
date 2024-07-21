import { db } from "@/lib/db/db";
import { products } from "@/lib/db/schema";
import { productSchema } from "@/lib/validators/productSchema";
import { writeFile } from "node:fs/promises";
import path from "node:path";

export async function POST(request: Request) {
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
