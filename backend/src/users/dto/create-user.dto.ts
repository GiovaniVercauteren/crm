import { Role } from 'src/lib/types';

export class CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: Role = 'user';
  isBlocked?: boolean = false;
}
