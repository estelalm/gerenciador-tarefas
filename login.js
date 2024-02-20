async function validarLogin(){
    const email = document.getElementById('email').value; 
    const senha = document.getElementById('senha').value; 


    if(email === '' || senha === '' ){
        alert('Preencha os campos corretamente !!!')
    } 

    try{
        const responseApi = await fetch('http://localhost:5080/usuario')
        const listUsers = await responseApi.json();

        listUsers.forEach((user) => {
            
            if( email == user.email && senha == user.senha){
                let idUsuario = user.id
                localStorage.setItem('usuarioId', idUsuario)
                window.location.assign('../pagina-inicial/inicio.html')
            } else{
                
            }
        })

    } catch (error){
        console.error(error);
    }

}

const entrar = document.getElementById('entrar')

entrar.addEventListener('click', validarLogin)