import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UnfavoriteovieDto {
  @ApiProperty({
    description: `user email`,
    example: `example@gmail.com`,
  })
  @IsNotEmpty() //installaton de class validator et de class transformer pour pouvoir utiliser ceci
  @IsString()
  email: string;

  @ApiProperty({
    description: 'Movie id',
    example: 'uuid-1234-5678-9101',
  })
  @IsNotEmpty({ message: 'MovieId is required' })
  @IsString({ message: 'MovieId should be a string' })
  movieId: string;
}
