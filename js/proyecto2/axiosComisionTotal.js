//getIdcliente();
//function getIdcliente() {
//    let body = {};
//    axios.post('Index.aspx/GetIdCliente', body)
//        .then(response => {

//            console.log(response);
//            getInfoForComisionTotal(response.data.d);
//        })
//        .catch(error => console.error(error));

//}
//function getInfoForComisionTotal(idCliente) {
//    let body = {
//        "idCliente": idCliente
//    }
//    axios.post('https://api.mundosantanatura.com/api/Room/GetTotal_Comission', body)
//        .then(response => {
//            let comision = response.data.data;
//            let comisionParseado = comision.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//            let valorComisionTotal = document.getElementById('valorComisionTotal');
//            let puntosViajes = document.getElementById('puntosViajes');
//            if (!!valorComisionTotal) {
//                valorComisionTotal.innerHTML = `<span class='moneda'>S/ </span>${comisionParseado}`;
//            }
//            if (!!puntosViajes) {
//                puntosViajes.innerHTML = `<span class='moneda'>S/ </span>0`;
//            }
//        })
//        .catch(error => console.error(error));
//}

//Cambio de axios a fetch
function isUserLoggedIn() {
    return document.cookie.split(';').some(cookie => cookie.trim().startsWith('.ASPXAUTH='));//Verifica si existe la cookie .ASPXAUTH, típica de autenticación en ASP.NET WebForms
}

if (!window.location.pathname.toLowerCase().includes("Login.aspx")) {//Si estás en cualquier otra página, se ejecuta getIdcliente()
    getIdcliente();
}

function getIdcliente() {
    let body = {};
    fetch('Index.aspx/GetIdCliente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .then(data => {
            const idCliente = data?.d;
            if (!idCliente || idCliente.trim() === "") {
                console.warn("Sesión expirada o ID de cliente inválido.");

                // Mostrar alerta con SweetAlert
                Swal.fire({
                    icon: 'warning',
                    title: 'Sesión expirada',
                    text: 'Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.',
                    confirmButtonText: 'Aceptar',
                    allowOutsideClick: false
                }).then(() => {
                    window.location.href = 'Login.aspx';
                });

                return;
            }

            getInfoForComisionTotal(idCliente);
        })
        .catch(error => {
            console.error('Error al obtener el ID del cliente:', error);
            if (isUserLoggedIn()) {
                alert('Ocurrió un problema al validar tu sesión. Serás redirigido.');
                window.location.href = 'Login.aspx';
            }
        });
}

function getInfoForComisionTotal(idCliente) {
    let body = {
        "idCliente": idCliente
    };
    fetch('https://api.mundosantanatura.com/api/Room/GetTotal_Comission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .then(data => {
            let comision = data.data;
            let comisionParseado = comision.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            let valorComisionTotal = document.getElementById('valorComisionTotal');
            let puntosViajes = document.getElementById('puntosViajes');
            if (!!valorComisionTotal) {
                valorComisionTotal.innerHTML = `<span class='moneda'>S/ </span>${comisionParseado}`;
            }
            if (!!puntosViajes) {
                puntosViajes.innerHTML = `<span class='moneda'>S/ </span>0`;
            }
        })
        .catch(error => console.error('Error al obtener la comisión total:', error));
}