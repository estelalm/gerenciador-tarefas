

const tituloInput = document.getElementById('titulo')
const conclusaoInput = document.getElementById('dataConclusao')


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
        alert('Tarefa Criada Com sucesso')

       

        let tarefaJSON = {
            "descrição": tituloTarefa,
            "dataConclusão": conclusaoTarefa,
            "idUsuario": usuarioId
        }
        let idTarefa
let tarefas = getTarefas().then(tarefasArray =>{
    tarefaJSON.id = tarefasArray.length ++
})

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

botaoAdicionar.addEventListener('click', adicionarTarefa)