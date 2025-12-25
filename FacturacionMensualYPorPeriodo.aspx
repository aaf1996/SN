<%@ Page Title="" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="FacturacionMensualYPorPeriodo.aspx.cs" Inherits="SantaNaturaNetworkV3.FacturacionMensualYPorPeriodo" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    
    <link href="css/datatables/dataTables.bootstrap.css" rel="stylesheet" />
    <style>
        /* Body */
        .body-bg {
            background-color: #f7fafc;
            padding: 16px;
        }

        /* Container */
        .containerPedidosPendientes {
            padding: 20px 60px;
        }

        /* Title */
        .tituloReportePedidosPendientes {
            margin-bottom: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            grid-gap: 160px;
        }

            .tituloReportePedidosPendientes .title {
                font-family: system-ui; /* Fuente estilizada */
                font-size: 3em; /* Tamaño grande */
                color: #254ab1; /* Color principal */
                text-align: center;
                margin: 0;
                padding: 20px 0 10px;
                background: linear-gradient(to right, #333, #a9a7a7);
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

                
        .filtros-sticky {
            background-color: rgba(255,255,255,.8);
            position: sticky;
            top: 0;
            z-index: 100;
            padding: 10px;
        }

        /* Form Group */
        .containerPedidosPendientes .form-group {
            margin-bottom: 30px;
            display: flex;
            justify-content: space-between;
            flex-direction: row;
            grid-gap: 70px;
            max-width: 1000px;
            margin: auto;
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
            justify-content: center;
            align-items: center;
            margin-bottom: 5px;
            margin-top: 15px;
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
            grid-template-columns: 1fr;
            grid-template-rows: 1fr;
            grid-gap: 40px;
            max-width: 700px;
            margin: auto;
        }
                               
        /* TABLA */
        .table-title {
            font-size: 2rem;
            font-weight: 600;
            margin-bottom: 0;
            margin-top: 0;
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
            box-shadow: inset -3px -1px 12px 4px rgba(0, 0, 0, 0.1)
        }

        .table-cell {
            border: 1px solid #d1d5db;
            padding: 8px;
            text-align: center;
            background: white;
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

        #tablaFacturacionPeriodo > tbody > tr > td,
        #tablaFacturacionMes > tbody > tr > td {
            text-align: center;
            background-color: #fff;
        }

        #tablaFacturacionPeriodo tbody tr:nth-child(even),
        #tablaFacturacionMes tbody tr:nth-child(even) {
            background-color: #f9f9f9;
        }

        #tablaFacturacionPeriodo tbody tr:hover,
        #tablaFacturacionMes tbody tr:hover {
            background-color: #e8f4f8;
        }

        #tablaFacturacionPeriodo,
        #tablaFacturacionMes {
            border-collapse: collapse;
            width: 100%;
        }

            #tablaFacturacionPeriodo th,
            #tablaFacturacionPeriodo td,
            #tablaFacturacionMes th,
            #tablaFacturacionMes td {
                text-align: center;
                padding: 8px;
                border: 1px solid #ddd;
            }

        /*.table-container {
            overflow-y: auto;
            max-height: 400px;
        }*/

        table.dataTable#tablaFacturacionMes thead .sorting_asc,
        table.dataTable#tablaFacturacionPeriodo thead .sorting_asc,
        table.dataTable#tablaFacturacionMes thead .sorting,
        table.dataTable#tablaFacturacionPeriodo thead .sorting{
            background-color: #f7fafc !important;
        }
                .dataTables_paginate  > a.disabled {
            color: #777;
            cursor: not-allowed;
            background-color: #fff;
            border-color: #ddd;
        }
        div.dataTables_paginate.paging_simple_numbers {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 20px 0;
            float: none;
        }

            div.dataTables_paginate .paginate_button {
                background-color: #f0f0f0;
                border: 1px solid #ddd;
                color: #333;
                padding: 8px 12px;
                margin: 0 4px;
                cursor: pointer;
                text-decoration: none;
                border-radius: 4px;
                transition: background-color 0.3s, color 0.3s;
            }

                div.dataTables_paginate .paginate_button:hover {
                    background-color: #e0e0e0;
                    color: #000;
                }

                div.dataTables_paginate .paginate_button.current {
                    background-color: #008d4c; /* Color del botón activo */
                    color: #fff;
                    border: 1px solid #008d4c;
                }

                div.dataTables_paginate .paginate_button.disabled {
                    background-color: #f9f9f9;
                    color: #aaa;
                    border: 1px solid #ddd;
                    cursor: not-allowed;
                }

            div.dataTables_paginate .previous,
            div.dataTables_paginate .next {
                font-weight: semi-bold;
            }

                div.dataTables_paginate .previous:hover,
                div.dataTables_paginate .next:hover {
                    background-color: #dcdcdc;
                }

            div.dataTables_paginate span {
                display: flex;
                flex-wrap: wrap;
                gap: 5px;
                justify-content: center;
            }

        .dataTables_filter input[type="search"] {
            padding: 8px 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 14px;
            transition: border-color 0.3s, box-shadow 0.3s;
            margin-left: 8px;
        }
        .dataTables_filter input[type="search"]:focus {
            outline: none;
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

        .topTable {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 20px 0;
        }


        .range-slider {
            display: flex;
            flex-direction: column;
            max-width: 300px;
            width: 100%;
        }

            .range-slider h3 {
                text-align: center;
                margin-bottom: 1.6em;
                margin-top: 0;
            }

            .range-slider input[type="range"] {
                position: absolute;
                width: fit-content;
                pointer-events: none;
                -webkit-appearance: none;
                background-color: rgba(0,0,0,.1);
                height: 5px;
            }

                .range-slider input[type="range"]::-webkit-slider-thumb {
                    pointer-events: all;
                    width: 18px;
                    height: 18px;
                    background: red;
                    border-radius: 50%;
                    cursor: pointer;
                    -webkit-appearance: none;
                    z-index: 10;
                    position: relative;
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

        /* Glosario */
        .glosario {
            border: 1px solid #ccc;
            padding: 16px;
            border-radius: 8px;
            background-color: #f9f9f9;
            max-width: 400px;
            font-family: Arial, sans-serif;
            margin: 60px auto 0;
        }

            .glosario h3 {
                margin: 0 0 10px;
                font-size: 18px;
                color: #333;
            }

            .glosario ul {
                list-style-type: none;
                padding: 0;
                margin: 0;
            }

                .glosario ul li {
                    margin: 8px 0;
                    line-height: 1.6;
                }

                    .glosario ul li strong {
                        color: #333;
                    }

            .glosario .nota {
                margin-top: 16px;
                font-size: 14px;
                color: #555;
            }

                .glosario .nota span {
                    font-weight: bold;
                    color: #e74c3c;
                }

        /* Loader */
        .loader {
            display: none;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 1.5rem;
            color: #333;
            font-weight: bold;
        }

        /* Modal de Confirmación */
        .modal {
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0, 0, 0, 0.4);
        }

        .modal-content {
            background-color: #fefefe;
            margin: 15% auto;
            padding: 20px;
            border: 1px solid #888;
            width: 30%;
            text-align: center;
        }

        .close {
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
        }

            .close:hover,
            .close:focus {
                color: black;
                text-decoration: none;
                cursor: pointer;
            }
            .page-wrapper .page-content{
                overflow-x: visible !important; 
            }

        @media (max-width: 1400px) {
            .grid {
                display: grid;
                grid-template-columns: 1fr;
                grid-template-rows: 1fr;
                grid-gap: 40px;
                max-width: 600px;
                margin: auto;
            }
        }

        @media (max-width: 1100px) {
            .containerPedidosPendientes .form-group {
                flex-direction: column;
                align-items: center;
                grid-gap: 0px;
            }
        }

        @media (max-width: 640px) {
            .containerPedidosPendientes{
                padding: 20px 60px;
            }
        }

        @media (max-width: 480px) {
            .containerPedidosPendientes{
                padding: 20px 20px;
            }
            .tituloReportePedidosPendientes {
                align-items: flex-end;
                grid-gap: 10px;
                flex-direction: column;
            }
        }

        .swal2-styled.swal2-confirm{
            background-color: #5cb85c !important;
        }
    </style>
    
    
    <link rel="stylesheet" href="css/proyecto2/rSlider.min.css">
    <script src="js/proyecto2/rSlider.min.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="containerPedidosPendientes" style="/*padding-left: 0; padding-right: 0;*/ box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);min-height: 100vh; background-image: url(https://tienda.mundosantanatura.com/img/fondoSumaqWasi.jpg)">
        <section class="tituloReportePedidosPendientes containerPedidosPendientes">
            <span id="spanbtnActualizar" style="width: 90px"></span>
            <h1 class="title">Fact. Mensual y por Periodo</h1>
            <button type="button" id="btnActualizar" class="btn-success">Actualizar</button>
        </section>

        <!-- Modal de Confirmación -->
        <div id="modalExito" class="modal" style="display: none;">
            <div class="modal-content">
                <span class="close" id="closeModal">&times;</span>
                <p>La actualización se realizó con éxito.</p>
            </div>
        </div>

        <div class="filtros-sticky">
            <div class="form-group">
                <div class="range-slider año">
                    <h3>Año</h3>
                    <input type="text" id="sampleSlider" />
                </div>


                <div class="range-slider mes">
                    <h3>Mes</h3>
                    <input type="text" id="sampleSlider2" />
                </div>

                <div class="range-slider 1q">
                    <div id="slider1Q" style="display: none;">
                        <h3>1° Periodo</h3>
                        <div id="sampleSlider3"></div>
                    </div>

                    <div id="loader1Q">
                        <h3>1° Periodo</h3>
                        <span>Cargando...</span>
                    </div>
                </div>

                <div class="range-slider 2q">
                    <div id="slider2Q" style="display: none;">
                        <h3>2° Periodo</h3>
                        <div id="sampleSlider4"></div>
                    </div>

                    <div id="loader2Q">
                        <h3>2° Periodo</h3>
                        <span>Cargando...</span>
                    </div>
                </div>
            </div>

            <!-- Descargar detalle y total pendiente -->
            <div class="flex-row">
                <button type="button" id="btnConsultar" class="btn-success">Consultar</button>
            </div>
        </div>

        <!-- Tablas -->
        <div class="grid">

            <!-- Año-mes -->
            <%--<div>
                <div class="topTable">
                    <h2 class="table-title">Facturación sin IGV por Mes y Canal</h2>
                    <button type="button" id="btnExportarPorMes" class="btn-success">Exportar</button>
                </div>
                <div class="table-container">
                    <table class="table" id="tablaFacturacionMes">
                        <thead>
                            <tr>
                                <th class="table-header">Año-mes</th>
                                <th class="table-header">MLM</th>
                                <th class="table-header">FQ</th>
                                <th class="table-header">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                        <tfoot>
                        </tfoot>
                    </table>
                </div>
            </div>--%>

            <!-- Año-mes -->
            <div>
                <div class="topTable">
                    <h2 class="table-title">Facturación sin IGV por Mes y Canal</h2>
                    <button type="button" id="btnExportarPorMes" class="btn-success">Exportar</button>
                </div>
                <div class="table-container">
                    <table class="table" id="tablaFacturacionMes">
                        <thead>
                            <tr>
                                <th class="table-header">Año-mes</th>
                                <th class="table-header">MLM</th>
                                <%--<th class="table-header">VD</th>
                                <th class="table-header">SW</th>--%>
                                <th class="table-header">FQ</th>
                                <th class="table-header">SW</th>
                                <th class="table-header">Total</th>
                            </tr>
                        </thead>
                        <tbody id="tbl_tbody__tablaFacturacionMes">
                        </tbody>
                    </table>
                </div>
                <%--<div id="loaderHoy" class="loader ocultar"></div>--%>
            </div>

            <!-- Periodo -->
            <div>
                <div class="topTable">
                    <h2 class="table-title">Facturación sin IGV por Periodo y Canal</h2>
                    <button type="button" id="btnExportarPorPeriodo" class="btn-success">Exportar</button>
                </div>
                <div class="table-container">
                    <table class="table" id="tablaFacturacionPeriodo">
                        <thead>
                            <tr>
                                <th class="table-header">Id Periodo</th>
                                <th class="table-header">Periodo</th>
                                <th class="table-header">MLM</th>
                                <%--<th class="table-header">VD</th>
                                    <th class="table-header">SW</th>--%>
                                    <th class="table-header">FQ</th>
                                    <th class="table-header">SW</th>
                                <th class="table-header">Total</th>
                            </tr>
                        </thead>
                        <tbody id="tbl_tbody__tablaFacturacionPeriodo">
                        </tbody>
                    </table>
                </div>
                <div id="loaderAyer" class="loader ocultar"></div>
            </div>
        </div>
        <div class="glosario containerPedidosPendientes">
            <h3>Glosario</h3>
            <ul>
                <li><strong>MLM:</strong> Multinivel.</li>
                <li><strong>VD:</strong> Venta Directa.</li>
                <li><strong>SW:</strong> Sumaq Wasi.</li>
                <li><strong>FQ:</strong> Franquicia.</li>
            </ul>
            <p class="nota">
                <span>*</span> Todos los montos son sin IGV.<br />
                <span>*</span> Si el cierre cae en el mes posterior calendario, se considerará un día más como número. Ejemplo: Cierre de Septiembre es 1 de Octubre. Por lo tanto, Septiembre tendrá 31 días.
 
            </p>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@10.10.4/dist/sweetalert2.all.min.js" type="text/javascript"> </script>
    <script src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>
    <script>
        window.onload = function () {
            document.getElementById("Reportes").classList.add("active");
            document.querySelector("#Reportes .sidebar-submenu").style.display = "block"

            document.getElementById("iconMenuReportes").style.color = '#79B729';
            document.getElementById("iconMenuReportes").style.textShadow = '0px 0px 4px rgbA(229, 246, 27, 0.8)';

            document.getElementById("factMensualYPorPeriodo").style.color = '#79B729';
            document.getElementById("factMensualYPorPeriodo").style.textShadow = '0px 0px 4px rgbA(229, 246, 27, 0.8)';
        }

        function actualizarData() {
            //$('#btnActualizar').hide();
            //$('#spanbtnActualizar').hide();
            $.ajax({
                type: "POST",
                url: "FacturacionMensualYPorPeriodo.aspx/ActualizacionReporteria",
                data: '',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function (response) {
                    // Extrae el mensaje devuelto por el WebMethod
                    const mensaje = response.d; // .d es el valor retornado en un WebMethod de ASP.NET

                    // Mostrar el mensaje usando SweetAlert
                    Swal.fire({
                        title: 'La actualización se realizó con éxito',
                        text: mensaje,
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    });

                    // Ocultar el botón y su span asociado
                    $('#btnActualizar').hide();
                    $('#spanbtnActualizar').hide();

                    enviarValores();
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    Swal.fire({
                        title: 'Error',
                        text: 'Ocurrió un problema al realizar la actualización.',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                    console.error("Error: ", textStatus, errorThrown, XMLHttpRequest.responseText);
                }
            });
        }
        
        // Vincular al botón de actualización
        $('#btnActualizar').on('click', actualizarData);

        var mySlider;
        var mySlider2;
        var mySlider3;
        var mySlider4;

        let slider1Changed = false;
        let slider2Changed = false;

        
        let primeraCarga = true;

        // Función que convierte un AJAX en una promesa
        function ajaxRequest(url, data) {
            return new Promise(function (resolve, reject) {
                $.ajax({
                    type: "POST",
                    url: url,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: JSON.stringify(data),
                    success: function (response) {
                        resolve(response);
                    },
                    error: function (xhr, status, error) {
                        reject(error);
                    }
                });
            });
        }

        // Función que se ejecuta después de que los dos primeros AJAX se resuelvan
        function initSliders() {

            Promise.all([
                ajaxRequest("FacturacionMensualYPorPeriodo.aspx/ListaAnioComercialEstandar", {}),
                ajaxRequest("FacturacionMensualYPorPeriodo.aspx/ListaMesComercialEstandar", {})
            ])
                .then(function ([response1, response2]) {
                    // Inicializa el primer slider Año
                    const años = response1.d.map(item => item.Anio);
                    mySlider = new rSlider({
                        target: '#sampleSlider',
                        values: años,
                        range: true,
                        tooltip: true,
                        scale: true,
                        labels: true,
                        set: [años[0], años[años.length - 1]],
                        onChange: function (value) {
                            slider1Changed = true;
                            if (slider1Changed && slider2Changed) {
                                cambioParaDías1Qy2Q();
                            }
                        }
                    });

                    // Inicializa el segundo slider Mes
                    const meses = response2.d.map(item => item.Mes);
                    mySlider2 = new rSlider({
                        target: '#sampleSlider2',
                        values: meses,
                        range: true,
                        tooltip: true,
                        scale: true,
                        labels: true,
                        set: [meses[0], meses[meses.length - 1]],
                        onChange: function (value) {
                            slider2Changed = true;
                            if (slider1Changed && slider2Changed) {
                                cambioParaDías1Qy2Q();
                            }
                        }
                    });


                })
                .catch(function (error) {
                    console.error("Error en los primeros AJAX: ", error);
                });
        }

        // Función para obtener los valores actuales de un slider
        function getSliderValues(slider) {
            if (slider) {
                return slider.getValue().split(',').map(Number); // Convierte a array de números
            } else {
                console.warn("El slider no está definido");
                return [];
            }
        }

        // Función para enviar los valores al WebMethod
        function cambioParaDías1Qy2Q() {
            const valores = getSliderValues(mySlider);  // Obtener valores del primer slider
            const valores2 = getSliderValues(mySlider2);  // Obtener valores del segundo slider

            // Crear el payload para el AJAX
            const data = {
                anioInicio: valores[0],
                anioFin: valores[1],
                mesInicio: valores2[0],
                mesFin: valores2[1]
            };

            // Mostrar loader para el 1° periodo y 2° periodo
            document.getElementById('slider1Q').style.display = 'none';
            document.getElementById('loader1Q').style.display = 'block';
            document.getElementById('slider2Q').style.display = 'none';
            document.getElementById('loader2Q').style.display = 'block';

            // Realizar ambas solicitudes AJAX en paralelo con Promise.all
            Promise.all([
                ajaxRequest("FacturacionMensualYPorPeriodo.aspx/ObtenerFiltroDiaComercialMaximoEstandar1Q", data),
                ajaxRequest("FacturacionMensualYPorPeriodo.aspx/ObtenerFiltroDiaComercialMaximoEstandar2Q", data)
            ])
                .then(function ([response1, response2]) {

                    // ------------- Muestra el slider y oculta el cargando ---------------
                    document.getElementById('loader1Q').style.display = 'none';
                    document.getElementById('slider1Q').style.display = 'block';
                    document.getElementById('loader2Q').style.display = 'none';
                    document.getElementById('slider2Q').style.display = 'block';
                    //-----------------------------------------------------------------------

                    //--------- Primer respuesta (response1) para el slider 3 -------------
                    const resultados1 = response1.d;
                    const valoresDinamicos1 = Array.from({ length: resultados1.Maximo + 1 }, (_, i) => i);

                    // Crear el tercer slider con los resultados de la primera respuesta
                    const sliderContainer1 = document.querySelector('#sampleSlider3');
                    let sibling = sliderContainer1.nextSibling;
                    while (sibling) {
                        const nextSibling = sibling.nextSibling;
                        sibling.remove();
                        sibling = nextSibling;
                    }

                    mySlider3 = new rSlider({
                        target: '#sampleSlider3',
                        values: valoresDinamicos1,
                        range: true,
                        tooltip: true,
                        scale: true,
                        labels: false,
                        set: [0, resultados1.Maximo],
                    });               
                    //-----------------------------------------------------------------------

                    // ---------- Segunda respuesta (response2) para el slider 4 ------------
                    const resultados2 = response2.d;
                    const valoresDinamicos2 = Array.from({ length: resultados2.Maximo + 1 }, (_, i) => i);

                    // Crear el tercer slider con los resultados de la primera respuesta
                    const sliderContainer2 = document.querySelector('#sampleSlider4');
                    let sibling2 = sliderContainer2.nextSibling;
                    while (sibling2) {
                        const nextSibling2 = sibling2.nextSibling;
                        sibling2.remove();
                        sibling2 = nextSibling2;
                    }

                    mySlider4 = new rSlider({
                        target: '#sampleSlider4',
                        values: valoresDinamicos2,
                        range: true,
                        tooltip: true,
                        scale: true,
                        labels: false,
                        set: [0, resultados2.Maximo],
                    });
                    //-----------------------------------------------------------------------
                    if (primeraCarga) {
                        enviarValores();
                    }
                    primeraCarga = false;
                })
                .catch(function (error) {
                    console.error("Error en las solicitudes AJAX: ", error);
                });
        }

        // Ejecutar la inicialización de sliders
        initSliders();

        function enviarValores() {
            // Obtener valores de los sliders
            const anio = getSliderValues(mySlider);  // Valores del primer slider
            const mes = getSliderValues(mySlider2);  // Valores del segundo slider
            const primerPeriodo = getSliderValues(mySlider3);  // Valores del tercer slider
            const segundoPeriodo = getSliderValues(mySlider4);  // Valores del cuarto slider

            // Crear el payload para las solicitudes AJAX
            const data = {
                anioInicio: anio[0],
                anioFin: anio[1],
                mesInicio: mes[0],
                mesFin: mes[1],
                diaInicio1Q: primerPeriodo[0],
                diaFin1Q: primerPeriodo[1],
                diaInicio2Q: segundoPeriodo[0],
                diaFin2Q: segundoPeriodo[1],
            };

            const tbody = document.getElementById('tbl_tbody__tablaFacturacionMes');
            tbody.innerHTML = '<tr><td colspan="18" style="text-align: center;"><div class="loader"></div></td></tr>'; // Ajusta el número de columnas según tu tabla

            // Realizar múltiples solicitudes AJAX usando Promise.all
            Promise.all([
                $.ajax({
                    type: "POST",
                    url: "FacturacionMensualYPorPeriodo.aspx/ListaTablaFacturacionMes", // Segundo WebMethod
                    data: JSON.stringify(data),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                }),
                $.ajax({
                    type: "POST",
                    url: "FacturacionMensualYPorPeriodo.aspx/ListaTablaFacturacionPeriodo",
                    data: JSON.stringify(data),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                })
            ])
                .then(function ([response1, response2]) {
                    // Ocultar loaders y mostrar tabla
                    //document.getElementById('loaderTabla').style.display = 'none';
                    //document.getElementById('tablaFacturacionPedido').style.display = 'table';

                    // Procesar respuesta del primer WebMethod
                    //console.log(response1);
                    //console.log(response2);
                    llenarTablaFacturacionMes(response1.d);
                    llenarTablaFacturacionPeriodo(response2.d);

                    // Procesar respuesta del segundo WebMethod (puedes adaptarlo según sea necesario)
                    //console.log("Segunda respuesta:", response2.d);
                })
                .catch(function (error) {
                    console.error("Error en las solicitudes AJAX:", error);
                    alert("Hubo un error al realizar las solicitudes.");
                });
        }

        function formatCurrency(value) {
            return parseFloat(value).toLocaleString("es-US", { // Primer convertimos de String a Decimal con parseFloat, luego convertirmos de decimal a String en formato US para los decimales.
                minimumFractionDigits: 2, //que si o si vean 2 decimales. Si es 1000 saldría 1,000.00
                maximumFractionDigits: 2 //en caso tenga mas de 2 decimales se redondea a 2 decimales.
            });
        }

        // Función para llenar la tabla con los datos de Facturacion Mes
        function llenarTablaFacturacionMes(data) {
            
            const tbody = document.getElementById('tbl_tbody__tablaFacturacionMes');

            // Destruir DataTable si ya está inicializado
            if ($.fn.DataTable.isDataTable('#tablaFacturacionMes')) {
                $('#tablaFacturacionMes').DataTable().destroy();
            }

            // Limpiar el contenido del tbody
            tbody.innerHTML = '';

            // Crear filas para cada elemento de datos
            data.forEach(item => {
                const SUMATOTALPERIODO = (item.MLM || 0) + (item.FQ || 0) + (item.SW || 0);
                const row = document.createElement('tr');
                row.innerHTML = `
                <td>${item.AnioMes}</td>
                <td>${formatCurrency(item.MLM) || 0}</td>
                <td>${formatCurrency(item.FQ) || 0}</td>
                <td>${formatCurrency(item.SW) || 0}</td>
                <td>${formatCurrency(SUMATOTALPERIODO) || 0}</td>
            `;
                tbody.appendChild(row);
            });

            $('#tablaFacturacionMes').DataTable({
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
        }

        // Función para llenar la tabla con los datos de Facturacion Periodo  
        function llenarTablaFacturacionPeriodo(data) {

            const tbody = document.getElementById('tbl_tbody__tablaFacturacionPeriodo');

            // Destruir DataTable si ya está inicializado
            if ($.fn.DataTable.isDataTable('#tablaFacturacionPeriodo')) {
                $('#tablaFacturacionPeriodo').DataTable().destroy();
            }

            // Limpiar el contenido del tbody
            tbody.innerHTML = '';

            // Crear filas para cada elemento de datos
            data.forEach(item => {
                const SUMATOTALPERIODO = (item.MLM || 0) + (item.FQ || 0) + (item.SW || 0);
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.IdPeriodo}</td>
                    <td>${item.Periodo}</td>
                    <td>${formatCurrency(item.MLM) || 0}</td>
                    <td>${formatCurrency(item.FQ) || 0}</td>
                    <td>${formatCurrency(item.SW) || 0}</td>
                    <td>${formatCurrency(SUMATOTALPERIODO) || 0}</td>
                `;
                tbody.appendChild(row);
            });

            $('#tablaFacturacionPeriodo').DataTable({
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
        }

        // Vincular al botón de actualización
        $('#btnConsultar').on('click', enviarValores);


    </script>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
</asp:Content>
