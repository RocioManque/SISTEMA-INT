const spreadsheetId = '1QzbFeGvzlzxVYN53G_5Dkl7Lji41Q6_0iMCqhVJhHhs';
const spreadsheetId2 = '1gzp1hLfZaZMQarKdxPnvtHeyTioqhd3vatL-UmFnlUI';
const apiKey = 'AIzaSyBLuMXUjJmU3XLfErAIH-iI4pXzmSnl-0E'; //  clave de API
const range = 'sheet1'; // 
const range2 = 'Respuestas de formulario 1'; // 
const range3 = 'Sheet1'; // 
let selectedRows2 = [];
let datosGlobales = [];
// URL de la API de Google Sheets
const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;
const url1 = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range2}?key=${apiKey}`;
const url3 = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId2}/values/${range3}?key=${apiKey}`;

async function obtenerDatosDesdeGoogleSheet() {
 
    fetch(url1)
        .then(response => response.json())
        .then(data => {
            datosGlobales = data.values.slice(1);  // Remueve la primera fila (encabezados)
        })
        .catch(error => console.error('Error al obtener los datos:', error));
}
$(document).ready(async function() {
    async function obtenerDatosDesdeGoogleSheet2() {
        const response = await fetch(url);
        const response2 = await fetch(url1);
        const data = await response.json();
        const data2 = await response2.json();
    
        // Extraer encabezados
        const headers1 = data.values[0];
        const headers2 = data2.values[0]; 
    
        // Unificar encabezados sin duplicados
        const unifiedHeaders = Array.from(new Set([...headers1, ...headers2]));
    
        // Función para mapear y reorganizar filas según los encabezados unificados
        function mapRowToUnifiedHeaders(row, headers, unifiedHeaders) {
            return unifiedHeaders.map(header => {
                const index = headers.indexOf(header);
                return index !== -1 ? row[index] : ""; // Si no existe, agrega vacío
            });
        }
    
        // Normalizar los datos incluyendo los encabezados
        const normalizedData1 = [unifiedHeaders, ...data.values.slice(1).map(row => mapRowToUnifiedHeaders(row, headers1, unifiedHeaders))];
        const normalizedData2 = [unifiedHeaders, ...data2.values.slice(1).map(row => mapRowToUnifiedHeaders(row, headers2, unifiedHeaders))];
    
        // Combinar tablas sin duplicar encabezados
        const completo = [unifiedHeaders, ...normalizedData1.slice(1), ...normalizedData2.slice(1)];
    
        return completo;  // Devuelve los datos con encabezado unificado
    }
    
    async function obtenerPas() {
        const responsePas = await fetch(url3);
        const dataPas = await responsePas.json();
        return dataPas.values.slice(1);  // Devuelve los datos sin encabezado
    }
    async function obtenerPasAsignados() {
        const responsePas = await fetch(url3);
        const dataPas = await responsePas.json();
        const pasData = dataPas.values.slice(1); // Elimina encabezados
    
        // Obtener el organizador desde localStorage
        const userData = JSON.parse(localStorage.getItem('userData'));
        const nombreOrganizador = userData.name.toUpperCase().trim();
    console.log('nombreOrganizador',nombreOrganizador)
    console.log('PasData',pasData)
        // Buscar el organizador y recolectar los PAS asignados
        let pasAsignados = [];
    
        pasData.forEach(row => {
            const organizador = row[21]?.toUpperCase().trim();  // Ajusta el índice de columna del organizador
            const pasAsignado = row[2]?.toUpperCase().trim();  // Ajusta el índice de columna del PAS
            if (organizador === nombreOrganizador && pasAsignado) {
                pasAsignados.push(pasAsignado);
            }
        });
    
        console.log("PAS asignados al organizador:", pasAsignados);
        return pasAsignados;
    }
    
   
        const rows = await obtenerDatosDesdeGoogleSheet2();
 // Filtrar casos usando los PAS asignados
   
        const pasAsignados = await obtenerPasAsignados();
    
 // Suponiendo que la columna 1 contiene el PAS asignado
        const filteredRows = rows.filter(row => pasAsignados.includes((row[1] || "").toUpperCase().trim())&& row[28] !== "PARA INGRESAR" );

        console.log("Casos filtrados:", filteredRows);

        const bup = await obtenerPas();
      const userData = JSON.parse(localStorage.getItem('userData'));
      const nombrePas = userData.name.toUpperCase().trim();
      const userRole = userData.permission.toLowerCase().trim(); 
      console.log(userRole)
      for (let i = 0; i < bup.length; i++) {
        const persona = bup[i];
        // Si encuentra una coincidencia con el nombre completo
        if (nombrePas === persona[2]) {
            // Asigna el "ejecutivo asignado" de esa persona a una variable
            const ejecutivoAsignado = persona[15];
                if (ejecutivoAsignado) {
                    const cardId = `#${ejecutivoAsignado.toLowerCase().replace(/\s+/g, '')}`;
                    $('.full-width').toggleClass('col-md-9');
                    $(cardId).show(); 
                    $('#showCardButton').click(function() {
                        $(cardId).toggle(); // Alternar la visibilidad de la tarjeta
                      $('.full-width').toggleClass('col-md-9');
                    });
        
                }
            
        }
    }
      let selectedRows = [];

      if (userRole === "organizador") {

          // Mostrar todos los casos sin filtrar
          selectedRows = filteredRows.map(row => [
             `${row[4]} contra ${row[5]}` || "",
              row[6] || "",  
              row[29] || "",  
              row[28] || "", 
              row[30] || "",   
              row[31] || "", 
              row[25] || "",   
          ]);
      } else if (userRole === "pas") {
          // Mostrar casos asignados al ejecutivo
          console.log(rows[0])
            const clienteIndex = rows[0].indexOf("cliente");
            const ciaIndex = rows[0].indexOf("cia a reclamar");
          selectedRows = rows.filter(row => (row[1] || "").toUpperCase().trim() === nombrePas && row[28] !== "PARA INGRESAR" )
              .map(row => [
                  `${row[clienteIndex]} contra ${row[ciaIndex]}` || "",  
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
        selectedRows2 = filteredRows.map(row => [
            row[2] || "",  
            row[6] || "",  
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
   
      $('#scroll_vertical_dynamic_height_table').DataTable({
        
        data: selectedRows,
        scrollY: 300,
        scrollX: true,
        paging: false,          // Desactiva la paginación (muestra todos los registros)
        info: true,            // Oculta la información de "Mostrando X de Y registros"
        searching: true,        // Habilita el buscador
        ordering: true, 
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
        paging: false,          // Desactiva la paginación (muestra todos los registros)
        info: true,            // Oculta la información de "Mostrando X de Y registros"
        searching: true,        // Habilita el buscador
        ordering: true, 
        columns: [
            { title: "Ejecutivo" },
            { title: "dominio" },
            { title: "historial" },
            
        ],
    });
});      

     // Capturar y almacenar el índice
async function capturarRowIndex(index) {
    console.log('index 2',index);
  const rowData = $('#ghost-table').DataTable().row(index).data();

  const historyList = rowData[2].trim()!='' ? rowData[2] : 'NO EXISTE REGISTRO DE INFORME EN ESTE CASO';;

document.getElementById("historyList").innerHTML = historyList

  }
    