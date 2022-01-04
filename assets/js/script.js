const weatherKey = "ac1d6a3b8b91cfd1f2b19e56f52a2ff4";
const urlOne = "https://api.openweathermap.org/data/2.5/weather?q=";
const urlTwo = "https://api.openweathermap.org/data/2.5/onecall?lat=";
const cityName = "";


function submitForm(event) {
    event.preventDefault();
    const cityName = document.getElementById("cityName").value;
    if (cityName == null || cityName == "") {
        alert("ERROR: A city name is required. Please enter a city name.")
    }
    else 
    cityFormHandler(cityName);
};

const cityFormHandler = function (cityName) {
    console.log(cityName)
    fetch(urlOne + cityName + "&appid=" + weatherKey + "&units=imperial")
        .then(async function (response) {
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                const lon = data.coord.lon;
                const lat = data.coord.lat;
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