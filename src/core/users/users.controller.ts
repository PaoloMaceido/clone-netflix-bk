import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetOneUserDto } from './dto/get-one-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersServices: UsersService) {}

  @Post('me')
  @ApiOperation({
    summary: 'Get user information',
    description: 'Retrieve information about the currently logged-in user',
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
  async getMe(@Body() getOneUserDto: GetOneUserDto) {
    const data = await this.usersServices.getOneUSer(getOneUserDto.email);
    console.log('data', getOneUserDto);
    return data;
  }
}
