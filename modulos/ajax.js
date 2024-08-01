const solicitud = (url) =>{
    fetch(`http://localhost:3000/${url}`)
  .then((response) => response.json())
  .then((json) => {
    return json
  });
}

export default solicitud;