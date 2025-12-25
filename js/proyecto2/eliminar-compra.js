//VARIABLES
var tabla, data, estados, tipoPag, filtroaplicado;

filtroaplicado = 0;

// LISTAR COMPRAS
tabla = $("#tbl_compras").DataTable({
    deferRender: true
});

function sendDataAjax() {
    $.ajax({
        type: "POST",
        url: "EliminarCompra.aspx/ListarCompraGeneral",
        data: {},
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, throwError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (data) {
            console.log(data.d);
            addRowDT(data.d);
        }
    });
}

//function addRowDT(obj) {
//    tabla.fnClearTable();
//    for (var i = 0; i < obj.length; i++) {
//        if (obj[i].Estado == 0) {
//            estados = "Pendiente Despacho";
//        } else if (obj[i].Estado == 1) {
//            estados = "Pendiente";
//        } else if (obj[i].Estado == 2) {
//            estados = "Validando Voucher";
//        } else {
//            estados = "Anulado";
//        }
//        if (obj[i].TipoPago == 01) {
//            tipoPag = "DEPOSITO";
//        } else if (obj[i].TipoPago == 02) {
//            tipoPag = "EFECTIVO";
//        } else if (obj[i].TipoPago == 04) {
//            tipoPag = "PAGO EFECTIVO";
//        } else if (obj[i].TipoPago == 05) {
//            tipoPag = "CANJE";
//        } else if (obj[i].TipoPago == 03) {
//            tipoPag = "VISA";
//        }
//        else if (obj[i].TipoPago == 10) {
//            tipoPag = "TUPAY";
//        }
//        else if (obj[i].TipoPago == 11) {
//            tipoPag = "MONEDERO";
//        }
//        else if (obj[i].TipoPago == 09) {
//            tipoPag = "RECAUDO";
//        }
//        else { tipoPag = "ERROR"; }

//        tabla.fnAddData([
//            obj[i].Ticket,
//            obj[i].FechaPagoReporte,
//            obj[i].IdopPeruShop,
//            (obj[i].NombreCliente + " " + obj[i].ApellidoPat + " " + obj[i].ApellidoMat),
//            obj[i].Cantidad,
//            obj[i].MontoAPagar,
//            obj[i].PuntosTotal,
//            obj[i].Despacho,
//            tipoPag,
//            estados,
//            obj[i].PaqueteSocio,
//            '<button id="Detalle" value="Detalle" title="Detalle" class="btn btn-primary btn-deta" data-toggle="modal" data-target="#exampleModal"><i class="fas fa-search"></i></button>',
//            '<button value="Eliminar" title="Eliminar" class="btn btn-danger btn-delet"><i class="far fa-minus-square"></i></button>',
//            obj[i].Ticket
//        ]);
//    }
//}
function addRowDT(obj) {
    tabla.fnClearTable();

    const dataFinal = [];

    for (var i = 0; i < obj.length; i++) {
        let estados = "";
        switch (obj[i].Estado) {
            case 0: estados = "Pendiente Despacho"; break;
            case 1: estados = "Pendiente"; break;
            case 2: estados = "Validando Voucher"; break;
            default: estados = "Anulado";
        }

        let tipoPag = "";
        switch (obj[i].TipoPago) {
            case "01": tipoPag = "DEPOSITO"; break;
            case "02": tipoPag = "EFECTIVO"; break;
            case "03": tipoPag = "VISA"; break;
            case "04": tipoPag = "PAGO EFECTIVO"; break;
            case "05": tipoPag = "CANJE"; break;
            case "09": tipoPag = "RECAUDO"; break;
            case "10": tipoPag = "TUPAY"; break;
            case "11": tipoPag = "MONEDERO"; break;
            default: tipoPag = "ERROR";
        }

        // Botón detalle siempre visible
        const botonDetalle = '<button id="Detalle" value="Detalle" title="Detalle" class="btn btn-primary btn-deta" data-toggle="modal" data-target="#exampleModal"><i class="fas fa-search"></i></button>';

        // Botón eliminar solo si IdopPeruShop está vacío
        const botonEliminar = (obj[i].IdopPeruShop === null || obj[i].IdopPeruShop === undefined || obj[i].IdopPeruShop === "")
            ? '<button value="Eliminar" title="Eliminar" class="btn btn-danger btn-delet"><i class="far fa-minus-square"></i></button>'
            : '';

        dataFinal.push([
            obj[i].Ticket,
            obj[i].FechaPagoReporte,
            obj[i].IdopPeruShop,
            `${obj[i].NombreCliente} ${obj[i].ApellidoPat} ${obj[i].ApellidoMat}`,
            obj[i].Cantidad,
            obj[i].MontoAPagar,
            obj[i].PuntosTotal,
            obj[i].Despacho,
            tipoPag,
            estados,
            obj[i].PaqueteSocio,
            botonDetalle,
            botonEliminar,
            obj[i].Ticket
        ]);
    }

    tabla.fnAddData(dataFinal); // Agrega todos los datos
}

function sendDataAjaxFiltro(fecha1, fecha2) {
    filtroaplicado = 1;
    var obj = JSON.stringify({ fecha1: fecha2, fecha2: fecha1 });

    $.ajax({
        type: "POST",
        url: "EliminarCompra.aspx/ListarCompraGeneralFiltrado",
        data: obj,
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, throwError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (data) {
            console.log(data.d);
            addRowDT(data.d);
        }
    });
}

$("#btnGenerarPageEliminarCompra").click(function (e) {
    e.preventDefault();
    var fecha1 = $("#fecha").val();
    var fecha2 = $("#fechaFin").val();
    sendDataAjaxFiltro(fecha1, fecha2);
});

$(document).on('click', '.btn-deta', function (e) {
    e.preventDefault();
    var row2 = $(this).parent().parent()[0];
    var datax = tabla.fnGetData(row2);
    id2 = datax[13];

    sendDetalleAjax(id2);
});

function sendDetalleAjax(dataid2) {
    var obj2 = JSON.stringify({ id: dataid2 });

    $.ajax({
        type: "POST",
        url: "EliminarCompra.aspx/ListaDetalleComprasGeneral",
        data: obj2,
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, throwError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (data2) {
            addRowDetalle(data2.d);
        }
    });
}

function addRowDetalle(obj2) {
    tabla2 = $("#tbl_detalle").DataTable();
    tabla2.fnClearTable();
    for (var i = 0; i < obj2.length; i++) {
        var imagenProducto = obj2[i].Foto;
        tabla2.fnAddData([
            obj2[i].Nombre,
            '<img src="https://tienda.mundosantanatura.com/products/' + imagenProducto + '" style="height: 50px">',
            obj2[i].Cantidad,
            'S/.' + obj2[i].PrecioPS
        ]);
    }
}

$(document).on('click', '.btn-delet', function (e) {
    e.preventDefault();

    var row2 = $(this).closest('tr')[0];
    var datax = tabla.fnGetData(row2);

    var ticket = datax[13]; // Ticket (código de compra)
    var socio = datax[3];   // Nombre del socio

    Swal.fire({
        title: '¿Estás seguro de eliminar la compra?',
        html: `<strong>Ticket:</strong> ${ticket}<br><strong>Socio:</strong> ${socio}<br><br>¡Esta acción no se puede deshacer!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
        if (result.isConfirmed) {
            var id1 = datax[0], id2 = datax[2], id3 = datax[3], id4 = datax[5], id5 = datax[8];
            eliminarCompra(id1, id2, id3, id4, id5);
        }
    });
});

function eliminarCompra(ticketE, idop, nombres, monto, tipopago) {

    var ticketSend = ticketE;
    var obj = JSON.stringify({ ticketS: ticketSend, idopS: idop, nombreS: nombres, montoS: monto, tipoPagoS: tipopago });
    $.ajax({
        type: "POST",
        url: "EliminarCompra.aspx/ProcesarEliminacionCompra",
        data: obj,
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, throwError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (data) {
            console.log(data.d);
            Swal.fire({
                title: 'Perfecto!',
                text: 'Compra Eliminada',
                type: "success"
            }).then(function () {
                window.location = "ReporteCompras.aspx";
            });
        }
    });
}

var day = moment().format("DD/MM/YYYY");
$('#fecha').val(day);
$('.daterange').daterangepicker({
    singleDatePicker: true,
    showDropdowns: true,
    locale: { format: "DD/MM/YYYY" },
    autoApply: true
});

if (filtroaplicado == 0) {
    sendDataAjax();
} else { filtroaplicado = 0; }