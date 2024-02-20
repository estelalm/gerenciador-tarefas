'use strict'


async function getUsuarios() {
    const responseApi = await fetch('http://localhost:5080/usuario')
    const listaUsuario = responseApi.json();

    return listaUsuario
}

const botaoEntrar= document.getElementById('criar')

const criarConta = () =>{


    let nomeUsuario = document.getElementById('nome').value
    let emailUsuario =  document.getElementById('email').value
    let senhaUsuario = document.getElementById('senha').value
    let senhaConfirmada = document.getElementById('confirma-senha').value

    if(nomeUsuario == "" || emailUsuario == "" || senhaUsuario == ""|| senhaConfirmada == ""){
        toast('Preencha todos os campos!', {
            duration: 3000,
            position: "top-center"
        })
    }else if(!(senhaUsuario == senhaConfirmada)){
        alert('As senhas devem ser iguais')
    } else {
        alert('Conta criada, voltando para a página de Login.')


       let usuarioJSON = {}
        getUsuarios().then(usuariosArray =>{
        usuarioJSON.id = usuariosArray.length ++
    })
        usuarioJSON.nome = nomeUsuario{
        usuarioJSON.email = emailUsuario
        usuarioJSON.senha = senhaUsuario

         fetch('http://localhost:5080/usuario' , {
            method: 'POST', 
            headers:{
            'content-type': 'application/json',
            }, 
            body: JSON.stringify(usuarioJSON)
            })
            
        window.location.assign('../index.html')
    }
}

botaoEntrar.addEventListener('click', criarConta)