// 1. Buscamos los elementos del HTML por su id
const entrada = document.getElementById("entrada");
const botonBuscar = document.getElementById("btn-buscar");
const seccionResultados = document.getElementById("resultados");
const panelLetra = document.getElementById("panel-letra");

// 2. Función que busca canciones en iTunes
async function buscarCanciones() {
  const texto = encodeURIComponent(entrada.value);
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
    '<audio controls autoplay src="' + cancion.previewUrl + '"></audio>' +
    '<div id="letra">Buscando letra...</div>';

  buscarLetra(cancion);
}

// Función que busca la letra en LRCLIB y la muestra
async function buscarLetra(cancion) {
  const direccion =
    "https://lrclib.net/api/search?track_name=" + encodeURIComponent(cancion.trackName) +
    "&artist_name=" + encodeURIComponent(cancion.artistName);

  const respuesta = await fetch(direccion);
  const resultados = await respuesta.json();

  const cajaLetra = document.getElementById("letra");

  if (resultados.length > 0 && resultados[0].plainLyrics) {
    cajaLetra.textContent = resultados[0].plainLyrics;
  } else {
    cajaLetra.textContent = "No se encontró la letra de esta canción.";
  }
}

// 4. Ejecutamos la búsqueda
botonBuscar.addEventListener("click", buscarCanciones);