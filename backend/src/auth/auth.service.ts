import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import {
  generateSalt,
  hashPassword,
  verifyPassword,
} from 'src/lib/password.util';
import { SignUpDto } from './dto/sign-up.dto';
import { databaseSchema } from 'src/database/database-schema';
import { DrizzleService } from 'src/database/drizzle.service';
import { SignInDto } from './dto/sign-in.dto';
import { eq } from 'drizzle-orm';

export type JwtPayload = {
  email: string;
  sub: number;
  name: string;
};

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private readonly drizzleService: DrizzleService,
  ) {}

  async login(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const user = await this.userService.findOneByEmail(email);
    if (!user || !(await verifyPassword(user.password, password, user.salt))) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const payload: JwtPayload = {
      email: user.email,
      sub: user.id,
      name: user.name,
    };
    return {
      access_token: await this.jwtService.signAsync<JwtPayload>(payload),
    };
  }

  async signup(signUpDto: SignUpDto) {
    const existingUser = await this.userService.findOneByEmail(signUpDto.email);
    if (existingUser) {
      throw new HttpException('Email already in use', 400);
    }
    if (signUpDto.password !== signUpDto.confirmPassword) {
      throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST);
    }

    const salt = generateSalt();
    const hashedPassword = await hashPassword(signUpDto.password, salt);

    const [newUser] = await this.drizzleService.db
      .insert(databaseSchema.users)
      .values({
        name: signUpDto.name,
        email: signUpDto.email,
        password: hashedPassword,
        salt,
      })
      .returning();
    return newUser;
  }

  async getPermissions(userId: number) {
    return await this.drizzleService.db
      .select()
      .from(databaseSchema.userPermissions)
      .where(eq(databaseSchema.userPermissions.userId, userId))
      .limit(1)
      .then((rows) => rows.at(0));
  }
}
