import nodemailer from 'nodemailer';
import { envs } from '../../plugins/envs.plugins';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlbody: string;
    attachments?: Attachment[];
}

interface Attachment {
    filename: string,
    path: string
}


export class EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });

    constructor(
    ){
    }


    async sendEmail( options : SendMailOptions ): Promise<boolean> {
        const { to, subject, htmlbody, attachments = []} = options;

        try {
            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html : htmlbody,
                attachments : attachments
            });

            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: 'email sent',
                origin: 'email.service.ts'
            });

            return true;

        } catch (error) {

            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: 'email not sent',
                origin: 'email.service.ts'
            });
            console.log(`sentInformationError: `,error);
            return false;
            
        }

    }

    
    sendEmailWithFileSystemLogs( to : string | string[] ) {

        const subject = 'Logs del Servidor';
        const htmlbody = `
            <h3>Logs del Sistema - NOC</h3>
            <p>prueba de documento lorem ipsum</p>
            <p>Ver logs adjuntos</p>
        `;

        const attachments : Attachment[] = [
            { filename: 'logs-low.log' , path: './logs/logs-low.log' },
            { filename: 'logs-high.log' , path: './logs/logs-high.log' },
            { filename: 'logs-medium.log' , path: './logs/logs-medium.log'}
        ];

        return this.sendEmail({
            to , subject , htmlbody , attachments
        });
    }

}