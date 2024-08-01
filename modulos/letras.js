const dom = document;
const letras = (event) =>{
    let letras = /^[a-zA-ZÁ-ÿ\s]*$/;
    if (!letras.test(event.key)) event.preventDefault()
}
export default letras;