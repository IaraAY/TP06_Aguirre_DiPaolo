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

    let currentAngle = 0;
    let isRunning = false;
    let animInterval = null;
    let progreso = 0;

    // Rango en grados de la zona amarilla
    let zoneStart = 180;
    let zoneEnd = 230;

    let codeInput = "";

    function iniciarSkillCheck() {
        if (isRunning || progreso >= 100) return;
        
        // Generar una zona amarilla aleatoria entre 90 y 280 grados
        zoneStart = Math.floor(Math.random() * 190) + 90;
        zoneEnd = zoneStart + 50;

        document.getElementById('targetArea').style.background = 
            `conic-gradient(transparent 0deg ${zoneStart}deg, #f39c12 ${zoneStart}deg ${zoneEnd}deg, transparent ${zoneEnd}deg 360deg)`;

        currentAngle = 0;
        isRunning = true;
        
        clearInterval(animInterval);
        animInterval = setInterval(() => {
            currentAngle = (currentAngle + 4) % 360;
            document.getElementById('needle').style.transform = `rotate(${currentAngle}deg)`;
        }, 16); // ~60fps
    }

    function hitSkillCheck() {
        if (!isRunning) return;

        clearInterval(animInterval);
        isRunning = false;

        // Verificar si la aguja cayó dentro de la zona amarilla
        if (currentAngle >= zoneStart && currentAngle <= zoneEnd) {
            progreso += 34; // Requiere 3 acertadas
            if (progreso > 100) progreso = 100;
            
            document.getElementById('progressFill').style.width = progreso + '%';
            document.getElementById('txtProgreso').innerText = `Reparación: ${progreso}% (¡Perfecto!)`;

            if (progreso >= 100) {
                completarCipher();
            } else {
                setTimeout(iniciarSkillCheck, 800);
            }
        } else {
            // Falla: retrocede progreso (chispazo de la Cipher)
            progreso = Math.max(0, progreso - 20);
            document.getElementById('progressFill').style.width = progreso + '%';
            document.getElementById('txtProgreso').innerText = `¡CHISPAZO! Fallaste (Reparación: ${progreso}%)`;
            setTimeout(iniciarSkillCheck, 1200);
        }
    }

    function completarCipher() {
        document.getElementById('sectionSkillCheck').style.display = 'none';
        document.getElementById('keypadBox').classList.add('active');
        document.getElementById('txtProgreso').innerText = "¡CIPHER COMPLETADA! Ingrese la clave para abrir la puerta.";
    }

    // Lógica del teclado numérico
    function pressKey(val) {
        if (val === 'C') {
            codeInput = codeInput.slice(0, -1);
        } else if (codeInput.length < 6) {
            codeInput += val;
        }
        updateDisplay();
    }

    function clearInput() {
        codeInput = "";
        updateDisplay();
    }

    function updateDisplay() {
        let display = codeInput.padEnd(6, '_');
        document.getElementById('displayInput').innerText = display;
        document.getElementById('respuesta').value = codeInput;

        if (codeInput.length === 6) {
            document.getElementById('btnEnviar').disabled = false;
        } else {
            document.getElementById('btnEnviar').disabled = true;
        }
    }

    // Permitir usar la barra espaciadora para el Skill Check
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space' && isRunning) {
            e.preventDefault();
            hitSkillCheck();
        }
    });
function permitirSoltar(ev) {
    ev.preventDefault();
}

function arrastrar(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function soltar(ev) {
    ev.preventDefault();
    let idFicha = ev.dataTransfer.getData("text");
    let ficha = document.getElementById(idFicha);
    let casilla = ev.currentTarget;
    
    // Verificamos si la casilla no tiene otra ficha arrastrada encima
    if (casilla.querySelectorAll('img[draggable="true"]').length === 0) {
        // Estilamos la ficha para superponerla exactamente arriba de la imagen fija
        ficha.style.position = "absolute";
        ficha.style.top = "5px";
        ficha.style.left = "5px";
        ficha.style.width = "80px";
        ficha.style.height = "80px";
        
        casilla.appendChild(ficha);
    }
}

function soltarEnOrigen(ev) {
    ev.preventDefault();
    let idFicha = ev.dataTransfer.getData("text");
    let ficha = document.getElementById(idFicha);
    
    // Restauramos el comportamiento y posicionamiento original
    ficha.style.position = "static";
    ficha.style.width = "80px";
    ficha.style.height = "80px";

    document.getElementById("zona-origen").appendChild(ficha);
}