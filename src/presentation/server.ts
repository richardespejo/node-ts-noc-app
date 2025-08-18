import { EmailService } from './email/email.service';
import { CheckService } from "../domain/use-cases/check/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { SendEmailLogs } from '../domain/use-cases/logs/send-email-logs';

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
);

const emailService = new EmailService();   


export class Server {


    public static start() {

        console.log(`Server activo`);

        // - ENVIO DE CORREO USANDO CASO DE USO
        new SendEmailLogs(
            emailService,
            fileSystemLogRepository
        ).execute(
            ['richard.espejo.keycore@gmail.com','richardespejo@hotmail.es']
        )

        /*. -  ENVIO DE CORREO USANDO EL SERVICIO
        emailService.sendEmailWithFileSystemLogs(             
            ['richard.espejo.keycore@gmail.com','richardespejo@hotmail.es']
        );
        */

        // REALIZANDO CRON JOB QUE REVISA UNA URL CADA 5seg Y GUARDA LOS LOGS
        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'https://google.com';
        //         //const url = 'http://localhost:3000/posts';

        //         new CheckService(
        //             fileSystemLogRepository,
        //             () => console.log('success'),
        //             ( error ) => console.log(error)
        //         ).execute( url );
        //     },
        // );
        

        
    }
}

