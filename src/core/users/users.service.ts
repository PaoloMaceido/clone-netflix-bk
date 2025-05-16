import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async getOneUSer(email: string): Promise<User> {
    //this.logger.log('info', `Get user : ${email} information`);
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async createUser(user: CreateUserDto) {
    if (!user.password) {
      throw new Error('Password is required to create a user');
    }
    const userHashedPassword = await this.hashPassword(user.password);
    try {
      await this.userRepository.save({
        ...user,
        hashedPassword: userHashedPassword,
        image: '',
        emailVerified: new Date(),
      }); // Enregistrer l'utilisateur
      return 'Registered successfully';
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user');
    }
  }

  private async hashPassword(password: string): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const hashedPassword = await hash(password, 10);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return hashedPassword;
  }
}
