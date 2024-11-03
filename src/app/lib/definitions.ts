import { z } from "zod";

export const SignupFormSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "First name must be at least 2 characters long." }),
    lastName: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters long." }),
    email: z.string().email({ message: "Please enter a valid email" }).trim(),
    password: z
      .string()
      // .min(8, { message: "Be at least 8 characters long." })
      .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
      // .regex(/[0-9]/, { message: "Contain at least one number." })
      // .regex(/[^a-zA-Z0-9]/, {
      //   message: "Contain at least one special character.",
      // })
      .trim(),
    passwordConfirm: z.string().trim(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  });
export type SignupSchema = z.infer<typeof SignupFormSchema>;

export const SigninFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }).trim(),
  password: z.string({ message: "Please enter a valid password" }).trim(),
});
export type SigninSchema = z.infer<typeof SigninFormSchema>;

export const CreateTagFormSchema = z.object({
  name: z
    .string({ message: "Please enter valid tag name" })
    .min(3, { message: "Be at least 3 charactes long" })
    .trim(),
});
export type CreateTagSchema = z.infer<typeof CreateTagFormSchema>;

export const CreateTourCategoryFormSchema = z.object({
  name: z
    .string({ message: "Please enter valid category name" })
    .min(3, { message: "Be at least 3 charactes long" })
    .trim(),
  description: z.string().optional(),
  parentid: z.number().optional(),
});
export type CreateTourCategorySchema = z.infer<
  typeof CreateTourCategoryFormSchema
>;

export const CreateServiceFormSchema = z.object({
  name: z
    .string({ message: "Please enter valid category name" })
    .min(3, { message: "Be at least 3 charactes long" })
    .trim(),
  description: z.string().optional(),
});
export type CreateServiceSchema = z.infer<typeof CreateServiceFormSchema>;
