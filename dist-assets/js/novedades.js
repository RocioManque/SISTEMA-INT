

 const CLIENT_ID = '607561137784-rq84r06gop7p4hjo1nnv0q5re4fl2nff.apps.googleusercontent.com';
 const API_KEY = 'AIzaSyBLuMXUjJmU3XLfErAIH-iI4pXzmSnl-0E';
 const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/drive.readonly";

let tokenClient;
let gapiInited = false;
let gisInited = false;

// Cargar GAPI
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

// Cargar GIS
function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: '',
    });
    gisInited = true;
    maybeEnableButtons();
}

// Mostrar botones cuando GAPI y GIS estén listos
function maybeEnableButtons() {
    if (gapiInited && gisInited) {
        document.getElementById('authorize_button').style.visibility = 'visible';
    }
}

// Manejar clic en Autorizar
function handleAuthClick() {
    tokenClient.callback = async (resp) => {
        if (resp.error !== undefined) {
            console.error('Error durante la autenticación:', resp);
            return;
        }
        document.getElementById('authorize_button').style.visibility = 'hidden';
     //   document.getElementById('signout_button').style.visibility = 'visible';
        await listFiles();
    };

    if (gapi.client.getToken() === null) {
        tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
        tokenClient.requestAccessToken({ prompt: '' });
    }
    
}

// Obtener archivos desde la carpeta "Novedades"
async function listFiles() {
    try {
        // Buscar la carpeta "Novedades"
        const folderResponse = await gapi.client.drive.files.list({
            q: "name = 'novedades' and mimeType = 'application/vnd.google-apps.folder'",
            fields: 'files(id, name)',
        });

        if (folderResponse.result.files.length === 0) {
            document.getElementById('novedades').innerHTML = "<p>No se encontró la carpeta 'novedades'.</p>";
            return;
        }

        const folderId = folderResponse.result.files[0].id;

        // Obtener archivos dentro de la carpeta "Novedades"
        const filesResponse = await gapi.client.drive.files.list({
            q: `'${folderId}' in parents`,
            fields: 'files(id, name, webViewLink)',
        });

        renderFiles(filesResponse.result.files);
    } catch (error) {
        console.error('Error al listar archivos:', error);
    }
}

// Renderizar archivos en tarjetas
function renderFiles(files) {
    const novedadesContainer = document.getElementById('novedadesContainer');
    novedadesContainer.innerHTML = ''; // Limpiar el contenedor

    if (files.length === 0) {
       Container.innerHTML = "<p>No hay archivos en la carpeta 'novedades'.</p>";
        return;
    }
console.log(files)
files.forEach(file => {
    // Crear una columna de Bootstrap
    const cardColumn = document.createElement('div');
    cardColumn.className = 'col-md-4 d-flex align-items-stretch'; // Clase para columnas y distribución uniforme

    // Crear el contenido de la tarjeta
    cardColumn.innerHTML = `
        <div class="card mb-4 shadow-sm">
            <div class="card-body">
                <h5 class="card-title">${file.name}</h5>
            </div>
            <div class="card-footer text-center">
                <a href="${file.webViewLink}" target="_blank" class="btn btn-primary">Abrir</a>
            </div>
        </div>
    `;

    // Agregar la columna al contenedor de novedades
    novedadesContainer.appendChild(cardColumn);
});
}

// Cerrar sesión
function handleSignoutClick() {
    const token = gapi.client.getToken();
    if (token !== null) {
        google.accounts.oauth2.revoke(token.access_token);
        gapi.client.setToken('');
        document.getElementById('container').innerHTML = '';
        document.getElementById('authorize_button').style.visibility = 'visible';
        document.getElementById('signout_button').style.visibility = 'hidden';
    }
}
