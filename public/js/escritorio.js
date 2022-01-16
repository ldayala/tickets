const params = new URLSearchParams(window.location.search);
const escritorio = document.querySelector("h1");
const btnAtender = document.getElementById("btn-atender");
const alertm = document.querySelector(".alert ul");
const atendiendoA = document.querySelector("h4>.text-primary");
const totalTickes = document.getElementById("lblPendientes");
let numeroEscritorio;

if (!params.has("escritorio")) {
  window.location = "index.html";
  throw new Error("debe pasar el escritorio de trabajo");
} else {
  numeroEscritorio = params.get("escritorio");
  escritorio.innerHTML = `Escritorio ${numeroEscritorio}`;
}


const convertirArrayHtml = (array = [], elemento) => {
  if (array.length === 0) {
    elemento.innerHTML = "No hay tickes pendientes";

    lblPendientes.innerHTML = `Total: 0`;
  }
  let textoHtml = "";
  array.forEach((element) => {
    textoHtml += `<li >${element.numero}</li>`;
  });
  elemento.innerHTML = textoHtml;

  lblPendientes.innerHTML = `Total: ${array.length}`;
};

const socket = io();
socket.on("connect", () => {
  btnAtender.style.display = "block";

  btnAtender.addEventListener("click", () => {
    socket.emit("atender-siguiente", numeroEscritorio, (texto) => {
      if (texto === null) {
        alertm.innerHTML = "no hay mas ticket que atender";
        atendiendoA.innerHTML = "Nadie";
      } else {
        atendiendoA.innerHTML = texto.tickes.numero;
        convertirArrayHtml(texto.pendientes, alertm);
      }
    });
  });

  socket.on("tickes-pendientes", (payload) => {
    convertirArrayHtml(payload, alertm);
  });
});

socket.on("disconnect", () => {
  btnAtender.style.display = "none";
});
