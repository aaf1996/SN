/* Obtener id socio de la interfaz */
//const paragraph = document.getElementById('idsocio');
//const fullText = paragraph.textContent;
//const codigoSocio = fullText.split('ID: ')[1].trim();


//const showNumber = true;
//const historicalCommission = 0;
//const animatedNumberElement = document.getElementById('animatedNumber');

//axios.post('GestionMonedero.aspx/ObtenerTotalDisponibleMonederoPorEmpresario',
//    {
//        idpais: '01',
//        idsocio: codigoSocio
//    })
//    .then(response => {
//        console.log(response.data.d.totDispoMone);
//        if (showNumber) {
//            setTimeout(function () {
//                animateNumber(animatedNumberElement, 0, response.data.d.totDispoMone, 2000);
//            }, 1500); // 1000 milisegundos = 1 segundo
//        }

//    })
//    //.then(fillTable2())
//    .catch(error => {
//        console.error(error);
//    });

//Cambio de axios a fetch
const paragraph = document.getElementById('idsocio');
const fullText = paragraph.textContent;
const codigoSocio = fullText.split('ID: ')[1].trim();

const showNumber = true;
const animatedNumberElement = document.getElementById('animatedNumber');

fetch('GestionMonedero.aspx/ObtenerTotalDisponibleMonederoPorEmpresario', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        idpais: '01',
        idsocio: codigoSocio
    })
})
    .then(response => response.json())
    .then(data => {
        if (showNumber) {
            setTimeout(() => {
                animateNumber(animatedNumberElement, 0, data.d.totDispoMone, 2000);
            }, 1500); // 1500 milisegundos = 1.5 segundos
        }
    })
    .catch(error => {
        console.error("Error al obtener el total del monedero:", error);
    });


//const selectTable1 = document.getElementById('periodo');
//const firstOption = document.createElement('option');
//firstOption.text = 'Seleccione:';
//firstOption.value = '0';
//selectTable1.appendChild(firstOption);// Obtén el elemento del párrafo y extrae el texto

//axios.post('GestionMonedero.aspx/ListaMesComisionValidadaMonederoByCliente',
//    {
//        idpais: '01',
//        idsocio: codigoSocio
//    })
//    .then(response => {
//        //console.log(response);
//        response.data.d.forEach(e => {
//            const option = document.createElement('option');
//            option.text = e.descMes;
//            option.value = e.descMes;
//            selectTable1.appendChild(option);
//        })
//    })
//    //.then(fillTable2())
//    .catch(error => {
//        console.error(error);
//    });

//Cambio de axios a fetch
const selectTable1 = document.getElementById('periodo');
const firstOption = document.createElement('option');
firstOption.text = 'Seleccione:';
firstOption.value = '0';
selectTable1.appendChild(firstOption); // Agregar la opción por defecto

fetch('GestionMonedero.aspx/ListaMesComisionValidadaMonederoByCliente', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        idpais: '01',
        idsocio: codigoSocio
    })
})
    .then(response => response.json())
    .then(data => {
        data.d.forEach(e => {
            const option = document.createElement('option');
            option.text = e.descMes;
            option.value = e.descMes;
            selectTable1.appendChild(option);
        });
    })
    .catch(error => {
        console.error("Error al obtener los meses de comisión:", error);
    });

function searchSelect() {
    const btnConsultar = document.getElementById('btnConsultar');
    if (selectTable1.value === '0') {
        btnConsultar.disabled = true;
        btnConsultar.classList.add('button--disabled');
    } else {
        btnConsultar.disabled = false;
        btnConsultar.classList.remove('button--disabled');
    }
}

function unblockedBtnTransferenciaFondos() {
    const btnCargarArchivos = document.getElementById('btnTransferirFondos');
    if (selectTable1.value !== '0') {
        btnCargarArchivos.disabled = false;
        btnCargarArchivos.classList.remove('button--disabled');
    } else {
        btnCargarArchivos.disabled = true;
        //btnCargarArchivos.classList.add('button--disabled');
    }
}
unblockedBtnTransferenciaFondos();

// Función para formatear números con comas y dos decimales
function formatNumberWithCommas(value) {
    let [integerPart, decimalPart] = value.toString().split('.'); // Separa la parte entera y decimal

    integerPart = parseInt(integerPart, 10).toLocaleString('en-US'); // Formatea la parte entera

    if (decimalPart !== undefined) {
        // Limita los decimales a 2 dígitos
        decimalPart = decimalPart.slice(0, 2);
        return `${integerPart}.${decimalPart}`; // Combina la parte entera y decimal
    } else {
        // Añade ".00" si no hay parte decimal
        return `${integerPart}.00`;
    }
}
function formatCurrency(value) {
    return parseFloat(value).toLocaleString("es-US", { // Primer convertimos de String a Decimal con parseFloat, luego convertirmos de decimal a String en formato US para los decimales.
        minimumFractionDigits: 2, //que si o si vean 2 decimales. Si es 1000 saldría 1,000.00
        maximumFractionDigits: 2 //en caso tenga mas de 2 decimales se redondea a 2 decimales.
    });
}

//---------- LLENADO DE LA COMISIONES --------------------------
//document.getElementById('btnConsultar').addEventListener('click', function () {
//    const select = document.getElementById('periodo');

//    axios.post('GestionMonedero.aspx/ObtenerComisionMensualDisponiblePorEmpresario',
//        {
//            idpais: '01',
//            idsocio: codigoSocio,
//            mesComisionValidada: select.value
//        })
//        .then(response => {
//            console.log(response);
//            document.getElementById("valorComiDispo").textContent = formatCurrency(response.data.d.comiDisponible) || "0.00";
//            document.getElementById("inputMontTransfer").classList.remove("details__input__disabled");
//            document.getElementById("inputMontTransfer").disabled = false;
//        })
//        .catch(error => {
//            console.error(error);
//        });
//});

//Cambio de axios a fetch
document.getElementById('btnConsultar').addEventListener('click', function () {
    const select = document.getElementById('periodo');

    fetch('GestionMonedero.aspx/ObtenerComisionMensualDisponiblePorEmpresario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            idpais: '01',
            idsocio: codigoSocio,
            mesComisionValidada: select.value
        })
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById("valorComiDispo").textContent = formatCurrency(data.d.comiDisponible) || "0.00";
            document.getElementById("inputMontTransfer").classList.remove("details__input__disabled");
            document.getElementById("inputMontTransfer").disabled = false;
        })
        .catch(error => {
            console.error("Error al obtener la comisión disponible:", error);
        });
});


function limpiarCampos() {
    const selectPeriodo = document.getElementById('periodo');
    selectPeriodo.value = '0';
    selectPeriodo.disabled = false;

    document.getElementById('valorComiDispo').textContent = '0.00';
    document.getElementById('id-empresario').value = '';
    document.getElementById('empresario').textContent = '-';

    //const selectDestinyTransfer = document.getElementById('destino-transferencia');
    //selectDestinyTransfer.value = '0';

    searchSelect();
    unblockedBtnTransferenciaFondos();

    if (document.getElementById('destino-transferencia').value === '1') {
        document.getElementById('inputMontTransfer').value = '';
        document.getElementById("inputMontTransfer").disabled = true;
        document.getElementById("inputMontTransfer").classList.add("details__input__disabled");
        document.getElementById('messageErrorMiMone').classList.add('hiddenMessageError');
    }
    if (document.getElementById('destino-transferencia').value === '2') {
        document.getElementById('inputMontTransfer').value = '';
        document.getElementById("inputMontTransfer").disabled = false;
        document.getElementById("inputMontTransfer").classList.remove("details__input__disabled");
        document.getElementById('messageError').classList.add('hiddenMessageError');
    }
}
function limpiarCamposFinal() {
    const selectPeriodo = document.getElementById('periodo');
    selectPeriodo.value = '0';
    selectPeriodo.disabled = false;

    document.getElementById('valorComiDispo').textContent = '0.00';
    document.getElementById('id-empresario').value = '';
    document.getElementById('empresario').textContent = '-';

    //const selectDestinyTransfer = document.getElementById('destino-transferencia');
    //selectDestinyTransfer.value = '0';

    searchSelect();
    unblockedBtnTransferenciaFondos();

    if (document.getElementById('destino-transferencia').value === '1') {
        document.getElementById('inputMontTransfer').value = '';
        document.getElementById("inputMontTransfer").disabled = true;
        document.getElementById("inputMontTransfer").classList.add("details__input__disabled");
    }
    if (document.getElementById('destino-transferencia').value === '2') {
        document.getElementById('inputMontTransfer').value = '';
        document.getElementById("inputMontTransfer").disabled = false;
        document.getElementById("inputMontTransfer").classList.remove("details__input__disabled");
        document.getElementById("destino-transferencia").value='0';
    }
    toggleEmpresarioContainer();
}

document.getElementById('btnLimpiar').addEventListener('click', function () {
    limpiarCampos();
});

//document.getElementById('inputMontTransfer').addEventListener('input', function (e) {
//    let value = e.target.value.replace(/,/g, ''); // Remove commas
//    let formattedValue = parseFloat(value).toLocaleString('en-US', {
//        minimumFractionDigits: 2,
//        maximumFractionDigits: 2
//    });
//    e.target.value = isNaN(formattedValue) ? '' : formattedValue;
//});

//document.getElementById('inputMontTransfer').addEventListener('blur', function (e) {

//});
function handleBlur(e) {
    let value = e.target.value.replace(/,/g, ''); // Remueve comas
    if (!isNaN(value) && value.length > 0) {
        let [integerPart, decimalPart] = value.split('.'); // Separa la parte entera y decimal

        integerPart = parseInt(integerPart, 10).toLocaleString('en-US'); // Formatea la parte entera

        if (decimalPart !== undefined) {
            // Limita los decimales a 2 dígitos
            decimalPart = decimalPart.slice(0, 2);
            //e.target.value = `${integerPart}.${decimalPart}`; // Combina la parte entera y decimal
            if (decimalPart.length === 1) {
                e.target.value = `${integerPart}.${decimalPart}0`;
            } else {
                e.target.value = `${integerPart}.${decimalPart}`;
            }
        } else {
            // Añade ".00" si no hay parte decimal
            e.target.value = `${integerPart}.00`;
        }
    } else {
        e.target.value = '';
    }
    if (document.getElementById('destino-transferencia').value === "1") {
        const montoMonederoDispo = document.getElementById("valorComiDispo").textContent;
        let montoTransferir = document.getElementById("inputMontTransfer").value;

        // Si el campo de transferencia está vacío, establecerlo en 0
        montoTransferir = montoTransferir === "" ? 0 : montoTransferir;

        // Función para convertir el valor a decimal eliminando separadores de miles
        const convertirADecimal = (valor) => {
            return parseFloat(valor.toString().replace(/,/g, ''));
        };

        // Convertir ambos valores a números decimales
        let montoMonederoDispoDecimal = convertirADecimal(montoMonederoDispo);
        let montoTransferirDecimal = convertirADecimal(montoTransferir);

        // Validar si el monto ingresado es NaN (no válido)
        if (isNaN(montoTransferirDecimal)) {
            document.getElementById("messageErrorMiMone").classList.add("hiddenMessageError");
        } else {
            if (montoTransferirDecimal === 0) {
                // Si el monto a transferir es 0
                document.getElementById("messageErrorMiMone").classList.add("hiddenMessageError");
                document.getElementById("btnTransferirFondos").disabled = true;
            } else if (montoTransferirDecimal <= montoMonederoDispoDecimal) {
                // Si el monto a transferir es menor o igual al disponible
                document.getElementById("messageErrorMiMone").classList.add("hiddenMessageError");
                document.getElementById("btnTransferirFondos").disabled = false;
                //if (document.getElementById("searchButton").disabled === false) {
                //    document.getElementById("btnTransferirFondos").disabled = false;
                //}
            } else {
                // Si el monto a transferir excede el disponible
                document.getElementById("messageErrorMiMone").classList.remove("hiddenMessageError");
                document.getElementById("btnTransferirFondos").disabled = true;
            }
        }
    }else if (document.getElementById('destino-transferencia').value === "2") {
        const montoMonederoDispo = document.getElementById("animatedNumber").textContent;
        let montoTransferir = document.getElementById("inputMontTransfer").value;

        // Si el campo de transferencia está vacío, establecerlo en 0
        montoTransferir = montoTransferir === "" ? 0 : montoTransferir;

        // Función para convertir el valor a decimal eliminando separadores de miles
        const convertirADecimal = (valor) => {
            return parseFloat(valor.toString().replace(/,/g, ''));
        };

        // Convertir ambos valores a números decimales
        let montoMonederoDispoDecimal = convertirADecimal(montoMonederoDispo);
        let montoTransferirDecimal = convertirADecimal(montoTransferir);

        // Validar si el monto ingresado es NaN (no válido)
        if (isNaN(montoTransferirDecimal)) {
            document.getElementById("messageError").classList.add("hiddenMessageError");
        } else {
            if (montoTransferirDecimal === 0) {
                // Si el monto a transferir es 0
                document.getElementById("messageError").classList.add("hiddenMessageError");
                document.getElementById("searchButton").disabled = true;
            } else if (montoTransferirDecimal <= montoMonederoDispoDecimal) {
                // Si el monto a transferir es menor o igual al disponible
                document.getElementById("messageError").classList.add("hiddenMessageError");
                document.getElementById("searchButton").disabled = false;
                //if (document.getElementById("searchButton").disabled === false) {
                //    document.getElementById("btnTransferirFondos").disabled = false;
                //}
            } else {
                // Si el monto a transferir excede el disponible
                document.getElementById("messageError").classList.remove("hiddenMessageError");
                document.getElementById("searchButton").disabled = true;
            }
        }

        //// Verificar si el valor contiene comas (separador de miles)
        //let montoMonederoDispoDecimal = 0;
        //let montoTransferirDecimal = 0;
        //if (montoMonederoDispo.includes(',')) {
        //    // Eliminar el separador de miles (coma) y convertir a número decimal
        //    montoMonederoDispoDecimal = parseFloat(montoMonederoDispo.replace(/,/g, ''));
        //} else {
        //    // Convertir a número decimal sin modificar el valor
        //    montoMonederoDispoDecimal = parseFloat(montoMonederoDispo);
        //}
        //if (montoTransferir.includes(',')) {
        //    // Eliminar el separador de miles (coma) y convertir a número decimal
        //    montoTransferirDecimal = parseFloat(montoTransferir.replace(/,/g, ''));
        //} else {
        //    // Convertir a número decimal sin modificar el valor
        //    montoTransferirDecimal = parseFloat(montoTransferir);
        //} if (montoTransferirDecimal === NaN) {
        //    document.getElementById("messageError").classList.add("hiddenMessageError");
        //} else {
        //    if (montoTransferirDecimal === 0) {
        //        document.getElementById("messageError").classList.add("hiddenMessageError");
        //        document.getElementById("searchButton").disabled = true;
        //    } else if (montoTransferirDecimal <= montoMonederoDispoDecimal) {
        //        document.getElementById("messageError").classList.add("hiddenMessageError");
        //        document.getElementById("searchButton").disabled = false;
        //    } else {
        //        document.getElementById("messageError").classList.remove("hiddenMessageError");
        //        document.getElementById("searchButton").disabled = true;
        //    }
        //}
    }
}

function handleInput(e) {
    //document.getElementById("btnTransferirFondos").disabled = true;
    let value = e.target.value.replace(/[^\d.]/g, ''); // Permite solo números y puntos
    let [integerPart, decimalPart] = value.split('.'); // Separa la parte entera y decimal

    if (decimalPart !== undefined) {
        // Limita los decimales a 2 dígitos
        decimalPart = decimalPart.slice(0, 2);
        e.target.value = `${integerPart}.${decimalPart}`;
        //if (decimalPart.length === 1) {
        //    e.target.value = `${integerPart}.${decimalPart}0`;
        //} else {
        //    e.target.value = `${integerPart}.${decimalPart}`;
        //}
    } else {
        e.target.value = value;
    }

    //const inputMontTransfer = document.getElementById('inputMontTransfer');
    //if (inputMontTransfer) {
    //    const btnTransferirFondos = document.getElementById("btnTransferirFondos");
    //    console.log(inputMontTransfer.value);
    //    console.log(typeof inputMontTransfer.value);
    //    console.log(parseInt(inputMontTransfer.value));
    //    if (inputMontTransfer.value === '') {
    //        btnTransferirFondos.disabled = true;
    //        btnTransferirFondos.classList.add("button--disabled")
    //    } else {
    //        btnTransferirFondos.disabled = false;
    //        btnTransferirFondos.classList.remove("button--disabled")
    //    }
    //}
}

function handleInputIdCliente(e) {
    document.getElementById("btnTransferirFondos").disabled = true;
}


/* mostrar y ocultar Detalles del Empresario a trasnferir*/
function toggleEmpresarioContainer() {
    const select = document.getElementById('destino-transferencia');
    const empresarioContainer = document.querySelector('.business-details');
    const blockSelectPeriodoComission = document.getElementById('blockSelectPeriodoComission');
    const transfer__details = document.getElementById('transfer__details');
    const container__parent = document.querySelector('.container-parent');
    const searchButton = document.getElementById('searchButton');

    if (select.value === "0") { // Si selecciona "SELECCIONE"
        limpiarCampos();
        empresarioContainer.classList.remove('show');
        blockSelectPeriodoComission.style.display = "none";
        transfer__details.style.display = "none";
        container__parent.classList.add("containerParent__heightMovil");
        searchButton.disabled = true;
    } else if (select.value === "1") { // Si selecciona "MI MONEDERO"
        limpiarCampos();
        empresarioContainer.classList.remove('show');
        blockSelectPeriodoComission.style.display = "block";
        transfer__details.style.display = "grid";
        container__parent.classList.remove("containerParent__heightMovil");
        searchButton.disabled = true;
    } else if (select.value === "2") {// Si selecciona "OTRO"
        limpiarCampos();
        empresarioContainer.classList.add('show');
        blockSelectPeriodoComission.style.display = "none";
        transfer__details.style.display = "grid";
        container__parent.classList.remove("containerParent__heightMovil");
        document.getElementById("inputMontTransfer").disabled = false;
        document.getElementById("inputMontTransfer").classList.remove("details__input__disabled");
    }
}
toggleEmpresarioContainer();

/*animateNumber for TOTAL DISPONIBLE MONEDERO*/
function animateNumber(element, start, end, duration) {
    let startTime = null;

    function updateNumber(currentTime) {
        if (!startTime) startTime = currentTime;
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const currentNumber = progress * (end - start) + start;

        // Formatear el número con separadores de miles y dos decimales
        element.textContent = new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(currentNumber);

        element.classList.add('animate');

        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            element.classList.remove('animate');
        }
    }

    requestAnimationFrame(updateNumber);
}

document.getElementById('id-empresario').addEventListener('input', function () {
    var empresario = document.getElementById('empresario');
    empresario.textContent = '-';
});

document.getElementById('searchButton').addEventListener('click', function () {
    sendDataAjax();    
});

function sendDataAjax() {
    // Obtener el valor del input donde se ingresa el idCliente
    const idClienteConsulta = document.getElementById('id-empresario').value;
    const empresario = document.getElementById('empresario');
    const idClienteLogueadoElement = document.getElementById('idClienteLogueado');
    const idClienteLogueadoText = idClienteLogueadoElement ? idClienteLogueadoElement.textContent : '';  // Obtiene el texto del elemento

    const idCliente = idClienteLogueadoText.split('ID: ')[1].trim();  // Separa el texto en 'ID: ' y toma la segunda parte

    $.ajax({
        type: "POST",
        url: "GestionMonedero.aspx/ConsultarSocioTransferenciaMonedero",
        data: JSON.stringify({
            idClienteBase: idCliente, idClienteConsulta: idClienteConsulta
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            empresario.textContent = 'Hubo un problema al realizar la solicitud. Por favor, intenta nuevamente.';
        },
        success: function (data) {
            console.log(data);
            if (data.d.length !== 0) {
                //console.log(data.d);  // Mostrar los datos devueltos en la consola
                //console.log(data.d[0].nombre);
                //let nombresCompletos = data.d[0].nombre + " " + data.d[0].apellidoPat + " " + data.d[0].apellidoMat;

                //console.log(nombresCompletos);
                if (data.d[0].Resultado === "El Id consultado es Correcto") {
                    empresario.textContent = data.d[0].NombresYApellidos;
                    document.getElementById("btnTransferirFondos").disabled = false;
                } else {
                    if (idClienteConsulta !== idCliente) {
                        empresario.textContent = data.d[0].Resultado;
                        document.getElementById("btnTransferirFondos").disabled = true;
                    } else {
                        empresario.textContent = "Ha ingresado su propio Id Cliente.";
                        document.getElementById("btnTransferirFondos").disabled = true;
                    }
                }
            } else {
                empresario.textContent = 'No se encontró al empresario. Por favor, intenta nuevamente.';
                document.getElementById("btnTransferirFondos").disabled = true;
            }
        }
    });
}



/* ------- ARRASTRAR PARA COLOCAR TODA LA COMISION DEL MES SELECCIONADO EN INPUT MONTO A TRANSFERIR ------------ */
// Permitir que el área de drop acepte el evento
function allowDrop(event) {
    event.preventDefault();
}

// Lógica al iniciar el arrastre, se almacena el contenido en dataTransfer
function drag(event) {
    const valor = event.target.textContent.trim();  // Obtener el texto del span
    event.dataTransfer.setData("text", valor);  // Pasar el valor al evento
}

// Lógica para recibir el dato al soltar
function drop(event) {
    event.preventDefault();  // Prevenir comportamiento por defecto

    // Obtener el dato arrastrado
    const valor = event.dataTransfer.getData("text");

    // Verificar si el valor contiene comas (separador de miles)
    let montoDecimal;
    if (valor.includes(',')) {
        // Eliminar el separador de miles (coma) y convertir a número decimal
        montoDecimal = parseFloat(valor.replace(/,/g, ''));
    } else {
        // Convertir a número decimal sin modificar el valor
        montoDecimal = parseFloat(valor);
    }

    console.log(montoDecimal);  // Verificar el valor numérico
    console.log(typeof montoDecimal);  // Asegurarse que sea un número

    // Asignar el valor formateado al input de monto a transferir
    const input = document.getElementById("inputMontTransfer");

    // Mostrar el valor con comas si es mayor a 999, sin comas si es menor
    input.value = montoDecimal >= 1000
        ? montoDecimal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        : montoDecimal.toFixed(2);  // Mostrar siempre con 2 decimales

    // Habilitar o deshabilitar el botón de transferencia según el valor
    if (montoDecimal > 0) {
        btnTransferirFondos.disabled = false;
        //btnTransferirFondos.classList.remove("button--disabled");
    } else {
        btnTransferirFondos.disabled = true;
        //btnTransferirFondos.classList.add("button--disabled");
    }
}


/* ------------------------- PROCESO DEL BOTON TRANSFERIR FONDOS --------------------------------- */
// Obtener los elementos del DOM
const btnTransferirFondos = document.getElementById('btnTransferirFondos');
const inputMontTransfer = document.getElementById('inputMontTransfer');
const valorComiDispo = document.getElementById('valorComiDispo');
const empresario = document.getElementById('empresario');

// Escuchar el clic en el botón de Transferir Fondos
btnTransferirFondos.addEventListener('click', function () {
    const destino__transferencia = document.getElementById("destino-transferencia");
    const select = document.getElementById('periodo');

    if (destino__transferencia.value === "1") {// MI MONEDERO
        // Convertir los valores a números
        const comisionDisponible = valorComiDispo.textContent;

        const comisionDisponibleDecimal = parseFloat(comisionDisponible.replace(/,/g, ''));

        const montoTransferir = inputMontTransfer.value;
        // Eliminar el separador de miles (coma) y luego convertir a número decimal
        const montoDecimal = parseFloat(montoTransferir.replace(/,/g, ''));

        // Validar si el monto a transferir es mayor que la comisión disponible
        if (montoDecimal > comisionDisponibleDecimal) {
            // Mostrar una alerta con SweetAlert2
            Swal.fire({
                icon: 'error',
                title: 'Monto excedido',
                html: `
                <p style="text-wrap: pretty;">El monto que desea transferir (S/. ${montoDecimal}) excede la comisión disponible (S/. ${comisionDisponibleDecimal}).</p>
                <p style="text-wrap: balance;">Por favor, ingrese un monto que no supere su comisión disponible.</p>
            `,
                confirmButtonText: 'Entendido',
                confirmButtonColor: '#F8B808',
            });
        } else {
            if (montoTransferir === "0.00") {
                Swal.fire({
                    icon: 'error',
                    title: 'Monto inválido',
                    text: 'El monto ingresado es S/. 0.00. Por favor, ingrese un monto mayor a cero para continuar con la transferencia.',
                    confirmButtonText: 'Entendido',
                    confirmButtonColor: '#F8B808',
                });
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Aviso Importante',
                    html: `
                <p style="text-wrap: pretty;">Se transferirá un monto de S/. ${montoTransferir} a su monedero.</p>
                <p style="text-wrap: balance;">Esta acción no es reversible, una vez realizada tenga presente que no se abonará en su cuenta el monto transferido.</p>
            `,
                    showCancelButton: true,
                    cancelButtonText: "CANCELAR",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "CONFIRMAR",
                    confirmButtonColor: '#008C27',
                    reverseButtons: true,
                }).then((result) => {
                    if (result.isConfirmed) {
                        $.ajax({
                            type: "POST",
                            url: "GestionMonedero.aspx/RegisterTransactionCommissionToWallet",
                            data: JSON.stringify({
                                idPais: '01',
                                idSocio: codigoSocio,
                                monto: montoDecimal,
                                mesComiValidada: select.value
                            }),
                            contentType: 'application/json; charset=utf-8',
                            dataType: 'json',
                            error: function (xhr, ajaxOptions, thrownError) {
                                console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
                                //empresario.textContent = 'Hubo un problema al realizar la transferencia. Por favor, intenta nuevamente.';
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Error de sistema',
                                    text: 'Hubo un problema al realizar la transferencia. Intente nuevamente.',
                                    confirmButtonColor: '#F8B808'
                                });
                            },
                            success: function (data) {
                                console.log(data);
                                const mensaje = data.d; // lo que devuelva el SP
                                if (mensaje.includes("Error")) {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Saldo insuficiente',
                                        text: mensaje, // "Error, no tiene saldo suficiente para esta transacción"
                                        confirmButtonColor: '#F8B808'
                                    });
                                } else {
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Transferencia exitosa',
                                        text: `El monto de S/. ${montoTransferir} ha sido transferido a su monedero correctamente.`,
                                        confirmButtonColor: '#F8B808'
                                    }).then(() => {
                                        location.reload();
                                    });
                                }
                            }
                        });

                        //Swal.fire({
                        //    title: "Transferencia válida",
                        //    text: `El monto de S/. ${montoTransferir} ha sido transferido a su monedero correctamente.`,
                        //    icon: "success",
                        //    confirmButtonColor: '#F8B808',
                        //});
                        //document.getElementById('destino-transferencia').value = "0";
                        //limpiarCampos();  // Limpia los campos tras la confirmación
                        //toggleEmpresarioContainer();
                    }
                }); 
            }
        }        
    } else if (destino__transferencia.value === "2") {// OTRO MONEDERO
        const animatedNumber = document.getElementById("animatedNumber").textContent;
        const valorDecimal = parseFloat(animatedNumber.replace(/,/g, ''));
        const idClienteConsulta = document.getElementById('id-empresario').value;

        const montoTransferir = inputMontTransfer.value;

        // Verificar si el campo de monto está vacío
        if (!montoTransferir) {
            Swal.fire({
                icon: 'error',
                title: 'Monto requerido',
                text: 'Por favor, ingrese un monto para continuar con la transferencia.',
                confirmButtonText: 'Entendido',
                confirmButtonColor: '#F8B808',
            });
            return;
        }

        // Eliminar el separador de miles (coma) y luego convertir a número decimal
        const montoDecimal = parseFloat(montoTransferir.replace(/,/g, ''));

        // Validar si el monto a transferir es mayor que la comisión disponible
        if (montoDecimal > valorDecimal) {
            Swal.fire({
                icon: 'error',
                title: 'Monto excedido',
                html: `
                <p style="text-wrap: pretty;">El monto que desea transferir (S/. ${montoTransferir}) excede la comisión disponible (S/. ${valorDecimal}).</p>
                <p style="text-wrap: balance;">Por favor, ingrese un monto que no supere su comisión disponible.</p>
            `,
                confirmButtonText: 'Entendido',
                confirmButtonColor: '#F8B808',
            });
            return;
        }

        // Validar si el monto es 0.00
        if (montoTransferir === "0.00") {
            Swal.fire({
                icon: 'error',
                title: 'Monto inválido',
                text: 'El monto ingresado es S/. 0.00. Por favor, ingrese un monto mayor a cero para continuar con la transferencia.',
                confirmButtonText: 'Entendido',
                confirmButtonColor: '#F8B808',
            });
            return;
        }

        // Si todas las validaciones se pasan, mostrar aviso importante
        Swal.fire({
            icon: 'warning',
            title: 'Aviso Importante',
            html: `
            <p style="text-wrap: pretty;">Se transferirá de su monedero un monto de S/. ${montoTransferir} al monedero de ${empresario.textContent}.</p>
            <p style="text-wrap: balance;">Tenga en cuenta que esta acción no es reversible.</p>
        `,
            showCancelButton: true,
            cancelButtonText: "CANCELAR",
            cancelButtonColor: "#d33",
            confirmButtonText: "CONFIRMAR",
            confirmButtonColor: '#008C27',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    type: "POST",
                    url: "GestionMonedero.aspx/RegisterTransfersAndTransactionsBetweenWallets",
                    data: JSON.stringify({
                        idSocioEmi: codigoSocio,
                        idSocioRecep: idClienteConsulta,
                        monto: montoDecimal,
                        idPais: '01'
                    }),
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    error: function (xhr, ajaxOptions, thrownError) {
                        console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
                        //empresario.textContent = 'Hubo un problema al realizar la transferencia. Por favor, intenta nuevamente.';
                    },
                    success: function (data) {
                        console.log(data);
                        Swal.fire({
                            icon: 'success',
                            title: 'Transferencia exitosa',
                            text: `Se ha transferido S/. ${montoTransferir} de su monedero al monedero de ${empresario.textContent}.`,
                            confirmButtonColor: '#F8B808'
                        }).then(() => {
                            location.reload();
                        });
                    }
                });
            }
        });
    }
});