// 1. Buscamos los elementos del HTML por su id
const entrada = document.getElementById("entrada");
const botonBuscar = document.getElementById("btn-buscar");
const seccionResultados = document.getElementById("resultados");
const panelLetra = document.getElementById("panel-letra");

// 2. Función que busca canciones en iTunes
async function buscarCanciones() {
  const texto = entrada.value;
  const direccion = "https://itunes.apple.com/search?term=" + texto + "&media=music&limit=10";

  const respuesta = await fetch(direccion);
  const datos = await respuesta.json();

  mostrarResultados(datos.results);
}



// 3. Función que dibuja las canciones en pantalla
function mostrarResultados(canciones) {
  seccionResultados.innerHTML = "";

  for (let i = 0; i < canciones.length; i++) {
    const cancion = canciones[i];

    const tarjeta = document.createElement("div");
    tarjeta.className = "cancion";

    tarjeta.innerHTML =
      '<img src="' + cancion.artworkUrl100 + '">' +
      "<div>" +
      "<p>" + cancion.trackName + "</p>" +
      '<p class="artista">' + cancion.artistName + "</p>" +
      "</div>";

    tarjeta.addEventListener("click", function () {
      mostrarReproductor(cancion);
    });

    seccionResultados.appendChild(tarjeta);
  }
}

// Función que muestra el reproductor de una canción
function mostrarReproductor(cancion) {
  panelLetra.innerHTML =
    '<img src="' + cancion.artworkUrl100 + '">' +
    "<h2>" + cancion.trackName + "</h2>" +
    '<p class="artista">' + cancion.artistName + "</p>" +
    '<audio controls autoplay src="' + cancion.previewUrl + '"></audio>';
}

// 4. Ejecutamos la búsqueda
botonBuscar.addEventListener("click", buscarCanciones);