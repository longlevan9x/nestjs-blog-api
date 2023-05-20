import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { UserRepository } from '../../../app/repositories/user.repository';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../../strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../../app/constants/constants';
import { JwtStrategy } from '../../strategies/jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from '../../../app/schemas/user.schema';
// import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
// import { APP_GUARD } from '@nestjs/core';
import { RegisterController } from './register.controller';

@Module({
  controllers: [LoginController, RegisterController],
  providers: [
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
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),

  ],
})
export class AuthModule {}
