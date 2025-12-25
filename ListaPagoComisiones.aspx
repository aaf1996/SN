<%@ Page Title="" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="ListaPagoComisiones.aspx.cs" Inherits="SantaNaturaNetworkV3.ListaPagoComisiones" ClientIDMode="Static" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .swal2-popup {
            font-size: 1.3rem !important;
        }

        .content label {
            margin-bottom: 0;
        }

        /*--------------------------- Para las tablas -------------------------------------*/
        #mainContent h5 {
            font-weight: bold;
            margin-bottom: 10px;
        }

        .table-bordered th, .table-bordered td {
            text-align: center;
            vertical-align: middle;
        }

        .btn-block {
            margin-top: 15px;
            font-weight: bold;
        }

        /*--------------------------- Para los modales -------------------------------------*/
        .hidden {
            display: none;
        }

        .fade-transition {
            transition: opacity 0.5s ease-in-out;
            opacity: 0; /* Inicia en invisible */
        }

        .fade-in {
            opacity: 1;
            pointer-events: auto; /* Permitir interacción cuando se vea */
        }

        .fade-out {
            opacity: 0;
            pointer-events: none; /* Evitar interacción mientras se oculta */
        }

        .modal-content .modal-header .closeButton {
            position: absolute;
            top: 0;
            right: 0;
            font-size: 2rem;
            padding: 7px 10px 9px;
            border-radius: 0 0 0 10px;
            color: white;
            opacity: 1;
            background: #5F2D8C;
            margin-top: 0;
            transition: .3s ease background;
            border: none;
            font-weight: 500;
        }

            .modal-content .modal-header .closeButton:hover {
                background: #44295c;
            }

        .modal-content .modal-header {
            border-bottom: 0;
        }

        /* Opcional: Estilo del modal para centrarlo */
        /*.modal {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 90%;
            max-width: 600px;
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }*/

        /*--------------------------- Para el bloque secondaryContent -------------------------------------*/
        #mainContent {
            padding: 20px;
        }

            #mainContent .btnCerrar {
                transition: background-color .3s ease;
            }

                #mainContent .btnCerrar:hover {
                    background-color: green
                }

                #mainContent .btnCerrar:focus {
                    outline: none;
                }

            #mainContent .btnEliminarFiles {
                background-color: #5F2D8C;
                font-size: 1.3rem;
            }

                #mainContent .btnEliminarFiles:hover {
                    background: #44295c;
                }

        /*--------------------------- Para el bloque secondaryContent -------------------------------------*/
        /* Contenedor principal */
        #secondaryContent.form-container {
            padding: 0 20px 20px;
            background-color: white;
            border-radius: 10px;
            margin: 0 auto;
            transition: all 0.3s ease;
        }

            /* Título */
            #secondaryContent.form-container h3 {
                font-size: 1.8rem;
                font-weight: bold;
                color: #333;
                margin: 0 20px 35px;
                text-align: center;
            }

        /* Estilos para cada grupo de formulario */
        #secondaryContent .form-group {
            margin-bottom: 20px;
        }

            #secondaryContent .form-group label {
                display: block;
                font-size: 1.3rem;
                color: #555;
                margin-bottom: 0px;
            }

            #secondaryContent .form-group input {
                width: fit-content;
            }

            #secondaryContent .form-group.correo input,
            #secondaryContent .form-group.asunto input,
            #secondaryContent .form-group textarea {
                width: 100%;
            }

            #secondaryContent .form-group input,
            #secondaryContent .form-group textarea {
                padding: 10px;
                font-size: 1.2rem;
                border: 1px solid #ccc;
                border-radius: 5px;
                transition: border-color 0.3s ease;
                margin: 0;
            }

                #secondaryContent .form-group input:focus,
                #secondaryContent .form-group textarea:focus {
                    border-color: #007bff;
                    outline: none;
                }

        /* Grupo de checkboxes */
        #secondaryContent .checkbox-group {
            display: flex;
            flex-direction: column;
        }

            #secondaryContent .checkbox-group:nth-child(1) {
                flex: .8;
            }

            #secondaryContent .checkbox-group:nth-child(2) {
                flex: 1;
            }

            #secondaryContent .checkbox-group div {
                margin-bottom: 10px;
                display: flex;
                flex-direction: row-reverse;
                align-items: center;
                justify-content: space-between;
            }

        /* Estilos para los botones */
        #secondaryContent .button-group {
            display: flex;
            justify-content: space-between;
        }

        #secondaryContent .btn-secondary, #secondaryContent .btn-success {
            padding: 10px 20px;
            font-size: 1.3rem;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            border: none;
        }

        #secondaryContent .btn-secondary {
            background-color: #6c757d;
            color: white;
            border: none;
        }

            #secondaryContent .btn-secondary:hover {
                background-color: #5a6268;
            }

        #secondaryContent .btn-primary {
            background-color: #007bff;
            color: white;
            border: none;
        }

            #secondaryContent .btn-primary:hover {
                background-color: #0056b3;
            }

        /* Transiciones y efectos */
        #secondaryContent .fade-transition {
            transition: opacity 0.3s ease;
        }

        #secondaryContent .fade-out {
            opacity: 0;
        }

        #secondaryContent .fade-in {
            opacity: 1;
        }

        #tbl_facturacion {
            width: 100% !important;
        }

        /* ---------------------------- Estilo base para la paginación ----------------------------------- */
        .dataTables_paginate > a.disabled {
            color: #777;
            cursor: not-allowed;
            background-color: #fff;
            border-color: #ddd;
        }

        .dataTables_paginate {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 20px 0;
        }

            .dataTables_paginate .paginate_button {
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

                .dataTables_paginate .paginate_button:hover {
                    background-color: #e0e0e0;
                    color: #000;
                }

                .dataTables_paginate .paginate_button.current {
                    background-color: #008d4c; /* Color del botón activo */
                    color: #fff;
                    border: 1px solid #008d4c;
                }

                .dataTables_paginate .paginate_button.disabled {
                    background-color: #f9f9f9;
                    color: #aaa;
                    border: 1px solid #ddd;
                    cursor: not-allowed;
                }

            .dataTables_paginate .previous,
            .dataTables_paginate .next {
                font-weight: semi-bold;
            }

                .dataTables_paginate .previous:hover,
                .dataTables_paginate .next:hover {
                    background-color: #dcdcdc;
                }

        /* -----------------------------    Contenedor principal del filtro de búsqueda ----------------------------- */
        .dataTables_filter {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin: 20px 0;
        }

            /* Estilo para la etiqueta del campo de búsqueda */
            .dataTables_filter label {
                font-size: 14px;
                font-weight: bold;
                color: #333;
            }

            /* Estilo para el campo de búsqueda */
            .dataTables_filter input[type="search"] {
                padding: 8px 12px;
                border: 1px solid #ddd;
                border-radius: 4px;
                font-size: 14px;
                transition: border-color 0.3s, box-shadow 0.3s;
                margin-left: 8px;
            }

                /* Efecto al enfocar el campo de búsqueda */
                .dataTables_filter input[type="search"]:focus {
                    border-color: #00a65a; /* Color del borde cuando el campo está enfocado */
                    box-shadow: 0 0 5px rgba(0, 141, 76, 0.5); /* Sombra al hacer foco */
                    outline: none;
                }

        /* Ajustes para dispositivos móviles */
        @media (max-width: 768px) {
            .dataTables_filter {
                flex-direction: column;
                align-items: flex-start;
            }

                .dataTables_filter label {
                    margin-bottom: 8px;
                }
        }

        /*----------------------------------------------------------------------------------*/
        /* Estilos para cada grupo de formulario */
        #secondaryContentValidar .form-group {
            margin-bottom: 20px;
        }

            #secondaryContentValidar .form-group label {
                display: block;
                font-size: 1.3rem;
                color: #555;
                margin-bottom: 0px;
            }

            #secondaryContentValidar .form-group input {
                width: fit-content;
            }

            #secondaryContentValidar .form-group.correo input,
            #secondaryContentValidar .form-group.asunto input,
            #secondaryContentValidar .form-group textarea {
                width: 100%;
            }

            #secondaryContentValidar .form-group input,
            #secondaryContentValidar .form-group textarea {
                padding: 10px;
                font-size: 1.2rem;
                border: 1px solid #ccc;
                border-radius: 5px;
                transition: border-color 0.3s ease;
                margin: 0;
            }

                #secondaryContentValidar .form-group input:focus,
                #secondaryContentValidar .form-group textarea:focus {
                    border-color: #007bff;
                    outline: none;
                }

        /* Grupo de checkboxes */
        #secondaryContentValidar .checkbox-group {
            display: flex;
            flex-direction: column;
        }

            #secondaryContentValidar .checkbox-group:nth-child(1) {
                flex: .8;
            }

            #secondaryContentValidar .checkbox-group:nth-child(2) {
                flex: 1;
            }

            #secondaryContentValidar .checkbox-group div {
                margin-bottom: 10px;
                display: flex;
                flex-direction: row-reverse;
                align-items: center;
                justify-content: space-between;
            }

        /* Estilos para los botones */
        #secondaryContentValidar .button-group {
            display: flex;
            justify-content: space-between;
        }

        #secondaryContentValidar .btn-secondary, #secondaryContentValidar .btn-success {
            padding: 10px 20px;
            font-size: 1.3rem;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            border: none;
        }

        #secondaryContentValidar .btn-secondary {
            background-color: #6c757d;
            color: white;
            border: none;
        }

            #secondaryContentValidar .btn-secondary:hover {
                background-color: #5a6268;
            }

        #secondaryContentValidar .btn-primary {
            background-color: #007bff;
            color: white;
            border: none;
        }

            #secondaryContentValidar .btn-primary:hover {
                background-color: #0056b3;
            }

        /* Transiciones y efectos */
        #secondaryContentValidar .fade-transition {
            transition: opacity 0.3s ease;
        }

        #secondaryContentValidar .fade-out {
            opacity: 0;
        }

        #secondaryContentValidar .fade-in {
            opacity: 1;
        }


        /*----------------------------------------------------------------------------------*/
        /* Estilos para cada grupo de formulario */
        #secondaryContentTransferirDirectoMonedero .form-group {
            margin-bottom: 20px;
        }

            #secondaryContentTransferirDirectoMonedero .form-group label {
                display: block;
                font-size: 1.3rem;
                color: #555;
                margin-bottom: 0px;
            }

            #secondaryContentTransferirDirectoMonedero .form-group input {
                width: fit-content;
            }

            #secondaryContentTransferirDirectoMonedero .form-group.correo input,
            #secondaryContentTransferirDirectoMonedero .form-group.asunto input,
            #secondaryContentTransferirDirectoMonedero .form-group textarea {
                width: 100%;
            }

            #secondaryContentTransferirDirectoMonedero .form-group input,
            #secondaryContentTransferirDirectoMonedero .form-group textarea {
                padding: 10px;
                font-size: 1.2rem;
                border: 1px solid #ccc;
                border-radius: 5px;
                transition: border-color 0.3s ease;
                margin: 0;
            }

                #secondaryContentTransferirDirectoMonedero .form-group input:focus,
                #secondaryContentTransferirDirectoMonedero .form-group textarea:focus {
                    border-color: #007bff;
                    outline: none;
                }

        /* Grupo de checkboxes */
        #secondaryContentTransferirDirectoMonedero .checkbox-group {
            display: flex;
            flex-direction: column;
        }

            #secondaryContentTransferirDirectoMonedero .checkbox-group:nth-child(1) {
                flex: .8;
            }

            #secondaryContentTransferirDirectoMonedero .checkbox-group:nth-child(2) {
                flex: 1;
            }

            #secondaryContentTransferirDirectoMonedero .checkbox-group div {
                margin-bottom: 10px;
                display: flex;
                flex-direction: row-reverse;
                align-items: center;
                justify-content: space-between;
            }

        /* Estilos para los botones */
        #secondaryContentTransferirDirectoMonedero .button-group {
            display: flex;
            justify-content: space-between;
        }

        #secondaryContentTransferirDirectoMonedero .btn-secondary, #secondaryContentTransferirDirectoMonedero .btn-success {
            padding: 10px 20px;
            font-size: 1.3rem;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            border: none;
        }

        #secondaryContentTransferirDirectoMonedero .btn-secondary {
            background-color: #6c757d;
            color: white;
            border: none;
        }

            #secondaryContentTransferirDirectoMonedero .btn-secondary:hover {
                background-color: #5a6268;
            }

        #secondaryContentTransferirDirectoMonedero .btn-primary {
            background-color: #007bff;
            color: white;
            border: none;
        }

            #secondaryContentTransferirDirectoMonedero .btn-primary:hover {
                background-color: #0056b3;
            }

        /* Transiciones y efectos */
        #secondaryContentTransferirDirectoMonedero .fade-transition {
            transition: opacity 0.3s ease;
        }

        #secondaryContentTransferirDirectoMonedero .fade-out {
            opacity: 0;
        }

        #secondaryContentTransferirDirectoMonedero .fade-in {
            opacity: 1;
        }

        /* -------------------------------------------------------- */
        #comisionTerceros tbody tr td:nth-child(3) {
            font-size: 11px;
        }

        tbody tr td {
            font-size: 13px;
        }

        thead tr th,
        tbody tr td {
            vertical-align: middle !important;
        }

        #comisionTerceros tbody tr td:nth-child(4),
        #comisionTerceros tbody tr td:nth-child(5),
        #comisionTerceros tbody tr td:nth-child(6) {
            text-wrap-mode: nowrap;
        }

        #tbl_facturacion_length label {
            display: flex;
            align-items: center;
            grid-gap: 10px;
        }
        /* -------------------------------------------------------- */
        .inputCorreo:disabled,
        textarea:read-only {
            cursor: not-allowed;
            background-color: rgba(239, 239, 239, 0.3);
        }

        /* ------------------ Estilo para los botones de SweetAlert ---------------------------- */
        .swal2-actions .swal2-styled.swal2-confirm {
            background-color: #449d44; /* Color base del botón */
            color: white;
            border: none;
        }

            .swal2-actions .swal2-styled.swal2-confirm:hover {
                background-color: #398439; /* Un tono más oscuro para el hover */
            }

        .swal2-actions .swal2-styled.swal2-cancel {
            background-color: #cccccc; /* Color para el botón de cancelar */
            color: black;
            border: none;
        }

            .swal2-actions .swal2-styled.swal2-cancel:hover {
                background-color: #aaaaaa; /* Un tono más oscuro para el hover del botón de cancelar */
            }

        /*--------------------------------- SPINNER ----------------------------------------*/
        /* Estilo para el loader */
        .loader {
            border: 6px solid rgba(0, 166, 90, 0.80);
            border-top: 4px solid #DFDDDF;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 0 auto;
        }

        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(360deg);
            }
        }

        /*---------------------TITULO------------------------------*/
        .titulo-elegante {
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

            .titulo-elegante::after {
                content: "";
                display: block;
                width: 50%;
                height: 4px;
                background-color: #00a65a;
                margin: 10px auto 0;
                border-radius: 5px;
            }
        /*---------------------------- SELECTS ----------------------------------*/
        .filtro-contenedor {
            display: flex;
            align-items: flex-end;
            justify-content: center;
            gap: 30px;
            padding: 20px 0;
        }

        .filtro-item {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

            .filtro-item label {
                font-weight: bold;
                font-size: 1.1em;
                color: #555; /* Color corporativo */
                margin-bottom: 5px;
            }

        .select-elegante {
            width: 100%;
            padding: 10px;
            font-size: 1em;
            border: 2px solid #9F8948; /* Borde dorado */
            border-radius: 8px;
            background-color: #f8f9fa;
            color: #153285; /* Color de texto */
            transition: border-color 0.5s ease, box-shadow 0.5s ease;
            /* Sombra sutil */
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        }

            .select-elegante:focus {
                border-color: #254ab1; /* Cambia el color del borde al hacer focus */
                box-shadow: 0 0 8px rgba(37, 74, 177, 0.3); /* Sombra al enfocarse */
                outline: none;
            }

        /* ------------------------------------- Modal Styling -------------------------------------*/
        #modalDetalleXBono .modal-dialog,
        #modalDetalleXDescuento .modal-dialog {
            max-width: 90%; /* Tamaño máximo del modal */
            margin: 1.75rem auto; /* Centrado vertical y horizontal */
        }

        #modalDetalleXBono .modal-content,
        #modalDetalleXDescuento .modal-content {
            border-radius: 10px; /* Bordes redondeados */
            border: 1px solid #ddd; /* Borde suave */
        }

        #modalDetalleXBono .modal-header,
        #modalDetalleXDescuento .modal-header {
            border-bottom: 1px solid #ddd; /* Línea separadora */
            padding: 15px;
        }

        #modalDetalleXBono .modal-title,
        #modalDetalleXDescuento .modal-title {
            font-size: 2.25rem;
            font-weight: bold;
            text-align: center;
        }

        #modalDetalleXBono .btn-close,
        #modalDetalleXDescuento .btn-close {
            background: transparent;
            border: none;
            font-size: 1.5rem;
            color: #888;
        }

            #modalDetalleXBono .btn-close:hover,
            #modalDetalleXDescuento .btn-close:hover {
                color: #333; /* Cambiar color al pasar el ratón */
            }

        /* Modal Body Styling */
        #modalDetalleXBono .modal-body,
        #modalDetalleXDescuento .modal-body {
            padding: 20px;
            max-height: 70vh; /* Limitar la altura del contenido */
            overflow-y: auto; /* Permitir desplazamiento si el contenido es largo */
        }

        /* Tabla Styling */
        #modalDetalleXBono .table,
        #modalDetalleXDescuento .table {
            width: 100%;
            border-collapse: collapse;
            margin: 0 auto;
        }

        #modalDetalleXBono .table-bordered,
        #modalDetalleXDescuento .table-bordered {
            border: 1px solid #ddd; /* Borde de la tabla */
        }

        #modalDetalleXBono .table th,
        #modalDetalleXDescuento .table th,
        #modalDetalleXBono .table td,
        #modalDetalleXDescuento .table td {
            padding: 10px;
            text-align: center;
            vertical-align: middle;
            border: 1px solid #ddd;
        }

        #modalDetalleXBono .table th,
        #modalDetalleXDescuento .table th {
            background-color: #f4f4f4; /* Fondo suave para los encabezados */
            color: #555;
            font-weight: bold;
        }

        #modalDetalleXBono .table td,
        #modalDetalleXDescuento .table td {
            font-size: 1.4rem;
            color: #333;
        }

        /* Estilo del botón de cerrar */
        #modalDetalleXBono .btn-close,
        #modalDetalleXDescuento .btn-close {
            background: transparent;
            border: none;
            font-size: 1.5rem;
            color: #888; /* Color gris suave */
            padding: 0.5rem;
            cursor: pointer; /* Cambia el cursor al pasar por encima */
            transition: color 0.3s ease; /* Animación suave para el cambio de color */
            position: absolute;
            right: 10px;
            top: 10px;
        }

            #modalDetalleXBono .btn-close:hover,
            #modalDetalleXDescuento .btn-close:hover {
                color: #333; /* Color oscuro al pasar el ratón */
            }

            #modalDetalleXBono .btn-close:focus,
            #modalDetalleXDescuento .btn-close:focus {
                outline: none; /* Elimina el borde por defecto al hacer clic */
            }

        /* Estilos Responsivos */
        @media (min-width: 768px) {
            #modalDetalleXBono .modal-dialog,
            #modalDetalleXDescuento .modal-dialog {
                width: auto !important;
                margin: 30px auto;
            }
        }

        @media (max-width: 768px) {
            #modalDetalleXBono .modal-dialog,
            #modalDetalleXDescuento .modal-dialog {
                max-width: 100%; /* Ajustar el tamaño en pantallas pequeñas */
            }

            #modalDetalleXBono .table th,
            #modalDetalleXDescuento .table th,
            #modalDetalleXBono .table td,
            #modalDetalleXDescuento .table td {
                font-size: 1.15rem; /* Reducir el tamaño de fuente en pantallas pequeñas */
                padding: 8px;
            }

            #modalDetalleXBono .modal-title,
            #modalDetalleXDescuento .modal-title {
                font-size: 1rem;
            }
        }

        #modalDetalleXBono .fade,
        #modalDetalleXDescuento .fade {
            opacity: 1;
            -webkit-transition: opacity .15s linear;
            -o-transition: opacity .15s linear;
            transition: opacity .15s linear;
        }

        #modalDetalleXBono .fade-out,
        #modalDetalleXDescuento .fade-out {
            opacity: 0;
            transition: opacity 0.5s ease;
        }

        #modalDetalleXBono .hidden,
        #modalDetalleXDescuento .hidden {
            display: none;
        }

    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div style="background-image: url(https://tienda.mundosantanatura.com/img/fondoSumaqWasi.jpg); min-height: 100vh">
        <section class="content-header">
            <%--<h1 style="text-align: center; margin: 0; padding: 20px 0 10px">Gestión de Comisiones</h1>--%>
            <h1 class="titulo-elegante">Lista Pago Comisiones</h1>
        </section>
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box box-success" style="display: flex; flex-direction: column;">
                        <div class="box box-header" style="display: none">
                            <h3 class="box-title">Lista de datos</h3>
                        </div>
                        <div class="filtro-contenedor">
                            <div class="filtro-item">
                                <label for="pais">País</label>
                                <select id="pais" class="form-control select-elegante" disabled>
                                    <option value="00">Seleccione:</option>
                                    <option value="01" selected>Perú</option>
                                </select>
                            </div>

                            <div class="filtro-item">
                                <label for="mesComiAdmi">Mes Comisión</label>
                                <select id="mesComiAdmi" class="form-control select-elegante"></select>
                            </div>

                            <!-- Botón para exportar a Excel -->
                            <div class="filtro-item">
                                <button type="button" id="btnExportarExcel" class="btn btn-success">Exportar Excel</button>
                            </div>


                        </div>
                        <div class="box-body">
                            <div class="col-md-12">
                                <div class="box-body">
                                    <div class="form-group">
                                        <!-- Modal -->
                                        <div class="modal" id="modalDetalleXBono" tabindex="-1" role="dialog" aria-labelledby="modalDetalleXBonoLabel" data-backdrop="static" style="display: none">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="modalDetalleXBonoLabel">Detalle por Bono</h5>
                                                        <button id="closeModalButton" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">❌</button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <table id="tbl_detalle_bono" class="table table-bordered">
                                                            <thead>
                                                                <tr>
                                                                    <th>Bono Afilia Mes</th>
                                                                    <th>Bono Liderazgo Mes</th>
                                                                    <th>Bono Generacion 360 Mes</th>
                                                                    <th>Bono Super Generacion 360 Mes</th>
                                                                    <th>Bono Matricial Mes</th>
                                                                    <th>Bono Mercadeo Mes</th>
                                                                    <th>Bono Aguinaldo Mes</th>
                                                                    <th>Bono Permanencia Mes</th>
                                                                    <th>Bono Arranque Explosivo Bronce</th>
                                                                    <th>Bono Arranque Explosivo Patrocinio</th>
                                                                    <th>Bono Arranque Explosivo Oro</th>
                                                                    <th>Bono Regularizacion</th>
                                                                    <th>Adicional Terceros</th>
                                                                    <th>Total</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody id="tbl_body_detalle_bono">
                                                                <!-- Las filas se insertarán aquí -->
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Modal -->
                                        <div class="modal" id="modalDetalleXDescuento" tabindex="-1" role="dialog" aria-labelledby="modalDetalleXDescuentoLabel" data-backdrop="static" style="display: none">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="modalDetalleXDescuentoLabel">Detalle Descuento Transacción</h5>
                                                        <button id="closeModalDescuentoButton" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">❌</button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <table id="tbl_detalle_descuento" class="table table-bordered">
                                                            <thead>
                                                                <tr>
                                                                    <th>Orden</th>
                                                                    <th>Id Transaccion</th>
                                                                    <th>Id Monedero</th>
                                                                    <th>Monto</th>
                                                                    <th>Balance Previo</th>
                                                                    <th>Nuevo Balance</th>
                                                                    <th>Referencia</th>
                                                                    <th>Fecha Operacion</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody id="tbl_body_detalle_desc">
                                                                <!-- Las filas se insertarán aquí -->
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 table-responsive">
                                <table id="tbl_lista_pago_comi" class="table table-bordered table-hover text-center">
                                    <thead>
                                        <tr>
                                            <th>Id Empresario</th>
                                            <th>DNI</th>
                                            <th>Nro. RUC</th>
                                            <th>Nombres y Apellidos</th>
                                            <th>País</th>
                                            <th>Mes Comisión</th>
                                            <th>Comisión Total</th>
                                            <th>Comisión Sin IGV</th>
                                            <th>IGV</th>
                                            <th>Detracción</th>
                                            <th>Comisión Disponible</th>
                                            <th>Estado Aprobación</th>
                                            <th>XML</th>
                                            <th>PDF</th>
                                            <th>Detalle por Bono</th>
                                            <th>Detalle de Descuentos</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbl_body_table">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/sweetalert2@10.10.4/dist/sweetalert2.all.min.js" type="text/javascript"> </script>

            <!-- JS de DataTables -->
            <script src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>
            <%--<script src="js/GestionarCanjesYComisionSocios.js?Fv44" type="text/javascript"></script>--%>

            <script src="js/proyecto2/listaPagoComi.js?v3" type="text/javascript"></script>
            <script type="text/javascript">
                window.onload = function () {
                    document.getElementById("GestionRedes").classList.add("active");
                    document.querySelector("#GestionRedes .sidebar-submenu").style.display = "block"

                    document.getElementById("gestMulti").style.color = '#79B729';
                    document.getElementById("gestMulti").style.textShadow = '0px 0px 4px rgbA(229, 246, 27, 0.8)';

                    document.getElementById("listaPagoComi").style.color = '#79B729';
                    document.getElementById("listaPagoComi").style.textShadow = '0px 0px 4px rgbA(229, 246, 27, 0.8)';
                }

                $(document).ready(function () {
                    $('#btnExportarExcel').on('click', function () {
                        // Parámetros que serán enviados al WebMethod
                        const idpais = $('#pais').val(); // Asegúrate de tener el input con este ID
                        const mesComi = $('#mesComiAdmi').val(); // Asegúrate de tener el input con este ID

                        if (!idpais || !mesComi) {
                            alert('Por favor ingresa los valores requeridos.');
                            return;
                        }

                        // Llamada al WebMethod
                        $.ajax({
                            type: "POST",
                            url: "Autocompletado.asmx/CrearArchivoComisionesTesoreria",
                            data: JSON.stringify({ idpais, mesComi }),
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (response) {
                                const result = response.d;

                                if (result.length > 0 && !result[0].startsWith("Error")) {
                                    const fileName = result[0];
                                    const filePath = `tesoreria/Descarga/${fileName}`;

                                    // Inicia la descarga del archivo
                                    const link = document.createElement('a');
                                    link.href = filePath;
                                    link.download = fileName;
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);
                                } else {
                                    // Mostrar error en caso de problemas
                                    const errorMessage = result.length > 0 ? result[0] : 'Error desconocido.';
                                    alert(errorMessage);
                                }
                            },
                            error: function (xhr, status, error) {
                                alert('Ocurrió un error al intentar generar el archivo: ' + error);
                            }
                        });
                    });
                });
            </script>
        </section>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
</asp:Content>
