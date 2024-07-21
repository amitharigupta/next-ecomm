import { z } from "zod";

export const deliveryPersonSchema = z.object({
  name: z.string({ message: "Delivery Person name should be string" }),
  phone: z.string({ message: "Delivery Person Phone should be string" }).length(13, "Delivery Person phone should be atleast 13 characters long"),
  warehouseId: z.number({ message: "Delivery Person Warehouse ID should be number" }),
  orderId: z.number({ message: "Delivery Person Order ID should be number" }),
});
