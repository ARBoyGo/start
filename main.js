let $ = document.querySelector.bind(document);
function date() {
    let currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.toLocaleString("default", { month: "long" });
    let weekday = currentDate.toLocaleString("default", { weekday: "long" });

    let dateToday = `${day} ${month}, ${weekday}`;
    $('#date').innerHTML = dateToday;
}
function greet() {
        let currentTime = new Date();
        let greet = Math.floor(currentTime.getHours() / 6);
        switch (greet) {
            case 0: $('.greeting').innerHTML = "Good night!";
                break;
            case 1: $('.greeting').innerHTML = "Good morning!";
                break;
            case 2: $('.greeting').innerHTML = "Good afternoon!";
                break;
            case 3: $('.greeting').innerHTML = "Good evening!";
                break;
        }
    }
    date();
    greet();

    const api_url = "https://wttr.in/?format=j1";
    async function getWeather() {
    const response = await fetch(api_url);
    const data = await response.json();
    const weather = data.current_condition[0];
    let weather_condition = weather.weatherDesc[0].value
    let temp = weather.temp_C;
    const location = data.nearest_area[0];
    let area = location.areaName[0].value;
    let country = location.country[0].value;
    let region = location.region[0].value;
    let locationElement = `${area}, ${region}, ${country}`;
    document.getElementById("temp").innerHTML = `${temp} °C`;
    document.getElementById("location").innerHTML = locationElement;
 }
  getWeather();

  fetch('https://wttr.in/?format=3')
  .then(response => response.text())
  .then(data => {
      const weatherIcon = data.trim().split(' ')[3];
      const weatherIconElement = document.createTextNode(weatherIcon);
      document.getElementById('weather-icon').appendChild(weatherIconElement);
  })
  .catch(error => {
      console.log('Error:', error);
  });