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
    console.log(rows);

    // Añadir el número de fila como primera columna en cada fila
    const rowsWithRowNumbers = rows.map((row, index) => [index + 2, ...row]);

    // Agregar un encabezado para la nueva columna (Número de Fila)
    const columns = [{ title: "Nº" }];

    // Configurar el truncado
    const truncateText = (text, length = 20) => {
      return text && text.length > length ? text.substring(0, length) + '...' : text;
    };

    // Construir columnas dinámicamente usando los encabezados
    const dataColumns = headers.map((header, columnIndex) => {
      // Si el encabezado es "URL Adjuntos", definir render personalizado
      if (header === "url carpeta") {
        return {
          title: header,
          defaultContent: "",
          render: function(data, type, row) {
            return data
              ? `<a href="${data}" target="_blank" rel="noopener noreferrer">${truncateText(data)}</a>`
              : ""; // Si no hay URL, dejar vacío
          }
        };
      }

      // Render general para las demás columnas con truncado
      return {
        title: header,
        defaultContent: "",
        render: function(data, type, row) {
          return truncateText(data);
        }
      };
    });

    // Añadir columnas dinámicas después del número de fila
    columns.push(...dataColumns);

    // Agregar la columna para el botón de edición
    columns.push({
      title: "Acciones",
      render: function(data, type, row, meta) {
        return `<button class="btn btn-primary" onclick="editarFila(${meta.row})">Editar</button>`;
      }
    });
    // Inicializa la DataTable con las filas y columnas generadas dinámicamente
    $('#zero_configuration_table').DataTable({
      data: rowsWithRowNumbers,
      columns: columns
    });
      })
      .catch(error => console.error('Error al cargar datos de Google Sheets:', error));
});
  function editarFila(rowIndex) {
    const rowData = $('#zero_configuration_table').DataTable().row(rowIndex).data();
    
    // Construir la URL con los datos de la fila
    const urlParams = new URLSearchParams({
        
        row:rowData[0],
    fechaIngreso: rowData[1] || "",
    pas: rowData[2] || "",
    cliente: rowData[3] || "",
    dominio: rowData[4] || "",
    companiaReclamar: rowData[5] || "",
    telefonoCliente: rowData[6] || "",
    mailCliente: rowData[7] || "",
    observacion: rowData[8] || "",
    adjDniFrente: rowData[9] || "",
    adjDniDorso: rowData[10] || "",
    adjRegistroFrente: rowData[11] || "",
    adjRegistroDorso: rowData[12] || "",
    adjCedulaVerdeFrente: rowData[13] || "",
    adjCedulaVerdeDorso: rowData[14] || "",
    adjDenunciaAdm: rowData[15] || "",
    adjCertCobertura: rowData[16] || "",
    adjFotoSiniestro: rowData[17] || "",
    adjPresupuesto: rowData[18] || "",
    adjContratoSoc: rowData[19] || "",
    tipoReclamo: rowData[20] || "",
    historial: rowData[21] || "",
    estado: rowData[22] || "",
    carpetaUrl: rowData[23] || "",

    });
    
    // Abrir en nueva pestaña pasando la información en la URL
    window.location.href =`../../html/edicionIngresos.html?${urlParams.toString()}`;
  }