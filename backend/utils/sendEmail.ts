import nodeMailer, { SendMailOptions } from "nodemailer"
import { IMailOptions } from "../interface/IMailOptions"
export const sendEmail = async (options: IMailOptions) => {
    const transporter = nodeMailer.createTransport({
        host: process.env.MAIL_HOST!,
        port: Number(process.env.MAIL_PORT!),
        service: process.env.SERVICE,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD
        }
    } as nodeMailer.TransportOptions)

    const mailOptions: SendMailOptions = {
        from: process.env.SMTP_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    }
     await transporter.sendMail(mailOptions)
}