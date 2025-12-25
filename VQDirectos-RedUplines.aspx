<%@ Page Title="" Language="C#" MasterPageFile="~/Home.Master" AutoEventWireup="true" CodeBehind="VQDirectos-RedUplines.aspx.cs" Inherits="SantaNaturaNetworkV3.VQDirectos_RedUplines" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .tabla-container {
            max-width: 1400px;
            margin: 40px auto;
            padding: 20px;
            overflow-x: auto;
            border-radius: 12px;
            box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
            background-color: #fff;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            min-width: 600px;
            margin-bottom: 0;
        }

        thead {
            background-color: var(--Light-purple);
            color: white;
        }

        tfoot {
            background-color: var(--Light-purple);
            color: #fff;
            font-weight: 600;
        }

        th, td {
            padding: 12px 15px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }

        tbody tr:hover {
            background-color: #f2f2f2;
        }

        @media screen and (max-width: 768px) {
            th, td {
                padding: 10px;
                font-size: 14px;
            }
        }

        h2 {
            text-align: center;
            margin-top: 30px;
            font-family: 'Segoe UI', sans-serif;
        }        

        #tablaVQDirectos tbody tr td:nth-child(2) {
            font-size: 12px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h2 style="margin-top: 100px">Lista de VQ Directos</h2>
    <div class="tabla-container">
        <table id="tablaVQDirectos" class="table table-striped table-bordered" border="1" style="width: 100%; border-collapse: collapse;">
            <thead>
            </thead>
            <tbody></tbody>
            <tfoot>
            </tfoot>
        </table>
    </div>

    <script type="text/javascript" src="js/proyecto2/VQDirectos-RedUpline.js"></script>
</asp:Content>
