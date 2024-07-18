document.addEventListener("DOMContentLoaded", function() {
    // Sample data for Chart.js
    const diseaseData = {
        labels: ['Cholera', 'Cerebrospinal Meningitis', 'Diarrhoea with Blood', 'Measles', 'Yellow Fever', 'Viral Hemorrhagic Fevers', 'Highly Pathogenic Avian Influenza'],
        datasets: [{
            label: 'Cases',
            data: [120, 150, 300, 50, 60, 80, 30],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(199, 199, 199, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(199, 199, 199, 1)'
            ],
            borderWidth: 1
        }]
    };

    const config = {
        type: 'bar',
        data: diseaseData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    const diseaseChart = new Chart(
        document.getElementById('diseaseChart'),
        config
    );

    // Map initialization using Kartograph
    var map = kartograph.map('#map');
    map.loadMap('nigeria.svg', function() {
        map.addLayer('states', {
            styles: {
                fill: '#f4f4f4',
                stroke: '#000000',
                'stroke-width': 1
            },
            tooltips: function(d) {
                return d.name;
            }
        });

        // Sample data for map regions
        var diseaseSpread = {
            'Kano': { disease: 'Cholera', cases: 120 },
            'Lagos': { disease: 'Diarrhoea with Blood', cases: 300 },
            'Kaduna': { disease: 'Cerebrospinal Meningitis', cases: 150 },
            // Add more regions as necessary
        };

        for (var region in diseaseSpread) {
            var diseaseInfo = diseaseSpread[region];
            map.getLayer('states').style(region, {
                fill: diseaseColor(diseaseInfo.disease)
            });
            map.getLayer('states').tooltip(region, 'Disease: ' + diseaseInfo.disease + ', Cases: ' + diseaseInfo.cases);
        }
    });

    function diseaseColor(disease) {
        switch (disease) {
            case 'Cholera': return 'rgba(255, 99, 132, 0.5)';
            case 'Diarrhoea with Blood': return 'rgba(54, 162, 235, 0.5)';
            case 'Cerebrospinal Meningitis': return 'rgba(255, 206, 86, 0.5)';
            // Add more colors for other diseases
            default: return 'rgba(199, 199, 199, 0.5)';
        }
    }
});
