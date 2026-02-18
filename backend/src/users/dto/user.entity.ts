import { ApiProperty } from '@nestjs/swagger';
import { type Role, ROLE_VALUES } from 'src/lib/types';

export class UserEntity {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  @ApiProperty({ enum: ROLE_VALUES, enumName: 'Role' })
  role: Role;
}
