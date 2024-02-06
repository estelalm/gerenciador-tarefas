function validaLogin(){
    const nome= document.getElementById('nome').value;
    const senha= document.getElementById('senha').value;

    const responseApi = await fetch('http://localhost:8080/usuario')

    const listUsers = responseApi.json();

    if(nome === '' || senha === '') {
        alert('Preencha os campos corretamente !')
    }

    try{
        const responseApi = await fetch('http://localhost:8080/usuario')
        const listUsers = responseApi.json();

        listUsers.forEach(user => {
            if(nome === user.nome && senha === user.senha){
                alert('Usuário Logado com Sucesso !')
                window.location.href = '../inicio.html'
            }
        });

    } catch (error){
        console.error(error);
    }
}
