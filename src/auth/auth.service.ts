import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn({ username, password }: CreateAuthDto): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new BadRequestException('用户不存在');
    }
    if (user?.password !== password) {
      throw new BadRequestException('密码不正确');
    }
    const payload = { username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
      ...user,
    };
  }
}
