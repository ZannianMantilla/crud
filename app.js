const $formulario = document.querySelector("form");
const campos = [
  document.querySelector("#nombre"),
  document.querySelector("#apellido"),
  document.querySelector("#telefono"),
  document.querySelector("#direccion"),
  document.querySelector("#documento"),
  document.querySelector("#tipo_documento")
];

const agregarSucces = (elemento) => {
  elemento.addEventListener("input", function() {
    if (elemento.value != '') {
      elemento.classList.add("succes");
      elemento.classList.remove("error");
    }
  });
};

const removerError = (elemento) => {  
  elemento.addEventListener("blur", function() {
    if (elemento.value === '') {
      elemento.classList.add("error");
      elemento.classList.remove("succes");
    }
  });
};



campos.forEach(agregarSucces);
campos.forEach(removerError);

const $checkbox = document.querySelector("#politicas"); 
const $boton = document.querySelector("#boton"); 

$checkbox.addEventListener('change', function() {
  if ($checkbox.checked) {
    $boton.removeAttribute('disabled');
  } else {
    $boton.setAttribute('disabled', true);
  }
});

const validar = () => {
  event.preventDefault()
  let hayErrores = false;
  campos.forEach((campo) => {
    if (campo.value === '') {
      campo.classList.add("error");
      hayErrores = true;
    } else {
      campo.classList.remove("error");
      campo.classList.add("succes");
    }
  }); 

  if (hayErrores ||!$checkbox.checked) { 
    alert('Por favor, complete todos los campos obligatorios y active la checkbox.');
  } else {
    $formulario.submit();
  }
};

const presionado = document.querySelector("#nombre");
const baja = document.querySelector("#nombre");
const sube = document.querySelector("#nombre");

presionado.addEventListener("keypress", function(event) {
  console.log("Nombre - Keypress:", event);
});

baja.addEventListener("keydown", function(event) {
  console.log("Nombre - Keydown:", event);
});

sube.addEventListener("keyup", function(event) {
  console.log("Nombre - Keyup:", event);
});

$formulario.addEventListener("submit", validar);

const validarInput = (elemento, tipo) => {
  elemento.addEventListener("keypress", function(event) {
    const keycode = event.which || event.keyCode;
    if (tipo === "numero" && !(keycode >= 48 && keycode <= 57)) {
      event.preventDefault();
    } else if (tipo === "letra") {
      letras(event, elemento);
    }
  });
};

const letras = (event, elemento) => {
  let regex = /^[A-Za-zÀ-Ýà-ý\s]+$/;
  if (!regex.test(elemento.value + event.key)) {
    event.preventDefault();
  }
};

validarInput(document.querySelector("#nombre"), "letra");
validarInput(document.querySelector("#apellido"), "letra");
validarInput(document.querySelector("#telefono"), "numero");
validarInput(document.querySelector("#documento"), "numero");
