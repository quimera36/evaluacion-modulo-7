let offset = 0;

const tablaPaises = document.getElementById("tablaPaises");
const limitSelect = document.getElementById("limit");
const btnSiguiente = document.getElementById("siguiente");
const mensaje = document.getElementById("mensaje");

const formAgregar = document.getElementById("formAgregar");
const formEliminar = document.getElementById("formEliminar");

async function cargarPaises() {
  const limit = limitSelect.value;

  const respuesta = await fetch(`/paises?limit=${limit}&offset=${offset}`);
  const paises = await respuesta.json();

  tablaPaises.innerHTML = "";

  paises.forEach((pais) => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${pais.nombre}</td>
      <td>${pais.continente}</td>
      <td>${pais.poblacion}</td>
      <td>${pais.paises_pib ? pais.paises_pib.pib_2019 : "Sin dato"}</td>
      <td>${pais.paises_pib ? pais.paises_pib.pib_2020 : "Sin dato"}</td>
    `;

    tablaPaises.appendChild(fila);
  });
}

btnSiguiente.addEventListener("click", () => {
  offset += Number(limitSelect.value);
  cargarPaises();
});

limitSelect.addEventListener("change", () => {
  offset = 0;
  cargarPaises();
});

formAgregar.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nuevoPais = {
    nombre: document.getElementById("nombre").value,
    continente: document.getElementById("continente").value,
    poblacion: Number(document.getElementById("poblacion").value),
    pib_2019: Number(document.getElementById("pib_2019").value),
    pib_2020: Number(document.getElementById("pib_2020").value),
  };

  const respuesta = await fetch("/paises", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevoPais),
  });

  const data = await respuesta.json();

  if (respuesta.ok) {
    mensaje.textContent = data.message;
    mensaje.className = "ok";
    formAgregar.reset();
    offset = 0;
    cargarPaises();
  } else {
    mensaje.textContent = data.message;
    mensaje.className = "error";
  }
});

formEliminar.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombreEliminar").value;

  const respuesta = await fetch(`/paises/${nombre}`, {
    method: "DELETE",
  });

  const data = await respuesta.json();

  if (respuesta.ok) {
    mensaje.textContent = data.message;
    mensaje.className = "ok";
    formEliminar.reset();
    offset = 0;
    cargarPaises();
  } else {
    mensaje.textContent = data.message;
    mensaje.className = "error";
  }
});

cargarPaises();