// ID de la carpeta pública "Novedades"
const folderId = "1gGwws_XnxllknHbwwslSzzCFWZZyte3W"; // Reemplaza con el ID real de tu carpeta
const apiKey = 'AIzaSyBLuMXUjJmU3XLfErAIH-iI4pXzmSnl-0E'; // Reemplaza con tu API Key válida de Google Cloud

async function listFiles() {
    console.log('Cargando archivos de la carpeta pública...');
    try {
        // URL para obtener los archivos en la carpeta pública
        const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}&fields=files(id,name,webViewLink)`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error al obtener archivos: ${response.statusText}`);
        }

        const data = await response.json();
        renderFiles(data.files);
    } catch (error) {
        console.error('Error al listar archivos:', error);
        document.getElementById('novedadesContainer').innerHTML = "<p>Error al cargar archivos.</p>";
    }
}

function renderFiles(files) {
    const novedadesContainer = document.getElementById('novedadesContainer');
    novedadesContainer.innerHTML = ''; // Limpiar el contenedor

    if (!files || files.length === 0) {
        novedadesContainer.innerHTML = "<p>No hay archivos en la carpeta 'Novedades'.</p>";
        return;
    }

    console.log('Archivos encontrados:', files);

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
