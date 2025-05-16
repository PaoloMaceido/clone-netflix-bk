import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UnfavoriteovieDto } from './dto/unfavorite-movie.dto';
import { FavoriteovieDto } from './dto/add-favorite-movie';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesServices: MoviesService) {}
  @Get()
  async getAllMovies(): Promise<Movie[]> {
    const data = await this.moviesServices.getAllMovies();
    return data;
  }

  @Post('create')
  @ApiOperation({
    summary: 'Create movie',
    description: 'Create a new movie with the provided details',
  })
  @ApiResponse({
    status: 200,
    description: 'Movie created successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async createNewMovie(@Body() newMovie: CreateMovieDto) {
    const data = await this.moviesServices.createMovie(newMovie);
    return { data: data, message: 'Movie created successfully' };
  }

  @Post('favorites')
  @ApiOperation({
    summary: 'Create movie',
    description: 'Create a new movie with the provided details',
  })
  @ApiResponse({
    status: 200,
    description: 'Movie created successfully.',
  })
  async getFavoritesMovies(@Body('favoritesIds') favoritesIds: string[]) {
    const data = await this.moviesServices.getFavoritesMovies(favoritesIds);
    return { data: data, message: 'Favorites movies retrieved successfully' };
  }

  @Get('random')
  @ApiOperation({
    summary: 'Get random movie',
    description: 'Retrieve a random movie from the database',
  })
  @ApiResponse({
    status: 200,
    description: 'Random movie retrieved successfully.',
  })
  async getRandomMovie() {
    const data = await this.moviesServices.randomMovies();
    return { data: data, message: 'Random movie found successfully' };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get one movie',
    description: 'Create a new movie with the provided details',
  })
  @ApiResponse({
    status: 200,
    description: 'Movie created successfully.',
  })
  async getMovieById(@Param('id') id: string) {
    const data = await this.moviesServices.getMovieById(id);
    return { data: data, message: 'Movie found successfully' };
  }

  @Post('favorite')
  @ApiOperation({
    summary: 'Favorite one movie',
    description: "Add a movie to the user's favorites",
  })
  @ApiResponse({
    status: 200,
    description: 'Movie favorited successfully.',
  })
  async addMovieToFavorite(@Body() favoriteDto: FavoriteovieDto) {
    const data = await this.moviesServices.addMovieToFavorite(favoriteDto);
    return { data: data, message: 'Movie favorited successfully' };
  }

  @Post('unfavorite')
  @ApiOperation({
    summary: 'Unfavorite one movie',
    description: "Remove a movie from the user's favorites",
  })
  @ApiResponse({
    status: 200,
    description: 'Movie unfavorited successfully.',
  })
  async unFavoriteMovie(@Body() unFavoriteDto: UnfavoriteovieDto) {
    const data = await this.moviesServices.unFavoriteMovie(unFavoriteDto);
    return { data: data, message: 'Movie unfavorited successfully' };
  }
}
