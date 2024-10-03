import { FC } from "react"
import styles from "./Header.module.css"
import Image from "next/image";

interface Props {
    logoSrc: string;
}

export const Header: FC<Props> = ({ logoSrc }) => {
    return <header className={styles.header}>
        <Image className={styles.logo} width={300} height={75} src={logoSrc} alt="brand-logo" />
    </header>
}