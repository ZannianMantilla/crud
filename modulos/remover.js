const remover = (e, input, select) =>{
    if (input.value && select != "") {
        input.classList.remove("error");
        input.classList.add("correcto");
    }else{
        input.classList.remove("correcto");
        input.classList.add("error");
    }
}

export default remover;