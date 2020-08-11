import React from 'react';
import PropTypes from 'prop-types';

function TabButtons({ classNames, handleClick, buttonsText, amountOfButtons, activeTab }) {

    let buttons = [];

    for (let i = 0; i < amountOfButtons; i++) {

        let buttonText = (buttonsText[i]) ? buttonsText[i] : 'Button';

        buttons.push(
            <button
                key={i}
                tabIndex={0}
                role='tab'
                aria-selected={(activeTab === i)}
                aria-controls={`clock${i + 1}`}
                className={`buttons ${(classNames.button) ? classNames.button : ''} ${(classNames.buttons[i] ? classNames.buttons[i] : '')}`}
                onClick={() => handleClick(i)}
            >
                {buttonText}
            </button>
        )
    }

    return (
        <div role='tablist' aria-label='Clocks tablist' className={`btnsContainer ${(classNames.container) ? classNames.container : ''}`}>
            {buttons}
        </div>
    );
}

TabButtons.propTypes = {
    activeTab: PropTypes.number,
    handleClick: PropTypes.func,
    amountOfButtons: PropTypes.number,
    buttonsText: PropTypes.arrayOf(PropTypes.string),
    classNames: PropTypes.shape({
        container: PropTypes.string,
        button: PropTypes.string,
        buttons: PropTypes.arrayOf(PropTypes.string),
    }),
};

TabButtons.defaultProps = {
    amountOfButtons: 2,
    classNames: {
        container: '',
        button: '',
        buttons: [''],
    },
}

export default TabButtons;