// Captura los parámetros de la URL
const params = new URLSearchParams(window.location.search);
const caso = params.get('caso');
const plan = params.get('plan');
const estado = params.get('estado');
const tipoReclamo = params.get('tipoReclamo');
const nroReclamoCia = params.get('nroReclamoCia');
const montoReclamado = params.get('montoReclamado');
const montoCerrado = params.get('montoCerrado');
const fechaDePago = params.get('fechaDePago');
const fechaDeFacturacion = params.get('fechaDeFacturacion');
const facturadoPor = params.get('facturadoPor');
const consultores = params.get('consultores');
const comisionPas = params.get('comisionPas');
const nroFactura = params.get('nroFactura');
const totalFacturadoSinIva = params.get('totalFacturadoSinIva');
const iva = params.get('iva');
const totalFacturadoConIva = params.get('totalFacturadoConIva');
const retencionIva = params.get('retencionIva');
const retencionGanancia = params.get('retencionGanancia');
const retencionIBcompania = params.get('retencionIBcompania');
const retencioIBbanco = params.get('retencioIBbanco');
const gastosEstructura = params.get('gastosEstructura');
const totalPercibido = params.get('totalPercibido');


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
document.getElementById('caso').value = caso;
document.getElementById('plan').value = plan;
document.getElementById('nroReclamo').value = nroReclamoCia;
document.getElementById('facturadoPor').value = facturadoPor;
document.getElementById('fechaPago').value = fechaDePago;
document.getElementById('tipoReclamo').value = tipoReclamo;
document.getElementById('montoCerrado').value = montoCerrado;
document.getElementById('montoReclamado').value = montoReclamado;
document.getElementById('fechaFactura').value = fechaDeFacturacion;
document.getElementById('consultores').value = consultores;
document.getElementById('comisionPas').value = comisionPas;
document.getElementById('retencionIva').value =  retencionIva;
document.getElementById('retencionGanancia').value = retencionGanancia;
document.getElementById('retencionIBBcompania').value = retencionIBcompania;
document.getElementById('retencionIBBbanco').value = retencioIBbanco;
document.getElementById('gastosEstructura').value = gastosEstructura;
document.getElementById('facturadoSinIva').value = totalFacturadoSinIva;
document.getElementById('nroFactura').value = nroFactura;
document.getElementById('iva').value = iva;
document.getElementById('facturadoConIva').value = informeHistorial;
document.getElementById('fechaPagoComision').value = informeHistorial;
document.getElementById('totalPercibido').value = informeHistorial;
// Y así sucesivamente para otros campos