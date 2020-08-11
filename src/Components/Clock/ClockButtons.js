import React from 'react';
import PropTypes from 'prop-types';

function ClockButtons({firstButton, secondButton}){
    return (
        <div className='clockButtonsContainer'>
            <button 
                className={`clockButtons ${firstButton.className}`} 
                onClick={firstButton.onClick}
                ref={firstButton.ref}
            >
                {firstButton.text}
            </button>
            <button 
                className={`clockButtons ${secondButton.className}`} 
                onClick={secondButton.onClick}
                ref={secondButton.ref}
            >
                {secondButton.text}
            </button>
        </div>
    );
}

ClockButtons.propTypes = {
    firstButton: PropTypes.shape({
        onClick: PropTypes.func,
        text: PropTypes.string,
        className: PropTypes.string,
        ref: PropTypes.func,
    }),
    secondButton: PropTypes.shape({
        onClick: PropTypes.func,
        text: PropTypes.string,
        className: PropTypes.string,
        ref: PropTypes.func,
    })
};

export default ClockButtons;