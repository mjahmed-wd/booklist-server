import { z } from 'zod';

const userLoginZodSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

const wishlistZodSchema = z.object({
  body: z.object({
    bookId: z.string(),
  }),
});

export const userValidation = {
  userLoginZodSchema,
  wishlistZodSchema,
};
