const day = { weekday: 'long' };
const month = { month: 'long' };
const apiKey = '3e731ff8e6c54f3db7e220108240401';
let changeCountry  = document.getElementById('changeCountry')

showWeather()

changeCountry.addEventListener('keyup',()=>{
    showWeather(changeCountry.value)
})

function showWeather(country){
    fetchWeather('current', apiKey, 'currentWeather',country);

    fetchWeather('forecast', apiKey, 'tomorrowWeather',country, 1);
    
    fetchWeather('forecast', apiKey, 'dayAfterTomorrowWeather',country, 2);
}



function fetchWeather(type, apiKey, elementId, country = 'cairo', daysOffset = 0) {
   
    let url = `https://api.weatherapi.com/v1/${type}.json?key=${apiKey}&q=${country}&days=3`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (type === 'current') {
                displayCurrentWeather(data, elementId);
            } else if (type === 'forecast') {
                displayForecastWeather(data, elementId, daysOffset);
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function displayCurrentWeather(data, elementId) {
    const country = data.location.name;
    const weatherData = data.current;
    const element = document.getElementById(elementId);
    const date = new Date(data.location.localtime)
    element.innerHTML = `
            <div class="section-header justify-content-between d-flex p-3">
                <span>${date.toLocaleString('en-US', day)}</span><span>${date.getDay()} ${date.toLocaleString('en-US', month)}</span>
            </div>
            <div class="p-3">
                <div id="city">${country}</div>
                <div class="d-flex justify-content-between align-items-center">
                    <span class="display-1 fw-bold">${weatherData.temp_c}°C</span>
                    <img src="${weatherData.condition.icon}" alt=""     class="w-25 pt-2">
            </div>
            <p class='pt-3'>${weatherData.condition.text}</p>
                
`;
}

function displayForecastWeather(data, elementId, daysOffset) {
    const weatherData = data.forecast.forecastday[daysOffset].day;
    const element = document.getElementById(elementId);

    const date = new Date(data.forecast.forecastday[daysOffset].date);

    element.innerHTML = `
    <div class="p-3 section-header">${date.toLocaleString('en-US', day)}</div>
    <div class="p-3">
        <img src="${weatherData.condition.icon}" alt="" id="weatherImg">
        <p class="fs-1">${weatherData.maxtemp_c}°C</p>
        <p class="fs-5">${weatherData.mintemp_c}°C</p>
        <p>Partly Cloudy</p>
    </div>
    `;
    
}