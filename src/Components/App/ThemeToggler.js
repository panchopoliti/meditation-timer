import React from 'react';
import { ThemeContextConsumer } from '../../Context/ToggleContexts.js';
import styles from './css/ThemeToggler.module.scss';

export default function ThemeToggler () {
    
    return (
        <ThemeContextConsumer>
            {
                ({ theme, toggle }) => (
                    <div className={styles.container}>
                        <button
                            onClick={toggle} 
                            className={styles[`${theme}Button`]}
                            aria-pressed={(theme === 'dark')}
                            aria-label={'Toggle Theme of Website'}
                        >
                        </button>
                    </div>
                )
            }
        </ThemeContextConsumer>
    )
}