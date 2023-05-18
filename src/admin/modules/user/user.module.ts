import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../../app/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserService, UserRepository, UserEntity],
  controllers: [UserController],
})
export class UserModule {}
