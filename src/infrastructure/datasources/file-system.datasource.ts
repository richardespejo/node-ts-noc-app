import fs from 'fs';
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


export class FileSystemDatasource implements LogDatasource{

    private readonly logPath = 'logs/';
    private readonly allLogPath = 'logs/logs-low.log';
    private readonly mediumLogPath = 'logs/logs-medium.log';
    private readonly highLogPath = 'logs/logs-high.log';

    constructor(){

        this.createLogsFiles();
    }

    private createLogsFiles = () => {
        if( !fs.existsSync( this.logPath )){
            fs.mkdirSync( this.logPath );
        }

        //METODO NUEVO Y DINAMICO DE CREAR LOS PATH
        [
            this.allLogPath,
            this.mediumLogPath,
            this.highLogPath
        ].forEach( path => {
            if( fs.existsSync( path ) ) return;
            fs.writeFileSync( path, '' );
        })

        /* METODO VIEJO DE CREAR LOS PATH
        if( fs.existsSync( this.logPath )) return;
            fs.writeFileSync( this.allLogPath, '' );
        if( fs.existsSync( this.mediumLogPath )) return;
            fs.writeFileSync( this.mediumLogPath, '' );
        if( fs.existsSync( this.highLogPath )) return;
            fs.writeFileSync( this.highLogPath, '' );
        */

    }

    async saveLog( newLog: LogEntity): Promise<void> {

        const logAsJson = `${ JSON.stringify(newLog) }\n`;

        fs.appendFileSync( this.allLogPath , logAsJson);

        if( newLog.level === LogSeverityLevel.low ) return;

        if( newLog.level === LogSeverityLevel.medium ){
            fs.appendFileSync( this.mediumLogPath, logAsJson );
        }else{
            fs.appendFileSync( this.highLogPath, logAsJson );
        }

    }


    private getLogsFromFile = ( path : string ) : LogEntity[] => {

        const content = fs.readFileSync( path , 'utf-8');
        const logs = content.split('\n').map( log => LogEntity.fromJson(log) );

        return logs;
    }


    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

        switch (severityLevel) {
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.allLogPath);

            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogPath);

            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.highLogPath);
        
        }
    }
        
}