//const selectPaymentMethod = document.getElementById('slcPaymentMethod');

//// Obtén el elemento del párrafo y extrae el texto
//const paragraph = document.getElementById('idsocio');
//const fullText = paragraph.textContent;
//const codigoSocio = fullText.split('ID: ')[1].trim();
//console.log(codigoSocio);
//// Llamada al servicio con Axios
//axios.post('MisComprasV2.aspx/ObtenerTipoMedioPagoAsignarMLM', {
//    idsocio: codigoSocio // Reemplaza "codigoSocio" por el valor real
//}, {
//    headers: {
//        'Content-Type': 'application/json'
//    }
//})
//    .then(response => {
//        // Limpia las opciones existentes
//        selectPaymentMethod.innerHTML = '';

//        // Agrega la opción inicial
//        const defaultOption = document.createElement('option');
//        defaultOption.value = '0';
//        defaultOption.text = 'Seleccionar:';
//        selectPaymentMethod.appendChild(defaultOption);

//        // Llena las opciones con la respuesta del servidor
//        response.data.d.forEach(item => {
//            const option = document.createElement('option');
//            option.value = item.ID;
//            option.text = item.TipoPago;
//            selectPaymentMethod.appendChild(option);
//        });

//        selectPaymentMethod.value = '0'; // Establece el valor por defecto
//    })
//    .catch(error => {
//        console.error('Error al obtener los datos:', error);
//    });

//Cambio de axios a fetch
const selectPaymentMethod = document.getElementById('slcPaymentMethod');

// Obtén el elemento del párrafo y extrae el texto
const paragraph = document.getElementById('idsocio');
const fullText = paragraph.textContent;
const codigoSocio = fullText.split('ID: ')[1].trim();
console.log(codigoSocio);

// Llamada al servicio con Fetch
fetch('MisComprasV2.aspx/ObtenerTipoMedioPagoAsignarMLM', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        idsocio: codigoSocio
    })
})
    .then(res => res.json())
    .then(response => {
        // Limpia las opciones existentes
        selectPaymentMethod.innerHTML = '';

        // Agrega la opción inicial
        const defaultOption = document.createElement('option');
        defaultOption.value = '0';
        defaultOption.text = 'Seleccionar:';
        selectPaymentMethod.appendChild(defaultOption);

        // Llena las opciones con la respuesta del servidor
        response.d.forEach(item => {
            const option = document.createElement('option');
            option.value = item.ID;
            option.text = item.TipoPago;
            selectPaymentMethod.appendChild(option);
        });

        selectPaymentMethod.value = '0'; // Establece el valor por defecto
    })
    .catch(error => {
        console.error('Error al obtener los datos:', error);
    });
