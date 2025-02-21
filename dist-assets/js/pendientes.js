const spreadsheetId = '1QzbFeGvzlzxVYN53G_5Dkl7Lji41Q6_0iMCqhVJhHhs';
const apiKey = 'AIzaSyBLuMXUjJmU3XLfErAIH-iI4pXzmSnl-0E'; //  clave de API
const range = 'Respuestas de formulario 1'; // 
let allRows = []; // Definir globalmente
let casosAtrasados = [];
let clientesAtrasados = [];
// URL de la API de Google Sheets
const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

// Función para calcular la diferencia de días
function getDaysDifference(date1, date2) {
  const diffTime = Math.abs(date2 - date1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
$(document).ready(function() {
  fetch(url)
  .then(response => response.json())
  .then(data => {
    const headers = data.values[0]; 
    const rows = data.values.slice(1); 

    // Filtrar filas para excluir aquellas con estado "PARA INGRESAR" 
    const filteredRows = rows.filter(row => row[22] !== "PARA INGRESAR");

    const selectedRows = filteredRows.map((row) => {
      // Encuentra el índice real de la fila en la hoja original
      const numeroFila = rows.findIndex(originalRow => 
          JSON.stringify(originalRow) === JSON.stringify(row)
      ) + 2;
  
      return [
          numeroFila,      
          row[0] || "",      
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
      let isAtrasado = 0; // Indicador de atraso (0: no atrasado, 1: atrasado)
      const lastUpdateDate = row[24] || "";
      if (lastUpdateDate) {
          const parts = lastUpdateDate.split('/');
          const newDate = new Date(parts[2], parts[1] - 1, parts[0]);
          const currentDate = new Date();
          currentDate.setHours(0, 0, 0, 0);
    
          const daysDifference = getDaysDifference(newDate, currentDate);
    
          // Si supera los 7 días, agregar al arreglo
          if (daysDifference > 3) {
              const cliente = row[4] || ""; // Nombre del cliente (columna 4)
              if (cliente) {
                  clientesAtrasados.push(cliente);
                  console.log('clientes atrasados',clientesAtrasados)
              }
              isAtrasado = 1;
          }
      }
      return [      // Número de fila en Google Sheets
        row[0] || "",      // Información relevante
        row[1] || "",   
        row[2] || "",  
        row[3] || "", 
        row[4] || "",       
        row[20] || "",   
        row[21] || "",   
        row[22] || "",   
        row[23] || "",
        row[24] || "",
        isAtrasado
      ];
    });
    console.log(selectedRows);

    $('#zero_configuration_table').DataTable({
   
      data: selectedRows,
      scrollY: 300,
      scrollX: true,
      paging: false,          // Desactiva la paginación (muestra todos los registros)
      info: true,            // Oculta la información de "Mostrando X de Y registros"
      searching: true,        // Habilita el buscador
      ordering: true, 
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
    paging: false,          // Desactiva la paginación (muestra todos los registros)
    info: true,            // Oculta la información de "Mostrando X de Y registros"
    searching: true,        // Habilita el buscador
    ordering: true, 
    columns: [
        { title: "Fecha de Ingreso" }, //35
        { title: "Pas" },//26
        { title: "Cliente" },//28
        { title: "Dominio" },//29
        { title: "Compañia a Reclamar" },//27
        { title: "Tipo Reclamo" },//45
        {
          title: "Informe/Historial",
          render: function (data, type, row, meta) {
              if (!data) return "";
      
              let lineas = data.split("\n") // Divide en líneas
                               .map(linea => linea.trim()) // Elimina espacios en cada línea
                               .filter(linea => linea !== ""); // Elimina líneas vacías
      
              // Revertir el orden para que la última línea aparezca primero
              let textoReordenado = lineas.reverse().join("\n");
      
              let truncatedData = textoReordenado.length > 18 ? textoReordenado.substring(0, 18) + "..." : textoReordenado;
      
              return `<pre style="max-width: 300px; white-space: pre-wrap; overflow: hidden; text-overflow: ellipsis;" 
                            data-bs-toggle="tooltip" data-bs-placement="top" title="${textoReordenado}">
                            ${truncatedData}
                      </pre>`;
          }
      },
        { title: "Estado" },//47
        { 
          title: "URL Carpeta",
          render: function(data, type, row, meta) {
            // Si la celda contiene una URL, muestra un enlace cliqueable
            return data ? `<a href="${data}" target="_blank">Ver Adjuntos</a>` : '';
          }
        },
       
        { title: "Ultima Actualizacion", visible: false }, // Columna oculta para indicador
        { title: "Atrasado", visible: false}, // Columna oculta para indicador
        { title: "Acciones", render: function(data, type, row, meta) {
            return `<button class="btn btn-primary mt-2" type="button" onclick="editarFila(${meta.row})">Editar</button>`;
        }}
        
    ],
    order: [[10, 'desc']], // Ordenar por la columna de indicador (9) en orden descendente
      createdRow: function (row, data, dataIndex) {
        const cliente = data[2]; 
        const lastUpdateDate = data[9];
        const parts = lastUpdateDate.split('/');
        // Validar y convertir la fecha
        const newDate = new Date(parts[2], parts[1] - 1, parts[0]);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Ignorar la hora
        const daysDifference = getDaysDifference(newDate, currentDate);

        if (daysDifference > 3) {
          $(row).addClass('table-danger'); // Clase de Bootstrap para fila roja
          casosAtrasados.push({
              nombre: data[2], // Nombre o identificador
              dias: daysDifference,
          });
        }


        // Calcular diferencia en días
       

    },
    drawCallback: function () {
      // Mostrar la alerta única después de procesar todas las filas
      if (casosAtrasados.length > 0) {
          const mensaje = casosAtrasados.map(
              caso => ` \n - ${caso.nombre}: ${caso.dias} días atrasados \n `
          ).join(`\n`);

          Swal.fire({
              title: '¡Casos con actualización pendiente!',
              text: `Los siguientes casos tienen más de 3 días de atraso:\n ${mensaje}`,
              icon: 'warning',
              confirmButtonText: 'Entendido'
          });

          // Vaciar el arreglo para evitar alertas duplicadas en futuras ejecuciones
          casosAtrasados = [];
      }
  },
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