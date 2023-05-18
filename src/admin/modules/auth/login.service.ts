import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { UserInterface } from '../user/user.interface';

@Injectable()
export class LoginService {
  constructor(private userRepository: UserRepository) {}

  async login(
    username: string,
    password: string,
  ): Promise<{ error?: string; message?: string; data?: UserInterface }> {
    const user = await this.userRepository.findByUsername(username);

    if (!user || user.password !== password) {
      return { error: 'Invalid username or password' };
    }

    return { message: 'Login successful', data: user };
  }
}
