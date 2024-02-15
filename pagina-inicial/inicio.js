'use strict'

let usuarioId = localStorage.getItem('usuarioId')

async function getTarefas() {
    const responseApi = await fetch('http://localhost:5080/tarefas')
    const listaTarefas = responseApi.json();

    return listaTarefas
}
async function getUsuarios() {
    const responseApi = await fetch('http://localhost:5080/usuario')
    const listaUsuarios = responseApi.json();

    return listaUsuarios
}


const criarTarefa = (tarefas, tarefa) =>{

    const containerDeTarefas = document.getElementById('tarefas')
    const containerTarefaDeHoje = document.getElementById('tarefas-hoje')

    const containerTarefa = document.createElement('div')
    containerTarefa.classList.add('tarefa')

    const botaoEditarSalvar = document.createElement('button')
    botaoEditarSalvar.classList.add('icone-e-cor')

    const infoTarefa = document.createElement('div')
    infoTarefa.classList.add('info-tarefa')

    const tituloTarefa = document.createElement('span')
    tituloTarefa.textContent = tarefa.descrição
    tituloTarefa.classList.add('titulo-tarefa')
    
    const dataConclusao = document.createElement('span')
    dataConclusao.textContent = tarefa.dataConclusão
    dataConclusao.classList.add('data-tarefa')

    const deletarTarefa = document.createElement('button')
    deletarTarefa.style.backgroundImage = '../img/delete.svg'
    deletarTarefa.classList.add('deletar-tarefa')

    infoTarefa.replaceChildren(tituloTarefa, dataConclusao)
    containerTarefa.replaceChildren(botaoEditarSalvar, infoTarefa, deletarTarefa)
    if(tarefa.dataConclusão == getDataAtual()){
    containerTarefaDeHoje.appendChild(containerTarefa)

    }else{
        containerDeTarefas.appendChild(containerTarefa)
    }
    botaoEditarSalvar.addEventListener('click', modoEditar)
    deletarTarefa.addEventListener('click', async () =>{
        // let tarefaIndex = tarefas.indexOf(tarefa)
        // tarefas.splice(tarefaIndex, 1)
        // console.log('clicou')
            const url = `http://localhost:5080/tarefas/${tarefa.id}`
            const options = {
                method: 'DELETE'
            }
            const response = await fetch(url, options)
            console.log (response.ok)

            window.location.reload()
    })

 }

 const carregarTarefas = async () =>{
     const tarefas = await getTarefas()
     tarefas.forEach(tarefa =>{
         if(tarefa.idUsuario == usuarioId)
          criarTarefa(tarefas, tarefa)
     })
 }

 const carregarUsuario = async () =>{
     const usuarios = await getUsuarios()
     usuarios.forEach(usuario =>{
        if(usuario.id == usuarioId){
            let nomeUsuario = usuario.nome.split(" ")
            let campoNomeUsuario = document.getElementById('nomeUsuario')
            campoNomeUsuario.textContent = nomeUsuario[0]
        }
     })
 }


const modoEditar = (clickEvent) =>{

    let botaoEditar = clickEvent.target
    console.log('clicou', botaoEditar)

    botaoEditar.classList.toggle('edit-mode')

}
const editarTarefa = (botaoEditar) =>{
    if(!botaoEditar.classList == 'edit-mode'){

    }
}

const getDataAtual = () =>{
    let dataAtual = new Date().toLocaleDateString()
    console.log(dataAtual)
    return dataAtual
}

getDataAtual()

carregarUsuario()
carregarTarefas()