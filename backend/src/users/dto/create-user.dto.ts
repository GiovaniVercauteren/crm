import { IsBoolean, IsEmail, IsStrongPassword } from 'class-validator';
import { Length } from 'class-validator/types/decorator/string/Length';
import { Role } from 'src/lib/types';

export class CreateUserDto {
  @Length(2, 255, {
    message: 'First name must be between 2 and 255 characters',
  })
  firstName: string;

  @Length(2, 255, { message: 'Last name must be between 2 and 255 characters' })
  lastName: string;

  @IsEmail(undefined, { message: 'Invalid email address' })
  email: string;

  @IsStrongPassword(undefined, { message: 'Password is not strong enough' })
  password: string;

  role?: Role = 'user';

  @IsBoolean()
  isBlocked?: boolean = false;
}
