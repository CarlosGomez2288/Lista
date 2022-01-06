// Entrda de datos
const dateMonth = document.querySelector("#dateMonth");
const dateYear = document.querySelector("#dateYear");
const dateText = document.querySelector("#dateText");
const dateNum = document.querySelector("#dateNumber");

let btn = document.querySelector("#btn");
let tarea = document.querySelector("#tarea");
let elementos = document.querySelector("#elementos");
var divs = document.getElementsByClassName("liTarea");
let nuevaTarea = [];

//Funcion de obtner y mostrar la fecha.
const setDate = () => {
  const date = new Date();
  dateNumber.textContent = date.toLocaleString("es", { day: "numeric" });
  dateText.textContent = date.toLocaleString("es", { weekday: "long" });
  dateMonth.textContent = date.toLocaleString("es", { month: "short" });
  dateYear.textContent = date.toLocaleString("es", { year: "numeric" });
};
setDate();

btn.addEventListener("click", function (e) {
  CreatItem(elementos);
  guardar();
  mostrar();
});

//Function crear item
const CreatItem = (task) => {
  let nombre = tarea.value;
  let idTarea = Date.now();
  let Task = {
    Tnombre: nombre,
    id: idTarea,
  };
  if (nombre !== "") {
    nuevaTarea.push(Task);
    return Task;
  } else {
    return 0;
  }
};

const guardar = () => {
  localStorage.setItem("tareas", JSON.stringify(nuevaTarea));
};

const borrar = (idTask) => {
  let indexarray;
  nuevaTarea.forEach((elemento, index) => {
    if (elemento.id === idTask) {
      indexarray = index;
    }
  });
  nuevaTarea.splice(indexarray, 1);
  guardar();
  mostrar();
};

const mostrar = () => {
  elementos.innerHTML = "";
  nuevaTarea = JSON.parse(localStorage.getItem("tareas"));
  if (nuevaTarea === null) {
    nuevaTarea = [];
  } else {
    nuevaTarea.forEach((e) => {
      var nuevoLI = document.createElement("li");
      nuevoLI.classList.add("liTarea");
      nuevoLI.innerHTML = `${e.Tnombre}<button class="btn-2" onclick="borrar(${e.id})">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg>
        </button>`;

      elementos.prepend(nuevoLI);
    });
    //Recorres la lista de elementos seleccionados
    for (var i = 0; i < divs.length; i++) {
      //Añades un evento a cada elemento
        divs[i].addEventListener("click", function (event) {
        event.target.classList.toggle("done");
      });
    }
    document.getElementById("tarea").value = "";
  }
};
//mostrar la informacion al recargar el DOM
document.addEventListener("DOMContentLoaded", mostrar());
