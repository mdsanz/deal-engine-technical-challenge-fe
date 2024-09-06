import { useEffect, useState } from "react";
import { Flight } from "../../interfaces/flight.interface";
import { FlightCard } from "../FlightCard/flight.component";
import styles from "./flights.module.css";

export const Flights = () => {
    const [flights, setFlights] = useState<Flight[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch("http://localhost:3000/airport/")
            .then((response) => response.json())
            .then((data) => {
                console.log("si paso?")
                setFlights(data);
                setLoading(false);
            })
            .catch((error) => console.error("Error fetching flights:", error));
    }, []);

    if (loading) {
        return <p>Loading flights...</p>;
    }

    return (
        <div className={styles.flightList}>
            {flights.map((flight) => (
                <FlightCard 
                    key={`${flight.flight_num}-${flight.origin}-${flight.destination}`}
                    flight={flight}
                />
            ))}
        </div>
    );
};
