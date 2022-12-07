//recalls and loads cities from local storage
var allCities = JSON.parse(localStorage.getItem("cities"));
if (!allCities) {
  allCities = [];
} else {
  for (i = 0; i < allCities.length; i++) {
    var historyEl = document.createElement("button");
    historyEl.setAttribute("class", "btn btn-secondary");
    historyEl.innerText = allCities[i];
    document.querySelector(".history").appendChild(historyEl);
  }
}

// Selector for main element
var mainEl = $("main")
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
        this.apiKey, {SameSite:"None"}
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
      historyEl.innerText = name;
      document.querySelector(".history").appendChild(historyEl);
    }

    var spotifyEmbed = $("<div>");
    spotifyEmbed.attr("id", "embed");
    spotifyEl.append(spotifyEmbed);

    if (temp > 75) {

      // Hot weather conditions; sets 'main' element's class to be 'hot', embeds 'hot' weather playlist
      mainEl.attr("class", "hot")
      $("#embed")
        .html(`<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DX1BzILRveYHb?utm_source=generator" 
      width="100%" height="380" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`);

    } else if (temp <= 75 && temp >= 60) {

      // Warm weather conditions; sets 'main' element's class to be 'warm', embeds 'warm' weather playlist
      console.log(`it's warm`);
      mainEl.attr("class", "warm")
      $("#embed")
        .html(`<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DX5IDTimEWoTd?utm_source=generator" 
      width="100%" height="380" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`);

    } else {

      // Cold weather conditions; sets 'main' element's class to be 'cold', embeds 'cold' weather playlist
      console.log(`it's cold`);
      mainEl.attr("class", "cold")
      $("#embed")
        .html(`<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DX97m5YXQMpCi?utm_source=generator" 
      width="100%" height="380" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`);
    }
    //clear search bar
    $(".search-bar").val("");
  },

  //Function to retrieve the data entered in search
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

//clears users' local storage & refreshes page
$("#clear").click(function () {
  localStorage.clear();
  location.reload();
});

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

// Event listener for click on historical search buttons
$(".history").on("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    weather.fetchWeather(event.target.innerText);
  }
});

// Default display - Atlanta's weather conditions
// NEED TO REMOVE TO DEFAULT TO SEARCH BAR ONLY SO MUSIC DOES NOT PLAY UPON LOADING THE PAGE
weather.fetchWeather("Atlanta");

// CREATE API CALL FOR UNSPLASH!!!! WOHOOO!! =)
const unsplashKey = "fDLyIwH2-_UptFzuYMbi8IE0EsrXOD7JWcfncpaoIq4"
function generateImg() {
  var city = "Atlanta"
  var url = `https://api.unsplash.com/search/photos?query=${city}&per_page=1&order_by&client_id=${unsplashKey}`
// debugger
  fetch(url)
    .then(response => {return response.json();})
    .then((data) => {
      // Retrieves image from json image
      console.log(data.results[0].urls.full);
      // Retrieves image's height
      console.log(data.results[0].height)
      // Retrieves image's width
      console.log(data.results[0].width)
    })
  }

  generateImg()