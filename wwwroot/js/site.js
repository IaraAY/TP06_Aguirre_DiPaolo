// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

//agregar un numero al input y mostrarlo en el input de respuesta
function agregarNumero(numero) {
    document.getElementById("input").value += numero;
    document.getElementById("respuesta").value = document.getElementById("input").value;
}
//borrar el input y el input de respuesta
function borrar() {
    document.getElementById("input").value = "";
    document.getElementById("respuesta").value = "";
}
//mostrar la pista en el div pistaMsj, si se toca aparece si se toca devuelta desaparece

function mostrarPista() {
    var pista = document.getElementById("pista").value;
    var pistaMsj = document.getElementById("pistaMsj");
    if (pistaMsj.style.display === "none") {
        pistaMsj.style.display = "block";
        pistaMsj.textContent = pista;
    } else {
        pistaMsj.style.display = "none";
    }
}

function mostrarPopUp(indice) {
        var popUp = document.getElementById("popUp");
        var popUpImagen = document.getElementById("popUpImagen");
        var popUpTexto = document.getElementById("popUpTexto");

        // Cambiar la imagen y el texto del pop up según el índice
        popUpImagen.src = "@ViewBag.sala.Archivos[indice]";
        popUpTexto.textContent = "Información de la imagen " + (indice + 1);

        // Mostrar el pop up
        popUp.style.display = "block";
    }

    function cerrarPopUp() {
        var popUp = document.getElementById("popUp");
        popUp.style.display = "none";
    }