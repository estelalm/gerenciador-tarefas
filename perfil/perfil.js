'use strict'

const idUsuario = localStorage.getItem('idPerfil')
console.log(idUsuario)

const usuarioAtual = localStorage.getItem('usuarioId')

async function getUsuario() {
    const responseApi = await fetch('http://localhost:5080/usuario/' + idUsuario)
    const usuario = responseApi.json();

    return usuario
}


const criarPerfil = async () =>{

    let usuario = await getUsuario()
    const nomeUsuario = document.getElementById('nome-usuario')
    console.log(usuario)
    nomeUsuario.textContent = usuario.nome


    if(idUsuario == usuarioAtual){
        
    }
}


criarPerfil()
