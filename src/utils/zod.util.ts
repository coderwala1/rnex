import { z } from "zod";

export const ZodEmailString = z
  .string()
  .toLowerCase()
  .trim()
  .max(255)
  .email("Invalid email address")
  .min(1, "It's required");

export const ZodPasswordString = z
  .string()
  .trim()
  .min(1, "It's required")
  .min(6, "minium 6 character long")
  .max(150, "max 150 character long");
