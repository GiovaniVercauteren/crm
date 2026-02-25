import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { RoleLevel } from 'src/decorators/role-level.decorator';

@RoleLevel('admin')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
}
