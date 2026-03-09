const checkComplete = ()=>{
    const i = document.createElement(`i`);
    i.classList.add(`far`, `fa-check-square`,`icon`);// estilos de icono
    i.addEventListener(`click`, color);
    return i;
}
const color =(evento) =>{ //cambiamos de color el check
    const element = evento.target;
    element.classList.add(`fas`);
    element.classList.add(`completeIcon`);
    element.classList.remove(`far`);
};
export default checkComplete;