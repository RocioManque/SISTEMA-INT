const spreadsheetId = '1QzbFeGvzlzxVYN53G_5Dkl7Lji41Q6_0iMCqhVJhHhs';
const apiKey = 'AIzaSyBLuMXUjJmU3XLfErAIH-iI4pXzmSnl-0E'; //  clave de API
const range = 'Respuestas de formulario 1'; // 
let allRows = []; // Definir globalmente
// URL de la API de Google Sheets
const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

$(document).ready(function() {
  fetch(url)
  .then(response => response.json())
  .then(data => {
    const headers = data.values[0]; // Encabezados de la primera fila
    const rows = data.values.slice(1); // Datos excluyendo los encabezados

    // Filtrar filas para excluir aquellas con estado "PARA INGRESAR" en la columna 22 (índice 21)
    const filteredRows = rows.filter(row => row[22] !== "PARA INGRESAR");

    // Mapear las filas filtradas para incluir el número de fila y los valores relevantes
    const selectedRows = filteredRows.map((row) => {
      // Encuentra el índice real de la fila en la hoja original
      const numeroFila = rows.findIndex(originalRow => 
          JSON.stringify(originalRow) === JSON.stringify(row)
      ) + 2; // Ajustar para incluir encabezados (si el encabezado está en la fila 1)
  
      return [
          numeroFila,        // Número real de fila en Google Sheets
          row[0] || "",      // Información relevante
          row[1] || "",   
          row[2] || "",  
          row[3] || "", 
          row[4] || "",   
          row[5] || "",   
          row[6] || "",   
          row[7] || "",   
          row[8] || "",  
          row[9] || "",   
          row[10] || "",   
          row[11] || "",   
          row[12] || "",   
          row[13] || "",   
          row[14] || "",   
          row[15] || "",   
          row[16] || "",   
          row[17] || "",   
          row[18] || "",   
          row[19] || "",   
          row[20] || "",   
          row[21] || "",   
          row[22] || "",   
          row[23] || ""
      ];
  });
    const selectedRows2 = filteredRows.map((row, index) => {
      const numeroFila = index + 1; // Ajusta el índice según la fila visible
      return [      // Número de fila en Google Sheets
        row[0] || "",      // Información relevante
        row[1] || "",   
        row[2] || "",  
        row[3] || "", 
        row[4] || "",       
        row[20] || "",   
        row[21] || "",   
        row[22] || "",   
        row[23] || ""
      ];
    });
    console.log(selectedRows);

    $('#zero_configuration_table').DataTable({
   
      data: selectedRows,
      scrollY: 300,
      scrollX: true,
      columns: [
          { title: "Nº" }, //index
          { title: "Fecha de Ingreso" }, //35
          { title: "Pas" },//26
          { title: "Cliente" },//28
          { title: "Dominio" },//29
          { title: "Compañia a Reclamar" },//27
          { title: "Teléfono Cliente" },//30
          { title: "Email Cliente" },//31
          { title: "Observaciones" },//32
          { title: "DNI Frente",
            render: function(data, type, row, meta) {
              // Si la celda contiene una URL, muestra un enlace cliqueable
              return data ? `<a href="${data}" target="_blank">Ver Documento</a>` : '';
            }
           },//33
          { title: "DNI Dorso",
            render: function(data, type, row, meta) {
              // Si la celda contiene una URL, muestra un enlace cliqueable
              return data ? `<a href="${data}" target="_blank">Ver Documento</a>` : '';
            }
           },//34
          { title: "Registro de Conducir Frente",
            render: function(data, type, row, meta) {
              // Si la celda contiene una URL, muestra un enlace cliqueable
              return data ? `<a href="${data}" target="_blank">Ver Documento</a>` : '';
            }
          },//36
          { title: "Registro de Conducir Dorso",
            render: function(data, type, row, meta) {
              // Si la celda contiene una URL, muestra un enlace cliqueable
              return data ? `<a href="${data}" target="_blank">Ver Documento</a>` : '';
            }
           },//37
          { title: "Cédula Verde Frente",
            render: function(data, type, row, meta) {
              // Si la celda contiene una URL, muestra un enlace cliqueable
              return data ? `<a href="${data}" target="_blank">Ver Documento</a>` : '';
            }
           },//38
          { title: "Cédula Verde Dorso",
            render: function(data, type, row, meta) {
              // Si la celda contiene una URL, muestra un enlace cliqueable
              return data ? `<a href="${data}" target="_blank">Ver Documento</a>` : '';
            }
           },//39
          { title: "Denuncia Administrativa",
            render: function(data, type, row, meta) {
              // Si la celda contiene una URL, muestra un enlace cliqueable
              return data ? `<a href="${data}" target="_blank">Ver Documento</a>` : '';
            }
           },//40
          { title: "Certificado de Cobertura",
            render: function(data, type, row, meta) {
              // Si la celda contiene una URL, muestra un enlace cliqueable
              return data ? `<a href="${data}" target="_blank">Ver Documento</a>` : '';
            }
           },//41
          { title: "Fotos",
            render: function(data, type, row, meta) {
              // Si la celda contiene una URL, muestra un enlace cliqueable
              return data ? `<a href="${data}" target="_blank">Ver Documento</a>` : '';
            }
           },//42
          { title: "Presupuesto",
            render: function(data, type, row, meta) {
              // Si la celda contiene una URL, muestra un enlace cliqueable
              return data ? `<a href="${data}" target="_blank">Ver Documento</a>` : '';
            }
           },//43
          { title: "Contrato Social",
            render: function(data, type, row, meta) {
              // Si la celda contiene una URL, muestra un enlace cliqueable
              return data ? `<a href="${data}" target="_blank">Ver Documento</a>` : '';
            }
           },//44
           { title: "Nota Representación",
            render: function(data, type, row, meta) {
              // Si la celda contiene una URL, muestra un enlace cliqueable
              return data ? `<a href="${data}" target="_blank">Ver Documento</a>` : '';
            }
           },//44
          { title: "Tipo Reclamo" },//45
          { title: "Informe/Historial",
            render: function(data, type, row, meta) {
              // Si la celda contiene una URL, muestra un enlace cliqueable
              return data ? `<pre  style="max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" data-bs-toggle="tooltip" data-bs-placement="top" title="${data}">${data}</pre>` : '';
            }
            
           },//46
          { title: "Estado" },//47
          { 
            title: "URL Carpeta",
            render: function(data, type, row, meta) {
              // Si la celda contiene una URL, muestra un enlace cliqueable
              return data ? `<a href="${data}" target="_blank">Ver Adjuntos</a>` : '';
            }
          },
          { title: "Acciones", render: function(data, type, row, meta) {
              return `<button class="btn btn-primary mt-2" type="button" onclick="editarFila(${meta.row})">Editar</button>`;
          }}
          
      ],
      fixedHeader: true,
   });
   $('#table2').DataTable({
   
    data: selectedRows2,
    scrollY: 300,
    scrollX: true,
    columns: [
        { title: "Fecha de Ingreso" }, //35
        { title: "Pas" },//26
        { title: "Cliente" },//28
        { title: "Dominio" },//29
        { title: "Compañia a Reclamar" },//27
        { title: "Tipo Reclamo" },//45
        { title: "Informe/Historial",
          render: function(data, type, row, meta) {
            // Si la celda contiene una URL, muestra un enlace cliqueable
            return data ? `<pre  style="max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" data-bs-toggle="tooltip" data-bs-placement="top" title="${data}">${data}</pre>` : '';
          }
          
         },//46
        { title: "Estado" },//47
        { 
          title: "URL Carpeta",
          render: function(data, type, row, meta) {
            // Si la celda contiene una URL, muestra un enlace cliqueable
            return data ? `<a href="${data}" target="_blank">Ver Adjuntos</a>` : '';
          }
        },
        { title: "Acciones", render: function(data, type, row, meta) {
            return `<button class="btn btn-primary mt-2" type="button" onclick="editarFila(${meta.row})">Editar</button>`;
        }}
        
    ],
    fixedHeader: true,
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
    adjNotaRepresentacion:rowData[20] || "",
    tipoReclamo: rowData[21] || "",
    historial: rowData[22] || "",
    estado: rowData[23] || "",
    carpetaUrl: rowData[24] || "",

    });
    
    // Abrir en nueva pestaña pasando la información en la URL
    window.location.href =`../../html/edicionIngresos.html?${urlParams.toString()}`;
  }