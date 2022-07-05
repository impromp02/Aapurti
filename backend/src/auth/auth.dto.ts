import { z } from 'zod';

export const loginDto = z.object({
  username: z.string(),
  password: z.string().min(8),
});

export type CreateUserDto = z.infer<typeof loginDto>;

export type UpdateUserDto = z.infer<typeof loginDto>;