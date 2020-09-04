import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/TabButtons.module.scss';
import { SizeContextConsumer } from '../../Context/ToggleContexts.js';


export default function TabButtons({ classNames, handleClick, buttonsText, amountOfButtons, activeTab }) {

    let buttons = [];

    for (let i = 0; i < amountOfButtons; i++) {

        let buttonText = (buttonsText[i]) ? buttonsText[i] : 'Button';

        buttons.push(
            <button
                key={i}
                tabIndex={0}
                role='tab'
                aria-selected={(activeTab === i)}
                aria-controls={`Clock-${i + 1}`}
                className={
                    `${styles.buttons}
                    ${(activeTab === i) ? styles.btnSelected : ''}
                    ${(classNames.button) ? classNames.button : ''}`
                }
                onClick={() => handleClick(i)}
            >
                {buttonText}
            </button>
        )
    }

    return (
        <SizeContextConsumer>
            {({ size }) => (
                <div role='tablist' aria-label='Clocks tablist' className={
                    `${styles.container}
                    ${(size === 'big') ? styles.bigContainer : ''}
                    ${(classNames.container) ? classNames.container : ''}`}>
                    {buttons}
                </div>
            )}
        </SizeContextConsumer>
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