import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserInterface } from './user.interface';
import { UserService } from './user.service';
import { User } from '../../../app/schemas/user.schema';

@Controller('admin/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/hello')
  getHello(): string {
    return this.userService.getHello();
  }

  @Post()
  createUser(@Body() user: any): Promise<User> {
    return this.userService.create(user);
  }

  @Get()
  get(): Promise<User[]> {
    return this.userService.findAll();
  }
}
