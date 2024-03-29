const weatherTemp = document.querySelector("#temp")
const weatherLocation = document.querySelector("#location")
const showDate = document.querySelector("#date")
const weatherIconDisplay = document.querySelector(".weather-icon")
const greetingElement = document.querySelector(".greeting")
const weatherDisplay = document.querySelector(".weather-display")

function date() {
    let currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.toLocaleString("default", { month: "long" });
    let weekday = currentDate.toLocaleString("default", { weekday: "long" });

    let dateToday = `${day} ${month}, ${weekday}`;
    showDate.innerHTML = dateToday;
}
function greet() {
        let currentTime = new Date();
        let greet = Math.floor(currentTime.getHours() / 6);
        switch (greet) {
            case 0: greetingElement.innerHTML = "Good night!";
                break;
            case 1: greetingElement.innerHTML = "Good morning!";
                break;
            case 2: greetingElement.innerHTML = "Good afternoon!";
                break;
            case 3: greetingElement.innerHTML = "Good evening!";
                break;
        }
    }
    date();
    greet();

    const api_url = "https://wttr.in/?format=j1";
    async function getWeather() {
        try {
            const response = await fetch(api_url);
            const data = await response.json();
            const weather = data.current_condition[0];
            let weather_condition = weather.weatherDesc[0].value;
            let temp = weather.temp_C;
            const location = data.nearest_area[0];
            let area = location.areaName[0].value;
            let country = location.country[0].value;
            let region = location.region[0].value;
            let locationElement = `${area}, ${region}, ${country}`;
            weatherTemp.innerHTML = `${temp} °C`;
            weatherLocation.innerHTML = locationElement;
        } catch (error) {
            console.error('Error to load weather, Maybe wttr is down.', error);
            weatherDisplay.classList.remove("weather-display");
        }
    }
    
    getWeather();

    fetch('https://wttr.in/?format=3')
    .then(response => response.text())
    .then(data => {
        const weatherIconPattern = /[☀️🌤️🌥️☁️🌦️🌧️🌨️🌩️🌪️🌫️❄️🌨️💧💦💨]{2}/; 
        const match = data.match(weatherIconPattern);

        if (match) {
            const weatherIcon = match[0];
            const weatherIconElement = document.createTextNode(weatherIcon);
            weatherIconDisplay.appendChild(weatherIconElement);
        }
    })
    .catch(error => {
        console.error('Error to load weather, Maybe wttr is down.', error);
    });