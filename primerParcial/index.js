const API = "http://localhost:3000"

const newItem = document.querySelector("#newItem")
const addBtn = document.querySelector("#addBtn")
const taskList = document.querySelector("#taskList")
const toggleBtn = document.querySelector("#toggleBtn")
const deletedList = document.querySelector("#deletedList")
const countBtn = document.querySelector("#countBtn")
const output = document.querySelector("#output")

async function cargarTareas() {
    taskList.innerHTML = ""
    const res = await fetch(`${API}/tareas`)
    const data = await res.json()

    data.forEach(t => {
        const li = document.createElement("li")
        li.classList.add("item")
        li.textContent = t.nombre
        li.dataset.id = t.id
        if (t.tachado) li.classList.add("tachado")
        taskList.appendChild(li)
    })
}

async function cargarEliminadas() {
    deletedList.innerHTML = ""
    const res = await fetch(`${API}/eliminadas`)
    const data = await res.json()

    data.forEach(t => {
        const li = document.createElement("li")
        li.classList.add("item")
        li.textContent = t.nombre
        deletedList.appendChild(li)
    })
}

async function agregar() {
    const valor = newItem.value.trim()

    if (valor === "") return

    await fetch(`${API}/tareas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: valor, tachado: false })
    })

    newItem.value = ""
    cargarTareas()
}

async function tacharUltimo() {
    const res = await fetch(`${API}/tareas`)
    const data = await res.json()

    if (data.length === 0) return

    const ultimo = data[data.length - 1]

    await fetch(`${API}/tareas/${ultimo.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tachado: !ultimo.tachado })
    })

    cargarTareas()
}

async function contarItems() {
    const res = await fetch(`${API}/tareas`)
    const data = await res.json()
    output.textContent = "Total de tareas: " + data.length
}

addBtn.addEventListener("click", agregar)
toggleBtn.addEventListener("click", tacharUltimo)
countBtn.addEventListener("click", contarItems)

taskList.addEventListener("dblclick", async function(e) {
    if (e.target && e.target.tagName === "LI") {
        const id = e.target.dataset.id
        const texto = e.target.textContent

        await fetch(`${API}/eliminadas`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre: texto })
        })

        await fetch(`${API}/tareas/${id}`, {
            method: "DELETE"
        })

        cargarTareas()
        cargarEliminadas()
    }
})

taskList.addEventListener("click", function(e) {
    if (e.target && e.target.tagName === "LI") {
        e.target.classList.toggle("relleno")
    }
})

cargarTareas()
cargarEliminadas()