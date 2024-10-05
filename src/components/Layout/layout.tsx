import Head from "next/head"
import React, { FC, PropsWithChildren } from "react"
import styles from './layout.module.css';
import { Header } from "@/components/Header/Header";
import { Navbar } from "@/components/Navbar/Navbar";
import { navItems } from "@/common/navItems";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className={styles.layout}>
            <Head>
                <title>Driver Hub</title>
                <meta name="description" content="Logistics UK - Driver Hub" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header logoSrc="/images/logo.png" />
            <main className={styles.main}>
                <Navbar navItems={navItems} />
                <div>{children}</div>
            </main>
        </div>
    )
}