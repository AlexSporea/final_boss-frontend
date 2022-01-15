// Obtenomos los datos con el método meteo() y se los pasamos showEventos()
function accessApi(laravelApiMethod, option) {
    fetch(`http://localhost/api/${laravelApiMethod}`)
    .then(response => response.json())
    .then(data => {
        if (option == 1) showEventos(data)
        else if (option == 2) showAdminEventos(data)
        else showMeteo(data)
    })
    .catch(error => console.log(error));

}

function showEventos(dataJson) {

    const ctx = document.getElementById('chart-eventos').getContext('2d');
    Chart.defaults.color = '#FFFFFF';
    
    // Creamos el gráfico
    const myChart = new Chart(ctx, {
        type:'bar',
        data:{
            labels:dataJson[0],
            datasets:[{
                label:'Tipo de evento',
                data:dataJson[1],
                backgroundColor:[
                    'rgb(217, 237, 146)',
                    'rgb(181, 228, 140)',
                    'rgb(153, 217, 140)',
                    'rgb(118, 200, 147)',
                    'rgb(82, 182, 154)',
                    'rgb(52, 160, 164)',
                    'rgb(22, 138, 173)',
                    'rgb(26, 117, 159)',
                    'rbg(30, 96, 145)'
                ],
                borderWidth:1,
                borderColor:'#777',
                hoverBorderWidth:3,
                hoverBorderColor:'#000'
            }]
        },
        options:{
            title:{
                display:true,
                text:'Logística - Eventos',
                fontSize:25
            },
            legend:{
                position:'left',
            },
            scales:{
                yAxis:{
                    beginAtZero: true,
                    max: dataJson[2] + 1
                    
                }
            }
        }
    });

}

function showAdminEventos(dataJson) {
    
    const ctx = document.getElementById('chart-adminEventos').getContext('2d');
    Chart.defaults.color = '#FFFFFF';

    // Creamos el gráfico
    const myChart = new Chart(ctx, {
        type:'pie',
        data:{
            labels:dataJson[0],
            datasets:[{
                data:dataJson[1],
                backgroundColor:[
                    'rgb(255, 173, 173)',
                    'rgb(255, 214, 165)',
                    'rgb(253, 255, 182)',
                    'rgb(202, 255, 191)',
                    'rgb(155, 246, 255)',
                    'rgb(160, 196, 255)',
                    'rgb(189, 178, 255)',
                    'rgb(255, 198, 255)',
                    'rgb(255, 255, 252)',
                    'rgb(212, 163, 115)',
                    'rgb(233, 196, 106)'
                ],
                borderWidth:1,
                borderColor:'#777',
                hoverBorderWidth:3,
                hoverBorderColor:'#000'
            }]
        },
        options:{
            maintainAspectRatio: false
        }
    });
}

function showMeteo(dataJson) {
    // Le damos altura al mapa
    $('#mapEs').height('500px');

    // Creamos el mapa usando la libreria Leaflet.js
    const mymap = L.map('mapEs').setView([43.14373, -2.194255], 10);

    // Mención al distribuidor de los mosaicos del mapa
    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    // Formato con el que obtendremos los mosaicos
    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tiles = L.tileLayer(tileUrl, {attribution});
    tiles.addTo(mymap);

    // Añadimos los popups
    dataJson.forEach(element => {
        let marker = L.marker([element.lat, element.lon]).addTo(mymap);
        marker.bindPopup(
            popoutContent(
                element.nameEs, element.weather,
                element.description, element.temp,
                element.feels_like, element.humidity
            )
        ).openPopup();
        
    });
    
}

function popoutContent(name, weather, desc, temp, feels, humidity) {
    let content;
    let date = new Date();
    let infoFecha = {
        mes: date.toLocaleString("default", {month: "short"}),
        dia: date.getDate(),
        hora: date.toLocaleString("es", {
            hour: "2-digit",
            minute: "2-digit",
        })
    };
    content = 
        '<div>' +
        `<p style = "color:red">${infoFecha.dia} ${infoFecha.mes}, ${infoFecha.hora}</p>` +
        `<h3 style = "color:black">${name}<h3>` +
        `<b style = "color:black">${temp}ºC</b>` +
        `<p style = "color:black">Se sienten como ${feels}ºC</p>` +
        `<p style = "color:black">${weather}, ${desc}</p>` +
        `<p style = "color:black">Humedad: ${humidity}%</p>`
        '</div>';

    return content;
}