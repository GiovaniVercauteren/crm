import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { Public } from '../decorators/public.decorator';
import { SignUpDto } from './dto/sign-up.dto';
import { AccessToken } from 'src/lib/types';
import { UserEntity } from 'src/users/dto/user.entity';
import { User } from 'src/decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto): Promise<AccessToken> {
    const accessToken: AccessToken = await this.authService.signIn(signInDto);
    return accessToken;
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async signUp(@Body() signUpDto: SignUpDto): Promise<void> {
    await this.authService.signUp(signUpDto);
  }

  @Public()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('logout')
  logout(): void {}

  @HttpCode(HttpStatus.OK)
  @Get('me')
  getCurrentUser(@User() user: UserEntity): UserEntity {
    return user;
  }
}
