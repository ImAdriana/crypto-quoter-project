const criptomonedasSelect = document.querySelector('#criptomonedas');

// Crear un Promise
// Al descargar todas las criptomonedas
const obtenerCriptomonedas = (criptomonedas) =>
    new Promise((resolve) => {
        resolve(criptomonedas);
    });

// Una vez que el documento esté listo, consulta
window.addEventListener('load', () => {
    consultarCriptomonedas();
});

function consultarCriptomonedas() {
    // Obtiene las criptomonedas
    const url =
        'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=15&tsym=USD';
    fetch(url)
        .then((resultado) => resultado.json())
        .then((data) => obtenerCriptomonedas(data.Data))
        .then((criptomonedas) => selectCriptomonedas(criptomonedas));
}

function selectCriptomonedas(criptomonedas) {
    criptomonedas.forEach((element) => {
        const { FullName, Name } = element.CoinInfo;
        // console.log(Name);
        const option = document.createElement('option');
        option.value = Name;
        option.textContent = FullName;
        criptomonedasSelect.appendChild(option);
    });
}
