
import { FC, useEffect, useState } from "react";
import styles from './Dialog.module.css';
import { api } from "@/common/api";
import { Activity } from "@/types/activity";
import { Driver } from "@/types/driver";

interface Props {
    driver?: Driver;
    open: boolean;
    onClose: () => void;
}

export const Dialog: FC<Props> = ({ driver, open, onClose }) => {
    const [activities, setActivities] = useState<Activity[]>();
    
    useEffect(() => {
        async function getActivities() {
            if (!driver) return;
            const activities = await api.getActivitiesByDriverId(driver.id);
            setActivities(activities);
        }

        if (driver) {
            getActivities();
        }
    }, [driver]);

    const days = new Set(activities?.map(a => a.day));

    return (
      <div className={`${styles.dialog} ${open ? styles.active : ''}`}>
        <div className={styles.wrapper}>
            <div className={styles.inner}>
                <div className={styles.header}>
                    Total activity: Driver No. {driver?.id} - {driver?.forename.toUpperCase()} {driver?.surname}
                </div> 
                <div className={styles.body}>
                    {activities && activities.length ? (
                        <>
                            {Array.from(days).map((d) => {
                                return <div className={styles.entry} key={d}>
                                        <strong>{new Date(d).toDateString()}</strong>
                                        {activities.filter(a => a.day === d).map((a, i) => {
                                            return <div key={a.day + "-" + i}><span>{a.type}:</span><span>{a.duration} Minutes</span></div>
                                        })}
                                    </div>
                            })}
                            <div><strong>Weekly total:</strong>{driver?.totalActivity} Minutes</div>
                        </>
                    ) : (
                        <div>No activity found for this driver.. Possibly on holiday?</div>
                    )}
                </div>
                <div className={styles.footer}>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
      </div>
    )
}