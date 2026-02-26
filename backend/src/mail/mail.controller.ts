import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { SendMailDto } from './dto/send-mail.dto';
import { SendTemplatedMailDto } from './dto/send-templated-mail.dto';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  async sendMail(@Body() sendMailDto: SendMailDto): Promise<void> {
    const { to, subject, text, html } = sendMailDto;
    await this.mailService.sendMail(to, subject, text, html);
  }

  @Post('send-templated')
  async sendTemplatedMail(
    @Body() sendTemplatedMailDto: SendTemplatedMailDto,
  ): Promise<void> {
    const { to, subject, templateName, context } = sendTemplatedMailDto;
    await this.mailService.sendTemplatedMail(
      to,
      subject,
      templateName,
      context,
    );
  }
}
