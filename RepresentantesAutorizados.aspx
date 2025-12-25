<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="RepresentantesAutorizados.aspx.cs" Inherits="SantaNaturaNetworkV3.RepresentantesAutorizados" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Representantes Autorizados</title>

    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" href="https://tienda.mundosantanatura.com/img/WEB-ICONO.png" type="image/x-icon" />
    
    <style>
        /* =================================== VARIABLES ========================================= */
        :root {
            --Color-base: #123456;
            --Color-acento1: #ca1f7b;
            --Color-acento2: #f7a21a;
            --Color-acento3: #e95708;
            --Color-acento4: #b91e23;
            --Color-acento5: #6d189b;
            --Color-acento6: #006341;
            --Font-type: 'Tahoma', sans-serif;

            
            /* Green */
            --Intense-green: #17732A;
            --Dark-green: #198F34;
            --Primary-green: #1FA438;
            --Medium-green: #5FAF6B;
            --Light-green: #91D19C;
        }

        /* =================================== HEADER ========================================= */
        header {
            height: 73px;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            display: flex;
            align-items: center;
            background-color: #fff;
            background-image: url(../img/Tienda/barra-navbar-sinLogo.png);
            background-size: cover;
            padding: 3.5px 14px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            z-index: 999;
        }

            header .brand img {
                width: 240px;
            }

        body {
            margin: 0;
            font-family: var(--Font-type);
            background-color: #fff;
            overflow: hidden;
        }

        /* =================================== SECCIÓN PRINCIPAL ========================================= */
        .sectionDatosPedidos {
            display: flex;
            min-height: 100vh;
        }

            .sectionDatosPedidos .sectionDatosPedidos__title {
                display: flex;
                align-items: center;
                justify-content: center;
                background-image: url(../../img/Vivir-bien-10824X880.jpg);
                background-size: cover;
                background-position: left;
                width: 50%;
                padding: 0;
                position: relative;
            }

                .sectionDatosPedidos .sectionDatosPedidos__title h1 {
                    font-size: 2.88vw;
                    color: var(--Intense-green);
                    text-align: center;
                    background-color: rgba(255, 255, 255, .5);
                    width: 100%;
                    margin: auto;
                    padding: 0 110px;
                    line-height: 1.2;
                    text-wrap-style: balance;
                }

            .sectionDatosPedidos .sectionDatosPedidos__title h1 span {
                font-weight: 400;
            }

        /* =================================== DISTRIBUIDORES ========================================= */
        .sectionDistribuidores {
            display: flex;
            justify-content: center;
            padding: 40px 5vw;
        }

        .sectionDistribuidores__container {
            width: 100%;
            max-width: 800px;
            text-align: center;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        /* === Título === */
        .sectionDistribuidores__title {
            font-size: 22px;
            color: var(--Color-acento6);
            text-wrap-style: pretty;
        }

        /* === Formulario === */
        .sectionDistribuidores__form {
            display: flex;
            flex-direction: column;
            gap: 20px;
            width: 100%;
            max-width: 420px;
            margin: 0 auto;
        }

        .inputGroupFloating {
            position: relative;
            display: flex;
        }

            .inputGroupFloating input {
                font-family: inherit;
                width: 100%;
                padding: 12px 10px;
                font-size: 15px;
                border: 2px solid var(--Color-acento5);
                border-radius: 8px;
                background: #fff;
                color: #333;
                outline: none;
                transition: all 0.25s ease;
            }

            .inputGroupFloating label {
                position: absolute;
                top: 50%;
                left: 12px;
                transform: translateY(-50%);
                background: #fff;
                color: var(--Color-acento5);
                font-size: 15px;
                padding: 0 4px;
                pointer-events: none;
                transition: 0.25s ease all;
            }

            .inputGroupFloating input:focus,
            .inputGroupFloating input:not(:placeholder-shown) {
                border-color: var(--Color-acento1);
                box-shadow: 0 0 6px rgba(202, 31, 123, 0.4);
            }

                .inputGroupFloating input:focus + label,
                .inputGroupFloating input:not(:placeholder-shown) + label {
                    top: 0;
                    left: 10px;
                    font-size: 13px;
                    color: var(--Color-acento1);
                }

            .inputGroupFloating input::placeholder {
                color: transparent;
            }

            .inputGroupFloating input:focus::placeholder {
                color: #999;
            }

        /* === Botón Buscar === */
        .sectionDistribuidores__btnBuscar {
            font-family: inherit;
            background-color: var(--Color-acento6);
            color: #fff;
            font-weight: 600;
            border: none;
            border-radius: 25px;
            align-self: center;
            padding: 10px 30px;
            cursor: pointer;
            font-size: 16px;
            box-shadow: 0px 3px 8px rgba(0, 99, 65, 0.3);
            transition: all 0.3s ease;
        }

            .sectionDistribuidores__btnBuscar:hover {
                background-color: #015337;
                box-shadow: 0px 4px 10px rgba(0, 99, 65, 0.45);
                transform: translateY(-1px);
            }

        /* === RESULTADOS CON SCROLL INTERNO === */
        .sectionDistribuidores__resultados-wrapper {
            max-height: 60vh;
            overflow-y: auto;
            padding-right: 8px;
            margin-top: 10px;
            scrollbar-width: thin;
        }

            .sectionDistribuidores__resultados-wrapper::-webkit-scrollbar {
                width: 8px;
            }

            .sectionDistribuidores__resultados-wrapper::-webkit-scrollbar-thumb {
                background-color: #ccc;
                border-radius: 4px;
            }

                .sectionDistribuidores__resultados-wrapper::-webkit-scrollbar-thumb:hover {
                    background-color: #999;
                }

        /* === Tarjetas === */
        .sectionDistribuidores__resultados {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
            gap: 20px;
            justify-content: center;
        }

            .sectionDistribuidores__resultados:has(.tarjeta:only-child) {
                display: flex;
                justify-content: center;
            }

        .tarjeta {
            background-color: var(--Color-acento6);
            border-radius: 25px;
            box-shadow: 0px 8px 16px rgba(18, 52, 86, 0.4);
            color: #E0E0E0;
            padding: 28px 20px;
            position: relative;
            text-align: center;
            max-width: 247px;
            transition: transform 0.25s ease;
        }

            .tarjeta .rango {
                background-color: #fff;
                color: var(--Color-acento6);
                border-radius: 4px;
                font-size: 13px;
                font-weight: bold;
                padding: 4px 8px;
                position: absolute;
                top: 20px;
                left: 20px;
            }

            .tarjeta .foto {
                border: 2px solid #fff;
                border-radius: 50%;
                padding: 6px;
                width: 80px;
                height: 80px;
                object-fit: cover;
                margin-top: 30px;
                margin-bottom: 12px;
            }

            .tarjeta h3 {
                margin: 10px 0 8px;
                font-size: 13.5px;
                font-weight: 700;
                color: #fff;
                line-height: 1.3;
            }

            .tarjeta p {
                font-size: 12px;
                line-height: 20px;
                color: #E8E8E8;
            }

        /* =================================== RESPONSIVE ========================================= */
        @media (max-width: 1440px) {
            .sectionDistribuidores__resultados-wrapper {
                max-height: calc(100vh - 400px);
            }
        }

        @media (max-width: 768px) {
            .sectionDatosPedidos__title {
                display: none;
            }
            .sectionDistribuidores {
                padding: 20px;
            }
            .sectionDistribuidores__form {
                width: 100%;
                max-width: 100%;
            }
            .sectionDistribuidores__resultados-wrapper {
                max-height: 50vh;
            }
        }

        @media (max-width: 480px) {
            .tarjeta {
                padding: 24px 16px;
            }
            .tarjeta .foto {
                width: 70px;
                height: 70px;
            }
            .inputGroupFloating input {
                font-size: 14px;
                padding: 10px 9px;
            }
            .inputGroupFloating label {
                font-size: 14px;
            }
            .sectionDistribuidores__resultados-wrapper {
                max-height: calc(100vh - 350px);
                display: flex;
                justify-content: center;
            }
        }

        @media (max-width: 400px) {
            .sectionDistribuidores__resultados-wrapper {
                max-height: calc(100vh - 400px);
            }
        }
    </style>
    
    <link href="../css/proyecto2/representantesAutorizados.css?v4" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">
        <%--<header class="sn-header">
            <div class="sn-header__content">
                <a href="Login.aspx" class="sn-header__logo">
                    <img src="https://tienda.mundosantanatura.com/img/Tienda/logoSN-estirado.png" alt="Santa Natura Network" />
                </a>
            </div>
        </header>--%>
        <section class="sectionDatosPedidos">
            <section class="sectionDatosPedidos__title">
                <h1>Vivir bien <span>está en nuestras raíces</span></h1>
            </section>

            <main class="sectionDatosPedidos__body">
                <section class="sectionDistribuidores">
                    <div class="sectionDistribuidores__container">
                        <h2 class="sectionDistribuidores__title">Distribuidores Autorizados y Colaboradores de Santa Natura</h2>

                        <div class="sectionDistribuidores__form" id="formBuscarRepresentante">
                            <div class="inputGroupFloating">
                                <input type="text" id="txtDni" name="dni" placeholder=" " />
                                <label for="txtDni">DNI</label>
                            </div>

                            <div class="inputGroupFloating">
                                <input type="text" id="txtNombres" name="nombres" placeholder=" " />
                                <label for="txtNombres">Nombres y/o Apellidos</label>
                            </div>

                            <button type="button" id="btnBuscar" class="sectionDistribuidores__btnBuscar">Buscar</button>
                        </div>

                        <div class="sectionDistribuidores__resultados-wrapper">
                            <div id="contenedorTarjetas" class="sectionDistribuidores__resultados"></div>
                        </div>
                    </div>
                </section>
            </main>
        </section>
    </form>

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@10.10.4/dist/sweetalert2.all.min.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            const btnBuscar = document.getElementById('btnBuscar');
            const contenedorTarjetas = document.getElementById('contenedorTarjetas');
            const txtDni = document.getElementById('txtDni');
            const txtNombres = document.getElementById('txtNombres');

            txtDni.addEventListener('input', () => {
                txtDni.value = txtDni.value.replace(/\D/g, '').slice(0, 8);
            });

            txtNombres.addEventListener('input', () => {
                txtNombres.value = txtNombres.value.replace(/[^a-zA-ZÀ-ÿ\u00f1\u00d1\s]/g, ''); 
            });

            [txtDni, txtNombres].forEach(input => {
                input.addEventListener('keydown', function (e) {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        btnBuscar.click();
                    }
                });

                input.addEventListener('input', function () {
                    const dni = txtDni.value.trim();
                    const nombres = txtNombres.value.trim();
                    if (!dni && !nombres) contenedorTarjetas.innerHTML = '';
                });
            });

            btnBuscar.addEventListener('click', function () {
                const dni = txtDni.value.trim();
                const nombres = txtNombres.value.trim();

                if (!dni && !nombres) {
                    Swal.fire({
                        icon: 'warning',
                        text: 'Por favor, ingresa un DNI o nombre para buscar.',
                        confirmButtonColor: '#3c8a63'
                    });
                    return;
                }

                // 🔹 Validaciones adicionales
                if (dni && dni.length < 8) {
                    Swal.fire({
                        icon: 'warning',
                        text: 'El DNI debe tener 8 dígitos.',
                        confirmButtonColor: '#3c8a63'
                    });
                    return;
                }

                if (nombres && nombres.length < 3) {
                    Swal.fire({
                        icon: 'warning',
                        text: 'Por favor, ingresa al menos 3 caracteres para buscar por nombre.',
                        confirmButtonColor: '#3c8a63'
                    });
                    return;
                }

                const requestData = { dni, nombres };
                contenedorTarjetas.innerHTML = `<p>Buscando...</p>`;

                fetch('RepresentantesAutorizados.aspx/BuscadorRepresentantesAutorizados', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json; charset=utf-8' },
                    body: JSON.stringify({ requestRepresentantesAutorizados: requestData })
                })
                    .then(response => response.json())
                    .then(data => {
                        const resultado = data.d;

                        if (!resultado || resultado.length === 0) {
                            contenedorTarjetas.innerHTML = `<p>No se encontraron resultados.</p>`;
                            return;
                        }

                        contenedorTarjetas.innerHTML = resultado.map(item => {
                            const imagenUrl = item.Imagen && item.Imagen.trim() !== ''
                                ? item.Imagen
                                : 'https://tienda.mundosantanatura.com/img/Img_Perfil_Por_Defecto.png';

                            const rango = item.Rango_Máximo ?? 'Sin rango';
                            const rol = 'Distribuidor Independiente Autorizado';

                            return `
                            <div class="tarjeta">
                                <span class="rango">${rango}</span>
                                <img class="foto" 
                                     src="${imagenUrl}" 
                                     alt="${item.Nombres}" 
                                     onerror="this.src='https://tienda.mundosantanatura.com/img/Img_Perfil_Por_Defecto.png'" />
                                <h3>${item.Nombres ?? ''}<br>${item.Apellidos ?? ''}</h3>
                                <p>
                                    Empresario(a) desde: ${item.FechaRegistro ?? '-'}<br />
                                    <b>${rol}</b>
                                </p>
                            </div>`;
                        }).join('');
                    })
                    .catch(error => {
                        console.error('Error al buscar representantes:', error);
                        contenedorTarjetas.innerHTML = `<p style="color:red;">Ocurrió un error al procesar la solicitud.</p>`;
                    });
            });
        });
    </script>
</body>
</html>
