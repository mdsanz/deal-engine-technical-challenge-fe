// src/component/UniqueFlights/unique-flights.component.tsx
import { FC, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import styles from "./unique-flights.module.css";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface UniqueFlightData {
    origin: string;
    destination: string;
    count: number;
}

export const UniqueFlights: FC = () => {
    const [flightData, setFlightData] = useState<UniqueFlightData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUniqueFlights = async () => {
            try {
                const response = await fetch("http://localhost:3000/airport/count-by-origin-destination"); // Actualiza la URL de la API
                const data: UniqueFlightData[] = await response.json();
                setFlightData(data);
            } catch {
                setError("Error fetching unique flights data.");
            } finally {
                setLoading(false);
            }
        };

        fetchUniqueFlights();
    }, []);

    // Datos para la gráfica
    const chartData = {
        labels: flightData.map((flight) => `${flight.origin} → ${flight.destination}`),
        datasets: [
            {
                label: "Número de vuelos únicos",
                data: flightData.map((flight) => flight.count),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false, // Desactiva la relación de aspecto para ajustar la altura
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: "Número de vuelos únicos por ruta",
            },
        },
    };

    return (
        <div className={styles.uniqueFlights}>
            {loading && <p>Loading unique flights...</p>}
            {error && <p className={styles.error}>{error}</p>}
            {!loading && !error && (
                <>
                    <div className={styles.chartContainer}>
                        <Bar data={chartData} options={chartOptions} />
                    </div>

                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Origen</th>
                                <th>Destino</th>
                                <th>Número de Vuelos</th>
                            </tr>
                        </thead>
                        <tbody>
                            {flightData.map((flight, index) => (
                                <tr key={index}>
                                    <td>{flight.origin}</td>
                                    <td>{flight.destination}</td>
                                    <td>{flight.count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};
