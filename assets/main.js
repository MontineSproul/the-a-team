// pull local storage for search history
// display where? drop down, button, other?
    // create elements as needed to display
        //TODO: id/class in html for display location

// input field for user to select city
    //TODO: need label & input in html
    //TODO: need button w/ an id in html
// function to:
    // api fetch for weather
    // display city selected
        //TODO: id/class for location in html
    // locally store city

    // initially for music: user input or hard code weather key/value
    // eventually: use key from weather api relating to temp and/or wind and/or rain/snow
    // api fetch for song lists
    // code to play song list x based on whether y
    // function or loop that pulls weather key (resulting in playlist)
    
// event listener for submit button

var date = document.querySelector(".date")
setInterval(function(){
            date.textContent = moment().format("MMMM Do YYYY")

        });

let weather = {
  "apiKey": "6af174eb1acf790c330054f1967a6d0f",
  fetchWeather: function(city){
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" + city + 
      "&units=imperial&appid=" 
      + this.apiKey
    )
      .then((response) => response.json())
      .then ((data) => this.displayWeather(data));
  },

  displayWeather: function(data){
  
    const { name } = data;
    const { icon, description} = data.weather[0];
    const { temp, humidity} = data.main
    const { speed } = data.wind;
    console.log(name,icon,description,temp,humidity,speed) 
    document.querySelector(".city").innerText = name;
    document.querySelector(".temp").innerHTML = temp + "°F";
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerHTML = description;
    document.querySelector(".humidity").innerHTML = "Humidity: " + humidity + "%";
    document.querySelector(".speed").innerHTML = "Wind Speed: " + speed + "mph ";
    
  },

search: function (){
    this.fetchWeather(document.querySelector(".search-bar").value);
  }
};

document.querySelector(".card-header button").addEventListener("click", function(){
  weather.search();

});

document.querySelector(".search-bar").addEventListener("keyup", function (event){
  if (event.key == "Enter"){
    weather.search();
  }
});

weather.fetchWeather("Atlanta");