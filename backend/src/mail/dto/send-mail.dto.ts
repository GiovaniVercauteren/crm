import { IsOptional, IsString } from 'class-validator';

export class SendMailDto {
  @IsString()
  to: string;
  @IsString()
  subject: string;
  @IsString()
  text: string;
  @IsString()
  @IsOptional()
  html?: string;
}
