import { UserDocument, User } from './user.schema';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}
  async create(user: CreateUserDto): Promise<User> {
    const passwordHash = await bcrypt.hash(user.password, 10);
    const createdUser = await this.userModel.create({
      ...user,
      password: passwordHash,
    });
    return createdUser;
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).select({
      altId: 1,
      firstName: 1,
      lastName: 1,
      username: 1,
      isActive: 1,
      mobile: 1,
      email: 1,
      avatar: 1,
    });
    if (!user) {
      throw new NotFoundException(`User does not exits.`);
    }
    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      throw new NotFoundException(`User does not exits.`);
    }
    return user.toObject();
  }

  async update(id: string, patch: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel
      .findOneAndUpdate({ _id: id }, patch, {
        new: true,
      })
      .select({
        altId: 1,
        firstName: 1,
        lastName: 1,
        username: 1,
        isActive: 1,
        mobile: 1,
        email: 1,
        avatar: 1,
      });
    if (!updatedUser) {
      throw new NotFoundException(`User of ${id} does not exits.`);
    }
    return updatedUser;
  }

  async delete(id: string): Promise<User> {
    const deletedUser = await this.userModel
      .findOneAndDelete({ _id: id })
      .select({
        altId: 1,
        firstName: 1,
        lastName: 1,
        username: 1,
        isActive: 1,
        mobile: 1,
        email: 1,
        avatar: 1,
      });
    if (!deletedUser) {
      throw new NotFoundException(`User of ${id} does not exits.`);
    }
    return deletedUser;
  }
}
