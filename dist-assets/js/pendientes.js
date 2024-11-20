const spreadsheetId = '1QzbFeGvzlzxVYN53G_5Dkl7Lji41Q6_0iMCqhVJhHhs';
const apiKey = 'AIzaSyBLuMXUjJmU3XLfErAIH-iI4pXzmSnl-0E'; //  clave de API
const range = 'Respuestas de formulario 1'; // 

// URL de la API de Google Sheets
const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

$(document).ready(function() {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const headers = data.values[0]; // Encabezados de la primera fila
        const rows = data.values.slice(1); // Datos excluyendo los encabezados
            console.log(rows)
        // Configurar el truncado
        const truncateText = (text, length = 20) => {
            return text && text.length > length ? text.substring(0, length) + '...' : text;
        };

        // Construir columnas dinámicamente usando los encabezados con truncado
        const columns = headers.map(header => ({
            title: header,
            defaultContent: "",
            render: function(data, type, row) {
                return truncateText(data); // Aplicar truncado a todas las columnas
            }
        }));

        // Agregar la columna para el botón de edición
        columns.push({
            title: "Acciones",
            render: function(data, type, row, meta) {
                return `<button class="btn btn-primary" onclick="editarFila(${meta.row})">Editar</button>`;
            }
        });

        // Inicializar DataTable
        $('#zero_configuration_table').DataTable({
            data: rows,
            columns: columns
        });
      })
      .catch(error => console.error('Error al cargar datos de Google Sheets:', error));
});
  function editarFila(rowIndex) {
    const rowData = $('#zero_configuration_table').DataTable().row(rowIndex).data();
    
    // Construir la URL con los datos de la fila
    const urlParams = new URLSearchParams({
        
        row:rowIndex,
        fechaIngreso: rowData[0] || "",
    pas: rowData[1] || "",
    cliente: rowData[2] || "",
    dominio: rowData[3] || "",
    companiaReclamar: rowData[4] || "",
    telefonoCliente: rowData[5] || "",
    mailCliente: rowData[6] || "",
    observacion: rowData[7] || "",
    adjDniFrente: rowData[8] || "",
    adjDniDorso: rowData[9] || "",
    adjRegistroFrente: rowData[10] || "",
    adjRegistroDorso: rowData[11] || "",
    adjCedulaVerdeFrente: rowData[12] || "",
    adjCedulaVerdeDorso: rowData[13] || "",
    adjDenunciaAdm: rowData[14] || "",
    adjCertCobertura: rowData[15] || "",
    adjFotoSiniestro: rowData[16] || "",
    adjPresupuesto: rowData[17] || "",
    adjContratoSoc: rowData[18] || "",
    tipoReclamo: rowData[19] || "",
    historial: rowData[20] || "",
    estado: rowData[21] || "",

    });
    
    // Abrir en nueva pestaña pasando la información en la URL
    window.location.href =`../../html/layout3/edicionIngresos.html?${urlParams.toString()}`;
  }