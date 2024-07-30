import { z } from "zod";

const signinSchema = z.object({
  username: z.string().email(),
  password: z.string(),
});

export default signinSchema;
