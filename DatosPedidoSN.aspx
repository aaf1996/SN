<%@ Page Title="" Language="C#" MasterPageFile="~/Home.Master" AutoEventWireup="true" CodeBehind="DatosPedidoSN.aspx.cs" Inherits="SantaNaturaNetworkV3.DatosPedidoSN" ClientIDMode="Static" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="../css/proyecto2/datosPedidoSN.css?v3" rel="stylesheet" />
    <style>
        .fondoPopupDatosPedido {
            position: absolute;
            top: 0;
            z-index: -9;
            width: calc(100vw - 9px);
            height: 100vh;
            background-color: rgba(47, 79, 79, .9);
            opacity: 0;
            transition: opacity 300ms ease-in-out 0ms;
        }

            .fondoPopupDatosPedido.active {
                opacity: 1;
                z-index: 999;
                width: 100vw;
                transition: opacity 300ms ease-in-out 0ms;
            }

        .popupDatosPedido {
            position: fixed;
            top: -150%;
            left: 50%;
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0;
            background: rgba(255,255,255,.2);
            border: 1px solid rgba(255,255,255,.15);
            box-shadow: inset 0 0 20px 5px rgba(255,255,255,.05);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            width: 30%;
            min-width: 280px;
            padding: 20px 30px;
            border-radius: 10px;
            z-index: 1000;
            transition: top 0ms ease-in-out 300ms, opacity 300ms ease-in-out 0ms, transform 300ms ease-in-out 0ms;
        }

            .popupDatosPedido.active {
                top: 50%;
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
                transition: top 0ms ease-in-out 0ms, opacity 300ms ease-in-out 0ms, transform 300ms ease-in-out 0ms;
            }

            .popupDatosPedido .close-btn {
                position: absolute;
                top: 10px;
                right: 10px;
                width: 25px;
                height: 25px;
                font-size: 18px;
                text-align: center;
                line-height: 25px;
                color: #fdfdfd;
                background: rgba(255,255,255,.15);
                border-radius: 50%;
                cursor: pointer;
            }

            .popupDatosPedido h1 {
                font-size: 32px;
                text-align: center;
                margin: 10px 0 20px;
                color: #fff;
            }

            .popupDatosPedido p {
                color: #fdfdfd;
                font-size: 14px;
                text-align: center;
            }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section class="sectionDatosPedidos">
        <section class="sectionDatosPedidos__title">
            <h1>Vivir bien <span>está en nuestras raíces</span></h1>
        </section>
        <main class="sectionDatosPedidos__body">
            <div class="sectionDatosPedidos__body__titulo">
                <h1>Seleccionar Sumaq Wasi</h1>
            </div>
            <div class="sectionDatosPedidos__body__tipoDeCompra" style="display:none;">
                <%--<div id="divCboTipoCompra" runat="server">
                    <div>
                        <div>
                            <asp:Label ID="Label11" runat="server" Text="Tipo de compra"></asp:Label>
                        </div>
                    </div>
                    <div>
                        <select id="STipoCompra">
                        </select>
                    </div>
                </div>--%>
                <div>
                    <label>Tipo de Compra (*)</label>
                    <select runat="server" id="selectTipoCliente">
                    </select>
                </div>
            </div>
            <div class="sectionDatosPedidos__body__yachaywasi">
                <div class="divSelects">
                    <div>
                        <label>Departamento</label>
                        <select runat="server" id="selectDepartamento">
                        </select>
                    </div>
                    <div>
                        <label>Distrito</label>
                        <select runat="server" id="selectDistrito">
                        </select>
                    </div>
                    <div>
                        <label>Sumaq Wasi(*)</label>
                        <select runat="server" id="selectYachayWasi">
                        </select>
                    </div>
                </div>
                <div class="divLabels">
                    <label>Dirección: <span id="spanDireccion">No hay datos disponibles</span></label>
                    <label>Celular: <span id="spanCelular">No hay datos disponibles</span></label>
                </div>
            </div>
            <div class="sectionDatosPedidos__body__btnContinuar">
                <a id="btnContinuar" aria-haspopup="true" aria-expanded="false" onclick="irTienda()" href="#">CONTINUAR</a>
            </div>
            <div class="sectionDatosPedidos__body__msj">
                <label>(*) El campo es Obligatorio para continuar</label>
            </div>
        </main>
    </section>
    <div class="fondoPopupDatosPedido">
        <div class="popupDatosPedido">
            <div class="close-btn">&times;</div>
            <h1>Ooops...!</h1>
            <%--<p>Debe seleccionar todos los datos de la compra</p>--%>
            <p></p>
        </div>
    </div>

    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="js/DatosPedido.js?v2" type="text/javascript"></script>
    <script type="text/javascript">
        //console.log('antes de consumir')
        //const realizarPeticion = async() => {
        //    const res = await fetch('EditarPerfil.aspx/GetDepartamentosByPais')
        //    const data = await res.json();
        //    console.log(data);
        //    //.then((response) => response.json())
        //    //.then((data) => console.log(data));
        //}
        //realizarPeticion();

        //// Ejemplo implementando el metodo POST:
        //async function postData(url = 'EditarPerfil.aspx/GetDepartamentosByPais', data = '01') {
        //    // Opciones por defecto estan marcadas con un *
        //    const response = await fetch(url, {
        //        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        //        mode: 'cors', // no-cors, *cors, same-origin
        //        credentials: 'same-origin', // include, *same-origin, omit
        //        headers: {
        //            'Content-Type': 'application/json'
        //        },
        //        redirect: 'follow', // manual, *follow, error
        //        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        //        body: JSON.stringify(data) // body data type must match "Content-Type" header
        //    });
        //    const datos = await response.json(); // parses JSON response into native JavaScript objects
        //    console.log(datos);
        //}
        //postData();


        const selectDepartamento = document.getElementById("selectDepartamento");
        selectDepartamento.addEventListener('change', (event) => {
            //getYachaywasiXDistrito();
            let selectYachayWasi = document.getElementById("selectYachayWasi");

            // Limpiar opciones de YachayWasi
            while (selectYachayWasi.firstChild) {
                selectYachayWasi.removeChild(selectYachayWasi.firstChild);
            }

            // Agregar la opción por defecto
            var option = document.createElement("option");
            option.value = '000';
            option.text = 'Seleccione:';
            selectYachayWasi.add(option);

            getDistritoXDepartamento();// Obtener distritos según el departamento seleccionado
            getDatosXYachaywasi();

            // Si se selecciona la opción "Seleccione" (000), ejecutar getYachaywasiXDistrito()
            if (event.target.value === '000') {
                getYachaywasiXDistrito('seleccione');
            }
        });

        const selectDistrito = document.getElementById("selectDistrito");
        selectDistrito.addEventListener('change', (event) => {
            getYachaywasiXDistrito('otroValor');
        });

        //const getDepartamentosXPais = () => {
        //    const data = {
        //        "pais": '01'
        //    }
        //    axios.post('Autocompletado.asmx/ListaDepartamento_YW', data)
        //        .then(response => {
        //            //console.log(response.data.d);
        //            const lista = response.data.d;
        //            //console.log(typeof lista);
        //            var cboDepartamento = document.getElementById("selectDepartamento");
        //            var option = document.createElement("option");
        //            option.value = '000';
        //            option.text = 'Seleccione:';
        //            cboDepartamento.add(option);
        //            lista.forEach(dep => {
        //                //console.log(dep.Nombre);
        //                var option2 = document.createElement("option");
        //                option2.value = dep.Codigo;
        //                option2.text = dep.Nombre;
        //                cboDepartamento.add(option2);
        //            });
        //        })
        //        .catch(error => console.error(error));
        //};
        //getDepartamentosXPais();

        const getDepartamentosXPais = () => {
            const data = { pais: '01' };

            fetch('Autocompletado.asmx/ListaDepartamento_YW', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(response => response.json()) // Convertir respuesta a JSON
                .then(response => {
                    const lista = response.d;
                    const cboDepartamento = document.getElementById("selectDepartamento");

                    // Limpiar el select antes de agregar nuevas opciones
                    cboDepartamento.innerHTML = '';

                    // Opción por defecto
                    const option = document.createElement("option");
                    option.value = '000';
                    option.text = 'Seleccione:';
                    cboDepartamento.add(option);

                    // Agregar departamentos
                    lista.forEach(dep => {
                        const option2 = document.createElement("option");
                        option2.value = dep.Codigo;
                        option2.text = dep.Nombre;
                        cboDepartamento.add(option2);
                    });
                })
                .catch(error => console.error(error));
        };

        getDepartamentosXPais();

        //function getDistritoXDepartamento() {
        //    var cboDepartamento = document.getElementById("selectDepartamento").value;
        //    //console.log(cboDepartamento);
        //    const data = {
        //        "departamento": cboDepartamento
        //    }
        //    axios.post('Autocompletado.asmx/ListarDistrito_by_Departamento_YW', data)
        //        .then(response => {
        //            //console.log(response.data.d);
        //            const lista = response.data.d;
        //            //console.log(typeof lista);
        //            let selectDistrito = document.getElementById("selectDistrito");
        //            while (selectDistrito.firstChild) {
        //                selectDistrito.removeChild(selectDistrito.firstChild);
        //            }
        //            var option = document.createElement("option");
        //            option.value = '000';
        //            option.text = 'Seleccione:';
        //            selectDistrito.add(option);
        //            lista.forEach(dep => {
        //                //console.log(dep.Nombre);
        //                var option2 = document.createElement("option");
        //                option2.value = dep.Codigo;
        //                option2.text = dep.Nombre;
        //                selectDistrito.add(option2);
        //            })
        //        })
        //        .catch(error => console.error(error));
        //};
        //getDistritoXDepartamento();

        function getDistritoXDepartamento() {
            const cboDepartamento = document.getElementById("selectDepartamento").value;

            const data = { departamento: cboDepartamento };

            fetch('Autocompletado.asmx/ListarDistrito_by_Departamento_YW', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(response => response.json()) // Convertir la respuesta a JSON
                .then(response => {
                    const lista = response.d;
                    const selectDistrito = document.getElementById("selectDistrito");

                    // Limpiar select antes de agregar nuevas opciones
                    selectDistrito.innerHTML = '';

                    // Agregar opción por defecto
                    const option = document.createElement("option");
                    option.value = '000';
                    option.text = 'Seleccione:';
                    selectDistrito.add(option);

                    // Agregar distritos
                    lista.forEach(dep => {
                        const option2 = document.createElement("option");
                        option2.value = dep.Codigo;
                        option2.text = dep.Nombre;
                        selectDistrito.add(option2);
                    });
                })
                .catch(error => console.error(error));
        }

        getDistritoXDepartamento();

        //function getYachaywasiXDistrito() {
        //    var cboDistrito = document.getElementById("selectDistrito").value;
        //    //console.log(cboDistrito);
        //    const data = {
        //        "distrito": cboDistrito
        //    }
        //    axios.post('Autocompletado.asmx/ListaYW_by_Distrito', data)
        //        .then(response => {
        //            //console.log(response.data.d);
        //            const lista = response.data.d;
        //            //console.log(typeof lista);
        //            let selectYachayWasi = document.getElementById("selectYachayWasi");
        //            while (selectYachayWasi.firstChild) {
        //                selectYachayWasi.removeChild(selectYachayWasi.firstChild);
        //            }
        //            var option = document.createElement("option");
        //            option.value = '000';
        //            option.text = 'Seleccione:';
        //            selectYachayWasi.add(option);
        //            lista.forEach(dep => {
        //                console.log(dep);
        //                var option2 = document.createElement("option");
        //                option2.value = dep.IdPeruShop;
        //                option2.text = dep.apodo;
        //                selectYachayWasi.add(option2);
        //            })
        //        })
        //        .catch(error => console.error(error));
        //};
        //getYachaywasiXDistrito();

        function getYachaywasiXDistrito(optionSelected) {
            let cboDistrito = '';
            if (optionSelected === 'seleccione') {
                cboDistrito = '';
            } else {
                cboDistrito = document.getElementById("selectDistrito").value;
            }

            const data = { distrito: cboDistrito };

            fetch('Autocompletado.asmx/ListaYW_by_Distrito', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(response => response.json()) // Convertir la respuesta a JSON
                .then(response => {
                    const lista = response.d;
                    const selectYachayWasi = document.getElementById("selectYachayWasi");

                    // Limpiar select antes de agregar nuevas opciones
                    selectYachayWasi.innerHTML = '';

                    // Agregar opción por defecto
                    const option = document.createElement("option");
                    option.value = '000';
                    option.text = 'Seleccione:';
                    selectYachayWasi.add(option);

                    // Ordenar la lista alfabéticamente por el campo 'apodo'
                    lista.sort((a, b) => {
                        const apodoA = a.apodo.toLowerCase();
                        const apodoB = b.apodo.toLowerCase();
                        if (apodoA < apodoB) return -1; // Si apodoA es menor, va primero
                        if (apodoA > apodoB) return 1;  // Si apodoA es mayor, va después
                        return 0;  // Si son iguales, no cambia el orden
                    });

                    // Agregar opciones de Yachaywasi
                    lista.forEach(dep => {
                        //console.log(dep);
                        const option2 = document.createElement("option");
                        option2.value = dep.IdPeruShop;
                        option2.text = dep.apodo;
                        selectYachayWasi.add(option2);
                    });
                })
                .catch(error => console.error(error));
        }

        getYachaywasiXDistrito('seleccione');


        //function getDatosXYachaywasi() {
        //    var selectYachayWasi = document.getElementById("selectYachayWasi").value;
        //    const data = {
        //        "id": selectYachayWasi
        //    }
        //    axios.post('Autocompletado.asmx/Lista_Datos_YW_by_id', data)
        //        .then(response => {
        //            const spanDireccion = document.getElementById('spanDireccion');
        //            const spanCelular = document.getElementById('spanCelular');
        //            if (spanDireccion.textContent !== "" || spanCelular.textContent !== "") {

        //                spanDireccion.textContent = response.data.d[0].direccion;
        //                spanCelular.textContent = response.data.d[0].celular;
        //            } else {

        //                spanDireccion.textContent === "";
        //                spanCelular.textContent === "";
        //                spanDireccion.textContent = response.data.d[0].direccion;
        //                spanCelular.textContent = response.data.d[0].celular;
        //            }
        //        })
        //        .catch(error => console.error(error));
        //};
        
        //const selectYachayWasi = document.getElementById("selectYachayWasi");
        //selectYachayWasi.addEventListener('change', (event) => {
        //    getDatosXYachaywasi();
        //});

        function getDatosXYachaywasi() {
            const selectYachayWasi = document.getElementById("selectYachayWasi");
            const selectYachayWasiValue = selectYachayWasi.value;  // Obtener el valor del select

            const data = { id: selectYachayWasiValue };

            fetch('Autocompletado.asmx/Lista_Datos_YW_by_id', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(response => response.json()) // Convertir la respuesta a JSON
                .then(response => {
                    const spanDireccion = document.getElementById('spanDireccion');
                    const spanCelular = document.getElementById('spanCelular');

                    if (response.d.length > 0) {  // Verificamos que haya datos en la respuesta
                        spanDireccion.textContent = response.d[0].direccion || "Sin dirección disponible";
                        spanCelular.textContent = response.d[0].celular || "Sin celular disponible";
                    } else {
                        spanDireccion.textContent = "No hay datos disponibles";
                        spanCelular.textContent = "No hay datos disponibles";
                    }
                })
                .catch(error => console.error(error));

            // Comprobar si el valor del select es "000" (opción "Seleccione")
            if (selectYachayWasiValue === '000' || selectYachayWasiValue === '') {
                // Añadir la clase 'pulsando' para la animación cuando se selecciona "Seleccione"
                selectYachayWasi.classList.add('pulsando');

                // con [0] nos aseguramos de que estamos manipulando el primer elemento de la colección
                document.getElementById("btnContinuar").classList.remove('pulsando');
            } else {
                // Quitar la clase 'pulsando' cuando se selecciona cualquier otra opción
                selectYachayWasi.classList.remove('pulsando');

                // con [0] nos aseguramos de que estamos manipulando el primer elemento de la colección
                document.getElementById("btnContinuar").classList.add('pulsando');
            }
        }

        // Agregar evento al select para ejecutar la función cuando cambie la selección
        document.getElementById("selectYachayWasi").addEventListener('change', getDatosXYachaywasi);


        

        // Para aplicar la animación cuando se carga la página si el valor es "000"
        if (document.getElementById("selectYachayWasi").value === '000' || document.getElementById("selectYachayWasi").value === '') {
            document.getElementById("selectYachayWasi").classList.add('pulsando');
        }

        //axios({
        //    method: "post",
        //    url: "EditarPerfil.aspx/GetDepartamentosByPais",
        //    data: {
        //        "pais":'01'
        //    },
        //    headers: { "Content-Type": "application/json" },
        //})
        //    .then(function (response) {
        //        //handle success
        //        console.log(response);
        //    })
        //    .catch(function (response) {
        //        //handle error
        //        console.log(response);
        //    });

        //function irCarrito() {
        //    var cMPago = $("#SMedioPago").val();
        //    var cCom = $('#STipoCompra').val();
        //    var cTienda = $('#ComboTienda').val();
        //    if (cCom != '0' && cTienda != '0' && cMPago != '0') {
        //        $.ajax({
        //            type: "POST",
        //            url: "TiendaSN.aspx/CantidadProdCarrito",
        //            data: "{}",
        //            contentType: 'application/json; charset=utf-8',
        //            error: function (xhr, ajaxOptions, throwError) {
        //                console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        //            },
        //            success: function (dataS) {
        //                if (dataS.d == "") {
        //                    location.href = "DetalleDeCompra.aspx";
        //                }
        //                else {
        //                    Swal.fire({
        //                        title: 'Ooops...!',
        //                        text: dataS.d,
        //                        icon: "error"
        //                    });
        //                }
        //            }
        //        });
        //    } else {
        //        Swal.fire({
        //            title: 'Ooops...!',
        //            text: 'Debe seleccionar todos los datos de la compra',
        //            icon: "error"
        //        });
        //    }

        //}

        function irTienda() {
            console.log('entré en irTienda');
            const selectTipoCliente = document.getElementById("selectTipoCliente").value;
            const selectYachayWasi = document.getElementById("selectYachayWasi").value;
            if (selectTipoCliente != '0' && selectYachayWasi != '000') {
                console.log('entré en selectTipoCliente != 0 && selectYachayWasi != 0');
                const data = {
                    "codProductoCarrito": 'P0521',
                    "cantidadProductos": '2'
                }
                //axios.post('TiendaSN.aspx/AgregarProducto', data)
                //    .then(response => {
                //        console.log('entré en then');
                //        console.log(response);
                //        if (response.data.d.Mensaje === "OK") {
                //            console.log('entré en response.data.d.Mensaje === OK');
                //            location.href = "TiendaSN.aspx";
                //        } else {
                //            document.querySelector('.fondoPopupDatosPedido').classList.add('active');
                //            document.querySelector('.popupDatosPedido').classList.add('active');                            
                //            document.querySelector('.popupDatosPedido p').textContent = response.data.d.Mensaje;
                //            document.getElementById('body').style.overflow = 'hidden';
                //        }
                //    })
                //    .catch(error => console.error(error));
                location.href = "TiendaSN.aspx";
            } else {
                console.log('entré en else');
                document.querySelector('.fondoPopupDatosPedido').classList.add('active');
                document.querySelector('.popupDatosPedido p').textContent = 'Debe seleccionar todos los datos de la compra.';
                document.querySelector('.popupDatosPedido').classList.add('active');
                document.getElementById('body').style.overflow = 'hidden';
            }
        }
        document.querySelector('.popupDatosPedido .close-btn').addEventListener('click', function () {
            document.querySelector('.popupDatosPedido').classList.remove('active');
            document.querySelector('.fondoPopupDatosPedido').classList.remove('active');
        })

        //Para que el menu del navbar se quede de un color cuando esté seleccionado
        window.onload = function () {
            if (window.innerWidth < 1148) {
                //document.getElementById("liTienda").style.background = '#E8E8E8';

                document.getElementById("idMenuTienda").style.color = 'white';
                //document.getElementById("idMenuTienda").style.fontWeight = '700';
                document.getElementById("idMenuTienda").classList.add("peso700");
                document.getElementById("idSubMenuTienda").style.fontWeight = "700";


                //var naranja = document.getElementById("navtienda2");
                //naranja.classList.add('menu__item--active2');
            }
            else {
                document.getElementById("idMenuTienda").style.color = 'var(--Primary-green)';
                document.getElementById("idMenuTienda").style.borderBottom = '3px solid var(--Primary-green)';
                document.getElementById("idMenuTienda").style.fontWeight = "600";
                document.getElementById("idSubMenuTienda").style.color = '#fff';
                document.getElementById("idSubMenuTienda").style.fontWeight = "700";
            }
        }

    </script>
</asp:Content>
