var tabla, data, estados, tipoPag, tabla2, data2, tabla3, data3, contador, listaPro, contador2, listaPro2, dniActualiza, data4, okRegistro, okActualiza, listaPSRegistro, PSCDR;

tabla2 = $('#tbl_registro').DataTable({
    //"bPaginate": false,
    //"bSort": false,
    processing: true,
    pageLength: 5, // Solo 5 por página
    lengthMenu: [5, 10, 25, 50], // Opciones si querés que el usuario pueda cambiar
    language: {
        lengthMenu: "Mostrar _MENU_ registros",
        zeroRecords: "No se encontraron resultados",
        info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
        infoEmpty: "Mostrando 0 a 0 de 0 registros",
        infoFiltered: "(filtrado de _MAX_ registros totales)",
        paginate: {
            first: "Primero",
            last: "Último",
            next: "Siguiente",
            previous: "Anterior"
        },
        loadingRecords: "Cargando...",
        processing: "Procesando...",
        search: "Buscar:"
    }
});

// Selecciona el div por su id
var divHijo = document.getElementById("tbl_registro_paginate");

// Verifica si existe y obtiene su elemento padre
if (divHijo && divHijo.parentElement) {
    var padre = divHijo.parentElement;

    // Remueve todas las clases existentes y asigna solo 'col-sm-12'
    padre.className = "col-sm-12";
}

$("#btnActualizarGlobal").click(function (e) {
    e.preventDefault();
    listaProductos();
});

function listaProductos() {
    $.ajax({
        type: "POST",
        url: "GestionarStock.aspx/ListarProductosRegistro",
        data: JSON.stringify({ CDR: "256445698" }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        success: function (result) {
            $("#cboProducto").empty();
            $.each(result.d, function (key, value) {
                $("#cboProducto").append($("<option></option>").val(value.IDProductoXPais).html(value.NombreProducto));
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ": " + XMLHttpRequest.responseText);
        }
    });
}

tabla3 = $("#tbl_actualizar").DataTable({
    processing: true,
    pageLength: 5, // Solo 5 por página
    lengthMenu: [5, 10, 25, 50], // Opciones si querés que el usuario pueda cambiar
    language: {
        lengthMenu: "Mostrar _MENU_ registros",
        zeroRecords: "No se encontraron resultados",
        info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
        infoEmpty: "Mostrando 0 a 0 de 0 registros",
        infoFiltered: "(filtrado de _MAX_ registros totales)",
        paginate: {
            first: "Primero",
            last: "Último",
            next: "Siguiente",
            previous: "Anterior"
        },
        loadingRecords: "Cargando...",
        processing: "Procesando...",
        search: "Buscar:"
    }
});

// Selecciona el div por su id
var divHijoTblActualizar = document.getElementById("tbl_actualizar_paginate");

// Verifica si existe y obtiene su elemento padre
if (divHijoTblActualizar && divHijoTblActualizar.parentElement) {
    var padre = divHijoTblActualizar.parentElement;

    // Remueve todas las clases existentes y asigna solo 'col-sm-12'
    padre.className = "col-sm-12";
}

$.ajax({
    type: "POST",
    url: "GestionarStock.aspx/ListadoCDRCombo",
    data: "{}",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    async: false,
    success: function (result) {
        $("#cboCDR").empty();
        $("#cboCDR").append("<option value='0'>--Select--</option>");
        $.each(result.d, function (key, value) {
            $("#cboCDR").append($("<option></option>").val(value.DNICDR).html(value.CDRPS));
        });
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert(textStatus + ": " + XMLHttpRequest.responseText);
    }
});

function sendDataAjax() {
    $.ajax({
        type: "POST",
        url: "GestionarStock.aspx/ListarCDRStock",
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

function sendDataAjaxRegistrar(combo) {
    var obj = JSON.stringify({ CDR: combo });

    // Mostrar el loader en el modal
    $('#modalLoader').show();

    $.ajax({
        type: "POST",
        url: "GestionarStock.aspx/ListarProductosRegistro",
        data: obj,
        contentType: 'application/json; charset=utf-8',
        async: true,
        error: function (xhr, ajaxOptions, throwError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            // Ocultar el loader en caso de error
            $('#modalLoader').hide();
        },
        success: function (data2) {
            console.log(data2.d);
            addRowDTRegistrar(data2.d);
            listaPro = data2.d;

            // Ocultar el loader después de que los datos se carguen
            $('#modalLoader').hide();
        }
    });
}

function sendDataAjaxActualizar(SCDR) {

    var obj = JSON.stringify({ dniCDR: SCDR });
    $.ajax({
        type: "POST",
        url: "GestionarStock.aspx/ListarProductosxStock",
        data: obj,
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, throwError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (data3) {
            console.log(data3.d);
            addRowDTActualizar(data3.d);
            listaPro2 = data3.d;
        }
    });
}

function addRowDT(obj) {
    tabla = $("#tbl_cdr").DataTable({
        processing: true,
        language: {
            lengthMenu: "Mostrar _MENU_ registros",
            zeroRecords: "No se encontraron resultados",
            info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
            infoEmpty: "Mostrando 0 a 0 de 0 registros",
            infoFiltered: "(filtrado de _MAX_ registros totales)",
            paginate: {
                first: "Primero",
                last: "Último",
                next: "Siguiente",
                previous: "Anterior"
            },
            loadingRecords: "Cargando...",
            processing: "Procesando...",
            search: "Buscar:"
        }
    });

    // Limpia la tabla
    tabla.clear();

    // Prepara las filas en formato de arreglo de arreglos
    var filas = obj.map(function (item) {
        return [
            item.DNICDR,
            item.Apodo,
            item.CDRPS,
            '<button value="Actualizar" title="Actualizar" type="button" class="btn btn-primary btn-deta" data-toggle="modal" data-target="#exampleModal"><i class="fas fa-search"></i></button>'
        ];
    });

    // Agrega y dibuja
    tabla.rows.add(filas).draw();
}

function showTableLoader() {
    //tabla2.fnClearTable(); // Limpia todo
    tabla2.clear(); // Limpia la tabla
    $('#tbl_registro tbody').html(`
        <tr>
            <td colspan="8" class="text-center">
                <div class="spinner-border text-success" role="status"></div>
                <span class="ms-2">Cargando productos...</span>
            </td>
        </tr>
    `);
}

//function addRowDTRegistrar(obj) {
//    contador = 0;

//    //tabla2.fnClearTable(); // Limpia la tabla completamente y el loader también
//    tabla2.clear();

//    for (var i = 0; i < obj.length; i++) {
//        contador++;

//        // Crear un ID único para el botón de cada fila
//        var buttonId = 'btnImage' + i;
//        var imagenProducto = obj[i].Imagen;

//        // Botón que revela la imagen al hacer clic
//        var buttonHTML = `<button id="${buttonId}" class="btn btn-primary">Ver Imagen</button>`;
//        var imageHTML = `<div id="imageContainer${i}" style="height: 80px; display: none; background-color: #f0f0f0;"></div>`; // Contenedor vacío

//        // Agregar la fila a la tabla
//        tabla2.fnAddData([
//            obj[i].Fila,
//            obj[i].NombreProducto,
//            buttonHTML + imageHTML, // Mostrar el botón y el contenedor vacío
//            obj[i].IDPS,
//            '<input type="text" id="cant' + i + '" class="form-control daterange" style="background-color: lightgreen; width:90px" value="0">',
//            '<input id="Check' + i + '" type="checkbox" class="form-check-input">',
//            '0',
//            '0',
//            obj[i].IDProducto
//        ]);

//        // Agregar el evento de clic al botón para mostrar la imagen
//        $('#' + buttonId).click(function (e) {
//            e.preventDefault();  // Evitar cualquier acción predeterminada del botón (si es necesario)

//            var index = $(this).attr('id').replace('btnImage', ''); // Obtener el índice de la imagen

//            var imageContainer = $('#imageContainer' + index);

//            // Mostrar la imagen si no está cargada aún
//            if (!imageContainer.find('img').length) {
//                var imagenProducto = obj[index].Imagen;
//                var imageHTML = `<img src="products/${imagenProducto}" style="height: 80px; cursor: pointer;">`; // Cargar la imagen
//                imageContainer.html(imageHTML);  // Insertar la imagen en el contenedor
//            }

//            // Alternar visibilidad de la imagen
//            imageContainer.toggle();

//            // Agregar un evento para que al hacer clic en la imagen, esta se oculte
//            imageContainer.find('img').click(function () {
//                imageContainer.toggle(); // Ocultar la imagen al hacer clic en ella
//            });
//        });
//    }
//}
var dataProductos = []
function addRowDTRegistrar(obj) {
    contador = 0;
    dataProductos = obj; // guarda globalmente

    tabla2.clear();

    var rows = [];
    for (var i = 0; i < obj.length; i++) {
        contador++;

        var buttonId = 'btnImage' + i;

        var buttonHTML = `<button type="button" id="${buttonId}" class="btn btn-primary">Ver Imagen</button>`;
        var imageHTML = `<div id="imageContainer${i}" style="height: 80px; display: none; background-color: #f0f0f0;"></div>`;

        rows.push([
            obj[i].Fila,
            obj[i].NombreProducto,
            buttonHTML + imageHTML,
            obj[i].IDPS,
            '<input type="text" id="cant' + i + '" class="form-control daterange" style="background-color: lightgreen; width:90px" value="0">',
            '<input id="Check' + i + '" type="checkbox" class="form-check-input">',
            '0',
            '0'
        ]);
    }

    tabla2.rows.add(rows).draw(false);
}

// Solo se registra una vez, al cargar el DOM
$(document).ready(function () {
    $('#tbl_registro').on('click', 'button[id^="btnImage"]', function (e) {
        e.preventDefault();

        var index = $(this).attr('id').replace('btnImage', '');
        var button = $(this);
        var imageContainer = $('#imageContainer' + index);

        // Cargar la imagen si aún no está
        if (!imageContainer.find('img').length) {
            var imagenProducto = dataProductos[index].Imagen;
            var imageHTML = `<img src="products/${imagenProducto}" style="height: 80px; cursor: pointer;" onerror="this.parentNode.innerHTML='<span>Sin imagen disponible</span>';">`;
            imageContainer.html(imageHTML);
        }

        imageContainer.show();    // Mostrar imagen
        button.hide();            // Ocultar botón

        // Delegar el clic en la imagen para ocultar imagen y mostrar botón
        imageContainer.find('img').off('click').on('click', function () {
            imageContainer.hide(); // Oculta la imagen
            button.show();         // Vuelve a mostrar el botón
        });
    });
});

var dataProductosActualizar = []; // para tener acceso desde el evento

function addRowDTActualizar(obj) {
    contador2 = 0;
    dataProductosActualizar = obj; // guardamos la data para acceder por índice luego

    tabla3.clear();

    var rows = [];

    for (var i = 0; i < obj.length; i++) {
        contador2++;

        var check = obj[i].ControlStock === true ? 'checked' : '';
        var imagenProducto = obj[i].Imagen;
        var cant = obj[i].Cantidad;

        var buttonId = 'btnImageActualizar' + i;
        var buttonHTML = `<button type="button" id="${buttonId}" class="btn btn-primary">Ver Imagen</button>`;
        var imageHTML = `<div id="imageContainerActualizar${i}" style="height: 80px; display: none; background-color: #f0f0f0;"></div>`;

        rows.push([
            obj[i].Fila,
            obj[i].NombreProducto,
            buttonHTML + imageHTML,
            obj[i].IDPS,
            `<input type="text" id="cantA${i}" class="form-control daterange" style="background-color: lightgreen; width:90px" value="${cant}">`,
            `<input id="CheckA${i}" type="checkbox" class="form-check-input" ${check}>`,
            obj[i].CantidadReal,
            obj[i].StockInicial,
            obj[i].IDProducto
        ]);
    }

    tabla3.rows.add(rows).draw(false);

    $('#tbActualiza tr').each(function () {
        $(this).find('td:eq(1)').css('font-size', '12px');
    });
}

$(document).ready(function () {
    $('#tbl_actualizar').on('click', 'button[id^="btnImageActualizar"]', function (e) {
        e.preventDefault();

        var index = $(this).attr('id').replace('btnImageActualizar', '');
        var button = $(this);
        var imageContainer = $('#imageContainerActualizar' + index);

        // Solo cargar imagen si no existe
        if (!imageContainer.find('img').length && !imageContainer.find('span').length) {
            var imagenProducto = dataProductosActualizar[index].Imagen;
            var imageHTML = `<img src="products/${imagenProducto}" style="height: 80px; cursor: pointer;" onerror="this.parentNode.innerHTML='<span>Sin imagen disponible</span>';">`;
            imageContainer.html(imageHTML);
        }

        imageContainer.show();
        button.hide();

        imageContainer.find('img').off('click').on('click', function () {
            imageContainer.hide();
            button.show();
        });
    });
});


sendDataAjax();

$("#btnModals").click(function (e) {
    e.preventDefault();
    var combo = $("#cboCDR").val();
    if (combo == "0")
    {
        $('#exampleModal2').modal('hide');
        SeleccionaCDR();
    }
    else {
        $('#exampleModal2').modal('show');
        $("#exampleModal2 input").val("");
        var comboCDR = $("#cboCDR option:selected").text();
        $("#txtCDR").val(comboCDR);
        sendDataAjaxRegistrar(combo);
    }
});

$(document).on('click', '.btn-deta', function (e) {
    e.preventDefault();
    $("#exampleModal input").val("");
    $("#exampleModal input[type='checkbox']").prop('checked', false).change();

    var row2 = $(this).closest('tr'); // Forma moderna y más segura de encontrar la fila
    var datax = tabla.row(row2).data(); // <- Nueva API

    $("#txtCDRActualizar").val(datax[2]);
    dniActualiza = datax[0];
    PSCDR = datax[2];
    sendDataAjaxActualizar(datax[0]);
});

function SeleccionaCDR() {

    Swal.fire({
        title: 'Ooops...!',
        text: 'Debe seleccionar un CDR',
        type: "error"
    });
}

//$("#btnRegistrar").click(function (e) {
//    e.preventDefault();

//    // Deshabilitar botón y mostrar loader
//    $("#btnRegistrar").prop("disabled", true);
//    $("#textRegistrar").hide();
//    $("#loaderRegistrar").show();

//    var myArray = []; /*'codigo', 'PS', 'imgP', 'cantidad'*/
//    for (var i = 0; i < contador; i++) {
//        var DatosArray = {};
//        var canInput = $("#cant"+i+"").val();
//        var check = document.getElementById("Check" + i + "").checked;
//        var codigo = listaPro[i].IDProducto;
//        var idPeruS = listaPro[i].IDPS;
//        var imgP = listaPro[i].Imagen;
//        var idProPais = listaPro[i].IDProductoXPais;
//        var prodPromo = listaPro[i].ProdPromo;
//        DatosArray['codigo'] = codigo;
//        DatosArray['PS'] = idPeruS;
//        DatosArray['imgP'] = imgP;
//        DatosArray['cantidad'] = canInput;
//        DatosArray['controlStock'] = check;
//        DatosArray['idProductoPais'] = idProPais;
//        DatosArray['prodPromo'] = prodPromo;
//        //DatosArray.push(codigo, idPeruS, imgP, canInput);
//        myArray.push(DatosArray);
//    }
//    registrarProductosCDR(myArray);
//});
$("#btnRegistrar").click(function (e) {
    e.preventDefault();

    // Deshabilitar botón y mostrar loader
    $("#btnRegistrar").prop("disabled", true);
    $("#textRegistrar").hide();
    $("#loaderRegistrar").show();

    var myArray = []; /*'codigo', 'PS', 'imgP', 'cantidad'*/
    for (var i = 0; i < contador; i++) {
        var DatosArray = {};
        var canInput = $("#cant" + i + "").val();

        var checkElement = document.getElementById("Check" + i);
        var check = false;
        if (checkElement) {
            check = checkElement.checked;
        }

        var codigo = listaPro[i].IDProducto;
        var idPeruS = listaPro[i].IDPS;
        var imgP = listaPro[i].Imagen;
        var idProPais = listaPro[i].IDProductoXPais;
        var prodPromo = listaPro[i].ProdPromo;
        DatosArray['codigo'] = codigo;
        DatosArray['PS'] = idPeruS;
        DatosArray['imgP'] = imgP;
        DatosArray['cantidad'] = canInput;
        DatosArray['controlStock'] = check;
        DatosArray['idProductoPais'] = idProPais;
        DatosArray['prodPromo'] = prodPromo;
        //DatosArray.push(codigo, idPeruS, imgP, canInput);
        myArray.push(DatosArray);
    }

    // ===> Antes de registrar, validamos stock
    var idCdrPS = $("#txtCDR").val(); // Asegúrate de obtener aquí el valor del IdCdrPS correctamente

    validarStockPrevio(idCdrPS).then(function (tieneStock) {
        if (tieneStock) {
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'Ya existe stock generado previamente. No puede registrar nuevos productos.',
            }).then(() => {
                resetRegistrarButton();
            });
        } else {
            Swal.fire({
                title: '¿Está seguro?',
                text: "¿Desea registrar el stock?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, registrar',
                cancelButtonText: 'Cancelar',
                reverseButtons: true
            }).then((result) => {
                if (result.value) {
                    registrarProductosCDR(myArray);
                } else {
                    resetRegistrarButton();
                }
            });
        }
    }).catch(function (error) {
        console.error('Error en validación de stock:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error validando el stock. Intente nuevamente.',
        }).then(() => {
            resetRegistrarButton();
        });
    });
});

function validarStockPrevio(idCdrPS) {
    return new Promise(function (resolve, reject) {
        var obj = JSON.stringify({ IdPerushop: idCdrPS });

        $.ajax({
            type: "POST",
            url: "GestionarStock.aspx/ValidarStockPrevio",
            data: obj,
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                //console.log(response.d);
                resolve(response.d); // true o false
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.error(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
                reject(thrownError);
            }
        });
    });
}

$("#btnActualizar").click(function (e) {
    e.preventDefault();
    var myArray2 = [];
    for (var i = 0; i < contador2; i++) {
        var control = $("#cantA" + i + "").val();
        if (typeof control != "undefined") {
            var DatosArray2 = {};
            var canInput = $("#cantA" + i + "").val();
            var check = document.getElementById("CheckA" + i + "").checked;
            var codigo = listaPro2[i].IDProducto;
            var idPeruS = listaPro2[i].IDPS;
            var imgP = listaPro2[i].Imagen;
            var idProPais = listaPro2[i].IDProductoXPais;
            DatosArray2['codigo'] = codigo;
            DatosArray2['PS'] = idPeruS;
            DatosArray2['imgP'] = imgP;
            DatosArray2['cantidad'] = canInput;
            DatosArray2['controlStock'] = check;
            DatosArray2['idProductoPais'] = idProPais;
            myArray2.push(DatosArray2);
        }
    }
    actualizarProductosCDR(myArray2);
});

$("#btnRellenarRegistro").click(function (e) {
    e.preventDefault();
    var combo = $("#cboCDR option:selected").text();
    obtenerStockPS(combo);
});

$("#btnRellenar").click(function (e) {
    e.preventDefault();
    obtenerStockPSActualizar(PSCDR);
});

function obtenerStockPS(combo) {
    var obj = JSON.stringify({ cdrPS: combo });
    $.ajax({
        type: "POST",
        url: "GestionarStock.aspx/RellenarStockPS",
        data: obj,
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, throwError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (data4) {
            console.log(data4.d);
            listaPSRegistro = data4.d;
            rellenarRegistro();
        }
    });
}

function rellenarRegistro() {
    for (var i = 0; i < contador; i++) {
        var PPS = listaPro[i].IDPS;
        var valida = false;
        var cont = 0;
        while (!valida && cont < listaPSRegistro.length) {
            if (PPS == listaPSRegistro[cont].IDPPS) { valida = true; $("#cant" + i + "").val(listaPSRegistro[cont].cantidad); }
            else { cont += 1; }
        }
        if (valida == false) { $("#cant" + i + "").val("0"); }
    }
}

function obtenerStockPSActualizar(combo) {
    var obj = JSON.stringify({ cdrPS: combo });
    $.ajax({
        type: "POST",
        url: "GestionarStock.aspx/RellenarStockPS",
        data: obj,
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, throwError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (data5) {
            console.log(data5.d);
            listaPSRegistro = data5.d;
            rellenarActualizado();
        }
    });
}

function rellenarActualizado() {
    for (var i = 0; i < contador2; i++) {
        var PPS = listaPro2[i].IDPS;
        var valida = false;
        var cont = 0;
        while (!valida && cont < listaPSRegistro.length) {
            if (PPS == listaPSRegistro[cont].IDPPS) { valida = true; $("#cantA" + i + "").val(listaPSRegistro[cont].cantidad); }
            else { cont += 1; }
        }
        if (valida == false) { $("#cantA" + i + "").val("0"); }
    }
}

function registrarProductosCDR(myArray) {
    var combocdr = $("#cboCDR").val();
    var obj = JSON.stringify({ prueba: myArray, CDR: combocdr });
    $.ajax({
        type: "POST",
        url: "GestionarStock.aspx/RegistrarStock",
        data: obj,
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, throwError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            resetRegistrarButton();
        },
        success: function (okRegistro) {
            resetRegistrarButton();
            //console.log(okRegistro.d);
            Swal.fire({
                title: 'Perfecto!',
                text: 'Stock Registrado',
                type: "success"
            }).then(function () {
                window.location = "GestionarStock.aspx";
            });
        }
    });
    
    //resetRegistrarButton();
    //Swal.fire({
    //    title: 'Perfecto!',
    //    text: 'Stock Registrado',
    //    type: "success"
    //}).then(function () {
    //    window.location = "GestionarStock.aspx";
    //});
}

function actualizarProductosCDR(myArray) {
    var combocdr = dniActualiza.trim();
    var obj = JSON.stringify({ prueba: myArray, CDR: combocdr });
    $.ajax({
        type: "POST",
        url: "GestionarStock.aspx/ActualizarStock",
        data: obj,
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, throwError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (okActualiza) {
            console.log(okActualiza.d);
            Swal.fire({
                title: 'Perfecto!',
                text: 'Stock Actualizado',
                type: "success"
            }).then(function () {
                window.location = "GestionarStock.aspx";
            });
        }
    });
}

function resetRegistrarButton() {
    $("#btnRegistrar").prop("disabled", false);
    $("#textRegistrar").show();
    $("#loaderRegistrar").hide();
}