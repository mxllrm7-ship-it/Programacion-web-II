//Crear clientes

const formulario = document.querySelector("[data-form]");
const inputNombre = document.querySelector("[data-nombre]");
const inputEmail = document.querySelector("[data-email]");

formulario.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nombre = inputNombre.value;
  const email = inputEmail.value;
  const id = uuid.v4();

  await fetch("http://localhost:3000/perfil", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre,
      email,
      id,
    }),
  });

  window.location.href = "./lista_cliente.html";
});