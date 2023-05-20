import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../../../app/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import RegisterDto from './dtos/register.dto';
import * as bcrypt from 'bcryptjs';
import { UserModel } from '../../../app/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userRepository.findByUsername(username);

    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async register(registerDto: RegisterDto) {
    const userModel = await this.userRepository.findByUsername(
      registerDto.username,
    );

    if (userModel) {
      throw new BadRequestException('User existed');
    }

    const hashedPassword = await this.hashPassword(registerDto.password);

    const dataUserCreate: UserModel = {
      username: registerDto.username,
      password: hashedPassword,
    };

    return this.userRepository.create(dataUserCreate);
  }

  async login(username: string, password: string) {
    const userModel = await this.userRepository.findByUsername(username);

    if (!userModel) {
      throw new BadRequestException('User not exists');
    }

    const isMatch = await this.comparePasswords(password, userModel.password);

    if (!isMatch) {
      throw new BadRequestException('Username or password not found');
    }

    const payload = {
      username: username,
      tokenVersion: userModel.tokenVersion,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // Number of salt rounds (affects the hashing time)
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  }

  async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
