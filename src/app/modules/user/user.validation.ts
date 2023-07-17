import { z } from 'zod';

const userLoginZodSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

const bookIdZodSchema = z.object({
  body: z.object({
    bookId: z.string(),
  }),
});

export const userValidation = {
  userLoginZodSchema,
  bookIdZodSchema,
};
