class Post{
  constructor(titulo,descripcion,fecha){
    this.titulo=titulo
    this.descripcion=descripcion
    this.fecha=fecha
  }
}

const API_URL = "http://localhost:3001/posts"
const container = document.getElementById("container")
const form = document.getElementById("form")
const tituloInput = document.getElementById("titulo")
const descripcionInput = document.getElementById("descripcion")

const modal = document.getElementById("modal")
const editTitulo = document.getElementById("editTitulo")
const editDescripcion = document.getElementById("editDescripcion")
const updateBtn = document.getElementById("updateBtn")
const closeBtn = document.getElementById("closeBtn")

let currentId = null

const getData=()=>{
  fetch(API_URL)
    .then(res=>res.json())
    .then(data=>showResult(data))
}

const showResult=(data,error=false)=>{
  container.innerHTML=""
  if(error){
    container.innerHTML=`<p>${data}</p>`
    return
  }
  data.forEach(post=>{
    const div=document.createElement("div")
    div.classList.add("card")
    div.innerHTML=`
      <h3>${post.titulo}</h3>
      <p>${post.descripcion}</p>
      <p>${post.fecha}</p>
      <button onclick="deletePost('${post.id}')">Eliminar</button>
      <button onclick="openModal('${post.id}','${post.titulo}','${post.descripcion}')">Editar</button>
    `
    container.appendChild(div)
  })
}

const postData=()=>{
  const nuevoPost=new Post(
    tituloInput.value,
    descripcionInput.value,
    new Date().toLocaleDateString()
  )

  fetch(API_URL,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(nuevoPost)
  })
  .then(()=>{form.reset();getData()})
}

const deletePost=(id)=>{
  fetch(`${API_URL}/${id}`,{method:"DELETE"})
  .then(()=>getData())
}

const openModal=(id,titulo,descripcion)=>{
  currentId=id
  editTitulo.value=titulo
  editDescripcion.value=descripcion
  modal.style.display="flex"
}

const updatePost=()=>{
  fetch(`${API_URL}/${currentId}`,{
    method:"PUT",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      titulo:editTitulo.value,
      descripcion:editDescripcion.value,
      fecha:new Date().toLocaleDateString()
    })
  })
  .then(()=>{
    modal.style.display="none"
    getData()
  })
}

updateBtn.addEventListener("click",updatePost)
closeBtn.addEventListener("click",()=>modal.style.display="none")

form.addEventListener("submit",e=>{
  e.preventDefault()
  postData()
})

getData()