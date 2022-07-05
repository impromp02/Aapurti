import { Schema, Document } from 'mongoose';
import { Role } from 'src/auth/authorization';
import { v4 as uuidv4 } from 'uuid';

export class User {
  altId: string;
  firstName: string;
  lastName?: string;
  username: string;
  password: string;
  isActive: boolean;
  mobile: string;
  email: string;
  avatar?: string;
  roles: Role[];
}

export const userSchema = new Schema<User>(
  {
    altId: { type: String, required: true, default: uuidv4() },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: true },
    mobile: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, required: false },
    roles: { type: [String], enum: Role, required: true },
  },
  { timestamps: true },
);

export type UserDocument = User & Document;
