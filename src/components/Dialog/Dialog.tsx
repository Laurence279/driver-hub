
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

    const totalGroupedActivityType = activities && activities.reduce((a: Record<string, number>, { type, duration }) => {
        a[type] = (a[type] || 0) + duration;
        return a;
    }, {});

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
                                            return <div key={a.day + "-" + i}><span>{a.type}:</span><span>{a.duration} minutes</span></div>
                                        })}
                                    </div>
                            })}
                            <div className={styles.entry}>
                                <strong>Weekly totals</strong>
                                {totalGroupedActivityType && Array.from(Object.keys(totalGroupedActivityType).sort()).map((type) => {
                                    return <div key={type}><span>{type}:</span><span>{totalGroupedActivityType[type]} minutes</span></div>
                                })}
                                <div><strong>Total:</strong><strong>{driver?.totalActivity} minutes</strong></div>
                            </div>
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