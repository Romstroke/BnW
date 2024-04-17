const formulario = document.getElementById('formulario');
const input = document.querySelector('input');
const resp = document.getElementById('resp');

formulario.addEventListener('submit', (e) => {
    if(input.value == ""){
        e.preventDefault();
        resp.innerHTML = 'Debes rellenar el campo!!!';
    }
    //VALIDAR QUE SEA UNA URL O UN ARCHIVO LOCAL VALIDO
});