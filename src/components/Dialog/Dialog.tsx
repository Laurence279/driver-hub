import { Activities, Activity, Driver, DriverDetails, GetDriverByIdResult } from "@/types/drivers";
import { FC, PropsWithChildren, useEffect, useRef, useState } from "react";
import styles from './Dialog.module.css';

interface Props {
    driver?: Driver;
    open: boolean;
    onClose: () => void;
}

export const Dialog: FC<Props> = ({ driver, open, onClose }) => {
    const [activities, setActivities] = useState<Activity[]>();
    
    useEffect(() => {
        driver && getActivities();
    }, [driver]);
    
    async function getActivities() {
        const res = await fetch(`/api/activities/${driver?.id}`);
        const data = await res.json() as GetDriverByIdResult;
        setActivities(data.activity);
    }

    return (
      <div className={`${styles.dialog} ${open ? styles.active : ''}`}>
        <div className={styles.inner}>
            <div className={styles.header}>
                Driver No. {driver?.id} - {driver?.forename.toUpperCase()} {driver?.surname}
            </div> 
            <div className={styles.body}>
                {activities && activities.length ? (
                    <>
                        {activities.map((a, i) => {
                            return <div key={a.type + "-" + i}><span>{a.type}:</span><span>{a.duration} Minutes</span></div>
                        })}
                        <br />
                        <div><span>Total:</span>{driver?.totalActivity} Minutes</div>
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
    )
}