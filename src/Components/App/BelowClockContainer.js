import React from 'react';
import PropTypes from 'prop-types';
import SettingsSVG from '../../static/Logos/cog-solid.svg';
import { ThemeContextConsumer } from '../../ThemeContext.js';

function BelowClockContainer({ showTimer, numberToRing, handleModal }) {

    return (
        <ThemeContextConsumer>
            {
                ({ theme }) => (
                    <div className='belowClockContainer'>
                        <span className={`${theme}BelowClockContainerInfo ${(showTimer) ? 'hidden' : '' }`} >    
                            Ring every {numberToRing} {(numberToRing === 1) ? 'minute' : 'minutes'}
                        </span>
                        <div className='settingsContainer'>
                            <button className='settingsLogoBtn' onClick={handleModal}>
                                <figure>
                                    <img 
                                        src={SettingsSVG}
                                        style={{ filter: (theme === 'light') ? 'invert(1)' : 'invert(0.1)'}}
                                        className='settingsLogo' 
                                        alt='Settings Logo' 
                                        height='20' 
                                        width='20'
                                    />
                                </figure>
                            </button>
                            <span className='tooltip'>Settings</span>
                        </div>
                    </div>
                )
            }
        </ThemeContextConsumer>
    );
}

BelowClockContainer.propTypes = {
    showTimer: PropTypes.bool,
    numberToRing: PropTypes.number,
    handleModal: PropTypes.func,
}

export default BelowClockContainer;