// 1. Buscamos los elementos del HTML por su id
const entrada = document.getElementById("entrada");
const botonBuscar = document.getElementById("btn-buscar");

// 2. Función que busca canciones en iTunes
async function buscarCanciones() {
  const texto = entrada.value;
  const direccion = "https://itunes.apple.com/search?term=" + texto + "&media=music&limit=10";

  const respuesta = await fetch(direccion);
  const datos = await respuesta.json();

  console.log(datos.results);
}

// 3. Ejecutamos la búsqueda
botonBuscar.addEventListener("click", buscarCanciones);