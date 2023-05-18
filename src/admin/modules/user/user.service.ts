import { Injectable } from '@nestjs/common';
import { UserInterface } from './user.interface';
import { UserRepository } from './user.repository';
import { User } from '../../../app/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  private readonly users: UserInterface[] = [];

  constructor(
    @InjectModel(User.name) private catModel: Model<User>,
    private readonly userRepository: UserRepository,
  ) {}

  getHello(): string {
    return '  ád  ád !';
  }

  createUser(user: UserInterface): UserInterface {
    this.users.push(user);
    return user;
  }

  async getAllUsers(): Promise<UserInterface[]> {
    return this.userRepository.get();
  }

  async findOne(username: string): Promise<UserInterface> {
    return this.userRepository.findByUsername(username);
  }

  async create(createCatDto: any): Promise<User> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<User[]> {
    return this.catModel.find().exec();
  }
}
