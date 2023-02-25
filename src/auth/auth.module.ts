import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google.stratergy';
import { GoogleGuard } from './google.guard';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt.guard';

@Module({
  imports: [UserModule, PrismaModule, PassportModule,
    PassportModule.register({
      session: true
    }),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => {
        return {
          secret: config.getOrThrow<string>('JWT_SECRET_KEY'),
          signOptions: {
            expiresIn: config.getOrThrow<string | number>('JWT_EXPIRATION_TIME'),
          },
        };
      },
      inject: [ConfigService],
    }),],
  providers: [AuthService, UserService, GoogleStrategy, GoogleGuard, JwtStrategy, JwtAuthGuard],
  controllers: [AuthController]
})
export class AuthModule { }
