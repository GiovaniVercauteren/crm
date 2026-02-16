import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Session,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { Public } from './decorators/public.decorator';
import { AuthGuard } from './auth.guard';
import { SignUpDto } from './dto/sign-up.dto';
import * as secureSession from '@fastify/secure-session';
import { SessionDto } from './dto/session.dto';
import { PermissionsDto } from './dto/permissions.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() signInDto: SignInDto,
    @Session() session: secureSession.Session,
  ): Promise<void> {
    const loginResponse = await this.authService.login(signInDto);

    session.set('access_token', loginResponse.access_token); // Store token in session
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signup(@Body() signUpDto: SignUpDto): Promise<void> {
    await this.authService.signup(signUpDto);
  }

  @Public()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('logout')
  logout(@Session() session: secureSession.Session): void {
    session.delete(); // Clear the session
  }

  @UseGuards(AuthGuard)
  @Get('session')
  session(@Session() session: secureSession.Session): SessionDto {
    const user = session.get('user');

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  @UseGuards(AuthGuard)
  @Get('permissions')
  async permissions(
    @Session() session: secureSession.Session,
  ): Promise<PermissionsDto> {
    const user = session.get('user');

    if (!user) {
      throw new UnauthorizedException();
    }

    const { sub } = user;
    const permissions = await this.authService.getPermissions(sub);

    return {
      bundles: permissions?.bundles || [],
      permissions: permissions?.permissions || [],
    };
  }
}
