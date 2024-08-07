import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Container, Card, CardContent, IconButton, Tooltip } from '@mui/material';
import { Search as SearchIcon, LocationOn as LocationOnIcon, ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from '@mui/icons-material';
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

  useEffect(() => {
    updateCurrentTime();
    updateCurrentDate();
  }, []);

  const fetchWeather = async (city) => {
    try {
      const apiKey = '3ed565296c19775878a64c31457d90b2'; // Your API key
      const units = isCelsius ? 'metric' : 'imperial';
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`);
      const data = response.data;
      setWeather(data);
      setTemperatureInCelsius(data.main.temp);
      setTemperatureInFahrenheit(data.main.temp * 9 / 5 + 32);
      checkDayOrNight(data);
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

  const getWeatherIcon = () => {
    if (isDay) {
      switch (weather.weather?.[0]?.main) {
        case 'Clear':
          return '☀️';
        case 'Rain':
          return '🌧️';
        case 'Clouds':
          return '☁️';
        default:
          return '🌤️';
      }
    } else {
      return <span className="moon-icon">🌙</span>;
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

  return (
    <Container component="main" maxWidth="xs" className={`weather-container ${isDay ? 'day' : 'night'}`}>
      {!isDay && <div className="stars">{generateStars()}</div>}
      <Typography variant="h4" align="center">Weather in South Africa</Typography>
      <div className="city-input">
        <TextField 
          label="Enter a city" 
          variant="outlined" 
          fullWidth 
          value={city} 
          onChange={(e) => setCity(e.target.value)} 
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
      </div>
      <div className="current-location">
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={() => console.log('Get Current Location')} 
          startIcon={<LocationOnIcon />}
        >
          Get Current Location
        </Button>
      </div>
      <Typography variant="h1" align="center">{getWeatherIcon()}</Typography>
      <Typography variant="h6" align="center">{currentTime}</Typography>
      <Typography variant="h6" align="center">{currentDate}</Typography>
      <Typography variant="h6" align="center">{getDayOrNightMessage()}</Typography>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            {weather.name}, {weather.sys?.country}
          </Typography>
          <Typography variant="body1">
            Temperature: {isCelsius ? temperatureInCelsius : temperatureInFahrenheit}°{isCelsius ? 'C' : 'F'}
          </Typography>
          <Typography variant="body1">
            Humidity: {weather.main?.humidity}%
          </Typography>
        </CardContent>
      </Card>
      <Tooltip title="Toggle temperature unit">
        <IconButton onClick={handleUnitToggle}>
          {isCelsius ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        </IconButton>
      </Tooltip>
      <Typography variant="body2" align="center">
        Weather created by <a href="https://github.com/eungobs/my-projects">eungobs</a> - @2023
      </Typography>
    </Container>
  );
};

export default WeatherApp;







