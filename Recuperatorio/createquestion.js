const URL = "http://localhost:3000/preguntas";
const URL_JUEGOS = "http://localhost:3000/juegos";

const form = document.getElementById("formPregunta");
const lista = document.getElementById("lista");
const listaJuegos = document.getElementById("listaJuegos");
const editIdInput = document.getElementById("editId");

async function cargar() {
    const res = await fetch(URL);
    const data = await res.json();

    lista.innerHTML = "";

    data.forEach(p => {
        const div = document.createElement("div");
        div.classList.add("item");

        const titulo = document.createElement("strong");
        titulo.textContent = p.pregunta;

        const acciones = document.createElement("div");
        acciones.classList.add("acciones");

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.addEventListener("click", () => editar(p.id));

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.addEventListener("click", () => eliminar(p.id));

        acciones.appendChild(btnEditar);
        acciones.appendChild(btnEliminar);

        div.appendChild(titulo);
        div.appendChild(acciones);

        lista.appendChild(div);
    });
}

async function cargarJuegos() {
    const res = await fetch(URL_JUEGOS);
    const data = await res.json();

    listaJuegos.innerHTML = "";

    data.forEach(j => {
        const div = document.createElement("div");
        div.classList.add("item");

        div.innerHTML = `
            <strong>Puntaje: ${j.Puntaje}</strong>
            <div>Aciertos: ${j.aciertos}</div>
        `;

        listaJuegos.appendChild(div);
    });
}

form.addEventListener("submit", async function(e) {
    e.preventDefault();

    const pregunta = document.getElementById("pregunta").value;
    const correcta = document.querySelector('input[name="correcta"]:checked');

    if (!correcta) return;

    const opciones = ["A", "B", "C", "D"].map(letra => {
        return {
            [letra]: document.getElementById(letra).value,
            Iscorrect: correcta.value === letra ? "True" : "False"
        };
    });

    const nuevaPregunta = {
        pregunta: pregunta,
        Opciones: opciones
    };

    const editId = editIdInput.value;

    if (editId === "") {
        await fetch(URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevaPregunta)
        });
    } else {
        await fetch(`${URL}/${editId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevaPregunta)
        });
        editIdInput.value = "";
    }

    form.reset();
    cargar();
});

async function editar(id) {
    const res = await fetch(`${URL}/${id}`);
    const p = await res.json();

    document.getElementById("pregunta").value = p.pregunta;

    p.Opciones.forEach(op => {
        const letra = Object.keys(op)[0];
        document.getElementById(letra).value = op[letra];

        if (op.Iscorrect === "True") {
            document.querySelector(`input[value="${letra}"]`).checked = true;
        }
    });

    editIdInput.value = id;
}

async function eliminar(id) {
    await fetch(`${URL}/${id}`, {
        method: "DELETE"
    });
    cargar();
}

cargar();
cargarJuegos();