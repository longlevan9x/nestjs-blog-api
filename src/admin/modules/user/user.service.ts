import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../app/repositories/user.repository';
import { UserModel } from '../../../app/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  private readonly users: UserModel[] = [];

  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserModel>,
    private readonly userRepository: UserRepository,
  ) {}

  getHello(): string {
    return '  ád  ád !';
  }

  createUser(user: UserModel): UserModel {
    this.users.push(user);
    return user;
  }

  async getAllUsers(): Promise<UserModel[]> {
    return this.userRepository.get();
  }

  async findOne(username: string): Promise<UserModel> {
    return this.userRepository.findByUsername(username);
  }

  async create(createCatDto: any): Promise<UserModel> {
    const createdCat = new this.userModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<UserModel[]> {
    return this.userModel.find().exec();
  }
}
