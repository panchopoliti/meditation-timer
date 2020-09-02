import React from 'react';
import PropTypes from 'prop-types';
import SettingsSVG from '../../static/Logos/cog-solid.svg';
import { ThemeContextConsumer, SizeContextConsumer } from '../../Context/ToggleContexts.js';
import styles from './css/BelowClockContainer.module.scss';

function BelowClockContainer({ showTimer, numberToRing, handleModal }) {

    return (
        <ThemeContextConsumer>
            {({ theme }) => (
                <SizeContextConsumer>
                    {({ size }) => (
                        <div className={`${styles.container} ${(size === 'big') ? styles.bigContainer : ''}`}>
                            <span className={`${styles[`${theme}ContainerInfo`]} ${(showTimer) ? styles.hidden : '' }`} >    
                                Ring every {numberToRing} {(numberToRing === 1) ? 'minute' : 'minutes'}
                            </span>
                            <div className={styles.settingsContainer}>
                                <button className={styles.settingsLogoBtn} onClick={handleModal}>
                                    <figure>
                                        <img 
                                            src={SettingsSVG}
                                            style={{ filter: (theme === 'light') ? 'invert(1)' : 'invert(0.1)'}}
                                            className={styles.settingsLogo} 
                                            alt='Settings Logo' 
                                            height='20' 
                                            width='20'
                                        />
                                    </figure>
                                </button>
                                <span className={styles.tooltip}>Settings</span>
                            </div>
                        </div>
                    )}
                </SizeContextConsumer>   
            )}
        </ThemeContextConsumer>
    );
}

BelowClockContainer.propTypes = {
    showTimer: PropTypes.bool,
    numberToRing: PropTypes.number,
    handleModal: PropTypes.func,
}

export default BelowClockContainer;