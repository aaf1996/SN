<%@ Page Title="" Language="C#" MasterPageFile="~/Home.Master" AutoEventWireup="true" CodeBehind="GestionMonedero.aspx.cs" Inherits="SantaNaturaNetworkV3.GestionMonedero" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .container-parent {
            height: calc(100vh - 73px);
            display: flex;
            align-items: center;
            margin-top: 73px
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
            padding: 40px 20px;
            max-width: 800px;
            width: 100%;
            text-align: center;
            margin-top: 0;
        }

        /* Títulos y Etiquetas */
        .total-monedero {
            margin: 25px 0;
        }

        .container__label {
            font-weight: bold;
            font-size: 16px;
        }

        .container__section-title {
            color: #6D6D6D;
            font-weight: 600;
            display: inline-block;
            text-transform: uppercase;
            margin-bottom: 7px;
        }

        .container__section-title--pre {
            font-weight: bold;
        }

        .container__title {
            margin-bottom: 4px;
            font-weight: 700;
            font-size: 36px;
            line-height: 1.39;
            font-family: "Spartan", sans-serif;
        }

        .container__title--highlighted {
            font-size: 4rem;
            margin-top: 0.5rem;
            font-weight: 800;
            font-family: 'Montserrat', sans-serif;
            color: #2f2f2f
        }

        .container__icon {
            color: #1ab69d;
        }

        /* Selección de Periodo */
        .select-period {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 30px;
            grid-gap: 20px;
        }

        .select-period__label {
            font-weight: bold;
            font-size: 14px;
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
            width: 150px;
            cursor: pointer;
        }

            .select-period__select:disabled {
                cursor: not-allowed;
                background-color: #f1f1f1;
            }

            .select-period__select:focus-visible {
                outline: none;
            }

        /* Botones */
        .button-group {
            display: flex;
            justify-content: center;
            gap: 40px;
            margin-bottom: 20px;
            width: 25%;
            margin: auto;
        }

        .button-group__button {
            color: white;
            border: none;
            border-radius: 5px;
            padding: 10px 20px;
            font-size: 14px;
            font-family: system-ui;
            font-weight: 700;
            cursor: pointer;
            transition: background-color 0.3s ease;
            flex: 1;
            max-width: 150px;
            max-height: 40px;
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
            background-color: #f8B808;
        }

            .button-group__button--consult:not(.button--disabled):hover {
                background-color: #c37d05;
            }

        /* Sección de Comisiones */
        .commission-summary {
            background: #fbdb92;
            border-radius: 40px;
            /*filter: drop-shadow(0px 5px 2px rgba(251, 219, 146, .5));*/
            width: 30%;
            margin: 40px auto 50px;
            padding: 20px 0;
        }

        .commission-summary__text {
            font-size: 14px;
            font-weight: bold;
            margin: 3px 0 0;
            line-height: 1;
            flex: 1;
            text-align: start;
            color: #C37D05;
            text-wrap: nowrap;
        }

        .commission-summary__amount {
            font-size: 20px;
            color: #8f5a04;
            font-weight: 700;
            text-align: center;
            line-height: 1;
            margin-top: 0;
            margin-bottom: 0;
            flex: .7;
        }

        .transfer__amount {
            font-size: 14px;
            color: #153285;
            font-weight: 500;
            text-align: center;
            line-height: 1;
            margin-top: 0;
            margin-bottom: 0;
        }

        .pais-comision {
            display: grid;
            grid-template-columns: 1fr 1fr;
            text-align: right;
            margin: 0 auto 25px;
            width: 50%;
            grid-gap: 10px;
        }

        .pais-comision__label {
            font-weight: bold;
            font-size: 14px;
            margin-bottom: 0;
            color: #6D6D6D;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding-right: 5px;
        }

        .pais-comision__select {
            padding: 8px;
            font-size: 14px;
            border-radius: 5px;
            border: 1px solid rgb(248, 184, 8);
            background-color: #fff;
            color: rgb(248, 184, 8);
            font-weight: 500;
            width: 150px;
            cursor: pointer;
        }

            .pais-comision__select:focus-visible {
                outline: none;
            }

            .pais-comision__select:disabled {
                cursor: not-allowed;
                background-color: #f1f1f1;
            }

        /* Transferencia */
        .transfer-details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            text-align: right;
            margin: 0 auto;
            width: 50%;
            gap: 10px;
        }

        .transfer-details__label {
            text-align: left;
            font-weight: bold;
            font-size: 14px;
            display: flex;
            align-items: flex-start;
            justify-content: flex-end;
            margin-bottom: 0;
            padding-top: 10px;
            color: #6D6D6D;
        }

        .transfer-details__input {
            padding: 8px;
            font-size: 14px;
            font-weight: 500;
            color: #000;
            border-radius: 5px;
            border: 1px solid rgb(248, 184, 8);
            width: 150px;
        }

            .transfer-details__input::placeholder {
                color: #484850;
            }

            .transfer-details__input:focus {
                outline: none
            }

            .transfer-details__input.details__input__disabled {
                cursor: not-allowed;
                background-color: #f1f1f1
            }

        .transfer-details__select {
            padding: 8px;
            font-size: 14px;
            border-radius: 5px;
            border: 1px solid rgb(248, 184, 8);
            background-color: #fff;
            color: rgb(248, 184, 8);
            font-weight: 500;
            width: 160px;
            cursor: pointer;
        }

            .transfer-details__select:focus-visible {
                outline: none;
            }

        /* Contenedor Empresario */
        .business-details {
            display: grid;
            grid-template-columns: 0.5fr 0.7fr;
            text-align: right;
            margin: 0 auto;
            width: 40%;
            padding: 10px 15px;
            border: 1px solid #D2D8DA;
            border-radius: 10px;
            background-color: #EAF0F2;
            grid-column-gap: 20px;
            grid-row-gap: 10px;
            transition: max-height 0.5s ease, opacity 0.5s ease, margin 0.5s ease;
            opacity: 0;
            max-height: 0;
            overflow: hidden;
        }

        .business-details__label {
            display: flex;
            align-items: center;
            justify-content: flex-end;
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
            padding: 10px 15px;
            font-size: 16px;
            border: 1px solid rgb(248, 184, 8);
            border-radius: 5px 0 0 5px;
            outline: none;
            transition: border-color 0.3s ease;
            max-width: 110px;
        }

            .business-details__input:focus {
                border-color: #9F8948;
            }

        .business-details__button {
            padding: 3px 10px;
            background-color: #F8B808;
            color: white;
            border: 2px solid #F8B808;
            border-radius: 0 5px 5px 0;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s ease, border-color 0.3s ease;
            filter: opacity(1);
        }

            .business-details__button:not(:disabled):hover {
                background-color: #C37C05;
                border-color: #C37C05;
            }

            .business-details__button:disabled {
                cursor: not-allowed;
                filter: opacity(0.5);
            }

            .business-details__button:focus {
                outline: none;
            }

        .business-details__employee {
            font-size: 14px;
            font-weight: 500;
            text-align: center;
            max-width: 200px;
            text-wrap: pretty;
        }

        /* Contenedor de Archivos */
        .file-upload {
            display: flex;
            justify-content: center;
            margin-top: 20px;
            grid-gap: 60px;
        }

        .file-upload__button {
            background-color: #F8B808;
            color: white;
            font-size: 16px;
            font-family: system-ui;
            font-weight: 600;
            padding: 6px 24px;
            border-radius: 5px;
            border: 1px solid transparent;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            cursor: pointer;
            transition: background-color 0.3s ease, filter .3s ease;
            max-height: 40px;
            filter: opacity(1);
        }

            .file-upload__button:not(:disabled):hover {
                background-color: #C37D05;
            }

            .file-upload__button:disabled {
                filter: opacity(.5);
            }


        /*.button-group__button.button--disabled,
        .file-upload button.file-upload__button.button--disabled {
            cursor: not-allowed;
            filter: opacity(0.5);
        }*/
        .button-group__button:disabled,
        .file-upload button.file-upload__button:disabled {
            cursor: not-allowed;
            filter: opacity(0.5);
        }

        .file-upload button.file-upload__button:focus {
            outline: none
        }

        .containerParent__heightMovil {
            height: 100%;
        }

        .bloqueDestinoTransferencia {
            display: flex;
            justify-content: center;
            grid-gap: 15px;
            margin-bottom: 40px;
        }

        /* Estilos Responsivos */
        @media (max-width: 1200px) {
            .button-group {
                width: 31%;
            }

            .commission-summary {
                width: 37%;
            }

            .business-details {
                width: 50%;
            }
        }

        @media (max-width: 978px) {
            .commission-summary {
                width: 45%;
            }

            .business-details {
                grid-template-columns: 0.4fr 0.7fr;
            }
        }

        @media (max-width: 767px) {
            .commission-summary, .transfer-details {
                width: 90%;
                display: flex !important;
                justify-content: space-between;
            }

            .business-details {
                width: 90%;
            }
        }

        @media (max-width: 500px) {
            .container-parent {
                margin-top: 45px;
            }

            .container {
                box-shadow: none;
                padding: 0 21.5px;
                margin: 20px 0;
            }

            .commission-summary__amount {
                text-wrap: nowrap;
            }

            .business-details {
                grid-template-columns: 1fr;
                grid-gap: 10px;
                padding: 15px;
            }

                .business-details.show {
                    max-height: 100%;
                    margin: 20px auto;
                    width: 90%;
                }

            .business-details__label,
            .business-details__input-group,
            .business-details__employee {
                justify-content: center;
            }

            .business-details__employee {
                text-align: center;
                width: 80%;
                margin: auto;
            }

            .business-details__label {
                margin-bottom: 0;
            }

            .business-details__input-group {
                margin-bottom: 20px;
            }

            .container-parent.containerParent__heightMovil {
                height: calc(100vh - 97px);
            }
        }

        @media (max-width: 541px) and (max-height: 880px) {
            .container-parent {
                height: 100%;
            }
        }

        @media (max-width: 1280px) and (max-height: 1000px) {
            .container-parent {
                height: 100%;
            }
        }

        @media (max-width: 1023px) and (min-width: 768px) {
            .commission-summary__card {
                padding: 23px 23px;
                width: 550px;
            }
        }

        @media (max-width: 767px) and (min-width: 500px) {
            .commission-summary__card {
                padding: 30px 53px;
                width: 432px;
            }
        }

        @media (max-device-width: 499px) and (min-device-width: 281px) {
            .commission-summary__card {
                padding: 0 30px;
            }

            .pais-comision {
                width: 90%;
                display: flex;
                justify-content: space-between;
            }

            .file-upload {
                grid-gap: 0;        
                width: 90%;
                margin: 30px auto 0;
                padding: 0;
                justify-content: space-between;
            }

            .bloqueDestinoTransferencia,
            .select-period {
                justify-content: space-between;
                width: 90%;
                margin: 0 auto 25px;
            }

            .select-period__label {
                text-wrap: nowrap;
            }
        }

        @media (max-device-width: 280px) {
            .commission-summary__card {
                padding: 16px 16px;
                width: 228px;
                border-radius: 17px;
            }

            .pais-comision {
                width: 100%;
            }

            .file-upload {
                grid-gap: 20px;
            }
        }

        /* Iconos */
        @font-face {
            font-family: 'icomoon';
            src: url('icomoon/icomoon.eot?wkki4d');
            src: url('icomoon/icomoon.eot?wkki4d#iefix') format('embedded-opentype'), url('icomoon/icomoon.ttf?wkki4d') format('truetype'), url('icomoon/icomoon.woff?wkki4d') format('woff'), url('icomoon/icomoon.svg?wkki4d#icomoon') format('svg');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
        }

        .icon {
            font-family: 'icomoon' !important;
            speak: never;
            font-style: normal;
            font-weight: normal;
            font-variant: normal;
            text-transform: none;
            line-height: 1;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        .icon-19:before {
            content: "\e912";
        }

        .containerParent__heightMovil {
            height: calc(100vh - 97px);
        }

        /* Animaciones */
        .animated-span {
            display: inline-block;
            transition: transform 0.3s, opacity 0.3s;
            position: relative;
        }

        .animated-span--animate {
            transform: scale(1.2);
            opacity: 1;
        }

        div:where(.swal2-container) button:where(.swal2-styled):not([disabled]):focus {
            outline: none;
        }

        p.messageError {
            display: flex;
            text-wrap: pretty;
            margin-top: 0;
            margin-bottom: 0;
            text-align: start;
            font-size: 12px;
            color: red;
            font-weight: 500;
        }

        p#messageError.messageError.hiddenMessageError {
            display: none;
        }

        p#messageErrorMiMone.messageError.hiddenMessageError {
            display: none;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container-parent" style="">
        <div class="container">
            <div class="total-monedero">
                <div class="container__section-title container__section-title--center container__section-title--animate" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                    <span class="container__section-title--pre">TOTAL DISPONIBLE MONEDERO</span>
                    <h2 class="container__title">
                        <span class="container__title--highlighted">S/.&nbsp;
                           
                            <span id="animatedNumber" class="animated-span animated-span--animate">0</span>
                        </span>
                    </h2>
                    <span class="container__icon"><i class="icon icon-19" style="color: #F8B808;"></i></span>
                </div>
            </div>
            <div class="pais-comision">
                <label for="selectPaisComision" class="pais-comision__label">PAIS COMISIÓN</label>
                <select id="selectPaisComision" class="pais-comision__select" disabled>
                    <option value="0">Seleccione:</option>
                    <option value="1" selected>Perú</option>
                </select>
            </div>
            <div class="bloqueDestinoTransferencia">
                <label for="destino-transferencia" class="transfer-details__label">TRANSFERIR A</label>
                <select id="destino-transferencia" class="transfer-details__select" onchange="toggleEmpresarioContainer()">
                    <option value="0">Seleccione:</option>
                    <option value="1">MI MONEDERO</option>
                    <option value="2">OTRO MONEDERO</option>
                </select>
            </div>
            <!-- Selección de Período -->
            <div id="blockSelectPeriodoComission">
                <div class="select-period">
                    <label for="periodo" class="select-period__label">MES COMISIÓN VALIDADA</label>
                    <select id="periodo" class="select-period__select" onchange="searchSelect()">
                    </select>
                </div>

                <!-- Botones -->
                <div class="button-group">
                    <button id="btnConsultar" class="button-group__button button-group__button--consult" type="button" disabled>Consultar</button>
                </div>

                <!-- Resumen de Comisiones -->
                <div class="commission-summary">
                    <div style="display: flex; flex-direction: row; align-items: center; justify-content: space-between; height: 100%; padding: 0 20px; width: 100%;">
                        <label class="commission-summary__text">COMISIÓN DISPONIBLE:</label>
                        <label class="commission-summary__amount">S/. <span id="valorComiDispo" draggable="true" ondragstart="drag(event)">0.00</span></label>
                    </div>
                </div>
            </div>

            <!-- Detalles de Transferencia -->
            <div class="transfer-details" id="transfer__details">
                <label class="transfer-details__label">MONTO A TRANSFERIR</label>
                <div style="position: relative; width: 150px; display: flex; flex-direction: column" ondrop="drop(event)" ondragover="allowDrop(event)">
                    <div style="position: relative">
                        <span style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); font-size: 14px; font-weight: 500; color: #2C486C;">S/. </span>
                        <input id="inputMontTransfer" onblur="handleBlur(event)" oninput="handleInput(event)" type="text" class="transfer-details__input details__input__disabled" style="padding-left: 30px;" placeholder="0.00" required disabled>
                    </div>
                    <p id="messageError" class="messageError hiddenMessageError">El monto ingresado debe ser menor al disponible.</p>
                    <p id="messageErrorMiMone" class="messageError hiddenMessageError">El monto ingresado debe ser menor a la comisión disponible.</p>
                </div>
            </div>

            <!-- Detalles del Empresario -->
            <div class="business-details">
                <label class="business-details__label">ID EMPRESARIO:</label>
                <div class="business-details__input-group">
                    <input id="id-empresario" class="business-details__input" type="text" maxlength="8" name="name" value="" placeholder="Ingrese ID" oninput="handleInputIdCliente(event)" />
                    <button type="button" id="searchButton" class="business-details__button" disabled>
                        <svg class="svgSearch" width="30" height="30" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="mdi-account-search-outline" viewBox="0 0 24 24">
                            <path d="M10,13C9.65,13.59 9.36,14.24 9.19,14.93C6.5,15.16 3.9,16.42 3.9,17V18.1H9.2C9.37,18.78 9.65,19.42 10,20H2V17C2,14.34 7.33,13 10,13M10,4A4,4 0 0,1 14,8C14,8.91 13.69,9.75 13.18,10.43C12.32,10.75 11.55,11.26 10.91,11.9L10,12A4,4 0 0,1 6,8A4,4 0 0,1 10,4M10,5.9A2.1,2.1 0 0,0 7.9,8A2.1,2.1 0 0,0 10,10.1A2.1,2.1 0 0,0 12.1,8A2.1,2.1 0 0,0 10,5.9M15.5,12C18,12 20,14 20,16.5C20,17.38 19.75,18.21 19.31,18.9L22.39,22L21,23.39L17.88,20.32C17.19,20.75 16.37,21 15.5,21C13,21 11,19 11,16.5C11,14 13,12 15.5,12M15.5,14A2.5,2.5 0 0,0 13,16.5A2.5,2.5 0 0,0 15.5,19A2.5,2.5 0 0,0 18,16.5A2.5,2.5 0 0,0 15.5,14Z" fill="#ffffff" />
                        </svg>
                    </button>
                </div>

                <label for="empresario" class="business-details__label">EMPRESARIO:</label>
                <div id="empresario" class="business-details__employee">-</div>
            </div>

            <div class="file-upload">
                <button id="btnLimpiar" class="button-group__button button-group__button--clear" type="button">Limpiar</button>
                <button id="btnTransferirFondos" class="file-upload__button" type="button" disabled>Transferir fondos</button>
            </div>
        </div>
    </div>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="js/ArrayComisionesPrueba.js?v1"></script>
    <script src="js/proyecto2/gestionMonedero.js?v3"></script>
    <script type="text/javascript">        
        window.onload = function () {
            if (window.innerWidth < 1148) {
                //document.getElementById("liMapaRed").style.background = '#E8E8E8';

                document.getElementById("clicBonif").style.color = 'white';
                //document.getElementById("idMenuRed").style.fontWeight = "700";
                document.getElementById("clicBonif").classList.add("peso700");
                document.getElementById("idSubMenuGestionarMone") ? document.getElementById("idSubMenuGestionarMone").style.fontWeight = "700" : '';


                //var naranja = document.getElementById("navDesplegable");
                //naranja.classList.add('menu__item--active2');
            }
            else {
                document.getElementById("clicBonif").style.color = 'var(--Primary-green)';
                document.getElementById("clicBonif").style.borderBottom = '3px solid var(--Primary-green)';
                document.getElementById("clicBonif").style.fontWeight = "600";

                document.getElementById("idSubMenuGestionarMone") ? document.getElementById("idSubMenuGestionarMone").style.color = 'white' : '';
                document.getElementById("idSubMenuGestionarMone") ? document.getElementById("idSubMenuGestionarMone").style.fontWeight = "700" : '';
            }
        };
    </script>
</asp:Content>
