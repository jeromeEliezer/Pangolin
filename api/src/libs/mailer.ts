import { TUser } from '../types/interface';

export interface IMailerService {
    sendMail(user: TUser): Promise<void>
}

class MailerService implements IMailerService {
    private nodemailer;
    constructor(nodemailer: any) {
        this.nodemailer = nodemailer;
    }

    async sendMail(user: TUser) {

        try {
            // Generate test SMTP service account from ethereal.email
            // Only needed if you don't have a real mail account for testing
            let testAccount = await this.nodemailer.createTestAccount();

            // create reusable transporter object using the default SMTP transport
            let transporter = this.nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false,
                tls: true,
                // secure: false, // true for 465, false for other ports
                auth: {
                    user: 'valentine.gerhold76@ethereal.email',
                    pass: 'k5ee9gV8X1znE1xBES'
                    // user: testAccount.user, // generated ethereal user
                    // pass: testAccount.pass, // generated ethereal password
                },
            });

            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: '"Fred Foo 👻" <valentine.gerhold76@ethereal.email>', // sender address
                to: user.email, // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
                html: "<b>Hello world?</b>", // html body
            });
        } catch (err) {
            throw new Error('Unable to send the email verification');
        }
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }
}

export default MailerService;