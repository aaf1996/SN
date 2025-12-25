<%@ Page Title="" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="ReportePedidosPendientes.aspx.cs" Inherits="SantaNaturaNetworkV3.ReportePedidosPendientes" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        /* Body */
        .body-bg {
            background-color: #f7fafc;
            padding: 16px;
        }

        /* Container */
        .containerPedidosPendientes {
            min-height: 100vh;
            padding: 20px 100px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        /* Title */
        .tituloReportePedidosPendientes {
            margin-bottom: 30px;
        }

            .tituloReportePedidosPendientes .title {
                font-family: system-ui; /* Fuente estilizada */
                font-size: 3em; /* Tamaño grande */
                color: #254ab1; /* Color principal */
                text-align: center;
                margin: 0;
                padding: 20px 0 10px;
                background: linear-gradient(to right, #333, #dbdbdb);
                -webkit-background-clip: text;
                color: transparent;
                font-weight: bold;
                /* Sombra del texto */
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
                /* Decoración inferior */
                position: relative;
            }

                .tituloReportePedidosPendientes .title::after {
                    content: "";
                    display: block;
                    width: 50%;
                    height: 4px;
                    background-color: #00a65a;
                    margin: 10px auto 0;
                    border-radius: 5px;
                }

        /* Form Group */
        .containerPedidosPendientes .form-group {
            margin-bottom: 30px;
        }

        .label {
            display: block;
            font-size: 1.125rem;
            font-weight: 600;
            margin-bottom: 8px;
        }

        .select {
            width: 100%;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            padding: 8px;
            outline: none;
        }

            .select:focus {
                border-color: #3b82f6;
                box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
            }

        /* seleccionMultiple */
        .basic-multiple {
            visibility: hidden; /* Oculta mientras se inicializa */
        }

        .seleccionMultiple {
            width: auto;
            display: flex;
            align-items: center;
            gap: 10px;
        }

            .seleccionMultiple .select2-container--default .select2-selection--multiple {
                padding-top: 5px;
                padding-bottom: 10px;
                padding-right: 5px;
                padding-left: 5px;
            }

            .seleccionMultiple .select2-container {
                width: fit-content !important;
                min-width: 110px;
            }

            .seleccionMultiple label {
                font-size: 1.6rem;
                text-wrap: nowrap;
                margin-bottom: 0;
            }

        /* Button and Total */
        .flex-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
        }

        .btn-success {
            background-color: #3b82f6;
            color: #ffffff;
            padding: 8px 16px;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            transition: background-color 0.3s;
        }

            .btn-success:hover {
                background-color: #2563eb;
            }

        .total {
            display: flex;
            align-items: center;
            grid-gap: 10px;
            font-size: 1.6rem;
            font-weight: 700;
        }

        .total-amount {
            font-weight: 700;
            color: #1f2937;
        }

        /* Grid Layout */
        .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
        }

        /* Table */
        .table-title {
            font-size: 1.6rem;
            font-weight: 600;
            margin-bottom: 8px;
        }

        .table {
            width: 100%;
            border-collapse: collapse;
            border: 1px solid #d1d5db;
        }

        .table-header {
            border: 1px solid #d1d5db;
            padding: 8px;
            background-color: #f7fafc;
            text-align: center;
            position: sticky;
            top: -1px;
            z-index: 10;
            box-shadow: inset 0px -1px 4px 0px rgba(0, 0, 0, 0.1);
        }

        .table-cell {
            border: 1px solid #d1d5db;
            padding: 8px;
            text-align: center;
            background: white;
        }
        .table-container {
            overflow-y: auto;
            max-height: 400px;
        }

        /* Tfoot Styles */
        .table tfoot {
            background-color: #e2e8f0; /* Color de fondo diferenciado */
            font-weight: bold; /* Texto en negrita */
        }

            .table tfoot td {
                border-top: 2px solid #cbd5e0; /* Línea superior más gruesa */
                padding: 10px; /* Más espaciado para resaltar */
                text-align: right; /* Alinear a la derecha el total */
                color: #1a202c; /* Color del texto */
            }

                /* Estilo para la celda del título "Total" */
                .table tfoot td:first-child {
                    text-align: center; /* Centrar el texto "Total" */
                    background-color: #edf2f7; /* Fondo ligeramente más claro */
                }


        /* Loader */
        .loader-spinner {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 16px;
            color: #555;
        }

            .loader-spinner span {
                animation: blink 1.5s infinite;
            }

                .loader-spinner span:nth-child(2) {
                    animation-delay: 0.2s;
                }

                .loader-spinner span:nth-child(3) {
                    animation-delay: 0.4s;
                }

        @keyframes blink {
            0%, 100% {
                opacity: 0;
            }

            50% {
                opacity: 1;
            }
        }




        .range-slider input[type="range"] {
            position: absolute;
            width: fit-content;
            pointer-events: none; /* Evita conflicto entre sliders */
            -webkit-appearance: none;
            background-color: rgba(0,0,0,.1);
        }

            .range-slider input[type="range"]::-webkit-slider-thumb {
                pointer-events: all; /* Permite interacción en thumbs */
                width: 18px;
                height: 18px;
                background: red;
                border-radius: 50%;
                cursor: pointer;
                -webkit-appearance: none;
                z-index: 10;
            }

            .range-slider input[type="range"]::-moz-range-thumb {
                pointer-events: all;
                width: 18px;
                height: 18px;
                background: yellow;
                border-radius: 50%;
                cursor: pointer;
            }

            .range-slider input[type="range"]::-ms-thumb {
                pointer-events: all;
                width: 18px;
                height: 18px;
                background: blue;
                border-radius: 50%;
                cursor: pointer;
            }

        .range-slider .output {
            text-align: center;
            margin-top: 30px;
            font-size: 16px;
        }

        @media (max-width: 540px){
            .containerPedidosPendientes{
                padding: 20px;
            }
            .flex-row {
                align-items: flex-end;
                flex-direction: column;
                grid-gap: 20px;
                margin-top: 40px;
            }
            .tituloReportePedidosPendientes .title{
                font-size: 2em;
            }
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="containerPedidosPendientes" style="min-height: 100vh; background-image: url(https://tienda.mundosantanatura.com/img/fondoSumaqWasi.jpg)">
        <section class="tituloReportePedidosPendientes">
            <h1 class="title">Reporte de pedidos pendientes</h1>
        </section>

        <!-- Tipo de Pago -->
        <div class="form-group">
            <div class="seleccionMultiple">
                <label for="selectTipoPago">Tipo Pago </label>
                <div id="loaderTipoPago" class="loader ocultar" style="margin: 0; margin-left: 10px;"></div>
                <select id="selectTipoPago" class="form-control basic-multiple" name="select" multiple>
                </select>
            </div>
        </div>

        <!-- Descargar detalle y total pendiente -->
        <div class="flex-row">
            <button type="button" id="btnDescargarDetalle" class="btn-success">Descargar detalle</button>
            <div id="divTotal" class="total">
                Total Pendiente: <div id="loaderTotal" class="loader ocultar"></div><span class="total-amount"></span>
            </div>
        </div>

        <!-- Tablas -->
        <div class="grid">
            <!-- Pendientes Ayer -->
            <div>
                <h2 class="table-title">Pendientes Ayer</h2>
                <div class="table-container">
                    <table class="table" id="pendientes_ayer">
                        <thead>
                            <tr>
                                <th class="table-header">Hora</th>
                                <th class="table-header">Monto</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                        <tfoot>
                        </tfoot>
                    </table>
                </div>
                <div id="loaderAyer" class="loader ocultar"></div>
            </div>

            <!-- Pendientes Hoy -->
            <div>
                <h2 class="table-title">Pendientes Hoy</h2>                
                <div class="table-container">
                    <table class="table" id="pendientes_hoy">
                        <thead>
                            <tr>
                                <th class="table-header">Hora</th>
                                <th class="table-header">Monto</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                        <tfoot>
                        </tfoot>
                    </table>
                </div>
                <%--<div id="loaderHoy" class="loader ocultar"></div>--%>
                
            </div>
        </div>
    </div>

    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js" defer></script>
    <script>
        
        window.onload = function () {
            document.getElementById("Reportes").classList.add("active");
            document.querySelector("#Reportes .sidebar-submenu").style.display = "block"

            document.getElementById("iconMenuReportes").style.color = '#79B729';
            document.getElementById("iconMenuReportes").style.textShadow = '0px 0px 4px rgbA(229, 246, 27, 0.8)';

            document.getElementById("pedidosPendientes").style.color = '#79B729';
            document.getElementById("pedidosPendientes").style.textShadow = '0px 0px 4px rgbA(229, 246, 27, 0.8)';
        }

        $(document).ready(function () {
            const loaderTipoPago = document.getElementById('loaderTipoPago');
            loaderTipoPago.classList.remove('ocultar'); // Mostrar loader

            $('.basic-multiple').select2();
            $('.basic-multiple').css('visibility', 'visible');

            function formatCurrency(value) {
                return parseFloat(value).toLocaleString("es-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                });
            }

            function mostrarLoaderTabla(tablaId) {
                const tbody = $(`#${tablaId} tbody`);
                tbody.html(`
                    <tr>
                        <td colspan="2" class="text-center">
                            <div class="loader-spinner">Cargando<span>.</span><span>.</span><span>.</span></div>
                        </td>
                    </tr>
                `);
                const tfoot = $(`#${tablaId} tfoot`);
                tfoot.html(`
                    
                `);
            }            

            function mostrarLoaderSpanTotalPendiente() {
                const divTotal = $('.total-amount');
                divTotal.html(`
                    <div class="loader-spinner">Calculando<span>.</span><span>.</span><span>.</span></div><span class="total-amount"></span>
                `);
            }

            const selectTipoPago = document.getElementById('selectTipoPago');
            const loadingOptionTipoPago = document.createElement('option');
            loadingOptionTipoPago.text = 'Cargando...';
            loadingOptionTipoPago.disabled = true;
            loadingOptionTipoPago.selected = true;
            selectTipoPago.appendChild(loadingOptionTipoPago);

            //axios.post('ReportePedidosPendientes.aspx/ListaPedidoTipoPago', {})
            //    .then(response => {
            //        loaderTipoPago.classList.add('ocultar'); // Ocultar loader
            //        selectTipoPago.innerHTML = '';
            //        response.data.d.forEach(e => {
            //            const option = document.createElement('option');
            //            option.value = e.IdTipoPago;
            //            option.text = e.TipoPago;
            //            selectTipoPago.appendChild(option);
            //        });
            //        selectTipoPago.value = '0';
            //        // Inicializar carga
            //        actualizarTotalPendiente();
            //    })
            //    .catch(error => {
            //        loaderTipoPago.classList.add('ocultar'); // Ocultar loader
            //        console.error("Error en la solicitud:", error);
            //    });
            
            //Cambio de axios a fetch
            fetch('ReportePedidosPendientes.aspx/ListaPedidoTipoPago', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})  // Enviar un objeto vacío como body
            })
                .then(response => response.json())
                .then(data => {
                    loaderTipoPago.classList.add('ocultar'); // Ocultar loader
                    selectTipoPago.innerHTML = '';  // Limpiar el select
                    data.d.forEach(e => {
                        const option = document.createElement('option');
                        option.value = e.IdTipoPago;
                        option.text = e.TipoPago;
                        selectTipoPago.appendChild(option);
                    });
                    //selectTipoPago.value = '0';
                    if (selectTipoPago.options.length > 0) {
                        selectTipoPago.selectedIndex = 0;
                    }
                    // Inicializar carga
                    actualizarTotalPendiente();
                })
                .catch(error => {
                    loaderTipoPago.classList.add('ocultar'); // Ocultar loader
                    console.error("Error en la solicitud:", error);
                });

            $('#btnDescargarDetalle').on('click', function () {
                const selectedOptions = $('#selectTipoPago').val();
                const parametros = Array(7).fill('');
                if (selectedOptions && selectedOptions.length > 0) {
                    selectedOptions.forEach((value, index) => {
                        if (index < 7) {
                            parametros[index] = value;
                        }
                    });
                }

                const [tp1, tp2, tp3, tp4, tp5, tp6, tp7] = parametros;

                $.ajax({
                    type: "POST",
                    url: "ReportePedidosPendientes.asmx/CrearArchivoDetallePedidosPendientes",
                    data: JSON.stringify({ tp1, tp2, tp3, tp4, tp5, tp6, tp7 }),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (response) {
                        const result = response.d;

                        if (result.length > 0 && !result[0].startsWith("Error")) {
                            const fileName = result[0];
                            const filePath = `reporteria/pedidospendientes/${fileName}`;
                            const link = document.createElement('a');
                            link.href = filePath;
                            link.download = fileName;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                        } else {
                            alert(result[0] || 'Error desconocido.');
                        }
                    },
                    error: function (xhr, status, error) {
                        alert('Ocurrió un error al intentar generar el archivo: ' + error);
                    }
                });
            });

            function ListaTablaPedidosPendientesAyer() {
                return new Promise((resolve, reject) => {
                    const tablaId = 'pendientes_ayer';
                    mostrarLoaderTabla(tablaId); // Mostrar loader en la tabla

                    const selectedOptions = $('#selectTipoPago').val();
                    const parametros = Array(7).fill('');
                    if (selectedOptions && selectedOptions.length > 0) {
                        selectedOptions.forEach((value, index) => {
                            if (index < 7) {
                                parametros[index] = value;
                            }
                        });
                    }

                    const [tp1, tp2, tp3, tp4, tp5, tp6, tp7] = parametros;

                    $.ajax({
                        type: "POST",
                        url: "ReportePedidosPendientes.aspx/ListaTablaPedidosPendientesAyer",
                        data: JSON.stringify({ tp1, tp2, tp3, tp4, tp5, tp6, tp7 }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (response) {
                            loaderAyer.classList.add('ocultar'); // Ocultar loader
                            const data = response.d;
                            const tbody = $('#pendientes_ayer tbody');
                            const tfoot = $('#pendientes_ayer tfoot');
                            tbody.empty();
                            tfoot.empty();

                            let totalMonto = 0;

                            if (data.length > 0) {
                                data.forEach(item => {
                                    totalMonto += item.MontoSinIGV;

                                    const row = `<tr>
                                <td class="table-cell">${item.Hora}</td>
                                <td class="table-cell">S/. ${formatCurrency(item.MontoSinIGV.toFixed(2))}</td>
                            </tr>`;
                                    tbody.append(row);
                                });

                                const totalRow = `<tr>
                                <td class="table-cell table-footer">Total</td>
                                <td class="table-cell table-footer total-ayer">S/. ${formatCurrency(totalMonto.toFixed(2))}</td>
                            </tr>`;
                                tfoot.append(totalRow);
                            } else {
                                const emptyRow = `<tr>
                                <td class="table-cell" colspan="2">No se encontraron resultados</td>
                            </tr>`;
                                tbody.append(emptyRow);
                            }

                            resolve(totalMonto);
                        },
                        error: function (xhr, status, error) {
                            loaderAyer.classList.add('ocultar'); // Ocultar loader
                            reject('Ocurrió un error al obtener los datos de ayer: ' + error);
                        },
                    });
                });
            }

            function ListaTablaPedidosPendientesHoy() {

                return new Promise((resolve, reject) => {
                    const tablaId = 'pendientes_hoy';
                    mostrarLoaderTabla(tablaId); // Mostrar loader en la tabla

                    const selectedOptions = $('#selectTipoPago').val();
                    const parametros = Array(7).fill('');
                    if (selectedOptions && selectedOptions.length > 0) {
                        selectedOptions.forEach((value, index) => {
                            if (index < 7) {
                                parametros[index] = value;
                            }
                        });
                    }

                    const [tp1, tp2, tp3, tp4, tp5, tp6, tp7] = parametros;

                    $.ajax({
                        type: "POST",
                        url: "ReportePedidosPendientes.aspx/ListaTablaPedidosPendientesHoy",
                        data: JSON.stringify({ tp1, tp2, tp3, tp4, tp5, tp6, tp7 }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (response) {
                            //loaderHoy.classList.add('ocultar'); // Ocultar loader
                            const data = response.d;
                            const tbody = $('#pendientes_hoy tbody');
                            const tfoot = $('#pendientes_hoy tfoot');
                            tbody.empty();
                            tfoot.empty();

                            let totalMonto = 0;

                            if (data.length > 0) {
                                data.forEach(item => {
                                    totalMonto += item.MontoSinIGV;

                                    const row = `<tr>
                                <td class="table-cell">${item.Hora}</td>
                                <td class="table-cell">S/. ${formatCurrency(item.MontoSinIGV.toFixed(2))}</td>
                            </tr>`;
                                    tbody.append(row);
                                });

                                const totalRow = `<tr>
                                <td class="table-cell table-footer">Total</td>
                                <td class="table-cell table-footer total-hoy">S/. ${formatCurrency(totalMonto.toFixed(2))}</td>
                            </tr>`;
                                tfoot.append(totalRow);
                            } else {
                                const emptyRow = `<tr>
                                <td class="table-cell" colspan="2">No se encontraron resultados</td>
                            </tr>`;
                                tbody.append(emptyRow);
                            }

                            resolve(totalMonto);
                        },
                        error: function (xhr, status, error) {
                            loaderHoy.classList.add('ocultar'); // Ocultar loader
                            reject('Ocurrió un error al obtener los datos de hoy: ' + error);
                        },
                    });
                });
            }

            function actualizarTotalPendiente() {                
                mostrarLoaderSpanTotalPendiente();

                Promise.all([ListaTablaPedidosPendientesAyer(), ListaTablaPedidosPendientesHoy()])
                    .then(([totalAyer, totalHoy]) => {
                        //loaderTotal.classList.add('ocultar'); // Ocultar loader
                        const total = totalAyer + totalHoy;
                        const totalSpan = document.querySelector('.total-amount');
                        totalSpan.textContent = `S/. ${formatCurrency(total.toFixed(2))}`;
                    })
                    .catch(error => {
                        loaderTotal.classList.add('ocultar'); // Ocultar loader
                        console.error("Error al cargar los totales:", error);
                    });
            }

            $('#selectTipoPago').on('change', actualizarTotalPendiente);

        });

    </script>




</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
</asp:Content>
