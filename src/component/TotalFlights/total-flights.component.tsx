// src/component/TotalFlights/total-flights.component.tsx
import { FC, useEffect, useState } from "react";
import styles from "./total-flights.module.css";

export const TotalFlights: FC = () => {
    const [totalFlights, setTotalFlights] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:3000/airport/unique-count')
        .then((response) => response.json())
        .then(data => {
            console.log(data);
            setTotalFlights(data[0].total_flights)
            setLoading(false)
        }).catch((error) => {
            setLoading(false);
            setError(error)
        });
    }, []);

    return (
        <div className={styles.totalFlights}>
            {loading && <p>Loading total flights...</p>}
            {error && <p className={styles.error}>{error}</p>}
            {totalFlights !== null && (
                <div className={styles.totalFlightsContainer}>
                    <h2>Total Flights</h2>
                    <p className={styles.totalFlightsCount}>{totalFlights}</p>
                </div>
            )}
        </div>
    );
};
