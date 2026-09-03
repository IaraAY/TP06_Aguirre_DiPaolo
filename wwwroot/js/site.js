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
function agregarLetra(letra) {
        document.getElementById("input").value += letra;
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

function mostrarPopup(i) {
    var popup = document.getElementById("popup");
    if (popup.style.display === "block") {
        return;
    }
    var contenidoPopup = document.getElementById("contenidoPopup");
    var archivo = document.getElementById("archivo-" + i).value;

    contenidoPopup.innerHTML = archivo;
    popup.style.display = "block";
}

function cerrarPopup() {
    var popup = document.getElementById("popup");
    popup.style.display = "none";
}