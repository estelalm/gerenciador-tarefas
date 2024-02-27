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

async function getSeguindo() {
    const responseApi = await fetch('http://localhost:5080/seguindo')
    const listaSeguindo = responseApi.json();
    const usuariosSeguidos = listaSeguindo.forEach(usuario => {
        if(usuario.id = idUsuario){
            usuariosSeguidos = usuario.usuarios
        }
    })
    return usuariosSeguidos
}

async function getPostsSeguindo() {
   
    let usuariosSeguidos = getSeguindo()

    usuariosSeguidos.forEach(usuario =>{

        let tarefas = getTarefas()
        tarefas.forEach(tarefa =>{
            if(usuario.id == tarefa.idUsuario){
                // if(tarefa.publico)
                criarTarefaTimeline(usuario, tarefa)
            }
        })

    })
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


    const url = `http://localhost:5080/tarefas/${tarefa.id}`
    botaoEditarSalvar.addEventListener('click', async (clickEvent) =>{

        let botaoEditar = clickEvent.target

        let novoTitulo = inputTitulo.value
        let novaData = inputData.value

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

const bloquearPremium = ()=>{

    const containerDeTarefas = document.querySelector('.container-minhas-tarefas')

    const painelPremium = document.createElement('div')
    painelPremium.classList.add('painel-premium')

    painelPremium.innerHTML = '<img src="../img/coroa.png" alt="Coroa"> <h2>Premium</h2> <p>Seja um assinante para desbloquear essa função</p>'

    const botaoAdicionar = document.getElementById('add-tarefa')
    botaoAdicionar.href = "#"
    botaoAdicionar.innerHTML = 'Adicionar Tarefa <img src="../img/coroa.png">'
    botaoAdicionar.style.backgroundColor = 'var(--botao)'

    containerDeTarefas.replaceChildren(painelPremium)
}

const criarTarefaTimeline = (usuario, tarefa) =>{

    const containerTimeline = document.getElementById('container-timeline')

    const postTarefa = document.createElement('div')
    postTarefa.classList.add('post-tarefa')

    const username = document.createElement('p')
    username.textContent = usuario.nome

    const containerTarefa = document.createElement('div')
    containerTarefa.classList.add('tarefa')
    containerTarefa.classList.add('time-tarefa')

    const botaoComentar = document.createElement('button')
    botaoComentar.classList.add('icone-e-cor')

    const infoTarefa = document.createElement('div')
    infoTarefa.classList.add('info-tarefa')

    const tituloTarefa = document.createElement('span')
    tituloTarefa.textContent = tarefa.descrição
    tituloTarefa.classList.add('titulo-tarefa')
    
    const dataConclusao = document.createElement('span')
    dataConclusao.textContent = tarefa.dataConclusão
    dataConclusao.classList.add('data-tarefa')

    infoTarefa.replaceChildren(tituloTarefa, dataConclusao)
    containerTarefa.replaceChildren(botaoComentar, infoTarefa, deletarTarefa)

    postTarefa.replaceChildren(username, containerTarefa)
    
    ///////////////////////////////////////////////////////////////////////

    const fotoPerfil = document.createElement('div')
    let imagemUsuario 
    if(usuario.imagem == null)
    imagemUsuario = '../img/usuario.webp'
    else
    imagemUsuario = usuario.imagem

    fotoPerfil.classList.add('foto-perfil')
    if(usuario.premium){


        fotoPerfil.innerHTML = `<img class="coroa" src="../img/coroa.png" alt=""> <a href="#"><img src="${imagemUsuario}" alt=""></a>`   
    }else{
        fotoPerfil.innerHTML = `<a href="#"><img src="${imagemUsuario}" alt=""></a>`   
    }


    let postContainer = document.createElement('div')
    postContainer.classList.add('post-container')

    postContainer.replaceChildren(fotoPerfil, postTarefa)
    //////////////////////////////////////////////////////////////////////

    
    

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
            if(usuario.premium){
                carregarTarefas()
            }else{
                bloquearPremium()
            }
        }
     })
 }


const getDataAtual = () =>{
    let dataAtual = new Date().toLocaleDateString()
    return dataAtual
}

getDataAtual()
carregarUsuario()