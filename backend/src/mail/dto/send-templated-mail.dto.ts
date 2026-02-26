export class SendTemplatedMailDto {
  to: string;
  subject: string;
  templateName: string;
  context: Record<string, any>;
}
