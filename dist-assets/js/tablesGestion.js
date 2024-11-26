const spreadsheetId = '1QzbFeGvzlzxVYN53G_5Dkl7Lji41Q6_0iMCqhVJhHhs';
const apiKey = 'AIzaSyBLuMXUjJmU3XLfErAIH-iI4pXzmSnl-0E'; //  clave de API
const range = 'sheet1'; // 

// URL de la API de Google Sheets
const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

$(document).ready(function() {
 // Asegúrate de que Swal esté definido
 if (typeof Swal !== 'undefined') {
  const lastUpdateDate = new Date("2024-11-15"); // Fecha de ejemplo
  const currentDate = new Date();
  
  const daysDifference = getDaysDifference(lastUpdateDate, currentDate);
  
  if (daysDifference >= 7) {
      Swal.fire({
          title: '¡Actualización Pendiente!',
          text: 'Han pasado 7 días desde la última actualización. Por favor, actualiza la información.',
          icon: 'warning',
          confirmButtonText: 'Entendido'
      });
  }
} else {
  console.error('SweetAlert2 no está cargado.');
}


// Función para calcular la diferencia de días
function getDaysDifference(date1, date2) {
const diffTime = Math.abs(date2 - date1);
return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
// Si han pasado 7 días desde la última actualización, muestra una alerta
  fetch(url)
  .then(response => response.json())
  .then(data => {
    const rows = data.values; // Aquí obtienes todas las filas
    console.log(rows);
    
    const userData = JSON.parse(localStorage.getItem('userData'));
    const nombreEjecutivo = userData.name.toUpperCase();
    console.log('ejecutivo', nombreEjecutivo);

    // Separa el nombre y apellido (asumiendo que están separados por un espacio)
    const [nombre, apellido] = nombreEjecutivo.split(" ");
    console.log(nombre);

    // Filtra las filas antes de construir selectedRows
    const selectedRows = rows
      .map((row, index) => {
        // Añade la fila visible en la hoja (índice + 1)
        const numeroFila = index + 1; 

        // Convierte el nombre del cliente a mayúsculas y compara
        const nombreCliente = (row[2] || "").toUpperCase();
        const apellidoCliente = (row[1] || "").toUpperCase();
        
        if (nombreCliente === nombre || apellidoCliente === apellido) {
          return [
            numeroFila,       // Número de fila en Google Sheets
            row[1] || "",     // PAS
            row[4] || "",     // Cliente
            row[7] || "",     // Fecha de ingreso
            row[8] || "",    // Fecha de inicio
            row[0] || "",     // Nº de Reclamo
            row[25] || "",    // Estado
            row[3] || "",     // Última actualización
            row[28] || "",    // Tipo de reclamo
            row[9] || "",     // Monto a reclamar
            row[24] || "",    // Compañía a reclamar
            row[29] || "",    // Compañía a reclamar
            row[30] || "",    // Compañía a reclamar
            row[31] || "",    // Compañía a reclamar
            row[5] || "",     // Compañía a reclamar
            row[48] || "",    // Compañía a reclamar
            row[53] || "",     // Compañía a reclamar
            row[54] || "",     // Compañía a reclamar
            row[55] || ""     // Compañía a reclamar
          ];
        }
      })
      .filter(row => row !== undefined); // Filtra filas vacías resultantes

    console.log(selectedRows);

    // Inicializa la DataTable con las filas seleccionadas
    $('#zero_configuration_table').DataTable({
      data: selectedRows,
      columns: [
        { title: "Nº" }, // Nueva columna para el número de fila
        { title: "PAS" },
        { title: "Cliente" },
        { title: "Tel. Cliente" },
        { title: "Mail Cliente" },
        { title: "Fecha de ingreso" },
        { title: "Fecha de inicio" },
        { title: "Nº interno" },
        { title: "Estado" },
        { title: "Obsevación" },
        { title: "Informe/Historial" },
        { title: "Tipo de reclamo" },
        { title: "Monto a reclamar" },
        { title: "Monto cerrado" },
        { title: "Compañía a reclamar" },
        { title: "Gestionado con.." },
        { 
          title: "Url Adjuntos",
          render: function(data, type, row, meta) {
            // Si la celda contiene una URL, muestra un enlace cliqueable
            return data ? `<a href="${data}" target="_blank">Ver Adjuntos</a>` : '';
          }
        },
        { 
          title: "Url Facturas",
          render: function(data, type, row, meta) {
            // Si la celda contiene una URL, muestra un enlace cliqueable
            return data ? `<a href="${data}" target="_blank">Ver Facturas</a>` : '';
          }
        },
        { title: "Ultima actualización" },
        {
          title: "Acciones",
          render: function(data, type, row, meta) {
            return `<button class="btn btn-primary" type="button" onclick="editarFila(${meta.row})">Editar</button>`;
          }
        }
      ],
      createdRow: function(row, data, dataIndex) {
        // Aplica clases dependiendo del estado de la reclamación
        if (data[28] === 'FACTURACION') {
          $(row).addClass('table-warning'); // Clase de Bootstrap para fila amarilla
        } else if (data[28] === 'COBRADO') {
          $(row).addClass('table-success'); // Clase de Bootstrap para fila verde
        } else if (data[28] === 'DESISTIMIENTO') {
          $(row).addClass('table-danger'); // Clase de Bootstrap para fila roja
        }
      }
    });
  })
      .catch(error => console.error('Error al cargar datos de Google Sheets:', error));
  });
  function editarFila(rowIndex) {
    const rowData = $('#zero_configuration_table').DataTable().row(rowIndex).data();
    
    // Construir la URL con los datos de la fila
    const urlParams = new URLSearchParams({
        row:rowData[0],
        pas: rowData[1],
        cliente: rowData[2],
        telefonoCliente: rowData[3],
        mailCliente: rowData[4],
        fechaIngreso: rowData[5],
        fechaInicio: rowData[6],
        numeroInterno: rowData[7],
        estado: rowData[8],
        observacion: rowData[9],
        informeHistorial: rowData[10],
        tipoReclamo: rowData[11],
        montoReclamar: rowData[12],
        montoCerrado: rowData[13],
        companiaReclamar: rowData[14],
        gestionadoCon: rowData[15]
    });

    if (window.opener) {
        window.close();
    }
    // Abrir en nueva pestaña pasando la información en la URL
    window.location.href =`../../html/edicionGestion.html?${urlParams.toString()}`;
  }