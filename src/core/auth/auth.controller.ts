import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersServices: UsersService,
  ) {}
  @Post('users/login')
  @ApiOperation({
    summary: 'Login user',
    description: 'Login user with the provided credentials',
  })
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, invalid password.',
  })
  async login(@Body() authBody: LoginDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = await this.authService.login(authBody);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return data;
  }

  @Post('users/register')
  @ApiOperation({
    summary: 'Register user',
    description: 'Register user with the provided information',
  })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async register(@Body() createUserDto: CreateUserDto) {
    const data = await this.usersServices.createUser(createUserDto);
    return data;
  }
}
