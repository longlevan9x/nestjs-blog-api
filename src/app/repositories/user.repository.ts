import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from '../schemas/user.schema';

export class UserRepository {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserModel>,
  ) {}

  async findByUsername(username: string): Promise<UserModel> {
    return this.userModel.findOne({ username });
  }

  async get(): Promise<UserModel[]> {
    return this.userModel.find();
  }

  async create(user: UserModel): Promise<UserModel> {
    return this.userModel.create(user);
  }
}
