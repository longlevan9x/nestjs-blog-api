import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export default class RegisterDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
