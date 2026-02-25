import { Body, Controller, Patch } from '@nestjs/common';
import { AccountService } from './account.service';
import { User } from 'src/decorators/user.decorator';
import { UserEntity } from 'src/users/dto/user.entity';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Patch()
  async updateAccount(
    @User() user: UserEntity,
    @Body() data: UpdateUserDto,
  ): Promise<UserEntity> {
    return await this.accountService.updateAccount(user.id, data);
  }
}
