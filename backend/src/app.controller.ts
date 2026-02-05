import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './users/user.service';
import type { UserModel } from 'generated/prisma/models';
import { CreateUserDto } from './users/CreateUserDto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('user')
  async signupUser(@Body() userData: CreateUserDto): Promise<UserModel> {
    return this.usersService.createUser(userData);
  }

  @Get('users')
  async getAllUsers(): Promise<UserModel[]> {
    return this.usersService.users({});
  }
}
