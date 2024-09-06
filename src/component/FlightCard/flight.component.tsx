import { FC, useEffect, useState } from "react";
import { Flight } from "../../interfaces/flight.interface";
import styles from "./flight.module.css";
import { getWeatherForCity } from "../../services/weather.service";
import { WeatherData } from "../../interfaces/weather.interface";

interface FlightProps {
    flight: Flight;
}

export const FlightCard: FC<FlightProps> = ({ flight }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [originWeather, setOriginWeather] = useState<WeatherData>();
    const [destinationWeather, setDestinationWeather] = useState<WeatherData>();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setIsExpanded((prev) => !prev);
    };

    useEffect(() => {
        const fetchWeather = async () => {
            if (isExpanded) {
                setLoading(true);
                setError(null);

                try {
                    const [originData, destinationData] = await Promise.all([
                        getWeatherForCity(
                            flight.origin_iata_code,
                            flight.origin_latitude,
                            flight.origin_longitude
                        ),
                        getWeatherForCity(
                            flight.destination_iata_code,
                            flight.destination_latitude,
                            flight.destination_longitude
                        ),
                    ]);
                    setOriginWeather(originData);
                    setDestinationWeather(destinationData);
                } catch {
                    setError("Error fetching weather data.");
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchWeather();
    }, [isExpanded, flight]);

    const renderWeatherDetails = (weatherData: WeatherData) => (
        <>
            <div className={styles.weatherIcon}>
                <img
                    src={`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`}
                    alt={weatherData.current.weather[0].description}
                />
            </div>
            <p className={styles.weatherDescription}>
                {weatherData.current.weather[0].main}: {weatherData.current.weather[0].description}
            </p>
            <p className={styles.weatherInfo}>
                <strong>Temperature:</strong> {Math.round(weatherData.current.temp - 273.15)}°C
            </p>
            <p className={styles.weatherInfo}>
                <strong>Humidity:</strong> {weatherData.current.humidity}%
            </p>
            <p className={styles.weatherInfo}>
                <strong>Wind Speed:</strong> {weatherData.current.wind_speed} m/s
            </p>
            <p className={styles.weatherInfo}>
                <strong>Cloudiness:</strong> {weatherData.current.clouds}%
            </p>
            <p className={styles.weatherInfo}>
                <strong>Visibility:</strong> {weatherData.current.visibility / 1000} km
            </p>
        </>
    );

    return (
        <div className={styles.flightCard}>
            <div onClick={handleClick} className={styles.flightCardHeader}>
                <div className={styles.title}>
                    <h3>Airline: {flight.airline}</h3>
                    <h4>Flight no. {flight.flight_num}</h4>
                </div>
                <div className={styles.description}>
                    <div>
                        <h5>Origin: {flight.origin_name}</h5>
                        <p>{flight.origin_iata_code}</p>
                    </div>
                    <div>
                        <h5>Destination: {flight.destination_name}</h5>
                        <p>{flight.destination_iata_code}</p>
                    </div>
                </div>
            </div>

            {isExpanded && (
                <div className={styles.flightCardExpanded}>
                    {loading && <p>Loading weather data...</p>}
                    {error && <p>{error}</p>}
                    {!loading && !error && originWeather && destinationWeather && (
                        <div className={styles.weatherDetails}>
                            <div className={styles.weatherSection}>
                                <h4>Origin Weather</h4>
                                {renderWeatherDetails(originWeather)}
                            </div>
                            <div className={styles.weatherSection}>
                                <h4>Destination Weather</h4>
                                {renderWeatherDetails(destinationWeather)}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};



