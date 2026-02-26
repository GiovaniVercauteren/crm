import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import nodemailer from 'nodemailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailController } from './mail.controller';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'MAIL_TRANSPORTER',
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const transporter = nodemailer.createTransport({
          host: configService.get<string>('MAILER_HOST'),
          port: parseInt(configService.get<string>('MAILER_PORT') || '587', 10),
          secure: false,
          auth: {
            user: configService.get<string>('MAILER_USER'),
            pass: configService.get<string>('MAILER_PASS'),
          },
        });
        if (await transporter.verify()) {
          return transporter;
        } else {
          throw new Error('Failed to verify mail transporter configuration');
        }
      },
    },
    ConfigService,
    MailService,
  ],
  controllers: [MailController],
  exports: [MailService],
})
export class MailModule {}
