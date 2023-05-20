import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from '../../../app/repositories/user.repository';
import { UserEntity } from './user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from '../../../app/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
  ],
  providers: [UserService, UserRepository, UserEntity],
  controllers: [UserController],
})
export class UserModule {}
