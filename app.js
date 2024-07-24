import { correo } from "./modulo.js";
import { validarInput } from "./modulo.js";
import { removerError } from "./modulo.js";
import { agregarSucces } from "./modulo.js";


const $formulario = document.querySelector("form");
const campos = [
  document.querySelector("#nombre"),
  document.querySelector("#apellido"),
  document.querySelector("#telefono"),
  document.querySelector("#direccion"),
  document.querySelector("#documento"),
  document.querySelector("#tipo_documento"),
  document.querySelector("#email")
];


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

correo(document.querySelector("#email"));

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
