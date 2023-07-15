import { z } from 'zod';

const bookZodSchema = z.object({
  body: z.object({
    title: z.string(),
    author: z.string(),
    genre: z.string(),
    publicationDate: z.string(),
    // reviews: z.custom<mongoose.Types.ObjectId>(),
  }),
});

const updateBookZodSchema = z.object({
  body: z
    .object({
      title: z.string(),
      author: z.string(),
      genre: z.string(),
      publicationDate: z.string(),
    })
    .refine(value => {
      // Check if at least one field in `body` is defined
      const { title, author, genre, publicationDate } = value;
      return (
        title !== undefined ||
        author !== undefined ||
        genre !== undefined ||
        publicationDate !== undefined
      );
    }, 'At least one value is required to change'),
});

export const bookValidation = {
  bookZodSchema,
  updateBookZodSchema,
};
