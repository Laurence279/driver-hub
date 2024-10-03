import { FC } from "react"
import styles from "./Navbar.module.css"
import { NavItem } from "@/types/navItem";

interface Props {
    navItems: NavItem[];
}

export const Navbar: FC<Props> = ({ navItems }) => {
    return (
        <>
            <nav className={styles.navBar}>
                <ul>
                    {navItems.map(({ url, icon, title }) => {
                        return <li className={styles.navItem} key={title}>
                            <span>
                                {icon}
                            </span>
                            <a href={url}>{title}</a>
                        </li>
                    })}
                </ul>
            </nav>
        </>
    )
}