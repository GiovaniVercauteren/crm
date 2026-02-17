import { UserEntity } from 'src/users/dto/user.entity';

declare module 'fastify' {
  interface FastifyRequest {
    user?: UserEntity;
  }
}

export interface JwtCustomPayload {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
}

export interface JwtStandardPayload {
  iat: number;
  exp: number;
}

export type JwtFullPayload = JwtCustomPayload & JwtStandardPayload;

export type AccessToken = string;

const Role = {
  Admin: 'admin',
  User: 'user',
} as const;

export type Role = (typeof Role)[keyof typeof Role];

export const RoleLevels: Record<Role, number> = {
  [Role.Admin]: 2,
  [Role.User]: 1,
};
