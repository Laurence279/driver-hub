import { FC, PropsWithChildren } from "react";
import styles from './Table.module.css';
import { Box } from "../Box/Box";
import { Driver } from "@/types/drivers";

interface Props {
    drivers: Driver[];
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

export const Table: FC<Props> = ({ drivers }) => {
    return <table className={styles.table}>
        <thead>
            <tr>
                <th>Name</th>
                <th>Vehicle reg</th>
                <th>Total activity duration</th>
                <th>Week</th>
            </tr>
        </thead>
        <tbody>
            {drivers.map((driver) => {
            const activities = driver.traces.map(t => t.activity).flat();
            const totalHours = activities.map(a => a.duration).reduce(sumMinutes, 0);
            const daysActive = new Set(driver.traces.map(t => t.date));
            return (
                <tr key={driver.id}>
                    <td>
                        <span>{driver.surname.toUpperCase()} {driver.forename}</span>
                    </td>
                    <td>
                        <span>{driver.vehicleRegistration}</span>
                    </td>
                    <td>
                        <span>{totalHours} Minutes</span>
                    </td>
                    <td>
                        <div className="boxes">
                            {days.map((day) => {
                                const label = getDayName(day);
                            return <Box key={`box-${day}`} label={label[0]} fill={daysActive.has(day)} />
                            })}
                        </div>
                    </td>
                </tr>
            )
            })}
        </tbody>
    </table>
}