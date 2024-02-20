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

        if(containerTarefaDeHoje.textContent == "Nenhuma tarefa a ser realizada hoje!!")
        containerTarefaDeHoje.replaceChildren(containerTarefa)
        else
        containerTarefaDeHoje.appendChild(containerTarefa)

    }else{
        containerDeTarefas.appendChild(containerTarefa)
    }

    let inputTitulo = document.createElement('input')
    let inputData = document.createElement('input')
    inputData.type = 'date'


    const url = `http://localhost:5080/tarefas/${tarefa.id}`
    botaoEditarSalvar.addEventListener('click', async (clickEvent) =>{

        let botaoEditar = clickEvent.target

        let novoTitulo = inputTitulo.value
        let novaData = inputData.value.split('-').reverse().join('/')

        if(botaoEditar.classList[1] == 'edit-mode'){

            tituloTarefa.textContent = novoTitulo
            dataConclusao.textContent = novaData

            infoTarefa.replaceChildren(tituloTarefa, dataConclusao)

            const options = {
                method : 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        "id": tarefa.id,
                        "descrição": novoTitulo,
                        "dataConclusão": novaData,
                        "idUsuario": tarefa.idUsuario
                    }
                )
            }
            const response = await fetch(url, options)

            window.location.reload()

        }else{
            inputTitulo.value = tituloTarefa.textContent
            inputData.value = dataConclusao.textContent


            infoTarefa.replaceChildren(inputTitulo, inputData)
        }
    
        botaoEditar.classList.toggle('edit-mode')
    
    })


    
    deletarTarefa.addEventListener('click', async () =>{

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





const getDataAtual = () =>{
    let dataAtual = new Date().toLocaleDateString()
    return dataAtual
}

getDataAtual()

carregarUsuario()
carregarTarefas()