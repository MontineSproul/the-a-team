//recalls and loads cities from local storage
var allCities = JSON.parse(localStorage.getItem("cities"));
if (!allCities) {
  allCities = [];
} else {
  for (i = 0; i < allCities.length; i++) {
    var historyEl = document.createElement("button");
    historyEl.setAttribute("class", "btn btn-secondary");
    historyEl.setAttribute("id", "search" + i);
    historyEl.innerText = allCities[i];
    document.querySelector(".history").appendChild(historyEl);
  }
}

//TODO: add functionality to "clear history" button
//TODO: add eventlisteners for search history buttons

// use temp key from weather api
// api fetch for play-list

// Selector for div class with 'spotify' id
var spotifyEl = $("#spotify");
//Disiplays date in weather card
var date = document.querySelector(".date");
setInterval(function () {
  date.textContent = moment().format("MMMM Do YYYY");
});

//Retrieves data from Openweathermap.org (API KEY)
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

//Function to dispaly weather data collected 
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

    //add only new cities to history array and create a button
    if (allCities.includes(name) == false) {
      allCities.push(name);
      localStorage.setItem("cities", JSON.stringify(allCities));
      historyEl = document.createElement("button");
      historyEl.setAttribute("class", "btn btn-secondary");
      historyEl.setAttribute("id", "search" + (allCities.length -1) );
      historyEl.innerText = name;
      document.querySelector(".history").appendChild(historyEl);
    }

    var spotifyEmbed = $("<div>")
    spotifyEmbed.attr("id", "embed")
    spotifyEl.append(spotifyEmbed);

    if(temp > 75 ) {
      console.log(`it's hot`)
      $("#embed").html(`<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DX1BzILRveYHb?utm_source=generator" width="100%" height="380" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`)
    } else if(temp <= 75 && temp >= 60) {
      console.log(`it's warm`)  
      $("#embed").html(`<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DX5IDTimEWoTd?utm_source=generator" width="100%" height="380" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`)  
    } else {
      console.log(`it's cold`)
    }

    $(".search-bar").val("");
  },

//Function to retrieve the data entered in search 
search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

// Event listener for click on search button
document
  .querySelector(".card-header button")
  .addEventListener("click", function () {
    weather.search();
  });

// Event listener for key up on enter key
document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

//clears users' local storage & refreshes page
//  MAY WANT TO REMOVE FEATURE SINCE IT WILL INTERRUPT MUSIC PLAY BY RESETTING PAGE
$("#clear").click(function () {
  localStorage.clear();
  location.reload();
});

// Default display - Atlanta's weather conditions
// NEED TO REMOVE TO DEFAULT TO SEARCH BAR ONLY SO MUSIC DOES NOT PLAY UPON LOADING THE PAGE
weather.fetchWeather("Atlanta");
