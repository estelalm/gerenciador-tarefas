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
            
            if(user.senha ==  "joao"){
                console.log("ok");
                
            }
            
            if(email == user.email && senha == user.senha){
                alert('Usuário Logado com Sucesso !!!');
                window.location.href = '../pagina-inicial/inicio.html';
            } else{
                console.log(user.email)
                console.log(email)
            }
        })

    } catch (error){
        console.error(error);
    }


}

const entrar = document.getElementById('entrar')

entrar.addEventListener('click', validarLogin)