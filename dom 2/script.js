import checkComplete from "./checkComplete.js"
import deleteIcon from "./deleteIcon.js"

(()=>{
const btn = document.querySelector(`[data-form-btn]`)
console.log(btn)

const createTask = (evento) =>{
    evento.preventDefault();
    const input = document.querySelector(`[data-form-input]`);
    const value = input.value;
    if(value===""){
        alert("Tienes que ingresar el nombre de una tarea")
    }else{
        const list = document.querySelector(`[data-list]`);
    const task = document.createElement(`li`);
    task.classList.add(`card`);
    input.value=``;

    const conTask = document.createElement(`div`);
    const titleTask = document.createElement(`span`);
    titleTask.classList.add(`task`);
    titleTask.innerText = value;

    conTask.appendChild(checkComplete()); 
    conTask.appendChild(titleTask);

    task.appendChild(conTask);
    task.appendChild(deleteIcon());
    list.appendChild(task);
    }
}

btn.addEventListener(`click`, createTask);

})();

const color =(evento) =>{ //cambiamos de color el check
    const element = evento.target;
    element.classList.add(`fas`);
    element.classList.add(`completeIcon`);
    element.classList.remove(`far`);
};