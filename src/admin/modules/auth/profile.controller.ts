import { Controller, Get, Request } from '@nestjs/common';

@Controller('profile')
export class ProfileController {
  @Get()
  getProfile(@Request() req) {
    return req.user;
  }
}
