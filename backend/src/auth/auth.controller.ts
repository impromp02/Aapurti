import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  Request,
  Get,
} from '@nestjs/common';
import { CreateUserDto, createUserDto } from '../user/user.dto';
import { DtoValidation } from '../core';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { loginDto } from './auth.dto';

@Controller('auth')
export class AuthContoller {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @UsePipes(new DtoValidation(loginDto))
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('signup')
  @UsePipes(new DtoValidation(createUserDto))
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return user;
  }
}
