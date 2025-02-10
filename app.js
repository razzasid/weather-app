const loadingSpinner = document.getElementById("loading-spinner");
const apiKey = "62db7542e4af01f00fc416a5b6a54f00";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

//DOM Elements
const searchBox = document.querySelector(".search input");
const form = document.querySelector("form");
const weatherIcon = document.querySelector(".weather-icon");
const errorElement = document.querySelector(".error");
const weatherElement = document.querySelector(".weather");

// Function to fetch weather data
async function fetchWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    return {
      name: data.name,
      temp: data.main.temp,
      humidity: data.main.humidity,
      wind_speed: data.wind.speed,
      sky: data.weather[0].main,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}

// Function to display weather data
function displayWeatherData(data) {
  document.querySelector(".city").textContent = data.name;
  document.querySelector(".temp").textContent = `${Math.round(data.temp)}°c`;
  document.querySelector(".humidity").textContent = `${data.humidity}%`;
  document.querySelector(".wind").textContent = `${data.wind_speed} km/h`;

  // Update weather icon based on sky condition
  const weatherConditions = {
    Clouds: "clouds.png",
    Clear: "clear.png",
    Rain: "rain.png",
    Drizzle: "drizzle.png",
    Mist: "mist.png",
    Snow: "snow.png",
  };

  weatherIcon.src = `images/${weatherConditions[data.sky]}`;

  weatherElement.style.display = "block";
  errorElement.style.display = "none";
}

// Event listener for search button
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = searchBox.value.trim();

  if (!city) {
    alert("Please enter a city name");
    return;
  }

  loadingSpinner.style.display = "block";
  weatherElement.style.display = "none";
  errorElement.style.display = "none";

  try {
    const weatherData = await fetchWeather(city);
    displayWeatherData(weatherData);
  } catch (error) {
    errorElement.style.display = "block";
    weatherElement.style.display = "none";
  } finally {
    loadingSpinner.style.display = "none";
  }

  searchBox.value = "";
});
