import { EmailService } from './email/email.service';
import { CheckService } from "../domain/use-cases/check/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { SendEmailLogs } from '../domain/use-cases/logs/send-email-logs';
import { MongoLogDataSource } from '../infrastructure/datasources/mongo-log.datasource';
import { LogSeverityLevel } from '../domain/entities/log.entity';
import { PostgresLogDatasource } from '../infrastructure/datasources/postgres-log.datasource';
import { CheckServiceMultiple } from '../domain/use-cases/check/check-service-multiple';

const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
);

const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDataSource(),
);

const postgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource()
);


const emailService = new EmailService();   


export class Server {


    public static start() {

        console.log(`Server activo`);

        // - ENVIO DE CORREO USANDO CASO DE USO
        // new SendEmailLogs(
        //     emailService,
        //     logRepository
        // ).execute(
        //     ['richard.espejo.keycore@gmail.com','richardespejo@hotmail.es']
        // )

        // ENVIO DE CORREO USANDO EL SERVICIO
        // emailService.sendEmailWithFileSystemLogs(             
        //     ['richard.espejo.keycore@gmail.com','richardespejo@hotmail.es']
        // );

        //const logs = await logRepository.getLogs(LogSeverityLevel.low);
        //console.log(`logs`,logs);
        

        // REALIZANDO CRON JOB QUE REVISA UNA URL CADA 5seg Y GUARDA LOS LOGS
        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'https://google.com';
                //const url = 'http://localhost:3000/posts'; //JSON SERVER

                // new CheckService(
                //     logRepository,
                //     () => console.log('success'),
                //     ( error ) => console.log(error)
                // ).execute( url );
                
                new CheckServiceMultiple(
                    [ fsLogRepository , postgresLogRepository , mongoLogRepository],
                    () => console.log(`${url} is ok`),
                    ( error ) => console.log(error)
                ).execute(url);
            },
        );
        

        
    }
}

