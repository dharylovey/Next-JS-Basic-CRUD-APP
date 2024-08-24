import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }).max(50),
  content: z
    .string()
    .min(1, { message: "Content is required" })
    .max(500, { message: "Content is too long" }),
});

export type PostFormProps = z.infer<typeof postSchema>;
