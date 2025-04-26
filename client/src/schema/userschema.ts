import { z } from "zod";

export const userSignupSchema = z.object({
  fullname: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().length(8, "Password must be exactly 8 characters"),
  contact: z.string().regex(/^\d{10}$/, "Contact must be numeric and exactly 10 digits"),
});

export type Signupinputstate = z.infer<typeof userSignupSchema>;

export const userLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().length(8, "Password must be exactly 8 characters"),
});

export type Logininputstate = z.infer<typeof userLoginSchema>;
