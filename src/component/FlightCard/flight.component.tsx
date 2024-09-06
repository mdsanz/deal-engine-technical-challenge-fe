import { FC, useEffect, useState } from "react";
import { Flight } from "../../interfaces/flight.interface";
import styles from "./flight.module.css";
import { getWeatherForCity } from "../../services/weather.service";

interface FlightProps {
    flight: Flight;
}

export const FlightCard: FC<FlightProps> = ({ flight }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [originWeather, setOriginWeather] = useState<any>(null);
    const [destinationWeather, setDestinationWeather] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setIsExpanded(prev => !prev);
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
                        )
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

    return (
        <div className={styles.flightCard}>
            <div onClick={handleClick} className={styles.flightCardHeader}>
                <h3>
                    {flight.airline} {flight.flight_num}
                </h3>
                <p>
                    {flight.origin_name} ({flight.origin_iata_code}) →{" "}
                    {flight.destination_name} ({flight.destination_iata_code})
                </p>
            </div>

            {isExpanded && (
                <div className={styles.flightCardExpanded}>
                    {loading && <p>Loading...</p>}
                    {error && <p>{error}</p>}
                    {!loading && !error && originWeather && destinationWeather && (
                        <>
                            <p>
                                <strong>Origin Weather:</strong>{" "}
                                {originWeather ? `${originWeather.current.temp}°C` : "Data unavailable"}
                            </p>
                            <p>
                                <strong>Destination Weather:</strong>{" "}
                                {destinationWeather ? `${destinationWeather.current.temp}°C` : "Data unavailable"}
                            </p>
                            <p>
                                <strong>Origin Latitude/Longitude:</strong>{" "}
                                {flight.origin_latitude} / {flight.origin_longitude}
                            </p>
                            <p>
                                <strong>Destination Latitude/Longitude:</strong>{" "}
                                {flight.destination_latitude} / {flight.destination_longitude}
                            </p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};


