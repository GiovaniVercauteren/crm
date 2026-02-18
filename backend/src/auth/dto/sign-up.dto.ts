import { IsEmail, IsStrongPassword, Length } from 'class-validator';
import { IsEqualTo } from 'src/decorators/validation/is-equal-to.decorator';

export class SignUpDto {
  @Length(2, 255, {
    message: 'First name must be between 2 and 255 characters',
  })
  readonly firstName: string;

  @Length(2, 255, { message: 'Last name must be between 2 and 255 characters' })
  readonly lastName: string;

  @IsEmail(undefined, { message: 'Invalid email address' })
  readonly email: string;

  @IsStrongPassword(undefined, { message: 'Password is not strong enough' })
  readonly password: string;

  @IsEqualTo('password', { message: 'Passwords do not match' })
  readonly confirmPassword: string;
}
