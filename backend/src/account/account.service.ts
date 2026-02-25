import { Injectable, NotFoundException } from '@nestjs/common';
import { databaseSchema } from 'src/database/database-schema';
import { UsersService } from 'src/users/users.service';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { UserEntity } from 'src/users/dto/user.entity';

export type User = typeof databaseSchema.users.$inferSelect;

@Injectable()
export class AccountService {
  constructor(private readonly usersService: UsersService) {}

  async getAccount(userId: number): Promise<UserEntity> {
    const user = await this.usersService.findOneById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return UserEntity.fromUser(user);
  }

  async updateAccount(
    userId: number,
    data: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.usersService.updateUser(userId, data);
    return UserEntity.fromUser(user);
  }
}
