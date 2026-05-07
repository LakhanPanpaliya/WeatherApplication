const input = document.getElementById("input-city");
// console.log(city_name.innerHTML);
input.addEventListener('keydown',searchTemp);
const apikey = "8ee69e1eb3534a4b93b122434260505";
const base_url = 'http://api.weatherapi.com/v1/forecast.json'

// default city 
display("Pune");
function searchTemp(e){
    
    if(e.key === 'Enter'){
        e.preventDefault();
        const city = e.target.value.trim();
        console.log(city);
        if(city){
            display(city);
            e.target.value="";
        }
    }
}

async function display(city){
    try{
        const url = `${base_url}?key=${apikey}&q=${city}&days=1&api=no&alerts=no`;  
        const response = await fetch(url);
        const data = await response.json(); 
        if(data.error){
            alert("City Not Found");
            return;
        }
        getWeather(data);
    }catch(error){
        console.log(error);
    }
    
}

 
 function getWeather(data){

    document.getElementById("city_name").innerHTML = data.location.name;

    document.getElementById("dateTime").innerHTML = data.location.localtime;

    document.getElementById("degree-heading").innerHTML = `${data.current.temp_c}<sup>o</sup>`;

    document.getElementById("degree-headings").innerHTML =`${data.current.temp_c}<sup>o</sup>`;

    document.getElementById("min-temp").innerHTML =`${data.forecast.forecastday[0].day.mintemp_c}<sup>o</sup>`;

    document.getElementById("max-temp").innerHTML =`${data.forecast.forecastday[0].day.maxtemp_c}<sup>o</sup>`;

    document.getElementById("humiditys").innerHTML =`${data.current.humidity}%`;

    document.getElementById("wind").innerHTML = `${data.current.wind_kph} km/h`;

    document.getElementById("description").innerHTML = data.current.condition.text;

    document.getElementById("visibility").innerHTML =`${data.current.vis_km} km`;

    document.getElementById("pressure").innerHTML =`${data.current.pressure_mb} hPa`;

    document.getElementById("feel-like").innerHTML =`${data.current.feelslike_c}<sup>o</sup>`;

    document.getElementById("sunset").innerHTML = data.forecast.forecastday[0].astro.sunset;

    // hourly forecast
    displayHour(data.forecast.forecastday[0].hour);
}

// display hour
function displayHour(hours){

    const container = document.getElementById("hourly-container");

    hours.forEach((hour,index) => {

        const div = document.createElement("div");
        div.classList.add("hours");
        let time = hour.time.split(" ")[1];

        if(index === 0){
            time = "Now";
        }

        div.innerHTML = `
            <p>${time}</p>
            <img src="https:${hour.condition.icon}" width="45">
            <p>${hour.temp_c}<sup>o</sup></p>`;
        container.appendChild(div);
    });
}

 
// sunset function to get the time
function getSunSet(time){
    const date = new Date(time * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
 