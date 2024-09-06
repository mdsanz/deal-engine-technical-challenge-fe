import { WeatherData } from "../interfaces/weather.interface";

let weatherCache: Record<string, WeatherData> = {};

const cachedWeather = localStorage.getItem('weatherCache');
if (cachedWeather) {
  try {
    weatherCache = JSON.parse(cachedWeather);
  } catch (error) {
    console.error('Failed to parse cached weather data:', error);
  }
}

export const getWeatherForCity = async (cityCode: string, latitude: number, longitude: number) => {
  if (weatherCache[cityCode]) {
    return weatherCache[cityCode];
  }

  const apiKey = '67bf9065e49c8b67cdbee698fb651a8f';
  const response = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
  );

  if (!response.ok) {
    throw new Error(`API getWeatherForCity request failed with status ${response.status}`);
  }

  const weatherData: WeatherData = await response.json();

  weatherCache[cityCode] = weatherData;

  localStorage.setItem('weatherCache', JSON.stringify(weatherCache));

  return weatherData;
};
