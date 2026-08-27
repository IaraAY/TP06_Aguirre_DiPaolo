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
//mostrar la pista en un alert
function mostrarPista() {
    var pista = document.getElementById("pista").value;
    alert(pista);
}
