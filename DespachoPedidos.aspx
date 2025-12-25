<%@ Page Title="" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="DespachoPedidos.aspx.cs" Inherits="SantaNaturaNetworkV3.DespachoPedidos" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/proyecto2/despacho-pedidos.css?v1" rel="stylesheet" />
    
    <style>
        .info-pedido-container {
            display: flex;
            flex-wrap: nowrap;
            flex-direction: column;
            gap: 0px 20px;
            border-radius: 8px;
            padding: 10px 15px;
            font-size: 14px;
            width: fit-content;
            margin: auto;
            min-width: 300px;
        }

        .info-item {
            display: flex;
            justify-content: space-between;
            gap: 5px;
            min-width: 180px;
        }

            .info-item strong {
                white-space: nowrap;
            }

        #spinner-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.4);
            z-index: 2000;
            display: none;
            align-items: center;
            justify-content: center;
        }

        @keyframes spin {
            to {
                transform: rotate(360deg);
            }
        }

        #tbl-despacho-pedidos_wrapper.dataTables_wrapper .row{
            display: flex;
            align-items: center;
        }

        /* Ocupa el buscador original */
        #tbl-despacho-pedidos_wrapper .dataTables_filter label {
            display: flex;
            align-items: center;
            background-color: #fff;
            border-radius: 30px;
            padding: 3px 3px 3px 10px;
            border: 3px solid #b8b8b8;
            overflow: hidden;
            float: right;
            font-family: system-ui;
            font-weight: 700;
        }

        #tbl-despacho-pedidos_wrapper .dataTables_filter input {
            border: none;
            background: transparent;
            outline: none;
            flex: 1;
            padding: 8px 10px;
            font-family: system-ui;
            font-weight: 500;
            color: #686868;
        }

        #tbl-despacho-pedidos_wrapper .dataTables_filter label::after {
            content: "🔍";
            background-color: #5FAF6B;
            color: white;
            border-radius: 50%;
            width: 38px;
            height: 38px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 5px;
            font-size: 14px;
        }

    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css">
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />
    <link href="css/bootstrap-toggle.min.css" rel="stylesheet">
    <link href="css/datatables/dataTables.bootstrap.css" rel="stylesheet" />
    <link href="css/proyecto2/fonts-v2.css?v3" rel="stylesheet" type="text/css" />

    <div class="despacho-pedidos">
        <section class="despacho-pedidos__header">
            <h1 class="despacho-pedidos__title">DESPACHO DE PEDIDOS</h1>
        </section>

        <section class="despacho-pedidos__content">
            <div class="row">
                <div class="col-xs-12">
                    <div class="despacho-pedidos__box">
                        <div class="despacho-pedidos__box-header">
                            <h3 class="despacho-pedidos__subtitle">Lista de Pedidos</h3>
                        </div>

                        <div class="despacho-pedidos__filters">
                            <div class="row">
                                <div class="col-md-2 despacho-pedidos__filter">
                                    <label for="fecha">Rango de Inicio</label>
                                    <input type="text" id="fecha" class="form-control daterange despacho-pedidos__input despacho-pedidos__input--highlight">
                                </div>
                                <div class="col-md-2 despacho-pedidos__filter">
                                    <label for="fechaFin">Rango de Fin</label>
                                    <input type="text" id="fechaFin" class="form-control daterange despacho-pedidos__input despacho-pedidos__input--highlight">
                                </div>
                                <div class="col-md-2 despacho-pedidos__filter">
                                    <br />
                                    <button type="button" class="btn btn-success despacho-pedidos__btn" id="btnFiltrar">Filtrar</button>
                                </div>
                            </div>
                        </div>

                        <div class="despacho-pedidos__table-container table-responsive">
                            <table id="tbl-despacho-pedidos" class="table table-bordered table-hover text-center despacho-pedidos__table">
                                <thead>
                                    <tr class="despacho-pedidos__table-header">
                                        <th>Ticket</th>
                                        <th>Idop Perushop</th>
                                        <th>Fecha Pedido</th>
                                        <th>Fecha Envío a Perushop</th>
                                        <th>Empresario</th>
                                        <th>Monto Pagado</th>
                                        <th>Estado Despacho</th>
                                        <th>Actualizar Despacho</th>
                                    </tr>
                                </thead>
                                <tbody id="tbl-body-table" class="despacho-pedidos__table-body">
                                </tbody>
                            </table>

                            <div id="spinner-overlay">
                                <div class="spinner" style="width: 50px; height: 50px; border: 5px solid #ddd; border-top-color: #1FA438; border-radius: 50%; animation: spin 0.8s linear infinite;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>

    <!-- Modal Detalle Pedido -->
    <div class="modal fade despacho-pedidos__modal" id="modalDetalle" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg despacho-pedidos__modal-dialog">
            <div class="modal-content despacho-pedidos__modal-content">

                <div class="modal-header despacho-pedidos__modal-header">
                    <h5 class="modal-title despacho-pedidos__modal-title">Detalle del Pedido</h5>
                    <button type="button" class="close despacho-pedidos__modal-close" data-dismiss="modal" aria-label="Cerrar">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div id="info-pedido" class="info-pedido-container mb-3">
                    <div class="info-item">
                        <strong>Ticket:</strong>
                        <span id="info-ticket"></span>
                    </div>
                    <div class="info-item">
                        <strong>Idop PeruShop:</strong>
                        <span id="info-idop"></span>
                    </div>
                    <div class="info-item">
                        <strong>Fecha de Envío:</strong>
                        <span id="info-fechaenvio"></span>
                    </div>
                    <div class="info-item">
                        <strong>Empresario:</strong>
                        <span id="info-empresario" style="text-wrap-style: balance; width: 50%; text-align: right;"></span>
                    </div>
                    <div class="info-item">
                        <strong>Monto Pagado:</strong>
                        <span id="info-montopagado"></span>
                    </div>
                </div>

                <div class="modal-body despacho-pedidos__modal-body table-responsive">
                    <table id="tbl-detalle-pedido" class="table table-bordered text-center despacho-pedidos__detalle-table">
                        <thead>
                            <tr>
                                <th>Id Producto PS</th>
                                <th>Producto</th>
                                <th>Imagen</th>
                                <th>Cantidad Pedido</th>
                                <th>Cantidad Entregada</th>
                                <th>Cantidad Pendiente</th><!-- Kenny -->
                                <th>Alerta Stock</th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody id="tbl-detalle-body">
                        </tbody>
                    </table>
                </div>

                <div class="modal-footer despacho-pedidos__modal-footer">
                    <button type="button" class="btn btn-secondary despacho-pedidos__btn btn-cerrar-modal-detalle" data-dismiss="modal">Cerrar</button>
                    <button id="btn-actualizar-modal-detalle" type="button" class="btn btn-success despacho-pedidos__btn btn-actualizar-modal-detalle">Actualizar</button>
                </div>
            </div>
        </div>
    </div>

    <script src="js/moment.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js" type="text/javascript"></script>
    <script src="js/sweetAlert.js" type="text/javascript"> </script>
    <script src="js/plugins/datatables/jquery.dataTables.js"></script>
    <script src="js/plugins/datatables/dataTables.bootstrap.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js" type="text/javascript"></script>
    <script src="js/proyecto2/despacho-pedidos.js?v1"></script>
    <script type="text/javascript">
        window.onload = function () {
            document.getElementById("DespachoPedidos").classList.add("active");

            document.getElementById("despachoPedidos").style.color = '#79B729';
            document.getElementById("despachoPedidos").style.textShadow = '0px 0px 4px rgbA(229, 246, 27, 0.8)';

            document.querySelector("#DespachoPedidos span").style.color = '#79B729';
        }
    </script>
</asp:Content>
<%--<asp:Content ID="Content3" ContentPlaceHolderID="scripts" runat="server">
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="footer" runat="server">
</asp:Content>--%>
