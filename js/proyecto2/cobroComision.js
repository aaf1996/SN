//const comisiones = require('../ArrayComisionesPrueba');

const selectTipoAccion = document.getElementById('tipoAccion');

// Obtén el elemento del párrafo y extrae el texto
const paragraph = document.getElementById('idsocio');
const fullText = paragraph.textContent;
const codigoSocio = fullText.split('ID: ')[1].trim();


//const selectTable1 = document.getElementById('periodo');
//const firstOption = document.createElement('option');
//firstOption.text = 'Seleccione:';
//firstOption.value = '0';
//selectTable1.appendChild(firstOption);
//axios.post('CobroComision.aspx/ListaMesComisionByCliente',
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
selectTable1.appendChild(firstOption);

fetch('CobroComision.aspx/ListaMesComisionByCliente', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        idpais: '01',
        idsocio: codigoSocio
    })
})
    .then(response => response.json()) // Convertir la respuesta a JSON
    .then(response => {
        response.d.forEach(e => {
            const option = document.createElement('option');
            option.text = e.descMes;
            option.value = e.descMes;
            selectTable1.appendChild(option);
        });
    })
    .catch(error => {
        console.error(error);
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
searchSelect();


function unformatCurrency(value) {
    // Elimina las comas de miles y convierte a número
    return parseFloat(value.replace(/,/g, ''));
}

function unblockedBtnCargarArchivos() {
    const screenWidth = window.innerWidth;
    let modalWidth;
    if (screenWidth <= 600) {
        modalWidth = '90%';
    } else {
        modalWidth = '420px';
    }

    const elementPdfUpload = document.getElementById('pdfUploadCharge');
    const elementXmlUpload = document.getElementById('xmlUploadCharge');

    const pdfUpload = elementPdfUpload ? elementPdfUpload.files.length : 0;
    const xmlUpload = elementXmlUpload ? elementXmlUpload.files.length : 0;

    if (pdfUpload !== 0 && xmlUpload !== 0) {
        //console.log('eeeeee');
        return true; // Continuar si se cumplen los requisitos
    }
    if (pdfUpload == 0 || xmlUpload == 0) {
        console.log('asdasd');
        Swal.fire({
            icon: 'error',
            html: `
                <h1>Acción Necesaria</h1>
                <h4 style="color: #6d6d6d; margin-top: 20px; text-wrap: pretty;">Por favor, adjunte los archivos PDF y XML respectivamente.</h4>
            `,
            width: modalWidth,
            customClass: {
                confirmButton: 'custom-confirm-btn'
            }
        });
        return false; // Detener el proceso si no se suben los archivos
    }
}
//unblockedBtnCargarArchivos();

function handleFileChangePDFCharge() {
    const elementPdfUpload = document.getElementById('pdfUploadCharge');
    const fileNamePDF = elementPdfUpload.files[0] ? elementPdfUpload.files[0].name : 'Ningún archivo seleccionado';
    document.getElementById('file-name-pdfCharge').textContent = fileNamePDF;

    //unblockedBtnCargarArchivos();
}
function handleFileChangeXMLCharge() {
    const elementXmlUpload = document.getElementById('xmlUploadCharge');
    const fileNameXML = elementXmlUpload.files[0] ? elementXmlUpload.files[0].name : 'Ningún archivo seleccionado';
    document.getElementById('file-name-xmlCharge').textContent = fileNameXML;

    //unblockedBtnCargarArchivos();
}
function handleFileChangeConformity() {
    const elementConformityUpload = document.getElementById('conformityUploadTransfer');
    const btnAdjuntarConformidad = document.getElementById('btnAdjuntarConformidad');
    const fileNameConformity = elementConformityUpload.files[0] ? elementConformityUpload.files[0].name : 'Ningún archivo seleccionado';
    document.getElementById('file-name-conformity').textContent = fileNameConformity;
    btnAdjuntarConformidad.textContent = "ADJUNTADO";
    btnAdjuntarConformidad.disabled = true;
    btnAdjuntarConformidad.classList.add("btnAdjuntarConformidadDisabled");
    document.getElementById("id-empresario").disabled = true;
    document.getElementById("searchButton").disabled = true;
    //unblockedBtnCargarArchivos();
    document.getElementById("btnEnviar").disabled = false;
    document.getElementById("btnEnviar").classList.remove("button--disabled");
}

// Función para formatear números con comas
function formatCurrency(value) {
    //return parseFloat(value).toLocaleString("es-ES", { // Primer convertimos de String a Decimal con parseFloat, luego convertirmos de decimal a String en formato ES para los decimales.
    //    minimumFractionDigits: 2, // Que si o si vean 2 decimales. Si es 1000 saldría 1.000,00
    //    maximumFractionDigits: 2 // En caso tenga mas de 2 decimales se redondea a 2 decimales.
    //});
    return parseFloat(value).toLocaleString("es-US", { // Primer convertimos de String a Decimal con parseFloat, luego convertirmos de decimal a String en formato US para los decimales.
        minimumFractionDigits: 2, //que si o si vean 2 decimales. Si es 1000 saldría 1,000.00
        maximumFractionDigits: 2 //en caso tenga mas de 2 decimales se redondea a 2 decimales.
    });
}

//---------- LLENADO DE LA COMISIONES --------------------------
//document.getElementById('btnConsultar').addEventListener('click', function () {
//    const select = document.getElementById('periodo');
//    const tipoAccion = document.getElementById('tipoAccion');
//    const selectMesComi = document.getElementById('periodo');
//    const btnDtalleComisiones3ros = document.getElementById('detalleComisiones3ros');

//    // Definir las tres solicitudes con axios
//    const comisionTotalPorEmpresario = axios.post('CobroComision.aspx/ObtenerComisionTotalPorEmpresario', {
//        idpais: '01',
//        idsocio: codigoSocio,
//        mesComi: selectMesComi.value
//    });

//    const comisionTotalTerceros = axios.post('CobroComision.aspx/ObtenerComisionTotalTerceros', {
//        idpais: '01',
//        mesComi: selectMesComi.value,
//        idsocio: codigoSocio
//    });

//    const listaTipoAccionComisionTotal = axios.post('CobroComision.aspx/ListaTipoAccionComisionTotal', {
//        idpais: '01',
//        idsocio: codigoSocio,
//        mesComi: selectMesComi.value
//    });

//    // Ejecutar todas las solicitudes en paralelo
//    Promise.all([comisionTotalPorEmpresario, comisionTotalTerceros, listaTipoAccionComisionTotal])
//        .then(responses => {
//            const [responseEmpresario, responseTerceros, responseTipoAccion] = responses;

//            console.log(responseEmpresario);
//            // Manejar la respuesta de comisionTotalPorEmpresario
//            select.disabled = true;
//            tipoAccion.disabled = false;
//            btnDtalleComisiones3ros.disabled = false;
//            document.getElementById("valorMontoSinIgv").textContent = formatCurrency(responseEmpresario.data.d.comiTotalSinIGV || "0.00");
//            document.getElementById("valorIgv").textContent = formatCurrency(responseEmpresario.data.d.IGV || "0.00");
//            document.getElementById("valorComiDispo").textContent = formatCurrency(responseEmpresario.data.d.comiTotalConIGV || "0.00");

//            // Manejar la respuesta de comisionTotalTerceros
//            const totalSinIGVTerceros = responseTerceros.data && responseTerceros.data.d && responseTerceros.data.d.TotalSinIGVTerceros;
//            document.getElementById("valorMontoSinIgv3ros").textContent = formatCurrency(totalSinIGVTerceros || "0.00");

//            // Manejar la respuesta de listaTipoAccionComisionTotal
//            const selectTipoAccion = document.getElementById('tipoAccion');
//            selectTipoAccion.innerHTML = '';

//            // Volver a agregar la opción "Seleccione"
//            const defaultOption = document.createElement('option');
//            defaultOption.text = 'Seleccione';
//            defaultOption.value = '00';
//            selectTipoAccion.appendChild(defaultOption);

//            responseTipoAccion.data.d.forEach(e => {
//                const option = document.createElement('option');
//                option.text = e.descTipoAccionComiTot;
//                option.value = e.idTipoAccionComiTot;
//                selectTipoAccion.appendChild(option);
//            });
//        })
//        .catch(error => {
//            console.error(error);
//        });
//});

//Cambio de axios a fetch
document.getElementById('btnConsultar').addEventListener('click', function () {
    const select = document.getElementById('periodo');
    const tipoAccion = document.getElementById('tipoAccion');
    const selectMesComi = document.getElementById('periodo');
    const btnDtalleComisiones3ros = document.getElementById('detalleComisiones3ros');

    const requestOptions = (bodyData) => ({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData)
    });

    // Definir las tres solicitudes con fetch
    const comisionTotalPorEmpresario = fetch('CobroComision.aspx/ObtenerComisionTotalPorEmpresario',
        requestOptions({
            idpais: '01',
            idsocio: codigoSocio,
            mesComi: selectMesComi.value
        })
    ).then(response => response.json());

    const comisionTotalTerceros = fetch('CobroComision.aspx/ObtenerComisionTotalTerceros',
        requestOptions({
            idpais: '01',
            mesComi: selectMesComi.value,
            idsocio: codigoSocio
        })
    ).then(response => response.json());

    const listaTipoAccionComisionTotal = fetch('CobroComision.aspx/ListaTipoAccionComisionTotal',
        requestOptions({
            idpais: '01',
            idsocio: codigoSocio,
            mesComi: selectMesComi.value
        })
    ).then(response => response.json());

    // Ejecutar todas las solicitudes en paralelo
    Promise.all([comisionTotalPorEmpresario, comisionTotalTerceros, listaTipoAccionComisionTotal])
        .then(([responseEmpresario, responseTerceros, responseTipoAccion]) => {
            console.log(responseEmpresario);

            // Manejar la respuesta de comisionTotalPorEmpresario
            select.disabled = true;
            tipoAccion.disabled = false;
            btnDtalleComisiones3ros.disabled = false;
            document.getElementById("valorMontoSinIgv").textContent = formatCurrency(responseEmpresario.d.comiTotalSinIGV || "0.00");
            document.getElementById("valorIgv").textContent = formatCurrency(responseEmpresario.d.IGV || "0.00");
            document.getElementById("valorComiDispo").textContent = formatCurrency(responseEmpresario.d.comiTotalConIGV || "0.00");

            // Manejar la respuesta de comisionTotalTerceros
            const totalSinIGVTerceros = responseTerceros.d && responseTerceros.d.TotalSinIGVTerceros;
            document.getElementById("valorMontoSinIgv3ros").textContent = formatCurrency(totalSinIGVTerceros || "0.00");

            // Manejar la respuesta de listaTipoAccionComisionTotal
            const selectTipoAccion = document.getElementById('tipoAccion');
            selectTipoAccion.innerHTML = '';

            // Volver a agregar la opción "Seleccione"
            const defaultOption = document.createElement('option');
            defaultOption.text = 'Seleccione';
            defaultOption.value = '00';
            selectTipoAccion.appendChild(defaultOption);

            responseTipoAccion.d.forEach(e => {
                const option = document.createElement('option');
                option.text = e.descTipoAccionComiTot;
                option.value = e.idTipoAccionComiTot;
                selectTipoAccion.appendChild(option);
            });
        })
        .catch(error => {
            console.error(error);
        });
});

//function GuardarImagen() {
//    var archivoPDF, archivoXML, files, dataPDF;
//    dataPDF = new FormData();
//    archivoPDF = $("#pdfUploadCharge").get(0);
//    archivoXML = $("#xmlUploadCharge").get(0);
//    filesPDF = archivoPDF.files;
//    filesXML = archivoXML.files;
//    dataPDF.append(files[0].name, files[0]);
//    dataPDF.append("archivo", "popup");

//    $.ajax({
//        url: "FileUpload.ashx",
//        type: "POST",
//        data: dataPDF,
//        contentType: false,
//        processData: false,
//        success: function (result) {
//            if (result == "") {
//                RegistrarDataPopup();
//            } else {
//                CambiarNombrePDF();
//            }
//        },
//        error: function (err) {
//            alert(err.statusText)
//        }
//    });
//}

//FUNCIONES PARA REGISTRAR
$("#btnEnviar").click(function (e) {
    e.preventDefault();

    const screenWidth = window.innerWidth;
    let modalWidth = (screenWidth <= 600) ? '90%' : '';
    const selectTipoAccion = document.getElementById("tipoAccion").value;
    
    if (selectTipoAccion === "01") {//COBRAR

        var archivoPDF = $("#pdfUploadCharge").get(0).files[0];
        var archivoXML = $("#xmlUploadCharge").get(0).files[0];
        

        // Validar que se hayan seleccionado los archivos
        if (!archivoPDF || !archivoXML) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, selecciona ambos archivos (PDF y XML).',
                confirmButtonColor: '#F8B808'
            });
            return;
        }
        Swal.fire({
            icon: 'warning',
            title: 'Aviso Importante',
            html: `
            <p style="text-wrap: balance;">Una vez completada la operación, solo será posible transferir el saldo de esta comisión al monedero hasta el día 10 del presente mes.</p>
            <p style="text-wrap: balance;">El sistema evaluará el archivo XML de acuerdo con los parámetros establecidos,
            y ATC validará el archivo PDF correspondiente. En caso de no coincidir, será sancionado.</p>
        `,
            showCancelButton: true,
            cancelButtonText: "CANCELAR",
            cancelButtonColor: "#d33",
            confirmButtonText: "CONFIRMAR",
            confirmButtonColor: '#008C27',
            reverseButtons: true,
            width: modalWidth
        }).then((result) => {
            if (result.isConfirmed) {
                enviarDatosParaComision();
                //Swal.fire({
                //    title: "Excelente",
                //    text: "Archivos cargados satisfactoriamente.",
                //    icon: "success",
                //    confirmButtonColor: '#F8B808',
                //});
                //limpiarCampos();
            }
        });
    } else if (selectTipoAccion === "02") {//TRANSFERIR
        const valorComiDispo = document.getElementById("valorComiDispo").textContent;
        const valorMontoSinIgv = document.getElementById("valorMontoSinIgv").textContent;

        const empresario = document.getElementById("empresario").textContent;

        Swal.fire({
            icon: 'warning',
            title: 'Aviso Importante',
            html: `
            <p style="text-wrap: balance;">Se transferirá un monto de S/. ${valorMontoSinIgv} al(a) empresario(a) ${empresario}.</p>
            <p style="text-wrap: balance;">Una vez completada la operación, no será posible cobrar la comisión con factura propia, tampoco estará disponible para monedero.</p>
        `,
            showCancelButton: true,
            cancelButtonText: "CANCELAR",
            cancelButtonColor: "#d33",
            confirmButtonText: "CONFIRMAR",
            confirmButtonColor: '#008C27',
            reverseButtons: true,
            width: modalWidth
        }).then((result) => {
            if (result.isConfirmed) {
                //Swal.fire({
                //    title: "Excelente",
                //    text: "Transferencia completada satisfactoriamente.",
                //    icon: "success",
                //    confirmButtonColor: '#F8B808',
                //});
                //limpiarCampos();
                transferirComisionOtroEmpresario();
            }
        });
    }
});

function enviarDatosParaComision() {
    //var idpais = $("#pais").val();
    //var mesComision = $("#periodo").val();
    //var totalFacturadoXml = parseFloat($("#valorComiDispo").text());
    //var rucXml = $("#rucXml").val(); // Asegúrate de que este campo exista y esté en el HTML


    // Validar que el RUC no esté vacío
    //if (!rucXml) {
    //    Swal.fire({
    //        icon: 'error',
    //        title: 'Error',
    //        text: 'El RUC no puede estar vacío.',
    //        confirmButtonColor: '#F8B808'
    //    });
    //    return;
    //}


    var archivoPDF = $("#pdfUploadCharge").get(0).files[0];
    var archivoXML = $("#xmlUploadCharge").get(0).files[0];
    const selectMesComi = document.getElementById('periodo');

    var dataPDF = new FormData();
    dataPDF.append("pdfFile", archivoPDF);
    dataPDF.append("xmlFile", archivoXML);
    dataPDF.append("archivo", "comisiones");
    dataPDF.append("idPais", "01");
    dataPDF.append("idSocio", codigoSocio);
    dataPDF.append("mesComision", selectMesComi.value);

    $.ajax({
        url: "FileUpload.ashx",
        type: "POST",
        data: dataPDF,
        contentType: false,
        processData: false,
        success: function (result) {
            if (result == "Validado") {
                Swal.fire({
                    icon: 'success',
                    title: 'Excelente',
                    text: 'Archivos enviados exitosamente.',
                    confirmButtonColor: '#F8B808'
                }).then(() => {
                    location.reload();
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: result,
                    confirmButtonColor: '#F8B808'
                });
            }
        },
        error: function (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un error al enviar los archivos: ' + err.statusText,
                confirmButtonColor: '#F8B808'
            });
        }
    });
}

function transferirComisionOtroEmpresario() {
    //var idpais = $("#pais").val();
    //var mesComision = $("#periodo").val();
    //var totalFacturadoXml = parseFloat($("#valorComiDispo").text());
    //var rucXml = $("#rucXml").val(); // Asegúrate de que este campo exista y esté en el HTML
    //var archivoPDF = $("#pdfUploadCharge").get(0).files[0];

    const valorComiDispo = unformatCurrency(document.getElementById("valorComiDispo").textContent);
    if (valorComiDispo > 500) {
        var archivoConformidad = $("#conformityUploadTransfer").get(0).files[0];

        //const selectMesComi = document.getElementById('periodo');

        // Validar que se hayan seleccionado los archivos
        if (!archivoConformidad) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, subir archivo de conformidad.',
                confirmButtonColor: '#F8B808'
            });
            return;
        }

        var dataConformidad = new FormData();
        dataConformidad.append("archivo", "TAconformidad");
        dataConformidad.append("conformidadFile", archivoConformidad);

        $.ajax({
            url: "FileUpload.ashx",
            type: "POST",
            data: dataConformidad,
            contentType: false,
            processData: false,
            success: function () {
                var nombreArchivo = archivoConformidad.name;
                ejecutarServicioHabilitacionConformidad(nombreArchivo);
            },
            error: function (err) {
                alert(err.statusText)
            }
        });
    } else {
        var nombreArchivo = '';
        ejecutarServicioHabilitacionConformidad(nombreArchivo);
    }
}

function ejecutarServicioHabilitacionConformidad(nombreArchivo) {
    const selectMesComi = document.getElementById('periodo');
    const idEmpresario = document.getElementById('id-empresario');

    const valorComiDispo = unformatCurrency(document.getElementById("valorComiDispo").textContent);
    $.ajax({
        type: "POST",
        url: "CobroComision.aspx/EjecutarServicioHabilitacionConformidad",
        data: JSON.stringify({
            idPais: '01',
            idSocio: codigoSocio,
            mesComision: selectMesComi.value,
            idSocioTercero: idEmpresario.value,
            imgConformidad: nombreArchivo
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (data) {
            if (valorComiDispo > 500) {
                Swal.fire({
                    icon: 'success',
                    title: 'Excelente',
                    text: 'Archivo de conformidad enviado exitosamente.',
                    confirmButtonColor: '#F8B808'
                }).then(() => {
                    location.reload();
                });
            }
            else {
                Swal.fire({
                    icon: 'success',
                    title: 'Excelente',
                    text: 'Transferencia completada satisfactoriamente.',
                    confirmButtonColor: '#F8B808'
                }).then(() => {
                    location.reload();
                });
            }
        }
    });
}


function limpiarCampos() {
    const select = document.getElementById('periodo');
    select.value = '0';
    select.disabled = false;
    searchSelect();


    const tipoAccion = document.getElementById('tipoAccion');
    tipoAccion.value = '00';
    tipoAccion.disabled = true;
    handleSelectChange();

    const btnDetalleComisiones3ros = document.getElementById('detalleComisiones3ros');
    btnDetalleComisiones3ros.disabled = true;

    document.getElementById('valorMontoSinIgv').textContent = '0.00';
    document.getElementById('valorIgv').textContent = '0.00';
    document.getElementById('valorComiDispo').textContent = '0.00';

    document.getElementById('pdfUpload') ? document.getElementById('pdfUpload').value = '' : '';
    document.getElementById('file-name-pdf') ? document.getElementById('file-name-pdf').textContent = 'Ningún archivo seleccionado' : '';
    document.getElementById('xmlUpload') ? document.getElementById('xmlUpload').value = '' : '';
    document.getElementById('file-name-xml') ? document.getElementById('file-name-xml').textContent = 'Ningún archivo seleccionado' : '';

    document.getElementById('messageErrorMiMone')?.classList.add('hiddenMessageError');

    //unblockedBtnCargarArchivos();
}

/* ---------------------ARRASTRAR PARA ELIMINAR ARCHIVOS----------------------------------- */
// Permitir que el elemento se pueda soltar
function allowDropPDF(event) {
    event.preventDefault();
}

// Capturar el ID del archivo que se está arrastrando
function dragPDF(event) {
    event.dataTransfer.setData("fileType", "pdf");
}

// Función para eliminar el archivo cuando se arrastra sobre la papelera
function deleteFilePDF(event) {
    event.preventDefault();  // Prevenir comportamiento por defecto
    const inputFile = document.getElementById("pdfUploadCharge");
    const inputFileLength = inputFile ? inputFile.files.length : 0;
    if (inputFileLength !== 0) {
        if (event.dataTransfer) {
            const fileType = event.dataTransfer.getData("fileType");  // Verificar qué tipo de archivo se está arrastrando

            if (fileType === "pdf") {
                // Limpiar el valor del input file para eliminar el archivo cargado
                inputFile.value = "";

                // Resetear el nombre del archivo en la interfaz
                document.getElementById("file-name-pdfCharge").textContent = "Ningún archivo seleccionado";

                // Notificar al usuario que el archivo ha sido eliminado
                Swal.fire({
                    icon: 'success',
                    title: 'Archivo PDF eliminado',
                    text: 'El archivo ha sido eliminado correctamente.',
                    confirmButtonColor: '#F8B808'
                });
            } else {
                console.error("No es un archivo PDF válido para eliminar.");
            }
        } else {
            // Limpiar el valor del input file para eliminar el archivo cargado
            inputFile.value = "";

            // Resetear el nombre del archivo en la interfaz
            document.getElementById("file-name-pdfCharge").textContent = "Ningún archivo seleccionado";

            // Notificar al usuario que el archivo ha sido eliminado
            Swal.fire({
                icon: 'success',
                title: 'Archivo PDF eliminado',
                text: 'El archivo ha sido eliminado correctamente.',
                confirmButtonColor: '#F8B808'
            });
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error al eliminar el archivo',
            text: 'No se ha podido eliminar el archivo. Asegúrate de que se haya cargado un archivo PDF válido.',
            confirmButtonColor: '#F8B808'
        });
    }
}

// Permitir que el elemento se pueda soltar
function allowDropXML(event) {
    event.preventDefault();
}

// Capturar el ID del archivo que se está arrastrando
function dragXML(event) {
    event.dataTransfer.setData("fileType", "xml");
}

// Función para eliminar el archivo cuando se arrastra sobre la papelera
function deleteFileXML(event) {
    event.preventDefault();  // Prevenir comportamiento por defecto
    const inputFile = document.getElementById("xmlUploadCharge");
    const inputFileLength = inputFile ? inputFile.files.length : 0;
    if (inputFileLength !== 0) {
        if (event.dataTransfer) {
            const fileType = event.dataTransfer.getData("fileType");  // Verificar qué tipo de archivo se está arrastrando

            if (fileType === "xml") {
                const inputFile = document.getElementById("xmlUploadCharge");

                // Limpiar el valor del input file para eliminar el archivo cargado
                inputFile.value = "";

                // Resetear el nombre del archivo en la interfaz
                document.getElementById("file-name-xmlCharge").textContent = "Ningún archivo seleccionado";

                // Notificar al usuario que el archivo ha sido eliminado
                Swal.fire({
                    icon: 'success',
                    title: 'Archivo XML eliminado',
                    text: 'El archivo ha sido eliminado correctamente.',
                    confirmButtonColor: '#F8B808'
                });
            } else {
                console.error("No es un archivo XML válido para eliminar.");
            }
        } else {
            const inputFile = document.getElementById("xmlUploadCharge");

            // Limpiar el valor del input file para eliminar el archivo cargado
            inputFile.value = "";

            // Resetear el nombre del archivo en la interfaz
            document.getElementById("file-name-xmlCharge").textContent = "Ningún archivo seleccionado";

            // Notificar al usuario que el archivo ha sido eliminado
            Swal.fire({
                icon: 'success',
                title: 'Archivo XML eliminado',
                text: 'El archivo ha sido eliminado correctamente.',
                confirmButtonColor: '#F8B808'
            });
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error al eliminar el archivo',
            text: 'No se ha podido eliminar el archivo. Asegúrate de que se haya cargado un archivo XML válido.',
            confirmButtonColor: '#F8B808'
        });
    }
}

// Permitir que el elemento se pueda soltar
function allowDropConformity(event) {
    event.preventDefault();
}

// Capturar el ID del archivo que se está arrastrando
function dragConformity(event) {
    event.dataTransfer.setData("fileType", ".");
}

// Función para eliminar el archivo cuando se arrastra sobre la papelera
function deleteFileConformity(event) {
    event.preventDefault();  // Prevenir comportamiento por defecto
    const inputFile = document.getElementById("conformityUploadTransfer");
    const inputFileLength = inputFile ? inputFile.files.length : 0;
    if (inputFileLength !== 0) {
        if (event.dataTransfer) {//Para cuando arrastras el archivo para eliminarlo
            const fileType = event.dataTransfer.getData("fileType");  // Verificar qué tipo de archivo se está arrastrando

            if (fileType === "pdf" || fileType === "png" || fileType === "jpg" || fileType === "jpeg") {
                // Limpiar el valor del input file para eliminar el archivo cargado
                inputFile.value = "";

                // Resetear el nombre del archivo en la interfaz
                document.getElementById("file-name-conformity").textContent = "Ningún archivo seleccionado";

                // Notificar al usuario que el archivo ha sido eliminado
                Swal.fire({
                    icon: 'success',
                    title: 'Archivo eliminado',
                    text: 'El archivo ha sido eliminado correctamente.',
                    confirmButtonColor: '#F8B808'
                });
            } else {
                console.error("No es un archivo PDF válido para eliminar.");
            }
        } else {//Para cuando das click al tachito para eliminar el archivo
            // Limpiar el valor del input file para eliminar el archivo cargado
            inputFile.value = "";

            // Resetear el nombre del archivo en la interfaz
            document.getElementById("file-name-conformity").textContent = "Ningún archivo seleccionado";

            // Notificar al usuario que el archivo ha sido eliminado
            Swal.fire({
                icon: 'success',
                title: 'Archivo eliminado',
                text: 'El archivo ha sido eliminado correctamente.',
                confirmButtonColor: '#F8B808'
            });
        }
        document.getElementById("btnAdjuntarConformidad").textContent = "ADJUNTAR CONFORMIDAD";
        document.getElementById("id-empresario").disabled = false;
        document.getElementById("searchButton").disabled = false;
        document.getElementById("btnEnviar").disabled = true;
        document.getElementById("btnEnviar").classList.add("button--disabled");
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error al eliminar el archivo',
            text: 'No se ha podido eliminar el archivo. Asegúrese de adjuntar un archivo de conformidad.',
            confirmButtonColor: '#F8B808'
        });
    }
}
/*-----------------------------------------------------------------------------------------------*/

document.getElementById('btnLimpiar').addEventListener('click', function () {
    limpiarCampos();
});

function limpiarEmpresario() {
    let empresario = document.getElementById('empresario');
    empresario.textContent = '-';
    let conformityUploadTransfer = document.getElementById('conformityUploadTransfer');
    let btnAdjuntarConformidad = document.getElementById('btnAdjuntarConformidad');
    if (conformityUploadTransfer && btnAdjuntarConformidad) {
        conformityUploadTransfer.disabled = true;
        btnAdjuntarConformidad.classList.add("btnAdjuntarConformidadDisabled");
    }
    document.getElementById("btnEnviar").disabled = true;
}

function refreshEmpresarioBuscado(event) {
    event.preventDefault();
    document.getElementById('id-empresario').disabled = false;
    document.getElementById('searchButton').disabled = false;

    document.getElementById('id-empresario').value = "";
    let lblNombreEmpresario = document.getElementById('empresario');
    lblNombreEmpresario.textContent = '-';
    
    document.getElementById("btnEnviar").disabled = true;
}

function refreshEmpresarioBuscadoMayor500(event) {
    event.preventDefault();
    document.getElementById('id-empresario').disabled = false;
    document.getElementById('searchButton').disabled = false;

    document.getElementById('id-empresario').value = "";
    let lblNombreEmpresario = document.getElementById('empresario');
    lblNombreEmpresario.textContent = '-';

    let btnAdjuntarConformidad = document.getElementById('btnAdjuntarConformidad');
    btnAdjuntarConformidad.textContent = 'ADJUNTAR CONFORMIDAD';
    btnAdjuntarConformidad.disabled = true;
    btnAdjuntarConformidad.classList.add("btnAdjuntarConformidadDisabled");

    let spanArchivoConformidad = document.getElementById('file-name-conformity');
    spanArchivoConformidad.textContent = 'Ningún archivo seleccionado';
    
    document.getElementById("btnEnviar").disabled = true;
}

function verificarEnter(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendDataAjax();
    }
}

function sendDataAjax() {
    // Obtener el valor del input donde se ingresa el idCliente
    const idClienteConsulta = document.getElementById('id-empresario').value;
    const empresario = document.getElementById('empresario');
    const inputAdjuntarConformidad = document.getElementById('conformityUploadTransfer');
    const divAdjuntarConformidad = document.getElementById('btnAdjuntarConformidad');
    //const lblAdjuntarConformidad = document.getElementById('lblAdjuntarConformidad');
    const idClienteLogueadoElement = document.getElementById('idClienteLogueado');
    const idClienteLogueadoText = idClienteLogueadoElement ? idClienteLogueadoElement.textContent : '';  // Obtiene el texto del elemento
    const selectMesComi = document.getElementById('periodo').value;

    const idCliente = idClienteLogueadoText.split('ID: ')[1].trim();  // Separa el texto en 'ID: ' y toma la segunda parte
    const valorComiDispo = unformatCurrency(document.getElementById("valorComiDispo").textContent);

    $.ajax({
        type: "POST",
        url: "CobroComision.aspx/ConsultarSocioTransferenciaComisionTotal",
        data: JSON.stringify({
            idClienteBase: idCliente, idClienteConsulta: idClienteConsulta, mesComision: selectMesComi
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
                if (data.d[0].ResultadoValor === true) {
                    empresario.textContent = data.d[0].NombresYApellidos;
                    console.log(typeof valorComiDispo);
                    console.log(valorComiDispo);
                    if (valorComiDispo > 500) {
                        if (inputAdjuntarConformidad) {
                            inputAdjuntarConformidad.disabled = false;//Habilita el botón de Adjuntar Conformidad
                            divAdjuntarConformidad.classList.remove("btnAdjuntarConformidadDisabled");
                        }
                    } else {
                        document.getElementById("btnEnviar").disabled = false;
                        document.getElementById("btnEnviar").classList.remove("button--disabled");
                        document.getElementById('id-empresario').disabled = true;
                        document.getElementById('searchButton').disabled = true;
                    }
                } else {
                    if (idClienteConsulta !== idCliente) {
                        empresario.textContent = data.d[0].Resultado;
                    } else {
                        empresario.textContent = "Ha ingresado su propio Id Cliente.";
                    }
                    if (valorComiDispo > 500) {
                        if (inputAdjuntarConformidad) {
                            inputAdjuntarConformidad.disabled = true;//Habilita el botón de Adjuntar Conformidad
                            divAdjuntarConformidad.classList.add("btnAdjuntarConformidadDisabled");
                        }
                    } else {
                        document.getElementById("btnEnviar").disabled = true;
                        document.getElementById("btnEnviar").classList.add("button--disabled");
                    }                    
                }
            } else {
                empresario.textContent = 'No se encontró al empresario. Por favor, intenta nuevamente.';
            }
        }
    });
}
 
// Inicialización deDataTable con configuraciones para ocultar elementos no deseados
let tabla = $('#tableComisiones3ros').DataTable({
    responsive: true,
    paging: true,      
    searching: true,       
    info: false,          
    lengthChange: false,   
    language: {
        search: "",       
        searchPlaceholder: "  Buscar...",
        paginate: {
            previous: "Anterior",
            next: "Siguiente"
        },
        emptyTable: "No hay datos disponibles en la tabla"
    }
});

// Función para personalizar DataTables
const miPrimerCodiguito = () => {
    let expandirAnteriorSiguiente = document.querySelector("#tableComisiones3ros_wrapper .dataTables_paginate");
    if (expandirAnteriorSiguiente) {
        expandirAnteriorSiguiente.style.width = "100%";
        expandirAnteriorSiguiente.style.display = "flex";
        expandirAnteriorSiguiente.style.margin = "0";
    }

    let añadiendoTableResponsive = document.querySelector("#tableComisiones3ros_wrapper .dataTables_scrollBody");
    if (añadiendoTableResponsive) {
        añadiendoTableResponsive.classList.add("table-responsive");
    }
}

// Función para abrir el modal
document.getElementById('detalleComisiones3ros').onclick = function (e) {
    e.preventDefault();

    // Obtén el código del socio y el período seleccionado
    const codigoSocio = document.getElementById('idsocio').textContent.split('ID: ')[1].trim();
    const optionPeriodo = document.getElementById('periodo').value;

    document.getElementById('modalComisiones3ros').style.display = 'block';

    // Muestra el spinner en el tbody
    const tbody = document.querySelector('#tableComisiones3ros tbody');
    tbody.innerHTML = `
        <tr>
            <td colspan="5">
                <div class="spinner">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </td>
        </tr>
    `;

    // Llama al AJAX para obtener datos
    $.ajax({
        type: "POST",
        url: "CobroComision.aspx/ObtenerComisionEmpresariosConformidadVistaCliente",
        data: JSON.stringify({
            idpais: '01',
            mesComi: optionPeriodo,
            idsocio: codigoSocio,
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            // En caso de error, muestra un mensaje en lugar del spinner
            tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: red;">Error al cargar datos</td></tr>`;
        },
        success: function (data) {
            console.log(data.d);
            addRowDT(data.d);
        }
    });
}

function formatCurrency3ros(value) {
    return "S/ " + parseFloat(value).toLocaleString("es-PE", { 
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Función para agregar datos a la tabla
function addRowDT(data) {
    tabla.clear().rows.add(data.map(item => [
        item.Orden,
        item.Nombres,
        formatCurrency3ros(item.ComisionTotalSinIGV),
        formatCurrency3ros(item.IGV),
        formatCurrency3ros(item.Total)
    ])).draw();

    miPrimerCodiguito();
}

// Función para cerrar el modal
document.getElementById('closeModal').onclick = function () {
    document.getElementById('modalComisiones3ros').style.display = 'none';
};

// Función para cerrar el modal si el usuario hace clic fuera del contenido
window.onclick = function (event) {
    if (event.target == document.getElementById('modalComisiones3ros')) {
        document.getElementById('modalComisiones3ros').style.display = 'none';
    }
};

//document.getElementById('btnEnviar').addEventListener('click', function () {
//    const screenWidth = window.innerWidth;
//    const tipoAccion = document.getElementById("tipoAccion");
//    const periodoSelect = document.getElementById('periodo');
//    let modalWidth = (screenWidth <= 600) ? '90%' : '';

//    // Validación de periodo seleccionado
//    if (periodoSelect.value === '0') {
//        Swal.fire({
//            icon: 'error',
//            title: 'Debe seleccionar un período comisión',
//            html: `<p>Por favor, seleccione un Periodo Comisión antes de continuar.</p>`,
//            confirmButtonColor: '#F8B808',
//            width: modalWidth || '420px'
//        });
//        return;
//    }

//    // Verifica si el periodo está activo para selección
//    if (!periodoSelect.disabled) {
//        Swal.fire({
//            icon: 'error',
//            title: 'Acción Necesaria',
//            html: `<p>Por favor, haga clic en el botón "CONSULTAR" para calcular la Comisión Disponible.</p>`,
//            confirmButtonColor: '#F8B808',
//            width: modalWidth || '460px'
//        });
//        return;
//    }
//    modalWidth = modalWidth || '600px';

//    // Verifica que se haya seleccionado una acción válida
//    if (tipoAccion.value === "0") {
//        // Cuando la acción es "Seleccione", no hace nada
//        return;
//    }

//    // Verifica la acción seleccionada
//    if (tipoAccion.value === "1") { // Acción de COBRAR
//        // Verificar si la función retorna false para detener el proceso
//        if (!unblockedBtnCargarArchivos()) return;

//        Swal.fire({
//            icon: 'warning',
//            title: 'Aviso Importante',
//            html: `
//            <p style="text-wrap: balance;">Una vez completada la transacción, no será posible transferir el saldo de esta comisión al monedero hasta el día 10 del presente mes.</p>
//            <p style="text-wrap: balance;">El sistema evaluará el archivo XML de acuerdo con los parámetros establecidos,
//            y ATC validará el archivo PDF correspondiente. En caso de no coincidir, será sancionado.</p>
//        `,
//            showCancelButton: true,
//            cancelButtonText: "CANCELAR",
//            cancelButtonColor: "#d33",
//            confirmButtonText: "CONFIRMAR",
//            confirmButtonColor: '#008C27',
//            reverseButtons: true,
//            width: modalWidth
//        }).then((result) => {
//            if (result.isConfirmed) {
//                Swal.fire({
//                    title: "Excelente",
//                    text: "Archivos cargados satisfactoriamente.",
//                    icon: "success",
//                    confirmButtonColor: '#F8B808',
//                });
//                limpiarCampos(); // Limpia los campos tras la confirmación
//            }
//        });

//    } else if (tipoAccion.value === "2") { // Acción de TRANSFERIR
//        const valorComiDispo = parseInt(document.getElementById("valorComiDispo").textContent);
//        const empresario = document.getElementById("empresario").textContent;

//        if (valorComiDispo < 500) {
//            Swal.fire({
//                icon: 'warning',
//                title: 'Aviso Importante',
//                html: `
//                <p style="text-wrap: balance;">Se transferirá un monto de S/. ${valorComiDispo} al(a) empresario(a) ${empresario}.</p>
//                <p style="text-wrap: balance;">Una vez completada la transacción, no será posible transferir el saldo de esta comisión al monedero.</p>
//            `,
//                showCancelButton: true,
//                cancelButtonText: "CANCELAR",
//                cancelButtonColor: "#d33",
//                confirmButtonText: "CONFIRMAR",
//                confirmButtonColor: '#008C27',
//                reverseButtons: true,
//                width: modalWidth
//            }).then((result) => {
//                if (result.isConfirmed) {
//                    Swal.fire({
//                        title: "Excelente",
//                        text: "Transferencia completada satisfactoriamente.",
//                        icon: "success",
//                        confirmButtonColor: '#F8B808',
//                    });
//                    limpiarCampos();  // Limpia los campos tras la confirmación
//                }
//            });
//        } else {
//            const conformityUploadTransfer = document.getElementById("conformityUploadTransfer")?.value;
//            if (!conformityUploadTransfer) {
//                Swal.fire({
//                    icon: 'warning',
//                    title: 'Aviso Importante',
//                    html: `
//                    <p style="text-wrap: balance;">Debe ingresar el acta de conformidad.</p>
//                `,
//                    confirmButtonText: "CONFIRMAR",
//                    confirmButtonColor: '#008C27',
//                    cancelButtonColor: "#d33",
//                    width: modalWidth
//                });
//            } else {
//                Swal.fire({
//                    icon: 'warning',
//                    title: 'Aviso Importante',
//                    html: `
//                <p style="text-wrap: balance;">Se transferirá un monto de S/. ${valorComiDispo} al(a) empresario(a) ${empresario}.</p>
//                <p style="text-wrap: balance;">Una vez completada la transacción, no será posible transferir el saldo de esta comisión al monedero.</p>
//            `,
//                    showCancelButton: true,
//                    cancelButtonText: "CANCELAR",
//                    cancelButtonColor: "#d33",
//                    confirmButtonText: "CONFIRMAR",
//                    confirmButtonColor: '#008C27',
//                    reverseButtons: true,
//                    width: modalWidth
//                }).then((result) => {
//                    if (result.isConfirmed) {
//                        Swal.fire({
//                            title: "Excelente",
//                            text: "Transferencia completada satisfactoriamente.",
//                            icon: "success",
//                            confirmButtonColor: '#F8B808',
//                        });
//                        limpiarCampos();  // Limpia los campos tras la confirmación
//                    }
//                });
//            }
//        }
//    }
//});

//document.getElementById('id-empresario').addEventListener('input', function () {
//    var empresario = document.getElementById('empresario');
//    empresario.textContent = '';
//});

//document.getElementById('searchButton').addEventListener('click', function () {
//    sendDataAjax();
//});
