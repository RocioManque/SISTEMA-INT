// Captura los parámetros de la URL
const params = new URLSearchParams(window.location.search);
const rowIndex = params.get('row')
const pas = params.get('pas');
const cliente = params.get('cliente');
const telefonoCliente = params.get('telefonoCliente');
const mailCliente = params.get('mailCliente');
const fechaIngreso = params.get('fechaIngreso');
const fechaInicio = params.get('fechaInicio');
const numeroInterno = params.get('numeroInterno');
const planInt = params.get('planInt');
console.log(planInt)
const numeroReclamoCia = params.get('numeroReclamoCia');
console.log(numeroReclamoCia)
const estado = params.get('estado');
const observacion = params.get('observacion');
const informeHistorial = params.get('informeHistorial');
const tipoReclamo = params.get('tipoReclamo');
const montoReclamar = params.get('montoReclamar');
const montoCerrado = params.get('montoCerrado');
const companiaReclamar = params.get('companiaReclamar');
const gestionadoCon = params.get('gestionadoCon');
console.log(typeof(fechaInicio))

   // Obtener la fecha actual
   const today = new Date();
        
   // Formatear la fecha a dd/mm/yy
   const day = String(today.getDate()).padStart(2, '0'); // Asegura dos dígitos
   const month = String(today.getMonth() + 1).padStart(2, '0'); // Mes +1 (0-indexado)
   const year = String(today.getFullYear()).slice(-2); // Últimos dos dígitos del año
   
   const formattedDate = `${day}/${month}/${year}`;
   console.log(formattedDate)
   // Asignar la fecha al input

// Luego muestra o manipula estos datos en la página según lo necesites
document.getElementById('pas').value = pas;
document.getElementById('cliente').value = cliente;
document.getElementById('ingreso').value = fechaIngreso;
fechaInicio === '' ? document.getElementById('inicio').value = formattedDate : document.getElementById('inicio').value = fechaInicio ;
document.getElementById('reclamo').value = numeroInterno;
document.getElementById('reclamoCia').value = numeroReclamoCia;
document.getElementById('planInt').value = planInt;
document.getElementById('tipoReclamo').value = tipoReclamo;
document.getElementById('montoReclamado').value = montoReclamar;
document.getElementById('montoCerrado').value = montoCerrado;
document.getElementById('ciaReclamar').value = companiaReclamar;
document.getElementById('estado').value = estado;
document.getElementById('gestionado').value = gestionadoCon;
document.getElementById('obs').value = observacion;
document.getElementById('email').value = mailCliente;
document.getElementById('telefono').value = telefonoCliente;
document.getElementById('historial').value = informeHistorial;
// Y así sucesivamente para otros campos


async function updateRowInSheet(updatedValues, ranges) {
    console.log(ranges)
    const spreadsheetId = '1QzbFeGvzlzxVYN53G_5Dkl7Lji41Q6_0iMCqhVJhHhs'; // Reemplaza con el ID de tu hoja de cálculo
    const range =`Sheet1!${ranges}`;
    console.log(typeof(range)) // Modifica según el rango necesario

    const body = {
        values: [updatedValues], // Array con los valores a actualizar en la fila
    };

    try {
        const response = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?valueInputOption=USER_ENTERED`,
            {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${gapi.client.getToken().access_token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            }
        );

        if (response.ok) {
            Swal.fire({
                title: '¡Éxito!',
                text: 'El caso se actualizó correctamente.',
                icon: 'success', // Puede ser 'success', 'error', 'warning', 'info', 'question'
                confirmButtonText: 'Aceptar',
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.href = '/html/casosEnGestion.html';
                }
              });
            const result = await response.json();
            console.log('Fila actualizada con éxito:', result);
        } else {
            Swal.fire({
                title: '¡ERROR!',
                text: 'El caso no pudo Actualizarse correctamente.',
                icon: 'error', // Puede ser 'success', 'error', 'warning', 'info', 'question'
                confirmButtonText: 'Aceptar'
              })
            console.error('Error al actualizar la fila:', await response.text());
        }
    } catch (error) {
        Swal.fire({
            title: '¡ERROR!',
            text: 'El caso no pudo Actualizarse correctamente.',
            icon: 'error', // Puede ser 'success', 'error', 'warning', 'info', 'question'
            confirmButtonText: 'Aceptar'
          })
        console.error('Error al actualizar la fila:', error);
    }
}
async function actualizar(e){
    const spreadsheetId = '1QzbFeGvzlzxVYN53G_5Dkl7Lji41Q6_0iMCqhVJhHhs'; 
    const today = new Date();
  const day = String(today.getDate()).padStart(2, '0'); // Asegura dos dígitos para el día
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
  const year = today.getFullYear();
const fechaHoy = `${day}/${month}/${year}`;
    // Supongamos que tienes valores para las columnas a actualizar
    const fechaIngreso = document.getElementById('ingreso').value; // Valor para actualizar en la columna deseada
    const nroInterno = document.getElementById('reclamo').value;
    const pas = document.getElementById('pas').value;
    const cliente = document.getElementById('cliente').value;
    const ciaReclamada = document.getElementById('ciaReclamar').value;
    const telefonoCliente = document.getElementById('telefono').value;
    const emailCliente = document.getElementById('email').value;
    const observaciones = document.getElementById('obs').value;
    const historial = document.getElementById('historial').value;
    const fechaInicio = document.getElementById('inicio').value;
    const planInt = document.getElementById('planInt').value;
    const nroReclamoCia = document.getElementById('reclamoCia').value;
    const estado = document.getElementById('estado').value;
    const tipoReclamo = document.getElementById('tipoReclamo').value;
    const montoReclamado = document.getElementById('montoReclamado').value;
    const montoCerrado = document.getElementById('montoCerrado').value;
    const ultimaActualizacion = fechaHoy
    
    
    // Crea la solicitud BatchUpdate
    const batchUpdateBody = {
        requests: [
            {
                updateCells: {   //updateCells: este actualiza fila segun range (row)
                   // sheetId: '454305688',
                   range: {   //range se utiliza en update
                    sheetId: '454305688',
                    startRowIndex: rowIndex - 1,
                    endRowIndex: rowIndex,
                    startColumnIndex: 0, 
                    endColumnIndex: 2 
                },
                    rows: [
                        {
                            values: [
                                { userEnteredValue: { stringValue: String(fechaIngreso) } },
                                { userEnteredValue: { stringValue: String(pas) } },            
                            ]
                        }
                    ],
                    fields: 'userEnteredValue'
                }
            },
            {
                updateCells: {   //updateCells: este actualiza fila segun range (row)
                   // sheetId: '454305688',
                   range: {   //range se utiliza en update
                    sheetId: '454305688',
                    startRowIndex: rowIndex - 1,
                    endRowIndex: rowIndex,
                    startColumnIndex: 3, 
                    endColumnIndex: 6, 
                },
                    rows: [
                        {
                            values: [
                                { userEnteredValue: { stringValue: String(nroInterno) } },  
                                { userEnteredValue: { stringValue: String(cliente) } },  
                                { userEnteredValue: { stringValue: String(ciaReclamada) } },       
                            ]
                        }
                    ],
                    fields: 'userEnteredValue'
                }
            },
            {
                updateCells: {   //updateCells: este actualiza fila segun range (row)
                   // sheetId: '454305688',
                   range: {   //range se utiliza en update
                    sheetId: '454305688',
                    startRowIndex: rowIndex - 1,
                    endRowIndex: rowIndex,
                    startColumnIndex: 7, 
                    endColumnIndex: 10 
                },
                    rows: [
                        {
                            values: [   
                                { userEnteredValue: { stringValue: String(telefonoCliente) } },  
                                { userEnteredValue: { stringValue: String(emailCliente) } },  
                                { userEnteredValue: { stringValue: String(observaciones) } }       
                            ]
                        }
                    ],
                    fields: 'userEnteredValue'
                }
            },
            {
                updateCells: {   //updateCells: este actualiza fila segun range (row)
                    //sheetId: '454305688',
                    range: {   //range se utiliza en update
                        sheetId: '454305688',
                        startRowIndex: rowIndex - 1,
                        endRowIndex: rowIndex,
                        startColumnIndex: 24, // Es el indice primero
                        endColumnIndex: 32 // Es el indice posterior
                    },
                    rows: [
                        {
                            values: [
                                { userEnteredValue: { stringValue: String(historial) } },
                                { userEnteredValue: { stringValue: String(fechaInicio) } },
                                { userEnteredValue: { stringValue: String(planInt) } },
                                { userEnteredValue: { stringValue: String(nroReclamoCia) } },
                                { userEnteredValue: { stringValue: String(estado) } },          
                                { userEnteredValue: { stringValue: String(tipoReclamo) } },          
                                { userEnteredValue: { stringValue: String(montoReclamado) } },          
                                { userEnteredValue: { stringValue: String(montoCerrado) } },          
                            ]
                        }
                    ],
                    fields: 'userEnteredValue'
                }
                
            },
            {
                updateCells: {   //updateCells: este actualiza fila segun range (row)
                    //sheetId: '454305688',
                    range: {   //range se utiliza en update
                        sheetId: '454305688',
                        startRowIndex: rowIndex - 1,
                        endRowIndex: rowIndex,
                        startColumnIndex: 55, // Es el indice primero
                        endColumnIndex: 56 // Es el indice posterior
                    },
                    rows: [
                        {
                            values: [
                                { userEnteredValue: { stringValue: String(ultimaActualizacion) } },          
                                 
                            ]
                        }
                    ],
                    fields: 'userEnteredValue'
                }
                
            }
        ]
    };

    try {
        const response = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${gapi.client.getToken().access_token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(batchUpdateBody),
            }
        );

        if (response.ok) {
            const result = await response.json();
            Swal.fire({
                title: '¡Éxito!',
                text: 'El caso se actualizó correctamente.',
                icon: 'success', // Puede ser 'success', 'error', 'warning', 'info', 'question'
                confirmButtonText: 'Aceptar',
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.href = '/html/casosEnGestion.html';
                }
              });
            console.log('Actualización múltiple realizada con éxito:', result);
        } else {
            Swal.fire({
                title: '¡ERROR!',
                text: 'El caso no pudo Actualizarse correctamente.',
                icon: 'error', // Puede ser 'success', 'error', 'warning', 'info', 'question'
                confirmButtonText: 'Aceptar'
              })
            console.error('Error en la actualización múltiple:', await response.text());
        }
    } catch (error) {
        Swal.fire({
            title: '¡ERROR!',
            text: 'El caso no pudo Actualizarse correctamente.',
            icon: 'error', // Puede ser 'success', 'error', 'warning', 'info', 'question'
            confirmButtonText: 'Aceptar'
          })
        console.error('Error en la actualización múltiple:', error);
    }
}
//enviar whatsapp 
document.getElementById('sendWhatsApp').addEventListener('click', function() {
    const phoneForm = document.getElementById('telefono').value
    const mensaje = document.getElementById('actualizacion').value;
    const cliente = document.getElementById('cliente').value;
    const pas = document.getElementById('pas').value;
    console.log(mensaje)
    const phoneNumber = phoneForm; // Reemplaza con el número de teléfono completo
    const message = `Estimado/a ${cliente} nos comunicamos de IN ITINERE, servicio de gestión de siniestros del productor de seguros ${pas} para mantenerlo informado: ${mensaje}`;
    
    // Codificar el mensaje para URL
    const encodedMessage = encodeURIComponent(message);
    
    // Construir la URL
    const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    
    // Abrir la URL en una nueva pestaña o ventana
    window.open(whatsappURL, '_blank');
  });

//legales

function legales(e){
    e.preventDefault();
    return gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1gzp1hLfZaZMQarKdxPnvtHeyTioqhd3vatL-UmFnlUI',
        range: 'sheet2',
      }).then(response => {
        const rows = response.result.values;
    
        if (!rows || rows.length === 0) {
          console.warn("No se encontraron datos en la hoja.");
       
        }
    
        // Obtener índice de columnas basado en la primera fila (encabezados)
        const headers = rows[0];
        const nameIndex = headers.indexOf("Nombre y Apellido");
        const permissionIndex = headers.indexOf("permisos");
    
        if (nameIndex === -1 || permissionIndex === -1) {
          console.error("No se encontraron las columnas 'nombre' o 'permiso' en la hoja.");
   
        }
    
        // Filtrar y obtener nombres con el permiso indicado
        const resultado = rows
          .slice(1) // Omitir encabezados
          .filter(row => row[permissionIndex] === 'LEGALES') // Filtrar por permiso
          .map(row => row[nameIndex]); // Obtener solo los nombres

          console.log('resultado',resultado[0])
          const valuesC = [
            resultado[0],   
        ];
       const rangeesC =  `C${rowIndex}:C${rowIndex}`;
        updateRowInSheet( valuesC,rangeesC);
        
      }).catch(error => {
        console.error("Error al leer datos de Google Sheets:", error);
       
      });
   
}
//facturacion
function facturacion(e){
    e.preventDefault();
    const estado = "FACTURACION";
    const valuesAC = [
        estado,   
    ];
   const rangeesAC =  `AC${rowIndex}:AC${rowIndex}`;
    updateRowInSheet( valuesAC,rangeesAC);
}


//desistido
function desistido(e){
    e.preventDefault();
    const estado = "DESISTIDO";
    const valuesAC = [
        estado,   
    ];
   const rangeesAC =  `AC${rowIndex}:AC${rowIndex}`;
    updateRowInSheet( valuesAC,rangeesAC);
}


//mediacion
function mediacion(e){
    e.preventDefault();
    const ejecutivo = "MARIANELA";
    const valuesC = [
        ejecutivo,   
    ];
   const rangeesC =  `C${rowIndex}:C${rowIndex}`;
    updateRowInSheet( valuesC,rangeesC);
}

// document.getElementById('dataForm').addEventListener('submit', async function (e) {
// e.preventDefault();

// const values = [
// document.getElementById('pas').value,
// document.getElementById('cliente').value,
// document.getElementById('fechaIngreso').value,
// document.getElementById('fechaInicio').value,
// document.getElementById('numeroReclamo').value,
// document.getElementById('estado').value,
// document.getElementById('ultimaActualizacion').value,
// document.getElementById('tipoReclamo').value,
// document.getElementById('monto').value,
// document.getElementById('compania').value,
// ];

// const spreadsheetId = '1vnJXUhAGGcI8xt-83_T2K_TzJNqhz2nYdcMhilSqkWY'; // Reemplaza con tu ID de hoja de cálculo
// const range = 'Sheet1!A2'; // Cambia esto según sea necesario

// try {
// const response = await gapi.client.sheets.spreadsheets.values.append({
//     spreadsheetId: spreadsheetId,
//     range: range,
//     valueInputOption: 'RAW',
//     resource: {
//         values: [values]
//     },
// });

// console.log(response);
// alert("Fila agregada exitosamente");
// document.getElementById('dataForm').reset(); // Resetea el formulario
// } catch (error) {
// console.error(error);
// alert("Error al agregar fila: " + error.message);
// }
// });