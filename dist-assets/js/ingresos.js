const urls = [];

// Captura los parámetros de la URL
const params = new URLSearchParams(window.location.search);

const rowIndex = parseInt(params.get('row'), 10);
console.log(rowIndex)
const fechaIngreso = params.get('fechaIngreso');
const pas = params.get('pas');
const cliente = params.get('cliente');
const dominio = params.get('Dominio');
const companiaReclamar = params.get('companiaReclamar');
const telefonoCliente = params.get('telefonoCliente');
const mailCliente = params.get('mailCliente');
const observacion = params.get('observacion');
const adjDniFrente = params.get('adjDniFrente');
const adjDniDorso = params.get('adjDniDorso');
const adjRegistroFrente = params.get('adjRegistroFrente');
const adjRegistroDorso = params.get('adjRegistroDorso');
const adjCedulaVerdeFrente = params.get('adjCedulaVerdeFrente');
const adjCedulaVerdeDorso = params.get('adjCedulaVerdeDorso');
const adjDenunciaAdm = params.get('adjDenunciaAdm');
const adjCertCobertura = params.get('adjCertCobertura');
const adjFotoSiniestro = params.get('adjFotoSiniestro');
const adjPresupuesto = params.get('adjPresupuesto');
const adjContratoSoc = params.get('adjContratoSoc');
const tipoReclamo= params.get('tipoReclamo');
const historial= params.get('historial');
const estado= params.get('estado');

// Luego muestra o manipula estos datos en la página según lo necesites
document.getElementById('ingreso').value = fechaIngreso;
document.getElementById('pas').value = pas;
document.getElementById('cliente').value = cliente;
document.getElementById('dominio').value = dominio;
document.getElementById('ciaReclamar').value = companiaReclamar;
document.getElementById('telefono').value = telefonoCliente;
document.getElementById('email').value = mailCliente;
document.getElementById('obs').value = observacion;
document.getElementById('tipoReclamo').value = tipoReclamo;
document.getElementById('historial').value = historial;
document.getElementById('estado').value = estado;

if (adjDniFrente === null || adjDniFrente === '') { // Si está vacío o no existe
    document.getElementById('1').style.visibility = 'visible'; // Mostrar input
}
if (adjDniDorso === null || adjDniDorso  === '') { // Si está vacío o no existe
    document.getElementById('2').style.visibility = 'visible'; // Mostrar input
}
if (adjRegistroFrente === null || adjRegistroFrente === '') { // Si está vacío o no existe
    document.getElementById('3').style.visibility = 'visible'; // Mostrar input
}
if (adjRegistroDorso === null || adjRegistroDorso === '') { // Si está vacío o no existe
    document.getElementById('4').style.visibility = 'visible'; // Mostrar input
}
if (adjCedulaVerdeFrente === null || adjCedulaVerdeFrente === '') { // Si está vacío o no existe
    document.getElementById('5').style.visibility = 'visible'; // Mostrar input
}
if (adjCedulaVerdeDorso === null || adjCedulaVerdeDorso === '') { // Si está vacío o no existe
    document.getElementById('6').style.visibility = 'visible'; // Mostrar input
}
if (adjDenunciaAdm === null || adjDenunciaAdm === '') { // Si está vacío o no existe
    document.getElementById('7').style.visibility = 'visible'; // Mostrar input
}
if (adjCertCobertura === null || adjCertCobertura === '') { // Si está vacío o no existe
    document.getElementById('8').style.visibility = 'visible'; // Mostrar input
}
if (adjFotoSiniestro === null || adjFotoSiniestro === '') { // Si está vacío o no existe
    document.getElementById('9').style.visibility = 'visible'; // Mostrar input
}
if (adjPresupuesto === null || adjPresupuesto === '') { // Si está vacío o no existe
    document.getElementById('10').style.visibility = 'visible'; // Mostrar input
}
if (adjContratoSoc === null || adjContratoSoc === '') { // Si está vacío o no existe
    document.getElementById('11').style.visibility = 'visible'; // Mostrar input
}
//document.getElementById('adjDniFrente').value = adjDniFrente;
// document.getElementById('adjDniDorso').value = adjDniDorso;
// document.getElementById('adjRegistroFrente').value = adjRegistroFrente;
// document.getElementById('adjRegistroDorso').value = adjRegistroDorso;
// document.getElementById('adjCedulaVerdeFrente').value = adjCedulaVerdeFrente;
// document.getElementById('adjCedulaVerdeDorso').value = adjCedulaVerdeDorso;
// document.getElementById('adjDenunciaAdm').value = adjDenunciaAdm;
// document.getElementById('adjCertCobertura').value = adjCertCobertura;
// document.getElementById('adjFotoSiniestro').value = adjFotoSiniestro;
// document.getElementById('adjPresupuesto').value = adjPresupuesto;
// document.getElementById('adjContratoSoc').value = adjContratoSoc;
// Y así sucesivamente para otros campos

const CLIENT_ID = '607561137784-rq84r06gop7p4hjo1nnv0q5re4fl2nff.apps.googleusercontent.com';
const API_KEY = 'AIzaSyBLuMXUjJmU3XLfErAIH-iI4pXzmSnl-0E';
const DISCOVERY_DOCS = [
    'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
    'https://www.googleapis.com/discovery/v1/apis/sheets/v4/rest'
];
const SCOPES = 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/spreadsheets';
const SPREADSHEET_ID = '1vnJXUhAGGcI8xt-83_T2K_TzJNqhz2nYdcMhilSqkWY';  // Reemplaza con tu ID de hoja de cálculo

let tokenClient;
let gapiInited = false;
let gisInited = false;

// document.getElementById('authorize_button').style.visibility = 'hidden';
// document.getElementById('signout_button').style.visibility = 'hidden';

function gapiLoaded() {
    gapi.load('client', initializeGapiClient);
}

async function initializeGapiClient() {
    await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: DISCOVERY_DOCS,
    });
    gapiInited = true;
    maybeEnableButtons();
}

function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: '',
    });
    gisInited = true;
    maybeEnableButtons();
}

function maybeEnableButtons() {
    if (gapiInited && gisInited) {
        document.getElementById('authorize_button').style.visibility = 'visible';
    }
}

function handleAuthClick() {
    tokenClient.callback = async (resp) => {
        if (resp.error !== undefined) {
            throw (resp);
        }
        document.getElementById('signout_button').style.visibility = 'hidden';
        document.getElementById('authorize_button').innerText = 'hidden';
        await listFiles();
    };
    if (gapi.client.getToken() === null) {
        tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
        tokenClient.requestAccessToken({ prompt: '' });
    }
}
function getAccessToken() {
    const authInstance = gapi.auth2.getAuthInstance();
    const token = authInstance.currentUser.get().getAuthResponse().access_token;
    console.log('Access Token:', token);
    return token;
}

function handleSignoutClick() {
    const token = gapi.client.getToken();
    if (token !== null) {
        google.accounts.oauth2.revoke(token.access_token);
        gapi.client.setToken('');
        document.getElementById('content').innerText = '';
        document.getElementById('authorize_button').innerText = 'Authorize';
        document.getElementById('signout_button').style.visibility = 'hidden';
    }
}

async function uploadFiles(e) {
    e.preventDefault();
    
    const fileIds = [
        'adjDniFrente',
        'adjDniDorso',
        'adjRegistroFrente',
        'adjRegistroDorso',
        'adjCedulaVerdeFrente',
        'adjCedulaVerdeDorso',
        'adjDenunciaAdm',
        'adjCertCobertura',
        'adjFotoSiniestro',
        'adjPresupuesto',
        'adjContratoSoc',
    ];
    console.log(fileIds)
    

    for (const fileId of fileIds) {
        const fileInput = document.getElementById(fileId);
        const file = fileInput.files[0];

        if (file) {
            const url = await uploadFile(file);
            if (url) {
                urls.push(url);
            } else {
                console.error(`Error al subir ${fileId}`);
            }
        } else {
            urls.push(''); // Si no hay archivo, guarda null
        }
    }
    console.log(urls)
    await updateDataInSheetWithFiles(urls,(rowIndex+2));
   // await saveDataToSheet();
  //  await saveDataToSheet2();
   // await saveFileURLsToSheet(urls); // Guardar todas las URLs en Google Sheets
}

async function uploadFile(file) {
    const metadata = {
        'name': file.name,
        'mimeType': file.type
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
            alert(`Archivo ${file.name} subido con éxito. ID: ${result.id}`);
            return fileURL;
        } else {
            console.error('Error al subir archivo:', response.statusText);
        }
    } catch (error) {
        console.error('Error al subir archivo:', error);
    }
    return null; // En caso de error
}
async function updateDataInSheetWithFiles(urls, targetRow) {
    // Datos para las columnas de A a H
    const valuesAtoH = [
        document.getElementById('ingreso') ? document.getElementById('ingreso').value : "",
        document.getElementById('pas') ? document.getElementById('pas').value : "",
        document.getElementById('cliente') ? document.getElementById('cliente').value : "",
        document.getElementById('dominio') ? document.getElementById('dominio').value : "",
        document.getElementById('ciaReclamar') ? document.getElementById('ciaReclamar').value : "",
        document.getElementById('telefono') ? document.getElementById('telefono').value : "",
        document.getElementById('email') ? document.getElementById('email').value : "",
        document.getElementById('obs') ? document.getElementById('obs').value : "",
    ];

    // URLs de archivos adjuntos para llenar de I a S
    const filledUrls = urls.map(url => url || ''); // Reemplaza los valores vacíos con ''
    while (filledUrls.length < 11) {
        filledUrls.push(''); // Asegura que haya exactamente 11 columnas en I:S
    }

    // Datos para las columnas de T a V
    const valuesTtoV = [
        document.getElementById('tipoReclamo') ? document.getElementById('tipoReclamo').value : "",
        document.getElementById('actualizacion') ? document.getElementById('actualizacion').value : "",
        document.getElementById('estado') ? document.getElementById('estado').value : ""
    ];

    // Combina todos los valores en un solo array
    const values = [...valuesAtoH, ...filledUrls, ...valuesTtoV];

    const spreadsheetId = '1QzbFeGvzlzxVYN53G_5Dkl7Lji41Q6_0iMCqhVJhHhs'; // Reemplaza con tu ID de hoja de cálculo
    const range = `Respuestas de formulario 1!A${targetRow}:V${targetRow}`; // Especifica el rango exacto para la fila objetivo

    const body = {
        values: [values] // Agrega la fila combinada
    };

    try {
        const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?valueInputOption=USER_ENTERED`, {
            method: 'PUT', // Cambia a 'PUT' para actualizar la fila específica
            headers: new Headers({
                'Authorization': 'Bearer ' + gapi.client.getToken().access_token,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(body)
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Fila actualizada con éxito:', result);
        } else {
            console.error('Error al actualizar la fila:', response.statusText);
        }
    } catch (error) {
        console.error('Error al actualizar la fila:', error);
    }
}



//Segun el nombre del pas buscar su ejecutivo
const spreadsheetId = '1QzFSJiC-Aax_FmXePVAmu92CB_0cScvWQROeh0xi5rE';
const apiKey = 'AIzaSyBLuMXUjJmU3XLfErAIH-iI4pXzmSnl-0E'; //  clave de API
const range = 'sheet1'; // 
const mensaje = document.getElementById('historial').value
// URL de la API de Google Sheets

document.getElementById('sendWhatsApp').addEventListener('click', function() {
    console.log("entro")
    const phoneNumber = '542994707809'; // Reemplaza con el número de teléfono completo
    const message = `¡Buenos dias! Este es la ultima actualización de su Caso: ${mensaje}`;
    
    // Codificar el mensaje para URL
    const encodedMessage = encodeURIComponent(message);
    
    // Construir la URL
    const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    
    // Abrir la URL en una nueva pestaña o ventana
    window.open(whatsappURL, '_blank');
  });
  async function updateRowInSheet(updatedValues, ranges) {
    console.log(ranges)
    const spreadsheetId = '1QzbFeGvzlzxVYN53G_5Dkl7Lji41Q6_0iMCqhVJhHhs'; // Reemplaza con el ID de tu hoja de cálculo
    const range =`sheet1!${ranges}`;
    console.log(typeof(range)) // Modifica según el rango necesario

    const body = {
        values: [updatedValues], // Array con los valores a actualizar en la fila
    };

    try {
        const response = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${gapi.client.getToken().access_token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            }
        );

        if (response.ok) {
            const result = await response.json();
            console.log('Fila actualizada con éxito:', result);
        } else {
            console.error('Error al actualizar la fila:', await response.text());
        }
    } catch (error) {
        console.error('Error al actualizar la fila:', error);
    }
}
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;
  function derivarAEjecutivo(e){
    e.preventDefault();
    fetch(url)
    .then(response => response.json())
    .then(data => {
      const rows = data.values; // Supongo que 'values' es el array de filas de Google Sheets

      // Filtrar por el valor del campo 'pas' y obtener el 'ejecutivo' correspondiente
      const nameToFind = document.getElementById('pas').value; // El nombre que quieres buscar (sin apellido)
console.log("NAMETOFIND",nameToFind)
      // Filtrar por el nombre en la primera columna (suponiendo que 'pas' está en la columna 0)
      const result = rows.filter(row => {
          const fullName = row[2]?.trim(); // Asegúrate de eliminar espacios en blanco al inicio y final
          if (!fullName) return false; // Evita errores si 'fullName' es undefined o null
      
          const nameToFindStr = String(nameToFind).trim().toLowerCase(); // Elimina espacios y convierte a minúsculas
         
          
          // Dividir el nombre completo en partes (nombre y apellido)
          const nameParts = fullName.split(/\s+/); // Usa expresión regular para dividir por espacios
          console.log("Name Parts:", nameParts);
      
          // Dividir nameToFind en partes (nombre y apellido)
          const nameToFindParts = nameToFindStr.split(/\s+/); // Divide el nombre ingresado en partes
          console.log("NAMETOFIND", nameToFindParts);
          // Si el nombreToFind tiene más de un nombre (por ejemplo, nombre y apellido), comparamos ambas partes
          if (nameToFindParts.length > 1) {
              // Compara nombre y apellido
              return nameParts.length >= 2 &&
                  nameParts[0].toLowerCase() === nameToFindParts[0].toLowerCase() && // Comparar primer nombre
                  nameParts[1].toLowerCase() === nameToFindParts[1].toLowerCase();   // Comparar apellido
          } else {
              // Si solo hay un nombre en nameToFind, lo comparamos solo con la primera parte de fullName
              return nameParts[0].toLowerCase() === nameToFindParts[0].toLowerCase();
          }
      });
        console.log(result)
      if (result.length > 0) {
        // Encontramos el ejecutivo en la fila filtrada
        const ejecutivo = result[0][15]; // Suponiendo que el 'ejecutivo' está en la segunda columna (índice 1)
        const nroInterno = 'INT0001'
        console.log('Ejecutivo encontrado:', ejecutivo);
        saveDataToSheet2((rowIndex+2),ejecutivo,nroInterno);
      } else {
        console.log('No se encontró el ejecutivo para el PAS:');
      }
      
    })
    .catch(error => {
      console.error('Error al obtener los datos:', error);
    });
   
    const historialValue = document.getElementById('historial') ? document.getElementById('historial').value : "";
    const actualizacionValue = document.getElementById('actualizacion') ? document.getElementById('actualizacion').value : "";
    
    const concatenatedValue = historialValue + " " + actualizacionValue;

    
    // Extraer valores de los campos del formulario
    const valuesAtoC = [
        document.getElementById('ingreso') ? document.getElementById('ingreso').value : "",
        document.getElementById('pas') ? document.getElementById('pas').value : "",
       ejecutivo,
    ];
    const valuesEtoF = [
        document.getElementById('cliente') ? document.getElementById('cliente').value : "",
        document.getElementById('ciaReclamo') ? document.getElementById('ciaReclamo').value : "",
    ];
    const valuesHtoJ = [
        document.getElementById('telefono') ? document.getElementById('telefono').value : "",
        document.getElementById('email') ? document.getElementById('email').value : "",
        document.getElementById('obs') ? document.getElementById('obs').value : "",
    ];

    // URLs de archivos adjuntos para llenar de K a X
    // const filledUrls = urls.map(url => url || ''); // Reemplaza los valores vacíos con ''
    // while (filledUrls.length < 11) {
    //     filledUrls.push(''); // Asegura que haya exactamente 11 columnas en I:S
    // }

    // Datos para las columnas de T a V
    const valuesYtoZ= [
        concatenatedValue || "",
        document.getElementById('inicio') ? document.getElementById('inicio').value : "",
    ];
   
    const valuesACtoAF = [
        document.getElementById('estado') ? document.getElementById('estado').value : "",
        document.getElementById('tipoReclamo') ? document.getElementById('tipoReclamo').value : "",
        document.getElementById('montoReclamado') ? document.getElementById('montoReclamado').value : "",
        document.getElementById('montoCerrado') ? document.getElementById('montoCerrado').value : "",
       
    ];
    const valuesAW = [
        document.getElementById('gestionado') ? document.getElementById('gestionado').value : "",
       
    ];

   const rangeesAtoB =  'A10:B10';
   const rangeesEtoF =  'E10:F10';
   const rangeesHtoJ =  'H10:J10';
   const rangeesYtoZ =  'Y10:Z10';
   const rangeesACtoAF =  'AC10:AF10';
   const rangeesAW =  'AW10';
updateRowInSheet( valuesAtoB,rangeesAtoB);
updateRowInSheet(valuesEtoF, rangeesEtoF );
updateRowInSheet(valuesHtoJ, rangeesHtoJ );
updateRowInSheet(valuesYtoZ,rangeesYtoZ);
updateRowInSheet( valuesACtoAF, rangeesACtoAF);
updateRowInSheet( valuesAW, rangeesAW);


}


// $('#derivado').on('click', function() {
//     fetch(url)
//       .then(response => response.json())
//       .then(data => {
//         const rows = data.values; // Supongo que 'values' es el array de filas de Google Sheets
  
//         // Filtrar por el valor del campo 'pas' y obtener el 'ejecutivo' correspondiente
//         const nameToFind = document.getElementById('pas').value; // El nombre que quieres buscar (sin apellido)
// console.log("NAMETOFIND",nameToFind)
//         // Filtrar por el nombre en la primera columna (suponiendo que 'pas' está en la columna 0)
//         const result = rows.filter(row => {
//             const fullName = row[2]?.trim(); // Asegúrate de eliminar espacios en blanco al inicio y final
//             if (!fullName) return false; // Evita errores si 'fullName' es undefined o null
        
//             const nameToFindStr = String(nameToFind).trim().toLowerCase(); // Elimina espacios y convierte a minúsculas
           
            
//             // Dividir el nombre completo en partes (nombre y apellido)
//             const nameParts = fullName.split(/\s+/); // Usa expresión regular para dividir por espacios
//             console.log("Name Parts:", nameParts);
        
//             // Dividir nameToFind en partes (nombre y apellido)
//             const nameToFindParts = nameToFindStr.split(/\s+/); // Divide el nombre ingresado en partes
//             console.log("NAMETOFIND", nameToFindParts);
//             // Si el nombreToFind tiene más de un nombre (por ejemplo, nombre y apellido), comparamos ambas partes
//             if (nameToFindParts.length > 1) {
//                 // Compara nombre y apellido
//                 return nameParts.length >= 2 &&
//                     nameParts[0].toLowerCase() === nameToFindParts[0].toLowerCase() && // Comparar primer nombre
//                     nameParts[1].toLowerCase() === nameToFindParts[1].toLowerCase();   // Comparar apellido
//             } else {
//                 // Si solo hay un nombre en nameToFind, lo comparamos solo con la primera parte de fullName
//                 return nameParts[0].toLowerCase() === nameToFindParts[0].toLowerCase();
//             }
//         });
//           console.log(result)
//         if (result.length > 0) {
//           // Encontramos el ejecutivo en la fila filtrada
//           const ejecutivo = result[0][15]; // Suponiendo que el 'ejecutivo' está en la segunda columna (índice 1)
//           const nroInterno = 'INT0001'
//           console.log('Ejecutivo encontrado:', ejecutivo);
//           saveDataToSheet2((rowIndex+2),ejecutivo,nroInterno);
//         } else {
//           console.log('No se encontró el ejecutivo para el PAS:');
//         }
        
//       })
//       .catch(error => {
//         console.error('Error al obtener los datos:', error);
//       });
//       async function saveDataToSheet2(targetRow,ejecutivo,nroInterno) {
//         const historialValue = document.getElementById('historial') ? document.getElementById('historial').value : "";
//         const actualizacionValue = document.getElementById('actualizacion') ? document.getElementById('actualizacion').value : "";
        
//         const concatenatedValue = historialValue +"<br>" + actualizacionValue;
//         // Extraer valores de los campos del formulario
//         const valuesAtoJ = [
//             document.getElementById('ingreso') ? document.getElementById('ingreso').value : "",
//             document.getElementById('pas') ? document.getElementById('pas').value : "",
//             ejecutivo || '',
//             nroInterno || '',
//             document.getElementById('cliente') ? document.getElementById('cliente').value : "",
//             document.getElementById('ciaReclamar') ? document.getElementById('ciaReclamar').value : "",
//             document.getElementById('dominio') ? document.getElementById('dominio').value : "",
//             document.getElementById('telefono') ? document.getElementById('telefono').value : "",
//             document.getElementById('email') ? document.getElementById('email').value : "",
//             document.getElementById('obs') ? document.getElementById('obs').value : "",
//         ];
    
//         // URLs de archivos adjuntos para llenar de K a X
//         // const filledUrls = urls.map(url => url || ''); // Reemplaza los valores vacíos con ''
//         // while (filledUrls.length < 11) {
//         //     filledUrls.push(''); // Asegura que haya exactamente 11 columnas en I:S
//         // }
    
//         // Datos para las columnas de T a V
//         const valuesY = [
//             concatenatedValue || "",
//         ];
//         const valuesACtoAD = [
//             document.getElementById('estado') ? document.getElementById('estado').value : "",
//             document.getElementById('tipoReclamo') ? document.getElementById('tipoReclamo').value : "",
           
//         ];
    
//         // Combina todos los valores en un solo array
//         const values = [...valuesAtoJ, ...valuesY,...valuesACtoAD];
    
//         const spreadsheetId = '1QzbFeGvzlzxVYN53G_5Dkl7Lji41Q6_0iMCqhVJhHhs'; // Reemplaza con tu ID de hoja de cálculo
//         const range = `sheet1!A11`; // Rango a actualizar
    
//         const body = {
//             values: [values]
//         };
    
//         console.log('Datos a enviar:', body);
    
//         try {
//             const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`, {
//                 method: 'POST', // Asegúrate de que 'PUT' sea lo que necesitas
//                 headers: new Headers({
//                     'Authorization': 'Bearer ' + gapi.client.getToken().access_token,
//                     'Content-Type': 'application/json'
//                 }),
//                 body: JSON.stringify(body)
//             });
    
//             if (response.ok) {
//                 const result = await response.json();
//                 console.log('Filas guardadas con éxito:', result);
//             } else {
//                 console.error('Error al guardar las filas:', await response.text());
//             }
//         } catch (error) {
//             console.error('Error al guardar las filas:', error);
//         }
//     }

//   });
//   $('#mediacion').on('click', function() {
    
//   });
//   $('#desistido').on('click', function() {
    
//   });
//   $('#legales').on('click', function() {
    
//   });