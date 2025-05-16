import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: `email`,
    example: `example@gmail.com`,
  })
  @IsNotEmpty() //installaton de class validator et de class transformer pour pouvoir utiliser ceci
  @IsString()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'Password1!',
  })
  @IsNotEmpty()
  password: string;
}
