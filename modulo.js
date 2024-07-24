export const correo = (elemento) => {
    elemento.addEventListener("blur", function() {
      let expresion = /^[\w-._]+@[\w-._]+(\.[a-zA-Z]{2,3}){1,2}$/;
      let resultado = expresion.test(elemento.value);
      console.log("Resultado de la validación:", resultado);
      if (resultado){
        elemento.classList.remove("error")
        elemento.classList.add("succes")
      } else{
        elemento.classList.add("error")
        elemento.classList.remove("succes")
      }
    });
  }

  export const validarInput = (elemento, tipo) => {
    elemento.addEventListener("keypress", function(event) {
      const keycode = event.which || event.keyCode;
      if (tipo === "numero" && !(keycode >= 48 && keycode <= 57)) {
        event.preventDefault();
      } else if (tipo === "letra") {
        letras(event, elemento);
      }
    });
  };

  export const agregarSucces = (elemento) => {
    elemento.addEventListener("input", function() {
      if (elemento.value != '') {
        elemento.classList.add("succes");
        elemento.classList.remove("error");
      }
    });
  };
  
  export const removerError = (elemento) => {  
    elemento.addEventListener("blur", function() {
      if (elemento.value === '') {
        elemento.classList.add("error");
        elemento.classList.remove("succes");
      }
    });
  };


 