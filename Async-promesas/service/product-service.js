const formulario = document.querySelector("[data-form]");
const inputNombre = document.querySelector("#nombre");
const inputPrecio = document.querySelector("#precio");
const inputDescripcion = document.querySelector("#description");

formulario.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nombre = inputNombre.value;
  const precio = inputPrecio.value;
  const descripcion = inputDescripcion.value;
  const id = uuid.v4();

  await fetch("http://localhost:3000/productos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre,
      precio,
      descripcion,
      id,
    }),
  });

  window.location.href = "./registro_completado.html";
});