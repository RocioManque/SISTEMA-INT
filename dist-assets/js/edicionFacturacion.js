// Captura los parámetros de la URL
const params = new URLSearchParams(window.location.search);
const rowIndex = params.get("index");
const caso = params.get("caso");
const plan = params.get("plan");
const estado = params.get("estado");
const tipoReclamo = params.get("tipoReclamo");
const nroReclamoCia = params.get("nroReclamoCia");
const montoReclamado = params.get("montoReclamado");
const montoCerrado = params.get("montoCerrado");
const fechaDePago = params.get("fechaDePago");
const fechaDeFacturacion = params.get("fechaDeFacturacion");
const facturadoPor = params.get("facturadoPor");
const consultores = params.get("consultores");
const comisionPas = params.get("comisionPas");
const nroFactura = params.get("nroFactura");
const totalFacturadoSinIva = params.get("totalFacturadoSinIva");
const iva = params.get("iva");
const totalFacturadoConIva = params.get("totalFacturadoConIva");
const retencionIva = params.get("retencionIva");
const retencionGanancia = params.get("retencionGanancia");
const retencionIBcompania = params.get("retencionIBcompania");
const retencionIBbanco = params.get("retencionIBbanco");
const gastosEstructura = params.get("gastosEstructura");
const fechaDePagoComision = params.get("fechaDePagoComision");
const totalPercibido = params.get("totalPercibido");

// Obtener la fecha actual
const today = new Date();

// Formatear la fecha a dd/mm/yy
const day = String(today.getDate()).padStart(2, "0"); // Asegura dos dígitos
const month = String(today.getMonth() + 1).padStart(2, "0"); // Mes +1 (0-indexado)
const year = String(today.getFullYear()).slice(-2); // Últimos dos dígitos del año

const formattedDate = `${day}/${month}/${year}`;
console.log(formattedDate);
// Asignar la fecha al input

// Luego muestra o manipula estos datos en la página según lo necesites
document.getElementById("caso").value = caso;
document.getElementById("plan").value = plan;
document.getElementById("nroReclamo").value = nroReclamoCia;
document.getElementById("facturadoPor").value = facturadoPor;
document.getElementById("fechaPago").value = fechaDePago;
document.getElementById("tipoReclamo").value = tipoReclamo;
document.getElementById("montoCerrado").value = montoCerrado;
document.getElementById("montoReclamado").value = montoReclamado;
document.getElementById("fechaFactura").value = fechaDeFacturacion;
document.getElementById("consultores").value = consultores;
document.getElementById("comisionPas").value = comisionPas;
document.getElementById("retencionIva").value = retencionIva;
document.getElementById("retencionGanancia").value = retencionGanancia;
document.getElementById("retencionIBBcompania").value = retencionIBcompania;
document.getElementById("retencionIBBbanco").value = retencionIBbanco;
document.getElementById("gastosEstructura").value = gastosEstructura;
document.getElementById("facturadoSinIva").value = totalFacturadoSinIva;
document.getElementById("nroFactura").value = nroFactura;
document.getElementById("iva").value = iva;
document.getElementById("totalPercibido").value = totalPercibido;
// Y así sucesivamente para otros campos


async function actualizar(e) {
    const fc = document.getElementById("file-input");
    const spreadsheetId = "1QzbFeGvzlzxVYN53G_5Dkl7Lji41Q6_0iMCqhVJhHhs";
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0"); 
    const month = String(today.getMonth() + 1).padStart(2, "0"); 
    const year = today.getFullYear();
    const fechaHoy = `${day}/${month}/${year}`;
    
    // Función para limpiar el valor de los inputs (eliminar puntos de miles)
    const limpiarNumero = (numero) => {
      return parseFloat(numero.replace(/\./g, ''));
    };
  
    // Obtener valores de inputs y convertir a números sin punto
    const facturadoSinIva = limpiarNumero(document.getElementById("facturadoSinIva").value);
    
    const calcularPorcentaje = (inputId) => {
      const porcentaje = parseFloat(document.getElementById(inputId).value);
      return parseFloat(
        porcentaje > 0 && porcentaje < 100 && porcentaje != null
          ? (facturadoSinIva * porcentaje) / 100
          : 0
      );
    };
  
    const calcularPorcentajeIva = (inputId) => {
      const porcentaje = parseFloat(document.getElementById(inputId).value);
      return parseFloat(
        porcentaje > 0 && porcentaje < 100 && porcentaje != null
          ? (facturadoSinIva * porcentaje) / 100
          : 0
      );
    };
  
    // Realizar cálculos
    const gastosEstructura = calcularPorcentaje("gastosEstructura");
    const retencionIva = calcularPorcentaje("retencionIva");
    const retencionIBBcompania = calcularPorcentaje("retencionIBBcompania");
    const retencionIBBbanco = calcularPorcentaje("retencionIBBbanco");
    const retencionGanancia = calcularPorcentaje("retencionGanancia");
    const iva = calcularPorcentajeIva("iva");
    const caso = document.getElementById("caso").value;
  const plan = document.getElementById("plan").value;
  const nroReclamo = document.getElementById("nroReclamo").value;
  const facturadoPor = document.getElementById("facturadoPor").value;
  const fechaPago = document.getElementById("fechaPago").value;
  const tipoReclamo = document.getElementById("tipoReclamo").value;
  const montoCerrado = document.getElementById("montoCerrado").value;
  const fechaFactura = document.getElementById("fechaFactura").value;
  const consultores = document.getElementById("consultores").value;
  const comisionPas = document.getElementById("comisionPas").value;
  const nroFactura = document.getElementById("nroFactura").value;
    const facturadoConIva = facturadoSinIva + iva;
  const fechaPagoComision = document.getElementById("fechaPagoComision").value;
    const totalPercibido =
      facturadoSinIva +
      iva - 
      (retencionIva + retencionGanancia + retencionIBBcompania + retencionIBBbanco + gastosEstructura);
    
    const ultimaActualizacion = fechaHoy;

    // Función para formatear el número con punto de miles
    const formatearConPuntos = (numero) => {
      return numero.toLocaleString('de-DE'); // 'de-DE' usa punto como separador de miles
    };
  
    // Crear la solicitud BatchUpdate
    const batchUpdateBody = {
      requests: [
        {
          updateCells: {
            range: {
              sheetId: "454305688",
              startRowIndex: rowIndex - 1,
              endRowIndex: rowIndex,
              startColumnIndex: 26,
              endColumnIndex: 48,
            },
            rows: [
              {
                values: [
                  { userEnteredValue: { stringValue: String(plan) } },
                  { userEnteredValue: { stringValue: String(nroReclamo) } },
                  { userEnteredValue: { stringValue: String(estado) } },
                  { userEnteredValue: { stringValue: String(tipoReclamo) } },
                  { userEnteredValue: { stringValue: String(montoReclamado) } },
                  { userEnteredValue: { stringValue: String(montoCerrado) } },
                  { userEnteredValue: { stringValue: String(fechaPago) } },
                  { userEnteredValue: { stringValue: String(fechaFactura) } },
                  { userEnteredValue: { stringValue: String(facturadoPor) } },
                  { userEnteredValue: { stringValue: String(caso) } },
                  { userEnteredValue: { stringValue: String(consultores) } },
                  { userEnteredValue: { stringValue: String(comisionPas) } },
                  { userEnteredValue: { stringValue: formatearConPuntos(facturadoSinIva) } },
                  { userEnteredValue: { stringValue: String(nroFactura) } },
                  { userEnteredValue: { stringValue: formatearConPuntos(iva) } },
                  { userEnteredValue: { stringValue: formatearConPuntos(facturadoConIva) } },
                  { userEnteredValue: { stringValue: formatearConPuntos(retencionIva) } },
                  { userEnteredValue: { stringValue: formatearConPuntos(retencionGanancia) } },
                  { userEnteredValue: { stringValue: formatearConPuntos(retencionIBBcompania) } },
                  { userEnteredValue: { stringValue: formatearConPuntos(retencionIBBbanco) } },
                  { userEnteredValue: { stringValue: formatearConPuntos(gastosEstructura) } },
                  { userEnteredValue: { stringValue: String(fechaPagoComision) } },
                ],
              },
            ],
            fields: "userEnteredValue",
          },
        },
        {
          updateCells: {
            range: {
              sheetId: "454305688",
              startRowIndex: rowIndex - 1,
              endRowIndex: rowIndex,
              startColumnIndex: 52,
              endColumnIndex: 53,
            },
            rows: [
              {
                values: [
                  { userEnteredValue: { stringValue: formatearConPuntos(totalPercibido) } },
                ],
              },
            ],
            fields: "userEnteredValue",
          },
        },
        {
          updateCells: {
            range: {
              sheetId: "454305688",
              startRowIndex: rowIndex - 1,
              endRowIndex: rowIndex,
              startColumnIndex: 55,
              endColumnIndex: 56,
            },
            rows: [
              {
                values: [
                  { userEnteredValue: { stringValue: String(ultimaActualizacion) } },
                ],
              },
            ],
            fields: "userEnteredValue",
          },
        },
      ],
    };
  
    try {
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${gapi.client.getToken().access_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(batchUpdateBody),
        }
      );
  
      if (response.ok) {
        const result = await response.json();
        Swal.fire({
          title: "¡Éxito!",
          text: "El caso se actualizó correctamente.",
          icon: "success",
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/html/facturacion.html";
          }
        });
        console.log("Actualización múltiple realizada con éxito:", result);
      } else {
        Swal.fire({
          title: "¡UPS!",
          text: "El caso no pudo Guardarse correctamente.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
        console.error("Error en la actualización múltiple:", await response.text());
      }
    } catch (error) {
      Swal.fire({
        title: "¡UPS!",
        text: "El caso no pudo Guardarse correctamente.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      console.error("Error en la actualización múltiple:", error);
    }
  }
  
