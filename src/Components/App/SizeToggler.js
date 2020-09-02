import React from 'react';
import { ThemeContextConsumer, SizeContextConsumer } from '../../Context/ToggleContexts.js';
import styles from './css/SizeToggler.module.scss';

export default function SizeToggler() {

    return (
        <ThemeContextConsumer>
            {({ theme }) => (
                <SizeContextConsumer>
                    {({ size, toggle }) => (
                    <div className={`${styles.container} ${(size === 'big') ? styles.bigContainer : ''}`}>
                        <button onClick={toggle} className={styles[`${theme}Button`]}>
                            {(size === 'big') ? 'Make it Small' : 'Make it Big' }
                        </button>
                    </div>
                    )}
                </SizeContextConsumer>
            )}
        </ThemeContextConsumer>
    );
    
}