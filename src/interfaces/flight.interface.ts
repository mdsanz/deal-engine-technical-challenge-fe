export interface Flight {
    id: number;
    origin: string;
    destination: string;
    airline: string;
    flight_num: string;
    origin_iata_code: string;
    origin_name: string;
    origin_latitude: number;
    origin_longitude: number;
    destination_iata_code: string;
    destination_name: string;
    destination_latitude: number;
    destination_longitude: number;
}
