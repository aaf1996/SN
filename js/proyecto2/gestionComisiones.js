// DEFINIR VARIABLES
var tabla;

if (jQuery.fn.DataTable.isDataTable('#tbl_facturacion')) {
    jQuery('#tbl_facturacion').DataTable().destroy();
}

// Configuración de selectMesComiAdmi
const selectMesComiAdmi = document.getElementById('mesComiAdmi');
// Agregar opción de loader al inicio
const loadingOptionMes = document.createElement('option');
loadingOptionMes.text = 'Cargando...';
loadingOptionMes.disabled = true;
loadingOptionMes.selected = true;
selectMesComiAdmi.appendChild(loadingOptionMes);

// Configuración de selectEstadoComiAdmi
const selectEstadoComiAdmi = document.getElementById('estadoComi');
// Agregar opción de loader al inicio
const loadingOptionEstado = document.createElement('option');
loadingOptionEstado.text = 'Cargando...';
loadingOptionEstado.disabled = true;
loadingOptionEstado.selected = true;
selectEstadoComiAdmi.appendChild(loadingOptionEstado);

// Hacer ambas solicitudes simultáneamente con Promise.all
//Promise.all([
//    axios.post('GestionComisiones.aspx/ListaMesComisionAdmin', {}),
//    axios.post('GestionComisiones.aspx/ListaEstadoComisionAdmin', {})
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

//        // Manejar respuesta de ListaEstadoComisionAdmin
//        selectEstadoComiAdmi.innerHTML = '';  // Remover el loader
//        responses[1].data.d.forEach(e => {
//            const option = document.createElement('option');
//            option.value = e.idEstado;
//            option.text = e.descEstado;
//            selectEstadoComiAdmi.appendChild(option);
//        });
//        selectEstadoComiAdmi.value = '0'; // Seleccionar valor por defecto

//        // Actualizar la tabla después de cargar ambos selects
//        updateTable();
//    })
//    .catch(error => {
//        console.error("Error en las solicitudes:", error);
//    });

//Cambio de axios a fetch
Promise.all([
    fetch('GestionComisiones.aspx/ListaMesComisionAdmin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
    }).then(response => response.json()),

    fetch('GestionComisiones.aspx/ListaEstadoComisionAdmin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
    }).then(response => response.json())
])
    .then(([responseMeses, responseEstados]) => {
        // Manejar respuesta de ListaMesComisionAdmin
        selectMesComiAdmi.innerHTML = ''; // Remover el loader

        responseMeses.d.forEach(e => {
            const option = document.createElement('option');
            option.text = e.descMes;
            option.value = e.descMes;
            selectMesComiAdmi.appendChild(option);
        });

        // Obtener el objeto con el codMes mayor
        const maxCodMesObj = responseMeses.d.reduce((max, current) =>
            parseInt(current.codMes, 10) > parseInt(max.codMes, 10) ? current : max
        );

        if (maxCodMesObj) {
            selectMesComiAdmi.value = maxCodMesObj.descMes;
        }

        // Manejar respuesta de ListaEstadoComisionAdmin
        selectEstadoComiAdmi.innerHTML = ''; // Remover el loader

        responseEstados.d.forEach(e => {
            const option = document.createElement('option');
            option.value = e.idEstado;
            option.text = e.descEstado;
            selectEstadoComiAdmi.appendChild(option);
        });

        selectEstadoComiAdmi.value = '0'; // Seleccionar valor por defecto

        // Actualizar la tabla después de cargar ambos selects
        updateTable();
    })
    .catch(error => {
        console.error("Error en las solicitudes:", error);
    });


//function updateTable() {
//    // Obtener los valores seleccionados de los selects
//    const mesComi = selectMesComiAdmi.value;
//    const estado = selectEstadoComiAdmi.value;

//    // Agregar el loader al tbody
//    const tbody = document.getElementById('tbl_body_table');
//    tbody.innerHTML = '<tr><td colspan="18" style="text-align: center;"><div class="loader"></div></td></tr>'; // Ajusta el número de columnas según tu tabla

//    // Realizar la solicitud para obtener los datos de la tabla con los valores seleccionados
//    axios.post('GestionComisiones.aspx/ListaTablaComiXMesAdminYEstado', {
//        idpais: '01', // o el valor que necesites
//        mesComi: mesComi,
//        estado: estado
//    })
//        .then(response => {
//            const data = response.data.d;

//            // Destruir DataTable si ya está inicializado
//            if ($.fn.DataTable.isDataTable('#tbl_facturacion')) {
//                $('#tbl_facturacion').DataTable().destroy();
//            }

//            // Limpiar el contenido del tbody
//            tbody.innerHTML = '';

//            // Crear filas para cada elemento de datos
//            data.forEach(item => {
//                const row = document.createElement('tr');
//                row.innerHTML = `
//                <td>${item.IdSocio || ''}</td>
//                <td>${item.DNI || ''}</td>
//                <td>${item.NombreCompleto || ''}</td>
//                <td><button value="red" title="red" class="btn btn-success btn-blue"><i class="fa fa-network-wired"></i></button></td>
//                <td>${item.EstadoComision || ''}</td>
//                <td>${item.RUC || ''}</td>
//                <td>${item.IdFacturado3ro || ''}</td>
//                <td>${item.Conformidad === "" ? "" : (item.Conformidad !== 'No Presenta porque la comisión es menor a S/500' ? `<a href="https://tienda.mundosantanatura.com/comisiones/conformidad/${item.Conformidad}" class="btn btn-link" target="_blank" style="display: flex; justify-content: center; align-items: center; grid-gap: 5px; color: #5F2D8C">${item.Conformidad}</a>` : item.Conformidad)}</td>
//                <td>${(estado === '1' && estado !== '3' && estado !== '4') ? (item.Conformidad === "" ? "" : `<button title="Rechazar" class="btn btn-danger btn-orange" onclick="handleButtonRechazarConformidad(event, '${item.IdSocio}','${item.Conformidad}')">✖</button><button title="Aprobar" class="btn btn-success btn-orange" onclick="handleButtonConfirmConformidad(event, '${item.IdSocio}')">✔</button>`) : ''}</td>
//                <td>${`<button value="red" title="red" class="btn btn-success btn-reds" onclick="openModalRevisar(event, '${item.IdSocio}','${item.RUC}')"><i class="fa fa-search"></i></button>`}</td>
//                <td>${(item.RUC !== '' && estado === '1') ? `<button value="red" title="red" class="btn btn-success btn-green" onclick="openModalValidarMLM(event, '${item.IdSocio}','${item.NombreCompleto}')"><i class="fa fa-check"></i></button>` : ''}</td>
//                <td>${(item.RUC !== '' && estado === '2') ? `<button value="red" title="red" class="btn btn-success btn-green" onclick="openModalValidarConta(event, '${item.IdSocio}','${item.NombreCompleto}')"><i class="fa fa-check"></i></button>` : ''}</td>
//                <td>${(estado !== '0' && estado !== '1' && estado !== '2' && estado !== '4') ? `<button value="red" title="red" class="btn btn-success btn-green" onclick="openModalValidarTeso(event, '${item.IdSocio}')"><i class="fa fa-check"></i></button>` : ''}</td>
//                <td>${item.Estado || ''}</td>
//                <td>${item.EstadoMonedero || ''}</td>
//                <td>${(item.EstadoComision === 'Rezagado' && estado === '3') ? '<button value="red" title="red" class="btn btn-success btn-purple" onclick="openModalTDM(event, `${ item.IdSocio }`)"><i class="fa fa-coins"></i></button>' : ''}</td>
//                <td>${(estado === '2') ? (`<button title="ConfirmarExoneración" class="btn btn-success" onclick="handleButtonConfirmExoneration(event, '${item.IdSocio}')">✔</button>`) : ''}</td>
//                <td style="display: none;">${item.IdPeriodo || ''}</td>
//            `;
//                tbody.appendChild(row);
//            });

//            // Re-inicializar DataTable
//            //<td>${(item.EstadoComision === 'Rezagado' && estado === '3') ? '<button value="red" title="red" class="btn btn-success btn-purple" onclick="openModalTDM(event, `${ item.IdSocio }`)"><i class="fa fa-coins"></i></button>' : ''}</td>
//            //<td>${(estado === '0') ? `<button value="red" title="red" class="btn btn-success btn-purple" onclick="openModalTDM(event, '${ item.IdSocio }')"><i class="fa fa-coins"></i></button>` : ''}</td>
//            $('#tbl_facturacion').DataTable();
//        })
//        .catch(error => {
//            console.error("Error al obtener datos:", error);
//        });
//}

//Cambio de axios a fetch
function updateTable() {
    // Obtener los valores seleccionados de los selects
    const mesComi = selectMesComiAdmi.value;
    const estado = selectEstadoComiAdmi.value;

    // Agregar el loader al tbody
    const tbody = document.getElementById('tbl_body_table');
    tbody.innerHTML = '<tr><td colspan="18" style="text-align: center;"><div class="loader"></div></td></tr>'; // Ajusta el número de columnas según tu tabla

    // Realizar la solicitud para obtener los datos de la tabla con los valores seleccionados
    fetch('GestionComisiones.aspx/ListaTablaComiXMesAdminYEstado', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            idpais: '01', // o el valor que necesites
            mesComi: mesComi,
            estado: estado
        })
    })
        .then(response => response.json())
        .then(data => {
            data = data.d; // Acceder a la propiedad correcta

            // Destruir DataTable si ya está inicializado
            if ($.fn.DataTable.isDataTable('#tbl_facturacion')) {
                $('#tbl_facturacion').DataTable().destroy();
            }

            // Limpiar el contenido del tbody
            tbody.innerHTML = '';

            // Crear filas para cada elemento de datos
            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                <td>${item.IdSocio || ''}</td>
                <td>${item.DNI || ''}</td>
                <td>${item.NombreCompleto || ''}</td>
                <td><button value="red" title="red" class="btn btn-success btn-blue"><i class="fa fa-network-wired"></i></button></td>
                <td>${item.EstadoComision || ''}</td>
                <td>${item.RUC || ''}</td>
                <td>${item.FechaSubida || ''}</td>
                <td>${item.FechaAprobadoMLM || ''}</td>
                <td>${item.IdFacturado3ro || ''}</td>
                <td>${item.Conformidad === "" ? "" : (item.Conformidad !== 'No Presenta porque la comisión es menor a S/500' ? `<a href="https://tienda.mundosantanatura.com/comisiones/conformidad/${item.Conformidad}" class="btn btn-link" target="_blank" style="display: flex; justify-content: center; align-items: center; grid-gap: 5px; color: #5F2D8C">${item.Conformidad}</a>` : item.Conformidad)}</td>
                <td>${(estado === '1' && estado !== '3' && estado !== '4') ? (item.Conformidad === "" ? "" : `<button title="Rechazar" class="btn btn-danger btn-orange" onclick="handleButtonRechazarConformidad(event, '${item.IdSocio}','${item.Conformidad}')">✖</button><button title="Aprobar" class="btn btn-success btn-orange" onclick="handleButtonConfirmConformidad(event, '${item.IdSocio}')">✔</button>`) : ''}</td>
                <td>${`<button value="red" title="red" class="btn btn-success btn-reds" onclick="openModalRevisar(event, '${item.IdSocio}','${item.RUC}')"><i class="fa fa-search"></i></button>`}</td>
                <td>${(item.RUC !== '' && estado === '1') ? `<button value="red" title="red" class="btn btn-success btn-green" onclick="openModalValidarMLM(event, '${item.IdSocio}','${item.NombreCompleto}')"><i class="fa fa-check"></i></button>` : ''}</td>
                <td>${(item.RUC !== '' && estado === '2') ? `<button value="red" title="red" class="btn btn-success btn-green" onclick="openModalValidarConta(event, '${item.IdSocio}','${item.NombreCompleto}')"><i class="fa fa-check"></i></button>` : ''}</td>
                <td>${(estado !== '0' && estado !== '1' && estado !== '2' && estado !== '4') ? `<button value="red" title="red" class="btn btn-success btn-green" onclick="openModalValidarTeso(event, '${item.IdSocio}')"><i class="fa fa-check"></i></button>` : ''}</td>
                <td>${item.Estado || ''}</td>
                <td>${item.EstadoMonedero || ''}</td>
                <td>${(item.EstadoComision === 'Rezagado' && estado === '3') ? '<button value="red" title="red" class="btn btn-success btn-purple" onclick="openModalTDM(event, `${item.IdSocio}`)"><i class="fa fa-coins"></i></button>' : ''}</td>
                <td>${(estado === '2') ? (`<button title="ConfirmarExoneración" class="btn btn-success" onclick="handleButtonConfirmExoneration(event, '${item.IdSocio}')">✔</button>`) : ''}</td>
                <td style="display: none;">${item.IdPeriodo || ''}</td>
            `;
                tbody.appendChild(row);
            });

            // Re-inicializar DataTable
            $('#tbl_facturacion').DataTable({
                scrollX: true,
                columnDefs: [
                    {
                        targets: 6,
                        createdCell: function (td) {
                            td.style.minWidth = '67px';
                        }
                    }
                ]
            });
        })
        .catch(error => {
            console.error("Error al obtener datos:", error);
        });
}

selectMesComiAdmi.addEventListener('change', updateTable);
selectEstadoComiAdmi.addEventListener('change', updateTable);

//FUNCIONES PARA LINEA MULTINIVEL
$(document).on('click', '.btn-blue', function (event) {
    event.preventDefault();

    // Asegúrate de que DataTable está correctamente inicializado
    if (!$.fn.DataTable.isDataTable('#tbl_facturacion')) {
        tabla = $("#tbl_facturacion").DataTable();
    } else {
        tabla = $('#tbl_facturacion').DataTable();
    }

    // Usa el método correcto para obtener los datos de la fila
    var row = tabla.row($(this).closest('tr'));

    if (row) {
        const baseUrl = 'https://tienda.mundosantanatura.com/LineaMultinivelControlAbono.aspx?';
        const query = 'idcliente=' + row.selector.rows[0].cells[0].innerText + '&idperiodo=' + row.selector.rows[0].cells[16].innerText;
        const encodedQuery = encodeURIComponent(query);
        const url = baseUrl + encodedQuery;
        window.open(url, '_blank');
    } else {
        console.error('No se pudo obtener la fila correctamente.');
    }
});

function formatCurrency(value) {
    return parseFloat(value).toLocaleString("es-US", { // Primer convertimos de String a Decimal con parseFloat, luego convertirmos de decimal a String en formato US para los decimales.
        minimumFractionDigits: 2, //que si o si vean 2 decimales. Si es 1000 saldría 1,000.00
        maximumFractionDigits: 2 //en caso tenga mas de 2 decimales se redondea a 2 decimales.
    });
}


const mensajeValidar = `Este es el mensaje del modal Validar`;

// Arreglo para almacenar los ítems seleccionados
let itemsSeleccionados = [];

let correo = "";

const mailtoLink = document.getElementById('dynamicMailto');
const mensajeTextArea = document.getElementById('mensaje');

const inputCorreo = document.getElementById("correo");
const inputCorreoAprobarConf = document.getElementById("correoValidar");
const inputCorreoTDM = document.getElementById("correoTDM");

/* ---------------------------------- PARA APROBAR DOCUMENTO CONFORMIDAD - MULTINIVEL -------------------------------------------------- */
function handleButtonConfirmConformidad(event, idSocio) {
    event.preventDefault();

    // Mostrar el modal en lugar de la alerta SweetAlert
    $('#exampleModalAccionConf').modal('show');
    document.getElementById('tituloModalAccionConformidad').textContent = 'Aprobación de Conformidad';
    document.getElementById('descModalAccionConformidad').textContent = 'Esta acción permite aprobar el documento de conformidad. Asegúrese de verificar los datos antes de proceder';
    document.getElementById('dynamicMailto2').classList.add('btn-success');
    document.getElementById('dynamicMailto2').textContent = 'Aprobar Conformidad';
    document.getElementById('asuntoAprobarConformidad').value = `CARTA DE AUTORIZACIÓN APROBADA`;
    const textarea = document.getElementById('mensaje2');
    textarea.rows = 5;
    const contenidoTextArea = `Estimado(a) socio(a),\n\nSu Carta de Autorización ha sido aprobada.`;
    const mensajeCompleto = `${contenidoTextArea}\n\nSaludos,`;
    document.getElementById('mensaje2').value = mensajeCompleto;

    var obj = JSON.stringify({ idCLiente: idSocio });
    $.ajax({
        type: "POST",
        url: "EditarPerfil.aspx/obtenerCorreoPorIdCliente",
        data: obj,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            //console.log(result.d[0].correo)
            const resultCorreo = result.d[0].correo;
            if (resultCorreo.toLowerCase() === "x") {
                inputCorreoAprobarConf.placeholder = 'Ingrese Correo';
            } else {
                inputCorreoAprobarConf.value = result.d[0].correo;
                inputCorreoAprobarConf.disabled = true;
                correo = result.d[0].correo;
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ": " + XMLHttpRequest.responseText);
        }
    });

    // Configurar el botón "Aprobar Conformidad" dentro del modal para realizar la acción deseada
    $('#dynamicMailto2').off('click').on('click', function () {

        Swal.fire({
            title: '¿Confirmas la aprobación de la conformidad de ?',
            text: 'Esta acción es final y se guardará en el sistema.',
            icon: 'question',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Aceptar',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                const mesComi = selectMesComiAdmi.value;
                const mensajeCompleto = `${contenidoTextArea}\n\nSaludos,\n\n`;

                // Codificar los saltos de línea para el mailto
                const body = encodeURIComponent(mensajeCompleto);
                const asunto = `CARTA DE AUTORIZACIÓN APROBADA`;
                const mailtoHref = `mailto:${correo}?subject=${encodeURIComponent(asunto)}&body=${body}`;

                // Asignar el href dinámico
                mailtoLink.href = mailtoHref;

                // Disparar el mailto y cerrar el modal
                mailtoLink.click();
                document.getElementById('closeModal').click();


                var obj = JSON.stringify({ idpais: '01', idsocio: idSocio, mesComi: mesComi });
                // Si el usuario confirma, llamamos a la función actualizarMensaje
                $.ajax({
                    type: "POST",
                    url: "GestionComisiones.aspx/ActualizacionEstadoComisionAprobacionConformidad",
                    data: obj,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    success: function () {
                        Swal.fire({
                            icon: 'success',
                            title: 'Conformidad Aprobada',
                            text: 'La conformidad ha sido aprobada y registrada exitosamente en el sistema.',
                            confirmButtonColor: '#00a65a'
                        }).then(() => {
                            location.reload();
                        });
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert(textStatus + ": " + XMLHttpRequest.responseText);
                    }
                });
            }
        });
    });
}
/* ----------------------------------------------------------------------------------------------------------- */

/* --------------------------- PARA RECHAZAR DOCUMENTO CONFORMIDAD - MULTINIVEL--------------------------------- */
function handleButtonRechazarConformidad(event, idSocio, conformidad) {
    event.preventDefault();

    // Mostrar el modal en lugar de la alerta SweetAlert
    $('#exampleModalAccionConf').modal('show');

    document.getElementById('tituloModalAccionConformidad').textContent = 'Rechazo de Conformidad';
    document.getElementById('descModalAccionConformidad').textContent = 'Esta acción permite el rechazo del documento de conformidad. Asegúrese de verificar los datos antes de proceder.';

    document.getElementById('dynamicMailto2').classList.add('btn-danger');
    document.getElementById('dynamicMailto2').textContent = 'Rechazar Conformidad';

    const mesComi = selectMesComiAdmi.value;
    document.getElementById('asuntoAprobarConformidad').value = `CARTA DE AUTORIZACIÓN RECHAZADA | FALTA FIRMA DE AUTORIZACIÓN`;

    const textarea = document.getElementById('mensaje2');
    textarea.rows = 8;

    const contenidoTextArea = `Estimado(a) socio(a),\n\nSu Carta de Autorización correspondiente al mes de ${mesComi} ha sido rechazada, debe estar firmada por el dueño de la comisión. \n\n Por favor, realizar la corrección a la brevedad posible.`;
    const mensajeCompleto = `${contenidoTextArea}\n\nSaludos,`;
    document.getElementById('mensaje2').value = mensajeCompleto;

    var obj = JSON.stringify({ idCLiente: idSocio });
    $.ajax({
        type: "POST",
        url: "EditarPerfil.aspx/obtenerCorreoPorIdCliente",
        data: obj,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            //console.log(result.d[0].correo)
            const resultCorreo = result.d[0].correo;
            if (resultCorreo.toLowerCase() === "x") {
                inputCorreoAprobarConf.placeholder = 'Ingrese Correo';
            } else {
                inputCorreoAprobarConf.value = result.d[0].correo;
                inputCorreoAprobarConf.disabled = true;
                correo = result.d[0].correo;
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ": " + XMLHttpRequest.responseText);
        }
    });

    //Configurar el botón "Rechazar Conformidad" dentro del modal para realizar la acción deseada
    $('#dynamicMailto2').off('click').on('click', function () {
        Swal.fire({
            title: '¿Estás seguro de rechazar la conformidad?',
            icon: 'question',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Aceptar',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                const mesComi = selectMesComiAdmi.value;

                const mensajeCompleto = `${contenidoTextArea}\n\nSaludos,\n\n`;

                // Codificar los saltos de línea para el mailto
                const body = encodeURIComponent(mensajeCompleto);
                const asunto = `CARTA DE AUTORIZACIÓN RECHAZADA | FALTA FIRMA DE AUTORIZACIÓN`;
                const mailtoHref = `mailto:${correo}?subject=${encodeURIComponent(asunto)}&body=${body}`;

                // Asignar el href dinámico
                mailtoLink.href = mailtoHref;

                // Disparar el mailto y cerrar el modal
                mailtoLink.click();
                document.getElementById('closeModal').click();

                // Función reutilizable para realizar llamadas AJAX
                function ajaxPost(url, data) {
                    return $.ajax({
                        type: "POST",
                        url: url,
                        data: JSON.stringify(data),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json"
                    });
                }

                // Variables de datos
                const idPais = '01';
                const objActualizarEstado = { idpais: idPais, idsocio: idSocio, mesComi: mesComi };
                const objEliminarConfor = { archivo: conformidad };

                ajaxPost("GestionComisiones.aspx/EliminarArchivoConformidad", objEliminarConfor)
                    .then(() => {
                        // Paso 2: Actualizar estado de comisión
                        return ajaxPost("GestionComisiones.aspx/ActualizacionEstadoComisionRechazoConformidad", objActualizarEstado);
                    })
                    .then(() => {
                        // Mensaje de éxito
                        Swal.fire({
                            icon: 'success',
                            title: 'Conformidad Rechazada',
                            text: 'La conformidad ha sido rechazada exitosamente.',
                            confirmButtonColor: '#00a65a'
                        }).then(() => {
                            location.reload(); // Recargar la página
                        });
                    })
                    .catch((err) => {
                        // Manejo de errores
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: `Ocurrió un problema: ${err.responseText || 'No se pudo completar la acción.'}`,
                            confirmButtonColor: '#d33'
                        });
                    });

            }
        });
    });
}
/* ----------------------------------------------------------------------------------------------------------- */

/* --------------------------- PARA CONFIRMAR EXONERACIÓN --------------------------------- */
function handleButtonConfirmExoneration(event, idSocio) {
    event.preventDefault();

    Swal.fire({
        title: '¿Estás seguro que desea confirmar la exoneración?',
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Sí, Confirmar',
        reverseButtons: true,
    }).then((result) => {
        if (result.isConfirmed) {

            // Variables de datos
            const idPais = '01';
            const mesComi = selectMesComiAdmi.value;

            // Llamada al SP mediante el WebMethod
            var obj = JSON.stringify({ idPais: idPais, idSocio: idSocio, mesComi: mesComi });

            $.ajax({
                type: "POST",
                url: "GestionComisiones.aspx/ValidarExoneracion",
                data: obj,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    const resultado = response.d;

                    if (resultado === 'Actualización Realizada') {
                        Swal.fire({
                            icon: 'success',
                            title: 'Exoneración Confirmada',
                            text: 'La exoneración ha sido confirmada exitosamente.',
                            confirmButtonColor: '#00a65a'
                        }).then(() => {
                            location.reload(); // Recargar la página
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Ocurrió un problema: ' + resultado,
                            confirmButtonColor: '#d33'
                        });
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.error(`${textStatus}: ${XMLHttpRequest.responseText}`);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Ocurrió un problema al procesar la solicitud.',
                        confirmButtonColor: '#d33'
                    });
                }
            });
        }
    });
}
/* ----------------------------------------------------------------------------------------------------------- */


const closeModalAccionConf = document.getElementById('closeModalAccionConf');
// Añade el evento 'click' al botón para cerrar el modal
closeModalAccionConf.addEventListener('click', cerrarModalAccionConf);

function cerrarModalAccionConf() {
    // Evita el comportamiento predeterminado del evento
    event.preventDefault();

    let modal = document.getElementById('exampleModalAccionConf');

    // Añade la clase para la animación de salida
    modal.classList.add('fade-out');

    // Después de que termine la animación, oculta y restablece el estado del modal y su contenido
    setTimeout(() => {
        modal.classList.remove('hidden'); // Oculta completamente el modal después de la animación
        modal.classList.remove('fade-out'); // Elimina la clase de animación de salida
    }, 500); // Tiempo de la transición

    document.getElementById('dynamicMailto2').className = '';
}



function openModalRevisar(event, idSocio, ruc) {
    event.preventDefault();

    const selectEstadoComiAdmi = document.getElementById('estadoComi');
    // Asegúrate de que selectEstadoComiAdmi y ruc están definidos
    if (selectEstadoComiAdmi && selectEstadoComiAdmi.value) {
        if (selectEstadoComiAdmi.value === '0' || (selectEstadoComiAdmi.value === '1' && ruc === '') || (selectEstadoComiAdmi.value === '2' && ruc === '') || (selectEstadoComiAdmi.value === '3' && ruc !== '') || (selectEstadoComiAdmi.value === '4' && ruc !== '')) {
            $('#botones').hide();
        } else {
            $('#botones').show();
        }
    }
    $('#exampleModal').modal('show'); // Abrir el modal

    const existingBackdrop = document.querySelector('.modal-backdrop.fade.in');//Obtiene el elemento fondo oscuro del modal
    if (!existingBackdrop) {// Si no existe,
        // Crear el elemento <div>
        const modalBackdrop = document.createElement('div');

        // Asignar las clases 'modal-backdrop', 'fade' e 'in'
        modalBackdrop.classList.add('modal-backdrop', 'fade', 'in');

        // Agregar el <div> al body
        document.body.appendChild(modalBackdrop);//Agrega en el body el fondo oscuro del modal
    }

    //listTableComiEmpresario();//Me lista los valores de la tabla Comisión Empresario del modal Revisar

    var obj = JSON.stringify({ idCLiente: idSocio });
    $.ajax({
        type: "POST",
        url: "EditarPerfil.aspx/obtenerCorreoPorIdCliente",
        data: obj,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            //console.log(result.d[0].correo)
            const resultCorreo = result.d[0].correo;
            if (resultCorreo.toLowerCase() === "x") {
                inputCorreo.placeholder = 'Ingrese Correo';
            } else {
                inputCorreo.value = result.d[0].correo;
                inputCorreo.disabled = true;
                correo = result.d[0].correo;
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ": " + XMLHttpRequest.responseText);
        }
    });

    //------------------- TABLA Comisión empresario -------------------------
    var obj1 = JSON.stringify({ idpais: '01', mesComi: selectMesComiAdmi.value, idsocio: idSocio });
    $.ajax({
        type: "POST",
        url: "GestionComisiones.aspx/ObtenerTablaAdminRevisionComisionEmpresario",
        data: obj1,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {

            const tbody = document.getElementById('tblComiEmpresario__tbody');
            tbody.innerHTML = ''; // Limpiar contenido previo

            // Verifica si el resultado tiene datos válidos
            if (!result.d || Object.keys(result.d).length === 0) {
                // Crea una fila para indicar que no hay registros
                const noDataRow = document.createElement('tr');
                const noDataCell = document.createElement('td');
                noDataCell.colSpan = 4; // Ajusta el número de columnas según tu tabla
                noDataCell.textContent = "No hay registros disponibles";
                noDataCell.style.textAlign = 'center';
                noDataRow.appendChild(noDataCell);
                tbody.appendChild(noDataRow);
                document.getElementById('archivos').innerHTML = "";
                return;
            }
            //listTableComiEmpresario(result.d);

            // Crea una nueva fila
            const row = document.createElement('tr');

            // Crea y agrega las celdas a la fila con el símbolo S/. adelante
            const cellComisionSinIGV = document.createElement('td');
            cellComisionSinIGV.textContent = `S/ ${formatCurrency(result.d.ComisionTotalSinIGV.toFixed(2))}`;
            row.appendChild(cellComisionSinIGV);

            const cellIGV = document.createElement('td');
            cellIGV.textContent = `S/ ${formatCurrency(result.d.IGV.toFixed(2))}`;
            row.appendChild(cellIGV);

            const cellTotal = document.createElement('td');
            cellTotal.textContent = `S/ ${formatCurrency(result.d.ComisionTotal.toFixed(2))}`;
            row.appendChild(cellTotal);

            // Agrega la fila al tbody
            tbody.appendChild(row);

            /************************************************* */
            // Sección de Archivos
            const archivosContainer = document.getElementById('archivos');
            archivosContainer.innerHTML = "";

            if (!!result.d.PdfFactura) {
                // Construir la URL
                const pdfUrl = `https://tienda.mundosantanatura.com/comisiones/pdf/${result.d.PdfFactura}`;

                // Verificar si el archivo existe
                fetch(pdfUrl, { method: 'HEAD' })
                    .then(response => {
                        if (response.ok) {
                            // Si el archivo existe, crear el enlace
                            const pdfLinkDiv = document.createElement('div');
                            pdfLinkDiv.classList.add('col-md-6');

                            const pdfLink = document.createElement('a');
                            pdfLink.href = pdfUrl;
                            pdfLink.classList.add('btn', 'btn-link');
                            pdfLink.target = '_blank';
                            pdfLink.style.maxWidth = '284px';        
                            pdfLink.style.whiteSpace = 'nowrap';    
                            pdfLink.style.overflow = 'hidden';       
                            pdfLink.style.textOverflow = 'ellipsis'; 
                            pdfLink.style.gridGap = '5px';
                            pdfLink.style.color = '#5F2D8C';
                            pdfLink.innerHTML = `<i class="fa fa-file-pdf"></i> ${result.d.PdfFactura}`;

                            pdfLink.title = result.d.PdfFactura;

                            pdfLinkDiv.appendChild(pdfLink);
                            archivosContainer.appendChild(pdfLinkDiv);
                        } else {
                            // Si el archivo no existe, mostrar un mensaje
                            const errorMessageDiv = document.createElement('div');
                            errorMessageDiv.classList.add('col-md-6');
                            errorMessageDiv.style.color = 'red';
                            errorMessageDiv.textContent = 'El archivo no está disponible.';
                            archivosContainer.appendChild(errorMessageDiv);
                        }
                    })
                    .catch(error => {
                        console.error('Error al verificar el archivo:', error);
                        const errorDiv = document.createElement('div');
                        errorDiv.classList.add('col-md-6');
                        errorDiv.style.color = 'red';
                        errorDiv.textContent = 'Error al comprobar el archivo.';
                        archivosContainer.appendChild(errorDiv);
                    });
            }
            if (!!result.d.XmlFactura) {
                // Crear el contenedor para el enlace
                const xmlLinkDiv = document.createElement('div');
                xmlLinkDiv.classList.add('col-md-6');

                // Crear el enlace para el archivo XML
                const xmlLink = document.createElement('a');
                xmlLink.classList.add('btn', 'btn-link');
                xmlLink.style.maxWidth = '284px';
                xmlLink.style.whiteSpace = 'nowrap';
                xmlLink.style.overflow = 'hidden';
                xmlLink.style.textOverflow = 'ellipsis';
                xmlLink.style.gap = '5px';
                xmlLink.style.color = '#5F2D8C';
                xmlLink.innerHTML = `<i class="fa fa-file-code"></i> ${result.d.XmlFactura}`;

                xmlLink.title = result.d.XmlFactura;

                // Descargar el archivo usando fetch y blob
                xmlLink.addEventListener('click', async (e) => {
                    e.preventDefault(); // Evita que el enlace abra el archivo en el navegador
                    const response = await fetch(`https://tienda.mundosantanatura.com/comisiones/xml/${result.d.XmlFactura}`);
                    if (response.ok) {
                        const blob = await response.blob();
                        const url = URL.createObjectURL(blob);

                        // Crear un enlace temporal para la descarga
                        const tempLink = document.createElement('a');
                        tempLink.href = url;
                        tempLink.download = result.d.XmlFactura; // Nombre del archivo descargado
                        document.body.appendChild(tempLink);
                        tempLink.click();
                        document.body.removeChild(tempLink);

                        // Liberar el blob
                        URL.revokeObjectURL(url);
                    } else {
                        alert('No se pudo descargar el archivo. Por favor, verifica el enlace.');
                    }
                });

                xmlLinkDiv.appendChild(xmlLink);
                archivosContainer.appendChild(xmlLinkDiv);
            }


        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ": " + XMLHttpRequest.responseText);
        }
    });

    //------------------- TABLA Comisión por 3ros -------------------------
    var obj2 = JSON.stringify({ idpais: '01', mesComi: selectMesComiAdmi.value, idsocio: idSocio });
    $.ajax({
        type: "POST",
        url: "GestionComisiones.aspx/ObtenerComisionEmpresariosConformidad",
        data: obj2,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            // Selecciona el elemento tbody de la tabla
            const tbody = document.getElementById('tblComiEmpresarioConformidad__tbody');

            // Limpia el contenido previo del tbody
            tbody.innerHTML = '';

            // Verifica si hay datos
            if (!result.d || result.d.length === 0) {
                // Si no hay datos, crear una fila con un mensaje
                const noDataRow = document.createElement('tr');
                const noDataCell = document.createElement('td');
                noDataCell.colSpan = 8; // Ajusta el número de columnas según tu tabla
                noDataCell.textContent = "No hay registros disponibles";
                noDataCell.style.textAlign = 'center';
                noDataRow.appendChild(noDataCell);
                tbody.appendChild(noDataRow);
                return; // No continuar con el proceso si no hay datos
            }

            // Itera sobre cada elemento en la lista de resultados
            result.d.forEach(item => {
                // Crea una nueva fila
                const row = document.createElement('tr');

                // Crea y agrega las celdas a la fila con el símbolo S/. adelante
                const cellOrden = document.createElement('td');
                cellOrden.textContent = item.Orden;
                row.appendChild(cellOrden);

                const cellIdFacturadoTercero = document.createElement('td');
                cellIdFacturadoTercero.textContent = item.IdFacturadoTercero;
                row.appendChild(cellIdFacturadoTercero);

                const cellNombres = document.createElement('td');
                cellNombres.textContent = item.Nombres;
                row.appendChild(cellNombres);

                const cellComisionSinIGV = document.createElement('td');
                cellComisionSinIGV.textContent = `S/ ${formatCurrency(item.ComisionTotalSinIGV.toFixed(2))}`;
                row.appendChild(cellComisionSinIGV);

                const cellIGV = document.createElement('td');
                cellIGV.textContent = `S/ ${formatCurrency(item.IGV.toFixed(2))}`;
                row.appendChild(cellIGV);

                const cellTotal = document.createElement('td');
                cellTotal.textContent = `S/ ${formatCurrency(item.Total.toFixed(2))}`;
                row.appendChild(cellTotal);

                const cellDocumentoConformidad = document.createElement('td');
                if (item.DocumentoConformidad === "No Presenta porque la comisión es menor a S/500") {
                    cellDocumentoConformidad.textContent = item.DocumentoConformidad;
                } else {
                    const link = document.createElement('a');
                    link.href = `https://tienda.mundosantanatura.com/comisiones/conformidad/${item.DocumentoConformidad}`;
                    link.textContent = item.DocumentoConformidad;
                    link.target = "_blank";
                    link.style.textDecoration = "underline"; // Agrega subrayado para simular un enlace
                    link.style.color = "#007bff"; // Cambia el color para parecerse a un enlace
                    cellDocumentoConformidad.appendChild(link);
                }
                row.appendChild(cellDocumentoConformidad);

                // Agrega la fila al tbody
                tbody.appendChild(row);
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ": " + XMLHttpRequest.responseText);
        }
    });

    //------------------- TABLA Comisión total a facturar -------------------------
    var obj3 = JSON.stringify({ idpais: '01', mesComi: selectMesComiAdmi.value, idsocio: idSocio });
    $.ajax({
        type: "POST",
        url: "GestionComisiones.aspx/ObtenerTablaAdminRevisionComisionGlobal",
        data: obj3,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            //console.log(result.d);
            // Selecciona el elemento tbody de la tabla
            const tbody = document.getElementById('tblComiEmpresarioGlobal__tbody');

            // Limpia el contenido previo del tbody
            tbody.innerHTML = '';

            // Verifica si hay datos
            if (!result.d || !result.d.ComisionTotalSinIGV) {
                // Si no hay datos, crear una fila con un mensaje
                const noDataRow = document.createElement('tr');
                const noDataCell = document.createElement('td');
                noDataCell.colSpan = 5; // Ajusta el número de columnas según tu tabla
                noDataCell.textContent = "No hay registros disponibles";
                noDataCell.style.textAlign = 'center';
                noDataRow.appendChild(noDataCell);
                tbody.appendChild(noDataRow);
                return; // No continuar con el proceso si no hay datos
            }

            // Crea una nueva fila
            const row = document.createElement('tr');

            // Crea y agrega las celdas a la fila con el símbolo S/. adelante
            const cellComisionSinIGV = document.createElement('td');
            cellComisionSinIGV.textContent = `S/ ${formatCurrency(result.d.ComisionTotalSinIGV.toFixed(2))}`;
            row.appendChild(cellComisionSinIGV);

            const cellIGV = document.createElement('td');
            cellIGV.textContent = `S/ ${formatCurrency(result.d.IGV.toFixed(2))}`;
            row.appendChild(cellIGV);

            const cellTotal = document.createElement('td');
            cellTotal.textContent = `S/ ${formatCurrency(result.d.Total.toFixed(2))}`;
            row.appendChild(cellTotal);

            const cellDetraccion = document.createElement('td');
            cellDetraccion.textContent = `S/ ${formatCurrency(result.d.Detraccion.toFixed(2))}`;
            row.appendChild(cellDetraccion);

            // Agrega la fila al tbody
            tbody.appendChild(row);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ": " + XMLHttpRequest.responseText);
        }
    });

    // -------------------------------------- Rechazo de Factura ------------------------------------------
    document.getElementById('asunto').value = `Rechazo de factura Comisión mes ${selectMesComiAdmi.value}`;

    const contenidoTextArea = `Buen día, se le notifica que la factura presentada para el mes de ${selectMesComiAdmi.value} ha sido rechazada y se solicita pueda anularla y generarla nuevamente revisando los siguientes ítems:`;
    // Insertar el texto en el textarea
    actualizarMensaje(contenidoTextArea);


    const btnEliminarPDFyXML = document.getElementById('eliminarPDFyXML');
    const backBtn = document.getElementById('backBtn');
    const mainContent = document.getElementById('mainContent');
    const secondaryContent = document.getElementById('secondaryContent');
    const closeModal = document.getElementById('closeModal');

    if (mainContent && backBtn && secondaryContent && btnEliminarPDFyXML) {
        btnEliminarPDFyXML.addEventListener('click', (event) => {
            event.preventDefault();
            mainContent.classList.add('fade-out');
            setTimeout(() => {
                mainContent.classList.add('hidden');
                secondaryContent.classList.remove('hidden');
                secondaryContent.classList.remove('fade-out');
                secondaryContent.classList.add('fade-in');
            }, 500);
        });

        // Función para volver al bloque principal
        backBtn.addEventListener('click', (event) => {
            event.preventDefault(); // Evita que se recargue la página
            secondaryContent.classList.add('fade-out'); // Oculta el secundario
            setTimeout(() => {
                secondaryContent.classList.add('hidden'); // Lo oculta completamente después de la animación
                secondaryContent.classList.remove('fade-in'); // Restablece el estado de la animación
                mainContent.classList.remove('hidden'); // Muestra el principal
                mainContent.classList.remove('fade-out'); // Muestra el principal
                mainContent.classList.add('fade-in'); // Aplica la transición
            }, 500); // Tiempo de la transición
        });
    }

    $('#btnDynamicMailto').on('click', function (event) {
        event.preventDefault(); // Evitar que el enlace se abra de inmediato
        const asunto = `Rechazo de factura Comisión mes ${selectMesComiAdmi.value}`;

        if (validarCorreo()) {
            Swal.fire({
                title: '¿Está seguro de rechazar el PDF y XML?',
                text: 'Si acepta, se abrirá el correo para enviar el mensaje al empresario.',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar',
                reverseButtons: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    actualizarMensaje__asignarHref(asunto);
                }
            });
        }
    });

    function obtenerNombresArchivos(idpais, mesComi, idsocio) {
        const obj1 = JSON.stringify({ idpais, mesComi, idsocio });

        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "GestionComisiones.aspx/ObtenerTablaAdminRevisionComisionEmpresario",
                data: obj1,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: true,
                success: function (result) {
                    if (result.d) {
                        resolve({
                            pdfFactura: result.d.PdfFactura || null,
                            xmlFactura: result.d.XmlFactura || null
                        });
                    } else {
                        reject(new Error("El servicio no devolvió datos válidos."));
                    }
                },
                error: function (XMLHttpRequest, textStatus) {
                    reject(new Error(`${textStatus}: ${XMLHttpRequest.responseText}`));
                }
            });
        });
    }

    async function actualizarMensaje__asignarHref(asuntoDinamico) {
        const mesComi = selectMesComiAdmi.value;

        // Paso previo: obtener los nombres de archivo
        try {
            const nombresArchivos = await obtenerNombresArchivos('01', mesComi, idSocio);
            const nombreBaseArchivoPDF = nombresArchivos.pdfFactura || ''; // Elimina la extensión del archivo PDF
            const nombreBaseArchivoXML = nombresArchivos.xmlFactura || ''; // Elimina la extensión del archivo PDF
            if (!nombreBaseArchivoPDF) {
                throw new Error("No se encontró el nombre base del archivo PDF.");
            }
            if (!nombreBaseArchivoXML) {
                throw new Error("No se encontró el nombre base del archivo XML.");
            }

            // Datos para las solicitudes AJAX
            const objActualizarEstado = { idpais: '01', idsocio: idSocio, mesComi: mesComi };
            const objEliminarArchivos = { archivoPDF: nombreBaseArchivoPDF, archivoXML: nombreBaseArchivoXML }; // Nombre sin extensión

            //Reutilizar función para solicitudes AJAX
            function ajaxPost(url, data) {
                return $.ajax({
                    type: "POST",
                    url: url,
                    data: JSON.stringify(data),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json"
                });
            }

            // Paso 1: Eliminar los archivos PDF y XML
            ajaxPost("GestionComisiones.aspx/EliminarArchivoPDFyXML", objEliminarArchivos)
                .then(() => {
                    // Paso 2: Actualizar el estado de rechazo
                    return ajaxPost("GestionComisiones.aspx/ActualizacionRechazoRUCyPDFyXML", objActualizarEstado);
                })
                .then(() => {
                    // Paso 3: Mostrar mensaje de éxito y abrir correo
                    Swal.fire({
                        icon: 'success',
                        title: 'Rechazo procesado con éxito',
                        text: 'Los archivos PDF y XML han sido rechazados correctamente.',
                        confirmButtonColor: '#00a65a'
                    }).then(() => {
                        // Abrir correo con datos dinámicos
                        enviarCorreoRechazo(mesComi, asuntoDinamico);
                    });
                })
                .catch((err) => {
                    // Manejo de errores
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: `Ocurrió un problema: ${err.responseText || 'No se pudo completar la acción.'}`,
                        confirmButtonColor: '#d33'
                    });
                });

        } catch (error) {
            // Manejo de errores al obtener los nombres de archivo
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Ocurrió un problema al obtener el nombre del archivo: ${error.message}`,
                confirmButtonColor: '#d33'
            });
        }
    }

    function enviarCorreoRechazo(mesComi, asuntoDinamico) {
        const valueMesComiAdmi = document.getElementById('mesComiAdmi').value;
        const contenidoTextArea = `Buen día, se le notifica que la factura presentada para el mes de ${valueMesComiAdmi} ha sido rechazada y se solicita pueda anularla y generarla nuevamente revisando los siguientes ítems:`;
        const itemsString = itemsSeleccionados.length > 0 ?
            itemsSeleccionados.map(item => `- ${item}`).join('\n') :
            '- Ningún ítem seleccionado.';
        const mensajeCompleto = `${contenidoTextArea}\n\n${itemsString}\n\nSaludos,\n\n`;

        // Codificar el mensaje para el mailto
        const body = encodeURIComponent(mensajeCompleto);
        const valorNuevoCorreoIngresado = document.getElementById('correo').value;
        const copia = estadoComi === "2" ? "facturas.multinivel@santanatura.com.pe" : ""; // Solo agrega copia si es estado "2"
        const mailtoHref = `mailto:${correo === "" ? valorNuevoCorreoIngresado : correo}?subject=${encodeURIComponent(asuntoDinamico)}&body=${body}${copia ? `&cc=${encodeURIComponent(copia)}` : ""}`;

        // Asignar el href dinámico
        mailtoLink.href = mailtoHref;

        // Disparar el mailto y cerrar el modal
        mailtoLink.click();
        document.getElementById('closeModal').click();
        location.reload();
    }

    // Actualizar el href cada vez que se cambie el contenido del textarea
    mensajeTextArea.addEventListener('input', actualizarMensaje);
}

// Función para manejar los cambios en los checkboxes
function manejarCheckboxChange(event) {
    console.log(itemsSeleccionados);
    const item = event.target.value;

    if (event.target.checked) {
        // Agregar el ítem al arreglo si no existe
        if (!itemsSeleccionados.includes(item)) {
            itemsSeleccionados.push(item);
        }
    } else {
        // Eliminar el ítem del arreglo si se deselecciona
        itemsSeleccionados = itemsSeleccionados.filter(i => i !== item);
    }

    // Actualizar el mensaje y el mailto
    actualizarMensaje(mensaje);
}

function agregarListeners() {
    // Agregar event listeners a todos los checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.removeEventListener('change', manejarCheckboxChange); // Eliminar eventos duplicados
        checkbox.addEventListener('change', manejarCheckboxChange);
    });
}
agregarListeners();

function openModalValidarMLM(event, idSocio, socio) {
    event.preventDefault();
    Swal.fire({
        title: `¿Se confirma la aprobación a nivel MLM de <br> ${socio}?`,
        text: 'Esta acción es irreversible.',
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Aceptar',
        reverseButtons: true,
    }).then((result) => {

        const mesComi = selectMesComiAdmi.value;
        var obj = JSON.stringify({ idpais: '01', idsocio: idSocio, mesComi: mesComi });
        if (result.isConfirmed) {
            // Si el usuario confirma, llamamos a la función actualizarMensaje
            $.ajax({
                type: "POST",
                url: "GestionComisiones.aspx/ActualizacionEstadoComisionAprobacionMLM",
                data: obj,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function () {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Aprobación completada!',
                        text: 'La aprobación ha sido registrada exitosamente por MLM.',
                        confirmButtonColor: '#00a65a'
                    }).then(() => {
                        location.reload();
                    });
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(textStatus + ": " + XMLHttpRequest.responseText);
                }
            });
        }
    });
}

/* -------------------------------- AL DARLE VALIDAR FACTURA - CONTABILIDAD --------------------------------------------- */
function openModalValidarConta(event, idSocio, socio) {
    event.preventDefault();

    const selectMesComiAdmi = document.getElementById('mesComiAdmi').value;
    const mailtoLink = document.getElementById('dynamicMailto');

    Swal.fire({
        title: `¿Se confirma la aprobación a nivel Contabilidad de <br> ${socio}?`,
        text: 'Esta acción es irreversible.',
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Aprobar',
        reverseButtons: true,
    }).then((result) => {
        if (!result.isConfirmed) return; // Salir si no se confirma

        obtenerCorreoPorIdCliente(idSocio, (correo) => {
            if (correo.toLowerCase() === "x") {
                mostrarErrorCorreo();
                return;
            }

            const obj = JSON.stringify({ idpais: '01', idsocio: idSocio, mesComi: selectMesComiAdmi });
            generarMailto(correo, selectMesComiAdmi, mailtoLink);
            actualizarEstadoComision(obj, () => {
                mostrarExitoAprobacion(() => location.reload());
            });
        });
    });
}

function obtenerCorreoPorIdCliente(idSocio, callback) {
    const obj = JSON.stringify({ idCLiente: idSocio });
    $.ajax({
        type: "POST",
        url: "EditarPerfil.aspx/obtenerCorreoPorIdCliente",
        data: obj,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            const correo = result.d[0]?.correo || '';
            callback(correo);
        },
        error: function (XMLHttpRequest, textStatus) {
            alert(`${textStatus}: ${XMLHttpRequest.responseText}`);
        }
    });
}

function actualizarEstadoComision(obj, callback) {
    $.ajax({
        type: "POST",
        url: "GestionComisiones.aspx/ActualizacionEstadoComisionAprobacionContabilidad",
        data: obj,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function () {
            callback();
        },
        error: function (XMLHttpRequest, textStatus) {
            alert(`${textStatus}: ${XMLHttpRequest.responseText}`);
        }
    });
}

function mostrarErrorCorreo() {
    Swal.fire({
        icon: 'error',
        title: 'Correo no disponible',
        text: 'No se puede continuar con la aprobación porque el empresario no tiene un correo electrónico registrado para el envío de la confirmación.',
        confirmButtonColor: '#00a65a'
    });
}

function mostrarExitoAprobacion(callback) {
    Swal.fire({
        icon: 'success',
        title: 'Aprobación exitosa',
        text: 'La aprobación de la factura ha sido registrada correctamente por Contabilidad.',
        confirmButtonColor: '#00a65a'
    }).then(callback);
}

function generarMailto(correo, mesComi, mailtoLink) {
    const asunto = `Aprobación de factura - Comisión ${mesComi}`;
    const contenidoTextArea = `Estimado/a,\n\nSe le informa que la factura correspondiente al mes de ${mesComi} ha sido aprobada por el área de Contabilidad.`;
    const mensajeCompleto = `${contenidoTextArea}\n\nSaludos cordiales,\n\n`;

    const body = encodeURIComponent(mensajeCompleto);
    const copia = "facturas.multinivel@santanatura.com.pe";
    const mailtoHref = `mailto:${correo}?subject=${encodeURIComponent(asunto)}&body=${body}&cc=${encodeURIComponent(copia)}`;

    mailtoLink.href = mailtoHref;
    mailtoLink.click();
}


function openModalValidarTeso(event, idSocio) {
    event.preventDefault();
    Swal.fire({
        title: '¿Se confirma el pago gestionado por Tesorería?',
        text: 'Esta acción es irreversible.',
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Aceptar',
        reverseButtons: true,
    }).then((result) => {
        const mesComi = selectMesComiAdmi.value;
        var obj = JSON.stringify({ idpais: '01', idsocio: idSocio, mesComi: mesComi });
        if (result.isConfirmed) {
            // Si el usuario confirma, llamamos a la función actualizarMensaje
            $.ajax({
                type: "POST",
                url: "GestionComisiones.aspx/ActualizacionEstadoComisionAprobacionTesoreria",
                data: obj,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function () {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Actualización completada!',
                        text: 'La actualización sobre el pago al empresario ha sido registrado exitosamente por Tesorería.',
                        confirmButtonColor: '#00a65a'
                    }).then(() => {
                        location.reload();
                    });
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(textStatus + ": " + XMLHttpRequest.responseText);
                }
            });
        }
    });
}

function openModalTDM(event, idSocio, nombreCompletoSocio) {
    // Previene el comportamiento predeterminado del botón
    event.preventDefault();

    $('#exampleModalTransferirDirectoMonedero').modal('show'); // Abrir el modal

    const mesComi = selectMesComiAdmi.value;
    document.getElementById('asuntoTDM').value = `Transferencia Comisión Rezagada a Monedero ${mesComi}`;

    const textarea = document.getElementById('mensajeTDM');
    textarea.rows = 6;

    const contenidoTextArea = `Buen día ${nombreCompletoSocio},\n\nSe le notifica que su comisión rezagada de ${mesComi} ha sido transferida a su monedero según lo solicitado por usted.`;
    const mensajeCompleto = `${contenidoTextArea}\n\nSaludos,`;
    document.getElementById('mensajeTDM').value = mensajeCompleto;


    const existingBackdrop = document.querySelector('.modal-backdrop.fade.in');//Obtiene el elemento fondo oscuro del modal
    const existingBackdropIn = document.querySelector('.modal-backdrop.in');//Obtiene el elemento fondo oscuro del modal
    if (!existingBackdrop && !existingBackdropIn) {// Si no existe,
        // Crear el elemento <div>
        const modalBackdrop = document.createElement('div');

        // Asignar las clases 'modal-backdrop', 'fade' e 'in'
        modalBackdrop.classList.add('modal-backdrop', 'fade', 'in');

        // Agregar el <div> al body
        document.body.appendChild(modalBackdrop);//Agrega en el body el fondo oscuro del modal
    } else {
        console.log('El backdrop ya existe, no se creará de nuevo.');
    }

    //listTableComiEmpresario();//Me lista los valores de la tabla Comisión Empresario del modal Revisar

    var obj = JSON.stringify({ idCLiente: idSocio });
    $.ajax({
        type: "POST",
        url: "EditarPerfil.aspx/obtenerCorreoPorIdCliente",
        data: obj,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            const resultCorreo = result.d[0].correo;
            if (resultCorreo.toLowerCase() === "x") {
                inputCorreoTDM.value = '';
                inputCorreoTDM.placeholder = 'Ingrese Correo';
                inputCorreoTDM.disabled = false;
            } else {
                inputCorreoTDM.value = result.d[0].correo;
                inputCorreoTDM.disabled = true;
                correoTDM = result.d[0].correo;
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ": " + XMLHttpRequest.responseText);
        }
    });

    // Configurar el botón "Aprobar Conformidad" dentro del modal para realizar la acción deseada
    $('#dynamicMailtoTDM').off('click').on('click', function () {

        Swal.fire({
            title: 'Estás seguro que desea realizar la acción',
            text: 'Esta acción es irreversible.',
            icon: 'question',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Aceptar',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                const mesComi = selectMesComiAdmi.value;
                const mensajeCompleto = `${contenidoTextArea}\n\nSaludos,\n\n`;

                // Codificar los saltos de línea para el mailto
                const body = encodeURIComponent(mensajeCompleto);
                const asunto = `Transferencia Comisión Rezagada a Monedero ${mesComi}`;
                const mailtoHref = `mailto:${correoTDM}?subject=${encodeURIComponent(asunto)}&body=${body}`;

                // Asignar el href dinámico
                mailtoLink.href = mailtoHref;

                // Disparar el mailto y cerrar el modal
                mailtoLink.click();
                document.getElementById('closeModalTransferirDirectoMonedero').click();

                var obj = JSON.stringify({ idpais: '01', idsocio: idSocio, mesComi: mesComi });
                // Si el usuario confirma, llamamos a la función actualizarMensaje
                $.ajax({
                    type: "POST",
                    url: "GestionComisiones.aspx/RegisterTransactionCommissionToWallet_Rezagados",
                    data: obj,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    success: function () {
                        Swal.fire({
                            icon: 'success',
                            title: 'Comisión rezagada transferida correctamente.',
                            confirmButtonColor: '#00a65a'
                        }).then(() => {
                            location.reload();
                        });
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert(textStatus + ": " + XMLHttpRequest.responseText);
                    }
                });
            }
        });
    });

}

const mensaje = `Buen día, se le notifica que la factura presentada para el mes de ${selectMesComiAdmi.value} ha sido rechazada y se solicita pueda anularla y generarla nuevamente revisando los siguientes ítems:`;
// Función para actualizar el mensaje y el href
function actualizarMensaje(m) {
    const valueMesComiAdmi = document.getElementById('mesComiAdmi').value;
    const contenidoTextArea = `Buen día, se le notifica que la factura presentada para el mes de ${valueMesComiAdmi} ha sido rechazada y se solicita pueda anularla y generarla nuevamente revisando los siguientes ítems:`;
    // Crear el cuerpo del mensaje con los ítems seleccionados
    const itemsString = itemsSeleccionados.length > 0 ? itemsSeleccionados.map(item => `- ${item}`).join('\n') : '- Ningún ítem seleccionado.';
    const mensajeCompleto = `${contenidoTextArea}\n\n${itemsString}\n\nSaludos,\n\n`;

    // Actualizar el valor del textarea
    mensajeTextArea.value = mensajeCompleto;
}

function cerrarModal() {
    // Evita el comportamiento predeterminado del evento
    event.preventDefault();

    let modal = document.getElementById('exampleModal');

    // Añade la clase para la animación de salida
    modal.classList.add('fade-out');

    // Después de que termine la animación, oculta y restablece el estado del modal y su contenido
    setTimeout(() => {
        modal.classList.remove('hidden'); // Oculta completamente el modal después de la animación
        modal.classList.remove('fade-out'); // Elimina la clase de animación de salida
        secondaryContent.classList.add('hidden'); // Asegura que el bloque secundario esté oculto
        mainContent.classList.remove('hidden'); // Muestra el bloque principal
        mainContent.classList.remove('fade-out'); // Restablece el estado de la animación
        mainContent.classList.add('fade-in'); // Aplica la transición para mostrar el bloque principal
    }, 500); // Tiempo de la transición

    // Restablece el valor y estado del input de correo
    inputCorreo.value = "";
    inputCorreo.disabled = false;

    // Vacía el array de items seleccionados
    itemsSeleccionados = [];

    // Restablece el estado de todos los checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });

    // Actualiza el mensaje
    actualizarMensaje(mensaje);

    // Restablece el valor del correo
    correo = '';

    // Restablece el valor de los inputs correo
    if (inputCorreo) {
        inputCorreo.value = '';
    }
}
document.getElementById('closeModal').addEventListener('click', cerrarModal);

// Función para validar el campo de correo electrónico
function validarCorreo() {
    const correoInput = document.getElementById('correo');
    const correoValor = correoInput.value.trim(); // Eliminamos espacios al inicio y al final
    const regexCorreo = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; // Expresión regular para validar el formato del correo

    // Verificamos si el campo está vacío o si el formato es incorrecto
    if (correoValor === "" || !regexCorreo.test(correoValor)) {
        Swal.fire({
            title: 'Correo inválido',
            text: 'Por favor, ingresa un correo electrónico válido.',
            icon: 'error',
            confirmButtonText: 'Entendido'
        });
        correoInput.focus(); // Coloca el cursor en el campo de correo
        return false; // Evita que el formulario se envíe si la validación falla
    }

    return true; // Retorna true si el correo es válido
}