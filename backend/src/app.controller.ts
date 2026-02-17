import { Body, Controller, Get } from '@nestjs/common';
import { User } from './decorators/user.decorator';
import { UserEntity } from './users/dto/user.entity';

@Controller()
export class AppController {
  constructor() {}

  @Get('user')
  getCurrentUser(@User() user: UserEntity): UserEntity {
    return user;
  }
}
