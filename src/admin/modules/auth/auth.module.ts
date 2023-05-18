import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { UserRepository } from '../user/user.repository';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../../strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../../app/constants/constants';
import { JwtStrategy } from '../../strategies/jwt.strategy';
// import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
// import { APP_GUARD } from '@nestjs/core';

@Module({
  controllers: [LoginController],
  providers: [
    LoginService,
    UserRepository,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
  ],
  imports: [
    PassportModule,
    JwtModule.register({
      // global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
})
export class AuthModule {}
