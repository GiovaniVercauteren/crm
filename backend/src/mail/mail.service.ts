import { HttpException, Inject, Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import path from 'path';
import { readFile } from 'fs/promises';
import Handlebars from 'handlebars';

@Injectable()
export class MailService {
  constructor(
    @Inject('MAIL_TRANSPORTER')
    private readonly transporter: nodemailer.Transporter,
  ) {}

  async sendMail(
    to: string,
    subject: string,
    text: string,
    html?: string,
  ): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: '"Oasezorg" <noreply@vercauteren.io>',
        to,
        subject,
        text,
        html,
      });
    } catch (error) {
      console.error('Error sending email:', error);
      throw new HttpException('Error sending email', 500);
    }
  }

  async sendTemplatedMail(
    to: string,
    subject: string,
    templateName: string,
    context: Record<string, any>,
  ): Promise<void> {
    try {
      const template = await loadTemplate(templateName);
      const html = template(context);
      await this.sendMail(to, subject, '', html);
    } catch (error) {
      console.error('Error sending templated email:', error);
      throw new HttpException('Error sending templated email', 500);
    }
  }
}

async function loadTemplate(templateName: string) {
  const templatePath = path.join(__dirname, 'templates', `${templateName}.hbs`);
  const source = await readFile(templatePath, 'utf-8');
  return Handlebars.compile(source);
}
