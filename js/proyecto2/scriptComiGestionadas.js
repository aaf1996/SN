var tabla;

tabla = $('#table_idComiGestionadas').dataTable({
    responsive: true,
    language: {
        emptyTable: "No hay datos disponibles en la tabla",
        search: "Buscar:",
        paginate: {
            previous: "Anterior",
            next: "Siguiente"
        },
        lengthMenu: "Mostrar _MENU_ registros por página",
        info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
        infoEmpty: "No hay registros disponibles",
        infoFiltered: "(filtrado de _MAX_ registros totales)"
    }
});

// Obtén el elemento del párrafo y extrae el texto
const paragraph = document.getElementById('idsocio');
const fullText = paragraph.textContent;
// Obtén solo el código después de "ID: "
const codigoSocio = fullText.split('ID: ')[1].trim();


const miPrimerCodiguito = () => {
    let eliminarMostrandoTotalRegistros1 = document.querySelector("#table_idComiGestionadas_wrapper>div:nth-child(3)>div:nth-child(1)");
    let eliminarMostrandoTotalRegistros2 = document.querySelector("#table_idComiGestionadas_wrapper>div:nth-child(3)");
    eliminarMostrandoTotalRegistros2.removeChild(eliminarMostrandoTotalRegistros1)

    let expandirAnteriorSiguiente = document.querySelector("#table_idComiGestionadas_wrapper>div:nth-child(3)>div>div");
    expandirAnteriorSiguiente.style.width = "100%";
    expandirAnteriorSiguiente.style.display = "flex";
    expandirAnteriorSiguiente.style.margin = "0";

    let añadiendoTableResponsive = document.querySelector("#table_idComiGestionadas_wrapper>div:nth-child(2)>div");
    añadiendoTableResponsive.classList.add("table-responsive");

    let quitandoTextoLabelBuscar = document.querySelector("#table_idComiGestionadas_wrapper>div:nth-child(1)>div:nth-child(2)>div>label");

    quitandoTextoLabelBuscar.firstChild.textContent = "";

    let añadiendoPlaceholder = document.querySelector("#table_idComiGestionadas_wrapper>div:nth-child(1)>div:nth-child(2)>div>label>input");
    añadiendoPlaceholder.placeholder = '  Buscar...';
    console.log(window.innerWidth);

    let cambiarColDe7a12 = document.querySelector("#table_idComiGestionadas_wrapper>div:nth-child(3)>div");
    cambiarColDe7a12.classList.replace("col-sm-7", "col-sm-12");
}

//const dataArray = [
//    {
//        MesComision: "OCTUBRE-2024",
//        RUC: "10474746378",
//        PdfFactura: "07112024_202344.pdf",
//        IdFacturadoTercero: "",
//        Conformidad: "4.png",
//        MontoFacturadoSinIGV: 10351.35,
//        IGV: 1711.69,
//        EstadoFinal: 0
//    }
//];
$.ajax({
    type: "POST",
    url: "ComisionesGestionadas.aspx/ObtenerSeguimientoComisionesPorEmpresario",
    data: JSON.stringify({
        idsocio: codigoSocio,
    }),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    error: function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
    },
    success: function (data) {
        console.log(data.d);
        addRowDT(data.d);
        $('#ddlUpline').val();
    }
});

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

function addRowDT(obj) {
    tabla.fnClearTable();
    for (var i = 0; i < obj.length; i++) {

        const pdfFacturaUrl = obj[i].PdfFactura
            ? `<a class="redirecPDF" href="https://tienda.mundosantanatura.com/comisiones/pdf/${obj[i].PdfFactura}" target="_blank">${obj[i].PdfFactura}</a>`
            : '';
        const conformidadUrl = obj[i].Conformidad
            ? `<a class="redirecConformidad" href="https://tienda.mundosantanatura.com/comisiones/conformidad/${obj[i].Conformidad}" target="_blank">${obj[i].Conformidad}</a>`
            : '';
        const descEstadoFinal = obj[i].EstadoFinal===0
            ? 'Pendiente'
            : (obj[i].EstadoFinal === 1 ? 'Revisión' : (obj[i].EstadoFinal === 2 ? 'Aprobado MLM' : (obj[i].EstadoFinal === 3 ? 'Aprobado Contabilidad' : (obj[i].EstadoFinal === 4 ? 'Aprobado Tesorería' : ''))));
        // Condición para mostrar el valor del IGV solo si hay IdFacturadoTercero
        const igvValue = obj[i].IdFacturadoTercero
            ? ''
            : `S/. ${formatCurrency(obj[i].IGV)}`;
        const terceros = `<button type="button" class="btn btn-success btn-reds" onclick="openTerceros(event,'${obj[i].MesComision}')">Terceros</button>`;

        tabla.fnAddData([
            obj[i].MesComision,
            obj[i].RUC,
            pdfFacturaUrl,  // Enlace para PdfFactura
            obj[i].IdFacturadoTercero,
            obj[i].Empresario,
            conformidadUrl,  // Enlace para Conformidad
            `S/. ${formatCurrency(obj[i].MontoFacturadoSinIGV)}`,
            igvValue,
            descEstadoFinal,
            terceros
        ]);
    }

    miPrimerCodiguito();
}

// Inicialización deDataTable con configuraciones para ocultar elementos no deseados
let tablaComi3ros;

tablaComi3ros = $('#tableComisiones3ros').dataTable({
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

function openTerceros(event, mesComision) {
    event.preventDefault();

    // Obtén el código del socio y el período seleccionado
    const codigoSocio = document.getElementById('idsocio').textContent.split('ID: ')[1].trim();

    $('#modalTerceros').modal('show'); // Abrir el modal

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
    console.log(mesComision);
    console.log(codigoSocio);
    // Llama al AJAX para obtener datos
    $.ajax({
        type: "POST",
        url: "CobroComision.aspx/ObtenerComisionEmpresariosConformidadVistaCliente",
        data: JSON.stringify({
            idpais: '01',
            mesComi: mesComision,
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
            addRowDTComi3eros(data.d);
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
function addRowDTComi3eros(obj) {
    tablaComi3ros.fnClearTable();
    for (var i = 0; i < obj.length; i++) {

        tablaComi3ros.fnAddData([
            obj[i].Orden,
            obj[i].Nombres,
            formatCurrency3ros(obj[i].ComisionTotalSinIGV),
            formatCurrency3ros(obj[i].IGV),
            formatCurrency3ros(obj[i].Total)
        ]);
    }

    miPrimerCodiguito2();
}


// Función para personalizar DataTables
const miPrimerCodiguito2 = () => {
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