import { FC } from "react"
import styles from './Box.module.css';

interface Props {
    fill: boolean;
    label: string;
}

export const Box: FC<Props> = ({ fill, label }) => {
    return <div title={label}>
        <div className={styles.label}>{label[0]}</div>
        <div className={`${styles.box} ${fill ? styles.fill : ''}`}></div>
    </div>
}