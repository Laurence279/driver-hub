import { FC, useEffect } from "react"
import styles from "./Navbar.module.css"
import { NavItem } from "@/types/navItem";
import { useRouter } from "next/router";

interface Props {
    navItems: NavItem[];
}

export const Navbar: FC<Props> = ({ navItems }) => {
    const router = useRouter();
    return (
        <>
            <nav className={styles.navBar}>
                <ul>
                    {navItems.map(({ url, icon, title }) => {
                        return <li key={title}>
                            <a className={`${styles.navItem} ${router.asPath === url ? styles.isActive : ''}`} href={url}>
                            <span>
                                {icon}
                            </span>
                            <span>
                                {title}
                            </span>
                            </a>
                        </li>
                    })}
                </ul>
            </nav>
        </>
    )
}