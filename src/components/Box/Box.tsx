import { FC } from "react"
import styles from './Box.module.css';

interface Props {
    fill: boolean;
    label: string;
}

export const Box: FC<Props> = ({ fill, label }) => {
    return <div>
        <div className={styles.label}>{label}</div>
        <div className={`${styles.box} ${fill ? styles.fill : ''}`}></div>
    </div>
}