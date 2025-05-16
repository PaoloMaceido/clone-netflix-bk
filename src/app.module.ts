import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './core/users/users.module';
import { AccountsModule } from './core/accounts/accounts.module';
import { SessionsModule } from './core/sessions/sessions.module';
import { VerificationTokensModule } from './core/verification_tokens/verification_tokens.module';
import { MoviesModule } from './core/movies/movies.module';
import { AuthModule } from './core/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Rendre les variables accessibles dans tout le projet
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true, // ⚠️ à désactiver en prod
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      ssl: {
        rejectUnauthorized: false, // requis par Neon
      },
    }),
    UsersModule,
    AccountsModule,
    SessionsModule,
    VerificationTokensModule,
    MoviesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
