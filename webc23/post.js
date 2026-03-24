const titulo = document.querySelector("#titulo")
const descripcion = document.querySelector("#descripcion")
const form = document.querySelector("#form")

const API_URL = "http://localhost:3001/posts"

const postData = () => {
  const newPost = {
    titulo: titulo.value,
    descripcion: descripcion.value,
    fecha: new Date().toISOString()
  }

  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newPost)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Http error estado: ${response.status}`)
      }
      return response.json()
    })
    .then(() => {
      form.reset()
      getData()
    })
    .catch(error => showResult(error.message, true))
}

form.addEventListener("submit", (e) => {
  e.preventDefault()
  postData()
})