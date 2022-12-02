//recalls and loads cities from local storage
var allCities = JSON.parse(localStorage.getItem("cities"));
if (!allCities) {
  allCities = [];
} else {
  for (i = 0; i < allCities.length; i++) {
    var historyEl = document.createElement("button");
    historyEl.setAttribute("class", "btn btn-secondary");
    historyEl.setAttribute("id", "search" + i);
    historyEl.innerText = (allCities[i])
   document.querySelector(".history").appendChild(historyEl);
  }
}

//TODO: add functionality to "clear history" button
//TODO: add eventlisteners for search history buttons

// use temp key from weather api
// api fetch for play-list


var date = document.querySelector(".date");
setInterval(function () {
  date.textContent = moment().format("MMMM Do YYYY");
});

let weather = {
  apiKey: "6af174eb1acf790c330054f1967a6d0f",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=imperial&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },

  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    console.log(name, icon, description, temp, humidity, speed);
    document.querySelector(".city").innerText = name;
    document.querySelector(".temp").innerHTML = temp + "°F";
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerHTML = description;
    document.querySelector(".humidity").innerHTML =
      "Humidity: " + humidity + "%";
    document.querySelector(".speed").innerHTML =
      "Wind Speed: " + speed + "mph ";

    //add new cities to history array, remove duplicates
    allCities.push(name);
    function removeDuplicates(data) {
      return [...new Set(data)];
    }
    allCities = removeDuplicates(allCities)
    localStorage.setItem("cities", JSON.stringify(allCities));
  },

  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document
  .querySelector(".card-header button")
  .addEventListener("click", function () {
    weather.search();
  });

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

  //clears users' local storage & refreshes page
  //  MAY WANT TO REMOVE FEATURE SINCE IT WILL INTERRUPT MUSIC PLAY BY RESETTING PAGE
  $('#clear').click(function(){
    localStorage.clear();
    location.reload()
  })

weather.fetchWeather("Atlanta");