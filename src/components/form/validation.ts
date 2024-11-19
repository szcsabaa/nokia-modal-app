import {z} from "zod";

const passwordSchema = z.string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/\d/, "Password must contain at least one digit")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")

export const registerSchema = z.object({
  name: z.string().min(1, {message: "Name is required"}),
  mobilePhone: z.string().min(10, {message: "Invalid phone number"}),
  email: z.string().email({message: "Invalid email address"}),
  username: z.string().min(4, {message: "Username must be at least 4 characters"}),
  password: passwordSchema,
  confirmPassword: passwordSchema,
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});