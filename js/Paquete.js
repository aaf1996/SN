//DEFINIR VARIABLES
var tabla, aaf, data, estados, idTexto;   

$(function () {
    $("#exampleModal input").autocomplete({
        source: function (request, responce) {
            $.ajax({
                url: "Autocompletado.asmx/FiltrarNombreProductos",
                method: "post",
                CORS: true,
                contentType: "application/json;charset=utf-8",
                data: "{ 'palabra': '" + request.term + "'}",
                dataType: 'json',
                success: function (data) {
                    responce(data.d);
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

//LISTADO DE PRODUCTOS
function addRowDT(obj) {
    tabla = $("#tbl_paquetes").DataTable();
    tabla.fnClearTable();
    for (var i = 0; i < obj.length; i++) {
        var estados; // Se define 'estados' dentro del loop, como estaba.
        if (obj[i].estado == true) {
            estados = "Activo";
        } else {
            estados = "Desactivado";
        }
        
        // El array fnAddData es el que crea el array 'data' que consume fillModalData
        tabla.fnAddData([
            // 0: ID Paquete
            obj[i].idPaquete,
            // 1: Nombre Paquete
            obj[i].nombre,
            // 2: Estado (Texto: Activo/Desactivado)
            estados,
            // 3: Botón de Acción
            '<button id="Actualizar" value="Actualizar" title="Actualizar" class="btn btn-primary btn-update" data-toggle="modal" data-target="#exampleModal"><i class="far fa-edit"></i></button>',
            // 4: Observación
            obj[i].observacion,
            
            obj[i].paquetePais, // 5: ID Paquete Perú
            obj[i].idPaquetePaisBolivia, // 6: ID Paquete Bolivia
            obj[i].idPaquetePaisEcuador, // 7: ID Paquete Ecuador
            obj[i].idPaquetePaisPanama, // 8: ID Paquete Panamá (Corregido, estaba mal mapeado antes)
            obj[i].idPaquetePaisCR, // 9: ID Paquete Costa Rica
            obj[i].idPaquetePaisArgentina, // 10: ID Paquete Argentina
            obj[i].idPaquetePaisChile, // 11: ID Paquete Chile
            
            obj[i].estado, // 12: Estado Perú (bool)
            obj[i].estadoBolivia, // 13: Estado Bolivia (bool)
            obj[i].estadoEcuador, // 14: Estado Ecuador (bool)
            obj[i].estadoPanama, // 15: Estado Panamá (bool)
            obj[i].estadoCR, // 16: Estado Costa Rica (bool)
            obj[i].estadoArgentina, // 17: Estado Argentina (bool)
            obj[i].estadoChile, // 18: Estado Chile (bool)
            
            // =========================================================
            // ID 
            // =========================================================
            
            obj[i].idProductoPais1, // 19
            obj[i].idProductoPais2, // 20
            obj[i].idProductoPais3, // 21
            obj[i].idProductoPais4, // 22
            obj[i].idProductoPais5, // 23
            obj[i].idProductoPais6, // 🌟 24
            obj[i].idProductoPais7, // 🌟 25
            obj[i].idProductoPais8, // 🌟 26
            obj[i].idProductoPais9, // 🌟 27
            obj[i].idProductoPais10, // 🌟 28
            
            obj[i].idProductoPais1Bolivia, // 29
            obj[i].idProductoPais2Bolivia, // 30
            obj[i].idProductoPais3Bolivia, // 31
            obj[i].idProductoPais4Bolivia, // 32
            obj[i].idProductoPais5Bolivia, // 33
            obj[i].idProductoPais6Bolivia, // 🌟 34
            obj[i].idProductoPais7Bolivia, // 🌟 35
            obj[i].idProductoPais8Bolivia, // 🌟 36
            obj[i].idProductoPais9Bolivia, // 🌟 37
            obj[i].idProductoPais10Bolivia, // 🌟 38
            
            obj[i].idProductoPais1Ecuador, // 39
            obj[i].idProductoPais2Ecuador, // 40
            obj[i].idProductoPais3Ecuador, // 41
            obj[i].idProductoPais4Ecuador, // 42
            obj[i].idProductoPais5Ecuador, // 43
            obj[i].idProductoPais6Ecuador, // 🌟 44
            obj[i].idProductoPais7Ecuador, // 🌟 45
            obj[i].idProductoPais8Ecuador, // 🌟 46
            obj[i].idProductoPais9Ecuador, // 🌟 47
            obj[i].idProductoPais10Ecuador, // 🌟 48
            
            obj[i].idProductoPais1Panama, // 49
            obj[i].idProductoPais2Panama, // 50
            obj[i].idProductoPais3Panama, // 51
            obj[i].idProductoPais4Panama, // 52
            obj[i].idProductoPais5Panama, // 53
            obj[i].idProductoPais6Panama, // 🌟 54
            obj[i].idProductoPais7Panama, // 🌟 55
            obj[i].idProductoPais8Panama, // 🌟 56
            obj[i].idProductoPais9Panama, // 🌟 57
            obj[i].idProductoPais10Panama, // 🌟 58
            
            obj[i].idProductoPais1CR, // 59
            obj[i].idProductoPais2CR, // 60
            obj[i].idProductoPais3CR, // 61
            obj[i].idProductoPais4CR, // 62
            obj[i].idProductoPais5CR, // 63
            obj[i].idProductoPais6CR, // 🌟 64
            obj[i].idProductoPais7CR, // 🌟 65
            obj[i].idProductoPais8CR, // 🌟 66
            obj[i].idProductoPais9CR, // 🌟 67
            obj[i].idProductoPais10CR, // 🌟 68
            
            obj[i].idProductoPais1Argentina, // 69
            obj[i].idProductoPais2Argentina, // 70
            obj[i].idProductoPais3Argentina, // 71
            obj[i].idProductoPais4Argentina, // 72
            obj[i].idProductoPais5Argentina, // 73
            obj[i].idProductoPais6Argentina, // 🌟 74
            obj[i].idProductoPais7Argentina, // 🌟 75
            obj[i].idProductoPais8Argentina, // 🌟 76
            obj[i].idProductoPais9Argentina, // 🌟 77
            obj[i].idProductoPais10Argentina, // 🌟 78
            
            obj[i].idProductoPais1Chile, // 79
            obj[i].idProductoPais2Chile, // 80
            obj[i].idProductoPais3Chile, // 81
            obj[i].idProductoPais4Chile, // 82
            obj[i].idProductoPais5Chile, // 83
            obj[i].idProductoPais6Chile, // 🌟 84
            obj[i].idProductoPais7Chile, // 🌟 85
            obj[i].idProductoPais8Chile, // 🌟 86
            obj[i].idProductoPais9Chile, // 🌟 87
            obj[i].idProductoPais10Chile, // 🌟 88


            // =========================================================
            // CANTIDADES
            // =========================================================
            
            obj[i].cantidad1, // 89
            obj[i].cantidad2, // 90
            obj[i].cantidad3, // 91
            obj[i].cantidad4, // 92
            obj[i].cantidad5, // 93
            obj[i].cantidad6, // 🌟 94
            obj[i].cantidad7, // 🌟 95
            obj[i].cantidad8, // 🌟 96
            obj[i].cantidad9, // 🌟 97
            obj[i].cantidad10, // 🌟 98
            
            obj[i].cantidad1Bolivia, // 99
            obj[i].cantidad2Bolivia, // 100
            obj[i].cantidad3Bolivia, // 101
            obj[i].cantidad4Bolivia, // 102
            obj[i].cantidad5Bolivia, // 103
            obj[i].cantidad6Bolivia, // 🌟 104
            obj[i].cantidad7Bolivia, // 🌟 105
            obj[i].cantidad8Bolivia, // 🌟 106
            obj[i].cantidad9Bolivia, // 🌟 107
            obj[i].cantidad10Bolivia, // 🌟 108
            
            obj[i].cantidad1Ecuador, // 109
            obj[i].cantidad2Ecuador, // 110
            obj[i].cantidad3Ecuador, // 111
            obj[i].cantidad4Ecuador, // 112
            obj[i].cantidad5Ecuador, // 113
            obj[i].cantidad6Ecuador, // 🌟 114
            obj[i].cantidad7Ecuador, // 🌟 115
            obj[i].cantidad8Ecuador, // 🌟 116
            obj[i].cantidad9Ecuador, // 🌟 117
            obj[i].cantidad10Ecuador, // 🌟 118
            
            obj[i].cantidad1Panama, // 119
            obj[i].cantidad2Panama, // 120
            obj[i].cantidad3Panama, // 121
            obj[i].cantidad4Panama, // 122
            obj[i].cantidad5Panama, // 123
            obj[i].cantidad6Panama, // 🌟 124
            obj[i].cantidad7Panama, // 🌟 125
            obj[i].cantidad8Panama, // 🌟 126
            obj[i].cantidad9Panama, // 🌟 127
            obj[i].cantidad10Panama, // 🌟 128
            
            obj[i].cantidad1CR, // 129
            obj[i].cantidad2CR, // 130
            obj[i].cantidad3CR, // 131
            obj[i].cantidad4CR, // 132
            obj[i].cantidad5CR, // 133
            obj[i].cantidad6CR, // 🌟 134
            obj[i].cantidad7CR, // 🌟 135
            obj[i].cantidad8CR, // 🌟 136
            obj[i].cantidad9CR, // 🌟 137
            obj[i].cantidad10CR, // 🌟 138
            
            obj[i].cantidad1Argentina, // 139
            obj[i].cantidad2Argentina, // 140
            obj[i].cantidad3Argentina, // 141
            obj[i].cantidad4Argentina, // 142
            obj[i].cantidad5Argentina, // 143
            obj[i].cantidad6Argentina, // 🌟 144
            obj[i].cantidad7Argentina, // 🌟 145
            obj[i].cantidad8Argentina, // 🌟 146
            obj[i].cantidad9Argentina, // 🌟 147
            obj[i].cantidad10Argentina, // 🌟 148
            
            obj[i].cantidad1Chile, // 149
            obj[i].cantidad2Chile, // 150
            obj[i].cantidad3Chile, // 151
            obj[i].cantidad4Chile, // 152
            obj[i].cantidad5Chile, // 153
            obj[i].cantidad6Chile, // 🌟 154
            obj[i].cantidad7Chile, // 🌟 155
            obj[i].cantidad8Chile, // 🌟 156
            obj[i].cantidad9Chile, // 🌟 157
            obj[i].cantidad10Chile, // 🌟 158


            // =========================================================
            // NOMBRES
            // =========================================================
            
            obj[i].nombre1Peru, // 159
            obj[i].nombre2Peru, // 160
            obj[i].nombre3Peru, // 161
            obj[i].nombre4Peru, // 162
            obj[i].nombre5Peru, // 163
            obj[i].nombre6Peru, // 🌟 164
            obj[i].nombre7Peru, // 🌟 165
            obj[i].nombre8Peru, // 🌟 166
            obj[i].nombre9Peru, // 🌟 167
            obj[i].nombre10Peru, // 🌟 168
            
            obj[i].nombre1Bolivia, // 169
            obj[i].nombre2Bolivia, // 170
            obj[i].nombre3Bolivia, // 171
            obj[i].nombre4Bolivia, // 172
            obj[i].nombre5Bolivia, // 173
            obj[i].nombre6Bolivia, // 🌟 174
            obj[i].nombre7Bolivia, // 🌟 175
            obj[i].nombre8Bolivia, // 🌟 176
            obj[i].nombre9Bolivia, // 🌟 177
            obj[i].nombre10Bolivia, // 🌟 178
            
            obj[i].nombre1Ecuador, // 179
            obj[i].nombre2Ecuador, // 180
            obj[i].nombre3Ecuador, // 181
            obj[i].nombre4Ecuador, // 182
            obj[i].nombre5Ecuador, // 183
            obj[i].nombre6Ecuador, // 🌟 184
            obj[i].nombre7Ecuador, // 🌟 185
            obj[i].nombre8Ecuador, // 🌟 186
            obj[i].nombre9Ecuador, // 🌟 187
            obj[i].nombre10Ecuador, // 🌟 188
            
            obj[i].nombre1Panama, // 189
            obj[i].nombre2Panama, // 190
            obj[i].nombre3Panama, // 191
            obj[i].nombre4Panama, // 192
            obj[i].nombre5Panama, // 193
            obj[i].nombre6Panama, // 🌟 194
            obj[i].nombre7Panama, // 🌟 195
            obj[i].nombre8Panama, // 🌟 196
            obj[i].nombre9Panama, // 🌟 197
            obj[i].nombre10Panama, // 🌟 198
            
            obj[i].nombre1CR, // 199
            obj[i].nombre2CR, // 200
            obj[i].nombre3CR, // 201
            obj[i].nombre4CR, // 202
            obj[i].nombre5CR, // 203
            obj[i].nombre6CR, // 🌟 204
            obj[i].nombre7CR, // 🌟 205
            obj[i].nombre8CR, // 🌟 206
            obj[i].nombre9CR, // 🌟 207
            obj[i].nombre10CR, // 🌟 208
            
            obj[i].nombre1Argentina, // 209
            obj[i].nombre2Argentina, // 210
            obj[i].nombre3Argentina, // 211
            obj[i].nombre4Argentina, // 212
            obj[i].nombre5Argentina, // 213
            obj[i].nombre6Argentina, // 🌟 214
            obj[i].nombre7Argentina, // 🌟 215
            obj[i].nombre8Argentina, // 216
            obj[i].nombre9Argentina, // 217
            obj[i].nombre10Argentina, // 🌟 218
            
            obj[i].nombre1Chile, // 219
            obj[i].nombre2Chile, // 220
            obj[i].nombre3Chile, // 221
            obj[i].nombre4Chile, // 222
            obj[i].nombre5Chile, // 223
            obj[i].nombre6Chile, // 🌟 224
            obj[i].nombre7Chile, // 🌟 225
            obj[i].nombre8Chile, // 🌟 226
            obj[i].nombre9Chile, // 🌟 227
            obj[i].nombre10Chile // 🌟 228
            
        ]);
    }
}

function sendDataAjax() {
    $.ajax({
        type: "POST",
        url: "GenerarPacketeProducto.aspx/ListaPaquetes",
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

//CARGAR DATOS EN MODAL
function fillModalData(data) {
    var estados;
    
    if (data[2] == "Activo") {
        estados = true;
    } else {
        estados = false;
    }

    $("#txtNombrePaquete").val(data[1]);
    $("#txtObservacion").val(data[4]);
    
    $("#tooglePeru").prop('checked', data[12]).change();
    $("#txtIDPeru1").val(data[159]);
    $("#txtPrecioPeru1").val(data[89]); 
    $("#txtIDPeru2").val(data[160]);
    $("#txtPrecioPeru2").val(data[90]); 
    $("#txtIDPeru3").val(data[161]); 
    $("#txtPrecioPeru3").val(data[91]); 
    $("#txtIDPeru4").val(data[162]); 
    $("#txtPrecioPeru4").val(data[92]); 
    $("#txtIDPeru5").val(data[163]); 
    $("#txtPrecioPeru5").val(data[93]); 
    $("#txtIDPeru6").val(data[164]); 
    $("#txtPrecioPeru6").val(data[94]); 
    $("#txtIDPeru7").val(data[165]); 
    $("#txtPrecioPeru7").val(data[95]); 
    $("#txtIDPeru8").val(data[166]);
    $("#txtPrecioPeru8").val(data[96]); 
    $("#txtIDPeru9").val(data[167]); 
    $("#txtPrecioPeru9").val(data[97]); 
    $("#txtIDPeru10").val(data[168]); 
    $("#txtPrecioPeru10").val(data[98]);10
    
    $("#toogleBolivia").prop('checked', data[13]).change();
    $("#txtIDBolivia1").val(data[169]); 
    $("#txtPrecioBolivia1").val(data[99]);
    $("#txtIDBolivia2").val(data[170]); 
    $("#txtPrecioBolivia2").val(data[100]);
    $("#txtIDBolivia3").val(data[171]); 
    $("#txtPrecioBolivia3").val(data[101]);
    $("#txtIDBolivia4").val(data[172]); 
    $("#txtPrecioBolivia4").val(data[102]);
    $("#txtIDBolivia5").val(data[173]); 
    $("#txtPrecioBolivia5").val(data[103]);
    $("#txtIDBolivia6").val(data[174]);
    $("#txtPrecioBolivia6").val(data[104]);
    $("#txtIDBolivia7").val(data[175]);
    $("#txtPrecioBolivia7").val(data[105]);
    $("#txtIDBolivia8").val(data[176]); 
    $("#txtPrecioBolivia8").val(data[106]);
    $("#txtIDBolivia9").val(data[177]); 
    $("#txtPrecioBolivia9").val(data[107]);
    $("#txtIDBolivia10").val(data[178]); 
    $("#txtPrecioBolivia10").val(data[108]);
    
    $("#toogleEcuador").prop('checked', data[14]).change();
    $("#txtIDEcuador1").val(data[179]); 
    $("#txtPrecioEcuador1").val(data[109]);
    $("#txtIDEcuador2").val(data[180]); 
    $("#txtPrecioEcuador2").val(data[110]);
    $("#txtIDEcuador3").val(data[181]);
    $("#txtPrecioEcuador3").val(data[111]);
    $("#txtIDEcuador4").val(data[182]); 
    $("#txtPrecioEcuador4").val(data[112]);
    $("#txtIDEcuador5").val(data[183]); 
    $("#txtPrecioEcuador5").val(data[113]);
    $("#txtIDEcuador6").val(data[184]);
    $("#txtPrecioEcuador6").val(data[114]);
    $("#txtIDEcuador7").val(data[185]); 
    $("#txtPrecioEcuador7").val(data[115]);
    $("#txtIDEcuador8").val(data[186]); 
    $("#txtPrecioEcuador8").val(data[116]);
    $("#txtIDEcuador9").val(data[187]); 
    $("#txtPrecioEcuador9").val(data[117]);
    $("#txtIDEcuador10").val(data[188]); 
    $("#txtPrecioEcuador10").val(data[118]);
    
    $("#tooglePanama").prop('checked', data[15]).change();
    $("#txtIDPanama1").val(data[189]);
    $("#txtPrecioPanama1").val(data[119]);
    $("#txtIDPanama2").val(data[190]); 
    $("#txtPrecioPanama2").val(data[120]);
    $("#txtIDPanama3").val(data[191]); 
    $("#txtPrecioPanama3").val(data[121]);
    $("#txtIDPanama4").val(data[192]);
    $("#txtPrecioPanama4").val(data[122]);
    $("#txtIDPanama5").val(data[193]);
    $("#txtPrecioPanama5").val(data[123]);
    $("#txtIDPanama6").val(data[194]); 
    $("#txtPrecioPanama6").val(data[124]);
    $("#txtIDPanama7").val(data[195]); 
    $("#txtPrecioPanama7").val(data[125]);
    $("#txtIDPanama8").val(data[196]); 
    $("#txtPrecioPanama8").val(data[126]);
    $("#txtIDPanama9").val(data[197]); 
    $("#txtPrecioPanama9").val(data[127]);
    $("#txtIDPanama10").val(data[198]); 
    $("#txtPrecioPanama10").val(data[128]);
    
    $("#toogleCR").prop('checked', data[16]).change();
    $("#txtIDCR1").val(data[199]); 
    $("#txtPrecioCR1").val(data[129]);
    $("#txtIDCR2").val(data[200]); 
    $("#txtPrecioCR2").val(data[130]);
    $("#txtIDCR3").val(data[201]);
    $("#txtPrecioCR3").val(data[131]);
    $("#txtIDCR4").val(data[202]); 
    $("#txtPrecioCR4").val(data[132]);
    $("#txtIDCR5").val(data[203]); 
    $("#txtPrecioCR5").val(data[133]);
    $("#txtIDCR6").val(data[204]);
    $("#txtPrecioCR6").val(data[134]);
    $("#txtIDCR7").val(data[205]);
    $("#txtPrecioCR7").val(data[135]);
    $("#txtIDCR8").val(data[206]); 
    $("#txtPrecioCR8").val(data[136]);
    $("#txtIDCR9").val(data[207]); 
    $("#txtPrecioCR9").val(data[137]);
    $("#txtIDCR10").val(data[208]); 
    $("#txtPrecioCR10").val(data[138]);
    
    $("#toogleArgentina").prop('checked', data[17]).change();
    $("#txtIDArgentina1").val(data[209]);
    $("#txtPrecioArgentina1").val(data[139]);
    $("#txtIDArgentina2").val(data[210]);
    $("#txtPrecioArgentina2").val(data[140]);
    $("#txtIDArgentina3").val(data[211]); 
    $("#txtPrecioArgentina3").val(data[141]);
    $("#txtIDArgentina4").val(data[212]); 
    $("#txtPrecioArgentina4").val(data[142]);
    $("#txtIDArgentina5").val(data[213]); 
    $("#txtPrecioArgentina5").val(data[143]);
    $("#txtIDArgentina6").val(data[214]); 
    $("#txtPrecioArgentina6").val(data[144]);
    $("#txtIDArgentina7").val(data[215]); 
    $("#txtPrecioArgentina7").val(data[145]);
    $("#txtIDArgentina8").val(data[216]); 
    $("#txtPrecioArgentina8").val(data[146]);
    $("#txtIDArgentina9").val(data[217]); 
    $("#txtPrecioArgentina9").val(data[147]);
    $("#txtIDArgentina10").val(data[218]);
    $("#txtPrecioArgentina10").val(data[148]);
    
    $("#toogleChile").prop('checked', data[18]).change();
    $("#txtIDChile1").val(data[219]);
    $("#txtPrecioChile1").val(data[149]);
    $("#txtIDChile2").val(data[220]); 
    $("#txtPrecioChile2").val(data[150]);
    $("#txtIDChile3").val(data[221]); 
    $("#txtPrecioChile3").val(data[151]);
    $("#txtIDChile4").val(data[222]); 
    $("#txtPrecioChile4").val(data[152]);
    $("#txtIDChile5").val(data[223]); 
    $("#txtPrecioChile5").val(data[153]);
    $("#txtIDChile6").val(data[224]); 
    $("#txtPrecioChile6").val(data[154]);
    $("#txtIDChile7").val(data[225]);
    $("#txtPrecioChile7").val(data[155]);
    $("#txtIDChile8").val(data[226]); 
    $("#txtPrecioChile8").val(data[156]);
    $("#txtIDChile9").val(data[227]); 
    $("#txtPrecioChile9").val(data[157]);
    $("#txtIDChile10").val(data[228]);
    $("#txtPrecioChile10").val(data[158]);
}

// ABRIR MODAL
$("#btnNuevoPaquete").click(function (e) {
    $("#btnRegistrar").show();
    $("#btnActualizar").hide();
    $("#exampleModal input").val("");
    insertarPrecio();
    $("#exampleModal textarea").val("");
    $('input').iCheck('uncheck');
    $("#exampleModal input[type='checkbox']").prop('checked', false).change();
    
    $('.solo-numero').numeric();
});

function insertarPrecio() {
    $("#txtPrecioPeru1").val("0");
    $("#txtPrecioPeru2").val("0");
    $("#txtPrecioPeru3").val("0");
    $("#txtPrecioPeru4").val("0");
    $("#txtPrecioPeru5").val("0");
    $("#txtPrecioPeru6").val("0");
    $("#txtPrecioPeru7").val("0");
    $("#txtPrecioPeru8").val("0");
    $("#txtPrecioPeru9").val("0");
    $("#txtPrecioPeru10").val("0");
    $("#txtPrecioBolivia1").val("0");
    $("#txtPrecioBolivia2").val("0");
    $("#txtPrecioBolivia3").val("0");
    $("#txtPrecioBolivia4").val("0");
    $("#txtPrecioBolivia5").val("0");
    $("#txtPrecioBolivia6").val("0");
    $("#txtPrecioBolivia7").val("0");
    $("#txtPrecioBolivia8").val("0");
    $("#txtPrecioBolivia9").val("0");
    $("#txtPrecioBolivia10").val("0");
    $("#txtPrecioEcuador1").val("0");
    $("#txtPrecioEcuador2").val("0");
    $("#txtPrecioEcuador3").val("0");
    $("#txtPrecioEcuador4").val("0");
    $("#txtPrecioEcuador5").val("0");
    $("#txtPrecioEcuador6").val("0");
    $("#txtPrecioEcuador7").val("0");
    $("#txtPrecioEcuador8").val("0");
    $("#txtPrecioEcuador9").val("0");
    $("#txtPrecioEcuador10").val("0");
    $("#txtPrecioPanama1").val("0");
    $("#txtPrecioPanama2").val("0");
    $("#txtPrecioPanama3").val("0");
    $("#txtPrecioPanama4").val("0");
    $("#txtPrecioPanama5").val("0");
    $("#txtPrecioPanama6").val("0");
    $("#txtPrecioPanama7").val("0");
    $("#txtPrecioPanama8").val("0");
    $("#txtPrecioPanama9").val("0");
    $("#txtPrecioPanama10").val("0");
    $("#txtPrecioCR1").val("0");
    $("#txtPrecioCR2").val("0");
    $("#txtPrecioCR3").val("0");
    $("#txtPrecioCR4").val("0");
    $("#txtPrecioCR5").val("0");
    $("#txtPrecioCR6").val("0");
    $("#txtPrecioCR7").val("0");
    $("#txtPrecioCR8").val("0");
    $("#txtPrecioCR9").val("0");
    $("#txtPrecioCR10").val("0");
    $("#txtPrecioArgentina1").val("0");
    $("#txtPrecioArgentina2").val("0");
    $("#txtPrecioArgentina3").val("0");
    $("#txtPrecioArgentina4").val("0");
    $("#txtPrecioArgentina5").val("0");
    $("#txtPrecioArgentina6").val("0");
    $("#txtPrecioArgentina7").val("0");
    $("#txtPrecioArgentina8").val("0");
    $("#txtPrecioArgentina9").val("0");
    $("#txtPrecioArgentina10").val("0");
    $("#txtPrecioChile1").val("0");
    $("#txtPrecioChile2").val("0");
    $("#txtPrecioChile3").val("0");
    $("#txtPrecioChile4").val("0");
    $("#txtPrecioChile5").val("0");
    $("#txtPrecioChile6").val("0");
    $("#txtPrecioChile7").val("0");
    $("#txtPrecioChile8").val("0");
    $("#txtPrecioChile9").val("0");
    $("#txtPrecioChile10").val("0");
}

//FUNCIONES PARA REGISTRAR
$("#btnRegistrar").click(function (e) {
    var nombre = $("#txtNombrePaquete").val();

    var idPeru1 = $("#txtIDPeru1").val();
    var precioPeru1 = $("#txtPrecioPeru1").val();
    var idPeru2 = $("#txtIDPeru2").val();
    var precioPeru2 = $("#txtPrecioPeru2").val();
    var idPeru3 = $("#txtIDPeru3").val();
    var precioPeru3 = $("#txtPrecioPeru3").val();
    var idPeru4 = $("#txtIDPeru4").val()
    var precioPeru4 = $("#txtPrecioPeru4").val();
    var idPeru5 = $("#txtIDPeru5").val()
    var precioPeru5 = $("#txtPrecioPeru5").val();
    // --- Nuevos Slots de Producto 6 al 10 ---
    var idPeru6 = $("#txtIDPeru6").val()
    var precioPeru6 = $("#txtPrecioPeru6").val();
    var idPeru7 = $("#txtIDPeru7").val()
    var precioPeru7 = $("#txtPrecioPeru7").val();
    var idPeru8 = $("#txtIDPeru8").val()
    var precioPeru8 = $("#txtPrecioPeru8").val();
    var idPeru9 = $("#txtIDPeru9").val()
    var precioPeru9 = $("#txtPrecioPeru9").val();
    var idPeru10 = $("#txtIDPeru10").val()
    var precioPeru10 = $("#txtPrecioPeru10").val();

    var idBolivia1 = $("#txtIDBolivia1").val();
    var precioBolivia1 = $("#txtPrecioBolivia1").val();
    var idBolivia2 = $("#txtIDBolivia2").val();
    var precioBolivia2 = $("#txtPrecioBolivia2").val();
    var idBolivia3 = $("#txtIDBolivia3").val();
    var precioBolivia3 = $("#txtPrecioBolivia3").val();
    var idBolivia4 = $("#txtIDBolivia4").val()
    var precioBolivia4 = $("#txtPrecioBolivia4").val()
    var idBolivia5 = $("#txtIDBolivia5").val()
    var precioBolivia5 = $("#txtPrecioBolivia5").val()
    // --- Nuevos Slots de Producto 6 al 10 ---
    var idBolivia6 = $("#txtIDBolivia6").val();
    var precioBolivia6 = $("#txtPrecioBolivia6").val();
    var idBolivia7 = $("#txtIDBolivia7").val();
    var precioBolivia7 = $("#txtPrecioBolivia7").val();
    var idBolivia8 = $("#txtIDBolivia8").val();
    var precioBolivia8 = $("#txtPrecioBolivia8").val();
    var idBolivia9 = $("#txtIDBolivia9").val();
    var precioBolivia9 = $("#txtPrecioBolivia9").val();
    var idBolivia10 = $("#txtIDBolivia10").val();
    var precioBolivia10 = $("#txtPrecioBolivia10").val();

    var idEcuador1 = $("#txtIDEcuador1").val();
    var precioEcuador1 = $("#txtPrecioEcuador1").val();
    var idEcuador2 = $("#txtIDEcuador2").val();
    var precioEcuador2 = $("#txtPrecioEcuador2").val();
    var idEcuador3 = $("#txtIDEcuador3").val();
    var precioEcuador3 = $("#txtPrecioEcuador3").val();
    var idEcuador4 = $("#txtIDEcuador4").val();
    var precioEcuador4 = $("#txtPrecioEcuador4").val();
    var idEcuador5 = $("#txtIDEcuador5").val();
    var precioEcuador5 = $("#txtPrecioEcuador5").val();
    // --- Nuevos Slots de Producto 6 al 10 ---
    var idEcuador6 = $("#txtIDEcuador6").val();
    var precioEcuador6 = $("#txtPrecioEcuador6").val();
    var idEcuador7 = $("#txtIDEcuador7").val();
    var precioEcuador7 = $("#txtPrecioEcuador7").val();
    var idEcuador8 = $("#txtIDEcuador8").val();
    var precioEcuador8 = $("#txtPrecioEcuador8").val();
    var idEcuador9 = $("#txtIDEcuador9").val();
    var precioEcuador9 = $("#txtPrecioEcuador9").val();
    var idEcuador10 = $("#txtIDEcuador10").val();
    var precioEcuador10 = $("#txtPrecioEcuador10").val();

    var idPanama1 = $("#txtIDPanama1").val();
    var precioPanama1 = $("#txtPrecioPanama1").val();
    var idPanama2 = $("#txtIDPanama2").val();
    var precioPanama2 = $("#txtPrecioPanama2").val();
    var idPanama3 = $("#txtIDPanama3").val();
    var precioPanama3 = $("#txtPrecioPanama3").val();
    var idPanama4 = $("#txtIDPanama4").val();
    var precioPanama4 = $("#txtPrecioPanama4").val();
    var idPanama5 = $("#txtIDPanama5").val();
    var precioPanama5 = $("#txtPrecioPanama5").val();
    // --- Nuevos Slots de Producto 6 al 10 ---
    var idPanama6 = $("#txtIDPanama6").val();
    var precioPanama6 = $("#txtPrecioPanama6").val();
    var idPanama7 = $("#txtIDPanama7").val();
    var precioPanama7 = $("#txtPrecioPanama7").val();
    var idPanama8 = $("#txtIDPanama8").val();
    var precioPanama8 = $("#txtPrecioPanama8").val();
    var idPanama9 = $("#txtIDPanama9").val();
    var precioPanama9 = $("#txtPrecioPanama9").val();
    var idPanama10 = $("#txtIDPanama10").val();
    var precioPanama10 = $("#txtPrecioPanama10").val();

    var idCR1 = $("#txtIDCR1").val();
    var precioCR1 = $("#txtPrecioCR1").val();
    var idCR2 = $("#txtIDCR2").val();
    var precioCR2 = $("#txtPrecioCR2").val();
    var idCR3 = $("#txtIDCR3").val();
    var precioCR3 = $("#txtPrecioCR3").val();
    var idCR4 = $("#txtIDCR4").val();
    var precioCR4 = $("#txtPrecioCR4").val();
    var idCR5 = $("#txtIDCR5").val();
    var precioCR5 = $("#txtPrecioCR5").val();
    // --- Nuevos Slots de Producto 6 al 10 ---
    var idCR6 = $("#txtIDCR6").val();
    var precioCR6 = $("#txtPrecioCR6").val();
    var idCR7 = $("#txtIDCR7").val();
    var precioCR7 = $("#txtPrecioCR7").val();
    var idCR8 = $("#txtIDCR8").val();
    var precioCR8 = $("#txtPrecioCR8").val();
    var idCR9 = $("#txtIDCR9").val();
    var precioCR9 = $("#txtPrecioCR9").val();
    var idCR10 = $("#txtIDCR10").val();
    var precioCR10 = $("#txtPrecioCR10").val();

    var idArgentina1 = $("#txtIDArgentina1").val();
    var precioArgentina1 = $("#txtPrecioArgentina1").val();
    var idArgentina2 = $("#txtIDArgentina2").val();
    var precioArgentina2 = $("#txtPrecioArgentina2").val();
    var idArgentina3 = $("#txtIDArgentina3").val();
    var precioArgentina3 = $("#txtPrecioArgentina3").val();
    var idArgentina4 = $("#txtIDArgentina4").val();
    var precioArgentina4 = $("#txtPrecioArgentina4").val();
    var idArgentina5 = $("#txtIDArgentina5").val();
    var precioArgentina5 = $("#txtPrecioArgentina5").val();
    // --- Nuevos Slots de Producto 6 al 10 ---
    var idArgentina6 = $("#txtIDArgentina6").val();
    var precioArgentina6 = $("#txtPrecioArgentina6").val();
    var idArgentina7 = $("#txtIDArgentina7").val();
    var precioArgentina7 = $("#txtPrecioArgentina7").val();
    var idArgentina8 = $("#txtIDArgentina8").val();
    var precioArgentina8 = $("#txtPrecioArgentina8").val();
    var idArgentina9 = $("#txtIDArgentina9").val();
    var precioArgentina9 = $("#txtPrecioArgentina9").val();
    var idArgentina10 = $("#txtIDArgentina10").val();
    var precioArgentina10 = $("#txtPrecioArgentina10").val();

    var idChile1 = $("#txtIDChile1").val();
    var precioChile1 = $("#txtPrecioChile1").val();
    var idChile2 = $("#txtIDChile2").val();
    var precioChile2 = $("#txtPrecioChile2").val();
    var idChile3 = $("#txtIDChile3").val();
    var precioChile3 = $("#txtPrecioChile3").val();
    var idChile4 = $("#txtIDChile4").val();
    var precioChile4 = $("#txtPrecioChile4").val();
    var idChile5 = $("#txtIDChile5").val();
    var precioChile5 = $("#txtPrecioChile5").val();
    // --- Nuevos Slots de Producto 6 al 10 ---
    var idChile6 = $("#txtIDChile6").val();
    var precioChile6 = $("#txtPrecioChile6").val();
    var idChile7 = $("#txtIDChile7").val();
    var precioChile7 = $("#txtPrecioChile7").val();
    var idChile8 = $("#txtIDChile8").val();
    var precioChile8 = $("#txtPrecioChile8").val();
    var idChile9 = $("#txtIDChile9").val();
    var precioChile9 = $("#txtPrecioChile9").val();
    var idChile10 = $("#txtIDChile10").val();
    var precioChile10 = $("#txtPrecioChile10").val();

    e.preventDefault();
    if (nombre == "") {
        FaltaNombre();
    }

    else if ((idPeru1 != "" & precioPeru1 == "0") | (idPeru1 == "" & precioPeru1 != "0") | precioPeru1 == "") {
        FaltaDatoPeru();
    } else if ((idPeru2 != "" & precioPeru2 == "0") | (idPeru2 == "" & precioPeru2 != "0") | precioPeru2 == "") {
        FaltaDatoPeru();
    } else if ((idPeru3 != "" & precioPeru3 == "0") | (idPeru3 == "" & precioPeru3 != "0") | precioPeru3 == "") {
        FaltaDatoPeru();
    } else if ((idPeru4 != "" & precioPeru4 == "0") | (idPeru4 == "" & precioPeru4 != "0") | precioPeru4 == "") {
        FaltaDatoPeru();
    } else if ((idPeru5 != "" & precioPeru5 == "0") | (idPeru5 == "" & precioPeru5 != "0") | precioPeru5 == "") {
        FaltaDatoPeru();
    } else if ((idPeru6 != "" & precioPeru6 == "0") | (idPeru6 == "" & precioPeru6 != "0") | precioPeru6 == "") {
        FaltaDatoPeru();
    } else if ((idPeru7 != "" & precioPeru7 == "0") | (idPeru7 == "" & precioPeru7 != "0") | precioPeru7 == "") {
        FaltaDatoPeru();
    } else if ((idPeru8 != "" & precioPeru8 == "0") | (idPeru8 == "" & precioPeru8 != "0") | precioPeru8 == "") {
        FaltaDatoPeru();
    } else if ((idPeru9 != "" & precioPeru9 == "0") | (idPeru9 == "" & precioPeru9 != "0") | precioPeru9 == "") {
        FaltaDatoPeru();
    } else if ((idPeru10 != "" & precioPeru10 == "0") | (idPeru10 == "" & precioPeru10 != "0") | precioPeru10 == "") {
        FaltaDatoPeru();
    }

    else if ((idBolivia1 != "" & precioBolivia1 == "0") | (idBolivia1 == "" & precioBolivia1 != "0") | precioBolivia1 == "") {
        FaltaDatoBolivia();
    } else if ((idBolivia2 != "" & precioBolivia2 == "0") | (idBolivia2 == "" & precioBolivia2 != "0") | precioBolivia2 == "") {
        FaltaDatoBolivia();
    } else if ((idBolivia3 != "" & precioBolivia3 == "0") | (idBolivia3 == "" & precioBolivia3 != "0") | precioBolivia3 == "") {
        FaltaDatoBolivia();
    } else if ((idBolivia4 != "" & precioBolivia4 == "0") | (idBolivia4 == "" & precioBolivia4 != "0") | precioBolivia4 == "") {
        FaltaDatoBolivia();
    } else if ((idBolivia5 != "" & precioBolivia5 == "0") | (idBolivia5 == "" & precioBolivia5 != "0") | precioBolivia5 == "") {
        FaltaDatoBolivia();
    } else if ((idBolivia6 != "" & precioBolivia6 == "0") | (idBolivia6 == "" & precioBolivia6 != "0") | precioBolivia6 == "") {
        FaltaDatoBolivia();
    } else if ((idBolivia7 != "" & precioBolivia7 == "0") | (idBolivia7 == "" & precioBolivia7 != "0") | precioBolivia7 == "") {
        FaltaDatoBolivia();
    } else if ((idBolivia8 != "" & precioBolivia8 == "0") | (idBolivia8 == "" & precioBolivia8 != "0") | precioBolivia8 == "") {
        FaltaDatoBolivia();
    } else if ((idBolivia9 != "" & precioBolivia9 == "0") | (idBolivia9 == "" & precioBolivia9 != "0") | precioBolivia9 == "") {
        FaltaDatoBolivia();
    } else if ((idBolivia10 != "" & precioBolivia10 == "0") | (idBolivia10 == "" & precioBolivia10 != "0") | precioBolivia10 == "") {
        FaltaDatoBolivia();
    }

    else if ((idEcuador1 != "" & precioEcuador1 == "0") | (idEcuador1 == "" & precioEcuador1 != "0") | precioEcuador1 == "") {
        FaltaDatoEcuador();
    } else if ((idEcuador2 != "" & precioEcuador2 == "0") | (idEcuador2 == "" & precioEcuador2 != "0") | precioEcuador2 == "") {
        FaltaDatoEcuador();
    } else if ((idEcuador3 != "" & precioEcuador3 == "0") | (idEcuador3 == "" & precioEcuador3 != "0") | precioEcuador3 == "") {
        FaltaDatoEcuador();
    } else if ((idEcuador4 != "" & precioEcuador4 == "0") | (idEcuador4 == "" & precioEcuador4 != "0") | precioEcuador4 == "") {
        FaltaDatoEcuador();
    } else if ((idEcuador5 != "" & precioEcuador5 == "0") | (idEcuador5 == "" & precioEcuador5 != "0") | precioEcuador5 == "") {
        FaltaDatoEcuador();
    } else if ((idEcuador6 != "" & precioEcuador6 == "0") | (idEcuador6 == "" & precioEcuador6 != "0") | precioEcuador6 == "") {
        FaltaDatoEcuador();
    } else if ((idEcuador7 != "" & precioEcuador7 == "0") | (idEcuador7 == "" & precioEcuador7 != "0") | precioEcuador7 == "") {
        FaltaDatoEcuador();
    } else if ((idEcuador8 != "" & precioEcuador8 == "0") | (idEcuador8 == "" & precioEcuador8 != "0") | precioEcuador8 == "") {
        FaltaDatoEcuador();
    } else if ((idEcuador9 != "" & precioEcuador9 == "0") | (idEcuador9 == "" & precioEcuador9 != "0") | precioEcuador9 == "") {
        FaltaDatoEcuador();
    } else if ((idEcuador10 != "" & precioEcuador10 == "0") | (idEcuador10 == "" & precioEcuador10 != "0") | precioEcuador10 == "") {
        FaltaDatoEcuador();
    }

    else if ((idPanama1 != "" & precioPanama1 == "0") | (idPanama1 == "" & precioPanama1 != "0") | precioPanama1 == "") {
        FaltaDatoPanama();
    } else if ((idPanama2 != "" & precioPanama2 == "0") | (idPanama2 == "" & precioPanama2 != "0") | precioPanama2 == "") {
        FaltaDatoPanama();
    } else if ((idPanama3 != "" & precioPanama3 == "0") | (idPanama3 == "" & precioPanama3 != "0") | precioPanama3 == "") {
        FaltaDatoPanama();
    } else if ((idPanama4 != "" & precioPanama4 == "0") | (idPanama4 == "" & precioPanama4 != "0") | precioPanama4 == "") {
        FaltaDatoPanama();
    } else if ((idPanama5 != "" & precioPanama5 == "0") | (idPanama5 == "" & precioPanama5 != "0") | precioPanama5 == "") {
        FaltaDatoPanama();
    } else if ((idPanama6 != "" & precioPanama6 == "0") | (idPanama6 == "" & precioPanama6 != "0") | precioPanama6 == "") {
        FaltaDatoPanama();
    } else if ((idPanama7 != "" & precioPanama7 == "0") | (idPanama7 == "" & precioPanama7 != "0") | precioPanama7 == "") {
        FaltaDatoPanama();
    } else if ((idPanama8 != "" & precioPanama8 == "0") | (idPanama8 == "" & precioPanama8 != "0") | precioPanama8 == "") {
        FaltaDatoPanama();
    } else if ((idPanama9 != "" & precioPanama9 == "0") | (idPanama9 == "" & precioPanama9 != "0") | precioPanama9 == "") {
        FaltaDatoPanama();
    } else if ((idPanama10 != "" & precioPanama10 == "0") | (idPanama10 == "" & precioPanama10 != "0") | precioPanama10 == "") {
        FaltaDatoPanama();
    }

    else if ((idCR1 != "" & precioCR1 == "0") | (idCR1 == "" & precioCR1 != "0") | precioCR1 == "") {
        FaltaDatoCR();
    } else if ((idCR2 != "" & precioCR2 == "0") | (idCR2 == "" & precioCR2 != "0") | precioCR2 == "") {
        FaltaDatoCR();
    } else if ((idCR3 != "" & precioCR3 == "0") | (idCR3 == "" & precioCR3 != "0") | precioCR3 == "") {
        FaltaDatoCR();
    } else if ((idCR4 != "" & precioCR4 == "0") | (idCR4 == "" & precioCR4 != "0") | precioCR4 == "") {
        FaltaDatoCR();
    } else if ((idCR5 != "" & precioCR5 == "0") | (idCR5 == "" & precioCR5 != "0") | precioCR5 == "") {
        FaltaDatoCR();
    } else if ((idCR6 != "" & precioCR6 == "0") | (idCR6 == "" & precioCR6 != "0") | precioCR6 == "") {
        FaltaDatoCR();
    } else if ((idCR7 != "" & precioCR7 == "0") | (idCR7 == "" & precioCR7 != "0") | precioCR7 == "") {
        FaltaDatoCR();
    } else if ((idCR8 != "" & precioCR8 == "0") | (idCR8 == "" & precioCR8 != "0") | precioCR8 == "") {
        FaltaDatoCR();
    } else if ((idCR9 != "" & precioCR9 == "0") | (idCR9 == "" & precioCR9 != "0") | precioCR9 == "") {
        FaltaDatoCR();
    } else if ((idCR10 != "" & precioCR10 == "0") | (idCR10 == "" & precioCR10 != "0") | precioCR10 == "") {
        FaltaDatoCR();
    }

    else if ((idArgentina1 != "" & precioArgentina1 == "0") | (idArgentina1 == "" & precioArgentina1 != "0") | precioArgentina1 == "") {
        FaltaDatoArgentina();
    } else if ((idArgentina2 != "" & precioArgentina2 == "0") | (idArgentina2 == "" & precioArgentina2 != "0") | precioArgentina2 == "") {
        FaltaDatoArgentina();
    } else if ((idArgentina3 != "" & precioArgentina3 == "0") | (idArgentina3 == "" & precioArgentina3 != "0") | precioArgentina3 == "") {
        FaltaDatoArgentina();
    } else if ((idArgentina4 != "" & precioArgentina4 == "0") | (idArgentina4 == "" & precioArgentina4 != "0") | precioArgentina4 == "") {
        FaltaDatoArgentina();
    } else if ((idArgentina5 != "" & precioArgentina5 == "0") | (idArgentina5 == "" & precioArgentina5 != "0") | precioArgentina5 == "") {
        FaltaDatoArgentina();
    } else if ((idArgentina6 != "" & precioArgentina6 == "0") | (idArgentina6 == "" & precioArgentina6 != "0") | precioArgentina6 == "") {
        FaltaDatoArgentina();
    } else if ((idArgentina7 != "" & precioArgentina7 == "0") | (idArgentina7 == "" & precioArgentina7 != "0") | precioArgentina7 == "") {
        FaltaDatoArgentina();
    } else if ((idArgentina8 != "" & precioArgentina8 == "0") | (idArgentina8 == "" & precioArgentina8 != "0") | precioArgentina8 == "") {
        FaltaDatoArgentina();
    } else if ((idArgentina9 != "" & precioArgentina9 == "0") | (idArgentina9 == "" & precioArgentina9 != "0") | precioArgentina9 == "") {
        FaltaDatoArgentina();
    } else if ((idArgentina10 != "" & precioArgentina10 == "0") | (idArgentina10 == "" & precioArgentina10 != "0") | precioArgentina10 == "") {
        FaltaDatoArgentina();
    }

    else if ((idChile1 != "" & precioChile1 == "0") | (idChile1 == "" & precioChile1 != "0") | precioChile1 == "") {
        FaltaDatoChile();
    } else if ((idChile2 != "" & precioChile2 == "0") | (idChile2 == "" & precioChile2 != "0") | precioChile2 == "") {
        FaltaDatoChile();
    } else if ((idChile3 != "" & precioChile3 == "0") | (idChile3 == "" & precioChile3 != "0") | precioChile3 == "") {
        FaltaDatoChile();
    } else if ((idChile4 != "" & precioChile4 == "0") | (idChile4 == "" & precioChile4 != "0") | precioChile4 == "") {
        FaltaDatoChile();
    } else if ((idChile5 != "" & precioChile5 == "0") | (idChile5 == "" & precioChile5 != "0") | precioChile5 == "") {
        FaltaDatoChile();
    } else if ((idChile6 != "" & precioChile6 == "0") | (idChile6 == "" & precioChile6 != "0") | precioChile6 == "") {
        FaltaDatoChile();
    } else if ((idChile7 != "" & precioChile7 == "0") | (idChile7 == "" & precioChile7 != "0") | precioChile7 == "") {
        FaltaDatoChile();
    } else if ((idChile8 != "" & precioChile8 == "0") | (idChile8 == "" & precioChile8 != "0") | precioChile8 == "") {
        FaltaDatoChile();
    } else if ((idChile9 != "" & precioChile9 == "0") | (idChile9 == "" & precioChile9 != "0") | precioChile9 == "") {
        FaltaDatoChile();
    } else if ((idChile10 != "" & precioChile10 == "0") | (idChile10 == "" & precioChile10 != "0") | precioChile10 == "") {
        FaltaDatoChile();
    }

    // --- LÓGICA DE ÉXITO ---
    else {
        RegistroPaquete();
    }
});

function RegistroPaquete() {
    var nombre = $("#txtNombrePaquete").val();
    var observacion = $("#txtObservacion").val();

    var estaPeru = document.getElementById("tooglePeru").checked;
    var idPeru1 = $("#txtIDPeru1").val();
    var precioPeru1 = $("#txtPrecioPeru1").val();
    var idPeru2 = $("#txtIDPeru2").val();
    var precioPeru2 = $("#txtPrecioPeru2").val();
    var idPeru3 = $("#txtIDPeru3").val();
    var precioPeru3 = $("#txtPrecioPeru3").val();
    var idPeru4 = $("#txtIDPeru4").val()
    var precioPeru4 = $("#txtPrecioPeru4").val();
    var idPeru5 = $("#txtIDPeru5").val()
    var precioPeru5 = $("#txtPrecioPeru5").val();
    // --- Nuevos Slots de Producto 6 al 10 ---
    var idPeru6 = $("#txtIDPeru6").val();
    var precioPeru6 = $("#txtPrecioPeru6").val();
    var idPeru7 = $("#txtIDPeru7").val();
    var precioPeru7 = $("#txtPrecioPeru7").val();
    var idPeru8 = $("#txtIDPeru8").val();
    var precioPeru8 = $("#txtPrecioPeru8").val();
    var idPeru9 = $("#txtIDPeru9").val();
    var precioPeru9 = $("#txtPrecioPeru9").val();
    var idPeru10 = $("#txtIDPeru10").val();
    var precioPeru10 = $("#txtPrecioPeru10").val();

    var estaBolivia = document.getElementById("toogleBolivia").checked;
    var idBolivia1 = $("#txtIDBolivia1").val();
    var precioBolivia1 = $("#txtPrecioBolivia1").val();
    var idBolivia2 = $("#txtIDBolivia2").val();
    var precioBolivia2 = $("#txtPrecioBolivia2").val();
    var idBolivia3 = $("#txtIDBolivia3").val();
    var precioBolivia3 = $("#txtPrecioBolivia3").val();
    var idBolivia4 = $("#txtIDBolivia4").val()
    var precioBolivia4 = $("#txtPrecioBolivia4").val()
    var idBolivia5 = $("#txtIDBolivia5").val()
    var precioBolivia5 = $("#txtPrecioBolivia5").val()
    // --- Nuevos Slots de Producto 6 al 10 ---
    var idBolivia6 = $("#txtIDBolivia6").val();
    var precioBolivia6 = $("#txtPrecioBolivia6").val();
    var idBolivia7 = $("#txtIDBolivia7").val();
    var precioBolivia7 = $("#txtPrecioBolivia7").val();
    var idBolivia8 = $("#txtIDBolivia8").val();
    var precioBolivia8 = $("#txtPrecioBolivia8").val();
    var idBolivia9 = $("#txtIDBolivia9").val();
    var precioBolivia9 = $("#txtPrecioBolivia9").val();
    var idBolivia10 = $("#txtIDBolivia10").val();
    var precioBolivia10 = $("#txtPrecioBolivia10").val();

    var estaEcuador = document.getElementById("toogleEcuador").checked;
    var idEcuador1 = $("#txtIDEcuador1").val();
    var precioEcuador1 = $("#txtPrecioEcuador1").val();
    var idEcuador2 = $("#txtIDEcuador2").val();
    var precioEcuador2 = $("#txtPrecioEcuador2").val();
    var idEcuador3 = $("#txtIDEcuador3").val();
    var precioEcuador3 = $("#txtPrecioEcuador3").val();
    var idEcuador4 = $("#txtIDEcuador4").val();
    var precioEcuador4 = $("#txtPrecioEcuador4").val();
    var idEcuador5 = $("#txtIDEcuador5").val();
    var precioEcuador5 = $("#txtPrecioEcuador5").val();
    // --- Nuevos Slots de Producto 6 al 10 ---
    var idEcuador6 = $("#txtIDEcuador6").val();
    var precioEcuador6 = $("#txtPrecioEcuador6").val();
    var idEcuador7 = $("#txtIDEcuador7").val();
    var precioEcuador7 = $("#txtPrecioEcuador7").val();
    var idEcuador8 = $("#txtIDEcuador8").val();
    var precioEcuador8 = $("#txtPrecioEcuador8").val();
    var idEcuador9 = $("#txtIDEcuador9").val();
    var precioEcuador9 = $("#txtPrecioEcuador9").val();
    var idEcuador10 = $("#txtIDEcuador10").val();
    var precioEcuador10 = $("#txtPrecioEcuador10").val();

    var estaPanama = document.getElementById("tooglePanama").checked;
    var idPanama1 = $("#txtIDPanama1").val();
    var precioPanama1 = $("#txtPrecioPanama1").val();
    var idPanama2 = $("#txtIDPanama2").val();
    var precioPanama2 = $("#txtPrecioPanama2").val();
    var idPanama3 = $("#txtIDPanama3").val();
    var precioPanama3 = $("#txtPrecioPanama3").val();
    var idPanama4 = $("#txtIDPanama4").val();
    var precioPanama4 = $("#txtPrecioPanama4").val();
    var idPanama5 = $("#txtIDPanama5").val();
    var precioPanama5 = $("#txtPrecioPanama5").val();
    // --- Nuevos Slots de Producto 6 al 10 ---
    var idPanama6 = $("#txtIDPanama6").val();
    var precioPanama6 = $("#txtPrecioPanama6").val();
    var idPanama7 = $("#txtIDPanama7").val();
    var precioPanama7 = $("#txtPrecioPanama7").val();
    var idPanama8 = $("#txtIDPanama8").val();
    var precioPanama8 = $("#txtPrecioPanama8").val();
    var idPanama9 = $("#txtIDPanama9").val();
    var precioPanama9 = $("#txtPrecioPanama9").val();
    var idPanama10 = $("#txtIDPanama10").val();
    var precioPanama10 = $("#txtPrecioPanama10").val();

    var estaCR = document.getElementById("toogleCR").checked;
    var idCR1 = $("#txtIDCR1").val();
    var precioCR1 = $("#txtPrecioCR1").val();
    var idCR2 = $("#txtIDCR2").val();
    var precioCR2 = $("#txtPrecioCR2").val();
    var idCR3 = $("#txtIDCR3").val();
    var precioCR3 = $("#txtPrecioCR3").val();
    var idCR4 = $("#txtIDCR4").val();
    var precioCR4 = $("#txtPrecioCR4").val();
    var idCR5 = $("#txtIDCR5").val();
    var precioCR5 = $("#txtPrecioCR5").val();
    // --- Nuevos Slots de Producto 6 al 10 ---
    var idCR6 = $("#txtIDCR6").val();
    var precioCR6 = $("#txtPrecioCR6").val();
    var idCR7 = $("#txtIDCR7").val();
    var precioCR7 = $("#txtPrecioCR7").val();
    var idCR8 = $("#txtIDCR8").val();
    var precioCR8 = $("#txtPrecioCR8").val();
    var idCR9 = $("#txtIDCR9").val();
    var precioCR9 = $("#txtPrecioCR9").val();
    var idCR10 = $("#txtIDCR10").val();
    var precioCR10 = $("#txtPrecioCR10").val();

    var estaArgentina = document.getElementById("toogleArgentina").checked;
    var idArgentina1 = $("#txtIDArgentina1").val();
    var precioArgentina1 = $("#txtPrecioArgentina1").val();
    var idArgentina2 = $("#txtIDArgentina2").val();
    var precioArgentina2 = $("#txtPrecioArgentina2").val();
    var idArgentina3 = $("#txtIDArgentina3").val();
    var precioArgentina3 = $("#txtPrecioArgentina3").val();
    var idArgentina4 = $("#txtIDArgentina4").val();
    var precioArgentina4 = $("#txtPrecioArgentina4").val();
    var idArgentina5 = $("#txtIDArgentina5").val();
    var precioArgentina5 = $("#txtPrecioArgentina5").val();
    // --- Nuevos Slots de Producto 6 al 10 ---
    var idArgentina6 = $("#txtIDArgentina6").val();
    var precioArgentina6 = $("#txtPrecioArgentina6").val();
    var idArgentina7 = $("#txtIDArgentina7").val();
    var precioArgentina7 = $("#txtPrecioArgentina7").val();
    var idArgentina8 = $("#txtIDArgentina8").val();
    var precioArgentina8 = $("#txtPrecioArgentina8").val();
    var idArgentina9 = $("#txtIDArgentina9").val();
    var precioArgentina9 = $("#txtPrecioArgentina9").val();
    var idArgentina10 = $("#txtIDArgentina10").val();
    var precioArgentina10 = $("#txtPrecioArgentina10").val();

    var estaChile = document.getElementById("toogleChile").checked;
    var idChile1 = $("#txtIDChile1").val();
    var precioChile1 = $("#txtPrecioChile1").val();
    var idChile2 = $("#txtIDChile2").val();
    var precioChile2 = $("#txtPrecioChile2").val();
    var idChile3 = $("#txtIDChile3").val();
    var precioChile3 = $("#txtPrecioChile3").val();
    var idChile4 = $("#txtIDChile4").val();
    var precioChile4 = $("#txtPrecioChile4").val();
    var idChile5 = $("#txtIDChile5").val();
    var precioChile5 = $("#txtPrecioChile5").val();
    // --- Nuevos Slots de Producto 6 al 10 ---
    var idChile6 = $("#txtIDChile6").val();
    var precioChile6 = $("#txtPrecioChile6").val();
    var idChile7 = $("#txtIDChile7").val();
    var precioChile7 = $("#txtPrecioChile7").val();
    var idChile8 = $("#txtIDChile8").val();
    var precioChile8 = $("#txtPrecioChile8").val();
    var idChile9 = $("#txtIDChile9").val();
    var precioChile9 = $("#txtPrecioChile9").val();
    var idChile10 = $("#txtIDChile10").val();
    var precioChile10 = $("#txtPrecioChile10").val();

    var obja = JSON.stringify({
        nombrePa: nombre,
        observacionPa: observacion,
        
        paisPa: "01",
        estadoPeruPa: estaPeru,
        precioPaPeru1: precioPeru1,
        precioPaPeru2: precioPeru2,
        precioPaPeru3: precioPeru3,
        precioPaPeru4: precioPeru4,
        precioPaPeru5: precioPeru5,
        precioPaPeru6: precioPeru6,
        precioPaPeru7: precioPeru7,
        precioPaPeru8: precioPeru8,
        precioPaPeru9: precioPeru9,
        precioPaPeru10: precioPeru10,
        
        paisBoliviaPa: "02",
        estadoBoliviaPa: estaBolivia,
        precioPaBolivia1: precioBolivia1,
        precioPaBolivia2: precioBolivia2,
        precioPaBolivia3: precioBolivia3,
        precioPaBolivia4: precioBolivia4,
        precioPaBolivia5: precioBolivia5,
        precioPaBolivia6: precioBolivia6,
        precioPaBolivia7: precioBolivia7,
        precioPaBolivia8: precioBolivia8,
        precioPaBolivia9: precioBolivia9,
        precioPaBolivia10: precioBolivia10,
        
        paisEcuadorPa: "03",
        estadoEcuadorPa: estaEcuador,
        precioPaEcuador1: precioEcuador1,
        precioPaEcuador2: precioEcuador2,
        precioPaEcuador3: precioEcuador3,
        precioPaEcuador4: precioEcuador4,
        precioPaEcuador5: precioEcuador5,
        precioPaEcuador6: precioEcuador6,
        precioPaEcuador7: precioEcuador7,
        precioPaEcuador8: precioEcuador8,
        precioPaEcuador9: precioEcuador9,
        precioPaEcuador10: precioEcuador10,
        
        paisPanamaPa: "07",
        estadoPanamaPa: estaPanama,
        precioPaPanama1: precioPanama1,
        precioPaPanama2: precioPanama2,
        precioPaPanama3: precioPanama3,
        precioPaPanama4: precioPanama4,
        precioPaPanama5: precioPanama5,
        precioPaPanama6: precioPanama6,
        precioPaPanama7: precioPanama7,
        precioPaPanama8: precioPanama8,
        precioPaPanama9: precioPanama9,
        precioPaPanama10: precioPanama10,
        
        paisCRPa: "06",
        estadoCRPa: estaCR,
        precioPaCR1: precioCR1,
        precioPaCR2: precioCR2,
        precioPaCR3: precioCR3,
        precioPaCR4: precioCR4,
        precioPaCR5: precioCR5,
        precioPaCR6: precioCR6,
        precioPaCR7: precioCR7,
        precioPaCR8: precioCR8,
        precioPaCR9: precioCR9,
        precioPaCR10: precioCR10,
        
        paisArgentinaPa: "04",
        estadoArgentinaPa: estaArgentina,
        precioPaArgentina1: precioArgentina1,
        precioPaArgentina2: precioArgentina2,
        precioPaArgentina3: precioArgentina3,
        precioPaArgentina4: precioArgentina4,
        precioPaArgentina5: precioArgentina5,
        precioPaArgentina6: precioArgentina6,
        precioPaArgentina7: precioArgentina7,
        precioPaArgentina8: precioArgentina8,
        precioPaArgentina9: precioArgentina9,
        precioPaArgentina10: precioArgentina10,
        
        paisChilePa: "05",
        estadoChilePa: estaChile,
        precioPaChile1: precioChile1,
        precioPaChile2: precioChile2,
        precioPaChile3: precioChile3,
        precioPaChile4: precioChile4,
        precioPaChile5: precioChile5,
        precioPaChile6: precioChile6,
        precioPaChile7: precioChile7,
        precioPaChile8: precioChile8,
        precioPaChile9: precioChile9,
        precioPaChile10: precioChile10,
        
        idPeruPa1: idPeru1,
        idPeruPa2: idPeru2,
        idPeruPa3: idPeru3,
        idPeruPa4: idPeru4,
        idPeruPa5: idPeru5,
        idPeruPa6: idPeru6,
        idPeruPa7: idPeru7,
        idPeruPa8: idPeru8,
        idPeruPa9: idPeru9,
        idPeruPa10: idPeru10,
        
        idBoliviaPa1: idBolivia1,
        idBoliviaPa2: idBolivia2,
        idBoliviaPa3: idBolivia3,
        idBoliviaPa4: idBolivia4,
        idBoliviaPa5: idBolivia5,
        idBoliviaPa6: idBolivia6,
        idBoliviaPa7: idBolivia7,
        idBoliviaPa8: idBolivia8,
        idBoliviaPa9: idBolivia9,
        idBoliviaPa10: idBolivia10,
        
        idEcuadorPa1: idEcuador1,
        idEcuadorPa2: idEcuador2,
        idEcuadorPa3: idEcuador3,
        idEcuadorPa4: idEcuador4,
        idEcuadorPa5: idEcuador5,
        idEcuadorPa6: idEcuador6,
        idEcuadorPa7: idEcuador7,
        idEcuadorPa8: idEcuador8,
        idEcuadorPa9: idEcuador9,
        idEcuadorPa10: idEcuador10,
        
        idPanamaPa1: idPanama1,
        idPanamaPa2: idPanama2,
        idPanamaPa3: idPanama3,
        idPanamaPa4: idPanama4,
        idPanamaPa5: idPanama5,
        idPanamaPa6: idPanama6,
        idPanamaPa7: idPanama7,
        idPanamaPa8: idPanama8,
        idPanamaPa9: idPanama9,
        idPanamaPa10: idPanama10,
        
        idCRPa1: idCR1,
        idCRPa2: idCR2,
        idCRPa3: idCR3,
        idCRPa4: idCR4,
        idCRPa5: idCR5,
        idCRPa6: idCR6,
        idCRPa7: idCR7,
        idCRPa8: idCR8,
        idCRPa9: idCR9,
        idCRPa10: idCR10,
        
        idArgentinaPa1: idArgentina1,
        idArgentinaPa2: idArgentina2,
        idArgentinaPa3: idArgentina3,
        idArgentinaPa4: idArgentina4,
        idArgentinaPa5: idArgentina5,
        idArgentinaPa6: idArgentina6,
        idArgentinaPa7: idArgentina7,
        idArgentinaPa8: idArgentina8,
        idArgentinaPa9: idArgentina9,
        idArgentinaPa10: idArgentina10,
        
        idChilePa1: idChile1,
        idChilePa2: idChile2,
        idChilePa3: idChile3,
        idChilePa4: idChile4,
        idChilePa5: idChile5,
        idChilePa6: idChile6,
        idChilePa7: idChile7,
        idChilePa8: idChile8,
        idChilePa9: idChile9,
        idChilePa10: idChile10
    });

    $.ajax({
        type: "POST",
        url: "GenerarPacketeProducto.aspx/RegistrarPaquete",
        data: obja,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, throwError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (response) {
            console.log(response);
            alertme();
        }
    });
}

//FUNCIONES PARA ACTUALIZAR
$(document).on('click', '.btn-update', function (e) {
    $("#btnRegistrar").hide();
    $("#btnActualizar").show();
    $("#exampleModal input[type='checkbox']").prop('checked', false).change();
    e.preventDefault();
    var row = $(this).parent().parent()[0];
    data = tabla.fnGetData(row);
    console.log(data);
    fillModalData(data);
});

function updateDataAjax() {
    
    var idpaquetePrin = data[0];
    var idpaquetePPeru = data[5];
    
    var idpaquetePBolivia = data[6];
    if (idpaquetePBolivia == null) {
        idpaquetePBolivia = "";
    }
    var idpaquetePEcuador = data[7];
    if (idpaquetePEcuador == null) {
        idpaquetePEcuador = "";
    }
    var idpaquetePPanama = data[8];
    if (idpaquetePPanama == null) {
        idpaquetePPanama = "";
    }
    var idpaquetePCR = data[9];
    if (idpaquetePCR == null) {
        idpaquetePCR = "";
    }
    var idpaquetePArgentina = data[10];
    if (idpaquetePArgentina == null) {
        idpaquetePArgentina = "";
    }
    var idpaquetePChile = data[11];
    if (idpaquetePChile == null) {
        idpaquetePChile = "";
    }

    var nombre = $("#txtNombrePaquete").val();
    var observacion = $("#txtObservacion").val();
    var estaPeru = document.getElementById("tooglePeru").checked;
    var estaBolivia = document.getElementById("toogleBolivia").checked;
    var estaEcuador = document.getElementById("toogleEcuador").checked;
    var estaPanama = document.getElementById("tooglePanama").checked;
    var estaCR = document.getElementById("toogleCR").checked;
    var estaArgentina = document.getElementById("toogleArgentina").checked;
    var estaChile = document.getElementById("toogleChile").checked;

    // PERÚ
    var idPeru1 = $("#txtIDPeru1").val(), precioPeru1 = $("#txtPrecioPeru1").val();
    var idPeru2 = $("#txtIDPeru2").val(), precioPeru2 = $("#txtPrecioPeru2").val();
    var idPeru3 = $("#txtIDPeru3").val(), precioPeru3 = $("#txtPrecioPeru3").val();
    var idPeru4 = $("#txtIDPeru4").val(), precioPeru4 = $("#txtPrecioPeru4").val();
    var idPeru5 = $("#txtIDPeru5").val(), precioPeru5 = $("#txtPrecioPeru5").val();
    var idPeru6 = $("#txtIDPeru6").val(), precioPeru6 = $("#txtPrecioPeru6").val();
    var idPeru7 = $("#txtIDPeru7").val(), precioPeru7 = $("#txtPrecioPeru7").val();
    var idPeru8 = $("#txtIDPeru8").val(), precioPeru8 = $("#txtPrecioPeru8").val();
    var idPeru9 = $("#txtIDPeru9").val(), precioPeru9 = $("#txtPrecioPeru9").val();
    var idPeru10 = $("#txtIDPeru10").val(), precioPeru10 = $("#txtPrecioPeru10").val();

    // BOLIVIA
    var idBolivia1 = $("#txtIDBolivia1").val(), precioBolivia1 = $("#txtPrecioBolivia1").val();
    var idBolivia2 = $("#txtIDBolivia2").val(), precioBolivia2 = $("#txtPrecioBolivia2").val();
    var idBolivia3 = $("#txtIDBolivia3").val(), precioBolivia3 = $("#txtPrecioBolivia3").val();
    var idBolivia4 = $("#txtIDBolivia4").val(), precioBolivia4 = $("#txtPrecioBolivia4").val();
    var idBolivia5 = $("#txtIDBolivia5").val(), precioBolivia5 = $("#txtPrecioBolivia5").val();
    var idBolivia6 = $("#txtIDBolivia6").val(), precioBolivia6 = $("#txtPrecioBolivia6").val();
    var idBolivia7 = $("#txtIDBolivia7").val(), precioBolivia7 = $("#txtPrecioBolivia7").val();
    var idBolivia8 = $("#txtIDBolivia8").val(), precioBolivia8 = $("#txtPrecioBolivia8").val();
    var idBolivia9 = $("#txtIDBolivia9").val(), precioBolivia9 = $("#txtPrecioBolivia9").val();
    var idBolivia10 = $("#txtIDBolivia10").val(), precioBolivia10 = $("#txtPrecioBolivia10").val();

    // ECUADOR
    var idEcuador1 = $("#txtIDEcuador1").val(), precioEcuador1 = $("#txtPrecioEcuador1").val();
    var idEcuador2 = $("#txtIDEcuador2").val(), precioEcuador2 = $("#txtPrecioEcuador2").val();
    var idEcuador3 = $("#txtIDEcuador3").val(), precioEcuador3 = $("#txtPrecioEcuador3").val();
    var idEcuador4 = $("#txtIDEcuador4").val(), precioEcuador4 = $("#txtPrecioEcuador4").val();
    var idEcuador5 = $("#txtIDEcuador5").val(), precioEcuador5 = $("#txtPrecioEcuador5").val();
    var idEcuador6 = $("#txtIDEcuador6").val(), precioEcuador6 = $("#txtPrecioEcuador6").val();
    var idEcuador7 = $("#txtIDEcuador7").val(), precioEcuador7 = $("#txtPrecioEcuador7").val();
    var idEcuador8 = $("#txtIDEcuador8").val(), precioEcuador8 = $("#txtPrecioEcuador8").val();
    var idEcuador9 = $("#txtIDEcuador9").val(), precioEcuador9 = $("#txtPrecioEcuador9").val();
    var idEcuador10 = $("#txtIDEcuador10").val(), precioEcuador10 = $("#txtPrecioEcuador10").val();

    // PANAMÁ
    var idPanama1 = $("#txtIDPanama1").val(), precioPanama1 = $("#txtPrecioPanama1").val();
    var idPanama2 = $("#txtIDPanama2").val(), precioPanama2 = $("#txtPrecioPanama2").val();
    var idPanama3 = $("#txtIDPanama3").val(), precioPanama3 = $("#txtPrecioPanama3").val();
    var idPanama4 = $("#txtIDPanama4").val(), precioPanama4 = $("#txtPrecioPanama4").val();
    var idPanama5 = $("#txtIDPanama5").val(), precioPanama5 = $("#txtPrecioPanama5").val();
    var idPanama6 = $("#txtIDPanama6").val(), precioPanama6 = $("#txtPrecioPanama6").val();
    var idPanama7 = $("#txtIDPanama7").val(), precioPanama7 = $("#txtPrecioPanama7").val();
    var idPanama8 = $("#txtIDPanama8").val(), precioPanama8 = $("#txtPrecioPanama8").val();
    var idPanama9 = $("#txtIDPanama9").val(), precioPanama9 = $("#txtPrecioPanama9").val();
    var idPanama10 = $("#txtIDPanama10").val(), precioPanama10 = $("#txtPrecioPanama10").val();

    // COSTA RICA (CR)
    var idCR1 = $("#txtIDCR1").val(), precioCR1 = $("#txtPrecioCR1").val();
    var idCR2 = $("#txtIDCR2").val(), precioCR2 = $("#txtPrecioCR2").val();
    var idCR3 = $("#txtIDCR3").val(), precioCR3 = $("#txtPrecioCR3").val();
    var idCR4 = $("#txtIDCR4").val(), precioCR4 = $("#txtPrecioCR4").val();
    var idCR5 = $("#txtIDCR5").val(), precioCR5 = $("#txtPrecioCR5").val();
    var idCR6 = $("#txtIDCR6").val(), precioCR6 = $("#txtPrecioCR6").val();
    var idCR7 = $("#txtIDCR7").val(), precioCR7 = $("#txtPrecioCR7").val();
    var idCR8 = $("#txtIDCR8").val(), precioCR8 = $("#txtPrecioCR8").val();
    var idCR9 = $("#txtIDCR9").val(), precioCR9 = $("#txtPrecioCR9").val();
    var idCR10 = $("#txtIDCR10").val(), precioCR10 = $("#txtPrecioCR10").val();

    // ARGENTINA
    var idArgentina1 = $("#txtIDArgentina1").val(), precioArgentina1 = $("#txtPrecioArgentina1").val();
    var idArgentina2 = $("#txtIDArgentina2").val(), precioArgentina2 = $("#txtPrecioArgentina2").val();
    var idArgentina3 = $("#txtIDArgentina3").val(), precioArgentina3 = $("#txtPrecioArgentina3").val();
    var idArgentina4 = $("#txtIDArgentina4").val(), precioArgentina4 = $("#txtPrecioArgentina4").val();
    var idArgentina5 = $("#txtIDArgentina5").val(), precioArgentina5 = $("#txtPrecioArgentina5").val();
    var idArgentina6 = $("#txtIDArgentina6").val(), precioArgentina6 = $("#txtPrecioArgentina6").val();
    var idArgentina7 = $("#txtIDArgentina7").val(), precioArgentina7 = $("#txtPrecioArgentina7").val();
    var idArgentina8 = $("#txtIDArgentina8").val(), precioArgentina8 = $("#txtPrecioArgentina8").val();
    var idArgentina9 = $("#txtIDArgentina9").val(), precioArgentina9 = $("#txtPrecioArgentina9").val();
    var idArgentina10 = $("#txtIDArgentina10").val(), precioArgentina10 = $("#txtPrecioArgentina10").val();

    // CHILE
    var idChile1 = $("#txtIDChile1").val(), precioChile1 = $("#txtPrecioChile1").val();
    var idChile2 = $("#txtIDChile2").val(), precioChile2 = $("#txtPrecioChile2").val();
    var idChile3 = $("#txtIDChile3").val(), precioChile3 = $("#txtPrecioChile3").val();
    var idChile4 = $("#txtIDChile4").val(), precioChile4 = $("#txtPrecioChile4").val();
    var idChile5 = $("#txtIDChile5").val(), precioChile5 = $("#txtPrecioChile5").val();
    var idChile6 = $("#txtIDChile6").val(), precioChile6 = $("#txtPrecioChile6").val();
    var idChile7 = $("#txtIDChile7").val(), precioChile7 = $("#txtPrecioChile7").val();
    var idChile8 = $("#txtIDChile8").val(), precioChile8 = $("#txtPrecioChile8").val();
    var idChile9 = $("#txtIDChile9").val(), precioChile9 = $("#txtPrecioChile9").val();
    var idChile10 = $("#txtIDChile10").val(), precioChile10 = $("#txtPrecioChile10").val();

    var obj = JSON.stringify({
        idPaquete: idpaquetePrin,
        nombrePa: nombre,
        observacionPa: observacion,

        idPaquetePaisPeru: idpaquetePPeru,
        idPaquetePaisBolivia: idpaquetePBolivia,
        idPaquetePaisEcuador: idpaquetePEcuador,
        idPaquetePaisPanama: idpaquetePPanama,
        idPaquetePaisCR: idpaquetePCR,
        idPaquetePaisArgentina: idpaquetePArgentina,
        idPaquetePaisChile: idpaquetePChile,

        estadoPeruPa: estaPeru,
        estadoBoliviaPa: estaBolivia,
        estadoEcuadorPa: estaEcuador,
        estadoPanamaPa: estaPanama,
        estadoCRPa: estaCR,
        estadoArgentinaPa: estaArgentina,
        estadoChilePa: estaChile,

        precioPaPeru1: precioPeru1, precioPaPeru2: precioPeru2, precioPaPeru3: precioPeru3,
        precioPaPeru4: precioPeru4, precioPaPeru5: precioPeru5,
        precioPaPeru6: precioPeru6, precioPaPeru7: precioPeru7, precioPaPeru8: precioPeru8,
        precioPaPeru9: precioPeru9, precioPaPeru10: precioPeru10,

        precioPaBolivia1: precioBolivia1, precioPaBolivia2: precioBolivia2, precioPaBolivia3: precioBolivia3,
        precioPaBolivia4: precioBolivia4, precioPaBolivia5: precioBolivia5,
        precioPaBolivia6: precioBolivia6, precioPaBolivia7: precioBolivia7, precioPaBolivia8: precioBolivia8,
        precioPaBolivia9: precioBolivia9, precioPaBolivia10: precioBolivia10,

        precioPaEcuador1: precioEcuador1, precioPaEcuador2: precioEcuador2, precioPaEcuador3: precioEcuador3,
        precioPaEcuador4: precioEcuador4, precioPaEcuador5: precioEcuador5,
        precioPaEcuador6: precioEcuador6, precioPaEcuador7: precioEcuador7, precioPaEcuador8: precioEcuador8,
        precioPaEcuador9: precioEcuador9, precioPaEcuador10: precioEcuador10,

        precioPaPanama1: precioPanama1, precioPaPanama2: precioPanama2, precioPaPanama3: precioPanama3,
        precioPaPanama4: precioPanama4, precioPaPanama5: precioPanama5,
        precioPaPanama6: precioPanama6, precioPaPanama7: precioPanama7, precioPaPanama8: precioPanama8,
        precioPaPanama9: precioPanama9, precioPaPanama10: precioPanama10,

        precioPaCR1: precioCR1, precioPaCR2: precioCR2, precioPaCR3: precioCR3,
        precioPaCR4: precioCR4, precioPaCR5: precioCR5,
        precioPaCR6: precioCR6, precioPaCR7: precioCR7, precioPaCR8: precioCR8,
        precioPaCR9: precioCR9, precioPaCR10: precioCR10,

        precioPaArgentina1: precioArgentina1, precioPaArgentina2: precioArgentina2, precioPaArgentina3: precioArgentina3,
        precioPaArgentina4: precioArgentina4, precioPaArgentina5: precioArgentina5,
        precioPaArgentina6: precioArgentina6, precioPaArgentina7: precioArgentina7, precioPaArgentina8: precioArgentina8,
        precioPaArgentina9: precioArgentina9, precioPaArgentina10: precioArgentina10,

        precioPaChile1: precioChile1, precioPaChile2: precioChile2, precioPaChile3: precioChile3,
        precioPaChile4: precioChile4, precioPaChile5: precioChile5,
        precioPaChile6: precioChile6, precioPaChile7: precioChile7, precioPaChile8: precioChile8,
        precioPaChile9: precioChile9, precioPaChile10: precioChile10,

        idPeruPa1: idPeru1, idPeruPa2: idPeru2, idPeruPa3: idPeru3, idPeruPa4: idPeru4, idPeruPa5: idPeru5,
        idPeruPa6: idPeru6, idPeruPa7: idPeru7, idPeruPa8: idPeru8, idPeruPa9: idPeru9, idPeruPa10: idPeru10,

        idBoliviaPa1: idBolivia1, idBoliviaPa2: idBolivia2, idBoliviaPa3: idBolivia3, idBoliviaPa4: idBolivia4, idBoliviaPa5: idBolivia5,
        idBoliviaPa6: idBolivia6, idBoliviaPa7: idBolivia7, idBoliviaPa8: idBolivia8, idBoliviaPa9: idBolivia9, idBoliviaPa10: idBolivia10,

        idEcuadorPa1: idEcuador1, idEcuadorPa2: idEcuador2, idEcuadorPa3: idEcuador3, idEcuadorPa4: idEcuador4, idEcuadorPa5: idEcuador5,
        idEcuadorPa6: idEcuador6, idEcuadorPa7: idEcuador7, idEcuadorPa8: idEcuador8, idEcuadorPa9: idEcuador9, idEcuadorPa10: idEcuador10,

        idPanamaPa1: idPanama1, idPanamaPa2: idPanama2, idPanamaPa3: idPanama3, idPanamaPa4: idPanama4, idPanamaPa5: idPanama5,
        idPanamaPa6: idPanama6, idPanamaPa7: idPanama7, idPanamaPa8: idPanama8, idPanamaPa9: idPanama9, idPanamaPa10: idPanama10,

        idCRPa1: idCR1, idCRPa2: idCR2, idCRPa3: idCR3, idCRPa4: idCR4, idCRPa5: idCR5,
        idCRPa6: idCR6, idCRPa7: idCR7, idCRPa8: idCR8, idCRPa9: idCR9, idCRPa10: idCR10,

        idArgentinaPa1: idArgentina1, idArgentinaPa2: idArgentina2, idArgentinaPa3: idArgentina3, idArgentinaPa4: idArgentina4, idArgentinaPa5: idArgentina5,
        idArgentinaPa6: idArgentina6, idArgentinaPa7: idArgentina7, idArgentinaPa8: idArgentina8, idArgentinaPa9: idArgentina9, idArgentinaPa10: idArgentina10,

        idChilePa1: idChile1, idChilePa2: idChile2, idChilePa3: idChile3, idChilePa4: idChile4, idChilePa5: idChile5,
        idChilePa6: idChile6, idChilePa7: idChile7, idChilePa8: idChile8, idChilePa9: idChile9, idChilePa10: idChile10
    });

    $.ajax({
        type: "POST",
        url: "GenerarPacketeProducto.aspx/ActualizarPaquete",
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
                text: 'Producto Actualizado',
                type: "success"
            }).then(function () {
                window.location = "GenerarPacketeProducto.aspx";
            });
        }
    });
}

$("#btnActualizar").click(function (e) {
    
    var nombre = $("#txtNombrePaquete").val();

    // PERÚ
    var idPeru1 = $("#txtIDPeru1").val(), precioPeru1 = $("#txtPrecioPeru1").val();
    var idPeru2 = $("#txtIDPeru2").val(), precioPeru2 = $("#txtPrecioPeru2").val();
    var idPeru3 = $("#txtIDPeru3").val(), precioPeru3 = $("#txtPrecioPeru3").val();
    var idPeru4 = $("#txtIDPeru4").val(), precioPeru4 = $("#txtPrecioPeru4").val();
    var idPeru5 = $("#txtIDPeru5").val(), precioPeru5 = $("#txtPrecioPeru5").val();
    var idPeru6 = $("#txtIDPeru6").val(), precioPeru6 = $("#txtPrecioPeru6").val();
    var idPeru7 = $("#txtIDPeru7").val(), precioPeru7 = $("#txtPrecioPeru7").val();
    var idPeru8 = $("#txtIDPeru8").val(), precioPeru8 = $("#txtPrecioPeru8").val();
    var idPeru9 = $("#txtIDPeru9").val(), precioPeru9 = $("#txtPrecioPeru9").val();
    var idPeru10 = $("#txtIDPeru10").val(), precioPeru10 = $("#txtPrecioPeru10").val();

    // BOLIVIA
    var idBolivia1 = $("#txtIDBolivia1").val(), precioBolivia1 = $("#txtPrecioBolivia1").val();
    var idBolivia2 = $("#txtIDBolivia2").val(), precioBolivia2 = $("#txtPrecioBolivia2").val();
    var idBolivia3 = $("#txtIDBolivia3").val(), precioBolivia3 = $("#txtPrecioBolivia3").val();
    var idBolivia4 = $("#txtIDBolivia4").val(), precioBolivia4 = $("#txtPrecioBolivia4").val();
    var idBolivia5 = $("#txtIDBolivia5").val(), precioBolivia5 = $("#txtPrecioBolivia5").val();
    var idBolivia6 = $("#txtIDBolivia6").val(), precioBolivia6 = $("#txtPrecioBolivia6").val(); 
    var idBolivia7 = $("#txtIDBolivia7").val(), precioBolivia7 = $("#txtPrecioBolivia7").val(); 
    var idBolivia8 = $("#txtIDBolivia8").val(), precioBolivia8 = $("#txtPrecioBolivia8").val(); 
    var idBolivia9 = $("#txtIDBolivia9").val(), precioBolivia9 = $("#txtPrecioBolivia9").val(); 
    var idBolivia10 = $("#txtIDBolivia10").val(), precioBolivia10 = $("#txtPrecioBolivia10").val();

    // ECUADOR
    var idEcuador1 = $("#txtIDEcuador1").val(), precioEcuador1 = $("#txtPrecioEcuador1").val();
    var idEcuador2 = $("#txtIDEcuador2").val(), precioEcuador2 = $("#txtPrecioEcuador2").val();
    var idEcuador3 = $("#txtIDEcuador3").val(), precioEcuador3 = $("#txtPrecioEcuador3").val();
    var idEcuador4 = $("#txtIDEcuador4").val(), precioEcuador4 = $("#txtPrecioEcuador4").val();
    var idEcuador5 = $("#txtIDEcuador5").val(), precioEcuador5 = $("#txtPrecioEcuador5").val();
    var idEcuador6 = $("#txtIDEcuador6").val(), precioEcuador6 = $("#txtPrecioEcuador6").val(); 
    var idEcuador7 = $("#txtIDEcuador7").val(), precioEcuador7 = $("#txtPrecioEcuador7").val(); 
    var idEcuador8 = $("#txtIDEcuador8").val(), precioEcuador8 = $("#txtPrecioEcuador8").val(); 
    var idEcuador9 = $("#txtIDEcuador9").val(), precioEcuador9 = $("#txtPrecioEcuador9").val(); 
    var idEcuador10 = $("#txtIDEcuador10").val(), precioEcuador10 = $("#txtPrecioEcuador10").val();

    // PANAMÁ
    var idPanama1 = $("#txtIDPanama1").val(), precioPanama1 = $("#txtPrecioPanama1").val();
    var idPanama2 = $("#txtIDPanama2").val(), precioPanama2 = $("#txtPrecioPanama2").val();
    var idPanama3 = $("#txtIDPanama3").val(), precioPanama3 = $("#txtPrecioPanama3").val();
    var idPanama4 = $("#txtIDPanama4").val(), precioPanama4 = $("#txtPrecioPanama4").val();
    var idPanama5 = $("#txtIDPanama5").val(), precioPanama5 = $("#txtPrecioPanama5").val();
    var idPanama6 = $("#txtIDPanama6").val(), precioPanama6 = $("#txtPrecioPanama6").val(); 
    var idPanama7 = $("#txtIDPanama7").val(), precioPanama7 = $("#txtPrecioPanama7").val(); 
    var idPanama8 = $("#txtIDPanama8").val(), precioPanama8 = $("#txtPrecioPanama8").val(); 
    var idPanama9 = $("#txtIDPanama9").val(), precioPanama9 = $("#txtPrecioPanama9").val(); 
    var idPanama10 = $("#txtIDPanama10").val(), precioPanama10 = $("#txtPrecioPanama10").val();

    // COSTA RICA (CR)
    var idCR1 = $("#txtIDCR1").val(), precioCR1 = $("#txtPrecioCR1").val();
    var idCR2 = $("#txtIDCR2").val(), precioCR2 = $("#txtPrecioCR2").val();
    var idCR3 = $("#txtIDCR3").val(), precioCR3 = $("#txtPrecioCR3").val();
    var idCR4 = $("#txtIDCR4").val(), precioCR4 = $("#txtPrecioCR4").val();
    var idCR5 = $("#txtIDCR5").val(), precioCR5 = $("#txtPrecioCR5").val();
    var idCR6 = $("#txtIDCR6").val(), precioCR6 = $("#txtPrecioCR6").val();
    var idCR7 = $("#txtIDCR7").val(), precioCR7 = $("#txtPrecioCR7").val();
    var idCR8 = $("#txtIDCR8").val(), precioCR8 = $("#txtPrecioCR8").val();
    var idCR9 = $("#txtIDCR9").val(), precioCR9 = $("#txtPrecioCR9").val();
    var idCR10 = $("#txtIDCR10").val(), precioCR10 = $("#txtPrecioCR10").val();

    // ARGENTINA
    var idArgentina1 = $("#txtIDArgentina1").val(), precioArgentina1 = $("#txtPrecioArgentina1").val();
    var idArgentina2 = $("#txtIDArgentina2").val(), precioArgentina2 = $("#txtPrecioArgentina2").val();
    var idArgentina3 = $("#txtIDArgentina3").val(), precioArgentina3 = $("#txtPrecioArgentina3").val();
    var idArgentina4 = $("#txtIDArgentina4").val(), precioArgentina4 = $("#txtPrecioArgentina4").val();
    var idArgentina5 = $("#txtIDArgentina5").val(), precioArgentina5 = $("#txtPrecioArgentina5").val();
    var idArgentina6 = $("#txtIDArgentina6").val(), precioArgentina6 = $("#txtPrecioArgentina6").val();
    var idArgentina7 = $("#txtIDArgentina7").val(), precioArgentina7 = $("#txtPrecioArgentina7").val();
    var idArgentina8 = $("#txtIDArgentina8").val(), precioArgentina8 = $("#txtPrecioArgentina8").val();
    var idArgentina9 = $("#txtIDArgentina9").val(), precioArgentina9 = $("#txtPrecioArgentina9").val();
    var idArgentina10 = $("#txtIDArgentina10").val(), precioArgentina10 = $("#txtPrecioArgentina10").val();

    // CHILE
    var idChile1 = $("#txtIDChile1").val(), precioChile1 = $("#txtPrecioChile1").val();
    var idChile2 = $("#txtIDChile2").val(), precioChile2 = $("#txtPrecioChile2").val();
    var idChile3 = $("#txtIDChile3").val(), precioChile3 = $("#txtPrecioChile3").val();
    var idChile4 = $("#txtIDChile4").val(), precioChile4 = $("#txtPrecioChile4").val();
    var idChile5 = $("#txtIDChile5").val(), precioChile5 = $("#txtPrecioChile5").val();
    var idChile6 = $("#txtIDChile6").val(), precioChile6 = $("#txtPrecioChile6").val();
    var idChile7 = $("#txtIDChile7").val(), precioChile7 = $("#txtPrecioChile7").val();
    var idChile8 = $("#txtIDChile8").val(), precioChile8 = $("#txtPrecioChile8").val();
    var idChile9 = $("#txtIDChile9").val(), precioChile9 = $("#txtPrecioChile9").val();
    var idChile10 = $("#txtIDChile10").val(), precioChile10 = $("#txtPrecioChile10").val();

    e.preventDefault();
    
    if (nombre == "") {
        FaltaNombre();
        // PERÚ
    } else if ((idPeru1 != "" & precioPeru1 == "0") | (idPeru1 == "" & precioPeru1 != "0") | precioPeru1 == "") {
        FaltaDatoPeru();
    } else if ((idPeru2 != "" & precioPeru2 == "0") | (idPeru2 == "" & precioPeru2 != "0") | precioPeru2 == "") {
        FaltaDatoPeru();
    } else if ((idPeru3 != "" & precioPeru3 == "0") | (idPeru3 == "" & precioPeru3 != "0") | precioPeru3 == "") {
        FaltaDatoPeru();
    } else if ((idPeru4 != "" & precioPeru4 == "0") | (idPeru4 == "" & precioPeru4 != "0") | precioPeru4 == "") {
        FaltaDatoPeru();
    } else if ((idPeru5 != "" & precioPeru5 == "0") | (idPeru5 == "" & precioPeru5 != "0") | precioPeru5 == "") {
        FaltaDatoPeru();
    } else if ((idPeru6 != "" & precioPeru6 == "0") | (idPeru6 == "" & precioPeru6 != "0") | precioPeru6 == "") {
        FaltaDatoPeru();
    } else if ((idPeru7 != "" & precioPeru7 == "0") | (idPeru7 == "" & precioPeru7 != "0") | precioPeru7 == "") {
        FaltaDatoPeru();
    } else if ((idPeru8 != "" & precioPeru8 == "0") | (idPeru8 == "" & precioPeru8 != "0") | precioPeru8 == "") {
        FaltaDatoPeru();
    } else if ((idPeru9 != "" & precioPeru9 == "0") | (idPeru9 == "" & precioPeru9 != "0") | precioPeru9 == "") {
        FaltaDatoPeru();
    } else if ((idPeru10 != "" & precioPeru10 == "0") | (idPeru10 == "" & precioPeru10 != "0") | precioPeru10 == "") {
        FaltaDatoPeru();

        // BOLIVIA
    } else if ((idBolivia1 != "" & precioBolivia1 == "0") | (idBolivia1 == "" & precioBolivia1 != "0") | precioBolivia1 == "") {
        FaltaDatoBolivia();
    } else if ((idBolivia2 != "" & precioBolivia2 == "0") | (idBolivia2 == "" & precioBolivia2 != "0") | precioBolivia2 == "") {
        FaltaDatoBolivia();
    } else if ((idBolivia3 != "" & precioBolivia3 == "0") | (idBolivia3 == "" & precioBolivia3 != "0") | precioBolivia3 == "") {
        FaltaDatoBolivia();
    } else if ((idBolivia4 != "" & precioBolivia4 == "0") | (idBolivia4 == "" & precioBolivia4 != "0") | precioBolivia4 == "") {
        FaltaDatoBolivia();
    } else if ((idBolivia5 != "" & precioBolivia5 == "0") | (idBolivia5 == "" & precioBolivia5 != "0") | precioBolivia5 == "") {
        FaltaDatoBolivia();
    } else if ((idBolivia6 != "" & precioBolivia6 == "0") | (idBolivia6 == "" & precioBolivia6 != "0") | precioBolivia6 == "") {
        FaltaDatoBolivia();
    } else if ((idBolivia7 != "" & precioBolivia7 == "0") | (idBolivia7 == "" & precioBolivia7 != "0") | precioBolivia7 == "") {
        FaltaDatoBolivia();
    } else if ((idBolivia8 != "" & precioBolivia8 == "0") | (idBolivia8 == "" & precioBolivia8 != "0") | precioBolivia8 == "") {
        FaltaDatoBolivia();
    } else if ((idBolivia9 != "" & precioBolivia9 == "0") | (idBolivia9 == "" & precioBolivia9 != "0") | precioBolivia9 == "") {
        FaltaDatoBolivia();
    } else if ((idBolivia10 != "" & precioBolivia10 == "0") | (idBolivia10 == "" & precioBolivia10 != "0") | precioBolivia10 == "") {
        FaltaDatoBolivia();

        // ECUADOR
    } else if ((idEcuador1 != "" & precioEcuador1 == "0") | (idEcuador1 == "" & precioEcuador1 != "0") | precioEcuador1 == "") {
        FaltaDatoEcuador();
    } else if ((idEcuador2 != "" & precioEcuador2 == "0") | (idEcuador2 == "" & precioEcuador2 != "0") | precioEcuador2 == "") {
        FaltaDatoEcuador();
    } else if ((idEcuador3 != "" & precioEcuador3 == "0") | (idEcuador3 == "" & precioEcuador3 != "0") | precioEcuador3 == "") {
        FaltaDatoEcuador();
    } else if ((idEcuador4 != "" & precioEcuador4 == "0") | (idEcuador4 == "" & precioEcuador4 != "0") | precioEcuador4 == "") {
        FaltaDatoEcuador();
    } else if ((idEcuador5 != "" & precioEcuador5 == "0") | (idEcuador5 == "" & precioEcuador5 != "0") | precioEcuador5 == "") {
        FaltaDatoEcuador();
    } else if ((idEcuador6 != "" & precioEcuador6 == "0") | (idEcuador6 == "" & precioEcuador6 != "0") | precioEcuador6 == "") {
        FaltaDatoEcuador();
    } else if ((idEcuador7 != "" & precioEcuador7 == "0") | (idEcuador7 == "" & precioEcuador7 != "0") | precioEcuador7 == "") {
        FaltaDatoEcuador();
    } else if ((idEcuador8 != "" & precioEcuador8 == "0") | (idEcuador8 == "" & precioEcuador8 != "0") | precioEcuador8 == "") {
        FaltaDatoEcuador();
    } else if ((idEcuador9 != "" & precioEcuador9 == "0") | (idEcuador9 == "" & precioEcuador9 != "0") | precioEcuador9 == "") {
        FaltaDatoEcuador();
    } else if ((idEcuador10 != "" & precioEcuador10 == "0") | (idEcuador10 == "" & precioEcuador10 != "0") | precioEcuador10 == "") {
        FaltaDatoEcuador();

        // PANAMÁ 
    } else if ((idPanama1 != "" & precioPanama1 == "0") | (idPanama1 == "" & precioPanama1 != "0") | precioPanama1 == "") {
        FaltaDatoPanama();
    } else if ((idPanama2 != "" & precioPanama2 == "0") | (idPanama2 == "" & precioPanama2 != "0") | precioPanama2 == "") {
        FaltaDatoPanama();
    } else if ((idPanama3 != "" & precioPanama3 == "0") | (idPanama3 == "" & precioPanama3 != "0") | precioPanama3 == "") {
        FaltaDatoPanama();
    } else if ((idPanama4 != "" & precioPanama4 == "0") | (idPanama4 == "" & precioPanama4 != "0") | precioPanama4 == "") {
        FaltaDatoPanama();
    } else if ((idPanama5 != "" & precioPanama5 == "0") | (idPanama5 == "" & precioPanama5 != "0") | precioPanama5 == "") {
        FaltaDatoPanama();
    } else if ((idPanama6 != "" & precioPanama6 == "0") | (idPanama6 == "" & precioPanama6 != "0") | precioPanama6 == "") {
        FaltaDatoPanama();
    } else if ((idPanama7 != "" & precioPanama7 == "0") | (idPanama7 == "" & precioPanama7 != "0") | precioPanama7 == "") {
        FaltaDatoPanama();
    } else if ((idPanama8 != "" & precioPanama8 == "0") | (idPanama8 == "" & precioPanama8 != "0") | precioPanama8 == "") {
        FaltaDatoPanama();
    } else if ((idPanama9 != "" & precioPanama9 == "0") | (idPanama9 == "" & precioPanama9 != "0") | precioPanama9 == "") {
        FaltaDatoPanama();
    } else if ((idPanama10 != "" & precioPanama10 == "0") | (idPanama10 == "" & precioPanama10 != "0") | precioPanama10 == "") {
        FaltaDatoPanama();

        // COSTA RICA (CR)
    } else if ((idCR1 != "" & precioCR1 == "0") | (idCR1 == "" & precioCR1 != "0") | precioCR1 == "") {
        FaltaDatoCR();
    } else if ((idCR2 != "" & precioCR2 == "0") | (idCR2 == "" & precioCR2 != "0") | precioCR2 == "") {
        FaltaDatoCR();
    } else if ((idCR3 != "" & precioCR3 == "0") | (idCR3 == "" & precioCR3 != "0") | precioCR3 == "") {
        FaltaDatoCR();
    } else if ((idCR4 != "" & precioCR4 == "0") | (idCR4 == "" & precioCR4 != "0") | precioCR4 == "") {
        FaltaDatoCR();
    } else if ((idCR5 != "" & precioCR5 == "0") | (idCR5 == "" & precioCR5 != "0") | precioCR5 == "") {
        FaltaDatoCR();
    } else if ((idCR6 != "" & precioCR6 == "0") | (idCR6 == "" & precioCR6 != "0") | precioCR6 == "") {
        FaltaDatoCR();
    } else if ((idCR7 != "" & precioCR7 == "0") | (idCR7 == "" & precioCR7 != "0") | precioCR7 == "") {
        FaltaDatoCR();
    } else if ((idCR8 != "" & precioCR8 == "0") | (idCR8 == "" & precioCR8 != "0") | precioCR8 == "") {
        FaltaDatoCR();
    } else if ((idCR9 != "" & precioCR9 == "0") | (idCR9 == "" & precioCR9 != "0") | precioCR9 == "") {
        FaltaDatoCR();
    } else if ((idCR10 != "" & precioCR10 == "0") | (idCR10 == "" & precioCR10 != "0") | precioCR10 == "") {
        FaltaDatoCR();

        // ARGENTINA
    } else if ((idArgentina1 != "" & precioArgentina1 == "0") | (idArgentina1 == "" & precioArgentina1 != "0") | precioArgentina1 == "") {
        FaltaDatoArgentina();
    } else if ((idArgentina2 != "" & precioArgentina2 == "0") | (idArgentina2 == "" & precioArgentina2 != "0") | precioArgentina2 == "") {
        FaltaDatoArgentina();
    } else if ((idArgentina3 != "" & precioArgentina3 == "0") | (idArgentina3 == "" & precioArgentina3 != "0") | precioArgentina3 == "") {
        FaltaDatoArgentina();
    } else if ((idArgentina4 != "" & precioArgentina4 == "0") | (idArgentina4 == "" & precioArgentina4 != "0") | precioArgentina4 == "") {
        FaltaDatoArgentina();
    } else if ((idArgentina5 != "" & precioArgentina5 == "0") | (idArgentina5 == "" & precioArgentina5 != "0") | precioArgentina5 == "") {
        FaltaDatoArgentina();
    } else if ((idArgentina6 != "" & precioArgentina6 == "0") | (idArgentina6 == "" & precioArgentina6 != "0") | precioArgentina6 == "") {
        FaltaDatoArgentina();
    } else if ((idArgentina7 != "" & precioArgentina7 == "0") | (idArgentina7 == "" & precioArgentina7 != "0") | precioArgentina7 == "") {
        FaltaDatoArgentina();
    } else if ((idArgentina8 != "" & precioArgentina8 == "0") | (idArgentina8 == "" & precioArgentina8 != "0") | precioArgentina8 == "") {
        FaltaDatoArgentina();
    } else if ((idArgentina9 != "" & precioArgentina9 == "0") | (idArgentina9 == "" & precioArgentina9 != "0") | precioArgentina9 == "") {
        FaltaDatoArgentina();
    } else if ((idArgentina10 != "" & precioArgentina10 == "0") | (idArgentina10 == "" & precioArgentina10 != "0") | precioArgentina10 == "") {
        FaltaDatoArgentina();

        // CHILE
    } else if ((idChile1 != "" & precioChile1 == "0") | (idChile1 == "" & precioChile1 != "0") | precioChile1 == "") {
        FaltaDatoChile();
    } else if ((idChile2 != "" & precioChile2 == "0") | (idChile2 == "" & precioChile2 != "0") | precioChile2 == "") {
        FaltaDatoChile();
    } else if ((idChile3 != "" & precioChile3 == "0") | (idChile3 == "" & precioChile3 != "0") | precioChile3 == "") {
        FaltaDatoChile();
    } else if ((idChile4 != "" & precioChile4 == "0") | (idChile4 == "" & precioChile4 != "0") | precioChile4 == "") {
        FaltaDatoChile();
    } else if ((idChile5 != "" & precioChile5 == "0") | (idChile5 == "" & precioChile5 != "0") | precioChile5 == "") {
        FaltaDatoChile();
    } else if ((idChile6 != "" & precioChile6 == "0") | (idChile6 == "" & precioChile6 != "0") | precioChile6 == "") {
        FaltaDatoChile();
    } else if ((idChile7 != "" & precioChile7 == "0") | (idChile7 == "" & precioChile7 != "0") | precioChile7 == "") {
        FaltaDatoChile();
    } else if ((idChile8 != "" & precioChile8 == "0") | (idChile8 == "" & precioChile8 != "0") | precioChile8 == "") {
        FaltaDatoChile();
    } else if ((idChile9 != "" & precioChile9 == "0") | (idChile9 == "" & precioChile9 != "0") | precioChile9 == "") {
        FaltaDatoChile();
    } else if ((idChile10 != "" & precioChile10 == "0") | (idChile10 == "" & precioChile10 != "0") | precioChile10 == "") {
        FaltaDatoChile();
    } else {
        updateDataAjax();
    }
});

//ALERTAS
function alertme() {
    Swal.fire({
        title: 'Perfecto!',
        text: 'Paquete Registrado',
        type: "success"
    }).then(function () {
        window.location = "GenerarPacketeProducto.aspx";
    });
}
function FaltaNombre() {
    Swal.fire({
        title: 'Ooops...!',
        text: 'No registró el nombre del paquete',
        type: "error"
    });
}
function FaltaDatoPeru() {
    Swal.fire({
        title: 'Ooops...!',
        text: 'No registró un dato del paquete Perú',
        type: "error"
    });
}
function FaltaDatoBolivia() {
    Swal.fire({
        title: 'Ooops...!',
        text: 'No registró un dato del paquete Bolivia',
        type: "error"
    });
}
function FaltaDatoEcuador() {
    Swal.fire({
        title: 'Ooops...!',
        text: 'No registró un dato del paquete Ecuador',
        type: "error"
    });
}
function FaltaDatoPanama() {
    Swal.fire({
        title: 'Ooops...!',
        text: 'No registró un dato del paquete Panama',
        type: "error"
    });
}
function FaltaDatoCR() {
    Swal.fire({
        title: 'Ooops...!',
        text: 'No registró un dato del paquete Costa Rica',
        type: "error"
    });
}
function FaltaDatoArgentina() {
    Swal.fire({
        title: 'Ooops...!',
        text: 'No registró un dato del paquete Argentina',
        type: "error"
    });
}
function FaltaDatoChile() {
    Swal.fire({
        title: 'Ooops...!',
        text: 'No registró un dato del paquete Chile',
        type: "error"
    });
}

sendDataAjax();