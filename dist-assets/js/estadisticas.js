document.addEventListener("DOMContentLoaded", function() {
    // Datos de ejemplo
    const data = {
        categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'], // Categorías (meses, días, etc.)
        values: [20, 30, 45, 50, 40, 60, 75] // Valores de la gráfica (por ejemplo, ingresos, ventas, etc.)
    };

    // Configuración dinámica del gráfico
    var options = {
        chart: {
            height: 350,
            type: 'area', // Tipo de gráfico, puede ser 'line', 'bar', 'pie', etc.
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        series: [{
            name: 'Casos por Ejecutivo',
            data: data.values
        }],
        xaxis: {
            categories: data.categories
        },
        title: {
            text: 'Gráfico dinámico por mes',
            align: 'center'
        },
        tooltip: {
            shared: true,
            intersect: false
        }
    };

    // Renderiza el gráfico
    var chart = new ApexCharts(document.querySelector("#basicArea-chart4"), options);
    chart.render();
});