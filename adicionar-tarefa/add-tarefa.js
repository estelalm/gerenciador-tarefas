

const tituloInput = document.getElementById('titulo')
const conclusaoInput = document.getElementById('dataConclusao')
const selectPrivado = document.getElementById('privado')
const selectPublico = document.getElementById('publico')
console.log(selectPrivado)
const botaoAdicionar = document.getElementById('adicionar')

let usuarioId = localStorage.getItem('usuarioId')

async function getTarefas() {
    const responseApi = await fetch('http://localhost:5080/tarefas')
    const listaTarefas = responseApi.json();

    return listaTarefas
}


const adicionarTarefa = () =>{

    let tituloTarefa = tituloInput.value
    let conclusaoTarefa = conclusaoInput.value.split('-').reverse().join('/')


    if(tituloTarefa == "" || conclusaoTarefa == ""){
        alert('Preencha todos os campos!')
    }else{
        if(!selectPrivado.checked && !selectPublico.checked)
        alert('Preencha todos os campos!')
        else{
            let ePublico
        if(selectPrivado.checked)
        ePublico = false
        else if(selectPublico.checked)
        ePublico = true
        

        alert('Tarefa Criada Com sucesso')
    


    console.log(ePublico)
        let tarefaJSON = {
        }

let idTarefa
let tarefas = getTarefas().then(tarefasArray =>{
    idTarefa = tarefasArray.length ++
})

tarefaJSON = {
    "id": idTarefa,
    "descricao": tituloTarefa,
    "dataConclusão": conclusaoTarefa,
    "publico": ePublico,
    "idUsuario": usuarioId,
    "comentarios": []
}

         fetch('http://localhost:5080/tarefas' , {
            method: 'POST', 
            headers:{
            'content-type': 'application/json',
            }, 
            body: JSON.stringify(tarefaJSON)
            })
            
        window.location.reload()
        }
    }
}

botaoAdicionar.addEventListener('click', adicionarTarefa)