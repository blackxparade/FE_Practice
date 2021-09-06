let locationID;
let weatherObj;
let currentWeather = {
    weatherStateAbbr: '',
    weatherState: '',
    minTemp: 0,
    maxTemp: 0,
    currentTemp: 0
};



async function getLocationKey(city) {
    try {
        const response = await axios.get(`https://www.metaweather.com/api/location/search/?query=${city}`);
        locationID = response.data[0].woeid;
    } catch (error) {
        console.log(error);
    }
}

async function getWeather() {
    try {
        await getLocationKey('Budapest');
        const response = await axios.get(`https://www.metaweather.com/api/location/${locationID}`);
        weatherObj = response.data;
    } catch (error) {
        console.log(error);
    }
}

async function setWeather() {
    try {
        await getWeather();
        currentWeather.weatherStateAbbr = weatherObj.consolidated_weather[0].weather_state_abbr;
        currentWeather.weatherState = weatherObj.consolidated_weather[0].weather_state_name;
        currentWeather.minTemp = weatherObj.consolidated_weather[0].min_temp;
        currentWeather.maxTemp = weatherObj.consolidated_weather[0].max_temp;
        currentWeather.currentTemp = weatherObj.consolidated_weather[0].the_temp;
        setContents();
        setForecast();
    } catch (error) {
        console.log(error);
    }
}

function setContents() {

    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let today  = new Date();

    let currentDate = document.querySelector('.current-date');
    currentDate.innerHTML = today.toLocaleDateString("en-US", options);

    let weatherIcon = document.querySelector('#weather-icon');
    weatherIcon.src = 'svg/' + currentWeather.weatherStateAbbr + '.svg';

    let weatherStateText = document.querySelector('.weather-text');
    weatherStateText.innerHTML = currentWeather.weatherState;

    let currentTempElement = document.querySelector('.current-temp');
    currentTempElement.innerHTML = Math.trunc(currentWeather.currentTemp) + '°';

    let minTempElement = document.querySelector('.min-temp');
    minTempElement.innerHTML = 'Min ' + Math.trunc(currentWeather.minTemp) + '°';

    let maxTempElement = document.querySelector('.max-temp');
    maxTempElement.innerHTML = 'Max ' + Math.trunc(currentWeather.maxTemp) + '°';
}

function setForecast() {
    let dayForecast = document.querySelector('.day-forecast');

    for (let i=1; i<weatherObj.consolidated_weather.length; i++) {
        dayForecast.children[0].src = 
            'svg/' + weatherObj.consolidated_weather[i].weather_state_abbr + '.svg';

        dayForecast.children[1].innerHTML = 
            Math.trunc(weatherObj.consolidated_weather[i].the_temp) + '°';

        dayForecast.children[2].children[0].innerHTML = 
            weatherObj.consolidated_weather[i].weather_state_name;

        dayForecast.children[2].children[1].innerHTML = 
            Math.trunc(weatherObj.consolidated_weather[i].min_temp) + '°';

        dayForecast.children[2].children[2].innerHTML = 
            Math.trunc(weatherObj.consolidated_weather[i].max_temp) + '°';

        if (i>1) {
            let dayForecastCopy = dayForecast.cloneNode(true);
            document.querySelector('.card-back').appendChild(dayForecastCopy);
            //console.log(document.querySelector('.card-back'));
        }
    }


}

setWeather();

window.onload = function() {
    let frontHeader = document.querySelector('.city');
    let backHeader = document.querySelector('.back-header');
    let cardFront = document.querySelector('.card');
    let cardBack = document.querySelector('.card-back');

    frontHeader.addEventListener('click', () => {
        cardFront.style.display = 'none';
        cardBack.style.display = 'flex';
    });

    backHeader.addEventListener('click', () => {
        cardBack.style.display = 'none';
        cardFront.style.display = 'flex';
    });
}