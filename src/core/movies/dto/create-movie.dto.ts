import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({
    description: 'Movie title',
    example: 'Big Buck Bunny',
  })
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title should be a string' })
  title: string;

  @ApiProperty({
    description: 'Movie description',
    example: 'A rabbit gets a surprise visit from his friends.',
  })
  @IsNotEmpty({ message: 'Description is required' })
  @IsString({ message: 'Description should be a string' })
  description: string;

  @ApiProperty({
    description: 'Movie URL',
    example: 'https://example.com/video',
  })
  @IsNotEmpty({ message: 'Url is required' })
  @IsString({ message: 'Url should be a string' })
  videoUrl: string;

  @ApiProperty({
    description: 'Movie thumbnailUrl',
    example: 'https://example.com/thumbnail.jpg',
  })
  @IsNotEmpty({ message: 'ThumbnailUrl is required' })
  @IsString({ message: 'ThumbnailUrl should be a string' })
  thumbnailUrl: string;

  @ApiProperty({
    description: 'Movie genre',
    example: 'Animation',
  })
  @IsNotEmpty({ message: 'Genre is required' })
  @IsString({ message: 'Genre should be a string' })
  genre: string;

  @ApiProperty({
    description: 'Movie duration',
    example: '1h 30m',
  })
  @IsNotEmpty({ message: 'Duration is required' })
  @IsString({ message: 'Duration should be a string' })
  duration: string;
}
