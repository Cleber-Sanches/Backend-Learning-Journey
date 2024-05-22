
import nodemailer from "nodemailer";
import { IMailProvider, IMessage } from "../IMailProviders";
import Mail from "nodemailer/lib/mailer";


export class MailtrapMailProvider implements IMailProvider {
  private transporter: Mail

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "4e7c439ed1e85c",
        pass: "7c6e06c63b4c2a"
      }
    })

  }
  async sendMail(message: IMessage): Promise<void> {
    await this.transporter.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email
      },
      from: {
        name: message.from.name,
        address: message.from.email
      },
      subject: message.subject,
      html: message.body
    })
  }
}