import { z } from "zod";
import { ZodEmailString, ZodPasswordString } from "../../utils/zod.util";

// * login
export const LoginWithEmailSchema = z
  .object({
    email: ZodEmailString,
    password: ZodPasswordString,
  })
  .strict();

export type ILoginWithEmailSchema = z.infer<typeof LoginWithEmailSchema>;
