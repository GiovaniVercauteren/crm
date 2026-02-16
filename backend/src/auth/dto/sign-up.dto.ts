import { IsEmail, IsStrongPassword, Length } from 'class-validator';

export class SignUpDto {
  @Length(2, 255)
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsStrongPassword()
  readonly password: string;

  @IsStrongPassword()
  readonly confirmPassword: string;
}
