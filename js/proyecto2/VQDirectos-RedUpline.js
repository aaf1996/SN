fetch('Index.aspx/ListaVQDirectos', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
})
    .then(response => response.json())
    .then(data => {
        // Obtener los parámetros de la URL
        const params = new URLSearchParams(window.location.search);
        const rango = params.get('rango'); // Ejemplo: RUBI

        // Obtener todos los datos excepto las últimas 3 filas
        const datosFiltrados = data.d.slice(0, -3);

        // Obtener las últimas 3 filas invirtiendo el array, luego tomar los primeros 3 elementos
        const datosFiltradosReversa = data.d.reverse().slice(0, 3);

        // Volver a invertir para conservar el orden original en las últimas 3 filas
        const datosFiltradosOrdenCorrecto = datosFiltradosReversa.reverse();

        // Clonar las filas filtradas para evitar mutar directamente el array original
        const datosModificados = [...datosFiltradosOrdenCorrecto];

        // Buscar el índice de la fila cuyo valor en 'ordenVQ' sea 10003
        const index = datosModificados.findIndex(fila => fila.ordenVQ === 10003);

        if (index !== -1) {
            const fila = datosModificados[index];

            // Obtener todas las claves y valores del objeto fila
            const claves = Object.keys(fila);
            const valores = Object.values(fila);

            // Limitar los valores a un máximo de 100 desde la cuarta columna (índice 3) en adelante
            const nuevosValores = valores.map((valor, i) => {
                if (i < 3) return valor; // Mantener sin cambios las tres primeras columnas
                return valor >= 100 ? 100 : valor; // Limitar a 100 si el valor es mayor o igual
            });

            // Reconstruir el objeto con los valores transformados
            const filaTransformada = claves.reduce((obj, key, i) => {
                obj[key] = nuevosValores[i];
                return obj;
            }, {});

            // Reemplazar la fila original por la transformada en el array modificado
            datosModificados[index] = filaTransformada;
        } else {
            console.log("No se encontró la fila con ordenVQ = 10003");
        }

        const tablaHead = document.querySelector('#tablaVQDirectos thead');
        const tablaBody = document.querySelector('#tablaVQDirectos tbody');
        const tablaBodyFoot = document.querySelector('#tablaVQDirectos tfoot');

        // Definición de columnas por rango
        const columnasPorRango = {
            EMPRENDEDOR: ['vqEmprendedor', 'vqBronce', 'vqPlata', 'vqOro', 'vqZafiro', 'vqRubi', 'vqDiamante', 'vqDobleDiamante', 'vqTripleDiamante', 'vqDiamanteMillonario', 'vqDobleDiamanteMillonario', 'vqImperial'],
            BRONCE: ['vqBronce', 'vqPlata', 'vqOro', 'vqZafiro', 'vqRubi', 'vqDiamante', 'vqDobleDiamante', 'vqTripleDiamante', 'vqDiamanteMillonario', 'vqDobleDiamanteMillonario', 'vqImperial'],
            PLATA: ['vqPlata', 'vqOro', 'vqZafiro', 'vqRubi', 'vqDiamante', 'vqDobleDiamante', 'vqTripleDiamante', 'vqDiamanteMillonario', 'vqDobleDiamanteMillonario', 'vqImperial'],
            ORO: ['vqOro', 'vqZafiro', 'vqRubi', 'vqDiamante', 'vqDobleDiamante', 'vqTripleDiamante', 'vqDiamanteMillonario', 'vqDobleDiamanteMillonario', 'vqImperial'],
            ZAFIRO: ['vqZafiro', 'vqRubi', 'vqDiamante', 'vqDobleDiamante', 'vqTripleDiamante', 'vqDiamanteMillonario', 'vqDobleDiamanteMillonario', 'vqImperial'],
            RUBI: ['vqRubi', 'vqDiamante', 'vqDobleDiamante', 'vqTripleDiamante', 'vqDiamanteMillonario', 'vqDobleDiamanteMillonario', 'vqImperial'],
            DIAMANTE: ['vqDiamante', 'vqDobleDiamante', 'vqTripleDiamante', 'vqDiamanteMillonario', 'vqDobleDiamanteMillonario', 'vqImperial'],
            DOBLEDIAMANTE: ['vqDobleDiamante', 'vqTripleDiamante', 'vqDiamanteMillonario', 'vqDobleDiamanteMillonario', 'vqImperial'],
            TRIPLEDIAMANTE: ['vqTripleDiamante', 'vqDiamanteMillonario', 'vqDobleDiamanteMillonario', 'vqImperial'],
            DIAMANTEMILLONARIO: ['vqDiamanteMillonario', 'vqDobleDiamanteMillonario', 'vqImperial'],
            DOBLEDIAMANTEMILLONARIO: ['vqDobleDiamanteMillonario', 'vqImperial'],
        };

        function generarHeader(rango) {
            const columnas = columnasPorRango[rango];
            const fila = document.createElement('tr');
            let ths = `<th>ID Socio</th><th>Empresario</th><th>VG</th>`;
            columnas.forEach(col => {
                ths += `<th>${formatearNombreColumna(col)}</th>`;
            });
            fila.innerHTML = ths;
            tablaHead.appendChild(fila);
        }

        function generarBody(datos, rango) {
            const columnas = columnasPorRango[rango];
            datos.forEach(item => {
                const fila = document.createElement('tr');
                let tds = `<td>${item.idSocio}</td><td>${item.empresario}</td><td>${item.vg}</td>`;
                columnas.forEach(col => {
                    tds += `<td>${item[col]}</td>`;
                });
                fila.innerHTML = tds;
                tablaBody.appendChild(fila);
            });
        }

        function generarFoot(datos, rango) {
            const columnas = columnasPorRango[rango];
            datos.forEach((item, index) => {
                const isPrimeraFila = index === 2;
                const fila = document.createElement('tr');
                let tds = `<td colspan="2">${item.empresario}</td><td>${formatear(item.vg, isPrimeraFila)}</td>`;
                columnas.forEach(col => {
                    tds += `<td>${formatear(item[col], isPrimeraFila)}</td>`;
                });
                fila.innerHTML = tds;
                tablaBodyFoot.appendChild(fila);
            });
        }

        function formatear(valor, esPorcentaje) {
            return esPorcentaje ? `${valor}%` : valor;
        }

        function formatearNombreColumna(col) {
            return col
                .replace(/^vq/, 'VQ ') // Reemplaza "vq" al inicio por "VQ " para preservar el formato correcto.
                .replace(/([A-Z][a-z]+)/g, ' $1') // Inserta espacio antes de cada palabra en CamelCase (excepto "VQ").
                .replace(/\s+/, ' ') // Reemplaza múltiples espacios consecutivos por uno solo.
                .trim(); // Elimina espacios en blanco al inicio y al final.
        }

        if (columnasPorRango[rango]) {
            generarHeader(rango);
            generarBody(datosFiltrados, rango);
            generarFoot(datosModificados, rango);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Ocurrió un problema al obtener el valor del rango`,
                confirmButtonColor: '#d33'
            });
        }
    })
    .catch(error => {
        console.error('Error al consumir el servicio:', error);
    });