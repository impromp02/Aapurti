import {
  UserDocument,
  User,
  Admin,
  AdminMeta,
  FacilitatorMeta,
  Facilitator,
  OrganisationMeta,
  Organisation,
  VendorMeta,
  Vendor,
} from './user.schema';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/auth/authorization';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}
  async create(user: CreateUserDto): Promise<User> {
    // TODO: find a place to plug this discriminator logic e.g. pipe, interceptor etc.
    if (user.role === Role.Admin) {
      const { firstName, lastName } = user.meta as AdminMeta;
      user.meta = new Admin({
        firstName,
        lastName,
      });
    }
    if (user.role === Role.Facilitator) {
      const { firstName, lastName } = user.meta as FacilitatorMeta;
      user.meta = new Facilitator({
        firstName,
        lastName,
      });
    }
    if (user.role === Role.Organisation) {
      const { name, wardenName, address, block, district, coordinate } =
        user.meta as OrganisationMeta;
      user.meta = new Organisation({
        name,
        address,
        block,
        district,
        coordinate,
        wardenName,
      });
    }
    if (user.role === Role.Vendor) {
      const { name, regId, address, proprietor, coordinate } =
        user.meta as VendorMeta;
      user.meta = new Vendor({
        name,
        regId,
        address,
        proprietor,
        coordinate,
      });
    }

    const passwordHash = await bcrypt.hash(user.password, 10);
    const createdUser = await this.userModel.create({
      ...user,
      password: passwordHash,
    });
    return createdUser;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.userModel.findById(id);
    return user;
  }

  async findByUsernameOrEmail(username: string): Promise<User | null> {
    let user = await this.userModel.findOne({ username });
    if (!user) {
      user = await this.userModel.findOne({ email: username });
    }
    return user;
  }
}
