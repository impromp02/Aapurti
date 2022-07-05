import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { DtoValidation } from '../core';
import { createUserDto, CreateUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @UsePipes(new DtoValidation(createUserDto))
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return user;
  }
}
