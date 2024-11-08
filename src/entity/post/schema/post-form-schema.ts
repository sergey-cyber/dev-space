import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(1, {
    message: "Заголовок не должен быть пустым.",
  }),
  tags: z.array(z.string()).optional(),
  content: z.string().min(1, {
    message: "Контент не должен быть пустым.",
  }),
});
