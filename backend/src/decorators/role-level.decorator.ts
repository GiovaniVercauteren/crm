import { Reflector } from '@nestjs/core';
import { Role } from 'src/lib/types';

export const RoleLevel = Reflector.createDecorator<Role>();
