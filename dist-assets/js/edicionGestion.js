// Captura los parámetros de la URL
const params = new URLSearchParams(window.location.search);
const rowIndex = params.get('row')
console.log('index',rowIndex)
const pas = params.get('pas');
const cliente = params.get('cliente');
const telefonoCliente = params.get('telefonoCliente');
const mailCliente = params.get('mailCliente');
const fechaIngreso = params.get('fechaIngreso');
const fechaInicio = params.get('fechaInicio');
const numeroInterno = params.get('numeroInterno');
const planInt = params.get('planInt');
const numeroReclamoCia = params.get('numeroReclamoCia');
const estado = params.get('estado');
const observacion = params.get('observacion');
const informeHistorial = params.get('informeHistorial');
const tipoReclamo = params.get('tipoReclamo');
const montoReclamar = params.get('montoReclamar');
const montoCerrado = params.get('montoCerrado');
const companiaReclamar = params.get('companiaReclamar');
const gestionadoCon = params.get('gestionadoCon');
const urlAdjuntos = params.get('urlAdjuntos');
const ingresoCia = params.get('ingresoCia');
const honorarios = params.get('honorarios');
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
const day = String(today.getDate()).padStart(2, '0'); // Asegura dos dígitos para el día

const formattedDate = `${year}-${month}-${day}`;
   console.log(formattedDate)
   // Asignar la fecha al input
   const spreadsheetId0 = '1gzp1hLfZaZMQarKdxPnvtHeyTioqhd3vatL-UmFnlUI';
   const spreadsheetId2 = '1FdJtx_Dr8dgvC-9HWfckT8qzHm8BikoSbV9EORXSEb8';
   const apiKey2 = 'AIzaSyBLuMXUjJmU3XLfErAIH-iI4pXzmSnl-0E'; //  clave de API
   const range0 = 'sheet1'; // 
   const range2 = 'Hoja 1'; // 
   const range3 = 'Hoja 2'; // 
   const range4 = 'Hoja 3'; // 
   const range5 = 'Hoja 4'; // 
   
   // URL de la API de Google Sheets
   const url0 = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId0}/values/${range0}?key=${apiKey2}`;
   const url2 = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId2}/values/${range2}?key=${apiKey2}`;
   const url3 = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId2}/values/${range3}?key=${apiKey2}`;
   const url4 = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId2}/values/${range4}?key=${apiKey2}`;
   const url5 = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId2}/values/${range5}?key=${apiKey2}`;
   $(document).ready(function() {
    
       // Inicializa Select2 en el elemento select
       $('#pasDropdown').select2({
           placeholder: 'Seleccione un nombre',
           allowClear: true,
           width: '100%'
       });
   
       $('#ciaReclamar').select2({
           placeholder: 'Seleccione un nombre',
           allowClear: true,
           width: '100%'
       });
       $('#tipoReclamo').select2({
           placeholder: 'Seleccione un nombre',
           allowClear: true,
           width: '90%'
       });
       $('#estado').select2({
           placeholder: 'Seleccione un nombre',
           
           width: '90%'
       });
       $('#honorarios').select2({
        placeholder: 'Seleccione un nombre',
        
        width: '90%'
    });
   
       // Realiza la solicitud fetch para obtener datos dinámicos
       fetch(url0)
           .then(response => {
               if (!response.ok) {
                   throw new Error(`HTTP error! status: ${response.status}`);
               }
               return response.json();
           })
           .then(data => {
               const rows = data.values;
               console.log(rows);
   
               // Extrae los nombres de la tercera columna (índice [2]), excluyendo la primera fila (cabeceras)
               const selectedRows = rows.slice(1).map(row => row[2]);
               
               // Prepara la lista dinámica en el formato que Select2 espera (id y text)
               const listaDinamica = selectedRows.map((nombre, index) => ({
                   id: nombre,
                   text: nombre
               }));
   
               console.log('Lista Dinámica:', listaDinamica);
   
               // Cargar la lista dinámica en el dropdown
               $('#pasDropdown').select2({
                   data: listaDinamica
               });
               $('#pasDropdown').val(pas).trigger('change');
           })
           .catch(error => console.error('Error al cargar datos', error));
           
          fetch(url2)
           .then(response => {
               if (!response.ok) {
                   throw new Error(`HTTP error! status: ${response.status}`);
               }
               return response.json();
           })
           .then(data => {
               const rows = data.values;
               console.log(rows);
   
               // Extrae los nombres de la tercera columna (índice [2]), excluyendo la primera fila (cabeceras)
               const selectedRows = rows.slice(1).map(row => row[0]);
               
               // Prepara la lista dinámica en el formato que Select2 espera (id y text)
               const listaDinamica2 = selectedRows.map((nombre, index) => ({
                   id: nombre,
                   text: nombre
               }));
   
               console.log('Lista Dinámica:', listaDinamica2);
   
               // Cargar la lista dinámica en el dropdown
               $('#ciaReclamar').select2({
                   data: listaDinamica2
               });
               $('#ciaReclamar').val(companiaReclamar).trigger('change');
           })
           .catch(error => console.error('Error al cargar datos', error));
           fetch(url3)
           .then(response => {
               if (!response.ok) {
                   throw new Error(`HTTP error! status: ${response.status}`);
               }
               return response.json();
           })
           .then(data => {
               const rows = data.values;
               console.log(rows);
   
               // Extrae los nombres de la tercera columna (índice [2]), excluyendo la primera fila (cabeceras)
               const selectedRows = rows.slice(1).map(row => row[0]);
               
               // Prepara la lista dinámica en el formato que Select2 espera (id y text)
               const listaDinamica3 = selectedRows.map((nombre, index) => ({
                   id: nombre,
                   text: nombre
               }));
   
               console.log('Lista Dinámica:', listaDinamica3);
   
               // Cargar la lista dinámica en el dropdown
               $('#estado').select2({
                   data: listaDinamica3
               });
               $('#estado').val(estado).trigger('change');
   
           })
           .catch(error => console.error('Error al cargar datos', error));
           fetch(url4)
           .then(response => {
               if (!response.ok) {
                   throw new Error(`HTTP error! status: ${response.status}`);
               }
               return response.json();
           })
           .then(data => {
               const rows = data.values;
               console.log(rows);
   
               // Extrae los nombres de la tercera columna (índice [2]), excluyendo la primera fila (cabeceras)
               const selectedRows = rows.slice(1).map(row => row[0]);
               
               // Prepara la lista dinámica en el formato que Select2 espera (id y text)
               const listaDinamica3 = selectedRows.map((nombre, index) => ({
                   id: nombre,
                   text: nombre
               }));
   
               console.log('Lista Dinámica:', listaDinamica3);
   
               // Cargar la lista dinámica en el dropdown
               $('#tipoReclamo').select2({
                   data: listaDinamica3
               });
               $('#tipoReclamo').val(tipoReclamo).trigger('change');
   
           })
           .catch(error => console.error('Error al cargar datos', error));
           fetch(url5)
           .then(response => {
               if (!response.ok) {
                   throw new Error(`HTTP error! status: ${response.status}`);
               }
               return response.json();
           })
           .then(data => {
               const rows = data.values;
   
               // Extrae los nombres de la tercera columna (índice [2]), excluyendo la primera fila (cabeceras)
               const selectedRows = rows.slice(1).map(row => row[0]);
               
               // Prepara la lista dinámica en el formato que Select2 espera (id y text)
               const listaDinamica4 = selectedRows.map((nombre, index) => ({
                   id: nombre,
                   text: nombre
               }));
   
               console.log('Lista Dinámica:', listaDinamica4);
   
               // Cargar la lista dinámica en el dropdown
               $('#honorarios').select2({
                   data: listaDinamica4
               });
               $('#honorarios').val(honorarios).trigger('change');
   
           })
           .catch(error => console.error('Error al cargar datos', error));
   
   });

document.getElementById('cliente').value = cliente;
document.getElementById('ingreso').value = fechaIngreso;
fechaInicio === '' ? document.getElementById('inicio').value = formattedDate : document.getElementById('inicio').value = fechaInicio ;
document.getElementById('reclamo').value = numeroInterno;
document.getElementById('reclamoCia').value = numeroReclamoCia;
document.getElementById('planInt').value = planInt;
document.getElementById('montoReclamado').value = montoReclamar;
document.getElementById('montoCerrado').value = montoCerrado;
document.getElementById('gestionado').value = gestionadoCon;
document.getElementById('obs').value = observacion;
document.getElementById('email').value = mailCliente;
document.getElementById('telefono').value = telefonoCliente;
document.getElementById('historial').value = informeHistorial;
document.getElementById('ingresoCia').value = ingresoCia;
document.getElementById('honorarios').value = honorarios;

//upload Multiple Files
function updateProgressBar(percentage) {
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = `${percentage}%`;
    progressBar.setAttribute('aria-valuenow', percentage);
    progressBar.innerText = `${percentage}%`;
}
function addToResults(fileName, url, isSuccess) {
    const uploadResults = document.getElementById('upload-results');
    const listItem = document.createElement('li');
    listItem.textContent = isSuccess
        ? `✅ ${fileName} - Uploaded: ${url}`
        : `❌ ${fileName} - Upload failed`;
    listItem.style.color = isSuccess ? 'green' : 'red';
    uploadResults.appendChild(listItem);
}
async function uploadMultipleFiles(files, folderId) {
    const progressContainer = document.getElementById('progress-container');
    const uploadResults = document.getElementById('upload-results');

    // Mostrar barra de progreso y limpiar resultados previos
    progressContainer.style.display = 'block';
    uploadResults.innerHTML = '';
    updateProgressBar(0);

    const totalFiles = files.length;
    let completedFiles = 0;

    for (const file of files) {
        try {
            const url = await uploadFile(file, folderId);
            addToResults(file.name, url, !!url);
        } catch (error) {
            console.error('Error al subir archivo:', file.name, error);
            addToResults(file.name, '', false);
        }

        // Actualizar barra de progreso
        completedFiles++;
        const progressPercentage = Math.round((completedFiles / totalFiles) * 100);
        updateProgressBar(progressPercentage);
    }

    // Ocultar barra de progreso después de completar
    setTimeout(() => {
        progressContainer.style.display = 'none';
    }, 2000);
}

async function uploadFile(file, parentFolderId) {
    const metadata = {
        'name': file.name,
        'mimeType': file.type,
        'parents': [parentFolderId] // Especificamos la carpeta padre
    };

    const formData = new FormData();
    formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    formData.append('file', file);

    try {
        const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
            method: 'POST',
            headers: new Headers({ 'Authorization': 'Bearer ' + gapi.client.getToken().access_token }),
            body: formData
        });

        if (response.ok) {
            const result = await response.json();
            const fileURL = `https://drive.google.com/file/d/${result.id}/view?usp=sharing`;
            return fileURL;
        } else {
            console.error('Error al subir archivo:', response.statusText);
        }
    } catch (error) {
        console.error('Error al subir archivo:', error);
    }

    return null; // Retorna null si hubo un error
}
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
                text: 'Los cambios se guardaron correctamente.',
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
                title: '¡UPS!',
                text: 'Los cambios no se guardaron correctamente.',
                icon: 'error', // Puede ser 'success', 'error', 'warning', 'info', 'question'
                confirmButtonText: 'Aceptar'
              })
            console.error('Error al actualizar la fila:', await response.text());
        }
    } catch (error) {
        Swal.fire({
            title: '¡UPS!',
            text: 'Los cambios no se guardaron correctamente.',
            icon: 'error', // Puede ser 'success', 'error', 'warning', 'info', 'question'
            confirmButtonText: 'Aceptar'
          })
        console.error('Error al actualizar la fila:', error);
    }
}
async function actualizar(e){
    Swal.fire({
        title: 'Cargando...',
        text: 'Por favor espera mientras se procesan los archivos.',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading(); // Muestra un spinner mientras carga
        },
    });
       // Obtener la fecha y hora actual
const now = new Date();

// Formatear la fecha a dd/mm/yy
const day = String(now.getDate()).padStart(2, '0'); // Asegura dos dígitos
const month = String(now.getMonth() + 1).padStart(2, '0'); // Mes +1 (0-indexado)
const year = String(now.getFullYear()).slice(-2); // Últimos dos dígitos del año

// Formatear la hora a hh:mm:ss
const hours = String(now.getHours()).padStart(2, '0');
const minutes = String(now.getMinutes()).padStart(2, '0');
const seconds = String(now.getSeconds()).padStart(2, '0');

// Combinar fecha y hora
const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
console.log(formattedDateTime);
const newText = document.getElementById('actualizacion').value;
const oldText = document.getElementById('historial').value;
const historialConcat = `${oldText} \n ${formattedDateTime} ${newText}`;
const actualizacion = document.getElementById('actualizacion').value.trim();
//document.getElementById('actualizacion') ? historialConcat : document.getElementById('historial').value,
    const spreadsheetId = '1QzbFeGvzlzxVYN53G_5Dkl7Lji41Q6_0iMCqhVJhHhs'; 
    const today = new Date();
    const daya = String(today.getDate()).padStart(2, '0'); // Asegura dos dígitos para el día
    const montha = String(today.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
    const yeara = today.getFullYear();
const fechaHoy = `${daya}/${montha}/${yeara}`;
    // Supongamos que tienes valores para las columnas a actualizar
    const fechaIngreso = document.getElementById('ingreso').value; // Valor para actualizar en la columna deseada
    const nroInterno = document.getElementById('reclamo').value;
    const pas = document.getElementById('pasDropdown').value;
    const cliente = document.getElementById('cliente').value;
    const ciaReclamada = document.getElementById('ciaReclamar').value;
    const telefonoCliente = document.getElementById('telefono').value;
    const emailCliente = document.getElementById('email').value;
    const observaciones = document.getElementById('obs').value;
    const nuevoHistorial = actualizacion !== '' ? historialConcat : oldText;
    const fechaInicio = document.getElementById('inicio').value;
    const planInt = document.getElementById('planInt').value;
    const nroReclamoCia = document.getElementById('reclamoCia').value;
    const estado = document.getElementById('estado').value;
    const gestionado = document.getElementById('gestionado').value;
    console.log(gestionado)
    const tipoReclamo = document.getElementById('tipoReclamo').value;
    const montoReclamado = document.getElementById('montoReclamado').value;
    const montoCerrado = document.getElementById('montoCerrado').value;
    const ingresadoCia = document.getElementById('ingresoCia').value;
    const caso = cliente + ' contra ' + ciaReclamada
    const ultimaActualizacion = fechaHoy
     // Subir archivos
     const url = urlAdjuntos;
     const folderId = url.split('/').pop();
     const fileInput = document.getElementById('file-input');
     const files = fileInput.files;// Cambia esto con la carpeta específica
     const urls = []; // Guardará las URLs de los archivos subidos
 
     if (files.length > 0) {
         try {
             console.log(`${files.length} archivos seleccionados para subir.`);
             const progressContainer = document.getElementById('progress-container');
             progressContainer.style.display = 'block'; // Mostrar barra de progreso
 
             // Subir los archivos y guardar las URLs
             for (const file of files) {
                 const url = await uploadFile(file, folderId);
                 urls.push(url); // Agregar cada URL al array
             }
 
             console.log('Subida completada:', urls);
         } catch (error) {
             console.error('Error al subir archivos:', error);
             Swal.fire({
                 title: '¡Error!',
                 text: 'No se pudieron subir los archivos.',
                 icon: 'error',
                 confirmButtonText: 'Aceptar',
             });
             return;
         }
     } else {
         console.log('No se seleccionaron archivos.');
     }
    
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
                                { userEnteredValue: { stringValue: String(nuevoHistorial) } },
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
                        startColumnIndex: 35, // Es el indice primero
                        endColumnIndex: 36 // Es el indice posterior
                    },
                    rows: [
                        {
                            values: [
                                { userEnteredValue: { stringValue: String(caso) } },     
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
                        startColumnIndex: 48, // Es el indice primero
                        endColumnIndex: 49 // Es el indice posterior
                    },
                    rows: [
                        {
                            values: [
                                { userEnteredValue: { stringValue: String(gestionado) } },        
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
                
            },
            {
                updateCells: {   //updateCells: este actualiza fila segun range (row)
                    //sheetId: '454305688',
                    range: {   //range se utiliza en update
                        sheetId: '454305688',
                        startRowIndex: rowIndex - 1,
                        endRowIndex: rowIndex,
                        startColumnIndex: 57, // Es el indice primero
                        endColumnIndex: 58 // Es el indice posterior
                    },
                    rows: [
                        {
                            values: [
                                { userEnteredValue: { stringValue: String(ingresadoCia) } },          
                                 
                            ]
                        }
                    ],
                    fields: 'userEnteredValue'
                }
                
            }
        ]
    };
    Swal.close();
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
                text: 'Los cambios se guardaron correctamente.',
                icon: 'success', // Puede ser 'success', 'error', 'warning', 'info', 'question'
                confirmButtonText: 'Aceptar',
              }).then((result) => {
                Swal.fire({
                    title: '¡Atención!',
                    text: '¿Querés volver a tus casos en gestión?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sí, vamos',
                    cancelButtonText: 'No, me quedo'
                  }).then((result) => {
                    if (result.isConfirmed) {
                      Swal.fire(
                        '¡Genial!',
                        'Redirigiendo...',
                        'success'
                      );
                      window.location.href = '/html/casosEnGestion.html'; 
                    }else{
                        document.getElementById('desistido').classList.remove('disabled'); 
                        document.getElementById('desistido').style.pointerEvents = 'auto'; 
                        document.getElementById('enviarFacturacion').classList.remove('disabled'); 
                        document.getElementById('enviarFacturacion').style.pointerEvents = 'auto'; 
                        document.getElementById('mediacion').classList.remove('disabled'); 
                        document.getElementById('mediacion').style.pointerEvents = 'auto'; 
                        document.getElementById('legales').classList.remove('disabled'); 
                        document.getElementById('legales').style.pointerEvents = 'auto'; 
                        document.getElementById('sendWhatsApp').classList.remove('disabled'); 
                        document.getElementById('sendWhatsApp').style.pointerEvents = 'auto'; 
                        console.log('nos quedamos')
                    }
                  });
                  
              });
        } else {
            Swal.fire({
                title: '¡UPS!',
                text: 'Los cambios no pueden guardarse correctamente.',
                icon: 'error', // Puede ser 'success', 'error', 'warning', 'info', 'question'
                confirmButtonText: 'Aceptar'
              })
            console.error('Error en la actualización múltiple:', await response.text());
        }
    } catch (error) {
        Swal.fire({
            title: '¡UPS!',
            text: 'Los cambios no pueden guardarse correctamente.',
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
    const pas = document.getElementById('pasDropdown').value;
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
          .filter(row => row[permissionIndex] === 'legales') // Filtrar por permiso
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
function calcularComisionPas(plan, montoCerrado) {
    const porcentaje = {
      "INT 1": 0.01,
      "INT 2": 0.02,
      "INT 3": 0.03,
    };
  
    // Devuelve el monto multiplicado por el porcentaje correspondiente
    const montoDecimal = Number(montoCerrado.toFixed(2)); 
    return montoDecimal * (porcentaje[plan] || 0);
  }
  
async function facturacion(e){
    e.preventDefault();
    const spreadsheetId = '1QzbFeGvzlzxVYN53G_5Dkl7Lji41Q6_0iMCqhVJhHhs';

    // Función para calcular la comisión pas

  // Ejemplo de uso en tu sistema
  const plan = document.getElementById("planInt").value; // Obtener el plan del input
  const montoCerrado = Number(
    document.getElementById("montoCerrado").value.replace(/\./g, "").replace(",", ".")
); // Convertir el monto cerrado a número
  
  const comisionPas = calcularComisionPas(plan, montoCerrado);
  const comisionFormateada = comisionPas.toLocaleString("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});
const honorariosStr = document.getElementById('honorarios').value; // Obtiene el valor como string
const porcentaje = document.getElementById('honorarios').value;
    const montoCerradoStr = document.getElementById('montoCerrado').value; // Obtiene el valor como string
    const montoCerradoEnviar = parseInt(montoCerradoStr.replace(/\./g, ''), 10); 
    const honorarios = parseInt(porcentaje.replace('%', ''), 10);
    const montoFacturado = (montoCerradoEnviar * honorarios)/100;
    const montoFormateado = montoFacturado.toLocaleString("es-ES", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    const estado = "A FACTURAR";
//     const valuesAC = [
//         estado,   
//     ];
//    const rangeesAC =  `AC${rowIndex}:AC${rowIndex}`;
//     updateRowInSheet( valuesAC,rangeesAC);
    const batchUpdateBody = {
        requests: [
            {
                updateCells: {   //updateCells: este actualiza fila segun range (row)
                   // sheetId: '454305688',
                   range: {   //range se utiliza en update
                    sheetId: '454305688',
                    startRowIndex: rowIndex - 1,
                    endRowIndex: rowIndex,
                    startColumnIndex: 28, 
                    endColumnIndex: 29 
                },
                    rows: [
                        {
                            values: [
                                { userEnteredValue: { stringValue: String(estado) } },        
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
                    startColumnIndex: 37, 
                    endColumnIndex: 39 
                },
                    rows: [
                        {
                            values: [
                                { userEnteredValue: { stringValue: String(comisionFormateada) } },        
                                { userEnteredValue: { stringValue: String(montoFormateado) } },        
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
                    startColumnIndex: 56, 
                    endColumnIndex: 57, 
                },
                    rows: [
                        {
                            values: [
                                { userEnteredValue: { stringValue: String(porcentaje) } },    
                            ]
                        }
                    ],
                    fields: 'userEnteredValue'
                }
            },
        ]
    };
    Swal.close();
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
                text: 'El caso fue derivado Correctamente.',
                icon: 'success', // Puede ser 'success', 'error', 'warning', 'info', 'question'
                confirmButtonText: 'Aceptar',
              }).then((result) => {
                Swal.fire({
                    title: '¡Atención!',
                    text: '¿Querés volver a tus casos en gestión?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sí, vamos',
                    cancelButtonText: 'No, me quedo'
                  }).then((result) => {
                    if (result.isConfirmed) {
                      Swal.fire(
                        '¡Genial!',
                        'Redirigiendo...',
                        'success'
                      );
                      window.location.href = '/html/casosEnGestion.html'; 
                    }
                  });
                  
              });
            console.log('Actualización múltiple realizada con éxito:', result);
        } else {
            Swal.fire({
                title: '¡UPS!',
                text: 'No se ha podido derivar el caso.',
                icon: 'error', // Puede ser 'success', 'error', 'warning', 'info', 'question'
                confirmButtonText: 'Aceptar'
              })
            console.error('Error en la actualización múltiple:', await response.text());
        }
    } catch (error) {
        Swal.fire({
            title: '¡UPS!',
            text: 'Los cambios no pueden guardarse correctamente.',
            icon: 'error', // Puede ser 'success', 'error', 'warning', 'info', 'question'
            confirmButtonText: 'Aceptar'
          })
        console.error('Error en la actualización múltiple:', error);
    }
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