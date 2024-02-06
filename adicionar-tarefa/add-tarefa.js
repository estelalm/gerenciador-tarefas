

const tituloInput = document.getElementById('titulo')
const conclusaoInput = document.getElementById('dataConclusao')

const botaoAdicionar = document.getElementById('adicionar')

// let usuarioId = localStorage.getItem('idUsuario')

const adicionarTarefa = () =>{

    let tituloTarefa = tituloInput.value
    let conclusaoTarefa = conclusaoInput.value

    if(tituloTarefa == "" || conclusaoTarefa == ""){
        alert('Preencha todos os campos!')
    }else{
        alert('Tarefa Criada Com sucesso')
        let tarefaJSON = {
            "descrição": tituloTarefa,
            "dataConclusão": conclusaoTarefa,
            "idUsuario": 2
        }
    }
}

botaoAdicionar.addEventListener('click', adicionarTarefa)