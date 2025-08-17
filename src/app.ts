import 'dotenv/config';
import { Server } from "./presentation/server";
import { envs } from './plugins/envs.plugins';


//FUNCION ANONIMA AUTOINVOCADA 
( async() => { 

    main();

})();

function main(){
    Server.start();
    //console.log(envs);
}