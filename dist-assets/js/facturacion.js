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
     

        // Separa el nombre y apellido (asumiendo que están separados por un espacio)
      

        // Filtra las filas antes de construir selectedRows
        const selectedRows = rows
        .map((row, index) => {
          // Añade la fila visible en la hoja (índice + 1 o + 2 si hay encabezados)
          const numeroFila = index + 1; 
      
          // Convierte el contenido de la columna a mayúsculas para comparar
          const tipoReclamo = (row[28] || "").toUpperCase();
      
          // Verifica si el tipo de reclamo es "FACTURACION"
          if (tipoReclamo === 'FACTURACION') {
            return [
              numeroFila,       // Número de fila en Google Sheets
              row[35] || "",    // Información relevante
              row[26] || "",   
              row[28] || "",  
              row[29] || "", 
              row[27] || "",   
              row[30] || "",   
              row[31] || "",   
              row[32] || "",   
              row[33] || "",  
              row[34] || "",   
              row[36] || "",   
              row[37] || "",   
              row[38] || "",   
              row[39] || "",   
              row[40] || "",   
              row[41] || "",   
              row[42] || "",   
              row[43] || "",   
              row[44] || "",   
              row[45] || "",   
              row[46] || "",   
              row[47] || "",   
              row[52] || ""   
            ];
          }
          return null; // Excluye filas que no coincidan
        })
        .filter(row => row !== null); // Elimina valores nulos de la lista
      
      console.log(selectedRows);
      $('#zero_configuration_table').DataTable({
        data: selectedRows,
        columns: [
            { title: "Nº" }, //index
            { title: "Caso" }, //35
            { title: "Plan INT" },//26
            { title: "Estado" },//28
            { title: "Tipo de reclamo" },//29
            { title: "Nro reclamo CIA" },//27
            { title: "Monto reclamado" },//30
            { title: "Monto cerrado" },//31
            { title: "Fecha de Pago" },//32
            { title: "Fecha de facturación" },//33
            { title: "Facturado por" },//34
            { title: "Consultores"},//36
            { title: "Comision PAS" },//37
            { title: "Total facturado sin IVA" },//38
            { title: "Nro de factura/comprobante interno" },//39
            { title: "IVA" },//40
            { title: "Total facturado con IVA" },//41
            { title: "Retención IVA" },//42
            { title: "Retención ganancia" },//43
            { title: "Retención IIBB compañía" },//44
            { title: "Retención IIBB banco" },//45
            { title: "Gastos estructura" },//46
            { title: "Fecha de pago comisión" },//47
            { title: "Total percibido" },//52
            { title: "Acciones", render: function(data, type, row, meta) {
                return `  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="facturar(${meta.row})">
        Facturar
      </button> <button class="btn btn-primary mt-2" type="button" onclick="editarFila(${meta.row})">Editar</button>`;
            }}
            
        ],
    });
        
      })
      .catch(error => console.error('Error al cargar datos de Google Sheets:', error));
  });
  
  function generarPDF() {
    html2pdf().from(document.getElementById('factura')).save('Factura-000010.pdf')
  }

  function alertClick(){
    alert('Error en la conexion con el webservice. ERRORN36045...networking error: database dosen`t work properly')
  }
  function facturar(rowIndex){ 
    
    const table = $('#zero_configuration_table').DataTable();
    const rowData = table.row(rowIndex).data();  
    console.log(rowData)// Obtener los datos de la fila seleccionada
     // Obtener la fecha actual
   const today = new Date();
        
   // Formatear la fecha a dd/mm/yy
   const day = String(today.getDate()).padStart(2, '0'); // Asegura dos dígitos
   const month = String(today.getMonth() + 1).padStart(2, '0'); // Mes +1 (0-indexado)
   const year = String(today.getFullYear()).slice(-2); // Últimos dos dígitos del año
   
   const formattedDate = `${day}/${month}/${year}`;
console.log(formattedDate)
   // Asignar la fecha al inputdocument.getElementById("comprobante").textContent = caeNumero;
document.getElementById("fechaEmision").textContent = formattedDate;
document.getElementById("facturadoDesde").textContent = formattedDate;
document.getElementById("facturadoHasta").textContent = formattedDate;
document.getElementById("vtoPagoFactura").textContent = formattedDate;
document.getElementById("cuitEmpresa").textContent = ''; 
document.getElementById("razonSocial").textContent = ''; 
document.getElementById("condicionIva").textContent = 'IVA Responsable Inscripto'; 
document.getElementById("domicilioCia").textContent = ''; 
document.getElementById("condicionVenta").textContent = ''; 
document.getElementById("casoProducto").textContent = rowData[1]; 
document.getElementById("precioUnitario").textContent = rowData[13]; 
document.getElementById("subtotal").textContent = rowData[13]; 
document.getElementById("subtotalFinal").textContent = rowData[13]; 
document.getElementById("importeTotal").textContent = rowData[13]; 
document.getElementById("nroCAE").textContent = ' '; 
document.getElementById("fechaVtoCAE").textContent = ' '; 

alertClick()  

  }
  function editarFila(rowIndex) {
    const rowData = $('#zero_configuration_table').DataTable().row(rowIndex).data();
    
    // Construir la URL con los datos de la fila
    const urlParams = new URLSearchParams({
        index: rowData[0],
        caso: rowData[1],
        plan: rowData[2],
        estado: rowData[3],
        tipoReclamo: rowData[4],
        nroReclamoCia: rowData[5],
        montoReclamado: rowData[6],
        montoCerrado: rowData[7],
        fechaDePago: rowData[8],
        fechaFacturacion: rowData[9],
        facturadoPor: rowData[10],
        consultores: rowData[11],
        comisionPas: rowData[12],
        totalFacturadoSinIva: rowData[13],
        nroFactura: rowData[14],
        iva: rowData[15],
        totalFacturadoConIva: rowData[16],
        retencionIva: rowData[17],
        retencionGanancia: rowData[18],
        retencionIBcompania: rowData[19],
        retencionIBbanco: rowData[20],
        gastosEstructura: rowData[21],
        fechaDePagoComision: rowData[22],
        totalPercibido: rowData[23],
    });

    if (window.opener) {
        window.close();
    }
    // Abrir en nueva pestaña pasando la información en la URL
    window.location.href =`../../html/editarFacturacion.html?${urlParams.toString()}`;
  }