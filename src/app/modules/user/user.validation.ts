import { z } from 'zod';
import { USER_ROLE } from '../../../enums';

const userLoginZodSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string()
  }),
});

const updateUserZodSchema = z.object({
  body: z
    .object({
      password: z.string().optional(),
      role: z.nativeEnum(USER_ROLE).optional(),
      name: z
        .object({
          firstName: z.string().optional(),
          lastName: z.string().optional(),
        })
        .optional(),
      phoneNumber: z.string().optional(),
      address: z.string().optional(),
      budget: z.number().optional(),
      income: z.number().optional(),
    })
    .refine(value => {
      // Check if at least one field in `body` is defined
      const { password, role, name, phoneNumber, address, budget, income } =
        value;
      return (
        password !== undefined ||
        role !== undefined ||
        (name &&
          (name.firstName !== undefined || name.lastName !== undefined)) ||
        phoneNumber !== undefined ||
        address !== undefined ||
        budget !== undefined ||
        income !== undefined
      );
    }, 'At least one value is required to change'),
});

export const userValidation = {
  userLoginZodSchema,
  updateUserZodSchema,
};
