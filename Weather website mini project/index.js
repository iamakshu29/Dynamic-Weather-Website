//* names start with current gives the weather details about the current condition (not today's)
//* names start with today gives the weather details about the today's condition
//* names start with next gives the weather details about the next 5 days
//* all the image in cards will change on the basis of morning noon evening and night
//* if there is a rain then the rain image will overpower all the daily routine images
//* based on the images the color of card table will change


const currentDay = document.querySelector('.current-day');
const currentTemp = document.querySelector('.temperature');
const minTemp = document.querySelector('.min-temp');
const maxTemp = document.querySelector('.max-temp');
const currentWeatherMain = document.querySelector('.weather');
const currentWeatherDesc = document.querySelector('.weather-desc');
const currentHumidity = document.querySelector('.humidity');
const currentWindSpeed = document.querySelector('.wind-speed');
const feelsLike = document.querySelector('.feels-like');
const todayTemp = document.querySelector('.day-temp');
const tonightTemp = document.querySelector('.night-temp');
const currentPressure = document.querySelector('.curr-pressure');
const weatherImage = document.querySelector('.weath-img');
const currentTime = document.querySelector('.time');
const today_date = document.querySelector('.today_date');
const dayImage = document.querySelectorAll('.day-image');
const cardTable = document.querySelectorAll('.card-table');
const nextHumidity = document.querySelectorAll('.next-day-humidity');
const nextWeather = document.querySelectorAll('.next-day-weather');
const nextWindSpeed = document.querySelectorAll('.next-day-wind_speed');
const nextDay = document.querySelectorAll('.next-day');
const nextTemp = document.querySelectorAll('.next-day-temp');
const nextNightTemp = document.querySelectorAll('.next-day-night-temp');


const days = document.querySelector('.days');



//! getting the latitude and longitude by using geolocation api 
//! openweathermap api is used to get all the weather info 
//! to get the temp in celcius there is change in query in req.url  with units change to metric

const getInfo = () => {

    navigator.geolocation.getCurrentPosition(async (success) => {
        try {
            let { latitude, longitude } = success.coords;
            let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=b830b401baa5fef68028c64cbe254e83`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = data;

// dataFromAPI is used to get all the details related to date and time
//this info is extracted with the help of stackOverflow

            const dataFromAPI = new Date(arrData.current.dt * 1000);
            today_date.innerText = dataFromAPI.toLocaleString("en-us", { weekday: "long" }) + " " + dataFromAPI.getDate() + " " + dataFromAPI.toLocaleString('default', { month: 'long' }) + " " + dataFromAPI.getFullYear();
            const time = ()=>{
                var d = new Date();
                var t = d.toLocaleTimeString();
                currentTime.innerText = t; 
            }
            setInterval(time, 1000);
            todayTemp.innerText += `${arrData.daily[0].temp.day}` + ' °C';
            tonightTemp.innerText += `${arrData.daily[0].temp.night}` + ' °C'
            currentTemp.innerText += `${arrData.current.temp}` + ' °C';
            feelsLike.innerText += `${arrData.current.feels_like}` + ' °C';
            minTemp.innerText += `${arrData.daily[0].temp.min}` + ' °C';
            maxTemp.innerText += `${arrData.daily[0].temp.max}` + ' °C';
            currentWeatherMain.innerText += `${arrData.current.weather[0].main}`;
            currentWeatherDesc.innerText += `${arrData.current.weather[0].description}`;
            currentHumidity.innerText += `${arrData.current.humidity}` + '%';
            currentWindSpeed.innerText += `${arrData.current.wind_speed}` + ' km/hr';
            currentPressure.innerText += `${arrData.current.pressure}` + ' mb';;

            if (currentWeatherMain.textContent == 'Clouds') {
                weatherImage.setAttribute('src', 'images/clouds.png');
            }
            else if (currentWeatherMain.textContent == 'Rain') {
                weatherImage.setAttribute('src', 'images/rain.png');
            }
            else if (currentWeatherMain.textContent == 'Thunderstorm') {
                weatherImage.setAttribute('src', 'images/thunderstorm.png');
            }
            else if (currentWeatherMain.textContent == 'Drizzle') {
                weatherImage.setAttribute('src', 'images/drizzle.png');
            }
            else if (currentWeatherMain.textContent == 'Clear') {
                weatherImage.setAttribute('src', 'images/clear.png');
            }
            else if (currentWeatherMain.textContent == 'Snow') {
                weatherImage.setAttribute('src', 'images/snow.png');
            }
            else {
                weatherImage.setAttribute('src', 'images/atmosphere.png');
            }



            // console.log(dataFromAPI.toTimeString().slice(0, 2));


            for (let i = 1; i < 6; i++) {
                let showDays = new Date(arrData.daily[i].dt * 1000).toLocaleString("en-us", {
                    weekday: "long"
                });

                        
                nextDay[i - 1].textContent = `${showDays}`;
                nextTemp[i - 1].textContent += `${arrData.daily[i].temp.day}` + ' °C';
                nextNightTemp[i - 1].textContent += `${arrData.daily[i].temp.night}` + ' °C';
                nextWindSpeed[i - 1].textContent = `${arrData.daily[i].wind_speed}` + ' km/h';
                nextHumidity[i - 1].textContent = `${arrData.daily[i].humidity}` + '%';;
                nextWeather[i - 1].textContent = `${arrData.daily[i].weather[0].main}`;



                if ((dataFromAPI.toTimeString().slice(0, 2) >= 21 && dataFromAPI.toTimeString().slice(0, 2) < 25) || ((dataFromAPI.toTimeString().slice(0, 2) >= 1 && dataFromAPI.toTimeString().slice(0, 2) < 6))) {
                    dayImage[i - 1].setAttribute('src', 'images/night.png');
                }
                if ((dataFromAPI.toTimeString().slice(0, 2) >= 6 && dataFromAPI.toTimeString().slice(0, 2) < 12)) {
                    dayImage[i - 1].setAttribute('src', 'images/morning.png');
                }
                if ((dataFromAPI.toTimeString().slice(0, 2) >= 12 && dataFromAPI.toTimeString().slice(0, 2) < 17)) {
                    dayImage[i - 1].setAttribute('src', 'images/after_noon.png');
                }
                if ((dataFromAPI.toTimeString().slice(0, 2) >= 17 && dataFromAPI.toTimeString().slice(0, 2) < 21)) {
                    dayImage[i - 1].setAttribute('src', 'images/evening.png');
                }
                if ((nextWeather[i - 1].textContent === 'Rain') || (nextWeather[i - 1].textContent === 'Drizzle') || (nextWeather[i - 1].textContent === 'Thunderstorm')) {
                    dayImage[i - 1].setAttribute('src', 'images/win-01.png');
                }
                if (dayImage[i - 1].src === 'http://127.0.0.1:5500/images/night.png') {
                    cardTable[i - 1].classList.add('table-dark');
                }
                if (dayImage[i - 1].src === 'http://127.0.0.1:5500/images/morning.png') {
                    cardTable[i - 1].classList.add('table-danger');
                }
                if (dayImage[i - 1].src === 'http://127.0.0.1:5500/images/after_noon.png') {
                    cardTable[i - 1].classList.add('table-warning');
                }
                if (dayImage[i - 1].src === 'http://127.0.0.1:5500/images/evening.png') {
                    cardTable[i - 1].classList.add('table-danger');
                }
                if (dayImage[i - 1].src === 'http://127.0.0.1:5500/images/win-01.png') {
                    cardTable[i - 1].classList.add('table-success');
                }
            }
        }
        catch (error) {
            console.log('Error is', error);
        }

    });
}

getInfo();
