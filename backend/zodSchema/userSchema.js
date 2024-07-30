import { z } from "zod";

const userSchema = z.object({
  username: z.string().email(),
  firstName: z.string().min(4),
  lastName: z.string().min(4),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character"),
});

export default userSchema;
