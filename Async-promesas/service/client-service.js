//ver clientes pagina principal

const lista = document.querySelector("[data-table]");
const modalContainer = document.querySelector(".modal-container");
const btnCerrar = document.querySelector(".modal__close");
const btnConfirmar = document.querySelector(".modal__button--confirm");
let idEliminar = null;

const crearFila = (nombre, email, id) => {
  const tr = document.createElement("tr");

  const contenido = `
    <td class="table__td">${nombre}</td>
    <td class="table__td">${email}</td>
    <td class="table__td table__align--right">
      <button class="simple-button simple-button--delete" data-id="${id}">
        Eliminar
      </button>
    </td>
  `;

  tr.innerHTML = contenido;

  const btnEliminar = tr.querySelector(".simple-button--delete");
  btnEliminar.addEventListener("click", () => {
    idEliminar = id;
    modalContainer.classList.remove("modal--close");
  });

  return tr;
};

const listarClientes = async () => {
  const response = await fetch("http://localhost:3000/perfil");
  const data = await response.json();

  data.forEach(({ nombre, email, id }) => {
    const nuevaFila = crearFila(nombre, email, id);
    lista.appendChild(nuevaFila);
  });
};

btnCerrar.addEventListener("click", () => {
  modalContainer.classList.add("modal--close");
});

btnConfirmar.addEventListener("click", async () => {
  if (idEliminar !== null) {
    await fetch(`http://localhost:3000/perfil/${idEliminar}`, {
      method: "DELETE",
    });
    location.reload();
  }
});

listarClientes();


