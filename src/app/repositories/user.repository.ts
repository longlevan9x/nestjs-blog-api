import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from '../schemas/user.schema';

export class UserRepository {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserModel>,
  ) {}

  findByUsername(username: string): Promise<UserModel> {
    return this.userModel.findOne({ username });
  }

  get(): Promise<UserModel[]> {
    return this.userModel.find();
  }

  create(user: UserModel): Promise<UserModel> {
    return this.userModel.create(user);
  }

  updateUserLogout(username: string) {
    return this.userModel.updateOne(
      { username: username },
      { $inc: { tokenVersion: 1 } },
    );
  }
}
