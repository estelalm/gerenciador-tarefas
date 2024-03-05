export async function getUsuario(id) {
    const responseApi = await fetch('http://localhost:5080/usuario/' + id)
    const usuario = responseApi.json();

    return usuario
}