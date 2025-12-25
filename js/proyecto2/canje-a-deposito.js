//VARIABLES
var tabla, data, estados, tipoPag, tabla2, data2, filtroaplicado;
filtroaplicado = 0;

// LISTAR COMPRAS
tabla = $("#tbl_compras").DataTable();

function sendDataAjax() {
    $.ajax({
        type: "POST",
        url: "Canje-a-Deposito.aspx/ListarCompraGeneral",
        data: {},
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, throwError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (data) {
            addRowDT(data.d);
        }
    });
}

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


        // ✅ Solo incluir si es CANJE o DEPOSITO
        if (tipoPag === "CANJE" || tipoPag === "DEPOSITO") {

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
                `<button id="Detalle" value="Detalle" title="Detalle" class="btn btn-primary btn-deta" data-toggle="modal" data-target="#exampleModal"><i class="fas fa-search"></i></button>`,
                obj[i].Ticket
            ]);
        }
    }

    tabla.fnAddData(dataFinal);
}

function sendDataAjaxFiltro(fecha1, fecha2) {
    filtroaplicado = 1;
    var obj = JSON.stringify({ fecha1: fecha2, fecha2: fecha1 });

    $.ajax({
        type: "POST",
        url: "Canje-a-Deposito.aspx/ListarCompraGeneralFiltrado",
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

$("#btnGenerarPageCajeADeposito").click(function (e) {
    e.preventDefault();
    var fecha1 = $("#fecha").val();
    var fecha2 = $("#fechaFin").val();
    sendDataAjaxFiltro(fecha1, fecha2);
});

$(document).on('click', '.btn-deta', function (e) {
    e.preventDefault();
    var row2 = $(this).parent().parent()[0];
    var datax = tabla.fnGetData(row2);
    id2 = datax[12];

    sendDetalleAjax(id2);
});

function sendDetalleAjax(dataid2) {

    var obj2 = JSON.stringify({ id: dataid2 });

    $.ajax({
        type: "POST",
        url: "Canje-a-Deposito.aspx/ListaDetalleComprasGeneral",
        data: obj2,
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, throwError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (data2) {
            addRowDetalle(data2.d);
            datosDetalleCompra(data2.d);
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
            '<img src="products/' + imagenProducto + '" style="height: 50px">',
            obj2[i].Cantidad,
            'S/.' + obj2[i].PrecioPS
        ]);
    }
}

function datosDetalleCompra(obj3) {
    $("#txtTicket").val(obj3[0].TicketCOM);

    // Verificar si IdopCOM tiene valor
    var tieneIdop = obj3[0].IdopCOM && obj3[0].IdopCOM.trim() !== "";

    // Cargar selects
    CargarTipoPago();
    $("#cboTipoPago").val(obj3[0].TipoPagoCOM);

    CargarEstadoCompra(tieneIdop);
    $("#cboEstado").val(obj3[0].EstadoCOM);

    // Bloquear o desbloquear selects según IdopCOM
    // obj3[0].TipoPagoCOM == '01' // DEPÓSITO
    // obj3[0].TipoPagoCOM == '05' // CANJE
    if ((!tieneIdop && obj3[0].TipoPagoCOM == '01') || (tieneIdop && obj3[0].TipoPagoCOM == '01') || (tieneIdop && obj3[0].TipoPagoCOM == '05')) {
        $("#cboEstado").attr("disabled", true);
        $("#cboTipoPago").attr("disabled", true);
        $("#id-modal-footer").hide();
    } else if (!tieneIdop && obj3[0].TipoPagoCOM == '05') {
        $("#cboEstado").removeAttr("disabled");
        $("#cboTipoPago").removeAttr("disabled");
        $("#id-modal-footer").show();
    }
}

// Cuando se cierra el modal, desbloquear selects
$('#miModal').on('hidden.bs.modal', function () {
    $("#cboEstado").removeAttr("disabled");
    $("#cboTipoPago").removeAttr("disabled");
    $("#id-modal-footer").show(); // Al cerrar modal vuelve a mostrarse
});

function CargarTipoPago() {
    $.ajax({
        type: "POST",
        url: "Canje-a-Deposito.aspx/ListaTipoPagoDetalle",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            $("#cboTipoPago").empty();
            $("#cboTipoPago").append("<option value='0'>--Select--</option>");
            $.each(result.d, function (key, value) {
                if (value.nombreTipoPago === "DEPÓSITO" || value.nombreTipoPago === "CANJE") {
                    $("#cboTipoPago").append(
                        $("<option></option>").val(value.idTipoPago).html(value.nombreTipoPago)
                    );
                }
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ": " + XMLHttpRequest.responseText);
        }
    });
}

function CargarEstadoCompra(tieneIdop) {
    $.ajax({
        type: "POST",
        url: "Canje-a-Deposito.aspx/ListaEstadoDetalle",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            $("#cboEstado").empty();
            $.each(result.d, function (key, value) {
                // Mostrar siempre Pendiente y Pendiente de Aprobacion
                if (value.descEstado === "Pendiente" || value.descEstado === "Pendiente de Aprobacion") {
                    $("#cboEstado").append(
                        $("<option></option>").val(value.idEstado).html(value.descEstado)
                    );
                }

                // Si tiene IDOP, agregar también Realizado
                if (tieneIdop && value.descEstado === "Realizado") {
                    $("#cboEstado").append(
                        $("<option></option>").val(value.idEstado).html(value.descEstado)
                    );
                }
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ": " + XMLHttpRequest.responseText);
        }
    });
}

//function updateDataAjax() {
//    var ticket, montoPagar, montoComision, puntosTotal, montoTotal, fechaCompra, cantidadProd, idop, idtipocompra, tipoCompra, tipoPagoDet, estado, despacho;

//    ticket = $("#txtTicket").val();
//    montoPagar = $("#txtMontoPagar").val();
//    montoComision = $("#txtMontoComision").val();
//    puntosTotal = $("#txtPuntosTotal").val();
//    montoTotal = $("#txtMontoTotal").val();
//    fechaCompra = $("#txtfechaCompra").val();
//    cantidadProd = $("#txtCanProductos").val();
//    idop = $("#txtIDOP").val();
//    idtipocompra = $("#cboTipoCompra").val();
//    tipoCompra = $("#cboTipoCompra option:selected").text();
//    tipoPagoDet = $("#cboTipoPago").val();
//    estado = $("#cboEstado").val();
//    despacho = $("#cboDespacho").val();

//    var obj9 = JSON.stringify({
//        ticketCom1: ticket, montoPagarCom1: montoPagar, montoComisionCom1: montoComision, puntosTotalCom1: puntosTotal,
//        montoTotalCom1: montoTotal, fechaCom1: fechaCompra, cantidadProdCom1: cantidadProd, idopCom1: idop,
//        idtipoCom1: idtipocompra, tipoCom1: tipoCompra, tipoPagoCom1: tipoPagoDet, estadoCom1: estado, despachoCom1: despacho
//    });

//    $.ajax({
//        type: "POST",
//        url: "Canje-a-Deposito.aspx/ActualizarCompraDetalle",
//        data: obj9,
//        dataType: "json",
//        contentType: 'application/json; charset=utf-8',
//        error: function (xhr, ajaxOptions, throwError) {
//            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
//        },
//        success: function (response) {
//            console.log(response);
//            Swal.fire({
//                title: 'Perfecto!',
//                text: 'Compra Actualizada',
//                type: "success"
//            }).then(function () {
//                window.location = "Canje-a-Deposito.aspx";
//            });
//        }
//    });
//}

function updateDataAjaxParcial() {
    var ticket, tipoPagoDet, estado;

    // Solo se usan estos campos
    ticket = $("#txtTicket").val();
    tipoPagoDet = $("#cboTipoPago").val();
    estado = $("#cboEstado").val();

    // Campos no necesarios en parcial se envían como null
    var obj9 = JSON.stringify({
        ticketCom1: ticket,
        montoPagarCom1: null,
        montoComisionCom1: null,
        puntosTotalCom1: null,
        montoTotalCom1: null,
        fechaCom1: null,
        cantidadProdCom1: null,
        idopCom1: null,
        idtipoCom1: null,
        tipoCom1: null,
        tipoPagoCom1: tipoPagoDet,
        estadoCom1: estado,
        despachoCom1: null
    });

    $.ajax({
        type: "POST",
        url: "Canje-a-Deposito.aspx/ActualizarCompraDetalle",
        data: obj9,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (response) {
            console.log(response);
            Swal.fire({
                title: 'Perfecto!',
                text: 'Compra Actualizada',
                type: "success"
            }).then(function () {
                window.location = "Canje-a-Deposito.aspx"; // Redirige a donde corresponda
            });
        }
    });
}


function updateEstadoTipoPago() {
    var ticket = $("#txtTicket").val();
    var tipoPagoDet = $("#cboTipoPago").val();
    var estado = $("#cboEstado").val();
    var despacho = $("#cboDespacho").val();

    var obj = JSON.stringify({
        ticketCom1: ticket,
        montoPagarCom1: null,
        montoComisionCom1: null,
        puntosTotalCom1: null,
        montoTotalCom1: null,
        fechaCom1: null,
        cantidadProdCom1: null,
        idopCom1: null,
        idtipoCom1: null,
        tipoCom1: null,
        tipoPagoCom1: tipoPagoDet,
        estadoCom1: estado,
        despachoCom1: despacho
    });

    $.ajax({
        type: "POST",
        url: "NuevaPagina.aspx/ActualizarCompraDetalle", // o tu nueva página
        data: obj,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (response) {
            Swal.fire({
                title: 'Perfecto!',
                text: 'Compra Actualizada',
                type: "success"
            }).then(function () {
                window.location = "NuevaPagina.aspx";
            });
        }
    });
}

//$("#btnActualizar").click(function (e) {
//    e.preventDefault();
//    //updateDataAjax();
//    updateDataAjaxParcial
//});

$("#btnActualizar").click(function (e) {
    e.preventDefault();

    Swal.fire({
        title: '¿Estás seguro?',
        text: "Se actualizarán los datos seleccionados.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, actualizar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Si el usuario confirma, ejecutamos la función de actualización
            updateDataAjaxParcial();
        }
    });
});


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