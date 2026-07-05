import {z} from "zod"

//register schema
export const registerUserSchema=z.object({
name:z
.string()
.trim()
.min(2,"Name must be at least 2 char long")
.max(255,"Name must not exceed 255 characters"),

email:z
.email("Please enter a valid email address")
.trim()
.max(255,"Email must not exceed 255 characters")
.toLowerCase(),

password:z
.string()
.min(8,"Password must should be at least 8 characters long")
.regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    "Password must contain one lowercase letter,one Uppercase letter and one number"
),
});

//z.infer automatically creates a typescript type from zod schema.
export type RegisterUserData=z.infer<typeof registerUserSchema>;

//loginschema
export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string()
  .min(6, "Password must be at least 6 characters"),
});

export type LoginUserData = z.infer<typeof loginSchema>;