import { FC } from "react"
import styles from './Box.module.css';

interface Props {
    fill: boolean;
}

export const Box: FC<Props> = ({ fill }) => {
    return <div className={`${styles.box} ${fill ? styles.fill : ''}`}>
    </div>
}