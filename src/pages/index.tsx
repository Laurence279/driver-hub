import json from "@/data/drivers.json";
import { Driver } from "@/types/drivers";

export default function Home() {
  const drivers = json.data as Driver[]; 
  return (
    <>
      <ul>
        {drivers.map((driver) => {
          return (
            <div key={driver.driverID} className="card">
              <span>{driver.surname.toUpperCase()} {driver.forename}</span>
              <span>{driver.vehicleRegistration}</span>
              <span>999 Hours</span>
              <div className="boxes">
                <div>M</div>
                <div>T</div>
                <div>W</div>
                <div>T</div>
                <div>F</div>
                <div>S</div>
                <div>S</div>
              </div>
            </div>
          )
        })}
      </ul>
    </>
  );
}