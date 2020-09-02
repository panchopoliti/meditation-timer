import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/ClockButtons.module.scss';
import { getClockMethod } from './clock-functions.js';
import { SizeContextConsumer } from '../../Context/ToggleContexts'

export default function ClockButtons({ methods, states, isTimerInZero, firstButtonRef }){

    let firstButton = getSettingsForButton(states.started, states.paused, methods, isTimerInZero);
    const addRef = { ref: firstButtonRef};
    firstButton = Object.assign(firstButton, addRef);

    const secondButton = {
        onClick: methods.stopClock,
        text: 'Reset',
        className: `${styles.dangerButton} ${(states.started) ? styles.animateToRight : styles.hideBtn}`
    }

    return (
        <SizeContextConsumer>
            {({ size }) => (
                <div className={`${styles.container} ${(size === 'big') ? styles.bigContainer : ''}`}>
                    <button 
                        className={`${styles.button} ${firstButton.className}`} 
                        onClick={firstButton.onClick}
                        ref={firstButton.ref}
                    >
                        {firstButton.text}
                    </button>
                    <button 
                        className={`${styles.button} ${secondButton.className}`} 
                        onClick={secondButton.onClick}
                        ref={secondButton.ref}
                    >
                        {secondButton.text}
                    </button>
                </div>
            )}
        </SizeContextConsumer>
    );
}

const getSettingsForButton = (clockStarted, clockPaused, onClickMethods, isTimerInZero) => {

    const clockMethod = getClockMethod(clockStarted, clockPaused, onClickMethods, isTimerInZero);

    const btnInfo = {
        onClick: clockMethod,
    };

    if (!clockStarted) {

        btnInfo.text = 'Start';
        btnInfo.className = `${(isTimerInZero) ? styles.notAllow : styles.startButton}`;


    } else if (!clockPaused) {

        btnInfo.text = 'Pause';
        btnInfo.className = `${styles.warningButton} ${styles.animateToLeft}`;

    } else {

        btnInfo.text = 'Continue';
        btnInfo.className = `${styles.successButton} ${styles.animateToLeft}`;
    }

    return btnInfo;
  
};

ClockButtons.propTypes = {
    methods: PropTypes.shape({
        stopClock: PropTypes.func,
        pauseClock: PropTypes.func,
        startClock: PropTypes.func,
    }),
    states: PropTypes.shape({
        started: PropTypes.bool,
        paused: PropTypes.bool,
    }),
    isTimerInZero: PropTypes.bool,
    firstButtonRef: PropTypes.func,
};