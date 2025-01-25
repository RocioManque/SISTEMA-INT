import Afip from '@afipsdk/afip.js';

// Crear instancia usando CUIT de prueba
const afip = new Afip({ CUIT: 20409378472 });

(async () => {
    try {
        const serverStatus = await afip.ElectronicBilling.getServerStatus();
        console.log('Estado del servidor:', serverStatus);
    } catch (error) {
        console.error('Error al conectar con AFIP:', error);
    }
})();
