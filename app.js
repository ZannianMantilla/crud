import isGmail from "./modulos/isGmail.js";
import is_number from "./modulos/is_number.js";
import letras from "./modulos/letras.js";
import remover from "./modulos/remover.js";
import is_valid from "./modulos/is_valid.js";
import solicitud, { enviar } from "./modulos/ajax.js";
import { URL } from "./modulos/config.js";

const $formulario = document.querySelector("form");
const nombre = document.querySelector("#nombre");
const apellidos = document.querySelector("#apellidos");
const telefono = document.querySelector("#telefono");
const direccion = document.querySelector("#direccion");
const documento = document.querySelector("#documento");
const tipo = document.querySelector("#tipo");
const politicas = document.querySelector("#politicas");
const correo = document.querySelector(  "#email");
const boton = document.querySelector("#boton");
const tbUsers = document.querySelector("#tpUsers").content;
const fragmento = document.createDocumentFragment();
const tbody = document.querySelector("tbody");

const cantidad = (elemento) => {
    let valor = elemento.value.length === 10;
    if (valor) {
        alert("correcto")
        elemento.classList.add("correcto")
    }
}

const documentos = () =>{
    const fragmento = document.createDocumentFragment();
    fetch('http://localhost:3000/documents')
    .then((response) => response.json())
    .then((data) => {
        let option = document.createElement("option");
        option.textContent = "Seleccione...";
        fragmento.appendChild(option);
        option.value = ""
        data.forEach(element => {
            let option = document.createElement("option");
            option.value = element.id;
            option.textContent = element.name;
            fragmento.appendChild(option)
        });
        tipo.appendChild(fragmento);
    });
}

const listar = async () => {
    const data = await solicitud("users");
    const documentos = await solicitud("documents");
    data.forEach(element => {
        let nombre = documentos.find((docuemnto) => docuemnto.id === element.type_id).name;
        tbUsers.querySelector(".nombre").textContent = element.first_name;
        tbUsers.querySelector(".apellido").textContent = element.last_name;
        tbUsers.querySelector(".telefono").textContent = element.phone;
        tbUsers.querySelector(".direccion").textContent = element.address;
        tbUsers.querySelector(".email").textContent = element.email;
        tbUsers.querySelector(".documento").textContent = element.document;
        tbUsers.querySelector(".tipo").textContent = element.type_id;
        tbUsers.querySelector(".modificar").setAttribute("data-id", element.id)
        tbUsers.querySelector(".eliminar").setAttribute("data-id", element.id)
        const clone = document.importNode(tbUsers, true)
        fragmento.appendChild(clone);
    })
    tbody.appendChild(fragmento)
}

const createRow = (data) => {
    const tr = tbody.insertRow(-1);
    const tdNombre = tr.insertCell(0);
    const tdApellido = tr.insertCell(1);
    const tdTelefono = tr.insertCell(2);
    const tdDireccion = tr.insertCell(3);
    const tdEmail = tr.insertCell(4);
    const tdDocumento = tr.insertCell(5);
    const tdTipo = tr.insertCell(6);

    tdNombre.textContent = data.first_name;
    tdApellido.textContent = data.last_name;
    tdTelefono.textContent = data.phone;
    tdDireccion.textContent = data.address;
    tdEmail.textContent = data.email;
    tdDocumento.textContent = data.document;
    tdTipo.textContent = data.type_id;

}

const buscar = (element) => {
    console.log(element.dataset.id);
    enviar(`users/${element.dataset.id}`, {
        method: "PATH",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then((data) => {
        console.log(data);
    });
}

addEventListener("DOMContentLoaded", (event) => {
    documentos()
    listar()
    if (!politicas.checked) {
        boton.setAttribute("disabled","");
    }
});

document.addEventListener("click", (e) =>{
    if(e.target.matches(".modificar")){
        buscar(e.target); 
    }
});

politicas.addEventListener("change", function(e){
    console.log(e.target.checked);
    if (e.target.checked) {
        boton.removeAttribute("disabled")
    }
});

$formulario.addEventListener("submit", (event)=>{
    let response = is_valid(event, "form [required]");
    if (response) {
        const data ={
            first_name: nombre.value,
            last_name: apellidos.value,
            address: direccion.value,
            email: correo.value,
            phone: telefono.value,
            document: documento.value,
            type_id: tipo.value,
        }
        fetch(`${URL}/users`,{
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((json) =>{
            nombre.value="";
            apellidos.value="";
            direccion.value=""; 
            telefono.value="";
            tipo.value="";
            documento.value="";
            correo.value="";
            politicas.checked = false;
            createRow(json)
            
        })
    }else{
        alert("Rellena Los Campos")
    }
});

nombre.addEventListener("keypress", (event) => {
    remover(event, nombre);
});
apellidos.addEventListener("blur", (event) => {
    remover(event, apellidos);
});
tipo.addEventListener("change", (event) => {
    remover(event, tipo);
});
telefono.addEventListener("blur", (event) => {
    remover(event, telefono);
});

documento.addEventListener("keypress", is_number);
telefono.addEventListener("keypress", is_number);

nombre.addEventListener("keypress", letras );
apellidos.addEventListener("keypress", (event) => {
    letras(event, apellidos);
});
correo.addEventListener("blur", (event) => {
    isGmail(event, correo);
});
direccion.addEventListener("blur", (event) => {
    remover(event, direccion);
});
documento.addEventListener("blur", (event)=> {
    remover(event, documento);
});

tipo.addEventListener("blur", (event) => {
    remover(event, tipo);
});
