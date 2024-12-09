const spreadsheetId = '1QzbFeGvzlzxVYN53G_5Dkl7Lji41Q6_0iMCqhVJhHhs';
const apiKey = 'AIzaSyBLuMXUjJmU3XLfErAIH-iI4pXzmSnl-0E'; //  clave de API
const range = 'sheet1'; // 

// URL de la API de Google Sheets
const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;
$(document).ready(function() {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const rows = data.values.slice(1); // Remueve encabezados
      console.log(rows)
      const userData = JSON.parse(localStorage.getItem('userData'));
      const nombrePas = userData.name.toUpperCase().trim();
      const userRole = userData.permission.toLowerCase().trim(); 
      console.log(userRole)

      let selectedRows = [];

      if (userRole === "organizador") {
          // Mostrar todos los casos sin filtrar
          selectedRows = rows.map(row => [
              row[2] || "",  
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
      } else if (userRole === "pas") {
          // Mostrar casos asignados al ejecutivo
          selectedRows = rows.filter(row => (row[1] || "").toUpperCase().trim() === nombrePas)
              .map(row => [
                  row[2] || "",  
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
      } else if (userRole === "prueba") {
          // Mostrar casos de un ejecutivo específico predefinido
          const pruebaEjecutivo = "MAIRA".toUpperCase(); // Cambiar por el nombre real
          selectedRows = rows.filter(row => (row[2] || "").toUpperCase().trim() === pruebaEjecutivo)
              .map(row => [
                  row[2] || "",  
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
      }
      console.log(selectedRows)
      if (userRole === "pas" || userRole === "prueba") {
        const ejecutivoEncontrado = selectedRows[0]?.[0]?.toLowerCase();
        if (ejecutivoEncontrado) {
            const cardId = `#${ejecutivoEncontrado.replace(/\s+/g, '')}`;
            $(cardId).show(); 
        }
    }else{
      $('#showCardButton').hide()
      $('.full-width').toggleClass('col-md-9');
    }


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
            } else if (data[5] === 'DESISTIDO') {
                $(row).addClass('table-danger'); 
            }
        }
    });
        $('#zero_configuration_table').on('click', '.btn-primary', function() {
            const rowIndex = $(this).data('row');
            const rowData = selectedRows[rowIndex];
          });
      })
      .catch(error => console.error('Error al cargar datos de Google Sheets:', error));

   
  
      $('#showCardButton').click(function() {
        $('#marianela').toggle(); // Alternar la visibilidad de la tarjeta
        $('.full-width').toggleClass('col-md-9');
    });
    $('#showCardButton').click(function() {
      $('#maira').toggle(); // Alternar la visibilidad de la tarjeta
      $('.full-width').toggleClass('col-md-9');
  });
  $('#showCardButton').click(function() {
    $('#isabella').toggle(); // Alternar la visibilidad de la tarjeta
    $('.full-width').toggleClass('col-md-9');
});
    });
