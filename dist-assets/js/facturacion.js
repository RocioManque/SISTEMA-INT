const spreadsheetId = '1QzbFeGvzlzxVYN53G_5Dkl7Lji41Q6_0iMCqhVJhHhs';
const apiKey = 'AIzaSyBLuMXUjJmU3XLfErAIH-iI4pXzmSnl-0E'; //  clave de API
const range = 'sheet1'; // 
let globalRowIndex = null;
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
              row[56] || "",
              row[34] || "",      
              row[33] || "",
              row[38] || "",    
              row[40] || "",   
              row[41] || "",   
              row[36] || "",   
              row[37] || "",
              row[42] || "",     
              row[43] || "",   
              row[44] || "",   
              row[45] || "",  
              row[46] || "",
              row[39] || "", 
              row[32] || "",    
              row[47] || "",   
              row[52] || "",     
            ];
          }
          return null; // Excluye filas que no coincidan
        })
        .filter(row => row !== null); // Elimina valores nulos de la lista
        const selectedRows2 = rows
        .map((row, index) => {
          // Añade la fila visible en la hoja (índice + 1 o + 2 si hay encabezados)
          const numeroFila = index + 1; 
      
          // Convierte el contenido de la columna a mayúsculas para comparar
          const tipoReclamo = (row[28] || "").toUpperCase();
      
          // Verifica si el tipo de reclamo es "FACTURACION"
          if (tipoReclamo === 'FACTURACION') {
            return [
      // Número de fila en Google Sheets
              row[35] || "",    // Información relevante
              row[26] || "",   
              row[28] || "",  
              row[29] || "",   
              row[31] || "",   
              row[56] || "",    
              row[33] || "",
              row[38] || "",    
              row[37] || "",
              row[39] || "",   
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
            { title: "Honorario Porcentaje" },//56
            { title: "Facturado por" },//34
            { title: "Fecha de facturación" },//33
            { title: "Total facturado sin IVA" },//38
            { title: "IVA" },//40
            { title: "Total facturado con IVA" },//41
            { title: "Consultores"},//36
            { title: "Comision PAS" },//37
            { title: "Retención IVA" },//42
            { title: "Retención ganancia" },//43
            { title: "Retención IIBB compañía" },//44
            { title: "Retención IIBB banco" },//45
            { title: "Gastos estructura" },//46
            { title: "Nro de factura/comprobante interno" },//39
            { title: "Fecha de Pago Factura" },//32
            { title: "Fecha de pago comisión" },//47
            { title: "Total percibido" },//52
            { title: "Acciones", render: function(data, type, row, meta) {
                return `  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="facturar(${meta.row})">
        Facturar
      </button> <button class="btn btn-primary mt-2" type="button" onclick="editarFila(${meta.row})">Editar</button>
      <button class="btn btn-primary mt-2" type="button" data-toggle="modal" data-target="#uploadFc" onclick="capturarRowIndex(${meta.row})" >Cargar Factura</button>`;
            }}
            
        ],
    });
    $('#table2').DataTable({
      data: selectedRows2,
      scrollY: 300,
      scrollX: true,
      columns: [
          { title: "Caso" }, //35
          { title: "Plan INT" },//26
          { title: "Estado" },//28
          { title: "Tipo de reclamo" },//29
          { title: "Monto cerrado" },//31
          { title: "Honorario Porcentaje" },//56
          { title: "Fecha de facturación" },//33
          { title: "Total facturado sin IVA" },//38
          { title: "Comision PAS" },//37
          { title: "Nro de factura/comprobante interno" },//39
          { title: "Acciones", render: function(data, type, row, meta) {
              return `  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="facturar(${meta.row})">
      Facturar
    </button> <button class="btn btn-primary mt-2" type="button" onclick="editarFila(${meta.row})">Editar</button>
    <button class="btn btn-primary mt-2" type="button" data-toggle="modal" data-target="#uploadFc" onclick="capturarRowIndex(${meta.row})" >Cargar Factura</button>`;
          }}
          
      ],
  });
        
      })
      .catch(error => console.error('Error al cargar datos de Google Sheets:', error));
  });
  //subir archivo
 // Capturar y almacenar el índice
async function capturarRowIndex(index) {
  globalRowIndex = index; // Almacena el índice en una variable global
  console.log('Desde capturar', globalRowIndex);
  return globalRowIndex; // Devuelve el índice capturado
}

 // Función para subir el archivo
 async function uploadFc() {
  Swal.fire({
    title: 'Cargando...',
    text: 'Por favor espera mientras se procesan los archivos.',
    allowOutsideClick: false,
    didOpen: () => {
        Swal.showLoading(); // Muestra un spinner mientras carga
    },
});
  // Asegúrate de que globalRowIndex tenga un valor antes de proceder
  if (globalRowIndex === null) {
      console.error('El índice no se ha capturado correctamente.');
      return;
  }

  // Recuperar los datos de la tabla
  const rowData = $('#zero_configuration_table').DataTable().row(globalRowIndex).data();
  if (!rowData) {
      console.error('No se encontró la fila correspondiente en la tabla.');
      return;
  }

  // Obtener el archivo del input
  const fileInput = document.getElementById('file-input');
  console.log(fileInput)
  if (!fileInput || !fileInput.files[0]) {
    Swal.close();
      alert('Por favor, selecciona un archivo antes de guardar.');
      return;
  }

  const file = fileInput.files[0];
  console.log('Archivo seleccionado:', file);

  // Ahora, realizamos el proceso de carga en Google Drive y actualización en Google Sheets
  try {
      const spreadsheetId = '1QzbFeGvzlzxVYN53G_5Dkl7Lji41Q6_0iMCqhVJhHhs';
      const rowIndexFile = rowData[0]; // Ajusta esto según cómo quieras identificar la fila
      console.log('Procesando archivo...');

      // Llamamos a la función para subir el archivo y actualizar la hoja de cálculo
      await uploadFileAndSaveToSheet(file, spreadsheetId, rowIndexFile);
  } catch (error) {
    Swal.close();
      console.error('Error al subir el archivo o actualizar la hoja:', error);
  }
}

  async function uploadFileAndSaveToSheet(file,spreadsheetId,rowIndex) {
    // Subir archivo a Google Drive
    const parentFolderId = '1XMMxiZmDI0ZWu9b4wa2yBAiENKsjjuRR'
    const metadata = {
        'name': file.name,
        'mimeType': file.type,
        'parents': [parentFolderId] // Carpeta donde se subirá el archivo
    };

    const formData = new FormData();
    formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    formData.append('file', file);
   
    try {
        const uploadResponse = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
            method: 'POST',
            headers: new Headers({ 'Authorization': 'Bearer ' + gapi.client.getToken().access_token }),
            body: formData
        });

        if (!uploadResponse.ok) {
          Swal.close();
            console.error('Error al subir archivo:', uploadResponse.statusText);
            return;
        }

        const uploadResult = await uploadResponse.json();
        const fileURL = `https://drive.google.com/file/d/${uploadResult.id}/view?usp=sharing`;

        console.log('Archivo subido. URL:', fileURL);

        // Actualizar Google Sheets con la URL del archivo
        const range = `sheet1!BC${rowIndex}`;
        const updateBody = {
            range,
            values: [[fileURL]] // La URL del archivo como un valor en la celda
        };

        const sheetsResponse = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?valueInputOption=USER_ENTERED`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + gapi.client.getToken().access_token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateBody)
        });
        Swal.close();
        if (sheetsResponse.ok) {
          $('#uploadFc').modal('hide');
          Swal.fire({
            title: '¡Éxito!',
            text: 'El archivo se subió Correctamente.',
            icon: 'success', // Puede ser 'success', 'error', 'warning', 'info', 'question'
            confirmButtonText: 'Aceptar',
              
          });
            console.log('Google Sheets actualizado con éxito.');
        } else {
            console.error('Error al actualizar Google Sheets:', await sheetsResponse.text());
        }
    } catch (error) {
        console.error('Error al procesar archivo y guardar enlace:', error);
    }
}


  function generarPDF() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0'); // Asegura dos dígitos
   const month = String(today.getMonth() + 1).padStart(2, '0'); // Mes +1 (0-indexado)
   const year = String(today.getFullYear()).slice(-2); // Últimos dos dígitos del año
   
   const formattedDate = `${day}/${month}/${year}`;
    html2pdf().from(document.getElementById('factura')).save(`${formattedDate}-Factura.pdf`)
  
  }

  function alertClick(){
    alert('Error en la conexion con el webservice. ERRORN36045...networking error:database doesnt work properly')
  }
  function facturar(rowIndex){ 
    
alertClick()

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
document.getElementById("condicionIva").textContent = ''; 
document.getElementById("domicilioCia").textContent = ''; 
document.getElementById("condicionVenta").textContent = ''; 
document.getElementById("casoProducto").textContent = rowData[1]; 
document.getElementById("precioUnitario").textContent = rowData[13]; 
document.getElementById("subtotal").textContent = rowData[13]; 
document.getElementById("subtotalFinal").textContent = rowData[13]; 
document.getElementById("importeTotal").textContent = rowData[13]; 
document.getElementById("nroCAE").textContent = ''; 
document.getElementById("fechaVtoCAE").textContent = ''; 

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
        fechaDePago: rowData[22],
        fechaFacturacion: rowData[10],
        facturadoPor: rowData[9],
        consultores: rowData[14],
        comisionPas: rowData[15],
        totalFacturadoSinIva: rowData[11],
        nroFactura: rowData[21],
        iva: rowData[12],
        totalFacturadoConIva: rowData[13],
        retencionIva: rowData[16],
        retencionGanancia: rowData[17],
        retencionIBcompania: rowData[18],
        retencionIBbanco: rowData[19],
        gastosEstructura: rowData[20],
        fechaDePagoComision: rowData[23],
        totalPercibido: rowData[24],
    });

    if (window.opener) {
        window.close();
    }
    // Abrir en nueva pestaña pasando la información en la URL
    window.location.href =`../../html/editarFacturacion.html?${urlParams.toString()}`;
  }