
var tabla, tablaDetalle;

$(document).ready(function () {
    tabla = $("#tbl-despacho-pedidos").DataTable({
        pageLength: 5,
        language: {
            search: "Buscar aquí:"
        },
    });
    listarDespachos();
    tablaDetalle = $("#tbl-detalle-pedido").DataTable({
        "iDisplayLength": 5,
        "aLengthMenu": [[5, 10, 25, 50], [5, 10, 25, 50]],
        "aoColumnDefs": [
            { "bVisible": false, "aTargets": [7, 8, 9, 10] }
        ]
    });
});

function parseDateToISO(dateStr) {
    var parts = dateStr.split("/");
    return parts[2] + "-" + parts[1] + "-" + parts[0];
}

function listarDespachos() {
    var fechaInicio = parseDateToISO($("#fecha").val());
    var fechaFin = parseDateToISO($("#fechaFin").val());

    $.ajax({
        type: "POST",
        url: "DespachoPedidos.aspx/ListarDespachos",
        data: JSON.stringify({
            fechaInicio: fechaInicio,
            fechaFin: fechaFin
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var data = response.d;

            tabla.fnClearTable();

            addRowDT(data);
        },
        error: function (xhr, status, error) {
            console.error("Error al obtener los despachos:", error);
        }
    });
}

function addRowDT(obj) {
    tabla.fnClearTable();

    for (var i = 0; i < obj.length; i++) {
        const info = {
            Ticket: obj[i].Ticket,
            IdopPerushop: obj[i].IdopPerushop,
            FechaEnvio: obj[i].FechaEnvio,
            Empresario: obj[i].Empresario,
            MontoPagado: obj[i].MontoPagado
        };

        const infoStr = encodeURIComponent(JSON.stringify(info));
        
        const addedIndex = tabla.fnAddData([
            obj[i].Ticket,
            obj[i].IdopPerushop,
            obj[i].FechaPedido,
            obj[i].FechaEnvio,
            obj[i].Empresario,
            obj[i].MontoPagado,
            obj[i].EstadoDespacho,
            `<button type="button" class="btn btn-primary btn-sm ver-detalle-despachoPedido" 
                onclick="verDetalle('${obj[i].Ticket}','${obj[i].EstadoDespacho}','${infoStr}')">
                <i class="fas fa-pen"></i>
            </button>`
        ]);
        
        const rowNode = tabla.fnGetNodes(addedIndex);
        
        let textColor = "";
        switch (obj[i].EstadoDespacho) {
            case "Entrega Completada":
                textColor = "color: white;";
                break;
            default:
                textColor = "";
                break;
        }
        
        $(rowNode).find('td').each(function () {
            $(this).attr("style", textColor);
        });
    }
}

function addRowDetalle(detalle) {
    tablaDetalle.fnClearTable();

    if (!detalle || detalle.length === 0) {
        $("#tbl-detalle-body").html(`<tr><td colspan="6">No hay detalle disponible</td></tr>`);
        return;
    }

    for (var i = 0; i < detalle.length; i++) {
        var item = detalle[i];

        var stockBadge = "";
        if (item.AlertaStock === "No") {
            stockBadge = `<span class="badge badge-success">No</span>`;
        } else if (item.AlertaStock === "Si") {
            stockBadge = `<span class="badge badge-danger">Sí</span>`;
        } else {
            stockBadge = `<span class="badge badge-warning">${item.AlertaStock}</span>`;
        }

        var disabled = item.EstadoEntrega_Detalle === 2 ? "disabled" : "";

        tablaDetalle.fnAddData([
            item.IdproductoPerushop,
            item.Producto,
            `<img src='https://tienda.mundosantanatura.com/products/${item.Imagen}' 
                  class='despacho-pedidos__img' width='100' height='100'>`,
            item.Cantidad_Unds_Pedido,
            `<input type='number' class='form-control despacho-pedidos__input-number'
                value='${item.CantidadEntregada ?? 0}' min='0' data-max='${item.Cantidad_Unds_Pedido}' ${disabled}>`,
            item.CantidadPendienteEntrega,
            stockBadge,
            item.Ticket,
            item.Codigo,
            item.CodigoProducto,
            item.EstadoEntrega_Detalle,
        ]);
    }

    tablaDetalle.fnDraw();
    $("#modalDetalle").modal("show");
}

$(document).on('input change', '.despacho-pedidos__input-number', function () {
    let val = parseInt($(this).val(), 10);
    const max = parseInt($(this).data('max'), 10);

    if (isNaN(val) || val < 0) {
        val = 0;
    } else if (!isNaN(max) && val > max) {
        val = max;
    }

    $(this).val(val);
});

function verDetalle(ticket, estadoDespacho, infoStr) {
    var tbody = document.getElementById("tbl-detalle-body");
    tbody.innerHTML = "";

    let info = {};
    try {
        info = JSON.parse(decodeURIComponent(infoStr));
    } catch (e) {
        console.error('Error al parsear info del pedido', e);
    }

    $("#info-ticket").text(info.Ticket);
    $("#info-idop").text(info.IdopPerushop);
    $("#info-fechaenvio").text(info.FechaEnvio);
    $("#info-empresario").text(info.Empresario);
    $("#info-montopagado").text(`S/ ${info.MontoPagado}`);

    $.ajax({
        type: "POST",
        url: "DespachoPedidos.aspx/ListarDetalleCompra_Despacho",
        data: JSON.stringify({ ticket: ticket }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var data = response.d;

            tablaDetalle.fnClearTable();
            addRowDetalle(data);

            if (!data || data.length === 0) {
                tbody.innerHTML = `<tr><td colspan="6">No hay detalle disponible</td></tr>`;
                return;
            }

            $("#modalDetalle").modal("show");
            $("#btn-actualizar-modal-detalle").toggle(estadoDespacho !== "Entrega Completada");
        },
        error: function (xhr, status, error) {
            console.error("Error al obtener detalle:", error);
            tbody.innerHTML = `<tr><td colspan="6">Error al cargar detalle</td></tr>`;
        }
    });
}

$("#btnFiltrar").click(function (e) {
    e.preventDefault();
    var fecha1 = $("#fecha").val();
    var fecha2 = $("#fechaFin").val();
    sendDataAjaxFiltro(fecha1, fecha2);
});

function sendDataAjaxFiltro(fecha1, fecha2) {
    var fechaInicio = parseDateToISO(fecha1);
    var fechaFin = parseDateToISO(fecha2);

    $.ajax({
        type: "POST",
        url: "DespachoPedidos.aspx/ListarDespachos",
        data: JSON.stringify({
            idLocal: "C003605",
            fechaInicio: fechaInicio,
            fechaFin: fechaFin
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var data = response.d;
            tabla.fnClearTable();
            addRowDT(data);
        },
        error: function (xhr, status, error) {
            console.error("Error al obtener los despachos:", error);
        },
        complete: function () {
            if (typeof onComplete === 'function') {
                onComplete();
            }
        }
    });
}

var penultimoDia = moment().subtract(1, 'day').format("DD/MM/YYYY");
var ultimoDia = moment().format("DD/MM/YYYY");

$('#fecha').val(penultimoDia);
$('#fechaFin').val(ultimoDia);

$('.daterange').daterangepicker({
    singleDatePicker: true,
    showDropdowns: true,
    locale: { format: "DD/MM/YYYY" },
    autoApply: true
});

$(".btn-actualizar-modal-detalle").on("click", function () {
    var allData = [];

    tablaDetalle.$('tr').each(function () {
        var rowData = tablaDetalle.fnGetData(this);
        if (rowData && rowData[10] != 2) {
            allData.push({
                Ticket: rowData[7],//Kenny
                Codigo: rowData[8],//Kenny
                Codigoproducto: rowData[9],//Kenny
                IdproductoPerushop: rowData[0],
                CantidadEntregada: $(this).find("input.despacho-pedidos__input-number").val() || 0
            });
        }
    });

    Swal.fire({
        title: '¿Estás seguro?',
        text: "Se actualizarán los datos del despacho seleccionados.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, actualizar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#1FA438',
        cancelButtonColor: '#d33',
        reverseButtons: true,
        allowOutsideClick: false
    }).then((result) => {
        if (result.value === true) {
            $.ajax({
                type: "POST",
                url: "DespachoPedidos.aspx/ActualizarDetalle",
                data: JSON.stringify({ detalleJson: JSON.stringify(allData) }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    const data = response.d;
                    const mensaje = data.Mensaje || 'Sin mensaje disponible';
                    const jsonResultado = data.JsonResultado && data.JsonResultado !== '{}'
                        ? JSON.stringify(JSON.parse(data.JsonResultado), null, 2)
                        : null;

                    let type = '';
                    if (mensaje.includes('Completada')) {
                        type = 'success';
                    } else if (mensaje.includes('Sin')) {
                        type = 'warning';
                    }
                    let tablaIncidenciasHTML = '';

                    if (jsonResultado && jsonResultado !== '{}') {
                        try {
                            const incidencias = JSON.parse(jsonResultado);
                            const rows = Object.entries(incidencias).map(([producto, detalle]) => {
                                return `
                                <tr>
                                    <td style="padding: 6px 10px; border-bottom: 1px solid #e5e7eb;">${producto}</td>
                                    <td style="padding: 6px 10px; border-bottom: 1px solid #e5e7eb;">${detalle}</td>
                                </tr>
                            `;
                            }).join('');

                            tablaIncidenciasHTML = `
                            <div style="border-top: 1px solid #e5e7eb; padding-top: 10px;">
                                <strong style="display:block; margin-bottom: 5px;">Incidencias:</strong>
                                <div style="max-height: 200px; overflow-y: auto; border: 1px solid #e5e7eb; border-radius: 8px;">
                                    <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                                        <thead>
                                            <tr style="background: #f9fafb;">
                                                <th style="text-align: left; padding: 8px 10px; border-bottom: 1px solid #e5e7eb;">Producto</th>
                                                <th style="text-align: left; padding: 8px 10px; border-bottom: 1px solid #e5e7eb;">Detalle</th>
                                            </tr>
                                        </thead>
                                        <tbody>${rows}</tbody>
                                    </table>
                                </div>
                            </div>
                        `;
                        } catch (err) {
                            console.error('Error al parsear JSON de incidencias', err);
                        }
                    }

                    Swal.fire({
                        title: '<strong>Resultado del Proceso</strong>',
                        type: type,
                        html: `
                        <div style="text-align: left; font-size: 15px; line-height: 1.5; margin-top: 10px;">
                            <div style="
                                background: #f9fafb;
                                border: 1px solid #e5e7eb;
                                border-radius: 8px;
                                padding: 12px;
                                text-align: center;
                                font-family: 'Segoe UI', Tahoma, sans-serif;
                                font-weight: 700;
                                margin-bottom: ${tablaIncidenciasHTML ? '15px' : '0'};
                                box-shadow: 0 1px 3px rgba(0,0,0,0.05);
                            ">${mensaje}</div>
                            ${tablaIncidenciasHTML}
                        </div>
                    `,
                        confirmButtonText: 'Aceptar',
                        confirmButtonColor: '#1FA438',
                        width: '550px',
                        allowOutsideClick: false
                    }).then((result) => {
                        if (result.value === true) {
                            if (type === 'success') {
                                $('#modalDetalle').modal('hide');

                                $('#spinner-overlay').css('display', 'flex').show();

                                const fecha1 = $("#fecha").val();
                                const fecha2 = $("#fechaFin").val();

                                sendDataAjaxFiltro(fecha1, fecha2);

                                setTimeout(() => {
                                    $('#spinner-overlay').hide();
                                }, 500);
                            }
                        }
                    });
                },
                error: function (xhr) {
                    console.error("Error en la solicitud:", xhr);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Ocurrió un error al procesar la actualización.',
                        confirmButtonColor: '#1FA438'
                    });
                }
            });
        }
    });
});
