import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { verifyPassword } from 'src/lib/password.util';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { AccessToken, JwtCustomPayload } from 'src/lib/types';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<AccessToken> {
    const { email, password } = signInDto;
    const user = await this.userService.findOneByEmail(email);
    if (!user || !(await verifyPassword(user.password, password, user.salt))) {
      throw new BadRequestException('Invalid email or password');
    }
    if (user.isBlocked) {
      throw new UnauthorizedException('Account is blocked');
    }

    const payload: JwtCustomPayload = {
      email: user.email,
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    };

    return await this.jwtService.signAsync<JwtCustomPayload>(payload);
  }

  async signUp(signUpDto: SignUpDto): Promise<void> {
    if (signUpDto.password !== signUpDto.confirmPassword) {
      throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST);
    }

    const createUserDto: CreateUserDto = {
      firstName: signUpDto.firstName,
      lastName: signUpDto.lastName,
      email: signUpDto.email,
      password: signUpDto.password,
    };

    await this.userService.createUser(createUserDto);
  }
}
