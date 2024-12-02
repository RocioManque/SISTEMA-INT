
const spreadsheetId = '1QzbFeGvzlzxVYN53G_5Dkl7Lji41Q6_0iMCqhVJhHhs';
const apiKey = 'AIzaSyBLuMXUjJmU3XLfErAIH-iI4pXzmSnl-0E'; //  clave de API
const range = 'sheet1'; // 

// URL de la API de Google Sheets
const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

$(document).ready(function() {
 // Asegúrate de que Swal esté definido
 


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
    const permiso = userData.permission;  // Asumiendo que tienes un campo 'permission' en userData
    console.log('ejecutivo', nombreEjecutivo);
    console.log('permiso', permiso);

    // Separa el nombre y apellido (asumiendo que están separados por un espacio)
    const [nombre, apellido] = nombreEjecutivo.split(" ");
    console.log(nombre);

    // Si el usuario es un superusuario, mostrar todos los casos
    let selectedRows = [];

    if (permiso === "super usuario") {
      selectedRows = rows.map((row, index) => {
        // Añade la fila visible en la hoja (índice + 1)
        const numeroFila = index + 1;
        return [
          numeroFila,       // Número de fila en Google Sheets
          row[1] || "",     // PAS
          row[4] || "",     // Cliente
          row[7] || "",     // Fecha de ingreso
          row[8] || "",    // Fecha de inicio
          row[0] || "",     // Nº de Reclamo
          row[25] || "",    // Estado
          row[3] || "",     // Última actualización
          row[26] || "",    // Tipo de reclamo
          row[27] || "",    // Tipo de reclamo
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
      });
    } else {
      // Si no es superusuario, filtra por el ejecutivo
      selectedRows = rows
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
              row[26] || "",    // Tipo de reclamo
              row[27] || "",    // Tipo de reclamo
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
    }

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
        { title: "Plan INT" },
        { title: "Nº reclamo cia" },
        { title: "Estado" },
        { title: "Observación" },
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
        const lastUpdateDate = data[20];
        const parts = lastUpdateDate.split('/');
        
        // Asegúrate de que la fecha tenga el formato correcto
        const newDate = new Date(parts[2], parts[1] - 1, parts[0]);
        
        // Calculamos la fecha actual
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);  // Aseguramos que solo se compare la fecha, no la hora
        // Calculamos la diferencia en días
        const daysDifference = getDaysDifference(newDate, currentDate);
        
        console.log('daysDifference', daysDifference);  // Verifica que la diferencia de días sea correcta
        
        // Si la diferencia es mayor a 7 días, asignamos la clase 'table-danger'
        if (daysDifference > 7) {
          console.log('Fila con más de 7 días de diferencia', data[20], daysDifference);
          $(row).addClass('table-danger');
             Swal.fire({
                    title: '¡Actualización Pendiente!',
                    text: 'Han pasado 7 días desde la última actualización. Por favor, actualiza la información.',
                    icon: 'warning',
                    confirmButtonText: 'Entendido'
                });
             // Clase de Bootstrap para fila roja
        }else if (data[10] === 'FACTURACION') {
          $(row).addClass('table-warning'); // Clase de Bootstrap para fila amarilla
        } else if (data[10] === 'COBRADO') {
          $(row).addClass('table-success'); // Clase de Bootstrap para fila verde
        } else if (data[10] === 'DESISTIDO') {
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
        planInt: rowData[8],
        numeroReclamoCia: rowData[9],
        estado: rowData[10],
        observacion: rowData[11],
        informeHistorial: rowData[12],
        tipoReclamo: rowData[13],
        montoReclamar: rowData[14],
        montoCerrado: rowData[15],
        companiaReclamar: rowData[16],
        gestionadoCon: rowData[17]
    });

    if (window.opener) {
        window.close();
    }
    // Abrir en nueva pestaña pasando la información en la URL
    window.location.href =`../../html/edicionGestion.html?${urlParams.toString()}`;
  }