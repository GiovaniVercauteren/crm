import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FastifyRequest } from 'fastify';
import { JwtService } from '@nestjs/jwt';
import { JwtFullPayload, RoleLevels } from 'src/lib/types';
import { Public } from '../decorators/public.decorator';
import { RoleLevel } from '../decorators/role-level.decorator';
import { ConfigService } from '@nestjs/config/dist/config.service';

@Injectable()
export class AuthGuard implements CanActivate {
  // cache the secret to avoid multiple calls to config service
  private readonly jwtSecret: string;

  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.jwtSecret = this.configService.getOrThrow<string>('JWT_SECRET');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride(Public, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const role = this.reflector.getAllAndOverride(RoleLevel, [
      context.getHandler(),
      context.getClass(),
    ]);
    const roleLevel = RoleLevels[role];

    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const token = this.extractTokenFromCookies(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync<JwtFullPayload>(token, {
        secret: this.jwtSecret,
      });

      if (roleLevel) {
        const userRoleLevel = RoleLevels[payload.role];
        if (userRoleLevel < roleLevel) {
          throw new UnauthorizedException('Insufficient permissions');
        }
      }
      // Attach user info to request for later use
      request.user = {
        id: payload.id,
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        role: payload.role,
      };
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromCookies(request: FastifyRequest): string | undefined {
    return request.cookies.access_token;
  }
}
