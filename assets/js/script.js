const weatherKey = "ac1d6a3b8b91cfd1f2b19e56f52a2ff4";
const urlOne = "https://api.openweathermap.org/data/2.5/weather?q=";
const urlTwo = "https://api.openweathermap.org/data/2.5/onecall?lat=";
const cityName = "";


const cityFormHandler = function (cityName) {
    // console.log(cityName)
    fetch(urlOne + cityName + "&appid=" + weatherKey + "&units=imperial")
        .then(async function (response) {
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                const lon = data.coord.lon;
                const lat = data.coord.lat;
                const cityName = data.name
                const tTemp = data.main.temp;
                const tHumid = data.main.humidity;
                const tWind = data.wind.speed;
                const cDate = new Date();
                const cMonth = cDate.getMonth()+1;
                const cDay = cDate.getDate();
                const cYear = cDate.getFullYear();
                // const tIcon = data.weather.icon;
                console.log(tTemp, tHumid, tWind, cityName);
                currentWeather(tTemp, tHumid, tWind, cityName,cDay,cMonth,cYear);
                fetch(urlTwo + lat + "&lon=" + lon + "&appid=" + weatherKey + "&units=imperial")
                    .then(async function (response2) {
                        if (response2.ok) {
                            return response2.json()
                                .then(function (data2) {
                                    console.log(data2);
                                });
                        }
                    });
            } else {
                alert(error + " something went wrong");
            }
        }
        );
};

function crtRow() {
    const buildRow = document.createElement("div");
    buildRow.classList.add("row", "d-flex");
    buildRow.id = "row";
    return buildRow;
}

function crtSrchDiv() {
    const buildSrchDiv = document.createElement("div");
    buildSrchDiv.classList.add("search-div", "col-3");
    buildSrchDiv.id = "search-div";
    return buildSrchDiv;
}

function crtSrchForm() {
    const buildSrchForm = document.createElement("form")
    buildSrchForm.classList.add("cityForm");
    buildSrchForm.id = "cityForm";
    return buildSrchForm;
}

function crtSrchInput() {
    const buildSrchInput = document.createElement("input");
    buildSrchInput.type = "text";
    buildSrchInput.name = "citySearch";
    buildSrchInput.classList.add("cityName");
    buildSrchInput.id = "cityName";
    buildSrchInput.placeholder = "City Name";
    return buildSrchInput;
}

function crtSrchBtn() {
    const buildSrchBtn = document.createElement("button");
    buildSrchBtn.classList.add("submit")
    buildSrchBtn.type = "submit";
    buildSrchBtn.textContent = "Search";
    return buildSrchBtn;
}

function crtWeatherDiv() {
    const buildWeatherDiv = document.createElement("div");
    buildWeatherDiv.classList.add("weather-div", "col-9","border","border-dark");
    buildWeatherDiv.id = "weather-div";
    return buildWeatherDiv;
}

function crtCurrentCity(cityName,cDay,cMonth,cYear) {
    const currentCity = document.createElement("p");
    currentCity.classList.add("currentCity");
    currentCity.id = "currentCity";
    currentCity.textContent = cityName+" ("+cMonth+"/"+cDay+"/"+cYear+")";
    return currentCity;
}

function crtCurrentTemp(tTemp) {
    const currentTemp = document.createElement("p");
    currentTemp.classList.add("currentTemp");
    currentTemp.id = "currentTemp";
    currentTemp.textContent = "Temp: "+tTemp+" °F";
    return currentTemp;
}

function crtCurrentWind(tWind) {
    const currentWind = document.createElement("p");
    currentWind.classList.add("currentWind");
    currentWind.id = "currentWind";
    currentWind.textContent = "Wind: "+ tWind+" mph";
    return currentWind;
}

function crtCurrentHumid(tHumid) {
    const currentHumid = document.createElement("p");
    currentHumid.classList.add("currentHumid");
    currentHumid.id = "currentHumid";
    currentHumid.textContent = "Humidity "+tHumid+" %";
    return currentHumid;
}



function currentWeather(tTemp, tHumid, tWind, cityName,cDay,cMonth,cYear) {
    const currentCity = crtCurrentCity(cityName,cDay,cMonth,cYear);
    const currentTemp = crtCurrentTemp(tTemp);
    const currentWind = crtCurrentWind(tWind);
    const currentHumid = crtCurrentHumid(tHumid);

    document.querySelector("#weather-div").appendChild(currentCity);
    document.querySelector("#weather-div").appendChild(currentTemp);
    document.querySelector("#weather-div").appendChild(currentWind);
    document.querySelector("#weather-div").appendChild(currentHumid);
}


$(document).ready(function () {
    const buildRow = crtRow();
    const buildSrchDiv = crtSrchDiv();
    const buildSrchForm = crtSrchForm();
    const buildSrchInput = crtSrchInput();
    const buildSrchBtn = crtSrchBtn();
    const buildWeatherDiv = crtWeatherDiv();

    document.querySelector(".container").appendChild(buildRow);
    document.querySelector("#row").appendChild(buildSrchDiv);
    document.querySelector("#search-div").appendChild(buildSrchForm);
    document.querySelector("#cityForm").appendChild(buildSrchInput);
    document.querySelector("#cityForm").appendChild(buildSrchBtn);
    document.querySelector("#row").appendChild(buildWeatherDiv);

    $('.submit').on('click', function (event) {
        event.preventDefault();
        const cityName = document.getElementById("cityName").value;
        if (cityName == null || cityName == "") {
            alert("ERROR: A city name is required. Please enter a city name.")
        }
        else
            cityFormHandler(cityName);

    })
});