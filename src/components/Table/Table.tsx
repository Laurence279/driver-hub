import { FC } from "react";
import styles from './Table.module.css';
import { Box } from "../Box/Box";
import { Driver } from "@/types/drivers";

interface Props {
    drivers: Driver[];
    onView: (driverId: number) => void;
}

function sumMinutes(total: number, current: number) {
    return total + current;
  }

  function getDayName(dateStr: string)
  {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-GB', { weekday: 'long' });        
  }

const days: string[] = [
    "2021-02-01",
    "2021-02-02",
    "2021-02-03",
    "2021-02-04",
    "2021-02-05",
    "2021-02-06",
    "2021-02-07"
];

export const Table: FC<Props> = ({ drivers, onView }) => {
    return <table className={styles.table}>
        <thead>
            <tr>
                <th>Name</th>
                <th>Vehicle reg</th>
                <th>Total activity duration</th>
                <th>Week commencing {days[0]}</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {drivers.map((driver) => {
            return (
                <tr key={driver.id}>
                    <td>
                        {driver.surname.toUpperCase()} {driver.forename}
                    </td>
                    <td>
                        {driver.vehicleRegistration}
                    </td>
                    <td>
                        {driver.totalActivity} Minutes
                    </td>
                    <td>
                        <div className={styles.boxes}>
                            {days.map((day) => {
                                const label = getDayName(day);
                            return <Box key={`box-${day}`} label={label} fill={driver.daysActive.includes(day)} />
                            })}
                        </div>
                    </td>
                    <td>
                        <button onClick={() => onView(driver.id)}>
                            View more
                        </button>
                    </td>
                </tr>
            )
            })}
        </tbody>
    </table>
}