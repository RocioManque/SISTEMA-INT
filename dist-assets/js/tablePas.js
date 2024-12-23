const spreadsheetId = '1QzbFeGvzlzxVYN53G_5Dkl7Lji41Q6_0iMCqhVJhHhs';
const apiKey = 'AIzaSyBLuMXUjJmU3XLfErAIH-iI4pXzmSnl-0E'; //  clave de API
const range = 'sheet1'; // 
let selectedRows2 = [];
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
              row[35] || "",  
              row[6] || "",  
              row[29] || "",  
              row[28] || "", 
              row[30] || "",   
              row[31] || "", 
              row[25] || "",   
          ]);
      } else if (userRole === "pas") {
          // Mostrar casos asignados al ejecutivo
          selectedRows = rows.filter(row => (row[1] || "").toUpperCase().trim() === nombrePas)
              .map(row => [
                  row[35] || "",  
                  row[6] || "",  
                  row[29] || "",  
                  row[28] || "", 
                  row[30] || "",   
                  row[31] || "", 
                  row[25] || "",   
              ]);
      } else if (userRole === "prueba") {
          // Mostrar casos de un ejecutivo específico predefinido
          const pruebaEjecutivo = "MAIRA".toUpperCase(); // Cambiar por el nombre real
          selectedRows = rows.filter(row => (row[2] || "").toUpperCase().trim() === pruebaEjecutivo)
              .map(row => [
                  row[35] || "",  
                  row[6] || "",  
                  row[29] || "",  
                  row[28] || "", 
                  row[30] || "",   
                  row[31] || "", 
                  row[25] || "",   
              ]);
      }
      console.log(selectedRows)
      if (userRole === "organizador") {
        // Mostrar todos los casos sin filtrar
        selectedRows2 = rows.map(row => [
            row[2] || "",   
            row[24] || "",  
        ]);
    } else if (userRole === "pas") {
        // Mostrar casos asignados al ejecutivo
        selectedRows2 = rows.filter(row => (row[1] || "").toUpperCase().trim() === nombrePas)
            .map(row => [
                row[2] || "",  
                row[6] || "",  
                row[24] || "",  
            ]);
    } else if (userRole === "prueba") {
        // Mostrar casos de un ejecutivo específico predefinido
        const pruebaEjecutivo = "MAIRA".toUpperCase(); // Cambiar por el nombre real
        selectedRows2 = rows.filter(row => (row[2] || "").toUpperCase().trim() === pruebaEjecutivo)
            .map(row => [
                row[2] || "",  
                row[6] || "",  
                row[24] || "",  
            ]);
    }
      console.log(selectedRows2)


      if (userRole === "pas" || userRole === "prueba") {
        const ejecutivoEncontrado = selectedRows2[0]?.[0]?.toLowerCase();
        console.log(ejecutivoEncontrado)
        if (ejecutivoEncontrado) {
            const cardId = `#${ejecutivoEncontrado.replace(/\s+/g, '')}`;
            $(cardId).show(); 
            $('#showCardButton').click(function() {
                $(cardId).toggle(); // Alternar la visibilidad de la tarjeta
              $('.full-width').toggleClass('col-md-9');
            });

        }
        
    }else{
      $('#showCardButton').hide()
      $('.full-width').toggleClass('col-md-9');
    }
   
      $('#scroll_vertical_dynamic_height_table').DataTable({
        
        data: selectedRows,
        scrollY: 300,
        scrollX: true,
        columns: [
            { title: "Caso" },
            { title: "Dominio" },
            { title: "Tipo de Reclamo" },
            { title: "Estado" },
            { title: "Monto reclamado" },
            { title: "Monto cerrado" },
            { title: "Fecha de Inicio" },
            { title: "Acciones", render: function(data, type, row, meta) {
                return `<button class="btn btn-primary mt-2" type="button" data-toggle="modal" data-target="#history" onclick="capturarRowIndex(${meta.row})" >Ver Historial</button>`;
            }}
            
        ],
    });
    $('#ghost-table').DataTable({
        data: selectedRows2,
        scrollY: 300,
        scrollX: true,
        columns: [
            { title: "Ejecutivo" },
            { title: "dominio" },
            { title: "historial" },
            
        ],
    });
      })
      .catch(error => console.error('Error al cargar datos de Google Sheets:', error));
      
    });
     // Capturar y almacenar el índice
async function capturarRowIndex(index) {
  const rowData = $('#ghost-table').DataTable().row(index).data();

  const historyList = rowData[2].trim()!='' ? rowData[2] : 'NO EXISTE REGISTRO DE INFORME EN ESTE CASO';;

document.getElementById("historyList").innerHTML = historyList

  }
    