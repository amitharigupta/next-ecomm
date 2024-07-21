import { z } from "zod";

export const inventorySchema = z.object({
  sku: z.string({ message: "SKU should be string" }).length(8, "SKU should be 8 chars long"),
  warehouseId: z.number({ message: "Warehouse id should be number" }),
  productId: z.number({ message: "Product id should be number" }),
  orderId: z.number({ message: "Order id should be number" }),
});
