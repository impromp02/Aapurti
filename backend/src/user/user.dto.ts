import { z } from 'zod';

export const createUserDto = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  username: z.string(),
  password: z.string().min(8),
  mobile: z.string(),
  email: z.string().email().optional(),
});

export type CreateUserDto = z.infer<typeof createUserDto>;

export type UpdateUserDto = z.infer<typeof createUserDto>;
