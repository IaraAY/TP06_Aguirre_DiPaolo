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
    document.getElementById("respuesta").value = document.getElementById("input").value; // <-- Agrega esta línea
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
let v1 = 0;
let v2 = 0;

function cambiarValor(canal) {
    if (canal === 1) v1 = (v1 + 1) % 10;
    if (canal === 2) v2 = (v2 + 5) % 10;

    document.getElementById('val-1').innerText = v1;
    document.getElementById('val-2').innerText = v2;

    // Formatear como expediente + hora
    let exp = v1.toString().padStart(2, '0');
    let hora = v2.toString().padStart(2, '0');
        
    document.getElementById('displayTotal').innerText = `${exp}:${hora}`;
    document.getElementById('inputRespuesta').value = `${exp}00${hora}`;
}
const secuenciaCorrecta = ['C', 'R', 'O', 'W', 'E'];
let secuenciaUsuario = [];

function reproducirSecuencia() {
    let i = 0;
    document.getElementById('estadoSimon').innerText = "Observa los pasos...";
    let interval = setInterval(() => {
    let letra = secuenciaCorrecta[i];
    iluminarBoton(letra);
    i++;
    if (i >= secuenciaCorrecta.length) {
        clearInterval(interval);
        setTimeout(() => {
             document.getElementById('estadoSimon').innerText = "¡Tu turno! Repite la secuencia.";
        }, 800);
    }
}, 800);
}

    function iluminarBoton(letra) {
        let btn = document.getElementById('btn-' + letra);
        if (btn) {
            btn.classList.add('active');
            setTimeout(() => btn.classList.remove('active'), 400);
        }
    }

    function presionarBoton(letra) {
        iluminarBoton(letra);
        secuenciaUsuario.push(letra);
        
        // Actualizar el valor oculto para el controlador
        document.getElementById('respuesta').value = secuenciaUsuario.join('');

        if (secuenciaUsuario.length === secuenciaCorrecta.length) {
            document.getElementById('btnEnviar').disabled = false;
            document.getElementById('estadoSimon').innerText = "Secuencia lista. ¡Haz clic en Confirmar!";
        }
    }

    function reiniciarSecuencia() {
        secuenciaUsuario = [];
        document.getElementById('respuesta').value = "";
        document.getElementById('btnEnviar').disabled = true;
        document.getElementById('estadoSimon').innerText = "Secuencia reiniciada.";
    }