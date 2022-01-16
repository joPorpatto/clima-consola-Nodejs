const inquirer = require("inquirer");
require("colors");


const questions = [
        {
                type: "list",
                name: "opt",
                message: "Que desea hacer",
                choices: [
                        {
                                value: '1',
                                name: '1. Buscar Ciudad'
                        },
                        {
                                value: '2',
                                name: '2. Historial'
                        },
                        {
                                value: '0',
                                name: '0. Salir'
                        },
                        
                        
                        

                ]
        }
]

const inquirerMenu = async() =>{

        console.clear()
        console.log("============".green)
        console.log("seleccione opción".green)
        console.log("============\n".green)
        const {opt} = await inquirer.prompt(questions)
        
        return opt;
        
}

const pause = async()=>{
        const question = [
                {
                        type: "input",
                        name: "enter",
                        message: `presione ${'enter'.green} para continuar`
                }
        ]
        await inquirer.prompt(question)
}

const leerInput = async(message)=>{
        const question = [
                {
                        type: 'input',
                        name: 'desc',
                        message,
                        validate(value){
                                if (value.length===0) {
                                        return "porr favor ingresar un valor"
                                }
                                return true
                        }
                }
        ];
        const {desc} = await inquirer.prompt(question);
        return desc;
}
const listarLugares = async(lugares=[]) =>{
        const choices = lugares.map( (lugar,i) =>{

                const idx = i+1
                return{
                        value: lugar.id,
                        name: `${idx} ${lugar.nombre}`

                }
        });
        choices.unshift({
                value:"0",
                name: "0".green + "cancelar"
        })

        const preguntas = [
                {
                        type: "list",
                        name: 'id',
                        message: "Seleccione lugar: ",
                        choices
                }
        ]
        const {id} = await inquirer.prompt(preguntas)
        return id

        
}



const mostrarlistadoChecklist = async(tareas=[]) =>{
        const choices = tareas.map( (tarea,i) =>{

                const idx = i+1

                return{
                        value: tarea.id,
                        name: `${idx} ${tarea.desc}`,
                        checked:(tarea.completadoEn)?true:false

                }
        });
        
        const pregunta = [
                {
                        type: "checkbox",
                        name: 'ids',
                        message: "selecciones",
                        choices
                }
        ]
        const {ids} = await inquirer.prompt(pregunta)
        return ids;

        
}

const confirmar = async(message) => {
        const question = [
                {
                        type: "confirm",
                        name: 'ok',
                        message
                }
        ];

        const {ok} = await inquirer.prompt(question);
        return ok;

}



module.exports = {
        inquirerMenu  ,pause    , leerInput , listarLugares,confirmar,mostrarlistadoChecklist,

}