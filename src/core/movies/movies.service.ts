import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UnfavoriteovieDto } from './dto/unfavorite-movie.dto';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { FavoriteovieDto } from './dto/add-favorite-movie';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly usersService: UsersService,
  ) {}
  // Get all movies
  async getAllMovies(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  // Create a new movie
  async createMovie(movie: CreateMovieDto): Promise<Movie> {
    return this.movieRepository.save(movie);
  }

  //Get all favorite movies
  async getFavoritesMovies(favoritesIds: string[]): Promise<Movie[]> {
    const favoritesMovies = await this.movieRepository.find({
      where: {
        id: In(favoritesIds),
      },
    });

    return favoritesMovies;
  }

  //Get movie by id
  async getMovieById(id: string): Promise<Movie> {
    const movie = await this.movieRepository.findOne({
      where: { id },
    });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    return movie;
  }

  //Get a random movie
  async randomMovies(): Promise<Movie> {
    const moviesCount = await this.movieRepository.count();
    const randomOffset = Math.floor(Math.random() * moviesCount);

    const randomMovies = await this.movieRepository.find({
      take: 1,
      skip: randomOffset,
    });
    return randomMovies[0];
  }

  // Add a movie to favorites list
  async addMovieToFavorite(favoriteDto: FavoriteovieDto) {
    const { email, movieId } = favoriteDto;
    const movie = await this.getMovieById(movieId);
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    const user = await this.usersService.getOneUSer(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.favoriteIds.push(movieId);
    await this.userRepository.save(user);

    return movie;
  }

  // Unfavorite a movie
  async unFavoriteMovie(
    unFavoriteDto: UnfavoriteovieDto,
  ): Promise<{ message: string }> {
    const { email, movieId } = unFavoriteDto;
    // Logic to get user
    const user = await this.usersService.getOneUSer(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    // Logic to get movie
    const movie = await this.getMovieById(movieId);
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    // Logic to remove movie from user's favorites, update the user entity
    user.favoriteIds = user.favoriteIds.filter((id) => id !== movieId);

    await this.userRepository.save(user);

    return { message: 'Movie unfavorited successfully' }; // Return the updated user entity
  }
}
