// écouteur d'événement sur le bouton 
document.getElementById('getWeatherButton').addEventListener('click', function() {
    // obtenir le pays que je le saisie
    var city = document.getElementById('cityInput').value;
    // clé API 
    var apiKey = '369751cf480320ca87ce89122478685d';
    // requette HTTP.fetch() pour obtenir les détaille de pays saisie
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(response => {
        // verification de la réponse HTTP
        if (!response.ok) {
            // message d'erreur en cas de pas de reponse (rejected)
            throw new Error('Erreur lors de la récupération des données météorologiques: ' + response.statusText);
        }
        // réponse en format JSON
        return response.json();
    })
    .then(data => {
        // affichage des informations l'élément HTML approprié
        const weatherInfoElement = document.getElementById('weatherInfo');
        weatherInfoElement.innerHTML = `
            <p>Localisation: ${data.name}, ${data.sys.country}</p>
            <p>Température: ${data.main.temp} °C</p>
            <p>Description: ${data.weather[0].description}</p>
        `;
    })
    .catch(error => {
        //  affichage de l'erreur dans la console et affichage d'un message d'erreur dans l'élément HTML 
        console.error(error);
        const weatherInfoElement = document.getElementById('weatherInfo');
        weatherInfoElement.innerHTML = `<p>Erreur : Échec de récupération des données météorologiques</p>`;
    });
});