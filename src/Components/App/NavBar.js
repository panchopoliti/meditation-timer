import React from 'react';
import ThemeToggler from './ThemeToggler.js';
import { ThemeContextConsumer } from '../../Context/ToggleContexts.js';
import styles from './css/NavBar.module.scss';

export default function NavBar() {

    return (
        <ThemeContextConsumer>
            {
                ({ theme }) => (
                    <ul className={styles[`${theme}NavBar`]}>
                        <li>
                            <ThemeToggler/>
                        </li>
                    </ul>
                )
            }
        </ThemeContextConsumer>
    )
}
