import { useEffect, useState } from "react";
import { Flight } from "../../interfaces/flight.interface";
import { FlightCard } from "../FlightCard/flight.component";
import styles from "./flights.module.css";

export const Flights = () => {
    const [flights, setFlights] = useState<Flight[]>([]);
    const [page, setPage] = useState<number>(1);
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false); // Para manejar el estado de "cargar más"

    useEffect(() => {
        setIsLoadingMore(true);
        fetch(`http://localhost:3000/airport?page=${page}`)
            .then((response) => response.json())
            .then((data) => {
                setFlights((prevFlights) => [...prevFlights, ...data]); 
                setIsLoadingMore(false); 
            })
            .catch(() => {
                setIsLoadingMore(false);
            });
    }, [page]);

    const handleLoadMore = () => {
        setIsLoadingMore(true);
        setPage((prevPage) => prevPage + 1); 
    };

    return (
        <>
            <div className={styles.flightList}>
                {flights.map((flight) => (
                    <FlightCard key={flight.id} flight={flight} />
                ))}
            </div>
            <button
                onClick={handleLoadMore}
                className={styles.loadMoreButton}
                disabled={isLoadingMore}
            >
                {isLoadingMore ? "Loading..." : "Ver más"}
            </button>
        </>
    );
};

