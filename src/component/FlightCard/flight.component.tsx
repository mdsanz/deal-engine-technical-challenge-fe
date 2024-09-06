import { FC } from "react"
import { Flight } from "../../interfaces/flight.interface"
import styles from "./flight.module.css";

interface FlightProps {
    flight: Flight
} 

export const FlightCard: FC<FlightProps> = ({ flight }) => {
    return <div className={styles.flightCard}>
        <h3>{flight.airline} Flight {flight.flight_num}</h3>
        <div className={styles.fligthDetails}>
            <p>
                <strong>Origin:</strong> {flight.origin_name} ({flight.origin_iata_code})
            </p>
            <p>
                <strong>Destination:</strong> {flight.destination_name} ({flight.destination_iata_code})
            </p>
            <p>
                <strong>Airline:</strong> {flight.airline}
            </p>
            <p>
                <strong>Flight Number:</strong> {flight.flight_num}
            </p>
        </div>
    </div>
}