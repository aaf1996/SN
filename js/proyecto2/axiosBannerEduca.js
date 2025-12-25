//getInfoImagenForBanner();
//function getInfoImagenForBanner() {
//    axios.post('https://api.mundosantanatura.com/api/Room/GetActive_PopUp', {})
//        .then(response => {
//            console.log(response);
//            const imgName = response.data.data;
//            //console.log(typeof lista);
//            let imgPopup = document.getElementById("imgPopup");
//            if (!!imgPopup) {
//                imgPopup.src = 'https://tienda.mundosantanatura.com/popups/' + imgName;
//            }
//            $(".sectionLoader").fadeOut("slow");//fadeIn: ocultamos el objeto, slow: velocidad de la duración del efecto
//        })
//        .catch(error => console.error(error));
//}
function isUserLoggedIn() {
    return document.cookie.split(';').some(cookie => cookie.trim().startsWith('.ASPXAUTH='));//Verifica si existe la cookie .ASPXAUTH, típica de autenticación en ASP.NET WebForms
}
//Cambio de axios a fetch
getInfoImagenForBanner();

async function getInfoImagenForBanner() {
    try {
        // 1. Obtener el nombre del cliente
        const idClienteRes = await fetch('Index.aspx/GetIdCliente', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        });
        console.log(idClienteRes);
        if (!idClienteRes.ok) throw new Error(`Error obteniendo nombre: ${idClienteRes.status}`);
        const idClienteData = await idClienteRes.json();
        const idCli = idClienteData.d;
        console.log(idCli);

        // 1. Obtener el nombre del cliente
        const nombreRes = await fetch('Index.aspx/GetNombreCliente', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        });
        console.log(nombreRes);
        if (!nombreRes.ok) throw new Error(`Error obteniendo nombre: ${nombreRes.status}`);
        const nombreData = await nombreRes.json();

        let nombreSocio = ''; 

        if (idCli === "C000464") { //CARMEN JULIA RONCALLA ORURO
            nombreSocio = 'JULIA ORURO';
        } else if (idCli === "C000300") { //TEODORA QUISPE SONCCO
            nombreSocio = 'LORENS QUISPE';
        } else {
            nombreSocio = nombreData.d;
        }
        console.log(nombreSocio);

        // 2. Obtener el género del cliente
        const generoRes = await fetch('Index.aspx/GetGeneroCliente', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        });
        console.log(generoRes);
        if (!generoRes.ok) throw new Error(`Error obteniendo genero: ${generoRes.status}`);
        const generoData = await generoRes.json();
        const generoSocio = generoData.d;
        console.log(generoSocio);

        // 3. Obtener información del popup
        const popupRes = await fetch('https://api.mundosantanatura.com/api/Room/GetActive_PopUp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        console.log(popupRes);
        if (!popupRes.ok) throw new Error(`Error obteniendo imagen popup: ${popupRes.status}`);
        const popupData = await popupRes.json();
        const imgName = popupData.data; // suponiendo que viene como objeto con clave "img"
        console.log(imgName);
        const imgPopup = document.getElementById("imgPopup");
        const popupText = document.getElementById("popupText");

        // Generar texto dinámico si no viene del API
        const texto = `¡${generoSocio === 'MASCULINO' ? 'Bienvenido' : 'Bienvenida'} de vuelta, ${nombreSocio}!`;

        if (imgName) {
            // ✅ Mostrar imagen
            imgPopup.src = `https://tienda.mundosantanatura.com/popups/${imgName}`;
            imgPopup.style.display = "block";
            if (popupText) popupText.style.display = "none";
        } else {
            // ❌ Mostrar texto con efecto máquina de escribir
            imgPopup.style.display = "none";
            if (popupText) {
                popupText.style.display = "block";
                popupText.textContent = ""; // Limpiar primero
                escribirTexto(popupText, texto, 50); // Velocidad: 50ms
            }
        }

        // Ocultar loader
        $(".sectionLoader").fadeOut("slow");

    } catch (error) {
        console.error("Error al obtener información del banner:", error);
        if (isUserLoggedIn()) {
            alert('Ocurrió un problema al validar tu sesión. Serás redirigido.');
            window.location.href = 'Login.aspx';
        }
    }
}

// Función para escribir el texto letra por letra
function escribirTexto(elemento, texto, velocidad) {
    let i = 0;
    function escribir() {
        if (i < texto.length) {
            elemento.textContent += texto.charAt(i);
            i++;
            setTimeout(escribir, velocidad);
        }
    }
    escribir();
}

// Obtiene el modal
var modal = document.getElementById("modal");

// Obtiene el elemento <span> que cierra el modal
var span = document.getElementById("cerrar");

if (!!modal && !!span) {
    // Cuando el usuario haga clic en <span> (x), cierre el modal
    span.onclick = function () {
        modal.style.display = "none";
    }
}