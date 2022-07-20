let weather = {
    apikey: "abbc42bb00b7d0f8d887489a600f9894",
    city:'Vancouver',
    fetchWeather: function(city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            +city
            +"&units=metric&appid="
            +this.apikey
            )
            .then((response) =>response.json())
            .then((data) => this.displayWeather(data));
    },

    displayWeather: function(data){
        const {name} = data;
        const {icon,description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;

        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".temperature").innerText = temp + "°C" ;
        document.querySelector(".weather-condition").innerText = description;
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".windSpeed").innerText ="Wind Speed: "+ speed +" km/h";
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png"

        document.querySelector(".weatherPanel").classList.remove("loading");
    },

    search: function(){
        let search = document.querySelector(".searchField").value;
        this.fetchWeather(search);
    }
};

const button = document.querySelector(".searchBtn");
const searchBar = document.querySelector('.searchField');

button.addEventListener("click", function(){
    weather.search();
});

searchBar.addEventListener("keyup", function(event){
    if(event.key =="Enter"){
        weather.search();
    }
});
weather.fetchWeather("Vancouver");