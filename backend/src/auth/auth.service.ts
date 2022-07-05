import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(
    username: string,
    inputPassword: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.userService.findByUsername(username);
    if (user) {
      // const passwordHash = await bcrypt.hash(inputPassword, 10);
      const isMatch = await bcrypt.compare(inputPassword, user.password);
      const { password, ...result } = user;
      if (isMatch) return result;
      return null;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id.toString() };
    const access_token = await this.jwtService.signAsync(payload);
    return {
      access_token,
    };
  }
}
