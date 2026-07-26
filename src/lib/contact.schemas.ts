import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be under 100 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be under 255 characters" }),
  subject: z
    .string({ required_error: "Subject is required" })
    .trim()
    .min(1, { message: "Subject is required" })
    .max(200, { message: "Subject must be under 200 characters" }),
  message: z
    .string({ required_error: "Message is required" })
    .trim()
    .min(1, { message: "Message is required" })
    .max(2000, { message: "Message must be under 2000 characters" }),
});

export type ContactInput = z.infer<typeof contactSchema>;
