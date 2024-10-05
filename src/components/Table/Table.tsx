import { FC } from "react";
import styles from './Table.module.css';
import { Box } from "../Box/Box";
import { Driver } from "@/types/driver";
import { days } from "@/common/days";
import { getDayName } from "@/common/helpers";

interface Props {
    drivers: Driver[];
    onView: (driverId: number) => void;
}

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