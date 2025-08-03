import {
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'generated/prisma';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from 'src/utils/types';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) { }

  async validateUser(
    username: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.user({ username });

    if (!user || !(await bcrypt.compare(pass, user.password))) return null;

    const { password, ...result } = user;

    return result;
  }

  async login(user: User) {
    const payload: UserPayload = { sub: user.id, username: user.username };

    return {
      access_token: this.jwtService.sign(payload)
    };
  }

  async register(data: { name: string; username: string; password: string; }) {
    const { name, username, password } = data;
    const existingUser = await this.usersService.user({ username });

    if (existingUser) throw new ConflictException();

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.usersService.create({ name, username, password: hashedPassword });

    const payload: UserPayload = { sub: newUser.id, username: newUser.username };

    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
