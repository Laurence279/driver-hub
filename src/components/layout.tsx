import Head from "next/head"
import React, { FC, PropsWithChildren } from "react"
import styles from './layout.module.css';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className={styles.layout}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header>
                <img src="https://placehold.co/200x75" alt="brand-logo" />
            </header>
            <nav>
                <ul>
                    <li>Nav Item</li>
                    <li>Nav Item</li>
                    <li>Nav Item</li>
                </ul>
            </nav>
            <main>{children}</main>
        </div>
    )
}