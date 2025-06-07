"use strict"
const apiKey = "b1cd4303f80b74c8690e7be03a9c1dab";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const icon = document.getElementById("weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }else {
        
        const data = await response.json();

        document.getElementsByClassName("city")[0].textContent = data.name;
        document.getElementsByClassName("temp")[0].textContent = Math.round(data.main.temp) + " °C";
        document.getElementsByClassName("humidity")[0].textContent = data.main.humidity + " %";
        document.getElementsByClassName("wind")[0].textContent = data.wind.speed + " km/h";

        const weather = data.weather[0].main 
        
        if (weather === "Clouds") {
            icon.className = "weather-icon fa-solid fa-cloud";
        } else if (weather === "Clear") {
            icon.className = "weather-icon fa-solid fa-sun";
        } else if (weather === "Rain") {
            icon.className = "weather-icon fa-solid fa-cloud-showers-heavy";
        } else if (weather === "Drizzle") {
            icon.className = "weather-icon fa-solid fa-cloud-rain";
        } else if (weather === "Mist") {
            icon.className = "weather-icon fa-solid fa-smog";
        } else {
            icon.className = "weather-icon fa-solid fa-question"; 
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})
