<%@ Page Title="" Language="C#" MasterPageFile="~/Home.Master" AutoEventWireup="true" CodeBehind="CobroComision.aspx.cs" Inherits="SantaNaturaNetworkV3.CobroComision" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/dt/dt-1.10.23/r-2.2.7/datatables.min.css" />
    <style>
        .container-parent {
            height: 100%;
            display: flex;
            align-items: center;
            margin: 123px 0 50px;
        }
        .container-parent.parent__transferir {
            height: 100%;
            margin: 100px 0 50px;
        }
        @media (orientation: landscape) and (max-width: 1024px) {
            .container-parent {
                height: auto;
            }
        }
        .container {
            background: #fff;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 40px 20px 50px;
            max-width: 500px;
            width: 100%;
            text-align: center;
            margin-top: 0;
        }

        /*.container label {
            font-weight: bold;
            font-size: 18px;
        }*/


        /* Selección de Periodo */
        .select-period {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            margin-bottom: 40px;
            grid-gap: 20px;
        }
        .select-period.actionType {
            margin-bottom: 0;
        }
        .select-period__label {
            font-weight: bold;
            font-size: 16px;
            margin-bottom: 0;
            color: #6D6D6D;
        }
        .select-period__select {
            padding: 8px;
            font-size: 14px;
            border-radius: 5px;
            border: 1px solid rgb(248, 184, 8);
            background-color: #fff;
            color: rgb(248, 184, 8);
            font-weight: 500;
            width: fit-content;
            cursor: pointer;
        }
            .select-period__select:focus-visible {
                outline: none;
            }
        .select-period__select:disabled {
            cursor: not-allowed;
            background-color: #f1f1f1;
        }

        .dynamicContent{
            background-color: #FBDB92;
            border-radius: 20px; 
            width: 57%;
            margin: auto;
            filter: drop-shadow(0px 5px 2px rgba(0, 0, 0, 0.45));
        }
        .dynamicContent.active{
            border: 1px solid #FBDB92;
            padding: 20px 15px;
        }
        /* Botones */
        .button-group {
            display: flex;
            justify-content: center;
            grid-gap: 40px;
            margin-bottom: 20px;
        }
        .button-group__button {
            background-color: #6d6d6d;
            color: white;
            border: none;
            border-radius: 5px;
            padding: 10px 20px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.2s ease, transform 0.2s ease;
        }
        .button-group__button:focus {
            outline: none
        }
        .button-group__button--clear {
            background-color: #ec0303;
        }
            .button-group__button--clear:hover {
                background-color: #c70a0a;
            }
        .button-group__button--consult {
            background-color: #F8B808;
        }
            .button-group__button--consult:not(.button--disabled):hover {
                background-color: #d79f04;
            }
        .divAdjuntarConformidad .button-group__button.btnAdjuntarConformidadDisabled{
            background-color: #a2a2a2;
            cursor: not-allowed;
        }

        /* Sección de Comisiones */
        .commission-summary {
            background: #FBDB92;
            border-radius: 20px;
            filter: drop-shadow(0px 5px 2px rgba(0, 0, 0, 0.45));
            width: 35%;
            margin: 40px auto 50px;
            padding: 15px 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
        }
        .commission-summary article{
            display: grid;
            grid-template-columns: 1fr 0.3fr 0.4fr 0.2fr;
            align-items: center;
            width: 100%;
        }
        .commission-summary article .commission-summary__text{
            font-size: 14px;
            font-weight: 500;
            margin: 0;
            line-height: 1;
            text-align: end;
            color: #6D6D6D;
        }
        .commission-summary article .commission-summary__text#commission-available-title{
            font-size: 16px;
            font-weight: bolder;
            color: #6D6D6D;
        }
        .commission-summary article .moneda,        
        .commission-summary article  p{
            font-size: 16px;
            color: #C37d05;
            font-weight: 500;
            text-align: end;
            line-height: 1;
            margin-top: 5px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            grid-gap: 10px;
        }        
        .commission-summary article  p{
            padding-left: 5px;
        }
        .commission-summary article .moneda .commission-summary__amount {
            margin-bottom: 0;
        }
        .commission-summary article  .moneda .commission-summary__amount#valorComiDispo,
        .commission-summary article .commission-summary__amount#valorComiDispoSpan{
            font-size: 20px;
            font-weight: bolder;
        }
        /* Estilo para el título oculto visualmente */
        .visually-hidden {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }

        /*.comision-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-row-gap: 10px;
            text-align: right;
            width: 30%;
            margin: 40px auto;
        }
        .comision-container label {
            text-align: left;
            font-weight: bold;
            font-size: 14px;
        }*/

        .file-container.cobrar {
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            grid-gap: 15px;
            margin-bottom: 0;
        }

        .file-container {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            margin-bottom: 0;
        }
        .file-container.cobrar .file-container__group {
            display: flex; 
            flex-direction: column; 
            align-items: center;
            flex: 1;
            max-width: 240px;
            position: relative;
        }
            .file-container .divAdjuntarConformidad .file-container__group {
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
        .file-container .file-container__group label {
            cursor: pointer;
            transition: transform 0.3s ease;
        }
        .file-container .file-container__group label>div:not(.btnAdjuntarConformidadDisabled):hover {
            transform: scale(1.05);
        }        
        .file-container .file-container__group input[type="file"] {
            display: none; 
        }
        .file-container .file-container__group .file-name {
            margin-top: 5px;
            margin-bottom: 10px;
            display: block;
            font-size: 14px;
            color: #555;
            text-wrap: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            width: 100%;
            max-width: 240px;
            text-align: center;
        }

        .file-upload button {     
            justify-content: center; 
            margin-top: 50px;
        }
        .file-upload button.file-upload__button {    
            background-color: #F8B808;
            color: white;
            font-size: 16px;
            font-weight: bold;
            padding: 12px 24px;
            border-radius: 5px;
            border: 1px solid transparent;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            cursor: pointer;
            transition: background-color 0.2s ease, filter 0.2s ease;
        }
        .file-upload button.file-upload__button:not(.button--disabled):hover {            
            background-color: #C37D05;
        }        

        .button-group__button.button--disabled,
        .file-upload button.file-upload__button.button--disabled { 
            cursor: not-allowed;
            filter: opacity(0.5);
        }
        .button-group__button.button--disabled,
        .file-upload button.file-upload__button:disabled { 
            cursor: not-allowed;
            filter: opacity(0.5);
        }
        .button-group__button.button--disabled,
        .file-upload button.file-upload__button:disabled:hover {           
            background-color: #F8B808;
        }
        .file-upload button.file-upload__button:focus {
            outline: none
        }


        
        /* Contenedor Empresario */
        .business-details {
            display: grid;
            grid-template-columns: 0.5fr 0.7fr;
            justify-content: space-evenly;
            text-align: right;
            margin: 0 auto;
            width: 73%;
            padding: 10px 15px;
            border: 1px solid #d6b561;
            border-radius: 20px;
            background-color: #fef2d5;
            grid-column-gap: 20px;
            grid-row-gap: 10px;
            transition: max-height 0.5s ease, opacity 0.5s ease, margin 0.5s ease;
            opacity: 1;
            max-height: 100%;
            overflow: hidden;
            /*filter: drop-shadow(0px 5px 2px rgba(0, 0, 0, 0.45));*/
        }

        .business-details__label {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            color: #6D6D6D;
            margin-bottom: 0;
        }

        .business-details.show {
            opacity: 1;
            max-height: 100%;
            display: grid;
            margin: 20px auto;
        }

        .business-details__input-group {
            display: flex;
            grid-gap: 10px;
            position: relative;
            height: 42px;
        }

        .business-details__input {
            flex: 1;
            padding: 10px;
            font-size: 14px;
            border: 2px solid #ccc;
            border-radius: 5px 0 0 5px;
            outline: none;
            transition: border-color 0.3s ease;
            max-width: 90px;
        }
            .business-details__input:focus {
                border-color: #F8B808;
            }
            .business-details__input:disabled {
                cursor: not-allowed;
            }

        .business-details__button {
            padding: 3px 10px;
            background-color: #F8B808;
            color: white;
            border: none;
            border-radius: 0 5px 5px 0;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s ease, border-color 0.3s ease;
        }

            .business-details__button:hover {
                background-color: #C37D05;
                border-color: #C37D05;
            }
            .business-details__button:focus {
                outline: none;
            }
            .business-details__button:disabled {
                cursor: not-allowed;
            }
            .business-details__button:disabled:hover {
                background-color: #F8B808;
            }

        .business-details__employee {
            font-size: 13px;
            font-weight: 700;
            text-align: center;
            max-width: 200px;
            text-wrap: balance;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 32px;
        }
        /* ------------------ business-details-buttons ---------------- */
        .business-details-buttons {
            display: flex;
            justify-content: space-evenly;
            margin-top: 25px;
        }
        .divAdjuntarConformidad{
            margin: 30px auto 0;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            grid-gap: 10px;
        }
        .divAdjuntarConformidad .button-group__button{
            background-color: #6d6d6d;
        }
        .divAdjuntarConformidad .file-container__group .btn-file .button-group__button .div:not(.btnAdjuntarConformidadDisabled):hover{
            background-color: #5e5e5e;
        }

        div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-confirm),
        div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-cancel){
            font-size: 12px !important;
        }
        div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-confirm):focus,
        div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-cancel):focus{
            outline: none;
        }

        /* --------------------------- Tab Panels --------------------------- */
        .tabs {
            position: relative;
            display: block;
            margin-top: 100px;
        }

            .tabs h3 {
                margin-top: 10px;
            }

            .tabs li > label {
                position: relative;
                display: inline-block;
                float: left;
                height: 40px;
                margin-right: 5px;
                padding: 0 15px;
                border: 1px solid #ddd;
                background: #eee;
                color: #333;
                line-height: 40px;
                text-align: center;
                cursor: pointer;
                z-index: 99;
            }

        input[type=radio]:checked ~ label {
            border-bottom: 1px solid #fff;
            background: #fff;
        }

        .panel {
            padding: 40px;
            background: #fff;
            border: 1px solid #ddd !important;
            box-shadow: none !important;
            margin-top: -1px;
            width: 100%;
            position: absolute;
            top: 40px;
            opacity: 0;
            z-index: 1;
            transition: opacity .3s;
        }

        .panel.first {
            padding: 200px 40px;
        }

        /*.panel.first{
            z-index: 999;
        }
        .panel.second {
            z-index: 99;
        }
        .panel.third {
            z-index: 9;
        }*/

        /* Checkbox */
        input.radio-hack[type=radio] {
            position: fixed;
            left: -9999px;
            opacity: 0;
            filter: alpha(opacity=0);
        }

        input[type=radio]:checked ~ div.panel {
            opacity: 1;
        }

        input[type=radio]:checked ~ div.panel.first,
        input[type=radio]:checked ~ div.panel.second,
        input[type=radio]:checked ~ div.panel.third{
            z-index:99;
        }

        .wrapper {
            width: 100%;
            max-width: 1100px;
            margin: 0 auto;
            padding: 0 15px;
        }

        /* -------- para el boton de confirmación del modal ----------- */
        .custom-confirm-btn {
            background-color: #F8B808;
            color: #fff;
            font-size: 18px;
            padding: 10px 20px;
            border-radius: 8px;
            border: none;
            transition: .3s ease background-color, .3s ease color;
        }

            .custom-confirm-btn:hover {
                background-color: #e0a807;
                color: #fff;
            }

        /* -------- para el boton borrar archivo pdf----------- */
        .buttonBorrarArchivoPDFyXML {
            background: none;
            border: none;
            position: absolute;
            right: 0;
            transform: scale(1);
            transition: .3s ease transform;
            cursor: pointer;
        }
            .buttonBorrarArchivoPDFyXML:hover {
                transform: scale(1.1);
            }
            .buttonBorrarArchivoPDFyXML:focus {
                outline: none;
            }

        .divButtonRefresh {
            position: absolute;
            right: 70px;
            top: 0;
            transform: translate(0%, 150%);
        }
            .divButtonRefresh input {
                border: none;
                background: none;
                font-size: 25px;
                padding: 0;
                transition: .3s ease transform;
            }
                .divButtonRefresh input:hover {
                    transform: scale(1.05)
                }

        /*--------------------------------- MODAL COMISIONES 3ROS --------------------------*/
        /* Estilos para el modal */
        .modal {
            display: none; /* Oculto por defecto */
            position: fixed; /* Fijo en la pantalla */
            z-index: 1; /* Asegura que esté sobre otros contenidos */
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.4); /* Fondo semitransparente */
        }

        /* Contenido del modal */
        .modal-content {
            background-color: #fff;
            margin: 15% auto;
            padding: 80px 20px 0;
            border: 1px solid #888;
            width: 50%; /* O el tamaño que prefieras */
        }

        /* Botón para cerrar el modal */
        #closeModal.close {
            font-size: 21px;
            position: absolute;
            right: 0;
            top: 0;
            border: 1px solid;
            padding: 11px 12px;
            background-color: red;
            color: #fff;
            border-radius: 0 0 0 10px;
            opacity: .7;
            transition: .3s ease opacity;
        }

            #closeModal.close:hover,
            #closeModal.close:focus {
                text-decoration: none;
                cursor: pointer;
                opacity: 1;
            }


        /* Estilos de la tabla */
        #tableComisiones3ros {
            width: 100% !important;
            border-collapse: collapse;
            font-family: Arial, sans-serif;
            font-size: 14px;
        }

            /* Estilos para el encabezado de la tabla */
            #tableComisiones3ros thead th {
                background-color: #f2f2f2;
                color: #333;
                padding: 10px;
                text-align: left;
                border-bottom: 2px solid #ddd;
                font-weight: bold;
                font-size: 14px;
            }

            /* Estilos para el cuerpo de la tabla */
            #tableComisiones3ros tbody tr:nth-child(even) {
                background-color: #f9f9f9;
            }

            #tableComisiones3ros tbody tr:nth-child(odd) {
                background-color: #ffffff;
            }

            #tableComisiones3ros thead th  {
                text-align: center;
            }

            #tableComisiones3ros tbody td {
                padding: 10px;
                color: #555;
                border-bottom: 1px solid #ddd;
                text-align: center;
            }

            /* Estilos para resaltar filas al pasar el cursor */
            #tableComisiones3ros tbody tr:hover {
                background-color: #eaeaea;
                cursor: pointer;
            }

        /* Estilos adicionales para DataTables */
        .dataTables_wrapper {
            width: 100% !important;
            margin: auto;
        }
        .dataTables_wrapper .dataTables_filter input {
            margin-left: 0.5em;
            padding: 5px;
            border-radius: 4px;
            border: 1px solid #ccc;
        }

        .dataTables_wrapper .dataTables_length select {
            padding: 5px;
            border-radius: 4px;
            border: 1px solid #ccc;
        }

        .dataTables_wrapper .dataTables_info {
            margin-top: 10px;
            color: #555;
        }

        .dataTables_wrapper .dataTables_paginate .paginate_button{
            border: none !important;
            background: none !important;
            padding: 0 !important;
        }

        .btnVerDetalle {
            margin-left: 14px;
            background: none;
            border: none;
            height: 26px;
            width: fit-content;
            padding: 0;
            cursor: pointer;
            line-height: 1;
        }
        .btnVerDetalle img {
            background-color: none;
            transition: .3s ease background-color
        }
        .btnVerDetalle:not(:disabled):hover img {
            background-color: #fff;
        }
        .btnVerDetalle:focus {
            outline: none;
        }
        .btnVerDetalle:disabled {
            cursor: not-allowed
        }

        /* --------------------------- Estilos para el spinner --------------------------- */
        .spinner {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 50px; /* Ajusta la altura del spinner */
        }

            .spinner div {
                width: 10px;
                height: 10px;
                margin: 3px;
                background-color: #F8B808;
                border-radius: 50%;
                display: inline-block;
                animation: bounce 1.4s infinite ease-in-out both;
            }

                .spinner div:nth-child(1) {
                    animation-delay: -0.32s;
                }

                .spinner div:nth-child(2) {
                    animation-delay: -0.16s;
                }

        @keyframes bounce {
            0%, 80%, 100% {
                transform: scale(0);
            }

            40% {
                transform: scale(1);
            }
        }

        /*-----------------*/
        #tableComisiones3ros_paginate .pagination > .active > a {
            z-index: 2;
            color: #fff;
            cursor: default;
            background-color: #F8B808;
            border-color: #F8B808;
        }

        /* -------------------MEDIA QUERIES--------------------------- */
        
        @media (max-width: 1199px){
            .commission-summary{
                width: 50%;
            }
            .dynamicContent {
                width: 60%;
            }
            .file-container .file-container__group {
                max-width: 300px;
            }
        }

        @media (max-width: 992px){
            .container{
                box-shadow: none;
            }
            .commission-summary{
                width: 465px;
            }
        }        

        @media (max-width: 767px){
            .commission-summary{
                width: 80%;
                padding: 20px 10px 10px;
            }
            .file-container .file-container__group{
                max-width: 200px;
            }
        }

        @media (max-width: 575px){
            .commission-summary{
                width: 90%;
            }
        }

        @media (max-width: 501px){
            .container-parent{
                margin-top: 45px;                
                /*height: calc(100vh - 95px);*/
            }
        }

        @media (max-width: 541px) and (max-height: 880px) {
            .container-parent {
                height: 100%;
            }
        }

        @media (max-width: 500px) {
            .container-parent {
                margin-top: 45px;
            }

            .container {
                box-shadow: none;
            }

            .file-container .file-container__group {
                max-width: 100%;
            }

            .commission-summary, 
            .transfer-details,
            .dynamicContent{
                width: 85%;
            }

            .business-details {
                grid-template-columns: 1fr;
                grid-gap: 10px;
                padding: 15px;
                width: 90% !important;
            }

                .business-details.show {
                    max-height: 100%;
                }

            .business-details__label,
            .business-details__input-group,
            .business-details__employee {
                justify-content: center;
            }

            .business-details__employee {
                text-align: center;
                width: 80%;
                margin: 10px auto;
            }

            .business-details__label {
                margin-bottom: 0;
            }

            .business-details__label.business-details__employee {
                margin-bottom: 0;
            }

            .business-details__input-group {
                margin-bottom: 10px;
            }
        }

        @media (max-width: 462px){
            .commission-summary{
                grid-gap: 15px;
            }
            /*.commission-summary article{
                grid-template-columns: 1fr;
            }*/
            .divButtonRefresh{
                right: 40px;
                transform: translate(0%, 190%);
            }
            .commission-summary article .commission-summary__text,
            .commission-summary article .commission-summary__amount{
                text-align: center;
            }
            .file-container.cobrar{
                flex-direction: column;
                grid-gap: 40px;
                align-items: center;
            }
            .file-upload button{
                margin-top: 50px;
            }
            .file-container .file-container__group label{
                width: 143px;
            }
            .file-container .file-container__group label img{
                width: 50%;
            }
            .modal-content{
                transform: translate(0%, 50%);
                bottom: 0;
                left: 0;
                width: 90%;
                padding: 50px 20px 0;
            }
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="idContainerParent" class="container-parent">
        <div class="container">
            <div class="select-period">
                <label for="pais" class="select-period__label">PAIS COMISIÓN</label>
                <select id="pais" class="select-period__select" onchange="searchSelectPais()" disabled>
                    <option value="0">Seleccione</option>
                    <option value="1" selected>PERU</option>
                </select>
            </div>
            <div class="select-period">
                <label for="periodo" class="select-period__label">MES COMISIÓN</label>
                <select id="periodo" class="select-period__select" onchange="searchSelect()">
                </select>
            </div>

            <div class="button-group">
                <button id="btnLimpiar" class="button-group__button button-group__button--clear" type="button">Limpiar</button>
                <button id="btnConsultar" class="button-group__button button-group__button--consult" type="button" disabled>Consultar</button>
            </div>

            <section class="commission-summary" aria-labelledby="commission-summary-title">
                <div style="display: none; flex-direction: column; justify-content: flex-start; margin-bottom: 10px; background-color: #fff; box-shadow: inset 0px 0px 14px 2px #FBDB92; padding: 10px 15px;">
                    <span style="display: none">Período comisión seleccionado: </span>
                    <div style="font-size: 16px; color: #F8B808; text-transform: uppercase;"><strong id="strMesPer"></strong> <strong id="strAnioPer"></strong> <strong id="strCicloPer"></strong></div>
                </div>
                <article aria-labelledby="commission-without-igv-title">
                    <h3 id="commission-without-igv-title" class="commission-summary__text">COMISIÓN SIN IGV:</h3>
                    <p>S/. </p>
                    <p class="moneda">
                        <span class="commission-summary__amount" id="valorMontoSinIgv" aria-describedby="commission-without-igv-title">
                            0.00
                        </span>
                    </p>
                </article>
                <article aria-labelledby="commission-without-igv-title">
                    <h3 id="commission-without-igv-3ros-title" class="commission-summary__text">COMISIÓN SIN IGV (3ros):</h3>
                    <p>S/. </p>
                    <p class="moneda">
                        <span class="commission-summary__amount" id="valorMontoSinIgv3ros" aria-describedby="commission-without-igv-title">
                            0.00
                        </span>
                    </p>
                    <button id="detalleComisiones3ros" class="btnVerDetalle" disabled>
                        <img src="https://tienda.mundosantanatura.com/img/verDetalle.png" width="16" alt="verDetalle" />
                    </button>
                </article>
                <article aria-labelledby="igv-title">
                    <h3 id="igv-title" class="commission-summary__text">IGV:</h3>
                    <p>S/. </p>
                    <p class="moneda">
                        <span class="commission-summary__amount" id="valorIgv" aria-describedby="igv-title">
                            0.00
                        </span>
                    </p>
                </article>
                <article aria-labelledby="commission-available-title" style="margin-top: 5px;">
                    <h3 id="commission-available-title" class="commission-summary__text">COMISIÓN TOTAL EN FACTURA:</h3>
                    <p>
                        <span class="commission-summary__amount" id="valorComiDispoSpan" aria-describedby="commission-available-title">
                            S/.
                        </span>
                    </p>
                    <p class="moneda">
                        <span class="commission-summary__amount" id="valorComiDispo" aria-describedby="commission-available-title">
                            0.00
                        </span>
                    </p>
                </article>
            </section>
            
            <div id="actionType" class="select-period actionType">
                <label for="tipoAccion" class="select-period__label">TIPO DE ACCIÓN</label>
                <select id="tipoAccion" class="select-period__select" onchange="handleSelectChange()" disabled>
                    <option value="00">Seleccione</option>
                </select>
            </div>

            <div id="dynamicContent" class="dynamicContent">

            </div>

            <div class="file-upload" style="">
                <button id="btnEnviar" class="file-upload__button" type="button" disabled>Enviar</button>
            </div>
        </div>
    </div>
    <!-- Modal -->
    <div id="modalComisiones3ros" class="modal" style="display: none;">
        <div class="modal-content">
            <span id="closeModal" class="close">✖</span>
            <table id="tableComisiones3ros">
                <thead>
                    <tr>
                        <th>Orden</th>
                        <th>Nombres</th>
                        <th>Comision total (sin IGV)</th>
                        <th>IGV</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
    <script src="js/proyecto2/jqueryDataTablesPremioSocios.js" type="text/javascript"></script>
    <script src="js/proyecto2/estiloTablasPremioSocios.js" type="text/javascript"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>    
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="js/ArrayComisionesPrueba.js"></script>
    <script type="text/javascript">
        window.onload = function () {
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

                document.getElementById("idSubMenuCobrarComi") ? document.getElementById("idSubMenuCobrarComi").style.fontWeight = "700" : '';
                document.getElementById("idSubMenuCobrarComi") ? document.getElementById("idSubMenuCobrarComi").style.color = "#fff" : '';
            }
        };

        function handleSelectChange() {
            const tipoAccion = document.getElementById("tipoAccion").value;
            const dynamicContent = document.getElementById("dynamicContent");
            //const idContainerParent = document.getElementById("idContainerParent");
            const idActionType = document.getElementById("actionType");
            const textContentValorComiDispo = document.getElementById("valorComiDispo").textContent;
            const valorComiDispo = parseFloat(textContentValorComiDispo.replace(/,/g, ''));
            const idContainerParent = document.getElementById("idContainerParent");
            const btnEnviar = document.getElementById("btnEnviar");

            // Limpiar el contenido dinámico
            dynamicContent.innerHTML = '';

            if (tipoAccion === "01") {  // Si es COBRAR
                //idContainerParent.classList.remove("parent__transferir");
                const cobrarHtml = `
                    <div class="file-container cobrar">
                        <div class="file-container__group">
                            <!-- Papelera para eliminar archivos -->
                            <div id="eliminarPDF" class="buttonBorrarArchivoPDFyXML" onclick="deleteFilePDF(event)" ondrop="deleteFilePDF(event)" ondragover="allowDropPDF(event)">
                                <img src="img/iconosNavHeadHistorial/delete.png" alt="PDF" width="20"/>
                            </div>

                            <!-- Imagen representando el PDF, que será arrastrable -->
                            <label for="pdfUploadCharge" class="btn-file" draggable="true" ondragstart="dragPDF(event)">
                                <img id="pdfImg" src="img/pdf-Img.png" alt="PDF" width="96"/>
                            </label>

                            <!-- Input para cargar el archivo PDF -->
                            <input type="file" id="pdfUploadCharge" name="pdfUpload" accept=".pdf" onchange="handleFileChangePDFCharge()" />
                            <span id="file-name-pdfCharge" class="file-name">Ningún archivo seleccionado</span>
                        </div>

                        <div class="file-container__group" style="display: flex; flex-direction: column; align-items: center">
                            <button id="eliminarXML" class="buttonBorrarArchivoPDFyXML" onclick="deleteFileXML(event)" ondrop="deleteFileXML(event)" ondragover="allowDropXML(event)">
                                <img src="img/iconosNavHeadHistorial/delete.png" alt="PDF" width="20"/>
                            </button>
                            <label for="xmlUploadCharge" class="btn-file" draggable="true" ondragstart="dragXML(event)">
                                <img src="img/xml-Img.png" alt="XML" width="96"/>
                            </label>
                            <input type="file" id="xmlUploadCharge" name="xmlUpload" accept=".xml" onchange="handleFileChangeXMLCharge()" />
                            <span id="file-name-xmlCharge" class="file-name">Ningún archivo seleccionado</span>
                        </div>
                    </div>`;

                // Insertar el HTML correspondiente
                dynamicContent.innerHTML = cobrarHtml;
                dynamicContent.classList.add("active");
                idActionType.classList.remove("actionType");
                
                btnEnviar.disabled = false;
                btnEnviar.classList.remove("button--disabled");
            } else if (tipoAccion === "02") {  // Si es TRANSFERIR
                //idContainerParent.classList.toggle("parent__transferir");
                if (valorComiDispo >= 500) {
                    const transferirHtml = `
                        <div class="file-container">
                            <div class="business-details" style="width: 60%">
                                <label class="business-details__label">ID EMPRESARIO</label>
                                <div class="business-details__input-group">
                                    <input id="id-empresario" class="business-details__input" type="text" maxlength="8" name="name" placeholder="Ingrese ID" oninput="limpiarEmpresario()" onkeydown="verificarEnter(event)"/>
                                    <button type="button" id="searchButton" class="business-details__button" onclick="sendDataAjax()">
                                        <svg class="svgSearch" width="30" height="30" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="mdi-account-search-outline" viewBox="0 0 24 24">
                                            <path d="M10,13C9.65,13.59 9.36,14.24 9.19,14.93C6.5,15.16 3.9,16.42 3.9,17V18.1H9.2C9.37,18.78 9.65,19.42 10,20H2V17C2,14.34 7.33,13 10,13M10,4A4,4 0 0,1 14,8C14,8.91 13.69,9.75 13.18,10.43C12.32,10.75 11.55,11.26 10.91,11.9L10,12A4,4 0 0,1 6,8A4,4 0 0,1 10,4M10,5.9A2.1,2.1 0 0,0 7.9,8A2.1,2.1 0 0,0 10,10.1A2.1,2.1 0 0,0 12.1,8A2.1,2.1 0 0,0 10,5.9M15.5,12C18,12 20,14 20,16.5C20,17.38 19.75,18.21 19.31,18.9L22.39,22L21,23.39L17.88,20.32C17.19,20.75 16.37,21 15.5,21C13,21 11,19 11,16.5C11,14 13,12 15.5,12M15.5,14A2.5,2.5 0 0,0 13,16.5A2.5,2.5 0 0,0 15.5,19A2.5,2.5 0 0,0 18,16.5A2.5,2.5 0 0,0 15.5,14Z" fill="#ffffff" />
                                        </svg>
                                    </button>
                                </div>
                                <label for="empresario" class="business-details__label">EMPRESARIO</label>
                                <div id="empresario" class="business-details__employee">-</div>
                            </div>

                            <div class="divButtonRefresh"><input type="button" value="🔄" onclick="refreshEmpresarioBuscadoMayor500(event)" /></div>

                            <div id="divAdjuntarConformidad" class="divAdjuntarConformidad">
                                <div><a href="https://tienda.mundosantanatura.com/img/documentoConformidad.pdf" target="_blank" style="text-decoration: underline">Ver modelo de Conformidad</a></div>
                                <div class="file-container__group">
                                    <label for="conformityUploadTransfer" class="btn-file">
                                        <div id="btnAdjuntarConformidad" class="button-group__button btnAdjuntarConformidadDisabled">ADJUNTAR CONFORMIDAD</div>
                                    </label>
                                    <input type="file" id="conformityUploadTransfer" name="conformityUploadTransfer" accept="." onchange="handleFileChangeConformity()" disabled />
                                    <span id="file-name-conformity" class="file-name">Ningún archivo seleccionado</span>
                                </div>
                            </div>
                        </div>
                    `;

                    // Insertar el HTML correspondiente
                    dynamicContent.innerHTML = transferirHtml;
                    dynamicContent.classList.add("active");
                    idActionType.classList.remove("actionType");
                } else {
                    const transferirHtml = `
                        <div class="file-container">
                            <div class="business-details" style="width: 60%">
                                <label class="business-details__label">ID EMPRESARIO</label>
                                <div class="business-details__input-group">
                                    <input id="id-empresario" class="business-details__input" type="text" maxlength="8" name="name" placeholder="Ingrese ID" oninput="limpiarEmpresario()"/>
                                    <button type="button" id="searchButton" class="business-details__button" onclick="sendDataAjax()">
                                        <svg class="svgSearch" width="30" height="30" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="mdi-account-search-outline" viewBox="0 0 24 24">
                                            <path d="M10,13C9.65,13.59 9.36,14.24 9.19,14.93C6.5,15.16 3.9,16.42 3.9,17V18.1H9.2C9.37,18.78 9.65,19.42 10,20H2V17C2,14.34 7.33,13 10,13M10,4A4,4 0 0,1 14,8C14,8.91 13.69,9.75 13.18,10.43C12.32,10.75 11.55,11.26 10.91,11.9L10,12A4,4 0 0,1 6,8A4,4 0 0,1 10,4M10,5.9A2.1,2.1 0 0,0 7.9,8A2.1,2.1 0 0,0 10,10.1A2.1,2.1 0 0,0 12.1,8A2.1,2.1 0 0,0 10,5.9M15.5,12C18,12 20,14 20,16.5C20,17.38 19.75,18.21 19.31,18.9L22.39,22L21,23.39L17.88,20.32C17.19,20.75 16.37,21 15.5,21C13,21 11,19 11,16.5C11,14 13,12 15.5,12M15.5,14A2.5,2.5 0 0,0 13,16.5A2.5,2.5 0 0,0 15.5,19A2.5,2.5 0 0,0 18,16.5A2.5,2.5 0 0,0 15.5,14Z" fill="#ffffff" />
                                        </svg>
                                    </button>
                                </div>
                                <label for="empresario" class="business-details__label">EMPRESARIO</label>
                                <div id="empresario" class="business-details__employee">-</div>
                            </div>
                            <div class="divButtonRefresh"><input type="button" value="🔄" onclick="refreshEmpresarioBuscado(event)" /></div>
                        </div>
                    `;

                    // Insertar el HTML correspondiente
                    dynamicContent.innerHTML = transferirHtml;
                    dynamicContent.classList.add("active");
                    idActionType.classList.remove("actionType");
                }
                
            }else if (tipoAccion === "00") {  // Si es TRANSFERIR
                //idContainerParent.classList.remove("parent__transferir");
                const quitarHtml = ``;

                // Insertar el HTML correspondiente
                dynamicContent.innerHTML = quitarHtml;
                dynamicContent.classList.remove("active");
                idActionType.classList.add("actionType");
                btnEnviar.disabled = true;
                btnEnviar.classList.add("button--disabled");
            }
        }
    </script>
    
    <script src="js/proyecto2/cobroComision.js?v3"></script>
</asp:Content>
