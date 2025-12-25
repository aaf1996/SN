// DEFINIR VARIABLES
var tabla;

if (jQuery.fn.DataTable.isDataTable('#tbl_lista_pago_comi')) {
    jQuery('#tbl_lista_pago_comi').DataTable().destroy();
}

// Configuración de selectMesComiAdmi
const selectPais = document.getElementById('pais');

// Configuración de selectMesComiAdmi
const selectMesComiAdmi = document.getElementById('mesComiAdmi');
// Agregar opción de loader al inicio
const loadingOptionMes = document.createElement('option');
loadingOptionMes.text = 'Cargando...';
loadingOptionMes.disabled = true;
loadingOptionMes.selected = true;
selectMesComiAdmi.appendChild(loadingOptionMes);

// Hacer ambas solicitudes simultáneamente con Promise.all
//Promise.all([
//    axios.post('ListaPagoComisiones.aspx/ListaMesComisionAdmin', {})
//    //axios.post('GestionComisiones.aspx/ListaEstadoComisionAdmin', {})
//])
//    .then(responses => {
//        // Manejar respuesta de ListaMesComisionAdmin
//        selectMesComiAdmi.innerHTML = '';  // Remover el loader

//        responses[0].data.d.forEach((e) => {
//            const option = document.createElement('option');
//            option.text = e.descMes;
//            option.value = e.descMes;
//            selectMesComiAdmi.appendChild(option);
//        });
//        //Obtenemos el objeto con el codMes mayor, del array de objetos 'responses[0].data.d'
//        const maxCodMesObj = responses[0].data.d.reduce((max, current) => {
//            return parseInt(current.codMes, 10) > parseInt(max.codMes, 10) ? current : max;
//        });
//        if (maxCodMesObj) {
//            selectMesComiAdmi.value = maxCodMesObj.descMes;
//        }

//        // Actualizar la tabla después de cargar ambos selects
//        updateTable();
//    })
//    .catch(error => {
//        console.error("Error en las solicitudes:", error);
//    });

//Cambio de axios a fetch
Promise.all([
    fetch('ListaPagoComisiones.aspx/ListaMesComisionAdmin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    }).then(res => res.json())
])
    .then(responses => {
        // Manejar respuesta de ListaMesComisionAdmin
        selectMesComiAdmi.innerHTML = '';  // Remover el loader

        responses[0].d.forEach((e) => {
            const option = document.createElement('option');
            option.text = e.descMes;
            option.value = e.descMes;
            selectMesComiAdmi.appendChild(option);
        });

        // Obtener el objeto con el codMes mayor
        const maxCodMesObj = responses[0].d.reduce((max, current) => {
            return parseInt(current.codMes, 10) > parseInt(max.codMes, 10) ? current : max;
        });

        if (maxCodMesObj) {
            selectMesComiAdmi.value = maxCodMesObj.descMes;
        }

        // Actualizar la tabla después de cargar ambos selects
        updateTable();
    })
    .catch(error => {
        console.error("Error en las solicitudes:", error);
    });


function formatCurrency(value) {
    return parseFloat(value).toLocaleString("es-US", { // Primer convertimos de String a Decimal con parseFloat, luego convertirmos de decimal a String en formato US para los decimales.
        minimumFractionDigits: 2, //que si o si vean 2 decimales. Si es 1000 saldría 1,000.00
        maximumFractionDigits: 2 //en caso tenga mas de 2 decimales se redondea a 2 decimales.
    });
}

//function updateTable() {
//    // Obtener los valores seleccionados de los selects
//    const idPais = selectPais.value;
//    const mesComi = selectMesComiAdmi.value;
//    console.log(idPais);
//    console.log(mesComi);
//    // Agregar el loader al tbody
//    const tbody = document.getElementById('tbl_body_table');
//    tbody.innerHTML = '<tr><td colspan="18" style="text-align: center;"><div class="loader"></div></td></tr>'; // Ajusta el número de columnas según tu tabla

//    axios.post('ListaPagoComisiones.aspx/ObtenerPagosComisionTesorería', {
//        idpais: idPais,
//        mesComi: mesComi
//    }, {
//        headers: {
//            'Content-Type': 'application/json'
//        }
//    })
//        .then(response => {
//            const data = response.data.d;

//            // Destruir DataTable si ya está inicializado
//            if ($.fn.DataTable.isDataTable('#tbl_lista_pago_comi')) {
//                $('#tbl_lista_pago_comi').DataTable().destroy();
//            }

//            // Limpiar el contenido del tbody
//            tbody.innerHTML = '';

//            // Crear filas para cada elemento de datos
//            data.forEach(item => {
//                const row = document.createElement('tr');

//                // Determinar el estado de aprobación
//                let estadoAprobacion;
//                switch (item.EstadoAprobacionMesComision) {
//                    case 0:
//                        estadoAprobacion = 'Pendiente';
//                        break;
//                    case 1:
//                        estadoAprobacion = 'Revisión';
//                        break;
//                    case 2:
//                        estadoAprobacion = 'Aprobado MLM';
//                        break;
//                    case 3:
//                        estadoAprobacion = 'Aprobado Contabilidad';
//                        break;
//                    case 4:
//                        estadoAprobacion = 'Aprobado Tesorería';
//                        break;
//                    default:
//                        estadoAprobacion = '';
//                }

//                row.innerHTML = `
//                    <td>${item.IdEmpresario || ''}</td>
//                    <td>${item.Dni || ''}</td>
//                    <td>${item.RUC || ''}</td>
//                    <td>${item.Empresario || ''}</td>
//                    <td>${item.Pais || ''}</td>
//                    <td>${item.MesComision || ''}</td>
//                    <td>${(formatCurrency(item.ComisionTotal) || '') === 'NaN' ? '' : formatCurrency(item.ComisionTotal) }</td>
//                    <td>${(formatCurrency(item.ComisionTotalSinIGV) || '') === 'NaN' ? '' : formatCurrency(item.ComisionTotalSinIGV) }</td>
//                    <td>${(formatCurrency(item.IGV) || '') === 'NaN' ? '' : formatCurrency(item.IGV) }</td>
//                    <td>${(formatCurrency(item.Detraccion) || '') === 'NaN' ? '' : formatCurrency(item.Detraccion) }</td>
//                    <td>${(formatCurrency(item.ComisionDisponible) || '') === 'NaN' ? '' : formatCurrency(item.ComisionDisponible) }</td>
//                    <td>${estadoAprobacion}</td>
//                    <td><button type="button" title="${item.ArchivoXML}" class="btn btn-success btn-purple">Descargar</button></td>
//                    <td><button type="button" title="${item.ArchivoPDF}" class="btn btn-success btn-purple">Ver</button></td>
//                    <td><button type="button" title="Detalle por Bono" class="btn btn-success btn-purple"><i class="fa fa-search"></i></button></td>
//                    <td><button type="button" title="Detalle por Descuento" class="btn btn-success btn-purple"><i class="fa fa-search"></i></button></td>
//                `;
//                tbody.appendChild(row);

//                // Ahora añadimos el evento 'click' para cada botón
//                const btnXML = row.querySelectorAll('button')[0]; // Primer botón
//                const btnPDF = row.querySelectorAll('button')[1]; // Segundo botón
//                const btnDetalleBono = row.querySelectorAll('button')[2]; // Tercer botón
//                const btnDetalleDesc = row.querySelectorAll('button')[3]; // Cuarto botón

//                // Asegurarnos de que el IdEmpresario está presente antes de añadir el evento
//                if (item.IdEmpresario) {
//                    btnXML.addEventListener('click', function (event) {
//                        downloadXML(event, item.ArchivoXML);
//                    });
//                    btnPDF.addEventListener('click', function (event) {
//                        openPDF(event, item.ArchivoPDF);
//                    });
//                    btnDetalleBono.addEventListener('click', function (event) {
//                        openModalDetalleXBono(event, item.IdEmpresario);
//                    });
//                    btnDetalleDesc.addEventListener('click', function (event) {
//                        openModalDetalleDeDesc(event, item.IdEmpresario);
//                    });
//                }
//            });

//            // Re-inicializar DataTable
//            $('#tbl_lista_pago_comi').DataTable();
//        })
//        .catch(error => {
//            console.error("Error al obtener datos:", error);
//        });
//}

//Cambio de axios a fetch
function updateTable() {
    // Obtener los valores seleccionados de los selects
    const idPais = selectPais.value;
    const mesComi = selectMesComiAdmi.value;
    console.log(idPais);
    console.log(mesComi);

    // Agregar el loader al tbody
    const tbody = document.getElementById('tbl_body_table');
    tbody.innerHTML = '<tr><td colspan="18" style="text-align: center;"><div class="loader"></div></td></tr>'; // Ajusta el número de columnas según tu tabla

    fetch('ListaPagoComisiones.aspx/ObtenerPagosComisionTesorería', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idpais: idPais,
            mesComi: mesComi
        })
    })
        .then(res => res.json())
        .then(response => {
            const data = response.d;

            // Destruir DataTable si ya está inicializado
            if ($.fn.DataTable.isDataTable('#tbl_lista_pago_comi')) {
                $('#tbl_lista_pago_comi').DataTable().destroy();
            }

            // Limpiar el contenido del tbody
            tbody.innerHTML = '';

            // Crear filas para cada elemento de datos
            data.forEach(item => {
                const row = document.createElement('tr');

                // Determinar el estado de aprobación
                let estadoAprobacion;
                switch (item.EstadoAprobacionMesComision) {
                    case 0:
                        estadoAprobacion = 'Pendiente';
                        break;
                    case 1:
                        estadoAprobacion = 'Revisión';
                        break;
                    case 2:
                        estadoAprobacion = 'Aprobado MLM';
                        break;
                    case 3:
                        estadoAprobacion = 'Aprobado Contabilidad';
                        break;
                    case 4:
                        estadoAprobacion = 'Aprobado Tesorería';
                        break;
                    default:
                        estadoAprobacion = '';
                }

                row.innerHTML = `
                <td>${item.IdEmpresario || ''}</td>
                <td>${item.Dni || ''}</td>
                <td>${item.RUC || ''}</td>
                <td>${item.Empresario || ''}</td>
                <td>${item.Pais || ''}</td>
                <td>${item.MesComision || ''}</td>
                <td>${(formatCurrency(item.ComisionTotal) || '') === 'NaN' ? '' : formatCurrency(item.ComisionTotal)}</td>
                <td>${(formatCurrency(item.ComisionTotalSinIGV) || '') === 'NaN' ? '' : formatCurrency(item.ComisionTotalSinIGV)}</td>
                <td>${(formatCurrency(item.IGV) || '') === 'NaN' ? '' : formatCurrency(item.IGV)}</td>
                <td>${(formatCurrency(item.Detraccion) || '') === 'NaN' ? '' : formatCurrency(item.Detraccion)}</td>
                <td>${(formatCurrency(item.ComisionDisponible) || '') === 'NaN' ? '' : formatCurrency(item.ComisionDisponible)}</td>
                <td>${estadoAprobacion}</td>
                <td><button type="button" title="${item.ArchivoXML}" class="btn btn-success btn-purple">Descargar</button></td>
                <td><button type="button" title="${item.ArchivoPDF}" class="btn btn-success btn-purple">Ver</button></td>
                <td><button type="button" title="Detalle por Bono" class="btn btn-success btn-purple"><i class="fa fa-search"></i></button></td>
                <td><button type="button" title="Detalle por Descuento" class="btn btn-success btn-purple"><i class="fa fa-search"></i></button></td>
            `;
                tbody.appendChild(row);

                // Ahora añadimos el evento 'click' para cada botón
                const btnXML = row.querySelectorAll('button')[0]; // Primer botón
                const btnPDF = row.querySelectorAll('button')[1]; // Segundo botón
                const btnDetalleBono = row.querySelectorAll('button')[2]; // Tercer botón
                const btnDetalleDesc = row.querySelectorAll('button')[3]; // Cuarto botón

                // Asegurarnos de que el IdEmpresario está presente antes de añadir el evento
                if (item.IdEmpresario) {
                    btnXML.addEventListener('click', function (event) {
                        downloadXML(event, item.ArchivoXML);
                    });
                    btnPDF.addEventListener('click', function (event) {
                        openPDF(event, item.ArchivoPDF);
                    });
                    btnDetalleBono.addEventListener('click', function (event) {
                        openModalDetalleXBono(event, item.IdEmpresario);
                    });
                    btnDetalleDesc.addEventListener('click', function (event) {
                        openModalDetalleDeDesc(event, item.IdEmpresario);
                    });
                }
            });

            // Re-inicializar DataTable
            $('#tbl_lista_pago_comi').DataTable();
        })
        .catch(error => {
            console.error("Error al obtener datos:", error);
        });
}


selectMesComiAdmi.addEventListener('change', updateTable);

function downloadXML(event, archivoXML) {
    event.preventDefault();

    fetch(archivoXML)
        .then(response => {
            if (!response.ok) { // si el servidor devuelve un estado distinto de 200, entonces response.ok es false y como se niega con ! sería true
                throw new Error('No se pudo acceder al archivo. Puede que esté fuera de línea o no disponible.');
            }
            return response.blob(); // convierte el contenido de la respuesta HTTP en un Blob, que es un objeto binario que puede representarse como un archivo descargable.
        })
        .then(blob => {
            const url = URL.createObjectURL(blob);// Crea URL temporal del Blob
            const tempLink = document.createElement('a');
            // Usar URL para descarga
            tempLink.href = url;
            tempLink.download = archivoXML.split('/').pop(); // se divide la cadena en un array y se obtiene el último elemento con pop() para usarlo como nombre del archivo descargado.
            document.body.appendChild(tempLink); // se agrega el enlace al final del elemento <body>
            tempLink.click(); // Se ejecuta la acción de clic en el enlace
            document.body.removeChild(tempLink); // se elimina del DOM el enlace creado
            URL.revokeObjectURL(url); // Se elimina la URL temporal del Blob, para liberar recursos
        })
        .catch(error => {
            if (error.message.includes('No se pudo acceder al archivo')) {
                alert('No se pudo acceder al archivo. Verifica que el archivo esté disponible y la URL sea correcta.');
            } else {
                alert('Hubo un problema al procesar el archivo. Intenta nuevamente.');
            }
        });
}

function openPDF(event, archivoPDF) {
    event.preventDefault();
    window.open(archivoPDF, '_blank');
}

//function openModalDetalleXBono(event, idEmpresario) {
//    // Evitar la acción por defecto del botón
//    event.preventDefault();

//    // Obtener los valores seleccionados de los selects
//    const idPais = selectPais.value;
//    const mesComi = selectMesComiAdmi.value;

//    // Agregar el loader al tbody del modal
//    const tbody = document.getElementById('tbl_body_detalle_bono');
//    tbody.innerHTML = '<tr><td colspan="14" style="text-align: center;"><div class="loader"></div></td></tr>';

//    // Llamada AJAX para obtener los datos del SP
//    axios.post('ListaPagoComisiones.aspx/ObtenerBonosPorComisionTesoreria', {
//        idpais: idPais,
//        idsocio: idEmpresario,
//        mesComi: mesComi
//    }, {
//        headers: {
//            'Content-Type': 'application/json'
//        }
//    })
//        .then(response => {
//            const data = response.data.d;

//            // Limpiar el contenido del tbody
//            tbody.innerHTML = '';
            
//            // Mostrar el modal
//            $('#modalDetalleXBono').modal('show');

//            // Verificar si los datos son nulos o están vacíos
//            if (!data || data.length === 0) {
//                tbody.innerHTML = `
//                    <tr>
//                        <td colspan="14" style="text-align: center;">No hay datos disponibles</td>
//                    </tr>
//                `;
//                return;
//            }

//            // Crear filas para cada elemento de datos
//            data.forEach(item => {
//                const row = document.createElement('tr');

//                row.innerHTML = `
//                <td>${item.BonoAfiliaMes || ''}</td>
//                <td>${item.BonoLiderazgoMes || ''}</td>
//                <td>${item.BonoGeneracion360Mes || ''}</td>
//                <td>${item.BonoSuperGeneracion360Mes || ''}</td>
//                <td>${item.BonoMatricialMes || ''}</td>
//                <td>${item.BonoMercadeoMes || ''}</td>
//                <td>${item.BonoAguinaldoMes || ''}</td>
//                <td>${item.BonoPermanenciaMes || ''}</td>
//                <td>${item.BonoArranqueExplosivoBronce || ''}</td>
//                <td>${item.BonoArranqueExplosivoPatrocinio || ''}</td>
//                <td>${item.BonoArranqueExplosivoOro || ''}</td>
//                <td>${item.BonoRegularizacion || ''}</td>
//                <td>${item.AdicionalTerceros || ''}</td>
//                <td>${(formatCurrency(item.Total) || '') === 'NaN' ? '' : formatCurrency(item.Total)}</td>
//            `;
//                tbody.appendChild(row);
//            });
//        })
//        .catch(error => {
//            console.error("Error al obtener los datos:", error);
//        });
//}

//Cambio de axios a fetch
function openModalDetalleXBono(event, idEmpresario) {
    // Evitar la acción por defecto del botón
    event.preventDefault();

    // Obtener los valores seleccionados de los selects
    const idPais = selectPais.value;
    const mesComi = selectMesComiAdmi.value;

    // Agregar el loader al tbody del modal
    const tbody = document.getElementById('tbl_body_detalle_bono');
    tbody.innerHTML = '<tr><td colspan="14" style="text-align: center;"><div class="loader"></div></td></tr>';

    // Llamada fetch para obtener los datos del SP
    fetch('ListaPagoComisiones.aspx/ObtenerBonosPorComisionTesoreria', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idpais: idPais,
            idsocio: idEmpresario,
            mesComi: mesComi
        })
    })
        .then(res => res.json())
        .then(response => {
            const data = response.d;

            // Limpiar el contenido del tbody
            tbody.innerHTML = '';

            // Mostrar el modal
            $('#modalDetalleXBono').modal('show');

            // Verificar si los datos son nulos o están vacíos
            if (!data || data.length === 0) {
                tbody.innerHTML = `
                <tr>
                    <td colspan="14" style="text-align: center;">No hay datos disponibles</td>
                </tr>
            `;
                return;
            }

            // Crear filas para cada elemento de datos
            data.forEach(item => {
                const row = document.createElement('tr');

                row.innerHTML = `
                <td>${item.BonoAfiliaMes || ''}</td>
                <td>${item.BonoLiderazgoMes || ''}</td>
                <td>${item.BonoGeneracion360Mes || ''}</td>
                <td>${item.BonoSuperGeneracion360Mes || ''}</td>
                <td>${item.BonoMatricialMes || ''}</td>
                <td>${item.BonoMercadeoMes || ''}</td>
                <td>${item.BonoAguinaldoMes || ''}</td>
                <td>${item.BonoPermanenciaMes || ''}</td>
                <td>${item.BonoArranqueExplosivoBronce || ''}</td>
                <td>${item.BonoArranqueExplosivoPatrocinio || ''}</td>
                <td>${item.BonoArranqueExplosivoOro || ''}</td>
                <td>${item.BonoRegularizacion || ''}</td>
                <td>${item.AdicionalTerceros || ''}</td>
                <td>${(formatCurrency(item.Total) || '') === 'NaN' ? '' : formatCurrency(item.Total)}</td>
            `;
                tbody.appendChild(row);
            });
        })
        .catch(error => {
            console.error("Error al obtener los datos:", error);
        });
}


//function openModalDetalleDeDesc(event, idEmpresario) {
//    // Evitar la acción por defecto del botón
//    event.preventDefault();

//    // Obtener los valores seleccionados de los selects
//    const idPais = selectPais.value;
//    const mesComi = selectMesComiAdmi.value;

//    // Agregar el loader al tbody del modal
//    const tbody = document.getElementById('tbl_body_detalle_desc');
//    tbody.innerHTML = '<tr><td colspan="14" style="text-align: center;"><div class="loader"></div></td></tr>';

//    // Llamada AJAX para obtener los datos del SP
//    axios.post('ListaPagoComisiones.aspx/ObtenerDescuentosPorTransaccionTesoreria', {
//        idpais: idPais,
//        idsocio: idEmpresario,
//        mesComi: mesComi
//    }, {
//        headers: {
//            'Content-Type': 'application/json'
//        }
//    })
//        .then(response => {
//            const data = response.data.d;
//            console.log(data);
//            // Limpiar el contenido del tbody
//            tbody.innerHTML = '';
            
//            // Mostrar el modal
//            $('#modalDetalleXDescuento').modal('show');

//            // Verificar si los datos son nulos o están vacíos
//            if (!data || data.length === 0) {
//                tbody.innerHTML = `
//                    <tr>
//                        <td colspan="14" style="text-align: center;">No hay datos disponibles</td>
//                    </tr>
//                `;
//                return;
//            }

//            // Crear filas para cada elemento de datos
//            data.forEach(item => {
//                const row = document.createElement('tr');

//                row.innerHTML = `
//                <td>${item.Orden || ''}</td>
//                <td>${item.IdTransaccion || ''}</td>
//                <td>${item.IdMonedero || ''}</td>
//                <td>${(formatCurrency(item.Monto) || '') === 'NaN' ? '' : formatCurrency(item.Monto)}</td>
//                <td>${(formatCurrency(item.Balance_Previo) || '') === 'NaN' ? '' : formatCurrency(item.Balance_Previo)}</td>
//                <td>${(formatCurrency(item.Nuevo_Balance) || '') === 'NaN' ? '' : formatCurrency(item.Nuevo_Balance)}</td>
//                <td>${item.Referencia || ''}</td>
//                <td>${item.Fecha_Operacion || ''}</td>                
//            `;
//                tbody.appendChild(row);
//            });
//        })
//        .catch(error => {
//            console.error("Error al obtener los datos:", error);
//        });
//}

//Cambio de axios a fetch
function openModalDetalleDeDesc(event, idEmpresario) {
    // Evitar la acción por defecto del botón
    event.preventDefault();

    // Obtener los valores seleccionados de los selects
    const idPais = selectPais.value;
    const mesComi = selectMesComiAdmi.value;

    // Agregar el loader al tbody del modal
    const tbody = document.getElementById('tbl_body_detalle_desc');
    tbody.innerHTML = '<tr><td colspan="14" style="text-align: center;"><div class="loader"></div></td></tr>';

    // Llamada fetch para obtener los datos del SP
    fetch('ListaPagoComisiones.aspx/ObtenerDescuentosPorTransaccionTesoreria', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idpais: idPais,
            idsocio: idEmpresario,
            mesComi: mesComi
        })
    })
        .then(res => res.json())
        .then(response => {
            const data = response.d;
            console.log(data);

            // Limpiar el contenido del tbody
            tbody.innerHTML = '';

            // Mostrar el modal
            $('#modalDetalleXDescuento').modal('show');

            // Verificar si los datos son nulos o están vacíos
            if (!data || data.length === 0) {
                tbody.innerHTML = `
                <tr>
                    <td colspan="14" style="text-align: center;">No hay datos disponibles</td>
                </tr>
            `;
                return;
            }

            // Crear filas para cada elemento de datos
            data.forEach(item => {
                const row = document.createElement('tr');

                row.innerHTML = `
                <td>${item.Orden || ''}</td>
                <td>${item.IdTransaccion || ''}</td>
                <td>${item.IdMonedero || ''}</td>
                <td>${(formatCurrency(item.Monto) || '') === 'NaN' ? '' : formatCurrency(item.Monto)}</td>
                <td>${(formatCurrency(item.Balance_Previo) || '') === 'NaN' ? '' : formatCurrency(item.Balance_Previo)}</td>
                <td>${(formatCurrency(item.Nuevo_Balance) || '') === 'NaN' ? '' : formatCurrency(item.Nuevo_Balance)}</td>
                <td>${item.Referencia || ''}</td>
                <td>${item.Fecha_Operacion || ''}</td>                
            `;
                tbody.appendChild(row);
            });
        })
        .catch(error => {
            console.error("Error al obtener los datos:", error);
        });
}


function cerrarModal() {
    $('#modalDetalleXBono').modal('hide'); // Abrir el modal
}
function cerrarModalDescuento() {
    $('#modalDetalleXDescuento').modal('hide'); // Abrir el modal
}
document.getElementById('closeModalButton').addEventListener('click', cerrarModal);
document.getElementById('closeModalDescuentoButton').addEventListener('click', cerrarModalDescuento);