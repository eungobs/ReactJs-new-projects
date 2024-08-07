import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Container, Card, CardContent } from '@mui/material';
import { Search as SearchIcon, LocationOn as LocationOnIcon } from '@mui/icons-material';
import './WeatherApp.css';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [isCelsius, setIsCelsius] = useState(true);
  const [temperatureInCelsius, setTemperatureInCelsius] = useState(0);
  const [temperatureInFahrenheit, setTemperatureInFahrenheit] = useState(0);
  const [isDay, setIsDay] = useState(true);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [savedLocations, setSavedLocations] = useState([]);
  const [notificationPermission, setNotificationPermission] = useState(Notification.permission);

  useEffect(() => {
    updateCurrentTime();
    updateCurrentDate();
    requestNotificationPermission();
    getSavedLocations();

  }, []);

  const fetchWeather = async (city) => {
    try {
      const apiKey = '3ed565296c19775878a64c31457d90b2'; 
      const units = isCelsius ? 'metric' : 'imperial';
      const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`);
      const weatherData = weatherResponse.data;
      setWeather(weatherData);
      setTemperatureInCelsius(weatherData.main.temp);
      setTemperatureInFahrenheit(weatherData.main.temp * 9 / 5 + 32);
      
      const coordinates = {
        lat: weatherData.coord.lat,
        lon: weatherData.coord.lon
      };
      
      const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`);
      const forecastData = forecastResponse.data;
      setHourlyForecast(forecastData.hourly.slice(0, 8)); // Next 8 hours
      setDailyForecast(forecastData.daily.slice(1, 4)); // Next 3 days
      
      checkDayOrNight(weatherData);
      saveLocation(city);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleSearch = () => {
    if (city) {
      fetchWeather(city);
    }
  };

  const handleUnitToggle = () => {
    setIsCelsius(!isCelsius);
  };

  const updateCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    setCurrentTime(`Current Time: ${hours}:${minutes}`);
    setIsDay(now.getHours() >= 6 && now.getHours() < 18); // Assume day is from 6 AM to 6 PM
  };

  const updateCurrentDate = () => {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(now.toLocaleDateString('en-US', options));
  };

  const checkDayOrNight = (data) => {
    const sunrise = new Date(data.sys.sunrise * 1000);
    const sunset = new Date(data.sys.sunset * 1000);
    const now = new Date();
    setIsDay(now > sunrise && now < sunset);
  };

  const getWeatherIcon = (iconCode) => {
    // Map icon codes to emoji or use a weather icon library
    switch (iconCode) {
      case '01d':
        return '☀️'; // Clear sky
      case '01n':
        return '🌙'; // Clear sky night
      case '02d':
        return '🌤️'; // Few clouds day
      case '02n':
        return '☁️'; // Few clouds night
      case '03d':
      case '03n':
        return '☁️'; // Scattered clouds
      case '04d':
      case '04n':
        return '☁️'; // Broken clouds
      case '09d':
      case '09n':
        return '🌧️'; // Shower rain
      case '10d':
      case '10n':
        return '🌦️'; // Rain
      case '11d':
      case '11n':
        return '🌩️'; // Thunderstorm
      case '13d':
      case '13n':
        return '❄️'; // Snow
      case '50d':
      case '50n':
        return '🌫️'; // Mist
      default:
        return '🌈'; // Default weather icon
    }
  };

  const getDayOrNightMessage = () => {
    return isDay ? 'Day' : 'Night';
  };

  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 100; i++) {
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      stars.push(<div key={i} className="star" style={{ top: `${top}%`, left: `${left}%` }}></div>);
    }
    return stars;
  };

  const requestNotificationPermission = async () => {
    if (notificationPermission === 'default') {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
    }
  };

  const showNotification = (message) => {
    if (notificationPermission === 'granted') {
      new Notification('Weather Alert', {
        body: message,
        icon: 'weather-icon.png' 
      });
    }
  };

  const saveLocation = (location) => {
    const updatedLocations = [...savedLocations, location];
    localStorage.setItem('locations', JSON.stringify(updatedLocations));
    setSavedLocations(updatedLocations);
  };

  const getSavedLocations = () => {
    const locations = JSON.parse(localStorage.getItem('locations')) || [];
    setSavedLocations(locations);
  };

  const handleLocationChange = (e) => {
    const newCity = e.target.value;
    setCity(newCity);
    fetchWeather(newCity);
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoordinates(latitude, longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const fetchWeatherByCoordinates = async (lat, lon) => {
    try {
      const apiKey = '3ed565296c19775878a64c31457d90b2'; 
      const units = isCelsius ? 'metric' : 'imperial';
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`);
      const data = response.data;
      setWeather(data.current);
      setHourlyForecast(data.hourly.slice(0, 8));
      setDailyForecast(data.daily.slice(1, 4));
      checkDayOrNight(data.current);
    } catch (error) {
      console.error('Error fetching weather data by coordinates:', error);
    }
  };

  return (
    <Container component="main" maxWidth="lg" className={`weather-container ${isDay ? 'day' : 'night'}`}>
      {!isDay && <div className="stars">{generateStars()}</div>}
      <Typography variant="h4" align="center">Weather in South Africa</Typography>
      <div className="city-input">
        <TextField 
          label="Enter a city" 
          variant="outlined" 
          fullWidth 
          value={city} 
          onChange={handleLocationChange}
        />
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSearch} 
          startIcon={<SearchIcon />}
          style={{ marginTop: '10px' }}
        >
          Search
        </Button>
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={handleCurrentLocation} 
          startIcon={<LocationOnIcon />}
          style={{ marginTop: '10px' }}
        >
          Get Current Location
        </Button>
      </div>
      <Typography variant="h6" align="center">{currentDate}</Typography>
      <Typography variant="h6" align="center">{currentTime}</Typography>

      {weather && (
        <Card className="weather-details" style={{ marginTop: '20px' }}>
          <CardContent>
            <Typography variant="h5">{weather.weather[0].description}</Typography>
            <Typography variant="h6">
              Temperature: {isCelsius ? temperatureInCelsius : temperatureInFahrenheit}°{isCelsius ? 'C' : 'F'}
            </Typography>
            <Typography>Humidity: {weather.main.humidity}%</Typography>
            <Typography>Wind: {weather.wind.speed} {isCelsius ? 'm/s' : 'mph'}</Typography>
            <Typography>Precipitation: {weather.rain ? weather.rain['1h'] : '0'} mm</Typography>
            <Typography>Overview: {getDayOrNightMessage()}</Typography>
            <Typography>Weather Icon: {getWeatherIcon(weather.weather[0].icon)}</Typography>
          </CardContent>
        </Card>
      )}

      <div className="forecast hourly">
        <Typography variant="h6">Hourly Forecast</Typography>
        {hourlyForecast.map((hour, index) => (
          <div key={index} className="forecast-item">
            <Typography>{new Date(hour.dt * 1000).toLocaleTimeString()}</Typography>
            <Typography>{hour.temp}°C</Typography>
            <Typography>{hour.weather[0].description}</Typography>
            <Typography>{getWeatherIcon(hour.weather[0].icon)}</Typography>
          </div>
        ))}
      </div>

      <div className="forecast daily">
        <Typography variant="h6">Daily Forecast</Typography>
        {dailyForecast.map((day, index) => (
          <div key={index} className="forecast-item">
            <Typography>{new Date(day.dt * 1000).toLocaleDateString()}</Typography>
            <Typography>{day.temp.day}°C</Typography>
            <Typography>{day.weather[0].description}</Typography>
            <Typography>{getWeatherIcon(day.weather[0].icon)}</Typography>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default WeatherApp;

