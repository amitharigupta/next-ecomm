import { z } from "zod";

export const productSchema = z.object({
  name: z.string({ message: "Product name should be string" }),
  image: z.instanceof(File, {
    message: "Product image should be a file image"
  }),
  price: z.number({ message: "Product price should be number" }),
  description: z.string({ message: "Product description should be string" })
});
