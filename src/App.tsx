import { Flights } from "./component/FlightList/flights.component";
import styles from "./App.module.css";
import { TotalFlights } from "./component/TotalFlights/total-flights.component";
import { UniqueFlights } from "./component/UniqueFlights/unique-flights.component";

function App() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Flight Information Dashboard</h1>
        <p className={styles.author}>by Marcos Sanchez</p>
      </header>
      <div className={styles.content}>
        <div className={styles.leftSection}>
          <TotalFlights />
          <UniqueFlights />
        </div>
        <div className={styles.rightSection}>
          <Flights />
        </div>
      </div>
    </div>
  );
}

export default App;
