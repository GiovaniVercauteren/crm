import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { Public } from '../decorators/public.decorator';
import { SignUpDto } from './dto/sign-up.dto';
import { AccessToken } from 'src/lib/types';
import { type FastifyReply } from 'fastify';
import { UserEntity } from 'src/users/dto/user.entity';
import { User } from 'src/decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: FastifyReply,
  ): Promise<void> {
    const accessToken: AccessToken = await this.authService.signIn(signInDto);
    // Store accessToken in cookie
    res.setCookie('access_token', accessToken, {
      httpOnly: true,
      secure: false, // Inter-container communication doesn't require secure cookies
      sameSite: 'lax',
      path: '/',
      maxAge: 12 * 60 * 60, // 12 hours in seconds
    });
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
  logout(@Res({ passthrough: true }) res: FastifyReply): void {
    res.clearCookie('access_token');
  }

  @HttpCode(HttpStatus.OK)
  @Get('me')
  getCurrentUser(@User() user: UserEntity): UserEntity {
    return user;
  }
}
