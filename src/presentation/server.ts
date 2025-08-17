import { CheckService } from "../domain/use-cases/check/check-service";
import { CronService } from "./cron/cron-service";

export class Server {


    public static start() {

        console.log(`Server activo`);

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const date = new Date();

                new CheckService(
                    () => console.log('success'),
                    ( error ) => console.log(error)
                ).execute( 'https://google.com');
                //new CheckService().execute( 'http://localhost:3000/posts');
            },
        );

        
    }
}

