import { Role } from '../auth/authorization';
import { z } from 'zod';

export const createUserDto = z.object({
  username: z.string().min(3),
  password: z.string().min(8),
  mobile: z.string().min(10),
  email: z.string().email(),
  role: z.nativeEnum(Role),
  meta: z.union([
    z.object({ firstName: z.string().min(3), lastName: z.string().optional() }),
    z.object({
      name: z.string().min(3),
      address: z.string(),
      block: z.string(),
      district: z.string(),
      coordinate: z.object({
        lat: z.string(),
        lon: z.string(),
      }),
      wardenName: z.string().optional(),
    }),
    z.object({
      name: z.string().min(3),
      regId: z.string().optional(),
      address: z.string(),
      proprietor: z.string().optional(),
      coordinate: z.object({
        lat: z.string(),
        lon: z.string(),
      }),
    }),
  ]),
});

export type CreateUserDto = z.infer<typeof createUserDto>;

export type UpdateUserDto = z.infer<typeof createUserDto>;
