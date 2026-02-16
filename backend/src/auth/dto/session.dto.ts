import { IsEmail, IsNumber, IsString } from 'class-validator';

export class SessionDto {
  @IsEmail()
  readonly email: string;
  @IsNumber()
  readonly sub: number;
  @IsString()
  readonly name: string;
  @IsNumber()
  readonly iat: number;
  @IsNumber()
  readonly exp: number;
}
