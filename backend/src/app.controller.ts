import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './users/user.service';
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

  @Get('users')
  getUsers() {
    return this.usersService.getAllUsers();
  }

  @Post('users')
  createUser(@Body() body: CreateUserDto) {
    const { name, email } = body;
    return this.usersService.createUser(name, email);
  }
}
