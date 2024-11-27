


// Captura los parámetros de la URL
const params = new URLSearchParams(window.location.search);
const rowIndex = params.get('row')
console.log(rowIndex)
const pas = params.get('pas');
const cliente = params.get('cliente');
const telefonoCliente = params.get('telefonoCliente');
const mailCliente = params.get('mailCliente');
const fechaIngreso = params.get('fechaIngreso');
const fechaInicio = params.get('fechaInicio');
const numeroInterno = params.get('numeroInterno');
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

   const rangeesAtoB =  `A${rowIndex}:B${rowIndex}`;
   const rangeesEtoF =  `E${rowIndex}:F${rowIndex}`;
   const rangeesHtoJ =  `H${rowIndex}:J${rowIndex}`;
   const rangeesYtoZ =  `Y${rowIndex}:Z${rowIndex}`;
   const rangeesACtoAF = `AC${rowIndex}:AF${rowIndex}`;
   const rangeesAW =  `AW${rowIndex}`;
updateRowInSheet( valuesAtoB,rangeesAtoB);
updateRowInSheet(valuesEtoF, rangeesEtoF );
updateRowInSheet(valuesHtoJ, rangeesHtoJ );
updateRowInSheet(valuesYtoZ,rangeesYtoZ);
updateRowInSheet( valuesACtoAF, rangeesACtoAF);
updateRowInSheet( valuesAW, rangeesAW);


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
    const index= rowIndex; 
    e.preventDefault();
    const responsable = "legales";
    const valuesC = [
        responsable,   
    ];
   const rangeesC =  'C:10';
    updateRowInSheet( valuesC,rangeesC);
}

//facturacion
function facturacion(e){
    e.preventDefault();
    const estado = "facturacion";
    const valuesAC = [
        estado,   
    ];
   const rangeesAC =  'AC:10';
    updateRowInSheet( valuesAC,rangeesAC);
}


//desistido
function desistido(e){
    e.preventDefault();
    const estado = "DESISTIDO";
    const valuesAC = [
        estado,   
    ];
   const rangeesAC =  'AC:10';
    updateRowInSheet( valuesAC,rangeesAC);
}


//mediacion
function mediacion(e){
    e.preventDefault();
    const ejecutivo = "MARIANELA";
    const valuesC = [
        ejecutivo,   
    ];
   const rangeesC =  'C:10';
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