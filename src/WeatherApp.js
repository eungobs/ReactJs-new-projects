import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Card, CardContent, Box } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import Popup from './Popup'; // Import the Popup component
import './WeatherApp.css';  // Ensure the CSS is imported

const WeatherContainer = styled(Box)(({ isDay }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: '20px',
  background: isDay
    ? 'url(https://img.freepik.com/free-photo/photorealistic-style-clouds_23-2151058945.jpg?t=st=1723102422~exp=1723106022~hmac=27b6168a7603409ee9e910f116514487648654455e13418e44fe7651a1e0d50c&w=826) no-repeat center center fixed'
    : 'url(https://img.freepik.com/free-vector/night-landscape-with-starry-sky-design_1048-20428.jpg?t=st=1723132847~exp=1723136447~hmac=1fac52010109d82bc4353b8e5c28741aa04999acb75be2493189e9a1e540749c&w=900) no-repeat center center fixed',
  backgroundSize: 'cover',
  color: '#333',
  fontFamily: 'Roboto, sans-serif',
  textAlign: 'center',
}));

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [isCelsius, setIsCelsius] = useState(true);
  const [temperatureInCelsius, setTemperatureInCelsius] = useState(0);
  const [temperatureInFahrenheit, setTemperatureInFahrenheit] = useState(0);
  const [isDay, setIsDay] = useState(true);
  const [notificationPermission, setNotificationPermission] = useState(Notification.permission);
  const [showPopup, setShowPopup] = useState(true); // State to manage popup visibility

  const fetchWeatherByCoordinates = useCallback(async (lat, lon) => {
    try {
      const apiKey = '3ed565296c19775878a64c31457d90b2';
      const units = isCelsius ? 'metric' : 'imperial';
      const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`);
      const weatherData = weatherResponse.data;
      setWeather(weatherData);
      setTemperatureInCelsius(weatherData.main.temp);
      setTemperatureInFahrenheit(weatherData.main.temp * 9 / 5 + 32);

      checkDayOrNight(weatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }, [isCelsius]);

  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`Current Time: ${hours}:${minutes}`);
      setIsDay(now.getHours() >= 6 && now.getHours() < 18);
    };

    const updateCurrentDate = () => {
      const now = new Date();
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      setCurrentDate(now.toLocaleDateString('en-US', options));
    };

    const requestNotificationPermission = async () => {
      if (notificationPermission === 'default') {
        const permission = await Notification.requestPermission();
        setNotificationPermission(permission);
      }
    };

    const detectCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherByCoordinates(latitude, longitude);
          },
          (error) => {
            console.error('Error getting current location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    updateCurrentTime();
    updateCurrentDate();
    requestNotificationPermission();
    detectCurrentLocation(); // Detect location on component mount
  }, [fetchWeatherByCoordinates, notificationPermission]);

  const fetchWeather = async (city) => {
    try {
      const apiKey = '3ed565296c19775878a64c31457d90b2';
      const units = isCelsius ? 'metric' : 'imperial';
      const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`);
      const weatherData = weatherResponse.data;
      setWeather(weatherData);
      setTemperatureInCelsius(weatherData.main.temp);
      setTemperatureInFahrenheit(weatherData.main.temp * 9 / 5 + 32);

      checkDayOrNight(weatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const checkDayOrNight = (data) => {
    const sunrise = new Date(data.sys.sunrise * 1000);
    const sunset = new Date(data.sys.sunset * 1000);
    const now = new Date();
    setIsDay(now > sunrise && now < sunset);
  };

  const getDayOrNightMessage = () => {
    return isDay ? 'It\'s a beautiful day!' : 'Good evening!';
  };

  const handleSearch = () => {
    if (city) {
      fetchWeather(city);
    }
  };

  const handleUnitToggle = () => {
    setIsCelsius(!isCelsius);
  };

  const getWeatherConditionEmoji = () => {
    if (weather.weather && weather.weather.length > 0) {
      const description = weather.weather[0].description.toLowerCase();
      if (description.includes('clear') || description.includes('sunny')) {
        return '☀️';
      }
      if (description.includes('cloudy') || description.includes('overcast')) {
        return '☁️';
      }
      if (description.includes('rain') || description.includes('drizzle')) {
        return '🌧️';
      }
      if (description.includes('snow')) {
        return '❄️';
      }
      if (description.includes('thunderstorm')) {
        return '⛈️';
      }
    }
    return '🌈';
  };

  const getPrecipitation = () => {
    if (weather.rain) {
      return `Rain: ${weather.rain['1h']} mm`;
    }
    if (weather.snow) {
      return `Snow: ${weather.snow['1h']} mm`;
    }
    return 'No precipitation';
  };

  const getWeatherIcon = () => {
    if (weather.weather && weather.weather.length > 0) {
      const iconCode = weather.weather[0].icon;
      return `http://openweathermap.org/img/wn/${iconCode}.png`;
    }
    return '';
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  return (
    <WeatherContainer isDay={isDay}>
      <TextField
        label="City"
        variant="outlined"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
        sx={{ mb: 2, width: '300px' }}
      />
      <Button
        variant="contained"
        color="primary"
        endIcon={<SearchIcon />}
        onClick={handleSearch}
        sx={{ mb: 2 }}
      >
        Search
      </Button>
      <Button
        variant="outlined"
        onClick={handleUnitToggle}
        sx={{ mb: 2 }}
      >
        Switch to {isCelsius ? 'Fahrenheit' : 'Celsius'}
      </Button>
      <Card sx={{ minWidth: 275, textAlign: 'center' }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {weather.name}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {getWeatherConditionEmoji()}
          </Typography>
          {weather.main && (
            <>
              <Typography variant="h6">
                Temperature: {isCelsius ? temperatureInCelsius.toFixed(1) : temperatureInFahrenheit.toFixed(1)}°{isCelsius ? 'C' : 'F'}
              </Typography>
              <Typography variant="body2">
                High: {isCelsius ? weather.main.temp_max.toFixed(1) : (weather.main.temp_max * 9 / 5 + 32).toFixed(1)}°{isCelsius ? 'C' : 'F'} / Low: {isCelsius ? weather.main.temp_min.toFixed(1) : (weather.main.temp_min * 9 / 5 + 32).toFixed(1)}°{isCelsius ? 'C' : 'F'}
              </Typography>
              <Typography variant="body2">
                Humidity: {weather.main.humidity}%
              </Typography>
              <Typography variant="body2">
                Wind Speed: {weather.wind ? weather.wind.speed : 'N/A'} {isCelsius ? 'm/s' : 'mph'}
              </Typography>
            </>
          )}
          <Typography variant="body2">
            {getPrecipitation()}
          </Typography>
          <Typography variant="body2">
            {getDayOrNightMessage()}
          </Typography>
          <Typography variant="body2">
            {currentTime}
          </Typography>
          <Typography variant="body2">
            {currentDate}
          </Typography>
          <img src={getWeatherIcon()} alt="Weather icon" />
        </CardContent>
      </Card>
      {showPopup && <Popup open={showPopup} onClose={handlePopupClose} />} {/* Show popup when showPopup is true */}
    </WeatherContainer>
  );
};

export default WeatherApp;
