const URL_PREGUNTAS = "http://localhost:3000/preguntas";
const URL_JUEGOS = "http://localhost:3000/juegos";

const preguntaEl = document.getElementById("pregunta");
const opcionesEl = document.getElementById("opciones");
const form = document.getElementById("quizForm");
const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");
const finalEl = document.getElementById("final");

let preguntas = [];
let actuales = [];
let index = 0;
let score = 0;
let aciertos = 0;
let tiempo = 30;
let intervalo;

function mezclar(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

async function cargarPreguntas() {
    const res = await fetch(URL_PREGUNTAS);
    preguntas = await res.json();
    actuales = mezclar(preguntas).slice(0, 5);
    mostrarPregunta();
    iniciarTimer();
}

function iniciarTimer() {
    intervalo = setInterval(() => {
        tiempo--;
        timerEl.textContent = tiempo;
        if (tiempo <= 0) finalizarJuego();
    }, 1000);
}

function mostrarPregunta() {
    const p = actuales[index];
    preguntaEl.textContent = p.pregunta;
    opcionesEl.innerHTML = "";

    p.Opciones.forEach(op => {
        const letra = Object.keys(op)[0];

        const div = document.createElement("div");
        div.classList.add("opcion");

        div.innerHTML = `
            <input type="radio" name="respuesta" value="${letra}" required>
            <label>${op[letra]}</label>
        `;

        opcionesEl.appendChild(div);
    });
}

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const seleccion = document.querySelector('input[name="respuesta"]:checked');
    if (!seleccion) return;

    const p = actuales[index];

    const correcta = p.Opciones.find(op => op.Iscorrect === "True");
    const letraCorrecta = Object.keys(correcta)[0];

    if (seleccion.value === letraCorrecta) {
        score += 20;
        aciertos++;
    }

    scoreEl.textContent = "Puntaje: " + score;

    index++;

    if (index >= actuales.length) {
        finalizarJuego();
    } else {
        mostrarPregunta();
    }
});

async function finalizarJuego() {
    clearInterval(intervalo);
    form.style.display = "none";

    finalEl.textContent = `Juego terminado. Puntaje: ${score}`;

    await fetch(URL_JUEGOS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            aciertos: aciertos,
            Puntaje: score
        })
    });
}

cargarPreguntas();