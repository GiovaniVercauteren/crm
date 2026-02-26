import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInDto {
  @IsEmail(undefined, { message: 'Invalid email address' })
  @Transform(({ value }: { value: string }) => value.trim().toLowerCase())
  readonly email: string;

  @IsNotEmpty({ message: 'Password is required' })
  readonly password: string;
}
