const app = document.getElementById("app");
const lista = document.getElementById("lista");

function label(txt, top, left) {
    let l = document.createElement("label");
    l.textContent = txt;
    l.style.top = top;
    l.style.left = left;
    app.appendChild(l);
}

function textarea(top, left) {
    let t = document.createElement("textarea");
    t.style.top = top;
    t.style.left = left;
    app.appendChild(t);
    return t;
}

function number(top, left) {
    let n = document.createElement("input");
    n.type = "number";
    n.min = "-100";
    n.max = "9999";
    n.style.top = top;
    n.style.left = left;
    app.appendChild(n);
    return n;
}

let nombreLabel = label("???", "20px", "5%");
let nombre = textarea("60px", "5%");

let cursoLabel = label("elige algo?", "20px", "80%");
let cursoContainer = document.createElement("div");
cursoContainer.style.position = "absolute";
cursoContainer.style.top = "60px";
cursoContainer.style.left = "80%";

let cursos = ["A", "B", "C", "D", "??"];
cursos.forEach(c => {
    let r = document.createElement("input");
    r.type = "radio";
    r.name = "curso";
    r.value = c;

    let t = document.createElement("span");
    t.textContent = c;

    cursoContainer.appendChild(r);
    cursoContainer.appendChild(t);
    cursoContainer.appendChild(document.createElement("br"));
});

app.appendChild(cursoContainer);

let edadLabel = label("edad??", "300px", "10%");
let edad = number("340px", "10%");

let hermanosLabel = label("cuantos??", "600px", "80%");
let hermanos = number("640px", "80%");

let ciudadLabel = label("origen??", "900px", "40%");
let ciudadContainer = document.createElement("div");
ciudadContainer.style.position = "absolute";
ciudadContainer.style.top = "940px";
ciudadContainer.style.left = "40%";

let ciudades = ["Sucre", "La Paz", "Cochabamba", "Santa Cruz", "Oruro", "Potosí", "Tarija", "Beni", "Pando"];

ciudades.forEach(c => {
    let r = document.createElement("input");
    r.type = "radio";
    r.name = "ciudad";
    r.value = c;

    let t = document.createElement("span");
    t.textContent = c;

    ciudadContainer.appendChild(r);
    ciudadContainer.appendChild(t);
    ciudadContainer.appendChild(document.createElement("br"));
});

app.appendChild(ciudadContainer);

let boton = document.createElement("button");
boton.textContent = "NO TOCAR";
boton.style.top = "500px";
boton.style.left = "45%";

app.appendChild(boton);

boton.addEventListener("click", () => {
    let cursoSel = document.querySelector('input[name="curso"]:checked');
    let ciudadSel = document.querySelector('input[name="ciudad"]:checked');

    let datos = {
        nombre: nombre.value,
        curso: cursoSel ? cursoSel.value : "",
        edad: edad.value,
        hermanos: hermanos.value,
        ciudad: ciudadSel ? ciudadSel.value : ""
    };

    agregar(datos);
});

function agregar(datos) {
    let div = document.createElement("div");

    div.innerHTML = `
    ${datos.nombre} --- ${datos.curso} --- ${datos.edad} --- ${datos.hermanos} --- ${datos.ciudad}
    `;

    let editar = document.createElement("button");
    editar.textContent = "???";
    editar.style.position = "static";

    editar.onclick = () => {
        nombre.value = datos.nombre;
        edad.value = datos.edad;
        hermanos.value = datos.hermanos;

        document.querySelectorAll('input[name="curso"]').forEach(r => {
            r.checked = r.value === datos.curso;
        });

        document.querySelectorAll('input[name="ciudad"]').forEach(r => {
            r.checked = r.value === datos.ciudad;
        });

        lista.removeChild(div);
    };

    let eliminar = document.createElement("button");
    eliminar.textContent = "X";
    eliminar.style.position = "static";

    eliminar.onclick = () => {
        lista.removeChild(div);
    };

    div.appendChild(editar);
    div.appendChild(eliminar);

    lista.appendChild(div);
}