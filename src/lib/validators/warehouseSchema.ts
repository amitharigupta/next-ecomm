import { z } from "zod";

export const warehouseSchema = z.object({
  name: z.string({ message: "Warehouse name should be string" }),
  pincode: z.string({ message: "Warehouse pincode should be string" }).length(6),
});
