import React from 'react';
import PropTypes from 'prop-types';
import SettingsSVG from '../../static/Logos/cog-solid.svg';

function BelowClockContainer({ showTimer, numberToRing, handleModal }) {

    return(
        <div className='belowClockContainer'>
            <span className={`belowClockContainerInfo ${(showTimer) ? 'hidden' : '' }`} >    
                Ring every {numberToRing} {(numberToRing === 1) ? 'minute' : 'minutes'}
            </span>
            <div className='settingsContainer'>
                <button className='settingsLogoBtn' onClick={handleModal}>
                    <figure>
                        <img src={SettingsSVG} className='settingsLogo' alt='Settings Logo' height='20' width='20'/>
                    </figure>
                </button>
                <span className='tooltip'>Settings</span>
            </div>
        </div>
    );
}

BelowClockContainer.propTypes = {
    showTimer: PropTypes.bool,
    numberToRing: PropTypes.number,
    handleModal: PropTypes.func,
}

export default BelowClockContainer;