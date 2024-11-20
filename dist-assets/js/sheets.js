document.getElementById('dataForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const values = [
        document.getElementById('pas').value,
        document.getElementById('cliente').value,
        document.getElementById('fechaIngreso').value,
        document.getElementById('fechaInicio').value,
        document.getElementById('numeroReclamo').value,
        document.getElementById('estado').value,
        document.getElementById('ultimaActualizacion').value,
        document.getElementById('tipoReclamo').value,
        document.getElementById('monto').value,
        document.getElementById('compania').value,
    ];

    const spreadsheetId = '1vnJXUhAGGcI8xt-83_T2K_TzJNqhz2nYdcMhilSqkWY'; // Reemplaza con tu ID de hoja de cálculo
    const range = 'Sheet1!A2'; // Cambia esto según sea necesario

    try {
        const response = await gapi.client.sheets.spreadsheets.values.append({
            spreadsheetId: spreadsheetId,
            range: range,
            valueInputOption: 'RAW',
            resource: {
                values: [values]
            },
        });

        console.log(response);
        alert("Fila agregada exitosamente");
        document.getElementById('dataForm').reset(); // Resetea el formulario
    } catch (error) {
        console.error(error);
        alert("Error al agregar fila: " + error.message);
    }
});



//handleClientLoad(); // Llama a la función para cargar la API