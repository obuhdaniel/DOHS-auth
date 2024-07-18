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

    // Map initialization using Leaflet.js
    const map = L.map('map').setView([9.0820, 8.6753], 6); // Centering map on Nigeria

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
    }).addTo(map);

    // Sample data for map markers
    const diseaseLocations = [
        { lat: 10.0, lon: 8.0, disease: 'Cholera', cases: 120 },
        { lat: 11.0, lon: 7.0, disease: 'Cerebrospinal Meningitis', cases: 150 },
        { lat: 6.5, lon: 3.5, disease: 'Diarrhoea with Blood', cases: 300 },
        { lat: 8.5, lon: 8.0, disease: 'Measles', cases: 50 },
        { lat: 7.0, lon: 4.0, disease: 'Yellow Fever', cases: 60 },
        { lat: 9.0, lon: 7.0, disease: 'Viral Hemorrhagic Fevers', cases: 80 },
        { lat: 6.0, lon: 5.0, disease: 'Highly Pathogenic Avian Influenza', cases: 30 }
    ];

    diseaseLocations.forEach(loc => {
        L.marker([loc.lat, loc.lon]).addTo(map)
            .bindPopup(`<b>${loc.disease}</b><br>Cases: ${loc.cases}`);
    });
});
