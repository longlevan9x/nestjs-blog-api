import { Controller, Get, Request } from '@nestjs/common';

@Controller('admin/profile')
export class ProfileController {
  @Get()
  getProfile(@Request() req) {
    return req.user;
  }
}
