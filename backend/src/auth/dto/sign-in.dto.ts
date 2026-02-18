import { IsEmail, IsStrongPassword } from 'class-validator';

export class SignInDto {
  @IsEmail(undefined, { message: 'Invalid email address' })
  readonly email: string;

  @IsStrongPassword(undefined, { message: 'Password is not strong enough' })
  readonly password: string;
}
