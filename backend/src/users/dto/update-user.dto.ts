import { Length } from 'class-validator';

export class UpdateUserDto {
  @Length(2, 255)
  firstName?: string;
  @Length(2, 255)
  lastName?: string;
}
