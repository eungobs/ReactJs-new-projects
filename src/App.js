import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import WeatherApp from './WeatherApp';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Primary color for buttons and highlights
    },
    secondary: {
      main: '#dc004e', // Secondary color for buttons
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <WeatherApp />
    </ThemeProvider>
  );
}

export default App;


