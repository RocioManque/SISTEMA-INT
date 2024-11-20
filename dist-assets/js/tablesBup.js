const spreadsheetId = '1gzp1hLfZaZMQarKdxPnvtHeyTioqhd3vatL-UmFnlUI';
const apiKey = 'AIzaSyBLuMXUjJmU3XLfErAIH-iI4pXzmSnl-0E'; //  clave de API
const range = 'Sheet1'; // 

// URL de la API de Google Sheets
const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;
$(document).ready(function() {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const rows = data.values;
            console.log(rows);
            if (rows && rows.length > 1) { // Comprobar si hay datos
                for (let i = 1; i < rows.length; i++) {
                    const row = rows[i];
                    
                    // Construye la fila de la tabla HTML
                    $('#zero_configuration_table tbody').append(`
                        <tr>
                            <td>${row[0] || ""}</td>
                            <td>${row[2] || ""}</td>
                            <td>${row[3] || ""}</td>
                            <td>${row[5] || ""}</td>
                            <td>${row[12] || ""}</td>
                            <td>${row[6] || ""}</td>
                            <td>${row[10] || ""}</td>
                            <td>${row[8] || ""}</td>
                            <td>${row[7] || ""}</td>
                            <td>${row[13] || ""}</td>
                            <td>${row[15] || ""}</td>
                        </tr>
                    `);
                }

                // Inicializa DataTable después de cargar todos los datos
                $('#zero_configuration_table').DataTable();
            } else {
                console.error("No se encontraron datos en la hoja de cálculo.");
            }
        })
        .catch(error => console.error('Error al cargar datos de Google Sheets:', error));
});