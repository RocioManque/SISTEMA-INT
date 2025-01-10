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
const range = 'sheet1!A:BF'
const range1 = 'Respuestas de formulario 1!A:Y'



const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${API_KEY}`;
const url1 = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range1}?key=${API_KEY}`;

const nombresMeses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
async function recuperarCantidadDeCasos() {
    const response2 = await fetch(url1);
    const data2 = await response2.json();
    const rta = data2.values;
    const headers = rta[0];
    const respuestaFormulario = rta.slice(1).map(row => {
        const obj = {};
        headers.forEach((header, index) => {
          obj[header] = row[index];
        });
        return obj;
      });

    return respuestaFormulario
}
// Fetch y procesamiento inicial
fetch(url)
  .then(response => response.json())
  .then(data => {
    const rows = data.values;

    // Obtener las cabeceras de la primera fila
    const headers = rows[0];
    
    // Convertir las filas en objetos estructurados
    const registros = rows.slice(1).map(row => {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index];
      });
      return obj;
    });

    // Guardamos registros procesados para cálculos posteriores
    inicializarGraficos(registros);
  })
  .catch(error => console.error("Error al procesar los datos:", error));


  const calcularIngresadosPorMes = async () => {
    const resultadosDeIngresos = await recuperarCantidadDeCasos();
    const resultados = {};

    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth();
    const anioActual = fechaActual.getFullYear();

    const mesesUltimos12 = [];
    for (let i = 0; i < 12; i++) {
        const mes = new Date(anioActual, mesActual - i, 1);
        mesesUltimos12.push(mes.toISOString().slice(0, 7));
    }

    resultadosDeIngresos.forEach(ingreso => {
        const fechaIngreso = ingreso['Fecha de ingreso'];
        const mesIngreso = fechaIngreso ? new Date(fechaIngreso).toISOString().slice(0, 7) : null;

        if (mesIngreso && mesesUltimos12.includes(mesIngreso)) {
            if (!resultados[mesIngreso]) {
                resultados[mesIngreso] = { ingresados: 0 };
            }
            resultados[mesIngreso].ingresados++;
        }
    });

    return resultados;
};

const calcularIniciadosPorMes = (registros) => {
    const resultados = {};

    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth();
    const anioActual = fechaActual.getFullYear();

    const mesesUltimos12 = [];
    for (let i = 0; i < 12; i++) {
        const mes = new Date(anioActual, mesActual - i, 1);
        mesesUltimos12.push(mes.toISOString().slice(0, 7));
    }

    registros.forEach(registro => {
        const fechaInicio = registro["fecha ingreso a cia"];
        const mesInicio = fechaInicio ? new Date(fechaInicio).toISOString().slice(0, 7) : null;

        if (mesInicio && mesesUltimos12.includes(mesInicio)) {
            if (!resultados[mesInicio]) {
                resultados[mesInicio] = { iniciados: 0 };
            }
            resultados[mesInicio].iniciados++;
        }
    });

    return resultados;
};

const calcularTotalesPorMes = async (registros) => {
    const ingresados = await calcularIngresadosPorMes();
    const iniciados = calcularIniciadosPorMes(registros);

    const resultados = {};
    const nombresMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    Object.keys(ingresados).forEach(mes => {
        resultados[nombresMeses[parseInt(mes.slice(5, 7)) - 1]] = {
            ingresados: ingresados[mes]?.ingresados || 0,
            iniciados: iniciados[mes]?.iniciados || 0
        };
    });

    Object.keys(iniciados).forEach(mes => {
        const mesNombre = nombresMeses[parseInt(mes.slice(5, 7)) - 1];
        if (!resultados[mesNombre]) {
            resultados[mesNombre] = { ingresados: 0, iniciados: 0 };
        }
        resultados[mesNombre].iniciados = iniciados[mes].iniciados;
    });

    console.log('estos son los resultados',resultados);
    return resultados;
};


  
  
  const calcularTotalesPorEjecutivoYMes = (registros) => {
    const resultados = {};

    registros.forEach(registro => {
        const mesIngreso = new Date(registro["Fecha de ingreso"]).toISOString().slice(0, 7); // Año-Mes
        const mesInicio = registro["fecha ingreso a cia"]
            ? new Date(registro["fecha ingreso a cia"]).toISOString().slice(0, 7)
            : null;

        const claveEjecutivo = registro["ejecutivo"];

        if (!resultados[mesIngreso]) {
            resultados[mesIngreso] = {};
        }

        if (!resultados[mesIngreso][claveEjecutivo]) {
            resultados[mesIngreso][claveEjecutivo] = { ingresados: 0, iniciados: 0 };
        }

        // Incrementar casos ingresados
        resultados[mesIngreso][claveEjecutivo].ingresados++;

        // Incrementar casos iniciados si existe fecha de inicio
        if (mesInicio) {
            resultados[mesIngreso][claveEjecutivo].iniciados++;
        }
    });
console.log(resultados);
    return resultados;
};



const calcularPorTipoYEstado = (registros) => {
    const resultados = {};
console.log(registros)
    registros.forEach(registro => {
        const tipoReclamo = registro["tipo de reclamo"] || "Desconocido";
        const estado = registro["Estado "] || "Sin estado";
console.log(estado)
        if (!resultados[tipoReclamo]) {
            resultados[tipoReclamo] = {};
        }

        if (!resultados[tipoReclamo][estado]) {
            resultados[tipoReclamo][estado] = 0;
        }

        resultados[tipoReclamo][estado]++;
    });
console.log(resultados)
    return resultados;
};

const calcularPorCompania = (registros) => {
    const resultados = {};

    registros.forEach(registro => {
        const compania = registro["cia a reclamar"] || "Sin compañía";

        if (!resultados[compania]) {
            resultados[compania] = 0;
        }

        resultados[compania]++;
    });

    return resultados;
};
const parseCurrency = (value) => {
    if (typeof value !== 'string') return 0;
    return parseFloat(value.replace(/\./g, '').replace(',', '.')) || 0;
};

const calcularTotalesFacturadosPorMes = (registros) => {
    const resultados = {};

    registros.forEach(registro => {
        const fechaIngreso = registro["fecha de facturacion"];
        const mes = fechaIngreso && !isNaN(new Date(fechaIngreso))
            ? new Date(fechaIngreso).toISOString().slice(0, 7)
            : null;

        if (!mes) return;

        const montoSinIVA = parseCurrency(registro["TOTAL FACTURADO SIN IVA"]);

        if (!resultados[mes]) {
            resultados[mes] = { cantidad: 0, facturado: 0 };
        }

        resultados[mes].cantidad++;
        resultados[mes].facturado += montoSinIVA;
    });

    return resultados;
};

const calcularTotalesFacturadosPorMesPorEjecutivo = (registros) => {
    const resultados = {};

    registros.forEach(registro => {
        const fechaIngreso = registro["fecha de facturacion"];
        const mes = fechaIngreso && !isNaN(new Date(fechaIngreso))
            ? new Date(fechaIngreso).toISOString().slice(0, 7)
            : null;

        if (!mes) return;

        const ejecutivo = registro["ejecutivo"] || "Sin ejecutivo";
        const montoSinIVA = parseCurrency(registro["TOTAL FACTURADO SIN IVA"]);

        if (!resultados[mes]) resultados[mes] = {};
        if (!resultados[mes][ejecutivo]) resultados[mes][ejecutivo] = { cantidad: 0, facturado: 0 };

        resultados[mes][ejecutivo].cantidad++;
        resultados[mes][ejecutivo].facturado += montoSinIVA;
    });

    return resultados;
};

const calcularTotalesCobradosPorMes = (registros) => {
    const resultados = {};

    registros.forEach(registro => {
        const fechaCobro = registro["fecha de pago"];
        const mes = fechaCobro && !isNaN(new Date(fechaCobro))
            ? new Date(fechaCobro).toISOString().slice(0, 7)
            : null;

        if (!mes) return;

        const montoCobrado = parseCurrency(registro["Total facturado con iva"]);

        if (!resultados[mes]) {
            resultados[mes] = { cantidad: 0, cobrado: 0 };
        }

        resultados[mes].cantidad++;
        resultados[mes].cobrado += montoCobrado;
    });

    return resultados;
};

const calcularComisionesPorMesYProductor = (registros) => {
    const resultados = {};

    registros.forEach(registro => {
        const fechaFacturacion = registro["fecha de facturacion"];
        const mes = fechaFacturacion && !isNaN(new Date(fechaFacturacion))
            ? new Date(fechaFacturacion).toISOString().slice(0, 7)
            : null;

        if (!mes) return;

        const productor = registro["Pas"] || "Sin productor";
        const comision = parseCurrency(registro["comision pas"]);

        if (!resultados[mes]) resultados[mes] = {};
        if (!resultados[mes][productor]) resultados[mes][productor] = 0;

        resultados[mes][productor] += comision;
    });

    return resultados;
};

const calcularTotalPercibidoPorMes = (registros) => {
    const resultados = {};

    registros.forEach(registro => {
        const fechaFacturacion = registro["fecha de pago"];
        const mes = fechaFacturacion && !isNaN(new Date(fechaFacturacion))
            ? new Date(fechaFacturacion).toISOString().slice(0, 7)
            : null;

        if (!mes) return;

        const percibido = parseCurrency(registro["total percibido(al final de deducciones)"]);

        if (!resultados[mes]) resultados[mes] = 0;

        resultados[mes] += percibido;
    });

    return resultados;
};

const calcularTotalPercibidoPorCia = (registros) => {
    const resultados = {};

    registros.forEach((registro) => {
        const fechaCobro = registro["fecha de pago"];
        const cia = registro["cia a reclamar"] || "Desconocida";
        const totalPercibido = parseCurrency(registro["total percibido(al final de deducciones)"]);

        if (!fechaCobro || isNaN(totalPercibido)) return;

        const mesCobro = new Date(fechaCobro).toISOString().slice(0, 7);

        if (!resultados[mesCobro]) resultados[mesCobro] = {};
        if (!resultados[mesCobro][cia]) resultados[mesCobro][cia] = 0;

        resultados[mesCobro][cia] += totalPercibido;
    });

    return resultados;
};

const calcularPlazoPromedioDePago = (registros) => {
    const resultados = {};

    registros.forEach((registro) => {
        const fechaInicio = registro["fecha de inicio"];
        const fechaPago = registro["fecha de pago"];

        if (!fechaInicio || !fechaPago) return;

        const fechaInicioObj = new Date(fechaInicio);
        const fechaPagoObj = new Date(fechaPago);

        if (isNaN(fechaInicioObj) || isNaN(fechaPagoObj)) return;

        const diferenciaDias = Math.ceil(
            (fechaPagoObj - fechaInicioObj) / (1000 * 60 * 60 * 24)
        ); // Diferencia en días

        if (diferenciaDias < 0) return; // Ignorar casos donde la fecha de inicio sea posterior a la de cobro

        // Formatear la fecha al formato YYYY-MM
        const mesPago = fechaPagoObj.toISOString().slice(0, 7);

        if (!resultados[mesPago]) {
            resultados[mesPago] = [];
        }

        resultados[mesPago].push(diferenciaDias);
    });

    // Calcular promedio por mes
    const promedios = {};
    for (const mes in resultados) {
        const totalDias = resultados[mes].reduce((acc, dias) => acc + dias, 0);
        promedios[mes] = totalDias / resultados[mes].length;
    }

    return promedios;
};
const calcularPlazoPromedioPorCia = (registros) => {
    const resultados = {};

    registros.forEach((registro) => {
        const fechaInicio = registro["fecha de inicio"];
        const fechaPago = registro["fecha de pago"];
        const compania = registro["cia a reclamar"];

        if (!fechaInicio || !fechaPago || !compania) return;

        const fechaInicioObj = new Date(fechaInicio);
        const fechaPagoObj = new Date(fechaPago);

        if (isNaN(fechaInicioObj) || isNaN(fechaPagoObj)) return;

        const diferenciaDias = Math.ceil(
            (fechaPagoObj - fechaInicioObj) / (1000 * 60 * 60 * 24)
        ); // Diferencia en días

        if (diferenciaDias < 0) return; // Ignorar casos donde la fecha de inicio sea posterior a la de cobro

        if (!resultados[compania]) {
            resultados[compania] = [];
        }

        resultados[compania].push(diferenciaDias);
    });

    // Calcular promedio por compañía
    const promedios = {};
    for (const cia in resultados) {
        const totalDias = resultados[cia].reduce((acc, dias) => acc + dias, 0);
        promedios[cia] = totalDias / resultados[cia].length;
    }

    return promedios;
};
const prepararDatosGraficoPlazoPorCia = (promedios) => {
    const companias = Object.keys(promedios);
    const datos = Object.values(promedios).map((promedio) => Math.round(promedio));

    return {
        xaxis: companias,
        series: [{
            name: "Plazo Promedio de Pago (días)",
            data: datos,
        }],
    };
};

const prepareDataForAreaCharts = (totales, tipo) => {
    const today = new Date();
    const mesesCompletos = Array.from({ length: 12 }, (_, i) => {
        const fecha = new Date(today.getFullYear(), today.getMonth() - 11 + i, 1);
        return fecha.toISOString().slice(0, 7); // Formato "YYYY-MM"
    }).sort();

    const seriesData = {};

    mesesCompletos.forEach(mes => {
        const ejecutivosMes = totales[mes] || {};

        for (const ejecutivo in ejecutivosMes) {
            if (!seriesData[ejecutivo]) {
                seriesData[ejecutivo] = Array(12).fill(0);
            }

            const mesIndex = mesesCompletos.indexOf(mes);
            seriesData[ejecutivo][mesIndex] = ejecutivosMes[ejecutivo][tipo];
        }
    });

    const series = Object.keys(seriesData).map(ejecutivo => ({
        name: ejecutivo,
        data: seriesData[ejecutivo],
    }));

    return {
        xaxis: mesesCompletos.map(mes =>
            new Date(`${mes}-12`).toLocaleString('es-ES', { month: 'long' })
        ),
        series,
    };
};

const prepararDatosGraficoPlazoPromedio = (promedios) => {
    const meses = Object.keys(promedios)
        .sort()
        .map((mes) => {
            const [año, mesNum] = mes.split("-");
            const fecha = new Date(año, mesNum - 1, 1);
            return fecha.toLocaleString("es-ES", { month: "long", year: "numeric" });
        });

    const datos = Object.values(promedios).map((promedio) => Math.round(promedio));

    return {
        xaxis: meses,
        series: [{
            name: "Plazo Promedio de Pago (días)",
            data: datos,
        }],
    };
};

const prepararDatosGraficoCiaPorMes = (totales) => {
    const meses = Object.keys(totales).sort();
    const companias = [...new Set(Object.values(totales).flatMap(Object.keys))];
    const series = companias.map((cia) => ({
        name: cia,
        data: meses.map((mes) => totales[mes][cia] || 0),
    }));

    return {
        xaxis: meses.map(mes => {
            const [año, mesNum] = mes.split("-");
            return new Date(año, mesNum - 1, 1).toLocaleString("es-ES", { month: "long", year: "numeric" });
        }),
        series,
    };
};

const prepararDatosParaGraficoPercibido = (totales) => {
    const meses = Object.keys(totales).sort();
    const seriesData = Object.values(totales);

    return {
        xaxis: meses.map(mes => {
            const [año, mesNum] = mes.split("-");
            return new Date(año, mesNum - 1, 1).toLocaleString("es-ES", { month: "long", year: "numeric" });
        }),
        series: [{
            name: 'Total Percibido',
            data: seriesData,
        }],
    };
};

const prepararDatosParaGraficoComisiones = (totales) => {
    const meses = Object.keys(totales).sort();
    const productores = new Set();

    meses.forEach(mes => {
        Object.keys(totales[mes]).forEach(productor => productores.add(productor));
    });

    const series = Array.from(productores).map(productor => ({
        name: productor,
        data: meses.map(mes => totales[mes][productor] || 0),
    }));

    return {
        xaxis: meses,
        series,
    };
};

const prepararDatosParaGraficoCobrado = (totales) => {
    const meses = Object.keys(totales).sort();
    const cantidad = [];
    const cobrado = [];

    meses.forEach(mes => {
        cantidad.push(totales[mes].cantidad);
        cobrado.push(totales[mes].cobrado);
    });

    return {
        xaxis: meses,
        series: [
            { name: 'Cantidad de casos', type: 'column', data: cantidad },
            { name: 'Monto cobrado ($)', type: 'line', data: cobrado },
        ],
    };
};


const prepararDatosParaGraficoFacturacionPorEjecutivo = (totales) => {
    const seriesCantidad = [];
    const seriesFacturado = [];
    const meses = Object.keys(totales).sort();
    const ejecutivos = new Set();

    meses.forEach(mes => {
        for (const ejecutivo in totales[mes]) {
            ejecutivos.add(ejecutivo);
        }
    });

    ejecutivos.forEach(ejecutivo => {
        const datosCantidad = [];
        const datosFacturado = [];

        meses.forEach(mes => {
            const valores = totales[mes][ejecutivo] || { cantidad: 0, facturado: 0 };
            datosCantidad.push(valores.cantidad);
            datosFacturado.push(valores.facturado);
        });

        seriesCantidad.push({ name: `Cantidad - ${ejecutivo}`, data: datosCantidad });
        seriesFacturado.push({ name: `Facturado - ${ejecutivo}`, data: datosFacturado });
    });

    return {
        xaxis: meses,
        seriesCantidad,
        seriesFacturado,
    };
};

const prepararDatosParaGraficoFacturados = (totales) => {
    const meses = Object.keys(totales).sort();
    const cantidades = meses.map(mes => totales[mes].cantidad);
    const montos = meses.map(mes => totales[mes].facturado);

    return {
        xaxis: meses.map(mes => new Date(`${mes}-12`).toLocaleString('es-ES', { month: 'long' })),
        series: [
            { name: 'Cantidad de casos', data: cantidades },
            { name: 'Total facturado ($)', data: montos }
        ]
    };
};
const prepararDatosBarrasApiladas = (datos) => {
    const series = [];
    const categorias = Object.keys(datos);
    const estados = new Set();

    categorias.forEach(categoria => {
        Object.keys(datos[categoria]).forEach(estado => estados.add(estado));
    });

    estados.forEach(estado => {
        series.push({
            name: estado,
            data: categorias.map(categoria => datos[categoria][estado] || 0)
        });
    });

    return { series, categorias };
};

const prepararDatosDonut = (datos) => {
    return {
        labels: Object.keys(datos),
        series: Object.values(datos)
    };
};

// Renderizar gráficos con los meses en orden legiblePack
const inicializarGraficos = async (registros) => {
    const totalesPorMes = await calcularTotalesPorMes(registros);
    console.log('desde inicializar grafico',totalesPorMes)
    const totales = calcularTotalesPorEjecutivoYMes(registros);
    const chartDataIngresados = prepareDataForAreaCharts(totales, 'ingresados');
    const chartDataIniciados = prepareDataForAreaCharts(totales, 'iniciados');

    const datosTipoEstado = calcularPorTipoYEstado(registros);
    const datosCompania = calcularPorCompania(registros);

    // Preparación de datos
    const barrasApiladasData = prepararDatosBarrasApiladas(datosTipoEstado);
    const donutData = prepararDatosDonut(datosCompania);

    const totalesfacturacion = calcularTotalesFacturadosPorMes(registros);
    const chartData = prepararDatosParaGraficoFacturados(totalesfacturacion);

    const resultadosPorEjecutivo = calcularTotalesFacturadosPorMesPorEjecutivo(registros);
    const chartDataPorEjecutivo = prepararDatosParaGraficoFacturacionPorEjecutivo(resultadosPorEjecutivo);

    const resultadosCobrados = calcularTotalesCobradosPorMes(registros);
    const resultadosMontoCobrados = prepararDatosParaGraficoCobrado(resultadosCobrados);

    const resultadosComision = calcularComisionesPorMesYProductor(registros);
    const resultadosComisionCobrado = prepararDatosParaGraficoComisiones(resultadosComision)

    const resultadosPercibido = calcularTotalPercibidoPorMes(registros);
    const resultadosPercibidoTotal = prepararDatosParaGraficoPercibido(resultadosPercibido)

    const resultadosPercibidoCia = calcularTotalPercibidoPorCia(registros);
    const resultadosmontoPorCia = prepararDatosGraficoCiaPorMes(resultadosPercibidoCia);

    const resultadoPromedio = calcularPlazoPromedioDePago(registros);
    const resultadoPromedioDias = prepararDatosGraficoPlazoPromedio (resultadoPromedio);

    const resultadoPromedioPorCia = calcularPlazoPromedioPorCia(registros);
    const resultadoPromedioCias = prepararDatosGraficoPlazoPorCia(resultadoPromedioPorCia)
    const opcionesTotalesMes = {
      chart: {
        type: 'bar',
      },
      series: [
        {
          name: "Ingresados a INT",
          data: Object.values(totalesPorMes).map(d => d.ingresados),
        },
        {
          name: "Iniciados a CIAS",
          data: Object.values(totalesPorMes).map(d => d.iniciados),
        }
      ],
      xaxis: {
        categories: Object.keys(totalesPorMes), // Meses legibles
      },
      title: {
        text: " Casos Ingresados a INT +  Iniciados a Cias.",
      },
    };
    const optionsIngresados = {
        chart: {
            type: 'area',
            stacked: true,
        },
        series: chartDataIngresados.series,
        xaxis: {
            categories: chartDataIngresados.xaxis,
        },
        yaxis: {
            title: {
                text: 'Cantidad de casos',
            },
        },
        title: {
            text: 'Casos Asignados al Ejecutivo al mes',
        },
        legend: {
            position: 'top',
        },
    };  
    const optionsIniciados = {
        chart: {
            type: 'area',
            stacked: true,
        },
        series: chartDataIniciados.series,
        xaxis: {
            categories: chartDataIniciados.xaxis,
        },
        yaxis: {
            title: {
                text: 'Cantidad de casos',
            },
        },
        title: {
            text: 'Casos Ingresados a Cias por Ejecutivo por mes',
        },
        legend: {
            position: 'top',
        },
    };
    const opcionesBarrasApiladas = {
        chart: {
            type: 'bar',
            stacked: true
        },
        series: barrasApiladasData.series,
        xaxis: {
            categories: barrasApiladasData.categorias
        },
        title: {
            text: 'Casos por Tipo de Reclamo y Estado'
        },
        yaxis: {
            title: {
                text: 'Cantidad de Casos'
            }
        },
        legend: {
            position: 'top'
        },
        tooltip: {
            shared: true,
            intersect: false
        }
    };
    const optionsFacturacion = {
        chart: {
            type: 'bar',
        },
        series: chartData.series,
        xaxis: {
            categories: chartData.xaxis,
        },
        yaxis: [
            {
                title: {
                    text: 'Cantidad de casos',
                },
            },
            {
                opposite: true,
                title: {
                    text: 'Monto facturado ($)',
                },
            },
        ],
        title: {
            text: 'Total de Casos Facturados y Monto por Mes',
        },
        legend: {
            position: 'top',
        },
    };
    const opcionesCantidadPorEjecutivo = {
        chart: {
            type: 'bar',
            stacked: true,
        },
        series: chartDataPorEjecutivo.seriesCantidad,
        xaxis: {
            categories: chartDataPorEjecutivo.xaxis,
        },
        yaxis: {
            title: {
                text: 'Cantidad de casos',
            },
        },
        title: {
            text: 'Cantidad de casos facturados por mes por ejecutivo',
        },
        legend: {
            position: 'top',
        },
    };
    const opcionesFacturadoPorEjecutivo = {
        chart: {
            type: 'bar',
            stacked: true,
        },
        series: chartDataPorEjecutivo.seriesFacturado,
        xaxis: {
            categories: chartDataPorEjecutivo.xaxis,
        },
        yaxis: {
            title: {
                text: 'Monto facturado ($)',
            },
        },
        title: {
            text: 'Monto facturado por mes por ejecutivo',
        },
        legend: {
            position: 'top',
        },
    };
    const opcionesCobradoPorMes = {
        chart: {
            type: 'line',
        },
        series: resultadosMontoCobrados.series,
        xaxis: {
            categories: resultadosMontoCobrados.xaxis,
        },
        yaxis: [
            {
                title: {
                    text: 'Cantidad de casos',
                },
            },
            {
                opposite: true,
                title: {
                    text: 'Monto cobrado ($)',
                },
            },
        ],
        title: {
            text: 'Casos cobrados por mes',
        },
        legend: {
            position: 'top',
        },
    };
    const opcionesComisionesPorMes = {
        chart: {
            type: 'bar',
            stacked: true,
        },
        series: resultadosComisionCobrado.series,
        xaxis: {
            categories: resultadosComisionCobrado.xaxis,
        },
        yaxis: {
            title: {
                text: 'Monto de comisiones ($)',
            },
        },
        title: {
            text: 'Comisiones PAS por mes y productor',
        },
        legend: {
            position: 'top',
        },
        tooltip: {
            shared: true,
            intersect: false,
        },
    };
    const opcionesTotalPercibidoPorMes = {
        chart: {
            type: 'bar',
        },
        series: resultadosPercibidoTotal.series,
        xaxis: {
            categories: resultadosPercibidoTotal.xaxis, // Los nombres de los meses en español
        },
        yaxis: {
            title: {
                text: 'Total Percibido ($)',
            },
        },
        title: {
            text: 'Total Percibido Por Mes',
        },
        tooltip: {
            shared: true,
            intersect: false,
        },
        legend: {
            position: 'top',
        },
    };
    const opcionesTotalPercibidoPorCia = {
        chart: {
            type: 'bar',
            stacked: true,
        },
        series: resultadosmontoPorCia.series,
        xaxis: {
            categories: resultadosmontoPorCia.xaxis, // Nombres de los meses
        },
        yaxis: {
            title: {
                text: 'Total Percibido ($)',
            },
        },
        title: {
            text: 'Total Percibido Por Mes Por Cia',
        },
        legend: {
            position: 'top',
        },
        tooltip: {
            shared: true,
            intersect: false,
        },
    };
    const opcionesPlazoPromedioDePago = {
        chart: {
            type: 'area',
            zoom: {
                enabled: false,
            },
        },
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: 'smooth',
        },
        series: resultadoPromedioDias.series,
        xaxis: {
            categories: resultadoPromedioDias.xaxis,
            title: {
                text: 'Meses',
            },
        },
        yaxis: {
            title: {
                text: 'Promedio de Días',
            },
        },
        markers: {
            size: 5,
            hover: {
                size: 7,
            },
        },
        title: {
            text: 'Plazo Promedio de Pago Total',
        },
        tooltip: {
            shared: true,
            intersect: false,
        },
    };
    const opcionesPlazoPromedioPorCia = {
        chart: {
            type: 'bar',
            height: 400,
            toolbar: {
                show: false,
            },
        },
        dataLabels: {
            enabled: true,
            formatter: (val) => `${val} días`,
        },
        series: resultadoPromedioCias.series,
        xaxis: {
            categories: resultadoPromedioCias.xaxis,
            title: {
                text: 'Compañías',
            },
        },
        yaxis: {
            title: {
                text: 'Promedio de Días',
            },
        },
        title: {
            text: 'Plazo Promedio de Pago por Compañía',
        },
        tooltip: {
            shared: false,
            y: {
                formatter: (val) => `${val} días`,
            },
        },
    };
    // Opciones para el gráfico de donut
    const opcionesDonut = {
        chart: {
            type: 'bar',
            height: 400,
        },
        series: [{
            name: 'Casos',
            data: donutData.series // Mantén los mismos datos de la serie
        }],
        xaxis: {
            categories: donutData.labels, // Las etiquetas están aquí, pero no aparecerán en el gráfico
            labels: {
                show: false  // Esto oculta las etiquetas en el eje X
            }
        },
        title: {
            text: 'Casos por Compañía a Reclamar'
        },
        dataLabels: {
            enabled: true // Esto oculta las etiquetas de los valores dentro de las barras
        },
        plotOptions: {
            bar: {
                horizontal: true,
                distributed: true
            }
        },
        legend: {
            show: false // Esto desactiva la leyenda (el "Casos")
        }
    };
    const chartTotalesMes = new ApexCharts(document.querySelector("#graficoTotalesMes"), opcionesTotalesMes);
    const chartIngresados = new ApexCharts(document.querySelector("#graficoTotalesEjecutivosIngresados"), optionsIngresados);
    const chartIniciados = new ApexCharts(document.querySelector("#graficoTotalesEjecutivosIniciados"), optionsIniciados);
    const chartBarras = new ApexCharts(document.querySelector("#graficoGestion"), opcionesBarrasApiladas);
    const chartDonut = new ApexCharts(document.querySelector("#graficoPorCia"), opcionesDonut);
    const chartFacturacion = new ApexCharts(document.querySelector("#grafico-facturados"), optionsFacturacion);
    const chartFacturacionCantidad = new ApexCharts(document.querySelector("#graficoFacturadoEjecutivo"), opcionesCantidadPorEjecutivo);
    const chartFacturacionMontos = new ApexCharts(document.querySelector("#graficoFacturadosMontoEjecutivo"), opcionesFacturadoPorEjecutivo );
    const chartCobrados = new ApexCharts(document.querySelector("#graficoCobrados"), opcionesCobradoPorMes);
    const chartComision= new ApexCharts(document.querySelector("#graficoComision"), opcionesComisionesPorMes);
    const chartPercibido= new ApexCharts(document.querySelector("#graficoPercibido"), opcionesTotalPercibidoPorMes);
    const chartPercibidoCia= new ApexCharts(document.querySelector("#graficoPercibidoCia"), opcionesTotalPercibidoPorCia);
    const chartPromedio= new ApexCharts(document.querySelector("#graficoPromedio"), opcionesPlazoPromedioDePago);
    const chartPromedioCias= new ApexCharts(document.querySelector("#graficoPromedioCias"), opcionesPlazoPromedioPorCia);
    chartPromedioCias.render();
    chartPromedio.render();
    chartPercibidoCia.render();
    chartPercibido.render()
    chartComision.render();
    chartCobrados.render();
    chartFacturacionCantidad.render();
    chartFacturacionMontos.render();
    chartFacturacion.render();
    chartIngresados.render();
    chartBarras .render();
    chartDonut.render();
    chartIniciados.render();
    chartTotalesMes.render();
  };