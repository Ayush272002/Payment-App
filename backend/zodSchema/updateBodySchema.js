import { z } from "zod";

const updateBodySchema = z.object({
  firstName: z.string().min(4).optional(),
  lastName: z.string().min(4).optional(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character")
    .optional(),
});

export default updateBodySchema;
