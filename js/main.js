
let participantes = [];

const listaParticipantes = document.getElementById("lista-participantes");
const formulario = document.getElementById("formulario-participante");
const resultado = document.getElementById("resultado");
const botonSortear = document.getElementById("sortear");
const botonLimpiar = document.getElementById("limpiar");
const mensajeError = document.createElement("p");
mensajeError.style.color = "red";
formulario.appendChild(mensajeError);

////////// Cargar datos guardados //////////
window.addEventListener("DOMContentLoaded", () => {
  const guardados = localStorage.getItem("participantes");
  if (guardados) {
    participantes = JSON.parse(guardados);
    renderizarLista();
  }
});

////////// Evento agregar participante //////////
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  mensajeError.textContent = "";

  const nombre = document.getElementById("nombre").value.trim();
  const edad = parseInt(document.getElementById("edad").value);

  if (!nombre || isNaN(edad)) return;

  if (edad < 18) {
    mensajeError.textContent = "Solo se pueden agregar participantes mayores de edad (18+).";
    return;
  }

  participantes.push({ nombre, edad });
  guardarLocalStorage();
  renderizarLista();
  formulario.reset();
});

////////// Sortear ganador //////////
botonSortear.addEventListener("click", () => {
  if (participantes.length === 0) {
    resultado.textContent = "No hay participantes para realizar el sorteo.";
    return;
  }

  const indiceGanador = Math.floor(Math.random() * participantes.length);
  resultado.textContent = `🏆 Ganador: ${participantes[indiceGanador].nombre} (Edad: ${participantes[indiceGanador].edad})`;
});

////////// Limpiar storage //////////
botonLimpiar.addEventListener("click", () => {
  participantes = [];
  localStorage.removeItem("participantes");
  renderizarLista();
  resultado.textContent = "";
  mensajeError.textContent = "";
});

////////// Funciones auxiliares //////////
function renderizarLista() {
  listaParticipantes.innerHTML = "";
  participantes.forEach((p, i) => {
    const li = document.createElement("li");
    li.textContent = `${p.nombre} (Edad: ${p.edad})`;
    listaParticipantes.appendChild(li);
  });
}

function guardarLocalStorage() {
  localStorage.setItem("participantes", JSON.stringify(participantes));
}
