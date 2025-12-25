//CARGAR COMBOS SOCIOS RED
$.ajax({
    type: "POST",
    url: "SociosRed.aspx/GetPais",
    data: "{}",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    async: false,
    success: function (result) {
        $("#cboPais").empty();
        $("#cboPais").append("<option value='0'>--Select--</option>");
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
    url: "SociosRed.aspx/GetPais",
    data: "{}",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    async: false,
    success: function (result) {
        $("#cboPaisTienda").empty();
        $("#cboPaisTienda").append("<option value='0'>--Select--</option>");
        $.each(result.d, function (key, value) {
            $("#cboPaisTienda").append($("<option></option>").val(value.Codigo).html(value.Nombre));
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
        url: "SociosRed.aspx/GetDepartamentosByPais",
        data: params,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            $("#cboDepartamento").empty();
            $("#cboDepartamento").append("<option value='0'>--Select--</option>");
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
        url: "SociosRed.aspx/GetProvinciaByDepartamento",
        data: params,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            $("#cboProvincia").empty();
            $("#cboProvincia").append("<option value='0'>--Select--</option>");
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
});

$.ajax({
    type: "POST",
    url: "SociosRed.aspx/GetPackete",
    data: "{}",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    async: false,
    success: function (result) {
        $("#cboPaquete").empty();
        $("#cboPaquete").append("<option value='0'>--Select--</option>");
        $.each(result.d, function (key, value) {
            $("#cboPaquete").append($("<option></option>").val(value.Codigo).html(value._Packete));
        });
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert(textStatus + ": " + XMLHttpRequest.responseText);
    }
});

$(function () {
    $("[id$=txtPatrocinador]").autocomplete({
        source: function (request, responce) {
            $.ajax({
                url: "Autocompletado.asmx/AutcompletePatro",
                method: "post",
                CORS: true,
                contentType: "application/json;charset=utf-8",
                data: "{ 'palabra': '" + request.term + "'}",
                dataType: 'json',
                success: function (data) {
                    var lista = [];
                    var obj5 = data.d;
                    for (var i = 0; i < obj5.length; i += 2) {
                        lista.push(obj5[i]);
                    }
                    responce(lista);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log("In The ERROR");
                    console.log(XMLHttpRequest);
                    console.log(textStatus);
                    console.log(errorThrown);
                }
            });
        }
    });
});

$(function () {
    $("[id$=FiltroNombres]").autocomplete({
        source: function (request, responce) {
            $.ajax({
                url: "Autocompletado.asmx/AutcompletePatro",
                method: "post",
                CORS: true,
                contentType: "application/json;charset=utf-8",
                data: "{ 'palabra': '" + request.term + "'}",
                dataType: 'json',
                success: function (data) {
                    var lista = [];
                    var obj5 = data.d;
                    for (var i = 0; i < obj5.length; i += 2) {
                        lista.push(obj5[i]);
                    }
                    responce(lista);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log("In The ERROR");
                    console.log(XMLHttpRequest);
                    console.log(textStatus);
                    console.log(errorThrown);
                }
            });
        }
    });
});

var tabla, data, dropdown, dniPatrocinador, filtroaplicado;
filtroaplicado = 0;

function sendDataAjax() {
    $.ajax({
        type: "POST",
        url: "AprobacionRegistros.aspx/ListarCliente",
        data: {},
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, throwError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (data) {
            console.log(data.d);
            addRowDT(data.d);
        }
    });
}


tabla = $("#tbl_Socio").dataTable({
    aoColumnDefs: [
        { aTargets: [2, 5, 6, 7], bVisible: false }
    ]
});

function addRowDT(obj) {
    tabla.fnClearTable();
    for (var i = 0; i < obj.length; i++) {
        tabla.fnAddData([
            obj[i].nombre, // [0]
            (obj[i].apellidoPat + " " + obj[i].apellidoMat), // [1]
            obj[i].apodo, // [2]
            obj[i].tipoDoc, // [3]
            obj[i].numeroDoc, // [4]
            obj[i].tipoCliente, // [5]
            obj[i].patrocinador, // [6]
            obj[i].upline, // [7]
            obj[i].celular, // [8]
            obj[i].correo, // [9]
            obj[i].pais, // [10]
            '<button id="Actualizar" value="Actualizar" title="Actualizar" class="btn btn-primary btn-update" data-toggle="modal" data-target="#exampleModal"><i class="far fa-edit"></i></button>',
            '<button value="Aprobar" title="Aprobar" class="btn btn-success btn-aprobar"><i class="fas fa-check"></i></button>',
            obj[i].direccion, // [13]
            obj[i].idCliente, // [14]
            obj[i].usuario, // [15]
            obj[i].clave, // [16]
            obj[i].apellidoPat, // [17]
            obj[i].apellidoMat, // [18]
            obj[i].fechaNac, // [19]
            obj[i].sexo, // [20]
            obj[i].telefono, // [21]
            obj[i].iddepartamento, // [22]
            obj[i].idprovincia, // [23]
            obj[i].idditrito, // [24]
            obj[i].referencia, // [25]
            obj[i].nroCtaDetraccion, // [26]
            obj[i].ruc, // [27]
            obj[i].nombreBanco, // [28]
            obj[i].nroCtaDeposito, // [29]
            obj[i].nroCtaInterbancaria, // [30]
            obj[i].idpais, // [31]
            obj[i].idtipoEstablecimiento, // [32]
            obj[i].idtipoCliente, // [33]
            obj[i].idpatrocinador, // [34]
            obj[i].idupline, // [35]
            obj[i].imagen, // [36]
            obj[i].IdPeruShop, // [37]
            obj[i].Packete, // [38]
            obj[i].IdPackete, // [39]
            obj[i].Establecimiento, // [40]
            obj[i].paisTienda, // [41]
            obj[i].Ubigeo, // [42]
            obj[i].archivo_DNI, // [42]
            obj[i].archivo_Direccion, // [43]
        ]);
    }
}

// ACTUALIZAR CLIENTE
$(document).on('click', '.btn-update', function (e) {
    $('.file-upload').file_upload();
    $('.file-upload-text').text("Ingrese la imagen ...");
    $('.imagen').change(function () {
        filePreview(this);
    });
    e.preventDefault();
    var row = $(this).parent().parent()[0];
    data = tabla.fnGetData(row);
    console.log(data);
    fillModalData();
    comboTiendaExcepciones(data[33])

});

// APROBAR CLIENTE
$(document).on('click', '.btn-aprobar', function (e) {
    e.preventDefault();
    var row = $(this).parent().parent()[0];
    data = tabla.fnGetData(row);
    let idCliente = data[14];

    Swal.fire({
        title: '¿Estás seguro?',
        text: "El cliente será habilitado para compras",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, aprobar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: "POST",
                url: "AprobacionRegistros.aspx/AprobarCliente", // WebMethod
                data: JSON.stringify({ idCliente: idCliente }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito',
                        text: response.d // devuelve el string del SP
                    }).then(function () {
                        window.location = "AprobacionRegistros.aspx";
                    });
                },
                error: function (xhr, status, error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Hubo un problema en el servidor'
                    });
                }
            });
        }
    });
});

//MOSTRAR INFORMACION EN MODAL
function fillModalData() {
    var tdoc, sexo, imagen, x, estable, packete, imgView;
    x = data[36];
    estable = data[40];
    packete = data[38];

    if (data[3] == "DNI") {
        tdoc = "1";
    } else if (data[3] == "CE") {
        tdoc = "2";
    } else if (data[3] == "PASS") {
        tdoc = "3";
    }

    if (data[20] == "MASCULINO") {
        sexo = "1";
    } else if (data[20] == "FEMENINO") {
        sexo = "2";
    } else {
        sexo = "3";
    }

    if (x.trim() == "") {
        imagen = "";
    } else {
        imagen = data[36];
    }

    if (estable == "") {
        estable = "0"
    } else {
        estable = data[40];
    }

    $("#txtNombres").val(data[0]);
    $("#txtApPat").val(data[17]);
    $("#txtApMat").val(data[18]);
    $("#txtApodo").val(data[2]);
    $("#cboTipoDoc").val(tdoc);
    $("#txtNroDoc").val(data[4]);
    $("#cboTipoCliente").val(data[33]);
    $("#txtPatrocinador").val(data[6]);
    $("#txtUpLine").val(data[35]);
    $("#txtCelular").val(data[8]);
    $("#txtCorreo").val(data[9]);
    $("#txtxDireccion").val(data[13]);
    $("#txtUsuario").val(data[15]);
    $("#txtClave").val(data[16]);
    $('.daterange').daterangepicker({
        singleDatePicker: true,
        startDate: data[19],
        showDropdowns: true,
        locale: { format: "DD/MM/YYYY" },
        autoApply: false
    });
    $("#txtFecNac").val(data[19]);
    $("#cboSexo").val(sexo);
    $("#txtTelefono").val(data[21]);
    $("#cboPais").change(function () {
        CargarDepartamentos();
    });
    CargarPaises();
    //aqui recibes los datos de edicion
    $("#cboPais").val(data[31]);
    $("#cboPaisTienda").val(data[41]);
    CargarDepartamentos();
    $("#cboDepartamento").val(data[22]);
    CargarProvincia();
    $("#cboProvincia").val(data[23]);
    CargarDistrito();
    $("#cboDistrito").val(data[24]);
    $("#txtReferencia").val(data[25]);
    $("#txtCtaDetraccion").val(data[26]);
    $("#txtRuc").val(data[27]);
    $("#txtBanco").val(data[28]);
    $("#txtCtaDeposito").val(data[29]);
    $("#txtCtaInterbancaria").val(data[30]);
    $("#cboTipoEstablecimiento").val("");
    if (imagen == "") {
        $('#imagePreview').html("<img src='img/Preview-icon1.png' style='height:250px' />");
    } else {
        $('#imagePreview').html("<img src='" + imagen + "' style='height:250px' />");
    }
    $("#txtPeruShop").val(data[37]);
    $("#cboPaquete").val(packete);
    $("#txtUbigeo").val(data[42]);

    if (data[43] != "") {
        $("#urlDNI").prop('disabled', false);
        $("#urlDNI").text(data[43]);
        document.getElementById('urlDNI').href = "archive_dni/" + data[43];
    }

    if (data[44] != "") {
        $("#urlDireccion").prop('disabled', false);
        $("#urlDireccion").text(data[44]);
        document.getElementById('urlDireccion').href = "archive_address/" + data[44];
    }
}


//PARA CARGA DE COMBOS UPDATE
function CargarPaises() {

    $.ajax({
        type: "POST",
        url: "AprobacionRegistros.aspx/GetPais",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {

            $("#cboPais").empty();
            $("#cboPais").append("<option value='0'>--Select--</option>");
            $.each(result.d, function (key, value) {
                $("#cboPais").append($("<option></option>").val(value.Codigo).html(value.Nombre));
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ": " + XMLHttpRequest.responseText);
        }
    });

}

function CargarDepartamentos() {
    var params = new Object();
    params.pais = $("#cboPais").val();
    params = JSON.stringify(params);

    $.ajax({
        type: "POST",
        url: "AprobacionRegistros.aspx/GetDepartamentosByPais",
        data: params,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            $("#cboDepartamento").empty();
            $("#cboDepartamento").append("<option value='0'>--Select--</option>");
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
        url: "AprobacionRegistros.aspx/GetProvinciaByDepartamento",
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
        url: "AprobacionRegistros.aspx/GetDistritoByProvincia",
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

function comboTiendaExcepciones(combo) {

    if (combo == "01" || combo == "02" || combo == "03" ||
        combo == "04" || combo == "05" || combo == "10" || combo == "11") {

        var txt1 = document.getElementById("txtApodo");
        var txt2 = document.getElementById("txtPeruShop");
        txt1.setAttribute("readOnly", "true");
        txt2.setAttribute("readOnly", "true");
        $('#cboTipoEstablecimiento').attr("disabled", false);
        $('#cboPaquete').attr("disabled", false);
        $("#txtApodo").val("");
        $("#txtPeruShop").val("");

    } else {
        document.getElementById("txtApodo").readOnly = false;
        document.getElementById("txtPeruShop").readOnly = false;
        $("#cboTipoEstablecimiento").val("0");
        $('#cboTipoEstablecimiento').attr("disabled", true);
        $("#cboPaquete").val("22");
        $('#cboPaquete').attr("disabled", true);
        $("#txtUpLine").val("");
        $("#txtPatrocinador").val("");
    }
}

$("#btnActualizar").click(function (e) {
    var hoy = new Date();
    var fecha = $("#txtFecNac").val();
    var fechaNac = toDate(fecha);
    var x = data[36];
    fechaNac.setFullYear(fechaNac.getFullYear() + 18);
    e.preventDefault();
    if (fechaNac >= hoy) {
        FaltaFechaNac();
    } else {
        ValidarDatosClienteUpdate(data[14]);
    }
});

//CONVERTIR STRING EN DATE
function toDate(dateStr) {
    var parts = dateStr.split("/")
    return new Date(parts[2], parts[1] - 1, parts[0])
}

function ValidarDatosClienteUpdate(idCliente) {
    var patrocinador = $("#txtPatrocinador").val();
    var correo = $("#txtCorreo").val();
    var doc = $("#txtNroDoc").val();
    var usu = $("#txtUsuario").val();
    var valida = document.getElementById('fileUpload').files.length;
    var obj = JSON.stringify({ correoS: correo, documento: doc, usuario: usu, idCliente: idCliente });
    $.ajax({
        type: "POST",
        url: "SociosRed.aspx/ValidarDatosUpdate",
        data: obj,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, throwError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (response) {
            console.log(response);
            if (response.d == "0") {
                if (valida == 0) {
                    if (patrocinador == "") {
                        dniPatrocinador = "";
                        updateDataAjax();
                    } else {
                        ValidarPatrocinadorActualizar();
                    }
                } else {
                    DeleteFile(x);
                    UpdateFile();
                }
            } else {
                Swal.fire({
                    title: 'Ooops...!',
                    text: response.d,
                    type: "error"
                });
            }
        }
    });
}

function ValidarPatrocinadorActualizar() {
    var params = new Object();
    params.patro = $("#txtPatrocinador").val();
    params = JSON.stringify(params);

    $.ajax({
        type: "POST",
        url: "SociosRed.aspx/VALIDARPATROCINADOR",
        data: params,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (ok) {
            var funciona = ok.d;
            console.log(funciona);
            if (funciona != "NO") {
                dniPatrocinador = funciona;
                updateDataAjax();
            } else {
                PatrocinadorIncorrecto();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ": " + XMLHttpRequest.responseText);
        }
    });
}

function updateDataAjax() {

    var id, imagenCliente, idPacke;
    var day = moment().format("DD/MM/YYYY");
    id = data[14];
    idPacke = data[39];
    var valida = document.getElementById('fileUpload').files.length;
    if (valida == 0) {
        imagenCliente = data[36];
    } else {
        imagenCliente = "uploads/" + document.getElementById('fileUpload').files[0].name;
    }

    var obj = JSON.stringify({
        idUd: id, numeroDocUd: $("#txtNroDoc").val(), usuarioUd: $("#txtUsuario").val(), claveUd: $("#txtClave").val(),
        nombresUd: $("#txtNombres").val(), apellidoPatUd: $("#txtApPat").val(), apellidoMatUd: $("#txtApMat").val(),
        apodoUd: $("#txtApodo").val(), fechaNacUd: $("#txtFecNac").val(), sexoUd: $("#cboSexo option:selected").text(), tipoDocUd: $("#cboTipoDoc option:selected").text(), correoUd: $("#txtCorreo").val(),
        telefonoUd: $("#txtTelefono").val(), celularUd: $("#txtCelular").val(), paisUd: $("#cboPais").val(), departamentoUd: $("#cboDepartamento").val(),
        provinciaUd: $("#cboProvincia").val(), distritoUd: $("#cboDistrito").val(), direccionUd: $("#txtxDireccion").val(),
        referenciaUd: $("#txtReferencia").val(), detraccionUd: $("#txtCtaDetraccion").val(), rucUd: $("#txtRuc").val(),
        bancoUd: $("#txtBanco").val(), depositoUd: $("#txtCtaDeposito").val(), interbancariaUd: $("#txtCtaInterbancaria").val(),
        tipoClienteUd: $("#cboTipoCliente").val(), patrocinadorUd: dniPatrocinador, uplineUd: $("#txtUpLine").val(),
        establecimientoUd: $("#cboTipoEstablecimiento").val(), imagenUd: imagenCliente, idPeruShop: $("#txtPeruShop").val(),
        idPackete: $("#cboPaquete").val(), idDescuento: idPacke, fechaPackete: day, paisTienda: $("#cboPaisTienda").val(),
        ubigeo: $("#txtUbigeo").val()
    });

    $.ajax({
        type: "POST",
        url: "SociosRed.aspx/ActualizarCliente",
        data: obj,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, throwError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (response) {
            console.log(response);
            Swal.fire({
                title: 'Perfecto!',
                text: 'Cliente Actualizado',
                type: "success"
            }).then(function () {
                window.location = "SociosRed.aspx";
            });
        }
    });
}

function FaltaFechaNac() {
    Swal.fire({
        title: 'Ooops...!',
        text: 'Fecha de Nacimiento Incorrecta',
        type: "error"
    });
}

// Llamar la funcon de ajax al cargar el documento
if (filtroaplicado == 0) {
    sendDataAjax();
} else { filtroaplicado = 0; }