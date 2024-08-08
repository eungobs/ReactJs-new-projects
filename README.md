# Fast-Track Weather App

## Overview

The **Fast-Track Weather App** is a real-time weather application built to provide users with up-to-date weather information. It took 2 days to develop this application, which includes features like current weather conditions, hourly and daily forecasts, location-based weather updates, severe weather alerts, and more. The app also supports multiple locations, customization options, and offline access.

## Features

### Real-time Weather Info
- **Current Weather Conditions**: Displays real-time data, including temperature, humidity, wind speed, and other weather metrics.
- **Hourly and Daily Forecasts**: Provides weather forecasts for the next few hours and days, allowing users to plan ahead.

### Location-Based Forecasting
- **Set Location Manually**: Users can enter their desired location to get weather information.
- **Automatic Location Detection**: The app automatically detects the user's current location and provides relevant weather data.

### Weather Alerts
- **Severe Weather Notifications**: Sends push notifications for severe weather alerts in the user's current location, helping users stay informed about potential dangers.

### Multiple Locations
- **Save Multiple Locations**: Users can save different locations and easily switch between them to check weather updates.
- **Quick Access**: Saved locations are stored for quick and easy access to weather information.

### Customisation
- **Theme Customisation**: Allows users to customize the app's appearance according to their preferences.
- **Units Customisation**: Users can toggle between Celsius and Fahrenheit for temperature display.

### Offline Access
- **Cached Weather Data**: The app caches weather data, allowing users to access previously fetched weather information even without an internet connection.

### Performance
- **Optimised Loading**: The app is optimized for fast loading and provides a smooth user experience, even with real-time data updates.

### Privacy & Security
- **User Data Protection**: Ensures that all user data is protected and adheres to relevant privacy laws and regulations.

## Technologies Used
- **React.js**: The core framework for building the user interface.
- **Material-UI**: Used for styling and UI components.
- **OpenWeatherMap API**: The API used to fetch real-time weather data.
- **Axios**: For making HTTP requests to the weather API.
- **Geolocation API**: To automatically detect the user's location.
- **LocalStorage**: Used for storing saved locations and cached weather data.

## Getting Started

### Prerequisites
- **Node.js**: Make sure you have Node.js installed on your machine.
- **npm**: Node package manager, which comes with Node.js.

### Installation
1. Clone the repository:
   
    git clone https://github.com/yourusername/fast-track-weather-app.git
  
2. Navigate to the project directory:

    cd fast-track-weather-app
  
3. Install the dependencies:
  
    npm install
    

### Running the Application
1. Start the development server:
   
    npm start
  
2. Open your browser and go to `http://localhost:3000` to see the app in action.

### Build for Production
To create a production-ready build:

npm run build

The build folder will contain the optimized production files.

Usage
Search for a Location: Use the search bar to enter a city and get weather information.
Use Current Location: Click on the "Use Current Location" button to get weather updates for your current location.
Switch Units: Toggle between Celsius and Fahrenheit using the unit switch button.
Save Locations: Save your favorite locations and easily switch between them from the saved locations list.
Receive Alerts: Ensure that notifications are enabled in your browser to receive severe weather alerts.
Screenshots

Future Improvements
Extended Forecasts: Implement support for 7-day or 10-day weather forecasts.
Interactive Maps: Add a feature for interactive weather maps showing precipitation, temperature, and other data layers.
User Accounts: Enable user accounts to sync saved locations across devices.
Dark Mode: Provide an option for dark mode to enhance usability in low-light conditions.
Contributing
Contributions are welcome! Please feel free to submit a Pull Request or open an issue for any bugs or feature requests.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgements
OpenWeatherMap for providing the weather API.
Material-UI for the design components.
React.js for the robust framework.

Author: Elizabeth Eunice Ndzukule