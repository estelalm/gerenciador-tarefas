'use strict'

const idUsuario = localStorage.getItem('idPerfil')
console.log(idUsuario)

const usuarioAtual = localStorage.getItem('usuarioId')

async function getUsuario() {
    const responseApi = await fetch('http://localhost:5080/usuario/' + idUsuario)
    const usuario = responseApi.json();

    return usuario
}
async function getUsuarioAtual() {
    const responseApi = await fetch('http://localhost:5080/usuario/' + usuarioAtual)
    const usuario = responseApi.json();

    return usuario
}

const criarPerfil = async () =>{

    const card = document.querySelector('.card')

    let usuario = await getUsuario()
    const nomeUsuario = document.getElementById('nome-usuario')
    nomeUsuario.textContent = usuario.nome


    if(idUsuario == usuarioAtual){
        
        const informacoesContainer = document.createElement('div')
        informacoesContainer.classList.add('informacoes')

        let senha = '*'
        for(let index = 1 ; index < usuario.senha.length;index++){
            senha += '*'
        }

        informacoesContainer.innerHTML = `           
         <span>Email</span>
        <div class="info">
            <p>${usuario.email}</p>
        </div>
        <span>Senha</span>
        <div class="info">
            <p>${senha}</p>
        </div>`

        card.appendChild(informacoesContainer)

        if(!usuario.premium){
            const botaoSejaPremium = document.createElement('div')
            botaoSejaPremium.classList.add('serPremium')
    
        botaoSejaPremium.innerHTML = `
        <a class="premium" href="../premium/premium.html">
        <img src="../img/mdi_crown.png" alt="">
        Seja Premium</a>`
            
        card.appendChild(botaoSejaPremium)
        }
        
    }else{

        const botoes = document.createElement('div')
        botoes.classList.add('botoes')

        const botaoSeguir = document.createElement('button')
        botaoSeguir.classList.add('seguir')
        botaoSeguir.textContent = "Seguir"

        botoes.appendChild(botaoSeguir)
        card.appendChild(botoes)

        botaoSeguir.addEventListener('click', seguir)
        botaoSeguir.usuario = usuario
    }
    
}

const seguir = async (event) =>{
    const usuario = await getUsuarioAtual()

    usuario.seguindo.push(idUsuario)

    enviarSeguindo(usuario)
}

const enviarSeguindo = async (usuario) =>{
    
        const url = `http://localhost:5080/usuario/${usuarioAtual}`
        const options = {
            method : 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        }
        const response = await fetch(url, options)
        console.log (response.ok)
        return response.ok
}


criarPerfil()
