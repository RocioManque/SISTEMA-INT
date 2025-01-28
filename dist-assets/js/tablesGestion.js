
const spreadsheetId = '1QzbFeGvzlzxVYN53G_5Dkl7Lji41Q6_0iMCqhVJhHhs';
const apiKey = 'AIzaSyBLuMXUjJmU3XLfErAIH-iI4pXzmSnl-0E'; //  clave de API
const range = 'sheet1'; // 
let casosAtrasados = [];
let clientesAtrasados = [];
// URL de la API de Google Sheets
const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

$(document).ready(function() {
  

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
  
    
    const userData = JSON.parse(localStorage.getItem('userData'));
    const nombreEjecutivo = userData.name.toUpperCase();
    const permiso = userData.permission;  // Asumiendo que tienes un campo 'permission' en userData
   

    // Separa el nombre y apellido (asumiendo que están separados por un espacio)
    const [nombre, apellido] = nombreEjecutivo.split(" ");


    // Si el usuario es un superusuario, mostrar todos los casos
    let selectedRows = [];
    let selectedRows2 = [];

    if (permiso === "super usuario") {
      selectedRows = rows.map((row, index) => {
        // Añade la fila visible en la hoja (índice + 1)
        const numeroFila = index + 1;
        let isAtrasado = 0; // Indicador de atraso (0: no atrasado, 1: atrasado)
        const lastUpdateDate = row[55] || "";
        if (lastUpdateDate) {
            const parts = lastUpdateDate.split('/');
            const newDate = new Date(parts[2], parts[1] - 1, parts[0]);
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
      
            const daysDifference = getDaysDifference(newDate, currentDate);
      
            // Si supera los 7 días, agregar al arreglo
            if (daysDifference > 7) {
                const cliente = row[4] || ""; // Nombre del cliente (columna 4)
                if (cliente) {
                    clientesAtrasados.push(cliente);
                }
                isAtrasado = 1;
            }
        }
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
              row[55] || "",
              row[57] || "",
              row[56] || "",
              isAtrasado     // Compañía a reclamar
        ];
      });
      selectedRows2 = rows.map((row, index) => {
        // Añade la fila visible en la hoja (índice + 1)
        const numeroFila = index + 1;
        let isAtrasado = 0; // Indicador de atraso (0: no atrasado, 1: atrasado)
        const lastUpdateDate = row[55] || "";
        if (lastUpdateDate) {
            const parts = lastUpdateDate.split('/');
            const newDate = new Date(parts[2], parts[1] - 1, parts[0]);
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
      
            const daysDifference = getDaysDifference(newDate, currentDate);
      
            // Si supera los 7 días, agregar al arreglo
            if (daysDifference > 7) {
                const cliente = row[4] || ""; // Nombre del cliente (columna 4)
                if (cliente) {
                    clientesAtrasados.push(cliente);
                }
                isAtrasado = 1;
            }
        }
        return [
          row[1] || "",     // PAS
              row[4] || "",     // Cliente
              row[28] || "",     // Fecha de ingreso
              row[24] || "",    // Fecha de inicio
              row[29] || "",     // Nº de Reclamo
              row[30] || "",    // Compañía a reclamar
              row[5] || "",      // Tipo de reclamo
              row[53] || "",    // Tipo de reclamo
              row[54] || "",
              isAtrasado
        ];
      });
    } else {
      // Si no es superusuario, filtra por el ejecutivo
      selectedRows = rows.map((row, index) => {
          // Añade la fila visible en la hoja (índice + 1)
          const numeroFila = index + 1;

          // Convierte el nombre del cliente a mayúsculas y compara
          const nombreCliente = (row[2] || "").toUpperCase();
          const apellidoCliente = (row[1] || "").toUpperCase();
          let isAtrasado = 0; // Indicador de atraso (0: no atrasado, 1: atrasado)
          const lastUpdateDate = row[55] || "";
          if (lastUpdateDate) {
              const parts = lastUpdateDate.split('/');
              const newDate = new Date(parts[2], parts[1] - 1, parts[0]);
              const currentDate = new Date();
              currentDate.setHours(0, 0, 0, 0);
        
              const daysDifference = getDaysDifference(newDate, currentDate);
        
              // Si supera los 7 días, agregar al arreglo
              if (daysDifference > 7) {
                  const cliente = row[4] || ""; // Nombre del cliente (columna 4)
                  if (cliente) {
                      clientesAtrasados.push(cliente);
                  }
                  isAtrasado = 1;
              }
          }
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
              row[55] || "",
              row[57] || "",
              row[56] || "",
              isAtrasado     // Compañía a reclamar
            ];
          }
        })
        .filter(row => row !== undefined); // Filtra filas vacías resultantes
       //"cobrado, rechazado, caso dado de baja"
       const filteredRows = rows.filter(row => 
        row[28] !== "COBRADO" && 
        row[28] !== "RECHAZADO" && 
        row[28] !== "CASO CONCILIADO/ PARA IMPUTAR" && 
        row[28] !== "CASO DADO DE BAJA"
    );
       
        selectedRows2 = filteredRows
        .map((row, index) => {
          // Añade la fila visible en la hoja (índice + 1)
          const numeroFila = index + 1; 
        // Extraer y procesar la fecha de actualización (columna 55)
    
          // Convierte el nombre del cliente a mayúsculas y compara
          const nombreCliente = (row[2] || "").toUpperCase();
          const apellidoCliente = (row[1] || "").toUpperCase();

          if (nombreCliente === nombre || apellidoCliente === apellido) {
            const lastUpdateDate = row[55] || "";
            let isAtrasado = 0; // Indicador de atraso (0: no atrasado, 1: atrasado)
            if (lastUpdateDate) {
                const parts = lastUpdateDate.split('/');
                const newDate = new Date(parts[2], parts[1] - 1, parts[0]);
                const currentDate = new Date();
                currentDate.setHours(0, 0, 0, 0);
          
                const daysDifference = getDaysDifference(newDate, currentDate);
          
                // Si supera los 7 días, agregar al arreglo
                if (daysDifference > 7 && row[28] !== 'A.CERRADO/FACTURADO') {
                    const cliente = row[4] || ""; // Nombre del cliente (columna 4)
                    if (cliente) {
                        clientesAtrasados.push(cliente);
                    }
                    isAtrasado = 1; // Marcar como atrasado
                }
            }
            return [
              row[1] || "",     // PAS
              row[4] || "",     // Cliente
              row[28] || "",     // Fecha de ingreso
              row[24] || "",    // Fecha de inicio
              row[29] || "",     // Nº de Reclamo
              row[30] || "",    // Compañía a reclamar
              row[5] || "",      // Tipo de reclamo
              row[53] || "",    // Tipo de reclamo
              row[54] || "", 
              isAtrasado
            ];
          }
        })
        .filter(row => row !== undefined); // Filtra filas vacías resultantes
    }
    console.log('filtered desde donde corresponda',selectedRows2)
    $('#table2').DataTable({
      data: selectedRows,
      scrollY: 300,
    scrollX: true,
      columns: [
        { title: "Nº",visible:false }, // Nueva columna para el número de fila
        { title: "PAS" },
        { title: "Cliente" },
        { title: "Tel. Cliente",visible:false },
        { title: "Mail Cliente",visible:false },
        { title: "Fecha de ingreso",visible:false },
        { title: "Fecha de inicio",visible:false },
        { title: "Nº interno" ,visible:false},
        { title: "Plan INT",visible:false },
        { title: "Nº reclamo cia",visible:false },
        { title: "Estado" },
        { title: "Observación",visible:false },
        { title: "Informe/Historial",
          render: function(data, type, row, meta) {
            // Si la celda contiene una URL, muestra un enlace cliqueable
            return data ? `<pre  style="max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" data-bs-toggle="tooltip" data-bs-placement="top" title="${data}">${data}</pre>` : '';
          }
          
         },//46
        { title: "Tipo de reclamo" },
        { title: "Monto a reclamar" },
        { title: "Monto cerrado" ,visible:false},
        { title: "Compañía a reclamar" },
        { title: "Gestionado con.." ,visible:false},
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
        { title: "Ultima actualización" ,visible:false},
        { title: "Fecha ingreso a cia",visible:false},
        { title: "Honorarios",visible:false},
        { title: "Atrasado" ,visible:false},

        {
          title: "Acciones",
          render: function(data, type, row, meta) {
            return `<button class="btn btn-primary" type="button" onclick="editarFila(${meta.row})">Editar</button>`;
          }
        }
      ],
      order: [[21, 'desc']],

      createdRow: function (row, data, dataIndex) {
        const lastUpdateDate = data[20];
        const parts = lastUpdateDate.split('/');
        const estadosExcluidos = data[10];
   
        // Validar y convertir la fecha
        const newDate = new Date(parts[2], parts[1] - 1, parts[0]);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Ignorar la hora

        // Calcular diferencia en días
        const daysDifference = getDaysDifference(newDate, currentDate);

        if (daysDifference > 7 ) {
            $(row).addClass('table-danger'); // Clase de Bootstrap para fila roja
            casosAtrasados.push({
                nombre: data[2], // Nombre o identificador
                dias: daysDifference,
                estado: data[10]
            });
           }
           const cliente = data[2]; // Nombre del cliente (columna 4 en selectedRows2)
           const urlVacia = data[19];
           const estadoProhibido = data[10];
   
           if (clientesAtrasados.includes(cliente)&& estadoProhibido !== "A.CERRADO/FACTURADO") {
               $(row).addClass('table-danger'); // Pintar la fila de rojo
           }else if (urlVacia !== null &&  urlVacia !== '' ) {
             $(row).addClass('table-warning'); // Clase de Bootstrap para fila amarilla
         }
   
    },
    drawCallback: function () {
      // Mostrar la alerta única después de procesar todas las filas
      if (casosAtrasados.length > 0) {

        // Filtrar los casos según los estados no deseados
        const estadosExcluidos = ["CASO DADO DE BAJA", "COBRADO", "RECHAZADO", "A.CERRADO/FACTURADO"];
        
        // Solo incluir los casos que no estén en los estados excluidos
        const casosFiltrados = casosAtrasados.filter(caso => 
     
         !estadosExcluidos.includes(caso.estado)
        );

        if (casosFiltrados.length > 0) {
            const mensaje = casosFiltrados.map(
                caso => `\n - ${caso.nombre}: ${caso.dias} días atrasados \n`
            ).join(`\n`);
    
            Swal.fire({
                title: '¡Casos con actualización pendiente!',
                text: `Los siguientes casos tienen más de 7 días de atraso:\n${mensaje}`,
                icon: 'warning',
                confirmButtonText: 'Entendido'
            });
        }
    
        // Vaciar el arreglo para evitar alertas duplicadas en futuras ejecuciones
        casosAtrasados = [];
    }
  },
// 
      fixedHeader: true  // Activar el encabezado fijo
    });

    // Inicializa la DataTable con las filas seleccionadas
    $('#scroll_vertical_dynamic_height_table').DataTable({
      data: selectedRows2,
      scrollY: 300,
    scrollX: true,
      columns: [
        { title: "PAS" },
        { title: "Cliente" },
        { title: "Estado" },
        { title: "Informe/Historial",
          render: function(data, type, row, meta) {
            // Si la celda contiene una URL, muestra un enlace cliqueable
            return data ? `<pre  style="max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" data-bs-toggle="tooltip" data-bs-placement="top" title="${data}">${data}</pre>` : '';
          }
          
         },//46
        { title: "Tipo de reclamo" },
        { title: "Monto a reclamar" },
        { title: "Compañía a reclamar" },
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
        { title: "Atrasado", visible: false }, // Columna oculta para indicador
        {
          title: "Acciones",
          render: function(data, type, row, meta) {
            return `<button class="btn btn-primary" type="button" onclick="editarFila(${meta.row})">Editar</button>`;
          }
        }
      ],
      order: [[9, 'desc']], // Ordenar por la columna de indicador (9) en orden descendente
      createdRow: function (row, data, dataIndex) {
        const cliente = data[1]; // Nombre del cliente (columna 4 en selectedRows2)
        const urlVacia = data[8];
        const estadoProhibido = data[2];

        if (clientesAtrasados.includes(cliente)&& estadoProhibido !== "A.CERRADO/FACTURADO") {
            $(row).addClass('table-danger'); // Pintar la fila de rojo
        }else if (urlVacia !== null &&  urlVacia !== '' ) {
          $(row).addClass('table-warning'); // Clase de Bootstrap para fila amarilla
      }


    },
      fixedHeader: true  // Activar el encabezado fijo
    });
  })
      .catch(error => console.error('Error al cargar datos de Google Sheets:', error));
  });
  function editarFila(rowIndex) {
    console.log('rowIndex',rowIndex);
    const rowData = $('#table2').DataTable().row(rowIndex).data();
   
    
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
        gestionadoCon: rowData[17],
        urlAdjuntos: rowData[18],
        ingresoCia: rowData[21],
        honorarios: rowData[22],
    });

    if (window.opener) {
        window.close();
    }
    // Abrir en nueva pestaña pasando la información en la URL
    window.location.href =`../../html/edicionGestion.html?${urlParams.toString()}`;
  }