import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async login(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;

    const existingUser = await this.usersService.getOneUSer(email);

    if (!existingUser) {
      throw new NotFoundException({
        error: 'User not found',
      });
    }

    if (!existingUser.hashedPassword) {
      throw new NotFoundException({
        error: 'User password not set',
      });
    }

    const isPasswordValid = await this.isPasswordValid(
      password,
      existingUser.hashedPassword,
    );

    if (!isPasswordValid)
      throw new NotFoundException({
        error: 'Email or password incorrect',
      });

    return {
      data: {
        email: existingUser.id,
        name: existingUser.name,
      },
      message: 'Login successful',
    };
  }

  private async isPasswordValid(
    password: string,
    hashpassword: string,
  ): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    return await compare(password, hashpassword);
  }
}
