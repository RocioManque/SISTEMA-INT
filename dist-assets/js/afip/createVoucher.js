import { readFileSync, createWriteStream } from 'fs';
import Afip from '@afipsdk/afip.js';

async function generatePDF() {
// Función para generar la factura y su PDF
(async () => {
    try {
        const voucherData = {
            CantReg: 1, // Cantidad de comprobantes a registrar
            PtoVta: 1, // Punto de venta
            CbteTipo: 11, // Tipo de comprobante (11 para factura C)
            Concepto: 1, // Concepto (1: productos, 2: servicios, 3: ambos)
            DocTipo: 99, // Tipo de documento del cliente (99: consumidor final)
            DocNro: 0, // Número de documento del cliente (0 para consumidor final)
            CbteDesde: 1, // Número del comprobante desde
            CbteHasta: 1, // Número del comprobante hasta
            CbteFch: parseInt(new Date().toISOString().slice(0, 10).replace(/-/g, '')), // Fecha del comprobante
            ImpTotal: 100.0, // Importe total
            ImpTotConc: 0, // Importe neto no gravado
            ImpNeto: 100.0, // Importe neto gravado
            ImpOpEx: 0, // Importe exento
            ImpIVA: 0, // Importe de IVA
            ImpTrib: 0, // Importe de tributos
            MonId: 'PES', // Moneda (PES para pesos)
            MonCotiz: 1, // Cotización de la moneda
        };

        // Configuración del SDK
const afip = new Afip({
    CUIT: 20409378472, // CUIT de pruebas
    production: false, // Entorno de desarrollo
});
        // Generar la factura electrónica
        const afipResponse = await afip.ElectronicBilling.createNextVoucher(voucherData);
        console.log('Factura generada:', afipResponse);

        // Leer el HTML de ejemplo para el PDF
        let html = 
        readFileSync('C:/Users/usuario/Desktop/Test de fa/dist-assets/js/afip/bill.html', 'utf8');
        html = html
        .replace('{{CAE}}', afipResponse.CAE)
        .replace('{{CAEFchVto}}', afipResponse.CAEFchVto)
        .replace('{{clientName}}', 'Cliente de Prueba')
        .replace('{{clientCUIT}}', '20111111112')
        .replace('{{formattedDate}}', new Date().toLocaleDateString())
        .replace('{{casoParaFacturar}}', 'Detalles del caso');
        // Opciones para el archivo PDF
        console.log('el html es...',html)
        const pdfOptions = {
            width: 8, // Ancho de página en pulgadas
            marginLeft: 0.4,
            marginRight: 0.4,
            marginTop: 0.4,
            marginBottom: 0.4,
        };

        // Crear el PDF de la factura
        const pdfResponse = await afip.ElectronicBilling.createPDF({
            html: html,
            file_name: `Factura_${afipResponse.CbteDesde}`,
            options: pdfOptions,
        });

        // Mostrar la URL del archivo PDF creado
        console.log('URL del PDF generado:', pdfResponse.file);

    } catch (error) {
        console.error('Error al generar la factura o el PDF:', error);
    }
})();
}

module.exports = { generatePDF };