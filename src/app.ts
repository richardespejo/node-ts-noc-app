import 'dotenv/config';
import { Server } from "./presentation/server";
import { envs } from './plugins/envs.plugins';
import { LogModel, MongoDB } from './data/mongo';
import { PrismaClient } from '@prisma/client';


//FUNCION ANONIMA AUTOINVOCADA 
( async() => { 

    main();

})();

async function main(){

    //CONEXION A POSTGRES A TRAVES DE PRISMA /prisma/schema.prisma
    //const prisma = new PrismaClient();
    //CREAR REGISTRO EN POSTGRES
    // const newLog = await prisma.logModel.create({
    //     data: {
    //         level: 'HIGH',
    //         message: 'Mensaje de richard espejo ',
    //         origin: 'App.ts'
    //     }
    // });
    // console.log({newLog});


    //CONSULTAR REGISTRO EN POSTGRES
    // const logs = await prisma.logModel.findMany({
    //     where: {
    //         level: 'HIGH'
    //     }
    // });
    // console.log(logs);


    //CONEXION A LA INSTANCIA DE MONGO
    // await MongoDB.connect({
    //     mongoUrl: envs.MONGO_URL,
    //     dbName: envs.MONGO_DB_NAME
    // });

    //CREAR REGISTRO/COLLECTION EN MONGO 
    // const newLog = await LogModel.create({
    //     message: 'Test message desde mongo 4',
    //     origin: 'App.ts',
    //     level: 'low',
    // });

    // await newLog.save();

    //BUSCAR REGISTRO/COLLECTION EN MONGO
    // const logs = await LogModel.find();
    // console.log(`logs`,logs);

    Server.start();
}