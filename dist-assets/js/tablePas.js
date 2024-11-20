const spreadsheetId = '1QzbFeGvzlzxVYN53G_5Dkl7Lji41Q6_0iMCqhVJhHhs';
const apiKey = 'AIzaSyBLuMXUjJmU3XLfErAIH-iI4pXzmSnl-0E'; //  clave de API
const range = 'sheet1'; // 

// URL de la API de Google Sheets
const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;
var nombrePas = localStorage.getItem('nombreEjecutivo');
$(document).ready(function() {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const rows = data.values//.slice(1); // Remueve encabezados
      console.log(rows)
      const userData = JSON.parse(localStorage.getItem('userData'));
      const nombrePas = userData.name.toUpperCase().trim();
      console.log("nombrepas",nombrePas)

        // Separa el nombre y apellido (asumiendo que están separados por un espacio)
        // const [nombre, apellido] = nombrePas.split(" ");

        // Filtra las filas antes de construir selectedRows
        const selectedRows = rows
          .filter(row => {
              // Convierte el nombre del cliente a mayúsculas y compara
              return (row[1] || "").toUpperCase().trim() === nombrePas;
          })
          .map((row) => [
        row[1] || "",  
        row[5] || "",  
        row[24] || "",  
        row[26] || "", 
        row[28] || "",   
        row[27] || "", 
        row[29] || "",   
        row[30] || "",   
        row[32] || "",  
        row[35] || "" , 
      ]);
      console.log(selectedRows)
      $('#zero_configuration_table').DataTable({
        data: selectedRows,
        columns: [
            { title: "Ejecutivo" },
            { title: "Dominio" },
            { title: "Iforme/Historial" },
            { title: "Nº Reclamo" },
            { title: "Tipo de Reclamo" },
            { title: "Estado" },
            { title: "Monto reclamado" },
            { title: "Monto cerrado" },
            { title: "Fecha de inicio" },
            { title: "Caso" },
        ],
        createdRow: function(row, data, dataIndex) {
            // Aplica clases dependiendo del estado de la reclamación
            if (data[5] === 'FALTA DOCUMENTACIÓN') {
                $(row).addClass('table-warning'); 
            } else if (data[5] === 'INGRESADO') {
                $(row).addClass('table-success'); 
            } else if (data[5] === 'DESISTIMIENTO') {
                $(row).addClass('table-danger'); 
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

      $('#showCardButton').click(function() {
        $('#executiveCard').toggle(); // Alternar la visibilidad de la tarjeta
        $('.full-width').toggleClass('col-md-9');
    });
    });
