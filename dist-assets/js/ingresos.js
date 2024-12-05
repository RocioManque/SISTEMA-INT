const urls = [];

// Captura los parámetros de la URL
const params = new URLSearchParams(window.location.search);
console.log('entra')
const rowIndex = parseInt(params.get('row')) + 1;
const fechaIngreso = params.get('fechaIngreso');
const pas = params.get('pas');
const cliente = params.get('cliente');
const dominio = params.get('dominio');
const companiaReclamar = params.get('companiaReclamar');
const telefonoCliente = params.get('telefonoCliente');
const mailCliente = params.get('mailCliente');
const observacion = params.get('observacion');
const adjDniFrente = params.get('adjDniFrente');
console.log(adjDniFrente);
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
const adjNotaRepresentacion = params.get('adjNotaRepresentacion');
const tipoReclamo= params.get('tipoReclamo');
console.log(tipoReclamo)
const historial= params.get('historial');
console.log(historial)
const estado= params.get('estado');
const carpetaUrl= params.get('carpetaUrl');
//TODO: los dropdown deberian estar seleccionados correctamente
const spreadsheetId0 = '1gzp1hLfZaZMQarKdxPnvtHeyTioqhd3vatL-UmFnlUI';
const spreadsheetId2 = '1FdJtx_Dr8dgvC-9HWfckT8qzHm8BikoSbV9EORXSEb8';
const apiKey2 = 'AIzaSyBLuMXUjJmU3XLfErAIH-iI4pXzmSnl-0E'; //  clave de API
const range0 = 'sheet1'; // 
const range2 = 'Hoja 1'; // 
const range3 = 'Hoja 2'; // 
const range4 = 'Hoja 3'; // 

// URL de la API de Google Sheets
const url0 = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId0}/values/${range0}?key=${apiKey2}`;
const url2 = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId2}/values/${range2}?key=${apiKey2}`;
const url3 = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId2}/values/${range3}?key=${apiKey2}`;
const url4 = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId2}/values/${range4}?key=${apiKey2}`;
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
        
        width: '100%'
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

});
// Luego muestra o manipula estos datos en la página según lo necesites
document.getElementById('ingreso').value = fechaIngreso;
document.getElementById('cliente').value = cliente;
document.getElementById('dominio').value = dominio;
document.getElementById('telefono').value = telefonoCliente;
document.getElementById('email').value = mailCliente;
document.getElementById('obs').value = observacion;
document.getElementById('historial').value = historial;

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
if (adjNotaRepresentacion === null || adjNotaRepresentacion === '') { // Si está vacío o no existe
    document.getElementById('12').style.visibility = 'visible'; // Mostrar input
}
// document.getElementById('adjDniFrente').value = adjDniFrente;
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
//Segun el nombre del pas buscar su ejecutivo
const spreadsheetId = '1gzp1hLfZaZMQarKdxPnvtHeyTioqhd3vatL-UmFnlUI';
const apiKey = 'AIzaSyBLuMXUjJmU3XLfErAIH-iI4pXzmSnl-0E'; //  clave de API
const range = 'sheet1'; // 
const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;
// URL de la API de Google Sheets
const SPREADSHEET_ID = '1vnJXUhAGGcI8xt-83_T2K_TzJNqhz2nYdcMhilSqkWY';  // Reemplaza con tu ID de hoja de cálculo

document.getElementById('saveChanges').addEventListener('click', () => {
    handleFileUploadsAndSheetUpdate(rowIndex);
});

async function handleFileUploadsAndSheetUpdate(rowIndex) {
    Swal.fire({
        title: 'Cargando...',
        text: 'Por favor espera mientras se procesan los archivos.',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        },
    });

    const fileIds = [
        'adjDniFrente', 'adjDniDorso', 'adjRegistroFrente',
        'adjRegistroDorso', 'adjCedulaVerdeFrente', 'adjCedulaVerdeDorso',
        'adjDenunciaAdm', 'adjCertCobertura', 'adjFotoSiniestro',
        'adjPresupuesto', 'adjContratoSoc', 'adjNotaRepresentacion'
    ];

    const urlRange = `Respuestas de formulario 1!I${rowIndex}:T${rowIndex}`;

    // Obtener las URLs actuales desde Sheets
    const currentUrls = await getUrlsFromSheet(urlRange);
    if (!currentUrls) {
        Swal.fire({
            title: 'Error',
            text: 'No se pudieron obtener las URLs existentes desde Google Sheets.',
            icon: 'error',
        });
        return;
    }

    // Preparar carga de archivos y actualizar URLs
    const { updatedUrls, filesToUpload } = prepareFilesAndUrls(fileIds, currentUrls);

    // Subir archivos en paralelo
    const uploadedFiles = await uploadFilesInParallel(filesToUpload);

    // Actualizar las URLs subidas en la posición correcta
    uploadedFiles.forEach(({ url, index }) => {
        updatedUrls[index] = url;
    });

    // Completar las URLs faltantes
    while (updatedUrls.length < fileIds.length) {
        updatedUrls.push('');
    }

    // Actualizar la fila en Google Sheets
    const success = await updateRowInSheet(rowIndex, updatedUrls);

    Swal.close();
    if (success) {
        Swal.fire({
            title: '¡Éxito!',
            text: 'Los cambios se guardaron correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
        }).then(() => handlePostSuccessActions());
    } else {
        Swal.fire({
            title: '¡UPS!',
            text: 'Hubo un error al subir los archivos.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
        });
    }
}

// Preparar archivos y URLs actualizadas
function prepareFilesAndUrls(fileIds, currentUrls) {
    const filesToUpload = [];
    const updatedUrls = [];

    fileIds.forEach((fileId, index) => {
        const fileInput = document.getElementById(fileId);
        const file = fileInput?.files[0];

        if (file) {
            filesToUpload.push({ file, index });
        } else {
            updatedUrls[index] = currentUrls[index] || '';
        }
    });

    return { updatedUrls, filesToUpload };
}

// Subir archivos en paralelo
async function uploadFilesInParallel(files) {
    const folderName = document.getElementById('cliente').value;
    const folderId = await getFolderIdByName(folderName);

    if (!folderId) {
        Swal.fire({
            title: 'Error',
            text: `No se encontró la carpeta llamada: ${folderName}.`,
            icon: 'error',
        });
        return [];
    }

    const uploadPromises = files.map(({ file, index }) =>
        uploadFile(file, folderId).then((url) => ({ url, index }))
    );

    try {
        return await Promise.all(uploadPromises);
    } catch (error) {
        console.error('Error al subir archivos:', error);
        return [];
    }
}

// Acciones posteriores al éxito
function handlePostSuccessActions() {
    Swal.fire({
        title: '¡Atención!',
        text: '¿Querés volver a Mesa de Entrada?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, vamos',
        cancelButtonText: 'No, me quedo',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = '/html/casosPendientes.html';
        } else {
            enableButtons();
        }
    });
}

// Habilitar botones deshabilitados
function enableButtons() {
    const buttonIds = ['desistido', 'derivado', 'mediacion', 'legales', 'sendWhatsApp'];
    buttonIds.forEach((id) => {
        const button = document.getElementById(id);
        button.classList.remove('disabled');
        button.style.pointerEvents = 'auto';
    });
}

// Obtener las URLs actuales desde Google Sheets
async function getUrlsFromSheet(range) {
    try {
        const response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: '1QzbFeGvzlzxVYN53G_5Dkl7Lji41Q6_0iMCqhVJhHhs',
            range: range,
        });
        return response.result.values?.[0] || [];
    } catch (error) {
        console.error('Error al obtener las URLs existentes:', error);
        return null;
    }
}

// Subir un archivo a Google Drive
async function uploadFile(file, folderId) {
    const metadata = {
        name: file.name,
        mimeType: file.type,
        parents: [folderId],
    };

    const formData = new FormData();
    formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    formData.append('file', file);

    try {
        const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
            method: 'POST',
            headers: new Headers({ 'Authorization': `Bearer ${gapi.client.getToken().access_token}` }),
            body: formData,
        });

        if (response.ok) {
            const result = await response.json();
            return `https://drive.google.com/file/d/${result.id}/view?usp=sharing`;
        } else {
            console.error('Error al subir archivo:', response.statusText);
            return '';
        }
    } catch (error) {
        console.error('Error al subir archivo:', error);
        return '';
    }
}

// Actualizar la fila en Google Sheets
async function updateRowInSheet(rowIndex, updatedUrls) {
    const spreadsheetId = '1QzbFeGvzlzxVYN53G_5Dkl7Lji41Q6_0iMCqhVJhHhs';
    const range = `Respuestas de formulario 1!A${rowIndex}:W${rowIndex}`;

    const values = [
        document.getElementById('ingreso')?.value || '',
        document.getElementById('pasDropdown')?.value || '',
        document.getElementById('cliente')?.value || '',
        document.getElementById('dominio')?.value || '',
        document.getElementById('ciaReclamar')?.value || '',
        document.getElementById('telefono')?.value || '',
        document.getElementById('email')?.value || '',
        document.getElementById('obs')?.value || '',
        ...updatedUrls,
        document.getElementById('tipoReclamo')?.value || '',
        document.getElementById('actualizacion')?.value || '',
        document.getElementById('estado')?.value || '',
    ];

    const body = { values: [values] };

    try {
        const response = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?valueInputOption=USER_ENTERED`,
            {
                method: 'PUT',
                headers: new Headers({
                    'Authorization': `Bearer ${gapi.client.getToken().access_token}`,
                    'Content-Type': 'application/json',
                }),
                body: JSON.stringify(body),
            }
        );

        return response.ok;
    } catch (error) {
        console.error('Error al actualizar Google Sheets:', error);
        return false;
    }
}

// Obtener ID de carpeta por nombre
async function getFolderIdByName(folderName) {
    try {
        const response = await gapi.client.drive.files.list({
            q: `name='${folderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
            fields: 'files(id, name)',
        });
        return response.result.files?.[0]?.id || null;
    } catch (error) {
        console.error('Error al buscar carpeta:', error);
        return null;
    }
}

async function updateEjecutivo() {
    const spreadsheetId = '1QzbFeGvzlzxVYN53G_5Dkl7Lji41Q6_0iMCqhVJhHhs'; // Reemplaza con el ID de tu hoja de cálculo
    const range = `sheet1!C${rowIndex}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const rows = data.values; // Supongo que 'values' es el array de filas de Google Sheets

        // Filtrar por el valor del campo 'pas' y obtener el 'ejecutivo' correspondiente
        const nameToFind = document.getElementById('pasDropdown').value; // El nombre que quieres buscar (sin apellido)

        // Filtrar por el nombre en la primera columna (suponiendo que 'pas' está en la columna 0)
        const result = rows.filter(row => {
            const fullName = row[2]?.trim(); // Asegúrate de eliminar espacios en blanco al inicio y final
            if (!fullName) return false; // Evita errores si 'fullName' es undefined o null

            const nameToFindStr = String(nameToFind).trim().toLowerCase(); // Elimina espacios y convierte a minúsculas

            // Dividir el nombre completo en partes (nombre y apellido)
            const nameParts = fullName.split(/\s+/); // Usa expresión regular para dividir por espacios

            // Dividir nameToFind en partes (nombre y apellido)
            const nameToFindParts = nameToFindStr.split(/\s+/); // Divide el nombre ingresado en partes

            // Si el nombreToFind tiene más de un nombre (por ejemplo, nombre y apellido), comparamos ambas partes
            if (nameToFindParts.length > 1) {
                // Compara nombre y apellido
                return (
                    nameParts.length >= 2 &&
                    nameParts[0].toLowerCase() === nameToFindParts[0].toLowerCase() && // Comparar primer nombre
                    nameParts[1].toLowerCase() === nameToFindParts[1].toLowerCase()   // Comparar apellido
                );
            } else {
                // Si solo hay un nombre en nameToFind, lo comparamos solo con la primera parte de fullName
                return nameParts[0].toLowerCase() === nameToFindParts[0].toLowerCase();
            }
        });

        console.log(result);

        if (result.length > 0) {
            // Encontramos el ejecutivo en la fila filtrada
            const ejecutivo = result[0][15]; // Suponiendo que el 'ejecutivo' está en la columna 15 (índice 15)
            console.log('Ejecutivo encontrado:', ejecutivo);
            const value = ejecutivo;
            const body = {
                values: [[value]], // Array de arrays con los valores a actualizar en la fila
            };

            try {
                const updateResponse = await fetch(
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

                if (updateResponse.ok) {
                    const updateResult = await updateResponse.json();
                    console.log('Fila actualizada con éxito:', updateResult);
                } else {
                    
                    console.error('Error al actualizar la fila:', await updateResponse.text());
                }
            } catch (error) {
                console.error('Error al actualizar la fila:', error);
            }
        }
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

document.getElementById('sendWhatsApp').addEventListener('click', function() {
    console.log('entra')
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

async function obtenerUltimaFila(spreadsheetId) {
    
    const range = 'Sheet1!A:A'; // Lee toda la columna A para determinar cuántas filas tienen datos

    try {
        const response = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?majorDimension=ROWS`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${gapi.client.getToken().access_token}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        if (!response.ok) {
            throw new Error('Error al obtener los datos: ' + await response.text());
        }

        const data = await response.json();
        const rows = data.values || [];

        // El índice de la última fila con datos
        const ultimaFila = rows.length;
     

        return ultimaFila;
    } catch (error) {
        console.error('Error al obtener la última fila:', error);
        return null;
    }
}
async function obtenerNuevoNumeroCaso() {
    const spreadsheetId = '1QzbFeGvzlzxVYN53G_5Dkl7Lji41Q6_0iMCqhVJhHhs'; // ID de tu hoja de cálculo
    const range = 'Sheet1!D:D'; // Asumiendo que los números de caso están en la columna Z

    try {
        const response = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?majorDimension=COLUMNS`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${gapi.client.getToken().access_token}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        if (!response.ok) {
            throw new Error('Error al obtener los números de caso: ' + await response.text());
        }

        const data = await response.json();
        const casos = data.values ? data.values[0] : []; // Obtener los valores de la columna Z
        const ultimoNumero = casos[casos.length - 1]; // Último número de caso

        // Incrementar el último número de caso
        const nuevoNumero = incrementarNumeroCaso(ultimoNumero);
        console.log('Nuevo número de caso:', nuevoNumero);

        return nuevoNumero;
    } catch (error) {
        console.error('Error al obtener el nuevo número de caso:', error);
        return 'INT00001'; // En caso de error, iniciar desde el primer número
    }
}

function incrementarNumeroCaso(ultimoNumero) {
    // Si el último número es algo como 'INT00020'
    if (!ultimoNumero || !ultimoNumero.startsWith('INT')) {
        return 'INT00001'; // Si no hay un último número válido, iniciar desde INT00001
    }

    // Extraer la parte numérica y convertirla en entero
    const numeroActual = parseInt(ultimoNumero.substring(3), 10);
    const nuevoNumero = numeroActual + 1;

    // Formatear con ceros a la izquierda para mantener siempre 5 dígitos
    const nuevoNumeroFormateado = String(nuevoNumero).padStart(5, '0');
    return `INT${nuevoNumeroFormateado}`;
}
 async function derivarAEjecutivo(e){
    const newText = document.getElementById('actualizacion').value;
    const oldText = document.getElementById('historial').value;
const historialConcat = `${oldText} \n ${newText}`;
    const spreadsheetId = '1QzbFeGvzlzxVYN53G_5Dkl7Lji41Q6_0iMCqhVJhHhs'; // Reemplaza con tu ID de Google Sheets
    const ultimaFilaDeTabla = await obtenerUltimaFila(spreadsheetId)
    const nroInterno = await obtenerNuevoNumeroCaso()
    const ejecutivoEncontrado = await encontrarEjecutivo()
    const IndexNuevaFila = ultimaFilaDeTabla + 2
    // Supongamos que tienes valores para las columnas a actualizar
    const fechaIngreso = document.getElementById('ingreso').value; // Valor para actualizar en la columna deseada
    const pas = document.getElementById('pasDropdown').value;
    const cliente = document.getElementById('cliente').value;
    const ciaReclamada = document.getElementById('ciaReclamar').value;
    const dominio = document.getElementById('dominio').value;
    const telefonoCliente = document.getElementById('telefono').value;
    const emailCliente = document.getElementById('email').value;
    const observaciones = document.getElementById('obs').value;
    const historial = document.getElementById('actualizacion') ? historialConcat : document.getElementById('historial').value; //TODO: actualizacion + historial
    const estado = document.getElementById('estado').value;
    const tipoReclamo = document.getElementById('tipoReclamo').value;
    const adjuntosUrl = carpetaUrl
    const caso = cliente + ' contra ' + ciaReclamada
    
    
    // Crea la solicitud BatchUpdate
    const batchUpdateBody = {
        requests: [
            {
                updateCells: {   //updateCells: este actualiza fila segun range (row)
                   // sheetId: '454305688',
                   range: {   //range se utiliza en update
                    sheetId: '454305688',
                    startRowIndex: IndexNuevaFila - 1,
                    endRowIndex: IndexNuevaFila,
                    startColumnIndex: 0, 
                    endColumnIndex: 10 
                },
                    rows: [
                        {
                            values: [
                                { userEnteredValue: { stringValue: String(fechaIngreso) } },
                                { userEnteredValue: { stringValue: String(pas) } },         
                                { userEnteredValue: { stringValue: String(ejecutivoEncontrado) } }, 
                                { userEnteredValue: { stringValue: String(nroInterno) } },  
                                { userEnteredValue: { stringValue: String(cliente) } },  
                                { userEnteredValue: { stringValue: String(ciaReclamada) } },
                                { userEnteredValue: { stringValue: String(dominio) } }, 
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
                        startRowIndex: IndexNuevaFila - 1,
                        endRowIndex: IndexNuevaFila,
                        startColumnIndex: 24, // Es el indice primero
                        endColumnIndex: 25 // Es el indice posterior
                    },
                    rows: [
                        {
                            values: [
                                { userEnteredValue: { stringValue: String(historial) } },          
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
                        startRowIndex: IndexNuevaFila - 1,
                        endRowIndex: IndexNuevaFila,
                        startColumnIndex: 28, // Es el indice primero
                        endColumnIndex: 30 // Es el indice posterior
                    },
                    rows: [
                        {
                            values: [
                                { userEnteredValue: { stringValue: String(estado) } },          
                                { userEnteredValue: { stringValue: String(tipoReclamo) } },          
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
                        startRowIndex: IndexNuevaFila - 1,
                        endRowIndex: IndexNuevaFila,
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
                        startRowIndex: IndexNuevaFila - 1,
                        endRowIndex: IndexNuevaFila,
                        startColumnIndex: 53, // Es el indice primero
                        endColumnIndex: 54 // Es el indice posterior
                    },
                    rows: [
                        {
                            values: [
                                { userEnteredValue: { stringValue: String(adjuntosUrl) } },          
                                 
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
                text: 'El caso se derivó al ejecutivo correspondiente.',
                icon: 'success', // Puede ser 'success', 'error', 'warning', 'info', 'question'
                confirmButtonText: 'Aceptar',
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.href = '/html/casosPendientes.html';
                }
              });
            console.log('Actualización múltiple realizada con éxito:', result);
        } else {
            Swal.fire({
                title: '¡UPS!',
                text: 'El caso no pudo ser derivado...',
                icon: 'error', // Puede ser 'success', 'error', 'warning', 'info', 'question'
                confirmButtonText: 'Aceptar'
              })
            console.error('Error en la actualización múltiple:', await response.text());
        }
    } catch (error) {
        Swal.fire({
            title: '¡UPS!',
            text: 'El caso no pudo ser derivado...',
            icon: 'error', // Puede ser 'success', 'error', 'warning', 'info', 'question'
            confirmButtonText: 'Aceptar'
          })
        console.error('Error en la actualización múltiple:', error);
    }
}

async function encontrarEjecutivo() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const rows = data.values; // Supongo que 'values' es el array de filas de Google Sheets

        // Filtrar por el valor del campo 'pas' y obtener el 'ejecutivo' correspondiente
        const nameToFind = document.getElementById('pasDropdown').value; // El nombre que quieres buscar (sin apellido)

        const result = rows.filter(row => {
            const fullName = row[2]?.trim(); // Asegúrate de eliminar espacios en blanco al inicio y final
            if (!fullName) return false; // Evita errores si 'fullName' es undefined o null

            const nameToFindStr = String(nameToFind).trim().toLowerCase(); // Elimina espacios y convierte a minúsculas

            // Dividir el nombre completo en partes (nombre y apellido)
            const nameParts = fullName.split(/\s+/); // Usa expresión regular para dividir por espacios

            // Dividir nameToFind en partes (nombre y apellido)
            const nameToFindParts = nameToFindStr.split(/\s+/); // Divide el nombre ingresado en partes

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

        if (result.length > 0) {
            // Encontramos el ejecutivo en la fila filtrada
            const ejecutivo = result[0][15]; // Suponiendo que el 'ejecutivo' está en la columna 15
            return ejecutivo; // Retorna el valor de 'ejecutivo'
        } else {
            return null; // Retorna null si no se encontró
        }
    } catch (error) {
        console.error('Error al buscar el ejecutivo:', error);
        return null; // Retorna null en caso de error
    }
}
// Mueve esta función hacia arriba para que esté disponible antes de usarla

async function legales(e){
    const newText = document.getElementById('actualizacion').value;
    const oldText = document.getElementById('historial').value;
const historialConcat = `${oldText} \n ${newText}`;
//Legales
try {
    const response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1gzp1hLfZaZMQarKdxPnvtHeyTioqhd3vatL-UmFnlUI',
        range: 'sheet2',
    });

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

    console.log('Resultado: ', resultado[0]); // Mostrar el primer abogado encontrado

    // Aquí puedes hacer lo que necesites con el resultado, por ejemplo:
    // - Agregarlo al historial
    // - Enviar un correo, etc.


//document.getElementById('actualizacion') ? historialConcat : document.getElementById('historial').value,
    const spreadsheetId = '1QzbFeGvzlzxVYN53G_5Dkl7Lji41Q6_0iMCqhVJhHhs'; // Reemplaza con tu ID de Google Sheets
    const ultimaFilaDeTabla = await obtenerUltimaFila(spreadsheetId)
    console.log(ultimaFilaDeTabla)
    const nroInterno = await obtenerNuevoNumeroCaso()
    const ejecutivoEncontrado = resultado[0]
    const IndexNuevaFila = ultimaFilaDeTabla + 2
    console.log(IndexNuevaFila)
    // Supongamos que tienes valores para las columnas a actualizar
    const fechaIngreso = document.getElementById('ingreso').value; // Valor para actualizar en la columna deseada
    const pas = document.getElementById('pasDropdown').value;
    const cliente = document.getElementById('cliente').value;
    const ciaReclamada = document.getElementById('ciaReclamar').value;
    const dominio = document.getElementById('dominio').value;
    const telefonoCliente = document.getElementById('telefono').value;
    const emailCliente = document.getElementById('email').value;
    const observaciones = document.getElementById('obs').value;
    const historial = document.getElementById('actualizacion') ? historialConcat : document.getElementById('historial').value;
    const estado = document.getElementById('estado').value;
    const tipoReclamo = document.getElementById('tipoReclamo').value;
    const adjuntosUrl = carpetaUrl
    const caso = cliente + ' contra ' + ciaReclamada
    
    
    // Crea la solicitud BatchUpdate
    const batchUpdateBody = {
        requests: [
            {
                updateCells: {   //updateCells: este actualiza fila segun range (row)
                   // sheetId: '454305688',
                   range: {   //range se utiliza en update
                    sheetId: '454305688',
                    startRowIndex: IndexNuevaFila - 1,
                    endRowIndex: IndexNuevaFila,
                    startColumnIndex: 0, 
                    endColumnIndex: 10 
                },
                    rows: [
                        {
                            values: [
                                { userEnteredValue: { stringValue: String(fechaIngreso) } },
                                { userEnteredValue: { stringValue: String(pas) } },         
                                { userEnteredValue: { stringValue: String(ejecutivoEncontrado) } }, 
                                { userEnteredValue: { stringValue: String(nroInterno) } },  
                                { userEnteredValue: { stringValue: String(cliente) } },  
                                { userEnteredValue: { stringValue: String(ciaReclamada) } },
                                { userEnteredValue: { stringValue: String(dominio) } }, 
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
                        startRowIndex: IndexNuevaFila - 1,
                        endRowIndex: IndexNuevaFila,
                        startColumnIndex: 24, // Es el indice primero
                        endColumnIndex: 25 // Es el indice posterior
                    },
                    rows: [
                        {
                            values: [
                                { userEnteredValue: { stringValue: String(historial) } },          
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
                        startRowIndex: IndexNuevaFila - 1,
                        endRowIndex: IndexNuevaFila,
                        startColumnIndex: 28, // Es el indice primero
                        endColumnIndex: 30 // Es el indice posterior
                    },
                    rows: [
                        {
                            values: [
                                { userEnteredValue: { stringValue: String(estado) } },          
                                { userEnteredValue: { stringValue: String(tipoReclamo) } },          
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
                        startRowIndex: IndexNuevaFila - 1,
                        endRowIndex: IndexNuevaFila,
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
                        startRowIndex: IndexNuevaFila - 1,
                        endRowIndex: IndexNuevaFila,
                        startColumnIndex: 53, // Es el indice primero
                        endColumnIndex: 54 // Es el indice posterior
                    },
                    rows: [
                        {
                            values: [
                                { userEnteredValue: { stringValue: String(adjuntosUrl) } },          
                                 
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
                text: 'El caso ha sido derivado a Legales.',
                icon: 'success', // Puede ser 'success', 'error', 'warning', 'info', 'question'
                confirmButtonText: 'Aceptar',
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.href = '/html/casosPendientes.html';
                }
              });
            console.log('Actualización múltiple realizada con éxito:', result);
        } else {
            Swal.fire({
                title: '¡UPS!',
                text: 'El caso no pudo derivarse correctamente.',
                icon: 'error', // Puede ser 'success', 'error', 'warning', 'info', 'question'
                confirmButtonText: 'Aceptar'
              })
            console.error('Error en la actualización múltiple:', await response.text());
        }
    } catch (error) {
        Swal.fire({
            title: '¡UPS!',
            text: 'El caso no pudo derivarse correctamente.',
            icon: 'error', // Puede ser 'success', 'error', 'warning', 'info', 'question'
            confirmButtonText: 'Aceptar'
          })
        console.error('Error en la actualización múltiple:', error);
    }
} catch (error) {
    console.error("Error al leer datos de Google Sheets:", error);
}
}


async function desistido(e){
    const newText = document.getElementById('actualizacion').value;
    const oldText = document.getElementById('historial').value;
const historialConcat = `${oldText} \n ${newText}`;
//document.getElementById('actualizacion') ? historialConcat : document.getElementById('historial').value,
    const spreadsheetId = '1QzbFeGvzlzxVYN53G_5Dkl7Lji41Q6_0iMCqhVJhHhs'; // Reemplaza con tu ID de Google Sheets
    const ultimaFilaDeTabla = await obtenerUltimaFila(spreadsheetId)
    const nroInterno = await obtenerNuevoNumeroCaso()
    const ejecutivoEncontrado = await encontrarEjecutivo()
    const IndexNuevaFila = ultimaFilaDeTabla + 2
    // Supongamos que tienes valores para las columnas a actualizar
    const fechaIngreso = document.getElementById('ingreso').value; // Valor para actualizar en la columna deseada
    const pas = document.getElementById('pasDropdown').value;
    const cliente = document.getElementById('cliente').value;
    const ciaReclamada = document.getElementById('ciaReclamar').value;
    const dominio = document.getElementById('dominio').value;
    const telefonoCliente = document.getElementById('telefono').value;
    const emailCliente = document.getElementById('email').value;
    const observaciones = document.getElementById('obs').value;
    const historial = document.getElementById('actualizacion') ? historialConcat : document.getElementById('historial').value; //TODO: actualizacion + historial
    const estado = 'DESISTIDO';
    const tipoReclamo = document.getElementById('tipoReclamo').value;
    const adjuntosUrl = carpetaUrl
    const caso = cliente + ' contra ' + ciaReclamada
    
    // Crea la solicitud BatchUpdate
    const batchUpdateBody = {
        requests: [
            {
                updateCells: {   //updateCells: este actualiza fila segun range (row)
                   // sheetId: '454305688',
                   range: {   //range se utiliza en update
                    sheetId: '454305688',
                    startRowIndex: IndexNuevaFila - 1,
                    endRowIndex: IndexNuevaFila,
                    startColumnIndex: 0, 
                    endColumnIndex: 10 
                },
                    rows: [
                        {
                            values: [
                                { userEnteredValue: { stringValue: String(fechaIngreso) } },
                                { userEnteredValue: { stringValue: String(pas) } },         
                                { userEnteredValue: { stringValue: String(ejecutivoEncontrado) } }, 
                                { userEnteredValue: { stringValue: String(nroInterno) } },  
                                { userEnteredValue: { stringValue: String(cliente) } },  
                                { userEnteredValue: { stringValue: String(ciaReclamada) } },
                                { userEnteredValue: { stringValue: String(dominio) } }, 
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
                        startRowIndex: IndexNuevaFila - 1,
                        endRowIndex: IndexNuevaFila,
                        startColumnIndex: 24, // Es el indice primero
                        endColumnIndex: 25 // Es el indice posterior
                    },
                    rows: [
                        {
                            values: [
                                { userEnteredValue: { stringValue: String(historial) } },          
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
                        startRowIndex: IndexNuevaFila - 1,
                        endRowIndex: IndexNuevaFila,
                        startColumnIndex: 28, // Es el indice primero
                        endColumnIndex: 30 // Es el indice posterior
                    },
                    rows: [
                        {
                            values: [
                                { userEnteredValue: { stringValue: String(estado) } },          
                                { userEnteredValue: { stringValue: String(tipoReclamo) } },          
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
                        startRowIndex: IndexNuevaFila - 1,
                        endRowIndex: IndexNuevaFila,
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
                        startRowIndex: IndexNuevaFila - 1,
                        endRowIndex: IndexNuevaFila,
                        startColumnIndex: 53, // Es el indice primero
                        endColumnIndex: 54 // Es el indice posterior
                    },
                    rows: [
                        {
                            values: [
                                { userEnteredValue: { stringValue: String(adjuntosUrl) } },          
                                 
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
                text: 'El caso ha sido desistido.',
                icon: 'success', // Puede ser 'success', 'error', 'warning', 'info', 'question'
                confirmButtonText: 'Aceptar',
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.href = '/html/casosPendientes.html';
                }
              });
            console.log('Actualización múltiple realizada con éxito:', result);
        } else {
            Swal.fire({
                title: '¡UPS!',
                text: 'El estado del caso no ha podido ser modificado.',
                icon: 'error', // Puede ser 'success', 'error', 'warning', 'info', 'question'
                confirmButtonText: 'Aceptar'
              })
            console.error('Error en la actualización múltiple:', await response.text());
        }
    } catch (error) {
        Swal.fire({
            title: '¡UPS!',
            text: 'El estado del caso no ha podido ser modificado.',
            icon: 'error', // Puede ser 'success', 'error', 'warning', 'info', 'question'
            confirmButtonText: 'Aceptar'
          })
        console.error('Error en la actualización múltiple:', error);
    }
}
async function mediacion(e){
    const newText = document.getElementById('actualizacion').value;
    const oldText = document.getElementById('historial').value;
const historialConcat = `${oldText} \n ${newText}`;
//document.getElementById('actualizacion') ? historialConcat : document.getElementById('historial').value,
    const spreadsheetId = '1QzbFeGvzlzxVYN53G_5Dkl7Lji41Q6_0iMCqhVJhHhs'; // Reemplaza con tu ID de Google Sheets
    const ultimaFilaDeTabla = await obtenerUltimaFila(spreadsheetId)
    const nroInterno = await obtenerNuevoNumeroCaso()
    const ejecutivoEncontrado = 'MARIANELA'
    const IndexNuevaFila = ultimaFilaDeTabla + 2
    // Supongamos que tienes valores para las columnas a actualizar
    const fechaIngreso = document.getElementById('ingreso').value; // Valor para actualizar en la columna deseada
    const pas = document.getElementById('pasDropdown').value;
    const cliente = document.getElementById('cliente').value;
    const ciaReclamada = document.getElementById('ciaReclamar').value;
    const dominio = document.getElementById('dominio').value;
    const telefonoCliente = document.getElementById('telefono').value;
    const emailCliente = document.getElementById('email').value;
    const observaciones = document.getElementById('obs').value;
    const historial = document.getElementById('actualizacion') ? historialConcat : document.getElementById('historial').value; //TODO: actualizacion + historial
    const estado = document.getElementById('estado').value;
    const tipoReclamo = document.getElementById('tipoReclamo').value;
    const adjuntosUrl = carpetaUrl
    const caso = cliente + ' contra ' + ciaReclamada
    
    // Crea la solicitud BatchUpdate
    const batchUpdateBody = {
        requests: [
            {
                updateCells: {   //updateCells: este actualiza fila segun range (row)
                   // sheetId: '454305688',
                   range: {   //range se utiliza en update
                    sheetId: '454305688',
                    startRowIndex: IndexNuevaFila - 1,
                    endRowIndex: IndexNuevaFila,
                    startColumnIndex: 0, 
                    endColumnIndex: 10 
                },
                    rows: [
                        {
                            values: [
                                { userEnteredValue: { stringValue: String(fechaIngreso) } },
                                { userEnteredValue: { stringValue: String(pas) } },         
                                { userEnteredValue: { stringValue: String(ejecutivoEncontrado) } }, 
                                { userEnteredValue: { stringValue: String(nroInterno) } },  
                                { userEnteredValue: { stringValue: String(cliente) } },  
                                { userEnteredValue: { stringValue: String(ciaReclamada) } },
                                { userEnteredValue: { stringValue: String(dominio) } }, 
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
                        startRowIndex: IndexNuevaFila - 1,
                        endRowIndex: IndexNuevaFila,
                        startColumnIndex: 24, // Es el indice primero
                        endColumnIndex: 25 // Es el indice posterior
                    },
                    rows: [
                        {
                            values: [
                                { userEnteredValue: { stringValue: String(historial) } },          
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
                        startRowIndex: IndexNuevaFila - 1,
                        endRowIndex: IndexNuevaFila,
                        startColumnIndex: 28, // Es el indice primero
                        endColumnIndex: 30 // Es el indice posterior
                    },
                    rows: [
                        {
                            values: [
                                { userEnteredValue: { stringValue: String(estado) } },          
                                { userEnteredValue: { stringValue: String(tipoReclamo) } },          
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
                        startRowIndex: IndexNuevaFila - 1,
                        endRowIndex: IndexNuevaFila,
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
                        startRowIndex: IndexNuevaFila - 1,
                        endRowIndex: IndexNuevaFila,
                        startColumnIndex: 53, // Es el indice primero
                        endColumnIndex: 54 // Es el indice posterior
                    },
                    rows: [
                        {
                            values: [
                                { userEnteredValue: { stringValue: String(adjuntosUrl) } },          
                                 
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
                text: 'El caso ha sido enviado a Mediación.',
                icon: 'success', // Puede ser 'success', 'error', 'warning', 'info', 'question'
                confirmButtonText: 'Aceptar',
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.href = '/html/casosPendientes.html';
                }
              });
            console.log('Actualización múltiple realizada con éxito:', result);
        } else {
            Swal.fire({
                title: '¡UPS!',
                text: 'El caso no ha podido ser derivado correctamente.',
                icon: 'error', // Puede ser 'success', 'error', 'warning', 'info', 'question'
                confirmButtonText: 'Aceptar'
              })
            console.error('Error en la actualización múltiple:', await response.text());
        }
    } catch (error) {
        Swal.fire({
            title: '¡UPS!',
            text: 'El caso no ha podido ser derivado correctamente.',
            icon: 'error', // Puede ser 'success', 'error', 'warning', 'info', 'question'
            confirmButtonText: 'Aceptar'
          })
        console.error('Error en la actualización múltiple:', error);
    }
}
    
    // e.preventDefault();
    // fetch(url)
    // .then(response => response.json())
    // .then(data => {
    //   const rows = data.values; // Supongo que 'values' es el array de filas de Google Sheets

    //   // Filtrar por el valor del campo 'pas' y obtener el 'ejecutivo' correspondiente
    //   const nameToFind = document.getElementById('pas').value; // El nombre que quieres buscar (sin apellido)
    //   // Filtrar por el nombre en la primera columna (suponiendo que 'pas' está en la columna 0)
    //   const result = rows.filter(row => {
    //       const fullName = row[2]?.trim(); // Asegúrate de eliminar espacios en blanco al inicio y final
    //       if (!fullName) return false; // Evita errores si 'fullName' es undefined o null
      
    //       const nameToFindStr = String(nameToFind).trim().toLowerCase(); // Elimina espacios y convierte a minúsculas

    //       // Dividir el nombre completo en partes (nombre y apellido)
    //       const nameParts = fullName.split(/\s+/); // Usa expresión regular para dividir por espacios
      
    //       // Dividir nameToFind en partes (nombre y apellido)
    //       const nameToFindParts = nameToFindStr.split(/\s+/); // Divide el nombre ingresado en partes
    //       // Si el nombreToFind tiene más de un nombre (por ejemplo, nombre y apellido), comparamos ambas partes
    //       if (nameToFindParts.length > 1) {
    //           // Compara nombre y apellido
    //           return nameParts.length >= 2 &&
    //               nameParts[0].toLowerCase() === nameToFindParts[0].toLowerCase() && // Comparar primer nombre
    //               nameParts[1].toLowerCase() === nameToFindParts[1].toLowerCase();   // Comparar apellido
    //       } else {
    //           // Si solo hay un nombre en nameToFind, lo comparamos solo con la primera parte de fullName
    //           return nameParts[0].toLowerCase() === nameToFindParts[0].toLowerCase();
    //       }
    //   });
    //     console.log(result)
    //   if (result.length > 0) {
    //     // Encontramos el ejecutivo en la fila filtrada
    //     const ejecutivo = result[0][15]; // Suponiendo que el 'ejecutivo' está en la segunda columna (índice 1)
    //     const nroInterno = 'INT0009'
    //     console.log('Ejecutivo encontrado:', ejecutivo);

    //     const historialValue = document.getElementById('historial') ? document.getElementById('historial').value : "";
    //     const actualizacionValue = document.getElementById('actualizacion') ? document.getElementById('actualizacion').value : "";
        
    //     const concatenatedValue = historialValue + " " + actualizacionValue;
    
        
    //     // Extraer valores de los campos del formulario
    //     const valuesAtoC = [
    //         document.getElementById('ingreso') ? document.getElementById('ingreso').value : "",
    //         document.getElementById('pas') ? document.getElementById('pas').value : "",
    //        ejecutivo,
    //     ];
    //     const valuesEtoJ = [
    //         document.getElementById('cliente') ? document.getElementById('cliente').value : "",
    //         document.getElementById('ciaReclamo') ? document.getElementById('ciaReclamo').value : "",
    //         document.getElementById('dominio') ? document.getElementById('dominio').value : "",
    //         document.getElementById('telefono') ? document.getElementById('telefono').value : "",
    //         document.getElementById('email') ? document.getElementById('email').value : "",
    //         document.getElementById('obs') ? document.getElementById('obs').value : "",
    //     ];
    
    //     // URLs de archivos adjuntos para llenar de K a X
    //     // const filledUrls = urls.map(url => url || ''); // Reemplaza los valores vacíos con ''
    //     // while (filledUrls.length < 11) {
    //     //     filledUrls.push(''); // Asegura que haya exactamente 11 columnas en I:S
    //     // }
    
    //     // Datos para las columnas de T a V
    //     const valuesY= [
    //         concatenatedValue || "",
    //     ];
       
    //     const valuesACtoAD = [
    //         document.getElementById('estado') ? document.getElementById('estado').value : "",
    //         document.getElementById('tipoReclamo') ? document.getElementById('tipoReclamo').value : "",
           
    //     ];
    
    //    const rangeesAtoB = `A:C`;
    //    const rangeesEtoF = `E:J`;
    //    const rangeesHtoJ = `Y:Y`;
    //    const rangeesACtoAF = `AC:AD`;
    // updateRowInSheet(valuesAtoC,rangeesAtoB);
    // updateRowInSheet(valuesEtoJ, rangeesEtoF );
    // updateRowInSheet(valuesY, rangeesHtoJ );
    // updateRowInSheet( valuesACtoAD, rangeesACtoAF);

    //    // saveDataToSheet2((rowIndex+2),ejecutivo,nroInterno);
    //   } else {
    //     console.log('No se encontró el ejecutivo para el PAS:');
    //   }
      
    // })
    // .catch(error => {
    //   console.error('Error al obtener los datos:', error);
    // });



// async function legales(e) {
//     e.preventDefault();
//     fetch(url)
//     .then(response => response.json())
//     .then(data => {
//       const rows = data.values; // Supongo que 'values' es el array de filas de Google Sheets

//       // Filtrar por el valor del campo 'pas' y obtener el 'ejecutivo' correspondiente
//       const nameToFind = document.getElementById('pas').value; // El nombre que quieres buscar (sin apellido)
//       // Filtrar por el nombre en la primera columna (suponiendo que 'pas' está en la columna 0)
//       const result = rows.filter(row => {
//           const fullName = row[2]?.trim(); // Asegúrate de eliminar espacios en blanco al inicio y final
//           if (!fullName) return false; // Evita errores si 'fullName' es undefined o null
      
//           const nameToFindStr = String(nameToFind).trim().toLowerCase(); // Elimina espacios y convierte a minúsculas

//           // Dividir el nombre completo en partes (nombre y apellido)
//           const nameParts = fullName.split(/\s+/); // Usa expresión regular para dividir por espacios
      
//           // Dividir nameToFind en partes (nombre y apellido)
//           const nameToFindParts = nameToFindStr.split(/\s+/); // Divide el nombre ingresado en partes
//           // Si el nombreToFind tiene más de un nombre (por ejemplo, nombre y apellido), comparamos ambas partes
//           if (nameToFindParts.length > 1) {
//               // Compara nombre y apellido
//               return nameParts.length >= 2 &&
//                   nameParts[0].toLowerCase() === nameToFindParts[0].toLowerCase() && // Comparar primer nombre
//                   nameParts[1].toLowerCase() === nameToFindParts[1].toLowerCase();   // Comparar apellido
//           } else {
//               // Si solo hay un nombre en nameToFind, lo comparamos solo con la primera parte de fullName
//               return nameParts[0].toLowerCase() === nameToFindParts[0].toLowerCase();
//           }
//       });
//         console.log(result)
//       if (result.length > 0) {
//         // Encontramos el ejecutivo en la fila filtrada
//         const ejecutivo = 'LEGALES' // Suponiendo que el 'ejecutivo' está en la segunda columna (índice 1)
//         const nroInterno = 'INT0009'
//         console.log('Ejecutivo encontrado:', ejecutivo);

//         const historialValue = document.getElementById('historial') ? document.getElementById('historial').value : "";
//         const actualizacionValue = document.getElementById('actualizacion') ? document.getElementById('actualizacion').value : "";
        
//         const concatenatedValue = historialValue + " " + actualizacionValue;
    
        
//         // Extraer valores de los campos del formulario
//         const valuesAtoC = [
//             document.getElementById('ingreso') ? document.getElementById('ingreso').value : "",
//             document.getElementById('pas') ? document.getElementById('pas').value : "",
//            ejecutivo,
//         ];
//         const valuesEtoJ = [
//             document.getElementById('cliente') ? document.getElementById('cliente').value : "",
//             document.getElementById('ciaReclamo') ? document.getElementById('ciaReclamo').value : "",
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
//         const valuesY= [
//             concatenatedValue || "",
//         ];
       
//         const valuesACtoAD = [
//             document.getElementById('estado') ? document.getElementById('estado').value : "",
//             document.getElementById('tipoReclamo') ? document.getElementById('tipoReclamo').value : "",
           
//         ];
    
//        const rangeesAtoB = `A:C`;
//        const rangeesEtoF = `E:J`;
//        const rangeesHtoJ = `Y:Y`;
//        const rangeesACtoAF = `AC:AD`;
//     updateRowInSheet(valuesAtoC,rangeesAtoB);
//     updateRowInSheet(valuesEtoJ, rangeesEtoF );
//     updateRowInSheet(valuesY, rangeesHtoJ );
//     updateRowInSheet( valuesACtoAD, rangeesACtoAF);

//        // saveDataToSheet2((rowIndex+2),ejecutivo,nroInterno);
//       } else {
//         console.log('No se encontró el ejecutivo para el PAS:');
//       }
      
//     })
//     .catch(error => {
//       console.error('Error al obtener los datos:', error);
//     });
// }

// async function desistido(e) {
//     e.preventDefault();
//     fetch(url)
//     .then(response => response.json())
//     .then(data => {
//       const rows = data.values; // Supongo que 'values' es el array de filas de Google Sheets

//       // Filtrar por el valor del campo 'pas' y obtener el 'ejecutivo' correspondiente
//       const nameToFind = document.getElementById('pas').value; // El nombre que quieres buscar (sin apellido)
//       // Filtrar por el nombre en la primera columna (suponiendo que 'pas' está en la columna 0)
//       const result = rows.filter(row => {
//           const fullName = row[2]?.trim(); // Asegúrate de eliminar espacios en blanco al inicio y final
//           if (!fullName) return false; // Evita errores si 'fullName' es undefined o null
      
//           const nameToFindStr = String(nameToFind).trim().toLowerCase(); // Elimina espacios y convierte a minúsculas

//           // Dividir el nombre completo en partes (nombre y apellido)
//           const nameParts = fullName.split(/\s+/); // Usa expresión regular para dividir por espacios
      
//           // Dividir nameToFind en partes (nombre y apellido)
//           const nameToFindParts = nameToFindStr.split(/\s+/); // Divide el nombre ingresado en partes
//           // Si el nombreToFind tiene más de un nombre (por ejemplo, nombre y apellido), comparamos ambas partes
//           if (nameToFindParts.length > 1) {
//               // Compara nombre y apellido
//               return nameParts.length >= 2 &&
//                   nameParts[0].toLowerCase() === nameToFindParts[0].toLowerCase() && // Comparar primer nombre
//                   nameParts[1].toLowerCase() === nameToFindParts[1].toLowerCase();   // Comparar apellido
//           } else {
//               // Si solo hay un nombre en nameToFind, lo comparamos solo con la primera parte de fullName
//               return nameParts[0].toLowerCase() === nameToFindParts[0].toLowerCase();
//           }
//       });
//         console.log(result)
//       if (result.length > 0) {
//         // Encontramos el ejecutivo en la fila filtrada
//         const ejecutivo = result[0][15]; // Suponiendo que el 'ejecutivo' está en la segunda columna (índice 1)
//         const nroInterno = 'INT0009'
//         console.log('Ejecutivo encontrado:', ejecutivo);

//         const historialValue = document.getElementById('historial') ? document.getElementById('historial').value : "";
//         const actualizacionValue = document.getElementById('actualizacion') ? document.getElementById('actualizacion').value : "";
        
//         const concatenatedValue = historialValue + " " + actualizacionValue;
//         const estadoCambio = 'desistido'
        
//         // Extraer valores de los campos del formulario
//         const valuesAtoC = [
//             document.getElementById('ingreso') ? document.getElementById('ingreso').value : "",
//             document.getElementById('pas') ? document.getElementById('pas').value : "",
//            ejecutivo,
//         ];
//         const valuesEtoJ = [
//             document.getElementById('cliente') ? document.getElementById('cliente').value : "",
//             document.getElementById('ciaReclamo') ? document.getElementById('ciaReclamo').value : "",
//             document.getElementById('dominio') ? document.getElementById('dominio').value : "",
//             document.getElementById('telefono') ? document.getElementById('telefono').value : "",
//             document.getElementById('email') ? document.getElementById('email').value : "",
//             document.getElementById('obs') ? document.getElementById('obs').value : "",
//         ];
//         const valuesY= [
//             concatenatedValue || "",
//         ];
       
//         const valuesACtoAD = [
//             estadoCambio,
//             document.getElementById('tipoReclamo') ? document.getElementById('tipoReclamo').value : "",
           
//         ];
    
//        const rangeesAtoB = `A:C`;
//        const rangeesEtoF = `E:J`;
//        const rangeesHtoJ = `Y:Y`;
//        const rangeesACtoAF = `AC:AD`;
//     updateRowInSheet(valuesAtoC,rangeesAtoB);
//     updateRowInSheet(valuesEtoJ, rangeesEtoF );
//     updateRowInSheet(valuesY, rangeesHtoJ );
//     updateRowInSheet( valuesACtoAD, rangeesACtoAF);

//        // saveDataToSheet2((rowIndex+2),ejecutivo,nroInterno);
//       } else {
//         console.log('No se encontró el ejecutivo para el PAS:');
//       }
      
//     })
//     .catch(error => {
//       console.error('Error al obtener los datos:', error);
//     });
    
// }
// async function mediacion(e) {
//     e.preventDefault();
//     fetch(url)
//     .then(response => response.json())
//     .then(data => {
//       const rows = data.values; // Supongo que 'values' es el array de filas de Google Sheets

//       // Filtrar por el valor del campo 'pas' y obtener el 'ejecutivo' correspondiente
//       const nameToFind = document.getElementById('pas').value; // El nombre que quieres buscar (sin apellido)
//       // Filtrar por el nombre en la primera columna (suponiendo que 'pas' está en la columna 0)
//       const result = rows.filter(row => {
//           const fullName = row[2]?.trim(); // Asegúrate de eliminar espacios en blanco al inicio y final
//           if (!fullName) return false; // Evita errores si 'fullName' es undefined o null
      
//           const nameToFindStr = String(nameToFind).trim().toLowerCase(); // Elimina espacios y convierte a minúsculas

//           // Dividir el nombre completo en partes (nombre y apellido)
//           const nameParts = fullName.split(/\s+/); // Usa expresión regular para dividir por espacios
      
//           // Dividir nameToFind en partes (nombre y apellido)
//           const nameToFindParts = nameToFindStr.split(/\s+/); // Divide el nombre ingresado en partes
//           // Si el nombreToFind tiene más de un nombre (por ejemplo, nombre y apellido), comparamos ambas partes
//           if (nameToFindParts.length > 1) {
//               // Compara nombre y apellido
//               return nameParts.length >= 2 &&
//                   nameParts[0].toLowerCase() === nameToFindParts[0].toLowerCase() && // Comparar primer nombre
//                   nameParts[1].toLowerCase() === nameToFindParts[1].toLowerCase();   // Comparar apellido
//           } else {
//               // Si solo hay un nombre en nameToFind, lo comparamos solo con la primera parte de fullName
//               return nameParts[0].toLowerCase() === nameToFindParts[0].toLowerCase();
//           }
//       });
//         console.log(result)
//       if (result.length > 0) {
//         // Encontramos el ejecutivo en la fila filtrada
//         const ejecutivo = result[0][15]; // Suponiendo que el 'ejecutivo' está en la segunda columna (índice 1)
//         const nroInterno = 'INT0009'
//         console.log('Ejecutivo encontrado:', ejecutivo);

//         const historialValue = document.getElementById('historial') ? document.getElementById('historial').value : "";
//         const actualizacionValue = document.getElementById('actualizacion') ? document.getElementById('actualizacion').value : "";
        
//         const concatenatedValue = historialValue + " " + actualizacionValue;
//         const estadoCambio = 'desistido'
        
//         // Extraer valores de los campos del formulario
//         const valuesAtoC = [
//             document.getElementById('ingreso') ? document.getElementById('ingreso').value : "",
//             document.getElementById('pas') ? document.getElementById('pas').value : "",
//            ejecutivo,
//         ];
//         const valuesEtoJ = [
//             document.getElementById('cliente') ? document.getElementById('cliente').value : "",
//             document.getElementById('ciaReclamo') ? document.getElementById('ciaReclamo').value : "",
//             document.getElementById('dominio') ? document.getElementById('dominio').value : "",
//             document.getElementById('telefono') ? document.getElementById('telefono').value : "",
//             document.getElementById('email') ? document.getElementById('email').value : "",
//             document.getElementById('obs') ? document.getElementById('obs').value : "",
//         ];
//         const valuesY= [
//             concatenatedValue || "",
//         ];
       
//         const valuesACtoAD = [
//             estadoCambio,
//             document.getElementById('tipoReclamo') ? document.getElementById('tipoReclamo').value : "",
           
//         ];
    
//        const rangeesAtoB = `A:C`;
//        const rangeesEtoF = `E:J`;
//        const rangeesHtoJ = `Y:Y`;
//        const rangeesACtoAF = `AC:AD`;
//     updateRowInSheet(valuesAtoC,rangeesAtoB);
//     updateRowInSheet(valuesEtoJ, rangeesEtoF );
//     updateRowInSheet(valuesY, rangeesHtoJ );
//     updateRowInSheet( valuesACtoAD, rangeesACtoAF);

//        // saveDataToSheet2((rowIndex+2),ejecutivo,nroInterno);
//       } else {
//         console.log('No se encontró el ejecutivo para el PAS:');
//       }
      
//     })
//     .catch(error => {
//       console.error('Error al obtener los datos:', error);
//     });
    
// }
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