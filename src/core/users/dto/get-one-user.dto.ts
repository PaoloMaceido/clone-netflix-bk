import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetOneUserDto {
  @ApiProperty({
    description: 'User email',
    example: 'user@example.com',
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsString({ message: 'Email should be a string' })
  email: string;
}
