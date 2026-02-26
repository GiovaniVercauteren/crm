import { randomBytes, createHash } from 'node:crypto';
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
import { DrizzleService } from 'src/database/drizzle.service';
import { databaseSchema } from 'src/database/database-schema';
import { eq } from 'drizzle-orm/sql/expressions/conditions';
import { and } from 'drizzle-orm';
import { MailService } from 'src/mail/mail.service';

const VERIFICATION_TOKEN_EXPIRATION_HOURS = 24;
const VERIFICATION_HASH_METHOD = 'sha256';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly drizzleService: DrizzleService,
    private readonly mailService: MailService,
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
      isVerified: user.isVerified,
      isBlocked: user.isBlocked,
    };

    return await this.jwtService.signAsync<JwtCustomPayload>(payload);
  }

  async updateToken(userId: number): Promise<AccessToken> {
    const user = await this.userService.findOneById(userId);
    if (!user) {
      throw new BadRequestException('User not found');
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
      isVerified: user.isVerified,
      isBlocked: user.isBlocked,
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

  async generateVerificationString(
    userId: number,
    email: string,
  ): Promise<{ rawToken: string; hashedToken: string }> {
    const rawToken = randomBytes(32).toString('base64url');
    const hashedToken = createHash(VERIFICATION_HASH_METHOD)
      .update(rawToken)
      .digest('hex');

    // remove existing tokens for the user
    await this.drizzleService.db
      .delete(databaseSchema.userVerificationTokens)
      .where(eq(databaseSchema.userVerificationTokens.userId, userId));

    await this.drizzleService.db
      .insert(databaseSchema.userVerificationTokens)
      .values({
        userId,
        email,
        token: hashedToken,
      });
    return { rawToken, hashedToken };
  }

  async verifyUser(
    id: number,
    email: string,
    uniqueString: string,
  ): Promise<boolean> {
    const hashedToken = createHash(VERIFICATION_HASH_METHOD)
      .update(uniqueString)
      .digest('hex');
    // Find the verification record for the user
    const record = await this.drizzleService.db
      .select()
      .from(databaseSchema.userVerificationTokens)
      .where(
        and(
          eq(databaseSchema.userVerificationTokens.userId, id),
          eq(databaseSchema.userVerificationTokens.email, email),
          eq(databaseSchema.userVerificationTokens.token, hashedToken),
        ),
      )
      .limit(1)
      .then((rows) => rows.at(0));

    // If a record is found, mark the user as verified and delete the verification record
    if (record) {
      // Check if the token has expired
      const tokenAgeHours =
        (Date.now() - record.createdAt.getTime()) / (1000 * 60 * 60);
      if (tokenAgeHours > VERIFICATION_TOKEN_EXPIRATION_HOURS) {
        await this.drizzleService.db
          .delete(databaseSchema.userVerificationTokens)
          .where(eq(databaseSchema.userVerificationTokens.id, record.id));
        throw new HttpException(
          'Verification token has expired',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (await this.userService.markUserEmailAsVerified(id, email)) {
        await this.drizzleService.db
          .delete(databaseSchema.userVerificationTokens)
          .where(eq(databaseSchema.userVerificationTokens.id, record.id));

        // If the user was successfully marked as verified, return true
        return true;
      }
    }

    // If no record is found or the user could not be marked as verified, return false
    return false;
  }

  async sendVerificationEmail(user: {
    id: number;
    email: string;
  }): Promise<boolean> {
    const { rawToken } = await this.generateVerificationString(
      user.id,
      user.email,
    );

    const verificationLink = `${process.env.FRONTEND_BASE_URL}/verify?userId=${user.id}&email=${encodeURIComponent(user.email)}&token=${rawToken}`;

    await this.mailService.sendTemplatedMail(
      user.email,
      'Verify your email address',
      'email-verification',
      { verificationLink },
    );
    return true;
  }
}
