<%@ Page Title="" Language="C#" MasterPageFile="~/Home.Master" AutoEventWireup="true" CodeBehind="ComisionesGestionadas.aspx.cs" Inherits="SantaNaturaNetworkV3.ComisionesGestionadas" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    
    <!-- CSS de Bootstrap -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">

    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/dt/dt-1.10.23/r-2.2.7/datatables.min.css" />

    <link href="css/proyecto2/estilosComiGestionadas.css" rel="stylesheet" />
    <style>
        [id^="table_idComiGestionadas"] .pagination > .active > a {
            background-color: var(--Primary-orange) !important;
            border-color: var(--Primary-orange) !important;
        }

        .redirecPDF:hover,
        .redirecConformidad:hover {
            text-decoration: underline;
        }

        .dataTables_wrapper .dataTables_paginate .paginate_button {
            padding: 0;
        }

            .dataTables_wrapper .dataTables_paginate .paginate_button:hover {
                border: 1px solid transparent;
                background: none;
                padding: 0px;
            }

        .containerComiGestionadas {
            display: none;
        }

        .containerComiGestionadas {
            width: 80%;
            margin: 107px auto 57px;
        }

            .containerComiGestionadas > * {
                margin-bottom: 20px; /* Espaciado vertical entre los elementos */
            }


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
            right: 15px;
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

        .table.dataTable {
            width: 100% !important;
            padding: 0 10px;
            border: none;
            border-bottom: none !important;
        }

        #comisionTerceros h3 {
            font-weight: bold;
            margin-bottom: 10px;
            text-align: center;
        }

        #tableComisiones3ros_filter.dataTables_filter{
            margin-bottom: 10px !important;
        }

        .dataTables_paginate.paging_simple_numbers .pagination{
            margin: 10px 0 !important;
        }

            .dataTables_paginate.paging_simple_numbers .pagination > .active > a {
                background-color: var(--Primary-orange) !important;
                border-color: var(--Primary-orange) !important;
            }

        #tableComisiones3ros.dataTable tbody td:nth-last-child(-n+3) {
            text-wrap: nowrap;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="containerComiGestionadas">
        <div class="title__containerComiGestionadas">
            <h1>Comisiones Gestionadas</h1>
        </div>
        <div class="table__containerComiGestionadas" style="padding: 0;">
            <table id="table_idComiGestionadas" class="table table-condensed display nowrap" cellspacing="0" width="100%" style="padding: 0px;">
                <thead>
                    <tr>
                        <th>Mes Comisión</th>
                        <th>RUC</th>
                        <th>Pdf Factura</th>
                        <th>Id Facturado 3ro</th>
                        <th>Empresario</th>
                        <th>Conformidad</th>
                        <th>Monto Facturado sin IGV</th>
                        <th>IGV</th>
                        <th>Estado Final</th>
                        <th>Terceros</th>
                    </tr>
                </thead>
                <tbody id="tbl_body_comiGestionadas">
                </tbody>
            </table>
            <!-- Modal -->
            <div class="modal fade" id="modalTerceros" tabindex="-1" role="dialog" aria-labelledby="modalTercerosLabel" data-backdrop="static" style="display: none">
                <div class="container modal-dialog" id="modalTamano" role="document" style="min-height: 100%; margin: auto; display: flex; align-items: center; justify-content: center; max-width: 700px;">
                    <div id="contenidoModal" class="modal-content" style="width: 100%;">
                        <div class="modal-header">
                            <h4 style="display: none; text-align: center; font-weight: bold" class="modal-title" id="exampleModalLabel">Detalle de Comisión</h4>
                            <button style="display: none;" type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span>&times;</span>
                            </button>
                            <button id="closeModal" type="button" class="close closeButton" data-dismiss="modal" aria-label="Close">
                                ✖
                            </button>
                        </div>
                        <div id="myModal" style="padding: 15px">
                            <!-- Bloque Principal: Secciones de Comisión y Archivos -->
                            <div id="mainContent" class="fade-transition fade-in">

                                <!-- Sección de Comisión por Terceros -->
                                <div id="comisionTerceros" class="row" style="margin-bottom: 20px;">
                                    <div class="col-md-12">
                                        <h3>Comisión por Terceros</h3>
                                        <div style="padding: 0">
                                            <table id="tableComisiones3ros" class="table table-bordered" style="padding: 0px;">
                                                <thead style="position: sticky; top: 0px; background-color: rgba(255, 255, 255, .9); z-index: 1; box-shadow: 0px -1px 4px 2px #d2d2d2;">
                                                    <tr>
                                                        <th>Orden</th>
                                                        <th>Nombres</th>
                                                        <th>Comision total (sin IGV)</th>
                                                        <th>IGV</th>
                                                        <th>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="tblComiEmpresarioConformidad__tbody">
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Scripts de jQuery y Bootstrap -->
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="js/proyecto2/jqueryDataTablesPremioSocios.js" type="text/javascript"></script>
    <script src="js/proyecto2/estiloTablasPremioSocios.js" type="text/javascript"></script>
    <script src="https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/js/select2.min.js" type="text/javascript"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@8.8.7/dist/sweetalert2.all.min.js" type="text/javascript"></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js" type="text/javascript"></script>
    <script src="js/proyecto2/scriptComiGestionadas.js"></script>

    <script>
        $(document).ready(function () {
            $('#loader').hide();
            $('.containerComiGestionadas').fadeIn();

            const table = document.getElementById('tableComisiones3ros'); // Selecciona la tabla
            const parent = table.parentElement; // Selecciona el padre de la tabla

            if (parent) {
                parent.classList.add('table-responsive'); // Agrega la clase al padre
            }
        });
        if (window.innerWidth < 1148) {
            //document.getElementById("liMapaRed").style.background = '#E8E8E8';

            document.getElementById("clicBonif").style.color = 'white';
            //document.getElementById("idMenuRed").style.fontWeight = "700";
            document.getElementById("clicBonif").classList.add("peso700");
            document.getElementById("idSubMenuCobrarComi") ? document.getElementById("idSubMenuCobrarComi").style.fontWeight = "700" : '';


            //var naranja = document.getElementById("navDesplegable");
            //naranja.classList.add('menu__item--active2');
        }
        else {
            document.getElementById("clicBonif").style.color = 'var(--Primary-green)';
            document.getElementById("clicBonif").style.borderBottom = '3px solid var(--Primary-green)';
            document.getElementById("clicBonif").style.fontWeight = "600";

            document.getElementById("idSubMenuComiGestionadas") ? document.getElementById("idSubMenuComiGestionadas").style.color = "#fff" : '';
            document.getElementById("idSubMenuComiGestionadas") ? document.getElementById("idSubMenuComiGestionadas").style.fontWeight = "700" : '';
        }
    </script>
</asp:Content>
