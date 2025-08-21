// Weather API Integration
class WeatherService {
    constructor() {
        this.apiKey = 'YOUR_WEATHER_API_KEY'; // Replace with actual API key
        this.baseUrl = 'https://api.openweathermap.org/data/2.5';
    }
    
    async getCurrentWeather(lat, lon) {
        try {
            const response = await fetch(`${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching current weather:', error);
            return null;
        }
    }
    
    async getForecast(lat, lon) {
        try {
            const response = await fetch(`${this.baseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&cnt=5`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching forecast:', error);
            return null;
        }
    }
    
    async getWeatherByCity(city) {
        try {
            const response = await fetch(`${this.baseUrl}/weather?q=${city}&appid=${this.apiKey}&units=metric`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching weather by city:', error);
            return null;
        }
    }
    
    getWeatherIcon(iconCode) {
        const icons = {
            '01d': 'sun',
            '01n': 'moon',
            '02d': 'cloud-sun',
            '02n': 'cloud-moon',
            '03d': 'cloud',
            '03n': 'cloud',
            '04d': 'cloud',
            '04n': 'cloud',
            '09d': 'cloud-rain',
            '09n': 'cloud-rain',
            '10d': 'cloud-sun-rain',
            '10n': 'cloud-moon-rain',
            '11d': 'bolt',
            '11n': 'bolt',
            '13d': 'snowflake',
            '13n': 'snowflake',
            '50d': 'smog',
            '50n': 'smog'
        };
        return icons[iconCode] || 'question';
    }
}

// Initialize weather service
const weatherService = new WeatherService();

// Geolocation functions
function getLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => resolve(position.coords),
                error => reject(error)
            );
        } else {
            reject(new Error('Geolocation is not supported by this browser.'));
        }
    });
}

// Update weather display
async function updateWeatherDisplay() {
    try {
        const coords = await getLocation();
        const weather = await weatherService.getCurrentWeather(coords.latitude, coords.longitude);
        const forecast = await weatherService.getForecast(coords.latitude, coords.longitude);
        
        if (weather && forecast) {
            displayWeather(weather, forecast);
        }
    } catch (error) {
        console.error('Error getting weather:', error);
        // Fallback to default city
        const weather = await weatherService.getWeatherByCity('New York');
        if (weather) {
            displayWeather(weather);
        }
    }
}

function displayWeather(weather, forecast = null) {
    const weatherLocation = document.getElementById('weatherLocation');
    const weatherTemp = document.getElementById('weatherTemp');
    const weatherIcon = document.getElementById('weatherIcon');
    const weatherDesc = document.getElementById('weatherDesc');
    const weatherWind = document.getElementById('weatherWind');
    const weatherHumidity = document.getElementById('weatherHumidity');
    const weatherLow = document.getElementById('weatherLow');
    const weatherHigh = document.getElementById('weatherHigh');
    const weatherForecast = document.getElementById('weatherForecast');
    
    // Current weather
    weatherLocation.textContent = `${weather.name}, ${weather.sys.country}`;
    weatherTemp.textContent = `${Math.round(weather.main.temp)}°`;
    weatherIcon.innerHTML = `<i class="fas fa-${weatherService.getWeatherIcon(weather.weather[0].icon)}"></i>`;
    weatherDesc.textContent = weather.weather[0].description;
    weatherWind.textContent = `${Math.round(weather.wind.speed * 3.6)} km/h`;
    weatherHumidity.textContent = `${weather.main.humidity}%`;
    weatherLow.textContent = `${Math.round(weather.main.temp_min)}°`;
    weatherHigh.textContent = `${Math.round(weather.main.temp_max)}°`;
    
    // Forecast
    if (forecast) {
        weatherForecast.innerHTML = '';
        forecast.list.forEach(item => {
            const date = new Date(item.dt * 1000);
            const day = date.toLocaleDateString('en', { weekday: 'short' });
            const icon = weatherService.getWeatherIcon(item.weather[0].icon);
            const temp = Math.round(item.main.temp);
            
            const forecastItem = document.createElement('div');
            forecastItem.className = 'forecast-item';
            forecastItem.innerHTML = `
                <div class="forecast-day">${day}</div>
                <div class="forecast-icon"><i class="fas fa-${icon}"></i></div>
                <div class="forecast-temp">${temp}°</div>
            `;
            weatherForecast.appendChild(forecastItem);
        });
    }
}

// Initialize weather when widget is shown
document.getElementById('weatherBtn').addEventListener('click', updateWeatherDisplay);