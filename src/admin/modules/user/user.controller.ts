import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserModel } from '../../../app/schemas/user.schema';

@Controller('admin/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/hello')
  getHello(): string {
    return this.userService.getHello();
  }

  @Post()
  createUser(@Body() user: any): Promise<UserModel> {
    return this.userService.create(user);
  }

  @Get()
  get(): Promise<UserModel[]> {
    return this.userService.findAll();
  }
}
