const criptomonedasSelect = document.querySelector('#criptomonedas');
const monedasSelect = document.querySelector('#monedas');
const container = document.querySelector('.container');

const formulario = document.querySelector('#formulario');

const objBusqueda = {
    moneda: '',
    criptomoneda: '',
};

// Crear un Promise
// Al descargar todas las criptomonedas
const obtenerCriptomonedas = (criptomonedas) =>
    new Promise((resolve) => {
        resolve(criptomonedas);
    });

// Una vez que el documento esté listo, consulta
window.addEventListener('load', () => {
    consultarCriptomonedas();
    formulario.addEventListener('submit', submitFormulario);
    criptomonedasSelect.addEventListener('change', leerValor);
    monedasSelect.addEventListener('change', leerValor);
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
        const option = document.createElement('option');
        option.value = Name;
        option.textContent = FullName;
        criptomonedasSelect.appendChild(option);
    });
}

function submitFormulario(e) {
    e.preventDefault(); // Para hacerlo más interactivo

    // Validar
    const { moneda, criptomoneda } = objBusqueda;
    if (moneda === '' || criptomoneda === '') {
        mostrarAlerta('Ambos campos son indispensables');
        return;
    }
}

function leerValor(e) {
    console.log(e.target.name);
    // Establece la propiedad del objeto cuando la clave no es conocida
    objBusqueda[e.target.name] = e.target.value;
    console.log(objBusqueda);
}

function mostrarAlerta(mensaje) {
    console.log(mensaje);
    const alerta = document.querySelector('.bg-red-300');
    // Revisa si no existe la clase para mostrar el error
    if (!alerta) {
        // Crear alerta
        const alerta = document.createElement('div');
        alerta.classList.add(
            'px-4',
            'py-3',
            'mt-5',
            'text-sm',
            'text-center',
            'text-red-800',
            'rounded-lg',
            'bg-red-300',
            'mx-auto',
            'max-w-sm'
        );

        alerta.innerHTML = `
        <span class="font-medium">¡Error!</span> ${mensaje}
        `;
        formulario.appendChild(alerta);

        // Se elimine la alerta después de 3 segundos
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}
