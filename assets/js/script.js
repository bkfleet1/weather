const weatherKey = "ac1d6a3b8b91cfd1f2b19e56f52a2ff4";
const urlOne = "https://api.openweathermap.org/data/2.5/weather?q=";
const urlTwo = "https://api.openweathermap.org/data/2.5/onecall?lat=";
const cityName = "";
const dailyArray = [];


// initiates weather API call using city name submitted in form.
const cityFormHandler = function (cityName) {
    fetch(urlOne + cityName + "&appid=" + weatherKey + "&units=imperial")
        .then(async function (response) {
            if (response.ok) {
                const data = await response.json();
                 const lon = data.coord.lon;
                const lat = data.coord.lat;
                const cityName = data.name
                const tTemp = data.main.temp;
                const tHumid = data.main.humidity;
                const tWind = data.wind.speed;
                const tIcon = data.weather;
                const cDate = new Date();
                const cMonth = cDate.getMonth() + 1;
                const cDay = cDate.getDate();
                const cYear = cDate.getFullYear();
                localStorage.setItem("cityName",cityName);
                fetch(urlTwo + lat + "&lon=" + lon + "&appid=" + weatherKey + "&units=imperial")
                    .then(async function (response2) {
                        if (response2.ok) {
                            return response2.json()
                                .then(function (data2) {
                                      const dailyArray = data2.daily;
                                    const tUvi = data2.current.uvi
                                    currentWeather(tUvi, tTemp, tHumid, tWind, tIcon, cityName, cDay, cMonth, cYear);
                                    forecastWeather(dailyArray);
                                }

                                );
                        }
                    });
            } else {
                alert(error + " something went wrong");
            }
        }
        );
};



// building html structure dynamically
function crtBanner() {
    const buildBanner = document.createElement("div")
    buildBanner.classList.add("banner");
    buildBanner.id = "banner";
    buildBanner.textContent = "Weather Dashboard";
    return buildBanner;
}

function crtRow() {
    const buildRow = document.createElement("div");
    buildRow.classList.add("row", "d-flex");
    buildRow.id = "row";
    return buildRow;
}

// building form for user to enter city name.
function crtSrchDiv() {
    const buildSrchDiv = document.createElement("div");
    buildSrchDiv.classList.add("searchDiv", "col-3");
    buildSrchDiv.id = "searchDiv";
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
    buildSrchBtn.classList.add("submit");
    buildSrchBtn.type = "submit";
    buildSrchBtn.textContent = "Search";
    return buildSrchBtn;
}


// building current weather section
function crtWeatherDiv() {
    const buildWeatherDiv = document.createElement("div");
    buildWeatherDiv.classList.add("weatherDiv", "col-9");
    buildWeatherDiv.id = "weatherDiv";
    return buildWeatherDiv;
}

function crtCurrentDiv() {
    const buildCurrentDiv = document.createElement("div");
    buildCurrentDiv.classList.add("currentWeather");
    buildCurrentDiv.id = "currentWeather";
    return buildCurrentDiv;
}

function crtCurrentCity(cityName, cDay, cMonth, cYear) {
    const currentCity = document.createElement("span");
    currentCity.classList.add("currentCity");
    currentCity.id = "currentCity";
    currentCity.textContent = cityName + " (" + cMonth + "/" + cDay + "/" + cYear + ")";
    return currentCity;
}

function crtCurrentTemp(tTemp) {
    const currentTemp = document.createElement("p");
    currentTemp.classList.add("currentTemp");
    currentTemp.id = "currentTemp";
    currentTemp.textContent = "Temp: " + tTemp + " °F";
    return currentTemp;
}

function crtCurrentWind(tWind) {
    const currentWind = document.createElement("p");
    currentWind.classList.add("currentWind");
    currentWind.id = "currentWind";
    currentWind.textContent = "Wind: " + tWind + " mph";
    return currentWind;
}

function crtCurrentHumid(tHumid) {
    const currentHumid = document.createElement("p");
    currentHumid.classList.add("currentHumid");
    currentHumid.id = "currentHumid";
    currentHumid.textContent = "Humidity: " + tHumid + "%";
    return currentHumid;
}

function crtCurrentUvi() {
    const currentUvi = document.createElement("span");
    currentUvi.classList.add("currentUvi");
    currentUvi.id = "currentUvi";
    currentUvi.textContent = "UV Index: ";
    return currentUvi;
}

function crtUviBtn(tUvi) {
    const buildUviBtn = document.createElement("button");
    buildUviBtn.classList.add("uviBtn", uviColor(tUvi));
    buildUviBtn.id = "uviBtn";
    buildUviBtn.textContent = tUvi;
    return buildUviBtn;
}

function uviColor(tUvi) {
    if (tUvi <= 2.99 || tUvi <= "2.99") { return "uvi12" }
    else if (tUvi >= 3.00 && tUvi <= 5.99 || tUvi >= "3.00" && tUvi <= "5.99") { return "uvi345" }
    else if (tUvi >= 6.00 && tUvi <= 7.99 || tUvi >= "6.00" && tUvi <= "7.99") { return "uvi67" }
    else if (tUvi >= 8.00 && tUvi <= 10.99 || tUvi >= "8.00" && tUvi <= "10.99") { return "uvi8910" }
    else if (tUvi >= 11.00 || tUvi >= "11.00") { return "uvi11" }
    else return "uviNone"
}

function crtIcon(tIcon) {
    for (let x = 0; x < tIcon.length; x++) {
        const gettIcon = tIcon[x].icon;
        const buildIcon = document.createElement("span");
        buildIcon.classList.add("tIcon");
        buildIcon.id = "tIcon-" + x;
        buildIcon.innerHTML = '<img src = "http://openweathermap.org/img/wn/' + gettIcon + '@2x.png" class="cIcon" alt="current weather icon">';
        return buildIcon;
    }
}

function crtTodayDiv() {
    buildTodayDiv = document.createElement("div");
    buildTodayDiv.classList.add("todayDiv");
    buildTodayDiv.id = "todayDiv";
    return buildTodayDiv;
}

function crtForecastBanner() {
    const forecastBanner = document.createElement("div");
    forecastBanner.classList.add("forecastBanner");
    forecastBanner.id = "forecastBanner";
    forecastBanner.textContent = '5-Day Forecast:';
    return forecastBanner;
}

function crtForecastWrapper() {
    const forecastWrappper = document.createElement("div");
    forecastWrappper.classList.add("forecastWrapper");
    forecastWrappper.id = "forecastWrapper";
    return forecastWrappper;
}

// assembling current weather section
function currentWeather(tUvi, tTemp, tHumid, tWind, tIcon, cityName, cDay, cMonth, cYear) {
    const buildWeatherDiv = crtWeatherDiv();
    const buildCurrentDiv = crtCurrentDiv();
    const buildTodayDiv = crtTodayDiv();
    const currentCity = crtCurrentCity(cityName, cDay, cMonth, cYear);
    const buildIcon = crtIcon(tIcon);
    const currentTemp = crtCurrentTemp(tTemp);
    const currentWind = crtCurrentWind(tWind);
    const currentHumid = crtCurrentHumid(tHumid);
    const currentUvi = crtCurrentUvi(tUvi);
    const buildUviBtn = crtUviBtn(tUvi);
    const forecastBanner = crtForecastBanner();
    const forecastWrappper = crtForecastWrapper();

    document.querySelector("#row").appendChild(buildWeatherDiv);
    document.querySelector("#weatherDiv").appendChild(buildCurrentDiv);
    document.querySelector("#currentWeather").appendChild(buildTodayDiv);
    document.querySelector("#todayDiv").appendChild(currentCity);
    document.querySelector("#todayDiv").appendChild(buildIcon);
    document.querySelector("#currentWeather").appendChild(currentTemp);
    document.querySelector("#currentWeather").appendChild(currentWind);
    document.querySelector("#currentWeather").appendChild(currentHumid);
    document.querySelector("#currentWeather").appendChild(currentUvi);
    document.querySelector("#currentWeather").appendChild(buildUviBtn);
    document.querySelector("#weatherDiv").appendChild(forecastBanner);
    document.querySelector("#weatherDiv").appendChild(forecastWrappper);
}


// assembling daily forecast
function forecastWeather(dailyArray) {
    for (let i = 1; i < 6; i++) {
        const dailyDiv = crtDailyForecastDiv(i);
        const forecastDate = getForecastDate(dailyArray, i);
        const forecastTemp = getForecastTemp(dailyArray, i);
        const forecastWind = getForecastWind(dailyArray, i);
        const forecastHumid = getForecastHumid(dailyArray, i);
        const forecastIcon = getForecastIcon(dailyArray, i);

        console.log(forecastDate, forecastTemp, forecastWind, forecastHumid, forecastIcon);
        document.querySelector("#forecastWrapper").appendChild(dailyDiv);
        document.querySelector("#dailyDiv" + i).appendChild(forecastDate);
        document.querySelector("#dailyDiv" + i).appendChild(forecastIcon);
        document.querySelector("#dailyDiv" + i).appendChild(forecastTemp);
        document.querySelector("#dailyDiv" + i).appendChild(forecastWind);
        document.querySelector("#dailyDiv" + i).appendChild(forecastHumid);
    }
}

// building daily forecast
function crtDailyForecastDiv(i) {
    const dailyDiv = document.createElement("div", "lh-sm");
    dailyDiv.classList.add("dailyDiv");
    dailyDiv.id = "dailyDiv" + i;
    return dailyDiv;
}

function getForecastDate(dailyArray, i) {
    const forecastDate = document.createElement("span");
    forecastDate.classList.add("forecastDate","forecast");
    forecastDate.id = "forecastDate-" + i;
    forecastDate.textContent = dailyArray[i].dt;
    return forecastDate;
}


function getForecastTemp(dailyArray, i) {
    const forecastTemp = document.createElement("p");
    forecastTemp.classList.add("forecastTemp","forecast");
    forecastTemp.id = "forecastTemp-" + i;
    forecastTemp.textContent = "Temp: " + dailyArray[i].temp.day + " °F";
    return forecastTemp;
}

function getForecastWind(dailyArray, i) {
    const forecastWind = document.createElement("p");
    forecastWind.classList.add("forecastWind","forecast");
    forecastWind.id = "forecastWind-" + i;
    forecastWind.textContent = "Wind: " + dailyArray[i].wind_speed + " mph";
    return forecastWind;
}

function getForecastHumid(dailyArray, i) {
    const forecastHumid = document.createElement("p");
    forecastHumid.classList.add("forecastHumid","forecast")
    forecastHumid.id = "forecastHumid-" + i;
    forecastHumid.textContent = "Humidity: " + dailyArray[i].humidity + "%";
    return forecastHumid;
}

function getForecastIcon(dailyArray, i) {
    for (let index = 0; index < dailyArray[i].weather.length; index++) {
        const weatherIcon = dailyArray[i].weather[index].icon;
        const forecastIcon = document.createElement("span");
        forecastIcon.classList.add("forecastIcon");
        forecastIcon.id = "forecastIcon-" + i;
        forecastIcon.innerHTML = '<img src = "http://openweathermap.org/img/wn/' + weatherIcon + '@2x.png" class="fIcon" alt="weather icon">';
        return forecastIcon;
    }
}


// assembling initial html and search form
$(document).ready(function () {
    const buildBanner = crtBanner();
    const buildRow = crtRow();
    const buildSrchDiv = crtSrchDiv();
    const buildSrchForm = crtSrchForm();
    const buildSrchInput = crtSrchInput();
    const buildSrchBtn = crtSrchBtn();

    document.querySelector(".container").appendChild(buildBanner);
    document.querySelector(".container").appendChild(buildRow);
    document.querySelector("#row").appendChild(buildSrchDiv);
    document.querySelector("#searchDiv").appendChild(buildSrchForm);
    document.querySelector("#cityForm").appendChild(buildSrchInput);
    document.querySelector("#cityForm").appendChild(buildSrchBtn);


// form event listener. validates submission is not null and then sends to API function (cityFormHandler)
    $('.submit').on('click', function (event) {
        event.preventDefault();
        const cityName = $("#cityName").val().trim();
        if (cityName == null || cityName == "") {
            alert("ERROR: A city name is required. Please enter a city name.")
        }
        else
            $("#cityForm")[0].reset();
            cityFormHandler(cityName);
    })
});
