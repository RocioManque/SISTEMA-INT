const CLIENT_ID = '607561137784-rq84r06gop7p4hjo1nnv0q5re4fl2nff.apps.googleusercontent.com';
const API_KEY = 'AIzaSyBLuMXUjJmU3XLfErAIH-iI4pXzmSnl-0E';
const DISCOVERY_DOCS = [
    'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
    'https://www.googleapis.com/discovery/v1/apis/sheets/v4/rest'
];
const SCOPES = 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/spreadsheets';
// Llamar a la función con el ID de la hoja y el año deseado
const spreadsheetId = '1QzbFeGvzlzxVYN53G_5Dkl7Lji41Q6_0iMCqhVJhHhs';
const year = 2024; // Año deseado
const range = 'sheet1!A:BB'
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
const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${API_KEY}`;
async function getMonthlyCasesData(year) {
    console.log('funcion')
    fetch(url)
  .then(response => response.json())
  .then(data => {
    const rows = data.values; // Aquí obtienes todas las filas
    console.log(rows);
          // Suponiendo que la columna de fecha de ingreso está en la columna 9 (índice 8) y el estado en la columna 6 (índice 5)
          const casesByMonth = Array(12).fill(0); // Casos ingresados por mes
          const closedCasesByMonth = Array(12).fill(0); // Casos cerrados exitosamente por mes

          rows.forEach((row, index) => {
            if (index === 0) return; // Saltar la fila de encabezado
        
            // Asumiendo que la fecha está en formato dd/mm/yyyy y en la columna 0
            const fechaStr = row[0]; // Asegúrate de que la fecha esté en la columna correcta
        
            // Verifica que la fecha tenga el formato esperado
            if (fechaStr && /^\d{2}\/\d{2}\/\d{4}$/.test(fechaStr)) {
                const [day, month, year] = fechaStr.split('/'); // Dividir la fecha en partes (dd, mm, yyyy)
        
                // Construir la fecha usando los componentes en el formato correcto
                const fechaIngreso = new Date(Number(year), Number(month) - 1, Number(day)); // Mes - 1
        
                // Comprobación de fecha inválida
                if (isNaN(fechaIngreso)) {
                    console.error('Fecha inválida:', fechaStr);
                } else {
                    console.log('Fecha válida:', fechaIngreso);
                }
        
                const estadoCaso = row[28] || ''; // Asegúrate de que el estado esté en la columna correcta
        
                // Verificar si la fecha es del año especificado
                if (year) {
                    console.log('entra al getfullyyear')
                    const monthIndex = fechaIngreso.getMonth(); // 0 = Enero, 1 = Febrero, etc.
                    console.log(monthIndex)
                    casesByMonth[monthIndex]++;
        
                    // Verificar si el caso está cerrado exitosamente
                    if (estadoCaso.toLowerCase() === 'cobrado') {
                        closedCasesByMonth[monthIndex]++;
                    }
                }
            } else {
                console.error('Formato de fecha incorrecto:', fechaStr); // Aquí se alerta si el formato no es correcto
            }
        });
        console.log('Casos por mes:', casesByMonth);
        console.log('Casos cerrados por mes:', closedCasesByMonth);
        // const { casesByMonth, closedCasesByMonth } = await getMonthlyCasesData(year);

        // Calcular el total de casos ingresados y cerrados exitosamente durante el año
        const totalCases = casesByMonth.reduce((acc, cases) => acc + cases, 0);
        const totalClosedCases = closedCasesByMonth.reduce((acc, cases) => acc + cases, 0);
    
        // Calcular los promedios
        const averageCasesPerMonth = totalCases / 12;
        
        const averageClosedCasesPerMonth = totalClosedCases / 12;
    
        console.log('Promedio de casos ingresados por mes:', averageCasesPerMonth);
        console.log('Promedio de casos cerrados por mes:', averageClosedCasesPerMonth);
   // Asegúrate de obtener las filas del Sheet correctamente

    let dismissedCases = 0;
    let successfulCases = 0;

    rows.forEach((row, index) => {
        if (index === 0) return; // Saltar la fila de encabezado
        const estadoCaso = row[28] || ''; // Asegúrate de que el estado esté en la columna correcta

        if (estadoCaso.toLowerCase() === 'desistido') {
            dismissedCases++;
        } else if (estadoCaso.toLowerCase() === 'cobrado') {
            successfulCases++;
        }
    });

    console.log('Casos Desistidos:', dismissedCases);
    console.log('Casos Cobrados:', successfulCases);
  
    let totalDays = 0;
    let closedCases = 0;

    rows.forEach((row, index) => {
        if (index === 0) return; // Saltar la fila de encabezado
        const fechaIngresoStr = row[0]; // Asumiendo que la fecha de ingreso está en la columna 0
        const estadoCaso = row[28] || ''; // Asegúrate de que el estado esté en la columna correcta

        // Verificar que el caso esté cerrado exitosamente
        if (estadoCaso.toLowerCase() === 'cobrado') {
            const fechaIngreso2 = new Date(fechaIngresoStr);
            console.log(fechaIngreso2) // Suponiendo que el formato de fecha es válido
            const fechaCobroStr = row[32]; 
            console.log(fechaCobroStr)// Asumiendo que la fecha de cobro está en la columna 29
            const fechaCobro = new Date(fechaCobroStr);
            console.log(fechaCobro)

            // Calcular la diferencia en días entre el inicio y el cobro
            const diffTime = Math.abs(fechaCobro - fechaIngreso2);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convertir de milisegundos a días

            totalDays += diffDays;
            closedCases++;
        }
    });

    const averageTimeToClose = closedCases > 0 ? totalDays / closedCases : 0;

    console.log('Tiempo promedio hasta el cobro (en días):', averageTimeToClose);

    let activeCases = 0;
    let closedsCases = 0;
    console.log(rows)
    rows.forEach((row, index) => {
        if (index === 0) return; // Saltar la fila de encabezado
        const estadoCaso = row[28] || ''; // Asumiendo que el estado del caso está en la columna 28

        if (estadoCaso.toLowerCase() === 'ingresado' || 'facturacion'|| 'contactar'|| 'sin denuncia'|| 'para ingresar') {
            activeCases++;
        } else if (estadoCaso.toLowerCase() === 'cobrado') {
            closedsCases++;
        }
    });

    console.log('Casos Activos:', activeCases);
    console.log('Casos Cerrados:', closedsCases);
  
    const casesByExecutive = {};

    rows.forEach((row, index) => {
        if (index === 0) return; // Saltar la fila de encabezado
        const ejecutivo = row[2]; // Asumiendo que el ejecutivo de cuentas está en la columna 2
        const estadoCaso = row[28] || ''; // Asumiendo que el estado está en la columna 28

        if (!casesByExecutive[ejecutivo]) {
            casesByExecutive[ejecutivo] = { active: 0, closed: 0 };
        }

        if (estadoCaso.toLowerCase() === 'ingresado' || 'facturacion'|| 'contactar'|| 'sin denuncia'|| 'para ingresar') {
            casesByExecutive[ejecutivo].active++;
        } else if (estadoCaso.toLowerCase() === 'cobrado') {
            casesByExecutive[ejecutivo].closed++;
        }
    });

    console.log('Casos por Ejecutivo:', casesByExecutive);
    const casesByCompany = {};

    rows.forEach((row, index) => {
        if (index === 0) return; // Saltar la fila de encabezado
        const compania = row[5]; // Asumiendo que la compañía está en la columna 3
        const estadoCaso = row[28] || ''; // Asumiendo que el estado está en la columna 28

        if (!casesByCompany[compania]) {
            casesByCompany[compania] = { active: 0, closed: 0 };
        }

        if (estadoCaso.toLowerCase() === 'ingresado' || 'facturacion'|| 'contactar'|| 'sin denuncia'|| 'para ingresar') {
            casesByCompany[compania].active++;
        } else if (estadoCaso.toLowerCase() === 'cobrado') {
            casesByCompany[compania].closed++;
        }
    });

    console.log('Casos por Compañía:', casesByCompany);

    const facturadoPorMes = {};
    const facturadoPorEjecutivo = {};

    rows.forEach((row, index) => {
        if (index === 0) return; // Saltar la fila de encabezado
        const montoCobrado = parseFloat(row[31]) || 0; // Asumiendo que el monto está en la columna 30
        const fechaCobroStr = row[32]; // Asumiendo que la fecha de cobro está en la columna 29
        const ejecutivo = row[2]; // Asumiendo que el ejecutivo de cuentas está en la columna 2

        const fechaCobro = new Date(fechaCobroStr);
        const mes = fechaCobro.getMonth();

        // Acumulamos los montos por mes
        if (!facturadoPorMes[mes]) {
            facturadoPorMes[mes] = 0;
        }
        facturadoPorMes[mes] += montoCobrado;

        // Acumulamos los montos por ejecutivo
        if (!facturadoPorEjecutivo[ejecutivo]) {
            facturadoPorEjecutivo[ejecutivo] = 0;
        }
        facturadoPorEjecutivo[ejecutivo] += montoCobrado;
    });

    console.log('Total Facturado por Mes:', facturadoPorMes);
    console.log('Total Facturado por Ejecutivo:', facturadoPorEjecutivo);
        // Llamar a la función de gráficos
  renderCharts(casesByMonth, closedCasesByMonth,averageCasesPerMonth,averageClosedCasesPerMonth,dismissedCases,successfulCases,averageTimeToClose,activeCases,closedsCases,casesByExecutive,casesByCompany,facturadoPorMes,facturadoPorEjecutivo);

        return {
            casesByMonth,
            closedCasesByMonth,
            averageCasesPerMonth,
            averageClosedCasesPerMonth,
            dismissedCases,
            successfulCases,
            averageTimeToClose,
            activeCases,
            closedsCases,
            casesByExecutive,
            casesByCompany,
            facturadoPorMes, 
            facturadoPorEjecutivo
        };
   
    })

}
async function renderCharts(casesByMonth, closedCasesByMonth,averageCasesPerMonth,averageClosedCasesPerMonth,dismissedCases,successfulCases,averageTimeToClose,activeCases,closedCases,casesByExecutive,casesByCompany,facturadoPorMes,facturadoPorEjecutivo) {
    
    // Configuración para el gráfico de casos ingresados por mes
    const ctx1 = document.getElementById('casesByMonthChart').getContext('2d');
    new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            datasets: [{
                label: 'Casos Ingresados',
                data: casesByMonth,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',   // Enero - Rojo suave
                    'rgba(54, 162, 235, 0.2)',   // Febrero - Azul claro
                    'rgba(75, 192, 192, 0.2)',   // Marzo - Verde agua
                    'rgba(153, 102, 255, 0.2)',  // Abril - Violeta
                    'rgba(255, 159, 64, 0.2)',   // Mayo - Naranja suave
                    'rgba(255, 205, 86, 0.2)',   // Junio - Amarillo
                    'rgba(201, 203, 207, 0.2)',  // Julio - Gris claro
                    'rgba(102, 205, 170, 0.2)',  // Agosto - Verde claro
                    'rgba(255, 99, 71, 0.2)',    // Septiembre - Tomate
                    'rgba(106, 90, 205, 0.2)',   // Octubre - Azul oscuro
                    'rgba(244, 164, 96, 0.2)',   // Noviembre - Marrón claro
                    'rgba(0, 191, 255, 0.2)'     // Diciembre - Azul celeste
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',   // Enero - Rojo suave
                    'rgba(54, 162, 235, 1)',   // Febrero - Azul claro
                    'rgba(75, 192, 192, 1)',   // Marzo - Verde agua
                    'rgba(153, 102, 255, 1)',  // Abril - Violeta
                    'rgba(255, 159, 64, 1)',   // Mayo - Naranja suave
                    'rgba(255, 205, 86, 1)',   // Junio - Amarillo
                    'rgba(201, 203, 207, 1)',  // Julio - Gris claro
                    'rgba(102, 205, 170, 1)',  // Agosto - Verde claro
                    'rgba(255, 99, 71, 1)',    // Septiembre - Tomate
                    'rgba(106, 90, 205, 1)',   // Octubre - Azul oscuro
                    'rgba(244, 164, 96, 1)',   // Noviembre - Marrón claro
                    'rgba(0, 191, 255, 1)'     // Diciembre - Azul celeste
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Configuración para el gráfico de casos cerrados por mes
    const ctx2 = document.getElementById('closedCasesByMonthChart').getContext('2d');
    new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            datasets: [{
                label: 'Casos Cerrados Exitosamente',
                data: closedCasesByMonth,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',   // Enero - Rojo suave
                    'rgba(54, 162, 235, 0.2)',   // Febrero - Azul claro
                    'rgba(75, 192, 192, 0.2)',   // Marzo - Verde agua
                    'rgba(153, 102, 255, 0.2)',  // Abril - Violeta
                    'rgba(255, 159, 64, 0.2)',   // Mayo - Naranja suave
                    'rgba(255, 205, 86, 0.2)',   // Junio - Amarillo
                    'rgba(201, 203, 207, 0.2)',  // Julio - Gris claro
                    'rgba(102, 205, 170, 0.2)',  // Agosto - Verde claro
                    'rgba(255, 99, 71, 0.2)',    // Septiembre - Tomate
                    'rgba(106, 90, 205, 0.2)',   // Octubre - Azul oscuro
                    'rgba(244, 164, 96, 0.2)',   // Noviembre - Marrón claro
                    'rgba(0, 191, 255, 0.2)'     // Diciembre - Azul celeste
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',   // Enero - Rojo suave
                    'rgba(54, 162, 235, 1)',   // Febrero - Azul claro
                    'rgba(75, 192, 192, 1)',   // Marzo - Verde agua
                    'rgba(153, 102, 255, 1)',  // Abril - Violeta
                    'rgba(255, 159, 64, 1)',   // Mayo - Naranja suave
                    'rgba(255, 205, 86, 1)',   // Junio - Amarillo
                    'rgba(201, 203, 207, 1)',  // Julio - Gris claro
                    'rgba(102, 205, 170, 1)',  // Agosto - Verde claro
                    'rgba(255, 99, 71, 1)',    // Septiembre - Tomate
                    'rgba(106, 90, 205, 1)',   // Octubre - Azul oscuro
                    'rgba(244, 164, 96, 1)',   // Noviembre - Marrón claro
                    'rgba(0, 191, 255, 1)'     // Diciembre - Azul celeste
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

const ctx = document.getElementById('promedioAnualCasosChart').getContext('2d');
 new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Casos Ingresados', 'Casos Cerrados Exitosamente'],
        datasets: [{
            label: 'Promedio Anual',
            data: [averageCasesPerMonth, averageClosedCasesPerMonth],
            backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                beginAtZero: true
            }
        }
    }
});
const ctx4 = document.getElementById('dismissedChart').getContext('2d');
new Chart(ctx4, {
    type: 'pie', // Usar 'pie' para gráfico circular
        data: {
            labels: ['Desistidos', 'Cobrados'],
            datasets: [{
                label: 'Casos Desistidos vs Cobrados',
                data: [dismissedCases,successfulCases], // Datos para el gráfico
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(75, 192, 192, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,  // Permitir ajustar el tamaño del gráfico
           
        }
})
const ctx5 = document.getElementById('averageTimeChart').getContext('2d');
new Chart(ctx5, {
    type: 'line',
    data: {
        labels: ['Tiempo Promedio de Cobro'],
        datasets: [{
            label: 'Días promedio',
            data: [averageTimeToClose],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false
        }]
    }
});
const ctx6 = document.getElementById('activeVsClosedChart').getContext('2d');
new Chart(ctx6, {
    type: 'pie', // También puede ser 'bar' si prefieres barras
    data: {
        labels: ['Casos Activos', 'Casos Cerrados'],
        datasets: [{
            data: [activeCases,closedCases],
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(75, 192, 192, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
            borderWidth: 1
        }]
    }
});
const ctx7 = document.getElementById('casesByExecutiveChart').getContext('2d');
const colors = [
    'rgba(255, 99, 132, 0.2)',  // Rojo claro
    'rgba(54, 162, 235, 0.2)',  // Azul claro
    'rgba(255, 206, 86, 0.2)',  // Amarillo claro
    'rgba(75, 192, 192, 0.2)',  // Verde claro
    'rgba(153, 102, 255, 0.2)', // Púrpura claro
    'rgba(255, 159, 64, 0.2)',  // Naranja claro
    'rgba(199, 199, 199, 0.2)', // Gris claro
    'rgba(83, 102, 255, 0.2)',  // Azul más oscuro
    'rgba(183, 102, 210, 0.2)', // Lila claro
    'rgba(255, 180, 120, 0.2)'  // Salmón claro
];

// Asegúrate de tener suficientes colores para todos los ejecutivos
const borderColors = [
    'rgba(255, 99, 132, 1)',  // Rojo oscuro
    'rgba(54, 162, 235, 1)',  // Azul oscuro
    'rgba(255, 206, 86, 1)',  // Amarillo oscuro
    'rgba(75, 192, 192, 1)',  // Verde oscuro
    'rgba(153, 102, 255, 1)', // Púrpura oscuro
    'rgba(255, 159, 64, 1)',  // Naranja oscuro
    'rgba(159, 159, 159, 1)', // Gris oscuro
    'rgba(83, 102, 205, 1)',  // Azul más oscuro
    'rgba(143, 92, 200, 1)',  // Lila oscuro
    'rgba(255, 140, 100, 1)'  // Salmón oscuro
];
const executiveNames = Object.keys(casesByExecutive);

// Generar colores para cada ejecutivo
const backgroundColors = executiveNames.map((_, index) => colors[index % colors.length]);
const borderColorsForExecutives = executiveNames.map((_, index) => borderColors[index % borderColors.length]);
new Chart(ctx7, {
    type: 'bar',
    data: {
        labels: Object.keys(casesByExecutive),
        datasets: [{
            label: 'Casos Activos',
            data: Object.values(casesByExecutive).map(item => item.active),
            backgroundColor: backgroundColors,
            borderColor: borderColorsForExecutives,
            borderWidth: 1
        }, {
            label: 'Casos Cerrados',
            data: Object.values(casesByExecutive).map(item => item.closed),
            backgroundColor: backgroundColors,
            borderColor: borderColorsForExecutives,
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                stacked: true
            },
            y: {
                stacked: true
            }
        }
    }
});

const ctx8 = document.getElementById('casesByCompanyChart').getContext('2d');
const colorscom = [
    'rgba(255, 99, 132, 0.2)',  // Rojo claro
    'rgba(54, 162, 235, 0.2)',  // Azul claro
    'rgba(255, 206, 86, 0.2)',  // Amarillo claro
    'rgba(75, 192, 192, 0.2)',  // Verde claro
    'rgba(153, 102, 255, 0.2)', // Púrpura claro
    'rgba(255, 159, 64, 0.2)',  // Naranja claro
    'rgba(199, 199, 199, 0.2)', // Gris claro
    'rgba(83, 102, 255, 0.2)',  // Azul más oscuro
    'rgba(183, 102, 210, 0.2)', // Lila claro
    'rgba(255, 180, 120, 0.2)'  // Salmón claro
];

// Asegúrate de tener suficientes colores para todos los ejecutivos
const borderColorscom = [
    'rgba(255, 99, 132, 1)',  // Rojo oscuro
    'rgba(54, 162, 235, 1)',  // Azul oscuro
    'rgba(255, 206, 86, 1)',  // Amarillo oscuro
    'rgba(75, 192, 192, 1)',  // Verde oscuro
    'rgba(153, 102, 255, 1)', // Púrpura oscuro
    'rgba(255, 159, 64, 1)',  // Naranja oscuro
    'rgba(159, 159, 159, 1)', // Gris oscuro
    'rgba(83, 102, 205, 1)',  // Azul más oscuro
    'rgba(143, 92, 200, 1)',  // Lila oscuro
    'rgba(255, 140, 100, 1)'  // Salmón oscuro
];
const companyNames = Object.keys(casesByCompany);

// Generar colores para cada ejecutivo
const backgroundColorsCompany = companyNames.map((_, index) => colors[index % colors.length]);
const borderColorsForExecutivesCompany = companyNames.map((_, index) => borderColorscom[index % borderColorscom.length]);
new Chart(ctx8, {
    type: 'pie', // También puede ser 'bar' si prefieres barras apiladas
    data: {
        labels: Object.keys(casesByCompany),
        datasets: [{
            data: Object.values(casesByCompany).map(item => item.active),
            backgroundColor: backgroundColorsCompany,
            borderColor: borderColorsForExecutivesCompany,
            borderWidth: 1
        }]
    }
});
const ctx9 = document.getElementById('facturadoPorMesChart').getContext('2d');
 new Chart(ctx9, {
    type: 'line',
    data: {
        labels: Object.keys(facturadoPorMes),
        datasets: [{
            label: 'Monto Facturado',
            data: Object.values(facturadoPorMes),
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false
        }]
    }
});

// Gráfico de barras para total facturado por ejecutivo
const ctx10 = document.getElementById('facturadoPorEjecutivoChart').getContext('2d');
new Chart(ctx10, {
    type: 'bar',
    data: {
        labels: Object.keys(facturadoPorEjecutivo),
        datasets: [{
            label: 'Monto Facturado',
            data: Object.values(facturadoPorEjecutivo),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    }
});




}








getMonthlyCasesData(year);