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
        .filter(row => {
            // Convierte el nombre del cliente a mayúsculas y compara
            return (row[28] || "").toUpperCase() === 'FACTURACION';
        })
          .map((row) => [
        row[35] || "",  
        row[26] || "",   
        row[28] || "",  
        row[29] || "", 
        row[27] || "",   
        row[30] || "",   
        row[31] || "",   
        row[32] || "",   
        row[33] || "",  
        row[34] || "" ,   
        row[36] || "" ,   
        row[37] || "" ,   
        row[38] || "" ,   
        row[39] || "" ,   
        row[40] || "" ,   
        row[41] || "" ,   
        row[42] || "" ,   
        row[43] || "" ,   
        row[44] || "" ,   
        row[45] || "" ,   
        row[46] || "" ,   
        row[47] || "" ,   
        row[52] || "" ,   
      
      ]);
      console.log(selectedRows)
      $('#zero_configuration_table').DataTable({
        data: selectedRows,
        columns: [
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
                return ` <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
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
    alert('Error en la conexion con el webservice. ERRORN36045...networking error:database dosent work properly')
  }
  function facturar(){

  }
  function editarFila(rowIndex) {
    const rowData = $('#zero_configuration_table').DataTable().row(rowIndex).data();
    
    // Construir la URL con los datos de la fila
    const urlParams = new URLSearchParams({

        caso: rowData[0],
        plan: rowData[1],
        estado: rowData[2],
        tipoReclamo: rowData[3],
        nroReclamoCia: rowData[4],
        montoReclamado: rowData[5],
        montoCerrado: rowData[6],
        fechaDePago: rowData[7],
        fechaFacturacion: rowData[8],
        facturadoPor: rowData[9],
        consultores: rowData[10],
        comisionPas: rowData[11],
        totalFacturadoSinIva: rowData[12],
        nroFactura: rowData[13],
        iva: rowData[14],
        totalFacturadoConIva: rowData[15],
        retencionIva: rowData[16],
        retencionGanancia: rowData[17],
        retencionIBcompania: rowData[18],
        retencionIBbanco: rowData[19],
        gastosEstructura: rowData[20],
        totalPercibido: rowData[21],
    });

    if (window.opener) {
        window.close();
    }
    // Abrir en nueva pestaña pasando la información en la URL
    window.location.href =`../../html/editarFacturacion.html?${urlParams.toString()}`;
  }