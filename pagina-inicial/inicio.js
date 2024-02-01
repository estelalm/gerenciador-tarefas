'use strict'

const botaoEditar = document.getElementById('editar')

const modoEditar = () =>{

    botaoEditar.classList.toggle('edit-mode')

    if(botaoEditar.classList == 'edit-mode'){
        botaoEditar.innerHTML = '<img src="../img/save.svg" alt="">'
    }

    const infoTarefa = document.getElementById('info-tarefa')
    infoTarefa.classList.toggle('edit-mode')
    const titulo = document.querySelector('.titulo-tarefa')
    const dataConclusao = document.querySelector('.data-tarefa')

    if(infoTarefa.classList == 'edit-mode'){
        const inputTitulo = document.createElement('input')
        inputTitulo.value = titulo.innerHTML
        infoTarefa.innerHTML = "<input>"
    
        const inputData = document.createElement('input')
        inputData.value = dataConclusao.innerHTML
        infoTarefa.innerHTML = "<input>"
    
        infoTarefa.replaceChildren(inputTitulo, inputData)
    }else{
        const inputTitulo = document.createElement('input')
        inputTitulo.value = titulo.innerHTML
        infoTarefa.innerHTML = "<input>"
    
        const inputData = document.createElement('input')
        inputData.value = dataConclusao.innerHTML
        infoTarefa.innerHTML = "<input>"
    
        infoTarefa.replaceChildren(inputTitulo, inputData)
    }



}

botaoEditar.addEventListener('click', modoEditar)