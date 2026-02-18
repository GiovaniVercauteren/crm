import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInDto {
  @IsEmail(undefined, { message: 'Invalid email address' })
  readonly email: string;

  @IsNotEmpty({ message: 'Password is required' })
  readonly password: string;
}
