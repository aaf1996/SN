const nivelesVQ = [
    { value: 1, label: 'VQ Emprendedor', columna: 'vqEmprendedor' },
    { value: 2, label: 'VQ Bronce', columna: 'vqBronce' },
    { value: 3, label: 'VQ Plata', columna: 'vqPlata' },
    { value: 4, label: 'VQ Oro', columna: 'vqOro' },
    { value: 5, label: 'VQ Zafiro', columna: 'vqZafiro' },
    { value: 6, label: 'VQ Rubi', columna: 'vqRubi' },
    { value: 7, label: 'VQ Diamante', columna: 'vqDiamante' },
    { value: 8, label: 'VQ Doble Diamante', columna: 'vqDobleDiamante' },
    { value: 9, label: 'VQ Triple Diamante', columna: 'vqTripleDiamante' },
    { value: 10, label: 'VQ Diamante Millonario', columna: 'vqDiamanteMillonario' },
    { value: 11, label: 'VQ Doble Diamante Millonario', columna: 'vqDobleDiamanteMillonario' },
    { value: 12, label: 'VQ Imperial', columna: 'vqImperial' }
];

function animarCambioNumero(elemento, valorNuevo, esMoneda = false) {
    let valorActual = parseFloat(elemento.textContent.replace(/,/g, '')) || 0;
    valorNuevo = parseFloat(valorNuevo);

    const paso = valorActual < valorNuevo ? 1 : -1;
    const diferencia = Math.abs(valorNuevo - valorActual);
    const velocidad = 25; // ms entre pasos
    const pasosTotales = Math.min(50, Math.ceil(diferencia)); // máximo 50 pasos

    let pasoReal = (valorNuevo - valorActual) / pasosTotales;
    let contador = 0;

    const intervalo = setInterval(() => {
        valorActual += pasoReal;
        contador++;

        if ((paso > 0 && valorActual >= valorNuevo) || (paso < 0 && valorActual <= valorNuevo) || contador >= pasosTotales) {
            clearInterval(intervalo);
            valorActual = valorNuevo;
        }

        elemento.textContent = esMoneda
            ? formatCurrency(valorActual)
            : Math.round(valorActual);
    }, velocidad);
}

function animarCirclePercent(valorInicial, valorFinal) {
    const circumference = 565.49;
    const paso = valorInicial < valorFinal ? 1 : -1;
    const diferencia = Math.abs(valorFinal - valorInicial);
    const pasosTotales = Math.min(50, Math.ceil(diferencia));
    const pasoReal = (valorFinal - valorInicial) / pasosTotales;

    let valorActual = valorInicial;
    let contador = 0;

    const intervalo = setInterval(() => {
        valorActual += pasoReal;
        contador++;

        const offset = circumference * (1 - valorActual / 100);
        //circle.style.strokeDashoffset = offset;
        number.innerHTML = `${Math.floor(valorActual)}%`;

        if ((paso > 0 && valorActual >= valorFinal) ||
            (paso < 0 && valorActual <= valorFinal) ||
            contador >= pasosTotales) {
            clearInterval(intervalo);
            //circle.style.strokeDashoffset = circumference * (1 - valorFinal / 100);
            number.innerHTML = `${Math.floor(valorFinal)}%`;
        }
    }, 20);
}

const puntosPersonales = document.getElementById('puntosPersonales');
const puntosPersonalesObjetivo = document.getElementById('puntosPersonalesObjetivo');
const progresoPuntosPersonales = document.getElementById('progresoPuntosPersonales');
const activosDirectos = document.getElementById('activosDirectos');
const activosDirectosObjetivo = document.getElementById('activosDirectosObjetivo');
const progresoActivosDirectos = document.getElementById('progresoActivosDirectos');
const VQ = document.getElementById('VQ');
const vqObjetivo = document.getElementById('vqObjetivo');
const progresoVQ = document.getElementById('progresoVQ');

const percentageMovil = document.getElementById('percentageMovil');

const circle = document.getElementById('circle');
const number = document.querySelector('.card__number');
const circleMovil = document.getElementById('circleMovil');
circleMovil.style.strokeDashoffset = "219.372";

let listaRangosDatos = [];

function formatCurrency(value) {
    return parseFloat(value).toLocaleString("es-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}
function circlePercent(percentage) {
    const circumference = 565.49;
    const value = circumference * (1 - percentage / 100);
    number.innerHTML = `${Math.floor(percentage)}%`;
    circle.style.strokeDashoffset = value;
}

function circlePercentMovil(percentage) {
    const A = 219.372;
    const B = 2.17844;
    const value = A - (B * percentage);

    // Verifica si el valor actual del offset ya es igual al nuevo
    const currentOffset = parseFloat(circleMovil.style.strokeDashoffset || 0);

    if (currentOffset !== value) {
        circleMovil.style.strokeDashoffset = value;
    }
}



function limpiarDatos() {
    puntosPersonales.textContent = 0;
    puntosPersonalesObjetivo.textContent = 0;
    progresoPuntosPersonales.textContent = 0;
    activosDirectos.textContent = 0;
    activosDirectosObjetivo.textContent = 0;
    progresoActivosDirectos.textContent = 0;
    VQ.textContent = 0;
    vqObjetivo.textContent = 0;
    progresoVQ.textContent = 0;
}

function actualizarDatosPorRango(elementoValue) {
    if (elementoValue == 0) {
        limpiarDatos();
        circlePercent(0);
        circlePercentMovil(0);
        return;
    }

    const resultadoFiltrado = listaRangosDatos.find(item => item.IdRango == elementoValue);

    if (!resultadoFiltrado) {
        console.warn("No se encontró ningún dato para el valor:", elementoValue);
        limpiarDatos();
        circlePercent(0);
        circlePercentMovil(0);
        return;
    }

    animarCambioNumero(puntosPersonales, resultadoFiltrado.PuntosPersonales, true);
    animarCambioNumero(puntosPersonalesObjetivo, resultadoFiltrado.PuntosPersonalesObjetivo, true);
    animarCambioNumero(progresoPuntosPersonales, Math.min(resultadoFiltrado.ProgresoPuntosPersonales, 100), true);

    animarCambioNumero(activosDirectos, resultadoFiltrado.ActivosDirectos);
    animarCambioNumero(activosDirectosObjetivo, resultadoFiltrado.ActivosDirectosObjetivo);
    animarCambioNumero(progresoActivosDirectos, Math.min(resultadoFiltrado.ProgresoActivosDirectos, 100), true);

    animarCambioNumero(VQ, resultadoFiltrado.VQ, true);
    animarCambioNumero(vqObjetivo, resultadoFiltrado.VQObjetivo, true);
    animarCambioNumero(progresoVQ, Math.min(resultadoFiltrado.ProgresoVQ, 100), true);

    const pp = Math.min(resultadoFiltrado.ProgresoPuntosPersonales, 100);
    const ad = Math.min(resultadoFiltrado.ProgresoActivosDirectos, 100);
    const vq = Math.min(resultadoFiltrado.ProgresoVQ, 100);

    let porcentajeFinal = 0;
    if (elementoValue < 2) {
        porcentajeFinal = pp;
    } else if (elementoValue < 3) {
        porcentajeFinal = pp * 0.2 + ad * 0.1 + vq * 0.7;
    } else if (elementoValue < 5) {
        porcentajeFinal = pp * 0.2 + ad * 0.15 + vq * 0.65;
    } else if (elementoValue < 7) {
        porcentajeFinal = pp * 0.2 + ad * 0.2 + vq * 0.6;
    } else if (elementoValue < 9) {
        porcentajeFinal = pp * 0.2 + ad * 0.25 + vq * 0.55;
    } else {
        porcentajeFinal = pp * 0.2 + ad * 0.3 + vq * 0.5;
    }

        const porcentajeActual = parseFloat(number.textContent) || 0;
        animarCirclePercent(porcentajeActual, porcentajeFinal);
        circlePercentMovil(porcentajeFinal);
        circlePercent(porcentajeFinal);

    percentageMovil.textContent = `${Math.floor(porcentajeFinal)}%`;
}

function actualizarTHeadTablaModal(elementoValue) {
    let texto = 'VQ';
    let elementoValueNumber = parseInt(elementoValue);
    const nivel = nivelesVQ.find(n => n.value === elementoValueNumber);
    if (elementoValueNumber > 0 && nivel) {
        texto = nivel.label;
    }

    document.getElementById('columna-dinamica-header').textContent = texto;

    fetch('Index.aspx/ListaVQDirectos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            const datosFiltrados = data.d.slice(0, -3);
            const tablaBody = document.querySelector('#tablaVQ tbody');

            // Limpiar el contenido anterior (opcional)
            tablaBody.innerHTML = '';

            // Renderizar tabla
            datosFiltrados.forEach(item => {
                const fila = document.createElement('tr');

                // Si nivel es válido, usamos su columna. Si no, mostramos '-'.
                const valorDinamico = nivel ? item[nivel.columna] : '-';

                fila.innerHTML = `
                            <td>${item.idSocio}</td>
                            <td>${item.empresario}</td>
                            <td>${item.vg}</td>
                            <td>${valorDinamico}</td>
                        `;
                tablaBody.appendChild(fila);
            });
        })
        .catch(error => {
            console.error('Error al consumir el servicio:', error);
        });
}

document.getElementById('openModalBtn').addEventListener('click', function () {
    const rangoObjetivo = document.getElementById('rangoObjetivo').value;
    actualizarTHeadTablaModal(rangoObjetivo);
});

document.getElementById('openModalBtn2').addEventListener('click', function () {
    const rangoObjetivo = document.getElementById('rangoObjetivo').value;
    actualizarTHeadTablaModal(rangoObjetivo);
});

$(document).ready(function () {
    const openBtn = document.getElementById('openModalBtn');
    const openBtn2 = document.getElementById('openModalBtn2');
    const closeBtn = document.getElementById('closeModalBtn');
    const modal = document.getElementById('modalOverlay');

    openBtn.addEventListener('click', () => modal.style.display = 'flex');
    openBtn2.addEventListener('click', () => modal.style.display = 'flex');
    closeBtn.addEventListener('click', () => modal.style.display = 'none');
    modal.addEventListener('click', e => {
        if (e.target === modal) modal.style.display = 'none';
    });

    // Barra de progreso circular inicial
    const contenedor = document.getElementById("datosProgreso");

    const VQActual = parseFloat(contenedor.dataset.vqActual || 0);;
    const VQProximo = parseFloat(contenedor.dataset.vqProximo || 0);
    const PorcentajeV = parseFloat(contenedor.dataset.porcentaje || 0);
    const progresoInicial = (VQProximo.value === "0") ? 0 : parseFloat(PorcentajeV.value || 0);

    $("#valuePercentage, #valuePercentage2").attr("data-percentage", progresoInicial);

    // Progress bar socios activos
    const SociosActivos = contenedor.dataset.activosSociosPb;
    const TotalSocios = contenedor.dataset.totalSociosPb;
    if (SociosActivos && TotalSocios && TotalSocios.value > 0) {
        const progresoSocios = (SociosActivos.value / TotalSocios.value) * 100;
        $("#progressbar2").width(progresoSocios + '%').text(`${progresoSocios.toFixed(1)}%`);
    }

    // Progress bar 3
    const currentCount = 144;
    const progresoContador = (currentCount / 300) * 100;
    $("#progressbar3").width(progresoContador + '%').text(`${progresoContador.toFixed(1)}%`);

    // Dropdown
    const selectRangoObjetivo = document.getElementById('rangoObjetivo');

    // Obtener rangos y datos
    Promise.all([
        fetch('Index.aspx/ListaRangoDatos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json()),

        fetch('Index.aspx/ListaRangoObjetivo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json()),

        fetch('Index.aspx/ObtenerRangoDefault', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
    ])
        .then(([rangoDatosResponse, rangoObjetivoResponse, rangoDefault]) => {
            listaRangosDatos = rangoDatosResponse.d;
            console.log(rangoDefault);
            // Llenamos el select
            rangoObjetivoResponse.d.forEach(e => {
                const option = document.createElement('option');
                option.value = e.IdRango;
                option.text = e.Rango;
                selectRangoObjetivo.appendChild(option);
            });

            // Selección automática del primer rango real
            if (rangoObjetivoResponse.d.length > 0) {
                const valorInicial = rangoObjetivoResponse.d[0].IdRango;
                selectRangoObjetivo.value = rangoDefault.d;
                actualizarDatosPorRango(rangoDefault.d);
            }

            // Buscar el primer rango con EstadoUpline == true
            const valueEstadoUpline = rangoObjetivoResponse.d[0].EstadoUpline;
            if (valueEstadoUpline === 0) {
                document.getElementById("btnAbrirVentana").style.display = "none";
                document.getElementById("btnMoreInformation").style.display = "none";
            }
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });

    selectRangoObjetivo.addEventListener('change', function () {
        actualizarDatosPorRango(this.value);
    });
});