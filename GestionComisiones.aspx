<%@ Page Title="" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="GestionComisiones.aspx.cs" Inherits="SantaNaturaNetworkV3.GestionComisiones" ClientIDMode="Static" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">   
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css">
    <link href="css/datatables/dataTables.bootstrap.css" rel="stylesheet" />
    <style>
        .swal2-popup {
            font-size: 1.3rem !important;
        }

        .content label{
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
        #mainContent{
            padding: 20px;
        }

        #mainContent .btnCerrar{
            transition: background-color .3s ease;
        }
        #mainContent .btnCerrar:hover{
            background-color: green
        }
        #mainContent .btnCerrar:focus{
            outline: none;
        }

        #mainContent .btnEliminarFiles{
            background-color: #5F2D8C;
            font-size: 1.3rem;
        }
        #mainContent .btnEliminarFiles:hover{            
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

            #secondaryContent .form-group input{
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

        #tbl_facturacion{
            width: 100% !important;
        }
        
        /* ---------------------------- Estilo base para la paginación ----------------------------------- */
        .dataTables_paginate  > a.disabled {
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

            #secondaryContentValidar .form-group input{
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

        #secondaryContentValidar .btn-secondary, 
        #secondaryContentValidar .btn-success,
        #secondaryContentValidar .btn-danger {
            padding: 10px 20px;
            font-size: 1.3rem;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            border: none;
        }
        #tbl_facturacion .btn.btn-success.btn-orange{
            margin-left: 5px;
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

            #secondaryContentTransferirDirectoMonedero .form-group input{
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
        #comisionTerceros tbody tr td:nth-child(3){
            font-size: 11px;
        }
        tbody tr td{
            font-size: 13px;
        }
        thead tr th,
        tbody tr td{
            vertical-align: middle !important;
        }
        #comisionTerceros tbody tr td:nth-child(4),
        #comisionTerceros tbody tr td:nth-child(5),
        #comisionTerceros tbody tr td:nth-child(6){
            text-wrap-mode: nowrap;
        }
        #tbl_facturacion_length label {
            display: flex;
            align-items: center;
            grid-gap: 10px;
        }
        /* -------------------------------------------------------- */
        .inputCorreo:disabled,
        textarea:read-only{
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
            align-items: center;
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
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div style="background-image: url(https://tienda.mundosantanatura.com/img/fondoSumaqWasi.jpg); min-height: 100vh">
        <section class="content-header">
            <%--<h1 style="text-align: center; margin: 0; padding: 20px 0 10px">Gestión de Comisiones</h1>--%>
            <h1 class="titulo-elegante">Gestión de Comisiones</h1>
        </section>
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box box-success" style="display: flex; flex-direction: column;">
                        <div class="box box-header" style="display: none">
                            <h3 class="box-title">Lista de datos</h3>
                        </div>
                        <div style="padding-left: 11px; margin-bottom: 30px; display: none" class="col-md-12">
                            <div class="col-md-1">
                                <label>Periodo</label>
                            </div>
                            <div class="col-md-2">
                                <asp:DropDownList runat="server" ID="cboPeriodo" CssClass="form-control" />
                            </div>
                            <div class="col-md-1">
                                <button class="btn btn-success" type="button" style="font-weight: bold" id="btnFiltrar">
                                    <img src="img/FiltroPeriodoIcon.png" alt="Alternate Text" />
                                    Filtrar</button>
                            </div>
                        </div>
                        <%--<div style="padding-left: 11px; margin-top: 20px; display: flex; align-items: center; justify-content: center; grid-gap: 30px;" class="col-md-12">
                            <div class="col-md-2" style="grid-gap: 10px">
                                <label>Mes Comisión</label>
                                <select id="mesComiAdmi" class="form-control"></select>
                            </div>

                            <div style="grid-gap: 10px">
                                <label>Estado</label>
                                <select id="estadoComi" class="form-control"></select>
                            </div>

                            <div class="col-md-2" style="grid-gap: 10px; width: 200px; display: none">
                                <label>Nro RUC</label>
                                <div style="display: flex; align-items: center; grid-gap: 10px;">
                                    <input id="txtNroRuc" class="form-control" placeholder="Ingrese el RUC del socio"/>
                                </div>
                            </div>
                        </div>--%>
                        <div class="filtro-contenedor">
                            <div class="filtro-item">
                                <label for="mesComiAdmi">Mes Comisión</label>
                                <select id="mesComiAdmi" class="form-control select-elegante"></select>
                            </div>

                            <div class="filtro-item">
                                <label for="estadoComi">Estado</label>
                                <select id="estadoComi" class="form-control select-elegante"></select>
                            </div>

                            <div class="col-md-2" style="grid-gap: 10px; width: 200px; display: none">
                                <label>Nro RUC</label>
                                <div style="display: flex; align-items: center; grid-gap: 10px;">
                                    <input id="txtNroRuc" class="form-control" placeholder="Ingrese el RUC del socio"/>
                                </div>
                            </div>
                        </div>
                        <div class="box-body">
                            <div class="col-md-12">
                                <div class="box-body">
                                    <div class="form-group">
                                        <!-- Modal -->
                                        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" data-backdrop="static" style="display: none">
                                            <div class="container modal-dialog" id="modalTamano" role="document" style="min-height: 100%; margin: auto; display: flex; align-items: center; justify-content: center; max-width: 700px;">
                                                <div id="contenidoModal" class="modal-content" style="width: 100%;">
                                                    <div class="modal-header">
                                                        <h4 style="display: none; text-align: center; font-weight: bold" class="modal-title" id="exampleModalLabel">Detalle de Comisión</h4>
                                                        <button style="display: none;" type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                            <span >&times;</span>
                                                        </button>
                                                        <button id="closeModal" type="button" class="close closeButton" data-dismiss="modal" aria-label="Close">
                                                            ✖
                                                        </button>
                                                    </div>
                                                    <div id="myModal" style="padding: 15px">

                                                        <!-- Bloque Principal: Secciones de Comisión y Archivos -->
                                                        <div id="mainContent" class="fade-transition fade-in">
                                                            <!-- Sección de Comisión Empresario -->
                                                            <div id="comisionEmpresario" class="row" style="margin-bottom: 20px;">
                                                                <div class="col-md-12">
                                                                    <h5>Comisión empresario</h5>
                                                                    <table id="tblComiEmpresario" class="table table-bordered">
                                                                        <thead>
                                                                            <tr>
                                                                                <th>Comisión Sin IGV</th>
                                                                                <th>IGV</th>
                                                                                <th>Total</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody id="tblComiEmpresario__tbody">
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>

                                                            <!-- Sección de Comisión por Terceros -->
                                                            <div id="comisionTerceros" class="row" style="margin-bottom: 20px;">
                                                                <div class="col-md-12">
                                                                    <h5>Comisión por 3ros</h5>
                                                                    <div style="max-height: 212px; height: 100%; overflow-y: auto">
                                                                        <table class="table table-bordered">
                                                                            <thead style="position: sticky; top: 0px; background-color: rgba(255, 255, 255, .9); z-index: 1; box-shadow: 0px -1px 4px 2px #d2d2d2;">
                                                                                <tr>
                                                                                    <th>Orden</th>
                                                                                    <th>Id 3ro</th>
                                                                                    <th>Nombres</th>
                                                                                    <th>Comisión Sin IGV</th>
                                                                                    <th>IGV</th>
                                                                                    <th>Total</th>
                                                                                    <th>Conformidad</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody id="tblComiEmpresarioConformidad__tbody">
                                                                               
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <!-- Sección de Comisión Total Facturar -->
                                                            <div id="comisionTotal" class="row" style="margin-bottom: 20px;">
                                                                <div class="col-md-12">
                                                                    <h5>Comisión total a facturar</h5>
                                                                    <table class="table table-bordered">
                                                                        <thead>
                                                                            <tr>
                                                                                <th>Comisión sin IGV</th>
                                                                                <th>IGV</th>
                                                                                <th>Total</th>
                                                                                <th>Detracción</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody id="tblComiEmpresarioGlobal__tbody">
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>

                                                            <!-- Sección de Archivos -->
                                                            <div id="archivos" class="row" style="margin-bottom: 20px;">
                                                                
                                                            </div>

                                                            <!-- Sección de Botones -->
                                                            <div id="botones" class="row" style="margin-bottom: 20px; display: flex; justify-content: center;">
                                                                <%--<div class="col-md-6">
                                                                    <button type="button" class="btn btn-danger btn-block btnCerrar" data-dismiss="modal" aria-label="Close">Cerrar</button>
                                                                </div>--%>
                                                                <div class="col-md-6">
                                                                    <button id="eliminarPDFyXML" class="btn btn-primary btn-block btnEliminarFiles">Eliminar PDF y XML &nbsp; 🡆</button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- Bloque Secundario: Eliminar PDF y XML -->
                                                        <div id="secondaryContent" class="hidden fade-transition fade-out form-container">
                                                            <h3>Rechazo de Factura</h3>

                                                            <!-- Campos del formulario -->
                                                            <div style="display: flex; grid-gap: 80px">
                                                                <div class="form-group checkbox-group">
                                                                    <div style="display: flex; flex-direction: row-reverse; align-items: center">
                                                                        <input type="checkbox" id="ruc" value="RUC de la empresa">
                                                                        <label for="ruc">RUC de la empresa</label>
                                                                    </div>
                                                                    <div style="display: flex; flex-direction: row-reverse; align-items: center">
                                                                        <input type="checkbox" id="monto" value="Monto sin IGV">
                                                                        <label for="monto">Monto sin IGV</label>
                                                                    </div>
                                                                    <div style="display: flex; flex-direction: row-reverse; align-items: center">
                                                                        <input type="checkbox" id="descripcion" value="Descripción">
                                                                        <label for="descripcion">Descripción</label>
                                                                    </div>
                                                                    <div style="display: flex; flex-direction: row-reverse; align-items: center">
                                                                        <input type="checkbox" id="formaDePagoIncorrecta" value="Forma de Pago Incorrecta">
                                                                        <label for="descripcion">Forma de Pago Incorrecta</label>
                                                                    </div>
                                                                </div>

                                                                <!-- Opciones adicionales -->
                                                                <div class="form-group checkbox-group">
                                                                    <div style="display: flex; flex-direction: row-reverse; align-items: center">
                                                                        <input type="checkbox" id="detraNoAplicada" value="Detracción no aplicada">
                                                                        <label for="detraNoAplicada">Detracción no aplicada</label>
                                                                    </div>
                                                                    <div style="display: flex; flex-direction: row-reverse; align-items: center">
                                                                        <input type="checkbox" id="detraMalAplicada" value="Detracción mal aplicada">
                                                                        <label for="detraMalAplicada">Detracción mal aplicada</label>
                                                                    </div>
                                                                    <div style="display: flex; flex-direction: row-reverse; align-items: center">
                                                                        <input type="checkbox" id="fechaError" value="Fecha vencimiento errónea">
                                                                        <label for="fechaError">Fecha vencimiento errónea</label>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <!-- Correo y Asunto -->
                                                            <div class="form-group correo">
                                                                <label for="correo">Correo:</label>
                                                                <input class="inputCorreo" type="email" id="correo" name="correo">
                                                            </div>

                                                            <div class="form-group asunto">
                                                                <label for="asunto">Asunto:</label>
                                                                <input type="text" id="asunto" name="asunto">
                                                            </div>

                                                            <!-- Mensaje -->
                                                            <div class="form-group">
                                                                <label for="mensaje">Mensaje:</label>
                                                                <textarea id="mensaje" name="mensaje" rows="7" readonly></textarea>
                                                            </div>

                                                            <!-- Botones -->
                                                            <div class="button-group">
                                                                <button id="backBtn" type="button" class="btn-secondary">🡄 Regresar</button>
                                                                <%--<button type="submit" class="btn-success">Enviar</button>--%>
                                                                <%--<a href="mailto:correoDelEmpresario@gmail.com?subject=Rechazo%20de%20factura%20Comisión%20mes%20SEPTIEMBRE%202024&body=Este%20es%20el%20texto%20por%20defecto." class="btn-success" rel="noreferrer" target="_blank">Enviar</a>--%>
                                                                <input type="button" id="btnDynamicMailto" class="btn-success" value="Enviar"/>
                                                                <a id="dynamicMailto" class="btn-success" style="display: none"></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Modal -->
                                        <div class="modal" id="exampleModalAccionConf" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" data-backdrop="static" style="display: none">
                                            <div class="container modal-dialog" id="modalTamano2" role="document" style="min-height: 100%; margin: auto; display: flex; align-items: center; justify-content: center; max-width: 500px;">
                                                <div id="contenidoModalValidar" class="modal-content" style="width: 100%;">
                                                    <div class="modal-header">
                                                        <h4 style="display: none; text-align: center; font-weight: bold" class="modal-title" id="exampleModalLabelValidar">Detalle de Comisión</h4>
                                                        <button style="display: none;" type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                            <span>&times;</span>
                                                        </button>
                                                        <button id="closeModalAccionConf" type="button" class="close closeButton" data-dismiss="modal" aria-label="Close">
                                                            ✖
                                                        </button>
                                                    </div>
                                                    <div id="myModalValidar" style="padding: 10px 30px 30px">

                                                        <div id="secondaryContentValidar" class="form-container">
                                                            <h3 id="tituloModalAccionConformidad" style="text-align: center; margin-bottom: 20px; margin-top: 0;"></h3>
                                                            <p id="descModalAccionConformidad" style="text-align: center; margin-top: 10px; color: #555;"></p>

                                                            <!-- Correo y Asunto -->
                                                            <div class="form-group correo">
                                                                <label for="correo">Correo:</label>
                                                                <input class="inputCorreo" type="email" id="correoValidar" name="correo">
                                                            </div>

                                                            <div class="form-group asunto">
                                                                <label for="asunto">Asunto:</label>
                                                                <input type="text" id="asuntoAprobarConformidad" name="asunto" value="">
                                                            </div>

                                                            <!-- Mensaje -->
                                                            <div class="form-group">
                                                                <label for="mensaje">Mensaje:</label>
                                                                <textarea id="mensaje2" name="mensaje" readonly></textarea>
                                                            </div>

                                                            <!-- Botones -->
                                                            <div class="button-group" style="display: flex; justify-content: center;">
                                                                <%--<button type="submit" class="btn-success">Enviar</button>--%>
                                                                <%--<a href="mailto:correoDelEmpresario@gmail.com?subject=Rechazo%20de%20factura%20Comisión%20mes%20SEPTIEMBRE%202024&body=Este%20es%20el%20texto%20por%20defecto." class="btn-success" rel="noreferrer" target="_blank">Enviar</a>--%>
                                                                <a id="dynamicMailto2" class=""></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Modal -->
                                        <div class="modal" id="exampleModalTransferirDirectoMonedero" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" data-backdrop="static" style="display: none">
                                            <div class="container modal-dialog" id="modalTamano3" role="document" style="min-height: 100%; margin: auto; display: flex; align-items: center; justify-content: center; max-width: 500px;">
                                                <div id="contenidoModalTransferirDirectoMonedero" class="modal-content" style="width: 100%;">
                                                    <div class="modal-header">
                                                        <h4 style="display: none; text-align: center; font-weight: bold" class="modal-title" id="exampleModalLabelTransferirDirectoMonedero">Detalle de Comisión</h4>
                                                        <button style="display: none;" type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                            <span>&times;</span>
                                                        </button>
                                                        <button id="closeModalTransferirDirectoMonedero" type="button" class="close closeButton" data-dismiss="modal" aria-label="Close">
                                                            ✖
                                                        </button>
                                                    </div>
                                                    <div id="myModalTransferirDirectoMonedero" style="padding: 10px 30px 30px">

                                                        <!-- Bloque Secundario: Eliminar PDF y XML -->
                                                        <div id="secondaryContentTransferirDirectoMonedero" class="form-container">
                                                            <h3 style="text-align: center; margin-bottom: 20px; margin-top: 0;">Validar Factura TDM</h3>

                                                            <!-- Correo y Asunto -->
                                                            <div class="form-group correo">
                                                                <label for="correo">Correo:</label>
                                                                <input class="inputCorreo" type="email" id="correoTDM" name="correo">
                                                            </div>

                                                            <div class="form-group asunto">
                                                                <label for="asunto">Asunto:</label>
                                                                <input type="text" id="asuntoTDM" name="asunto" value="">
                                                            </div>

                                                            <!-- Mensaje -->
                                                            <div class="form-group">
                                                                <label for="mensaje">Mensaje:</label>
                                                                <textarea id="mensajeTDM" name="mensaje" rows="7" readonly></textarea>
                                                            </div>

                                                            <!-- Botones -->
                                                            <div class="button-group" style="display: flex; justify-content: center;">
                                                                <%--<button type="submit" class="btn-success">Enviar</button>--%>
                                                                <%--<a href="mailto:correoDelEmpresario@gmail.com?subject=Rechazo%20de%20factura%20Comisión%20mes%20SEPTIEMBRE%202024&body=Este%20es%20el%20texto%20por%20defecto." class="btn-success" rel="noreferrer" target="_blank">Enviar</a>--%>
                                                                <a id="dynamicMailtoTDM" class="btn-success">Enviar</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 table-responsive">
                                <table id="tbl_facturacion" class="table table-bordered table-hover text-center">
                                    <thead>
                                        <tr>
                                            <th>Id Socio</th>
                                            <th>DNI</th>
                                            <th>Nombres y Apellidos</th>
                                            <th>Línea Ascendente</th>
                                            <th>Intervalo Comisión</th>
                                            <th>Nro. RUC</th>
                                            <th>Fecha Subida</th>
                                            <th>Fecha Aprobado MLM</th>
                                            <th>Id Facturado 3ro</th>
                                            <th>Documento Conformidad</th>
                                            <th>Acción Conformidad</th>
                                            <th>Revisar</th>
                                            <th>Acción MLM</th>
                                            <th>Acción Contabilidad</th>
                                            <th>Acción Tesorería</th>
                                            <th>Estado</th>
                                            <th>Estado Monedero</th>
                                            <th>Transferir directo Monedero</th>
                                            <th>Exoneración</th>
                                            <th style="display: none">idPeriodo</th>
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
            <%--<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>--%>
            <%--<script src="js/plugins/datatables/jquery.dataTables.js" type="text/javascript"></script>--%>
            <%--<script src="js/plugins/datatables/dataTables.bootstrap.js" type="text/javascript"></script>--%>
            <!-- JS de DataTables -->
            <script src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>
            <%--<script src="js/GestionarCanjesYComisionSocios.js?Fv44" type="text/javascript"></script>--%>
            <script src="js/proyecto2/gestionComisiones.js?v5" type="text/javascript"></script>
            <script type="text/javascript">
                window.onload = function () {
                    document.getElementById("GestionRedes").classList.add("active");
                    document.querySelector("#GestionRedes .sidebar-submenu").style.display = "block"

                    document.getElementById("gestMulti").style.color = '#79B729';
                    document.getElementById("gestMulti").style.textShadow = '0px 0px 4px rgbA(229, 246, 27, 0.8)';

                    document.getElementById("contrCanjAbo").style.color = '#79B729';
                    document.getElementById("contrCanjAbo").style.textShadow = '0px 0px 4px rgbA(229, 246, 27, 0.8)';
                }
            </script>
        </section>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
</asp:Content>
