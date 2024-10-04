import { ChangeEvent, FC } from "react";
import styles from './Input.module.css';

interface Props {
    label: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<Props> = ({ label, onChange }) => {
    return (
      <div className={styles.input}>
        <label>{label}</label>
        <input type="text" onChange={onChange} placeholder="Enter name or reg..." />
      </div>
    )
}