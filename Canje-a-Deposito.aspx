<%@ Page Title="Canje a Depósito | Santa Natura" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="Canje-a-Deposito.aspx.cs" Inherits="SantaNaturaNetworkV3.Canje_a_Deposito" ClientIDMode="Static" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <title>Eliminar Compra | Santa Natura</title>
    <meta name="description" content="Permite eliminar compras de la plataforma Santa Natura.">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css">
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />
    <link href="css/bootstrap-toggle.min.css" rel="stylesheet">
    <link href="css/datatables/dataTables.bootstrap.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">    
    <section class="content-header">
        <h1 style="text-align: center">Canje a Depósito</h1>
    </section>
    <section class="content">
        <div class="row">
            <div class="col-xs-12">
                <div class="box box-success">
                    <div class="box box-header">
                        <h3 class="box-title">Listado de Compras</h3>
                    </div>
                    <div style="padding-left: 11px">
                        <div class="row">
                            <div class="col-md-2">
                                <label>Rango de Inicio</label>
                                <input type="text" id="fecha" name="" class="form-control daterange" style="background-color: lightgreen">
                            </div>
                            <div class="col-md-2">
                                <label>Rango de Fin</label>
                                <input type="text" id="fechaFin" name="" class="form-control daterange" style="background-color: lightgreen">
                            </div>
                            <div class="col-md-2">
                                <br />
                                <%--<asp:Button runat="server" Text="Filtrar" CssClass="btn btn-success " Style="font-weight: bold" ID="btnGenerarPageEliminarCompra" />--%>
                                <button id="btnGenerarPageCajeADeposito" class="btn btn-success" style="font-weight: bold;">Filtrar</button>
                            </div>
                        </div>
                    </div>
                    <div class="box-body table-responsive">
                        <div class="col-md-12">
                            <div class="box-body">
                                <div class="form-group">
                                    <!-- Modal -->
                                    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="container modal-dialog" id="modalTamano" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h4 style="text-align: center; font-weight: bold" class="modal-title" id="exampleModalLabel">Detalle de Compra</h4>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <div class="modal-body1">
                                                        <div class="row">
                                                            <div class="col-md-4">
                                                                <label>Ticket</label>
                                                                <asp:TextBox runat="server" ID="txtTicket" CssClass="form-control" BackColor="LightGreen" ReadOnly="true" />
                                                            </div>
                                                            <div class="col-md-4">
                                                                <label>Estado</label>
                                                                <asp:DropDownList runat="server" ID="cboEstado" CssClass="form-control" BackColor="LightGreen" />
                                                            </div>
                                                            <div class="col-md-4">
                                                                <label>Tipo Pago</label>
                                                                <asp:DropDownList runat="server" ID="cboTipoPago" CssClass="form-control" BackColor="LightGreen" />
                                                            </div>
                                                        </div>
                                                        <br />
                                                        <div class="row">
                                                            <div class="box-body table-responsive">
                                                                <table id="tbl_detalle" class="table table-bordered table-hover text-center">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Producto</th>
                                                                            <th>Imagen</th>
                                                                            <th>Cantidad</th>
                                                                            <th>Precio</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody id="tbe">
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div id="id-modal-footer" class="modal-footer">
                                                    <button id="btnId" type="reset" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                                                    <button id="btnActualizar" type="button" class="btn btn-success">Actualizar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Modal -->
                                </div>
                            </div>
                        </div>
                        <table id="tbl_compras" class="table table-bordered table-hover text-center">
                            <thead>
                                <tr>
                                    <th>Ticket</th>
                                    <th>Fecha Pago</th>
                                    <th>IDOP</th>
                                    <th>Cliente</th>
                                    <th>Cantidad</th>
                                    <th>Monto total</th>
                                    <th>Puntos Total</th>
                                    <th>Despacho</th>
                                    <th>Tipo Pago</th>
                                    <th>Estado</th>
                                    <th>Paquete Socio</th>
                                    <th>Detalle Editable</th>
                                </tr>
                            </thead>
                            <tbody id="tbl_body_table">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <script src="js/moment.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js" type="text/javascript"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@10" type="text/javascript"></script>
    <script src="js/plugins/datatables/jquery.dataTables.js"></script>
    <script src="js/plugins/datatables/dataTables.bootstrap.js"></script>
    <script src="js/proyecto2/canje-a-deposito.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(document).ready(function () {
        });

        window.onload = function () {
            document.getElementById("GestionCompras").classList.add("active");
            document.querySelector("#GestionCompras .sidebar-submenu").style.display = "block"

            document.getElementById("gestCompras").style.color = '#79B729';
            document.getElementById("gestCompras").style.textShadow = '0px 0px 4px rgbA(229, 246, 27, 0.8)';

            document.getElementById("canjeADeposito").style.color = '#79B729';
            document.getElementById("canjeADeposito").style.textShadow = '0px 0px 4px rgbA(229, 246, 27, 0.8)';
        }
    </script>
</asp:Content>
