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


const criarTarefa = (tarefa) =>{

    const containerDeTarefas = document.getElementById('tarefas')

    const containerTarefa = document.createElement('div')
    containerTarefa.classList.add('tarefa')

    const botaoEditarSalvar = document.createElement('button')
    botaoEditarSalvar.classList.add('icone-e-cor')
    const iconeEditar = document.createElement('img')
    iconeEditar.src = '../img/edit.svg'

    const infoTarefa = document.createElement('div')
    infoTarefa.classList.add('info-tarefa')

    const tituloTarefa = document.createElement('span')
    tituloTarefa.textContent = tarefa.descrição
    tituloTarefa.classList.add('titulo-tarefa')
    
    const dataConclusao = document.createElement('span')
    dataConclusao.textContent = tarefa.dataConclusão
    dataConclusao.classList.add('data-tarefa')

    botaoEditarSalvar.appendChild(iconeEditar)
    infoTarefa.replaceChildren(tituloTarefa, dataConclusao)
    containerTarefa.replaceChildren(botaoEditarSalvar, infoTarefa)
    containerDeTarefas.appendChild(containerTarefa)

    botaoEditarSalvar.addEventListener('click', modoEditar)
 }

 const carregarTarefas = async () =>{
     const tarefas = await getTarefas()
     tarefas.forEach(tarefa =>{
         if(tarefa.idUsuario == usuarioId)
          criarTarefa(tarefa)
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


const modoEditar = (botaoEditar) =>{

    console.log('clicou')

    botaoEditar.classList.toggle('edit-mode')

    if(botaoEditar.classList == 'edit-mode'){
        botaoEditar.innerHTML = '<img src="../img/save.svg" alt="">'
    }
}

carregarUsuario()
carregarTarefas()