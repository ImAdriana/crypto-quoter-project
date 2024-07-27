const criptomonedasSelect = document.querySelector('#criptomonedas');
const monedasSelect = document.querySelector('#monedas');
const container = document.querySelector('.container');

const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

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
    // Consultar la API con los resultados
    consultarAPI();
}

function leerValor(e) {
    console.log(e.target.name);
    // Establece la propiedad del objeto cuando la clave no es conocida
    objBusqueda[e.target.name] = e.target.value;
    console.log(objBusqueda);
}

function mostrarAlerta(mensaje) {
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

function consultarAPI() {
    const { moneda, criptomoneda } = objBusqueda;
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

    sppiner();
    setTimeout(() => {
        fetch(url)
            .then((respuesta) => respuesta.json())
            .then((data) =>
                mostarCotizacionHTML(data.DISPLAY[criptomoneda][moneda])
            );
    }, 3000);
}

function mostarCotizacionHTML(cotizacion) {
    limpiarHTML();
    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = cotizacion;

    const precio = document.createElement('p');
    precio.innerHTML = `El precio es de: <span>${PRICE}</span>`;
    precio.classList.add('text-2xl');

    const granDia = document.createElement('p');
    granDia.innerHTML = `Precio más alto: <span>${HIGHDAY}</span>`;
    granDia.classList.add('text-2xl');

    const precioBajo = document.createElement('p');
    precioBajo.innerHTML = `Precio más bajo: <span>${LOWDAY}</span>`;
    precioBajo.classList.add('text-2xl');

    const cambioDia = document.createElement('p');
    cambioDia.innerHTML = `Variación últimas 24hrs: <span>${CHANGEPCT24HOUR}%</span>`;
    cambioDia.classList.add('text-2xl');

    const actual = document.createElement('p');
    actual.innerHTML = `Actualización: <span>${LASTUPDATE}</span>`;
    actual.classList.add('text-2xl');

    resultado.appendChild(precio);
    resultado.appendChild(granDia);
    resultado.appendChild(precioBajo);
    resultado.appendChild(cambioDia);
    resultado.appendChild(actual);
}

function leerValor(e) {
    // Establece la propiedad del objeto cuando la clave no es conocida
    objBusqueda[e.target.name] = e.target.value;
}

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function sppiner() {
    limpiarHTML();
    const load = document.createElement('div');
    load.classList.add('spinner');
    load.innerHTML = `
    <div class="double-bounce1"></div>
    <div class="double-bounce2"></div>
    `;

    resultado.appendChild(load);
}
