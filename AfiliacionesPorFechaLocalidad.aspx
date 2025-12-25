<%@ Page Title="" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="AfiliacionesPorFechaLocalidad.aspx.cs" Inherits="SantaNaturaNetworkV3.AfiliacionesPorFechaLocalidad" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css">
    <link href="https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/css/select2.min.css" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />
    <link href="css/datatables/dataTables.bootstrap.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css" integrity="sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w==" crossorigin="anonymous" />

    <link href="css/proyecto2/AfiliacionesPorFechaLocalidad.css" rel="stylesheet" />

	<style>

		.titulo-elegante {
			font-family: system-ui;
			font-size: 3em;
			color: #254ab1;
			text-align: center;
			margin: 0;
			padding: 20px 0 10px;
			background: linear-gradient(to right, #333, #dbdbdb);
			-webkit-background-clip: text;
			color: transparent;
			font-weight: bold;
			text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
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

		/* Reporte */
		.report {
			background: #fff;
			padding: 20px;
			border-radius: 8px;
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
			margin: auto;
			font-family: 'HurmeGeometricSans1 Bold';
			padding: 20px 40px;
			background-image: url(https://tienda.mundosantanatura.com/img/fondoSumaqWasi.jpg);
			min-height: 100vh;
		}

		.report__header {
			text-align: center;
			margin-bottom: 20px;
		}

		.report__title {
			font-size: 24px;
			color: #333;
		}

        .report__content{
            padding-bottom: 30px;
        }

		/* Filtros */
		.filters {
			background: rgb(255 255 255 / 50%);
			padding: 15px;
			border-radius: 8px;
			max-width: 900px;
			margin: 20px auto;
		}

		.filters__title {
			font-size: 18px;
			margin-bottom: 10px;
		}

		.filters__group {
			display: flex;
			flex-wrap: wrap;
			gap: 10px;
			margin-bottom: 20px;
		}

		.filters__label {
			font-weight: bold;
			flex-basis: 100%;
		}

		/* Ajustar ancho de los inputs de fecha */
		.filters__input {
			width: 100%;
			padding: 8px 32px 8px 8px; /* Espacio a la derecha para el icono */
			border: 1px solid #ccc;
			border-radius: 4px;
			background-color: #fff;
			background-image: url('../img/calendar.png'); /* Ajusta la ruta */
			background-repeat: no-repeat;
			background-position: right 8px center; /* Centrado verticalmente */
			background-size: 18px 18px; /* Tamaño de la imagen */
			cursor: pointer;
		}

		.filters__input, .filters__select {
			padding: 8px;
			border: 1px solid #ccc;
			border-radius: 4px;
		}

	        .filters__select:disabled {
	            cursor: not-allowed;
	            background-color: #f0f0f0; /* Un color de fondo más claro */
	            color: #999; /* Un color de texto más claro */
	        }

		.filters__group--date {
			display: flex;
			flex-direction: column;
			gap: 6px;
		}

		.filters__date-range {
			display: flex;
			justify-content: center;
			grid-gap: 60px;
			margin: 0 auto 10px;
		}

		.filters__date {
			display: flex;
			flex-direction: column;
			grid-gap: 4px;
			max-width: 130px;
		}

		.filters__date-label {
			font-size: 12px;
			color: #555;
			font-weight: bold;
			margin-bottom: 0;
		}

		/* Contenedor de ubicación en una fila */
		.filters__group--location {
			display: flex;
			flex-wrap: wrap;
			grid-gap: 10px;
			justify-content: space-between; /* Espaciado uniforme */
			max-width: 820px;
			margin: auto;
		}

		/* Ajustar ancho de los selects */
		.filters__select {
			max-width: 180px; /* Limitar el ancho de los selects */
			width: 100%;
		}

		.filters__actions {
			margin-top: 30px;
			text-align: center;
		}

		.filters__button {
			background: #1FA438; /* El verde que mencionaste */
			color: white;
			border: none;
			padding: 10px 20px;
			border-radius: 8px;
			cursor: pointer;
			font-size: 16px;
			font-weight: bold;
			letter-spacing: 0.5px;
			transition: background-color 0.3s ease, transform 0.2s ease;
			box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
			outline: none;
		}

			.filters__button:hover {
				background: #188C30; /* Un verde más oscuro para el hover */
				transform: translateY(-2px);
			}

			.filters__button:active {
				transform: translateY(0);
			}

		/* ------------------------------ Contenedor flexible para la tabla -------------------------------------- */
		.dataTable th,
		.dataTable td {
			text-align: center;
			vertical-align: middle;
		}
			/* Tabla principal */
			.table-container__body .table {
				width: 100%;
				border-collapse: collapse;
				font-family: 'Inter', Arial, sans-serif;
				font-size: 14px;
				color: #333;
				border: 1px solid #ddd;
				border-radius: 8px;
				overflow: hidden; /* Por si acaso */
				background-color: white;
			}

		/* Cabecera */
		.table__head {
			background-color: #1FA438;
			color: white;
			text-transform: uppercase;
			font-weight: bold;
		}

		/* Celda de cabecera */
		.table__cell--header {
			padding: 12px;
			text-align: left;
			white-space: nowrap;
		}

		/* Celdas normales */
		.table__cell {
			padding: 10px 12px;
			border: 1px solid #ddd;
			text-align: left;
			white-space: nowrap; /* Evita quiebres raros */
		}

		/* Alternar colores de filas */
		.table__body tr:nth-child(even) {
			background-color: #f6f6f6;
		}

		.table__body tr:nth-child(odd) {
			background-color: #ffffff;
		}

		/* Hover */
		.table__body tr:hover {
			background-color: rgba(31, 164, 56, 0.1);
		}

		/* Responsive: para pantallas pequeñas */
		@media (max-width: 768px) {
			.table__cell,
			.table__cell--header {
				font-size: 12px;
				padding: 8px;
			}
		}

		/* Paginación */
		.dataTables_wrapper .dataTables_paginate .paginate_button {
			padding: 6px 10px;
			margin: 2px;
			cursor: pointer;
			background-color: #1FA438;
			color: white !important;
			border: none;
			border-radius: 4px;
			font-size: 12px;
			transition: background-color 0.2s ease;
		}

			.dataTables_wrapper .dataTables_paginate .paginate_button:hover {
				background-color: #16882F;
			}

			/* Botón de página activa */
			.dataTables_wrapper .dataTables_paginate .paginate_button.current {
				background-color: #16882F;
			}

		/* Select y filtro */
		.dataTables_length select,
		.dataTables_filter input {
			padding: 6px 8px;
			border: 1px solid #ccc;
			border-radius: 4px;
			font-size: 14px;
		}

		.table thead {
			position: sticky;
			top: 0;
			background-color: #1FA438;
			z-index: 2;
		}

		/* Mejoras generales */
		.table__cell {
			vertical-align: middle;
		}

		/* Suave sombreado */
		.table-container__body .table {
			box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		}

		/* Responsive: Apilar en móviles */
		@media (max-width: 675px) {
			.filters {
				max-width: 90%; /* Ocupar más espacio en pantallas pequeñas */
			}

			.filters__group--location {
				flex-direction: column;
				align-items: center;
			}

	        .filters__date-range {
	            flex-direction: column;
	            grid-gap: 20px;
	            margin: 0 auto 30px;
	        }

			.filters__select, .filters__input {
				max-width: 100%; /* Ocupar todo el ancho en pantallas pequeñas */
			}

			.table {
				width: 100%;
				display: block;
				overflow-x: auto;
			}

				.table thead {
					display: block;
					width: 100%;
				}

				.table tbody {
					display: block;
					width: 100%;
					overflow-x: auto;
				}

				.table tr {
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;
				}

				.table th, .table td {
					flex: 1 1 150px; /* Asegura que las celdas sean lo suficientemente anchas */
					min-width: 100px;
				}

                div.dataTables_info,
                div.dataTables_paginate{
                    margin: 20px 0
                }

	        #tbl_Call_wrapper div.dataTables_paginate {
	            float: none;
	            margin: 10px 0;
	            display: flex;
	            align-items: center;
	            justify-content: flex-end;
	        }
		}

		.drp-buttons .btn.btn-primary {
			background-color: #1FA438;
			border-color: #1FA438;
		}
	</style>

	<section class="report">
		<section class="content-header">
            <h1 class="titulo-elegante">Afiliaciones por Fecha y Localidad</h1>
        </section>
		<section class="report__content">
			<div class="filters">
				<fieldset class="filters__fieldset filters__group--location">
					<legend>Rango de Fechas</legend>
					<div class="filters__date-range ">
						<div class="filters__date">
							<label for="fechaInicio">Fecha de Inicio:</label>
							<input type="text" id="fechaInicio" class="filters__input daterange" placeholder="dd/mm/yyyy">
						</div>
						<div class="filters__date">
							<label for="fechaFin">Fecha de Fin:</label>
							<input type="text" id="fechaFin" class="filters__input daterange" placeholder="dd/mm/yyyy">
						</div>
					</div>
				</fieldset>

				<fieldset class="filters__fieldset filters__group filters__group--location">
					<legend>Localidad</legend>
					<div style="width: 100%; max-width: 180px;">
						<label for="cboPais">País:</label>
						<select id="cboPais" class="filters__select">
							<option value="" selected>Pais</option>
						</select>
					</div>
					<div style="width: 100%; max-width: 180px;">
						<label for="cboDepartamento">Departamento:</label>
						<select id="cboDepartamento" class="filters__select">
							<option value="">Departamento</option>
						</select>
					</div>
					<div style="width: 100%; max-width: 180px;">
						<label for="cboProvincia">Provincia:</label>
						<select id="cboProvincia" class="filters__select">
							<option value="">Provincia</option>
						</select>
					</div>
					<div style="width: 100%; max-width: 180px;">
						<label for="cboDistrito">Distrito:</label>
						<select id="cboDistrito" class="filters__select">
							<option value="">Distrito</option>
						</select>
					</div>
				</fieldset>

				<div class="filters__actions">
					<button type="button" class="filters__button" id="btnAplicar">Consultar</button>
				</div>
			</div>

			<div class="table-container">
				<h3 class="table-container__title">Tabla de Resultados</h3>
				<div class="table-container__body">
					<table id="tbl_Call" class="table">
                        <thead class="table__head">
                            <tr class="table__row">
                                <th class="table__cell table__cell--header">ID Cliente</th>
                                <th class="table__cell table__cell--header">N° Documento</th>
                                <th class="table__cell table__cell--header">Nombre Completo</th>
                                <th class="table__cell table__cell--header">Celular</th>
                                <th class="table__cell table__cell--header">Correo Electrónico</th>
                                <th class="table__cell table__cell--header">Zona</th>
                                <th class="table__cell table__cell--header">País</th>
                                <th class="table__cell table__cell--header">Departamento</th>
                                <th class="table__cell table__cell--header">Provincia</th>
                                <th class="table__cell table__cell--header">Distrito</th>
                                <th class="table__cell table__cell--header">N° Ticket</th>
                                <th class="table__cell table__cell--header">Fecha de Pago</th>
                                <th class="table__cell table__cell--header">Monto (S/)</th>
                                <th class="table__cell table__cell--header">Tipo de Compra</th>
                            </tr>
                        </thead>
                        <tbody id="tbl_body_table" class="table__body">
							<!--Data por medio de Ajax-->
						</tbody>
					</table>
				</div>
				<div class="table-container__footer" style="display: none">
					<button type="button" class="table-container__button" id="btnExportar">Exportar a Excel</button>
				</div>
			</div>
		</section>
	</section>
	<script src="../assets/js/jquery-ui.min.js" type="text/javascript"></script>
	<script src="js/sweetAlert.js" type="text/javascript"> </script>
	<script type="text/javascript" src="https://cdn.datatables.net/v/dt/dt-1.10.25/datatables.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/js/select2.min.js"></script>
	<script src="js/moment.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js" type="text/javascript"></script>
	<%--<script src="js/GestionarPedidoQR.js?v1"></script>--%>
	<script type="text/javascript">
        $(document).ready(function () {
            // Inicializa un DateRangePicker en todos los inputs que tienen la clase daterange
			$('.daterange').daterangepicker({
				singleDatePicker: true,
				showDropdowns: true,
				locale: { format: "DD/MM/YYYY" },
				autoApply: false
			});

			
			cargarAfiliaciones();


			$('#btnExportar').on('click', function () {
				const fechaInicio = $('#fechaInicio').val();   
				const fechaFin = $('#fechaFin').val();         
				const pais = '01';                  
				const departamento = $('#cboDepartamento').val();  
				const provincia = $('#cboProvincia').val();        
				const distrito = $('#cboDistrito').val();          

				// Validar que los parámetros principales estén completos
				if (!fechaInicio || !fechaFin) {
					alert('Por favor ingrese Fecha Inicio, Fecha Fin y País.');
					return;
				}

				// Construir el objeto de datos
				const params = {
					fechaInicio,
					fechaFin,
					pais,
					departamento,
					provincia,
					distrito
				};

				// Llamada AJAX al WebMethod
				$.ajax({
					type: "POST",
					url: "Autocompletado.asmx/CrearArchivoAfiliacionesPorFechaYLocalidad",
					data: JSON.stringify(params),
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					success: function (response) {
						const result = response.d;

						if (result.length > 0 && !result[0].startsWith("Error")) {
							const fileName = result[0];
							const filePath = `Afiliaciones/Descarga/${fileName}`;

							// Crear un enlace temporal para forzar la descarga
							const link = document.createElement('a');
							link.href = filePath;
							link.download = fileName;
							document.body.appendChild(link);
							link.click();
							document.body.removeChild(link);
						} else {
							const errorMessage = result.length > 0 ? result[0] : 'Error desconocido al generar el archivo.';
							alert(errorMessage);
						}
					},
					error: function (xhr, status, error) {
						alert('Ocurrió un error al intentar generar el archivo: ' + error);
					}
				});
            });


            function aplicarEstiloPaginacion() {
                if ($(window).width() < 675) {
                    $('#tbl_Call_paginate > span').css({
                        'display': 'flex',
                        'align-items': 'center'
                    });
                } else {
                    $('#tbl_Call_paginate > span').css({
                        'display': '', // Limpia los estilos (opcional si no quieres que se quede pegado)
                        'align-items': ''
                    });
                }
            }

            // Al cargar la página
            $(document).ready(function () {
                aplicarEstiloPaginacion();
            });

            // Cada vez que se dibuja la tabla
            const tabla = $('#tbl_Call').DataTable();
            tabla.on('draw', function () {
                aplicarEstiloPaginacion();
            });

            // Opcional: Si cambian el tamaño de la ventana (por si redimensionan el navegador)
            $(window).on('resize', function () {
                aplicarEstiloPaginacion();
            });

        });
		
        window.onload = function () {
            document.getElementById("ReportesMultinivel").classList.add("active");
            document.querySelector("#ReportesMultinivel .sidebar-submenu").style.display = "block"

            document.getElementById("reportesMultinivel").style.color = '#79B729';
            document.getElementById("reportesMultinivel").style.textShadow = '0px 0px 4px rgbA(229, 246, 27, 0.8)';

            document.getElementById("afiPorFechaYLocalidad").style.color = '#79B729';
            document.getElementById("afiPorFechaYLocalidad").style.textShadow = '0px 0px 4px rgbA(229, 246, 27, 0.8)';
        }

		/* Carga de país, departamento, provincia y distrito */
        $.ajax({
            type: "POST",
            url: "EditarPerfil.aspx/GetPais",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                $("#cboPais").empty();
                $("#cboPais").append("<option value='0'>Seleccione</option>");
                $.each(result.d, function (key, value) {
                    $("#cboPais").append($("<option></option>").val(value.Codigo).html(value.Nombre));
                });
                
                // Seleccionar la opción con value "01"
                $("#cboPais option[value='01']").attr("selected", "selected");

                // Deshabilitar el combo
                $("#cboPais").attr("disabled", "disabled");
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(textStatus + ": " + XMLHttpRequest.responseText);
            }
        });

		var params = new Object();
		params.pais = '01';
		params = JSON.stringify(params);

		$.ajax({
			type: "POST",
			url: "EditarPerfil.aspx/GetDepartamentosByPais",
			data: params,
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			async: false,
			success: function (result) {
				$("#cboDepartamento").empty();
				$("#cboDepartamento").append("<option value=''>Seleccione...</option>");
				CargarProvincia();
				CargarDistrito();
				$.each(result.d, function (key, value) {
					$("#cboDepartamento").append($("<option></option>").val(value.Codigo).html(value.Nombre));
				});
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				alert(textStatus + ": " + XMLHttpRequest.responseText);
			}
		});

		$("#cboDepartamento").change(function () {
			var params = new Object();
			params.departamento = $("#cboDepartamento").val();
			params = JSON.stringify(params);

			$.ajax({
				type: "POST",
				url: "EditarPerfil.aspx/GetProvinciaByDepartamento",
				data: params,
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				async: false,
				success: function (result) {
					$("#cboProvincia").empty();
					$("#cboProvincia").append("<option value=''>Seleccione...</option>");
					CargarDistrito();
					$.each(result.d, function (key, value) {
						$("#cboProvincia").append($("<option></option>").val(value.Codigo).html(value.Nombre));
					});
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					alert(textStatus + ": " + XMLHttpRequest.responseText);
				}
			});
		});

		$("#cboProvincia").change(function () {
			var params = new Object();
			params.provincia = $("#cboProvincia").val();
			params = JSON.stringify(params);

			$.ajax({
				type: "POST",
				url: "EditarPerfil.aspx/GetDistritoByProvincia",
				data: params,
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				async: false,
				success: function (result) {
					$("#cboDistrito").empty();
					$("#cboDistrito").append("<option value=''>Seleccione...</option>");
					$.each(result.d, function (key, value) {
						$("#cboDistrito").append($("<option></option>").val(value.Codigo).html(value.Nombre));
					});
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					alert(textStatus + ": " + XMLHttpRequest.responseText);
				}
			});
		});

		function CargarProvincia() {
			var params = new Object();
			params.departamento = $("#cboDepartamento").val();
			params = JSON.stringify(params);

			$.ajax({
				type: "POST",
				url: "SociosRed.aspx/GetProvinciaByDepartamento",
				data: params,
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				async: false,
				success: function (result) {
					$("#cboProvincia").empty();
					$("#cboProvincia").append("<option value=''>Seleccione...</option>");
					$.each(result.d, function (key, value) {
						$("#cboProvincia").append($("<option></option>").val(value.Codigo).html(value.Nombre));
					});
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					alert(textStatus + ": " + XMLHttpRequest.responseText);
				}
			});
		}

		function CargarDistrito() {
			var params = new Object();
			params.provincia = $("#cboProvincia").val();
			params = JSON.stringify(params);

			$.ajax({
				type: "POST",
				url: "SociosRed.aspx/GetDistritoByProvincia",
				data: params,
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				async: false,
				success: function (result) {
					$("#cboDistrito").empty();
					$("#cboDistrito").append("<option value=''>Seleccione...</option>");
					$.each(result.d, function (key, value) {
						$("#cboDistrito").append($("<option></option>").val(value.Codigo).html(value.Nombre));
					});
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					alert(textStatus + ": " + XMLHttpRequest.responseText);
				}
			});
		}

		
		/* Para listar la tabla */
        $("#btnAplicar").click(function () {
            const fechaInicioStr = $("#fechaInicio").val();
            const fechaFinStr = $("#fechaFin").val();

            // Validar que las fechas estén completas (opcional)
            if (!fechaInicioStr || !fechaFinStr) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Campos incompletos',
                    text: 'Debe ingresar ambas fechas: Inicio y Fin.',
                    confirmButtonColor: '#1FA438'
                });
                return;
            }

            // Función para convertir DD/MM/YYYY a Date (JS trabaja con MM/DD/YYYY)
            function parseFecha(fechaStr) {
                const partes = fechaStr.split('/');
                if (partes.length !== 3) return null;
                return new Date(partes[2], partes[1] - 1, partes[0]); // Año, Mes (base 0), Día
            }

            const fechaInicio = parseFecha(fechaInicioStr);
            const fechaFin = parseFecha(fechaFinStr);
            const hoy = new Date();
            hoy.setHours(0, 0, 0, 0); // Limpiar hora para comparar solo fecha

            if (fechaInicio > hoy) {
                Swal.fire({
                    icon: 'error',
                    title: 'Fecha de Inicio inválida',
                    text: 'La Fecha de Inicio no puede ser mayor a la fecha actual.',
                    confirmButtonColor: '#1FA438'
                });
                return;
            }

            if (fechaFin > hoy) {
                Swal.fire({
                    icon: 'error',
                    title: 'Fecha de Fin inválida',
                    text: 'La Fecha de Fin no puede ser mayor a la fecha actual.',
                    confirmButtonColor: '#1FA438'
                });
                return;
            }

            if (fechaFin < fechaInicio) {
                Swal.fire({
                    icon: 'error',
                    title: 'Rango de fechas inválido',
                    text: 'La Fecha de Fin no puede ser menor a la Fecha de Inicio.',
                    confirmButtonColor: '#1FA438'
                });
                return;
            }

            cargarAfiliaciones();
        });

		function cargarAfiliaciones() {
			var fechaInicio = formatearFechaParaSP($("#fechaInicio").val());
			var fechaFin = formatearFechaParaSP($("#fechaFin").val());
			var departamento = $("#cboDepartamento").val();
			var provincia = $("#cboProvincia").val();
			var distrito = $("#cboDistrito").val();
			var pais = "01"; // Puedes sacarlo de un select o definirlo fijo según el caso

			$('#tbl_Call').DataTable().destroy();  // Reiniciar DataTable si ya existía

			$('#tbl_Call').DataTable({
				language: {
					processing: "Procesando...",
					search: "Buscar:",
					lengthMenu: "Mostrar _MENU_ registros",
					info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
					infoEmpty: "Mostrando 0 a 0 de 0 registros",
					infoFiltered: "(filtrado de _MAX_ registros en total)",
					infoPostFix: "",
					loadingRecords: "Cargando...",
					zeroRecords: "No se encontraron resultados",
					emptyTable: "No hay datos disponibles en la tabla",
					paginate: {
						first: "Primero",
						previous: "Anterior",
						next: "Siguiente",
						last: "Último"
					},
					aria: {
						sortAscending: ": activar para ordenar la columna de manera ascendente",
						sortDescending: ": activar para ordenar la columna de manera descendente"
					}
				},
				responsive: false,
				scrollX: true,
				ajax: {
					url: 'AfiliacionesPorFechaLocalidad.aspx/LlenarAfiliacionesPorFechaYLocalidad',
					type: 'POST',
					contentType: 'application/json; charset=utf-8',
					dataType: 'json',
					data: function (d) {
						return JSON.stringify({
							fechaInicio: fechaInicio,
							fechaFin: fechaFin,
							pais: pais,
							departamento: departamento,
							provincia: provincia,
							distrito: distrito
						});
					},
					dataSrc: function (response) {
						if (!response.d.Success) {
							alert('Error: ' + response.d.Message);
							return [];
						}
						return response.d.Data;  // Aquí están los datos reales
					}
				},
				columns: [
					{ data: 'IdCliente' },
					{ data: 'NumeroDoc' },
					{ data: 'Cliente' },
					{ data: 'Celular' },
					{ data: 'Correo' },
					{ data: 'UBIGEO_ZONA' },
					{ data: 'Pais' },
					{ data: 'Departamento' },
					{ data: 'Provincia' },
					{ data: 'Distrito' },
					{ data: 'Ticket' },
					{ data: 'FechaPago' },
					{
						data: 'Monto',
						render: function (data, type, row) {
							return formatCurrency(data);  // Formateamos aquí cada celda de "Monto"
						}
					},
					{ data: 'TipoCompra' }
				],
				pageLength: 10,    // Cantidad de filas por página
				lengthMenu: [10, 25, 50, 100],  // Opciones para cantidad de filas
				processing: true,
				serverSide: false // Esto es clave: si tu webmethod ya trae paginado, esto va en true
			});

			function formatCurrency(value) {
				return parseFloat(value).toLocaleString("es-US", { // Primer convertimos de String a Decimal con parseFloat, luego convertirmos de decimal a String en formato US para los decimales.
					minimumFractionDigits: 2, //que si o si vean 2 decimales. Si es 1000 saldría 1,000.00
					maximumFractionDigits: 2 //en caso tenga mas de 2 decimales se redondea a 2 decimales.
				});
			}
		}

		function pintarTabla(data) {
			var tbody = $("#tbl_body_table");
			tbody.empty(); // Limpiar lo anterior

			if (data.Data.length === 0) {
				tbody.append("<tr><td colspan='14' class='text-center'>No hay datos disponibles.</td></tr>");
				return;
			}

			data.Data.forEach(function (item) {
				var row = "<tr>" +
					"<td>" + item.IdCliente + "</td>" +
					"<td>" + item.NumeroDoc + "</td>" +
					"<td>" + item.Cliente + "</td>" +
					"<td>" + item.Celular + "</td>" +
					"<td>" + item.Correo + "</td>" +
					"<td>" + item.UBIGEO_ZONA + "</td>" +
					"<td>" + item.Pais + "</td>" +
					"<td>" + item.Departamento + "</td>" +
					"<td>" + item.Provincia + "</td>" +
					"<td>" + item.Distrito + "</td>" +
					"<td>" + item.Ticket + "</td>" +
					"<td>" + item.FechaPago + "</td>" +
					"<td>" + item.Monto.toFixed(2) + "</td>" +
					"<td>" + item.TipoCompra + "</td>" +
					"</tr>";
				tbody.append(row);
			});
		}

        // Formatear la fecha en el formato yyyy-mm-dd
		function formatearFechaParaSP(fechaOriginal) {
			if (!fechaOriginal) return "";
			var partes = fechaOriginal.split('/');
			return `${partes[2]}-${partes[1]}-${partes[0]}`;
		}

    </script>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
</asp:Content>
