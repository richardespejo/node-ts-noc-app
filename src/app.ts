import { Server } from "./presentation/server";


//FUNCION ANONIMA AUTOINVOCADA 
( async() => { 

    main();

})();

function main(){
    Server.start();
}