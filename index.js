require('dotenv').config();

const {leerInput, inquirerMenu, pause, listarLugares}= require('./helpers/inquire')
const Busquedas = require('./models/busquedas')


const main = async() =>{

        const busquedas = new Busquedas();
        let opt;

        do {
                opt= await inquirerMenu();
                
                 switch (opt) {
                        case '1':

                        const lugar = await leerInput('Ciudad: ');

                        const lugares = await busquedas.ciudad(lugar)
                        const id = await listarLugares(lugares)
                        
                        if (id==='0') {
                                continue
                        }
                        
                        
                        const lugarSel = lugares.find(lugar=>lugar.id===id)
                        busquedas.agregarHistorial(lugarSel.nombre)

            

                        const clima = await  busquedas.climaLugar(lugarSel.lat,lugarSel.lng)
                                
                        console.clear();
                        console.log('  \n  Información de la ciudad\n'.green);
                        console.log('  Ciudad:', lugarSel.nombre.green );
                        console.log('  Lat:', lugarSel.lat );
                        console.log('  Lng:', lugarSel.lng );
                        console.log('  Temperatura:', clima.temp );
                        console.log('  Mínima:', clima.min );
                        console.log('  Máxima:', clima.max );
                        console.log('  Cómo está el clima:',  clima.desc.green );
                        console.log(' ');
                        break;
                
                        case '2':
                                busquedas.historialCapitalizado.forEach((lugar,i) =>{
                                        const idx = `${i+1}`
                                        console.log(`${idx} ${lugar}`)
                                })
                                break;
                }
                await pause();
                
        } while (opt !=0);





        
}


main();