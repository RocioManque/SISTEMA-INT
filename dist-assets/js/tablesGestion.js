const spreadsheetId = '1QzbFeGvzlzxVYN53G_5Dkl7Lji41Q6_0iMCqhVJhHhs';
const apiKey = 'AIzaSyBLuMXUjJmU3XLfErAIH-iI4pXzmSnl-0E'; //  clave de API
const range = 'sheet1'; // 

// URL de la API de Google Sheets
const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

$(document).ready(function() {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const rows = data.values//.slice(1); // Remueve encabezados
      console.log(rows)
      const userData = JSON.parse(localStorage.getItem('userData'));
      const nombreEjecutivo = userData.name.toUpperCase();
      console.log('ejecutivo', nombreEjecutivo)
        // Separa el nombre y apellido (asumiendo que están separados por un espacio)
        const [nombre, apellido] = nombreEjecutivo.split(" ");
console.log(nombre)
        // Filtra las filas antes de construir selectedRows
        const selectedRows = rows
          .filter(row => {
              // Convierte el nombre del cliente a mayúsculas y compara
              return (row[2] || "").toUpperCase() === nombre || (row[1] || "").toUpperCase() === apellido;
          })
          .map((row) => [
        row[1] || "",   // PAS
        row[4] || "",   // Cliente
        row[9] || "",  // Fecha de ingreso
        row[10] || "",  // Fecha de inicio
        row[0] || "",   // Nº de Reclamo
        row[25] || "",   // Estado
        row[3] || "",   // Ultima actualización
        row[28] || "",   // Tipo de reclamo
        row[9] || "",  // Monto a reclamar
        row[24] || "" ,   // Compañía a reclamar
        row[29] || "" ,   // Compañía a reclamar
        row[30] || "" ,   // Compañía a reclamar
        row[31] || "" ,   // Compañía a reclamar
        row[5] || "" ,   // Compañía a reclamar
        row[48] || "" ,   // Compañía a reclamar
        row[53] || "" ,   // Compañía a reclamar
      ]);
      console.log(selectedRows)
      $('#zero_configuration_table').DataTable({
        data: selectedRows,
        columns: [
            { title: "PAS" },
            { title: "Cliente" },
            { title: "Tel. Cliente" },
            { title: "Mail Cliente" },
            { title: "Fecha de ingreso" },
            { title: "Fecha de inicio" },
            { title: "Nº interno" },
            { title: "Estado" },
            { title: "Obsevación" },
            { title: "Informe/Historial"},
            { title: "Tipo de reclamo" },
            { title: "Monto a reclamar" },
            { title: "Monto cerrado" },
            { title: "Compañía a reclamar" },
            { title: "Gestionado con.." },
            { title: "Url Adjuntos"},
            { title: "Acciones", render: function(data, type, row, meta) {
                return `<button class="btn btn-primary" type="button" onclick="editarFila(${meta.row})">Editar</button>`;
            }}
            
        ],
        createdRow: function(row, data, dataIndex) {
            // Aplica clases dependiendo del estado de la reclamación
            if (data[5] === 'FALTA DOCUMENTACIÓN') {
                $(row).addClass('table-warning'); // Clase de Bootstrap para fila amarilla
            } else if (data[5] === 'INGRESADO') {
                $(row).addClass('table-success'); // Clase de Bootstrap para fila verde
            } else if (data[5] === 'DESISTIMIENTO') {
                $(row).addClass('table-danger'); // Clase de Bootstrap para fila roja
            }
        }
    });
        $('#zero_configuration_table').on('click', '.btn-primary', function() {
            const rowIndex = $(this).data('row');
            const rowData = selectedRows[rowIndex];
    
            // Llenar el modal con los datos específicos de la fila
            $('#modalPas').text(rowData[0]);
            $('#modalCliente').text(rowData[1]);
            $('#modalFechaIngreso').text(rowData[2]);
            $('#modalFechaInicio').text(rowData[3]);
            $('#modalReclamo').text(rowData[4]);
            $('#modalEstado').text(rowData[5]);
            $('#modalUltimaActualizacion').text(rowData[6]);
            $('#modalTipoReclamo').text(rowData[7]);
            $('#modalMonto').text(rowData[8]);
            $('#modalCompania').text(rowData[9]);
          });
      })
      .catch(error => console.error('Error al cargar datos de Google Sheets:', error));
  });
  function editarFila(rowIndex) {
    const rowData = $('#zero_configuration_table').DataTable().row(rowIndex).data();
    
    // Construir la URL con los datos de la fila
    const urlParams = new URLSearchParams({
        row:rowIndex,
        pas: rowData[0],
        cliente: rowData[1],
        telefonoCliente: rowData[2],
        mailCliente: rowData[3],
        fechaIngreso: rowData[4],
        fechaInicio: rowData[5],
        numeroInterno: rowData[6],
        estado: rowData[7],
        observacion: rowData[8],
        informeHistorial: rowData[9],
        tipoReclamo: rowData[10],
        montoReclamar: rowData[11],
        montoCerrado: rowData[12],
        companiaReclamar: rowData[13],
        gestionadoCon: rowData[14]
    });

    if (window.opener) {
        window.close();
    }
    // Abrir en nueva pestaña pasando la información en la URL
    window.location.href =`../../html/layout3/edicionGestion.html?${urlParams.toString()}`;
  }