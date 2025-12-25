$("#Banderas").show();
$("#ContenidoFluido").hide();
var patro = "", nameImageProfile = "", nameArchiveDNI = "", nameArchiveDireccion = "";
//ddlPaquete

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
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert(textStatus + ": " + XMLHttpRequest.responseText);
    }
});

$.ajax({
    type: "POST",
    url: "EditarPerfil.aspx/GetPais",
    data: "{}",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    async: false,
    success: function (result) {
        $("#cboPaisTienda").empty();
        $("#cboPaisTienda").append("<option value='0'>Seleccione</option>");
        $.each(result.d, function (key, value) {
            $("#cboPaisTienda").append($("<option></option>").val(value.Codigo).html(value.Nombre));
            $("#cboPaisTienda").val("08");
            $("#cboPaisTienda").attr("disabled", true);
        });
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert(textStatus + ": " + XMLHttpRequest.responseText);
    }
});

$("#cboPais").change(function () {
    var params = new Object();
    params.pais = $("#cboPais").val();
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
            $("#cboDepartamento").append("<option value='0'>Seleccione</option>");
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
            $("#cboProvincia").append("<option value='0'>--Seleccione--</option>");
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
            $("#cboDistrito").append("<option value='0'>--Seleccione--</option>");
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
            $("#cboProvincia").append("<option value='0'>--Select--</option>");
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
            $("#cboDistrito").append("<option value='0'>--Select--</option>");
            $.each(result.d, function (key, value) {
                $("#cboDistrito").append($("<option></option>").val(value.Codigo).html(value.Nombre));
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ": " + XMLHttpRequest.responseText);
        }
    });
}

var inputPais = document.getElementById('cboPais');
var inputTC = document.getElementById('ddlTC');
var inputTDoc = document.getElementById('ComboTipoDocumento');

inputPais.onchange = function () {

    CargaTipoDocumento(this.value);

    if (this.value == "01") {
        $("#dvDistrito").show();
        $("#blogCdrPremio").show();
        $("#bloqPostal").hide();
        $("#lblEstado").text("Departamento");
        $("#lblCondado").text("Provincia");
        $("#lblDistrito").text("Distrito");

    } else if (this.value == "02") {
        $("#dvDistrito").show();
        $("#blogCdrPremio").hide();
        $("#bloqPostal").hide();
        $("#lblDistrito").text("Municipio");
    } else if (this.value == "09") {
        $("#dvDistrito").show();
        $("#blogCdrPremio").hide();
        $("#bloqPostal").hide();
        $("#lblEstado").text("Provincia");
        $("#lblCondado").text("Cantones");
        $("#lblDistrito").text("Parroquia");
    } else {
        $("#dvDistrito").hide();
        $("#blogCdrPremio").hide();
        $("#bloqPostal").show();
        $("#lblEstado").text("Estado");
        $("#lblCondado").text("Condado");
    }
}

inputTDoc.onchange = function () {
    ClearDisabled();
    if ($("#cboPais").val() == "01") {//si el combo Pais de operaciones tiene seleccionado a Perú
        $("#bloq_Identidad").show();

        if (this.value == "01") {
            AddDisabled();
        }

        if (this.value == "02") {
            $("#bloqBtnValidar").hide();
            //$("#lblArchiveDni").text("Archivo Pasaporte ...");
            $("#lbl2ArchiveDni").text("** Archivo Pasaporte ...");
            //$('.file-upload').file_upload();
        }
    }
}

inputTC.onchange = function () {

    if (this.value == "01") {
        $('#CboUpLine').attr("disabled", false);
        $("#CboUpLine").val("0");
        $("#blogCdrPremio").show();
    } else if (this.value == "03") {
        $('#CboUpLine').attr("disabled", true);
        $("#CboUpLine").val("0");
        $("#blogCdrPremio").show();
    } else if (this.value == "05") {
        $('#CboUpLine').attr("disabled", true);
        $("#CboUpLine").val("0");
        $("#blogCdrPremio").show();
    } else if (this.value == "11") {
        var ddd = document.getElementById("CboUpLine").length;
        if (document.getElementById("CboUpLine").length > 1) {
            $('#CboUpLine').attr("disabled", true);
            $("#CboUpLine").val($("#txtPatrocinador").val());
            $("#blogCdrPremio").hide();
        }
        else {
            $("#ddlTC").val("01");
            SError("Debe realizar el pago de su afiliación para poder registrar un consultor");
        }
    }
}

$("#btnValidar").click(function (e) {
    e.preventDefault();
    let txtValidar = $("#btnValidar").text();

    if (txtValidar == "Validar") {
        ProcessValidation()
    } else {
        ResetClassValidation();
    }
});

function ProcessValidation() {
    let dni = $("#txtNumDocumento").val();
    var obj = JSON.stringify({
        dni: dni
    });

    if (dni == "") {
        SError("El DNI ingresado es inválido");
    }
    else {
        $('#page_loader').show();
        $.ajax({
            type: "POST",
            url: "Autocompletado.asmx/ValidarDNI",
            data: obj,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (data) {
                if (data.d == "404") {
                    ClearDataValidation();
                    SError('Hubo un problema con la validación del DNI, intentelo de nuevo por favor!');
                } else if (data.d == null) {
                    ClearDataValidation();
                    Swal.fire({
                        icon: 'error',
                        title: 'Ooops...!',
                        text: 'El DNI ingresado es inválido'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            Swal.fire({
                                //icon: 'success',
                                //title: 'Transferencia exitosa',
                                text: 'Desea ingresar manualmente los datos para el DNI consultado.',
                                showCancelButton: true,
                                cancelButtonText: "No",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Si",
                                confirmButtonColor: '#008C27',
                                reverseButtons: true,
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    ChangeFunctionButtonValidate();
                                    $("#txtNumDocumento").addClass("noEditable");
                                    $("#txtNumDocumento").prop('disabled', true);
                                    $("#txtNombre").removeClass("noEditable");
                                    $("#txtApPaterno").removeClass("noEditable");
                                    $("#txtApMaterno").removeClass("noEditable");
                                    $("#ComboSexo").removeClass("noEditable");
                                    $("#datepicker").removeClass("noEditable");
                                    $("#txtUbigeo").removeClass("noEditable");
                                    $("#txtNombre").prop('disabled', false);
                                    $("#txtApPaterno").prop('disabled', false);
                                    $("#txtApMaterno").prop('disabled', false);
                                    $("#ComboSexo").prop('disabled', false);
                                    $("#datepicker").prop('disabled', false);
                                    $("#datepicker").prop('readonly', false);
                                    $("#txtUbigeo").prop('disabled', false);
                                } else if (result.dismiss === Swal.DismissReason.cancel) {
                                    // Reforzar bloqueo de campos
                                    $("#txtNombre").addClass("noEditable").prop('disabled', true);
                                    $("#txtApPaterno").addClass("noEditable").prop('disabled', true);
                                    $("#txtApMaterno").addClass("noEditable").prop('disabled', true);
                                    $("#ComboSexo").addClass("noEditable").prop('disabled', true);
                                    $("#datepicker").addClass("noEditable").prop('disabled', true).prop('readonly', true);
                                    $("#txtUbigeo").addClass("noEditable").prop('disabled', true);

                                    $("#txtNumDocumento").focus();
                                }
                            });
                        }
                    });
                } else {
                    ChangeFunctionButtonValidate();
                    FillDataValidation(data.d.data);

                    // Validar fecha de nacimiento después de llenar los datos
                    if (data.d.data.birth_date === "01/01/1901") {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Actualización requerida',
                            text: 'Por favor, actualice la fecha de nacimiento'
                        }).then(() => {
                            // Habilitar el campo de fecha de nacimiento para edición
                            $("#datepicker").removeClass("noEditable");
                            $("#datepicker").prop('disabled', false);
                            $("#datepicker").prop('readonly', false);
                            $("#datepicker").focus(); // Opcional: enfocar el campo

                            // Pequeño delay para asegurar que el scroll termine antes del focus
                            setTimeout(function () {
                                // Hacer scroll suave hasta el input de fecha
                                $("#datepicker")[0].scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'center',
                                    inline: 'nearest'
                                });
                            }, 500);
                        });
                    } else {
                        alertOk();
                    }
                    //alertOk();
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(textStatus + ": " + XMLHttpRequest.responseText);
            }
        });
    }
}

function ResetClassValidation() {
    $("#txtNumDocumento").removeClass("noEditable");
    $("#txtNumDocumento").prop('disabled', false);
    $("#btnValidar").text("Validar");
    $("#btnValidar").css('background', '#1b2c5e');
    ClearDataValidation();
}

function ChangeFunctionButtonValidate() {
    $("#btnValidar").text("Editar");
    $("#btnValidar").css('background', '#dc3545');
}

function FillDataValidation(dataV) {
    $("#txtNombre").val(dataV.name);
    $("#txtApPaterno").val(dataV.fathers_lastname);
    $("#txtApMaterno").val(dataV.mothers_lastname);
    $("#ComboSexo").val(dataV.gender);
    $("#datepicker").val(dataV.birth_date);
    $("#txtDireccion").val(dataV.address);
    $("#txtUbigeo").val(dataV.location_reniec);
    $("#txtNumDocumento").addClass("noEditable");
    $("#txtNumDocumento").prop('disabled', true);
}

function ClearDataValidation() {
    $("#txtNombre").val("");
    $("#txtApPaterno").val("");
    $("#txtApMaterno").val("");
    $("#ComboSexo").val("");
    $("#datepicker").val("");
    $("#txtDireccion").val("");
    $("#txtUbigeo").val("");
}

function CargaTipoDocumento(pais) {

    $('#ComboTipoDocumento').attr("disabled", false);

    ClearDisabled();

    if (pais == "01" || pais == "08") {
        $("#ComboTipoDocumento").empty();
        $("#ComboTipoDocumento").append($("<option></option>").val("01").html("DNI"));
        $("#ComboTipoDocumento").append($("<option></option>").val("02").html("CE"));
        $("#ComboTipoDocumento").append($("<option></option>").val("03").html("PASS"));
    }

    if (pais == "01") {
        $("#bloq_Identidad").show();

        AddDisabled();
    }

    if (pais == "02" || pais == "09") {
        $("#ComboTipoDocumento").empty();
        $("#ComboTipoDocumento").append($("<option></option>").val("04").html("CÉDULA"));
        $("#ComboTipoDocumento").append($("<option></option>").val("03").html("PASAPORTE"));
    }

    if (pais == "07") {
        $("#ComboTipoDocumento").empty();
        $("#ComboTipoDocumento").append($("<option></option>").val("05").html("CÉDULA DE IDENTIDAD"));
        $("#ComboTipoDocumento").append($("<option></option>").val("03").html("PASAPORTE"));
    }
}

function AddDisabled() {

    $("#txtNombre").addClass("noEditable");
    $("#txtApPaterno").addClass("noEditable");
    $("#txtApMaterno").addClass("noEditable");
    $("#ComboSexo").addClass("noEditable");
    $("#datepicker").addClass("noEditable");
    //$("#txtDireccion").addClass("noEditable");
    $("#txtUbigeo").addClass("noEditable");
    $(".btn-outline-secondary").hide();
    $("#bloqUbigeo").show();
    $("#bloqBtnValidar").show();
    //$("#lblArchiveDni").text("Archivo DNI ...");
    $("#lbl2ArchiveDni").text("** Archivo DNI ...");
    //$('.file-upload').file_upload();

    $("#txtNombre").prop('disabled', true);
    $("#txtApPaterno").prop('disabled', true);
    $("#txtApMaterno").prop('disabled', true);
    $("#ComboSexo").prop('disabled', true);
    $("#datepicker").prop('disabled', true);
    //$("#txtDireccion").prop('disabled', true);
    $("#txtUbigeo").prop('disabled', true);
}

function ClearDisabled() {

    $("#txtNombre").removeClass("noEditable");
    $("#txtApPaterno").removeClass("noEditable");
    $("#txtApMaterno").removeClass("noEditable");
    $("#ComboSexo").removeClass("noEditable");
    $("#datepicker").removeClass("noEditable");
    $("#txtDireccion").removeClass("noEditable");
    $("#txtUbigeo").removeClass("noEditable");
    $(".btn-outline-secondary").show();
    $("#bloq_Identidad").hide();
    $("#bloqBtnValidar").hide();
    $("#bloqUbigeo").hide();

    $("#txtNombre").prop('disabled', false);
    $("#txtApPaterno").prop('disabled', false);
    $("#txtApMaterno").prop('disabled', false);
    $("#ComboSexo").prop('disabled', false);
    $("#datepicker").prop('disabled', false);
    $("#txtDireccion").prop('disabled', false);
    $("#txtUbigeo").prop('disabled', false);
}

//function paqueteCliente(ddl) {

//    dropdown = ddl.options[ddl.selectedIndex].value;

//    if (ddl.options[ddl.selectedIndex].value == "05" || ddl.options[ddl.selectedIndex].value == "03") {
//        $('#CboUpLine').attr("disabled", true);
//        $("#CboUpLine").val("0");
//    } else {
//        $('#CboUpLine').attr("disabled", false);
//    }
//}

function CargarDepartamentos() {
    var params = new Object();
    params.pais = $("#cboPais").val();
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
            $("#cboDepartamento").append("<option value='0'>Seleccione</option>");
            $.each(result.d, function (key, value) {
                $("#cboDepartamento").append($("<option></option>").val(value.Codigo).html(value.Nombre));
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ": " + XMLHttpRequest.responseText);
        }
    });
}

function CargarProvincia() {
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
            $("#cboProvincia").append("<option value='0'>Seleccione</option>");
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
        url: "EditarPerfil.aspx/GetDistritoByProvincia",
        data: params,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            $("#cboDistrito").empty();
            $("#cboDistrito").append("<option value='0'>Seleccione</option>");
            $.each(result.d, function (key, value) {
                $("#cboDistrito").append($("<option></option>").val(value.Codigo).html(value.Nombre));
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ": " + XMLHttpRequest.responseText);
        }
    });
}

$("#btnRegistrar").click(function (e) {
    var day = new Date();
    var celular = $("#TxtCelular").val().replace(/\s/g, '');
    var formatCellphone = (celular.substring(0, 3) == "+51") ? celular.substring(3, 12) :
        (celular.substring(0, 2) == "51") ? celular.substring(2, 11) : celular;
    $("#TxtCelular").val(formatCellphone);
    var btnValidar = $("#btnValidar").text();
    var fecha = $("#datepicker").val();

    // ACÁ SE COMIENZA A APLICAR LAS MISMAS 4 VALIDACIONES DEL SERVICIO
    var currentYear = new Date().getFullYear(); // 2025
    var minValidYear = currentYear - 95; // 1930
    var requiresUpdate = false;

    // Parsear la fecha ingresada
    var fechaParts = fecha.split('/'); // Asumiendo formato dd/MM/yyyy
    var fechaObj = new Date(fechaParts[2], fechaParts[1] - 1, fechaParts[0]);
    var yearFromDate = parseInt(fechaParts[2]);

    // Validación 1: Fecha igual a "01/01/1901" (fecha forzada por el sistema)
    if (fecha === "01/01/1901") {
        requiresUpdate = true;
    }
    // Validación 2: Año igual al año actual (2025)
    else if (yearFromDate === currentYear) {
        requiresUpdate = true;
    }
    // Validación 3: Año mayor al año actual (fecha futura)
    else if (yearFromDate > currentYear) {
        requiresUpdate = true;
    }
    // Validación 3: Año menor al año actual menos 95 (menor a 1930)
    else if (yearFromDate < minValidYear) {
        requiresUpdate = true;
    }
    // Validación adicional: Fecha inválida
    else if (isNaN(fechaObj.getTime()) || fechaParts.length !== 3) {
        requiresUpdate = true;
    }

    // Si requiere actualización, mostrar alerta y detener registro
    if (requiresUpdate) {
        Swal.fire({
            icon: 'warning',
            title: 'Fecha de nacimiento inválida',
            text: 'Por favor, actualice la fecha de nacimiento.'
        }).then(() => {
            // Pequeño delay para asegurar que el scroll termine antes del focus
            setTimeout(function () {
                // Hacer scroll suave hasta el input de fecha
                $("#datepicker")[0].scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'nearest'
                });
            }, 500);
        });
        return false; // Detener el proceso de registro
    }

    var tipoDoc = $("#ComboTipoDocumento").val();
    var pais = $("#cboPais").val();
    var dni = $("#txtNumDocumento").val();
    dni = dni.trim();
    var usuario = $("#txtUl").val();
    var clave = $("#password").val();
    var clave2 = $("#password2").val();
    var upline = $("#CboUpLine").val();
    var patrocinador = $("#txtPatrocinador").val();
    var paquete = ($("#ddlTC").val() == "01") ? "01" : ($("#ddlTC").val() == "03") ? "06" : ($("#ddlTC").val() == "11") ? "29" : "05";
    var nombre = $("#txtNombre").val();
    var apellidoPat = $("#txtApPaterno").val();
    var sexo = $("#ComboSexo").val();
    var correo = $("#TxtCorreo").val();
    var departamento = $("#cboDepartamento").val();
    var provincia = $("#cboProvincia").val();
    var distrito = $("#cboDistrito").val();
    var direccion = $("#txtDireccion").val();
    var fechaNac = toDate(moment(fecha).format('DD/MM/YYYY'));
    var cdrPremio = $("#cboPremio").val();
    var count_archive_dni = document.getElementById('archiveDNI').files.length;
    var count_archive_address = document.getElementById('archiveAddress').files.length;
    var tipoArchivo = (tipoDoc == "01") ? "DNI" : (tipoDoc == "02") ? "CE": "PASS";

    e.preventDefault();

    fechaNac.setFullYear(fechaNac.getFullYear() + 18);
    if (tipoDoc == "01" && pais == "01" && btnValidar != "Editar") {
        SError("Por favor antes de continuar debe validar el DNI");
    } else if (usuario == "") {
        FaltaUsuario();
    } else if (clave == "") {
        FaltaClave();
    } else if (patrocinador == "") {
        FaltaPatrocinador();
    } else if (clave2 == "") {
        FaltaClave2();
    } else if (paquete == "0") {
        FaltaPackete();
    } else if (fecha == "") {
        FaltaFechaNac();
    } else if (fechaNac >= day) {
        FaltaFechaNac();
    } else if (paquete == "0") {
        FaltaPaquete();
    } else if ((paquete != "05" && paquete != "06" && paquete != "29") && upline == "0") {
        FaltaUpline();
    } else if (nombre == "") {
        FaltaNombre();
    } else if (apellidoPat == "") {
        FaltaApellido();
    } else if (tipoDoc == "0") {
        FaltaTipoDoc();
    } else if (dni == "") {
        FaltaDocumento();
    } else if (dni.length < 8 && pais == "01") {
        ErrorDocumento();
    } else if (validarEnteroEnCampo(dni) == false && pais == "01") {
        ErrorDocumento();
    } 
      else if (sexo == "0") {
        FaltaSexo();
    } else if (correo == "") {
        FaltaCorreo();
    } else if (formatCellphone == "") {
        SError("Por favor ingrese un número de celular correcto");
    } else if (formatCellphone.length < 9) {
        SError("Por favor ingrese como mínimo 9 digitos en el campo celular");
    } else if (pais == "0") {
        FaltaPais();
    } else if (departamento == "0") {
        FaltaDepartamento();
    } else if (provincia == "0") {
        FaltaProvincia();
    } else if (direccion == "") {
        FaltaDireccion();
    } else if ((pais == "01" || pais == "02" || pais == "09") && distrito == "0") {
        FaltaDistrito();
    } else if (pais == "01" && cdrPremio == "0" && paquete != "29") {
        FaltaCDR();
    }
    else if (pais == "01" && count_archive_dni == 0) {
        SError("Debe agregar un archivo o imagen de su " + tipoArchivo);
    }
    else if (pais == "01" && count_archive_address == 0 && paquete == "29") {
        SError("Debe agregar un archivo o imagen de validación de Dirección");
    }
    else {
        ValidarCorreo();
    }
});

function validarEnteroEnCampo(documento) {
    let valueInt = parseInt(documento);
    if (!Number.isInteger(valueInt)) {
        return false;
    } else {
        return true;
    }
}

$("#btnCancelar").click(function (e) {
    patro = $("#txtPatrocinador").val();
    $("input").val("");
    $("select").val("0");
    $("#txtPatrocinador").val(patro);
    $("#Banderas").show();
    $("#ContenidoFluido").hide();
    $("#ddlTC").val("01");
});

$("#regresarBanderas").click(function (e) {
    patro = $("#txtPatrocinador").val();
    $("input").val("");
    $("select").val("0");
    $("#txtPatrocinador").val(patro);
    $("#Banderas").show();
    $("#ContenidoFluido").hide();
    $("#ddlTC").val("01");
});

$(document).on('click', '.banderaPeru', function (e) {
    e.preventDefault();
    $("#Banderas").hide();
    $("#ContenidoFluido").show();
    CargaTipoDocumento("01");
    $("#cboPais").val("01");
    CargarDepartamentos();
    $("#dvDistrito").show();
    $("#blogCdrPremio").show();
    $("#bloqPostal").hide();
    $("#lblEstado").text("Departamento");
    $("#lblCondado").text("Provincia");
    $("#lblDistrito").text("Distrito");
});

$(document).on('click', '.banderaBolivia', function (e) {
    e.preventDefault();
    $("#Banderas").hide();
    $("#ContenidoFluido").show();
    CargaTipoDocumento("02");
    $("#cboPais").val("02");
    CargarDepartamentos();
    $("#dvDistrito").show();
    $("#blogCdrPremio").hide();
    $("#bloqPostal").hide();
    $("#lblEstado").text("Departamento");
    $("#lblCondado").text("Provincia");
    $("#lblDistrito").text("Municipio");
});

$(document).on('click', '.banderaEcuador', function (e) {
    e.preventDefault();
    $("#Banderas").hide();
    $("#ContenidoFluido").show();
    CargaTipoDocumento("09");
    $("#cboPais").val("09");
    CargarDepartamentos();
    $("#dvDistrito").show();
    $("#blogCdrPremio").hide();
    $("#bloqPostal").hide();
    $("#lblEstado").text("Provincia");
    $("#lblCondado").text("Cantones");
    $("#lblDistrito").text("Parroquia");
});

$(document).on('click', '.banderaEEUU', function (e) {
    e.preventDefault();
    $("#Banderas").hide();
    $("#ContenidoFluido").show();
    CargaTipoDocumento("08");
    $("#cboPais").val("08");
    CargarDepartamentos();
    $("#dvDistrito").hide();
    $("#blogCdrPremio").hide();
    $("#bloqPostal").show();
    $("#lblEstado").text("Estado");
    $("#lblCondado").text("Condado");
});

$(document).on('click', '.banderaPanama', function (e) {
    e.preventDefault();
    $("#Banderas").hide();
    $("#ContenidoFluido").show();
    CargaTipoDocumento("07");
    $("#cboPais").val("07");
    CargarDepartamentos();
    $("#dvDistrito").show();
    $("#blogCdrPremio").hide();
    $("#bloqPostal").hide();
    $("#lblEstado").text("Entidad Federativa");
    $("#lblCondado").text("Departamento");
    $("#lblDistrito").text("Colonia");
});

//Solo permite introducir numeros.
function validarNumerosPD(evt) {
    var PD = $("#cboPais").val();
    if (PD == "01") {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
        return true;
    }
}

// CONDICIONES PARA REGISTRAR
function ValidarCorreo() {
    var correo = $("#TxtCorreo").val();
    var doc = $("#txtNumDocumento").val();
    var usu = $("#txtUl").val();
    var celular = $("#TxtCelular").val();
    celular = (celular.substring(0, 3) == "+51") ? celular.substring(3, 12) :
              (celular.substring(0, 2) == "51") ? celular.substring(2, 11) : celular;

    var obj = JSON.stringify({ correoS: correo, documento: doc, usuario: usu, celular: celular });
    $.ajax({
        type: "POST",
        url: "PreRegistroSocio.aspx/ValidarDatos",
        data: obj,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, throwError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (response) {
            if (response.d == "0") {
                Swal.fire({
                    title: '¿Está seguro de continuar?',
                    text: "Algunos datos no podrán ser moficados!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Registrar!',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        UploadAllFiles();
                    }
                });
            } else {
                swal.fire({
                    title: 'ooops...!',
                    text: response.d,
                    icon: "error"
                });
            }
        }
    });
}

async function UploadAllFiles() {
    var valida = document.getElementById('imageUpload').files.length;
    var file1 = document.getElementById('archiveDNI').files.length;
    var file2 = document.getElementById('archiveAddress').files.length;
    var tipoDoc = $("#ComboTipoDocumento").val();
    var pais = $("#cboPais").val();
    var fileUpload, files, extension;

    if (valida != 0) {
        fileUpload = $("#imageUpload").get(0);
        files = fileUpload.files;
        extension = files[0].name.split('.').pop();
        nameImageProfile = await UploadFile(files[0], "socios", extension);
    }

    if (pais == "01") {
        if (file1 != 0) {
            /*Dni*/
            fileUpload = $("#archiveDNI").get(0);
            files = fileUpload.files;
            extension = files[0].name.split('.').pop();
            nameArchiveDNI = await UploadFile(files[0], "archiveDni", extension);
        }
        if (file2 != 0) {
            /*Direccion*/
            fileUpload = $("#archiveAddress").get(0);
            files = fileUpload.files;
            extension = files[0].name.split('.').pop();
            nameArchiveDireccion = await UploadFile(files[0], "archiveAddress", extension);
        }
    }

    await RegistroCliente();
}

async function UploadFile(file, type, extension, ) {
    let result;
    var data = new FormData();
    data.append("data", file);
    data.append("archivo", type);
    data.append("extension", extension);

    try {
        result = await $.ajax({
            url: "FileUpload.ashx",
            type: 'POST',
            data: data,
            contentType: false,
            processData: false,
        });

        return result.fileNameR;
    } catch (error) {
        console.error(error);
    }

    $.ajax({
        url: "FileUpload.ashx",
        type: "POST",
        data: data,
        contentType: false,
        processData: false,
        success: function (result) {
            return result.fileNameR;
        },
        error: function (err) {
            alert(err.statusText)
        }
    });
}

function RegistroCliente() {
    var day = moment().format("DD/MM/YYYY");
    var paquete = ($("#ddlTC").val() == "01") ? "01" : ($("#ddlTC").val() == "03") ? "06" : ($("#ddlTC").val() == "11") ? "29" : "05";

    var tipoDoc = $("#ComboTipoDocumento").val();
    const estaDeshabilitado = document.getElementById("txtNombre").disabled;
    let valorAprobReg = 0;
    if (tipoDoc === "01" && !estaDeshabilitado === false) { // DNI y campo habilitado
        valorAprobReg = 0; 
    } else if (
        (tipoDoc === "01" && estaDeshabilitado) || // DNI y campo deshabilitado
        tipoDoc === "02" || // CE
        tipoDoc === "03"    // PASS
    ) {
        valorAprobReg = 1;
    }

    var obj = JSON.stringify({
        numeroDocUd: $("#txtNumDocumento").val(), usuarioUd: $("#txtUl").val(), claveUd: $("#password").val(), paisTienda: $("#cboPaisTienda").val(),
        nombresUd: $("#txtNombre").val(), apellidoPatUd: $("#txtApPaterno").val(), apellidoMatUd: $("#txtApMaterno").val(),
        fechaNacUd: $("#datepicker").val(), sexoUd: $("#ComboSexo option:selected").text(), tipoDocUd: $("#ComboTipoDocumento option:selected").text(),
        correoUd: $("#TxtCorreo").val(), telefonoUd: $("#TxtTelefono").val(), celularUd: $("#TxtCelular").val(), paisUd: $("#cboPais").val(),
        departamentoUd: $("#cboDepartamento").val(), provinciaUd: $("#cboProvincia").val(), distritoUd: $("#cboDistrito").val(),
        direccionUd: $("#txtDireccion").val(), referenciaUd: $("#TxtReferencia").val(), detraccionUd: $("#TxtNumCuenDetracciones").val(),
        rucUd: $("#TxtRUC").val(), bancoUd: $("#TxtBanco").val(), depositoUd: $("#TxtNumCuenDeposito").val(), interbancariaUd: $("#TxtNumCuenInterbancaria").val(),
        patrocinadorUd: $("#txtPatrocinador").val(), uplineUd: $("#CboUpLine").val(), establecimientoUd: $("#cboTipoEstablecimiento").val(),
        imagenUd: nameImageProfile, fecharegistro: day, paqueteUd: paquete, cdrPremioUd: $("#cboPremio").val(), CodigoPostalUd: $("#txtCodigoPostal").val(),
        archivoDNIUd: nameArchiveDNI, archivoDireccionUd: nameArchiveDireccion, Ubigeo: $("#txtUbigeo").val(), aprobReg: valorAprobReg
    });

    $.ajax({
        type: "POST",
        url: "PreRegistroSocio.aspx/PreRegistro",
        data: obj,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (response) {
            if (response.d && response.d.includes("incorrecto")) {
                SError(response.d); // Error por patrocinador inválido
            } else {
                alertme(response.d); // Mensaje de bienvenida personalizado
            }
        }
    });
}

function toDate(dateStr) {
    var parts = dateStr.split("/")
    return new Date(parts[2], parts[1] - 1, parts[0])
}

//ALERTAS

function alertOk() {
    Swal.fire({
        title: '¡Perfecto!',
        text: 'Se ha validado el DNI correctamente',
        icon: "success"
    }).then(function () {
    });
}

function alertme(mensaje) {
    Swal.fire({
        html: mensaje,
        //text: 'Se ha realizado el registro con éxito',
        icon: 'success',
    }).then(function () {
        window.location = "PreRegistroSocio.aspx";
    });
}

function FaltaUsuario() {
    Swal.fire({
        title: 'Ooops...!',
        text: 'No registró el campo Usuario',
        icon: 'error',
    });
}

function FaltaPatrocinador() {
    Swal.fire({
        title: 'Ooops...!',
        text: 'Su sesión ha experiado, por favor vuelva a loguearse',
        icon: 'error',
    });
}

function FaltaClave() {
    Swal.fire({
        title: 'Ooops...!',
        text: 'No registró el campo Contraseña',
        icon: 'error',
    });
}
function FaltaClave2() {
    Swal.fire({
        title: 'Ooops...!',
        text: 'Debe confirmar su contraseña',
        icon: 'error',
    });
}
function FaltaUpline() {
    Swal.fire({
        title: 'Ooops...!',
        text: 'Debe seleccionar el Upline',
        icon: 'error',
    });
}
function FaltaPackete() {
    Swal.fire({
        title: 'Ooops...!',
        text: 'No seleccionó el campo Packete',
        icon: 'error',
    });
}
function FaltaPaquete() {
    Swal.fire({
        title: 'Ooops...!',
        text: 'No seleccionó el paquete del cliente',
        icon: 'error',
    });
}
function FaltaNombre() {
    Swal.fire({
        title: 'Ooops...!',
        text: 'No registró el campo Nombres',
        icon: 'error',
    });
}
function FaltaApellido() {
    Swal.fire({
        title: 'No registró un Apellido!',
        text: 'Debe colocar el primer apellido',
        icon: 'error',
    });
}
function FaltaTipoDoc() {
    Swal.fire({
        title: 'Ooops...!',
        text: 'No definió el Tipo de Documento',
        icon: 'error',
    });
}
function ErrorDocumento() {
    Swal.fire({
        title: 'Ooops...!',
        text: 'Error en el Documento de Identidad',
        icon: 'error',
    });
}
function FaltaDocumento() {
    Swal.fire({
        title: 'Ooops...!',
        text: 'No registró el Número de Documento',
        icon: 'error',
    });
}
function FaltaFechaNac() {
    Swal.fire({
        title: 'Ooops...!',
        text: 'Fecha de Nacimiento Incorrecta',
        icon: 'error',
    });
}
function FaltaSexo() {
    Swal.fire({
        title: 'Ooops...!',
        text: 'No definió el Sexo',
        icon: 'error',
    });
}
function FaltaCorreo() {
    Swal.fire({
        title: 'Ooops...!',
        text: 'El formato del correo es inválido',
        icon: 'error',
    });
}
function FaltaPais() {
    Swal.fire({
        title: 'Ooops...!',
        text: 'No definió el País',
        icon: 'error',
    });
}
function FaltaPaisTienda() {
    Swal.fire({
        title: 'Ooops...!',
        text: 'No definió el País tienda',
        icon: 'error',
    });
}
function FaltaDepartamento() {
    Swal.fire({
        title: 'Ooops...!',
        text: 'No definió el Departamento',
        icon: 'error',
    });
}
function FaltaProvincia() {
    Swal.fire({
        title: 'Ooops...!',
        text: 'No definió la Provincia',
        icon: 'error',
    });
}
function FaltaDistrito() {
    Swal.fire({
        title: 'Ooops...!',
        text: 'No definió el Distrito',
        icon: 'error',
    });
}
function FaltaDireccion() {
    Swal.fire({
        title: 'Ooops...!',
        text: 'No registró la Dirección',
        icon: 'error',
    });
}
function FaltaCDR() {
    Swal.fire({
        title: 'Ooops...!',
        text: 'No seleccionó el CDR Premio',
        icon: 'error',
    });
}
function SError(mssg) {
    Swal.fire({
        title: 'Ooops...!',
        text: mssg,
        icon: 'error',
    });
}