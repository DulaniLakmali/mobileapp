const apiKey = '28f2e687c1a6dd7d11bb6f9e61c49cbb'; // Replace with your OpenWeatherMap API key
const units = 'metric';  // 'metric' for Celsius or 'imperial' for Fahrenheit

// Function to handle the search bar input
function handleSearch() {
    const searchInput = document.getElementById('searchInput').value;
    const searchButton = document.getElementById('searchButton');
    
    if (searchInput.trim() === '') {
        searchButton.setAttribute('disabled', 'true');
    } else {
        searchButton.removeAttribute('disabled');
    }
}

// Function to search and display weather based on the input city
function searchWeather() {
    const city = document.getElementById('searchInput').value;
    if (city.trim() !== '') {
        getWeather(city);
    }
}

// Function to fetch weather for a selected city
function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherInfo = document.getElementById('weatherInfo');
            weatherInfo.style.display = 'block';
            const temp = data.main.temp;
            const description = data.weather[0].description;
            const windSpeed = data.wind.speed;

            weatherInfo.innerHTML = `
                <h3>Weather in ${city}</h3>
                <p>Temperature: ${temp}°C</p>
                <p>Description: ${description}</p>
                <p>Wind Speed: ${windSpeed} m/s</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            const weatherInfo = document.getElementById('weatherInfo');
            weatherInfo.style.display = 'block';
            weatherInfo.innerHTML = `<p>Sorry, we couldn't fetch the weather for ${city}. Please try again later.</p>`;
        });
}

// Predefined city buttons
document.querySelectorAll('.buttons button').forEach(button => {
    button.addEventListener('click', () => {
        getWeather(button.textContent);
    });
});