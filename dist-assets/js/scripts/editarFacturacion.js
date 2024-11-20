const CLIENT_ID = '607561137784-rq84r06gop7p4hjo1nnv0q5re4fl2nff.apps.googleusercontent.com';
const API_KEY = 'AIzaSyBLuMXUjJmU3XLfErAIH-iI4pXzmSnl-0E';
const DISCOVERY_DOCS = [
    'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
    'https://www.googleapis.com/discovery/v1/apis/sheets/v4/rest'
];
const SCOPES = 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/spreadsheets';
let tokenClient;
let gapiInited = false;
let gisInited = false;


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
// Captura los parámetros de la URL
const params = new URLSearchParams(window.location.search);

const caso= params.get('caso');
const plan= params.get('plan');
const estado= params.get('estado');
const tipoReclamo= params.get('tipoReclamo');
const nroReclamoCia= params.get('nroReclamoCia');
const montoReclamado= params.get('montoReclamado');
const montoCerrado= params.get('montoCerrado');
const FechaDePago= params.get('FechaDePago');
const FechaFacturacion= params.get('FechaFacturacion');
const FacturadoPor= params.get('FacturadoPor');
const Consultores= params.get('Consultores');
const ComisionPas= params.get('ComisionPas');
const TotalFacturadoSinIva= params.get('TotalFacturadoSinIva');
const nroFactura= params.get('nroFactura');
const iva= params.get('iva');
const totalFacturadoConIva= params.get('totalFacturadoConIva');
const retencionIva= params.get('retencionIva');
const retencionGanancia= params.get('retencionGanancia');
const retencionIBcompania= params.get('retencionIBcompania');
const retencionIBbanco= params.get('retencionIBbanco');
const gastosEstructura= params.get('gastosEstructura');
const totalPercibido= params.get('totalPercibido');
   // Asignar la fecha al input

// Luego muestra o manipula estos datos en la página según lo necesites
document.getElementById('caso').value = caso;
document.getElementById('plan').value = plan;
document.getElementById('ingreso').value = fechaIngreso;
fechaInicio === '' ? document.getElementById('inicio').value = formattedDate : document.getElementById('inicio').value = fechaInicio ;
document.getElementById('reclamo').value = numeroInterno;
document.getElementById('tipoReclamo').value = tipoReclamo;
document.getElementById('montoReclamado').value = montoReclamar;
document.getElementById('montoCerrado').value = montoCerrado;
document.getElementById('ciaReclamo').value = companiaReclamar;
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
    const range =`sheet1!${ranges}`;
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
            const result = await response.json();
            console.log('Fila actualizada con éxito:', result);
        } else {
            console.error('Error al actualizar la fila:', await response.text());
        }
    } catch (error) {
        console.error('Error al actualizar la fila:', error);
    }
}
function actualizar(e){
    e.preventDefault();
    const historialValue = document.getElementById('historial') ? document.getElementById('historial').value : "";
    const actualizacionValue = document.getElementById('actualizacion') ? document.getElementById('actualizacion').value : "";
    
    const concatenatedValue = historialValue + " " + actualizacionValue;
    // Extraer valores de los campos del formulario
    const valuesAtoB = [
        document.getElementById('ingreso') ? document.getElementById('ingreso').value : "",
        document.getElementById('pas') ? document.getElementById('pas').value : "",
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
//enviar whatsapp 
document.getElementById('sendWhatsApp').addEventListener('click', function() {
    const historialValue = document.getElementById('historial') ? document.getElementById('historial').value : "";
    const actualizacionValue = document.getElementById('actualizacion') ? document.getElementById('actualizacion').value : "";
    
    const concatenatedValue = historialValue + " " + actualizacionValue;
    const mensaje = concatenatedValue;
    const phoneNumber = '542994707809'; // Reemplaza con el número de teléfono completo
    const message = `¡Buenos dias! Este es la ultima actualización de su Caso: ${mensaje}`;
    
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
    const responsable = "LEGALES";
    const valuesC = [
        responsable,   
    ];
   const rangeesC =  'C11';
    updateRowInSheet( valuesC,rangeesC);
}

//facturacion
function facturacion(e){
    e.preventDefault();
    const estado = "facturacion";
    const valuesAC = [
        estado,   
    ];
   const rangeesAC =  'AC11';
    updateRowInSheet( valuesAC,rangeesAC);
}


//desistido
function desistido(e){
    e.preventDefault();
    const estado = "DESISTIDO";
    const valuesAC = [
        estado,   
    ];
   const rangeesAC =  'AC11';
    updateRowInSheet( valuesAC,rangeesAC);
}


//mediacion
function mediacion(e){
    e.preventDefault();
    const ejecutivo = "MARIANELA";
    const valuesC = [
        ejecutivo,   
    ];
   const rangeesC =  'C11';
    updateRowInSheet( valuesC,rangeesC);
}

// document.getElementById('dataForm').addEventListener('submit', async function (e) {