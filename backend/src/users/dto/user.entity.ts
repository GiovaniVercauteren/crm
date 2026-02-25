import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNumber, Length } from 'class-validator';
import { type Role, ROLE_VALUES } from 'src/lib/types';
import { User } from '../users.service';

export class UserEntity {
  @IsNumber()
  id: number;
  @IsEmail()
  email: string;
  @Length(2, 255)
  firstName: string;
  @Length(2, 255)
  lastName: string;
  @ApiProperty({ enum: ROLE_VALUES, enumName: 'Role' })
  role: Role;
  @IsBoolean()
  isVerified: boolean;
  @IsBoolean()
  isBlocked: boolean;

  static fromUser(user: User): UserEntity {
    const entity = new UserEntity();
    entity.id = user.id;
    entity.email = user.email;
    entity.firstName = user.firstName;
    entity.lastName = user.lastName;
    entity.role = user.role;
    entity.isVerified = user.isVerified;
    entity.isBlocked = user.isBlocked;
    return entity;
  }
}
