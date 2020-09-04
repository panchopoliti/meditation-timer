import React from 'react';
import PropTypes from 'prop-types';
import Clock from './Clock.js'
import styles from './css/Timer.module.scss';
import { isNaturalNumber } from '../../generalFunctions.js';
import { solveExcessInTimeUnitsOfTwoDigits } from './clock-functions.js';


class Timer extends React.Component {

    constructor(props) {
        super(props);

        this.inputClockRef = React.createRef();

        const { 
            seconds: initialSeconds,
            minutes: initialMinutes,
            hours: initialHours, 
            } = this.props;

        this.state = {
            inputValue: '',
            focusOnInput: false,
            inputSeconds: initialSeconds,
            inputMinutes: initialMinutes,
            inputHours: initialHours,
            clickedInClockContainer: false,
            numberClicked: null,
        };
    }

    onInputChange = (ev) => {

        const isValidNumber = isNaturalNumber(ev.target.value);
        if (!isValidNumber) return;
        
        const value = ev.target.value.toString();

        if (value) {

            const timeToSet = {
                seconds: (value[value.length - 2] || 0) + (value[value.length - 1] || 0),
                minutes: (value[value.length - 4] || 0) + (value[value.length - 3] || 0),
                hours: (value[value.length -6] || 0) + (value[value.length -5] || 0),
            };

            const inputValue = (value.length >= 7) ? value.slice(value.length - 6, value.length) : value;
        
            this.setState({ 
                inputValue: inputValue,
                inputSeconds: +timeToSet.seconds,
                inputMinutes: +timeToSet.minutes,
                inputHours: +timeToSet.hours,
            });
        } else {
            this.setState({
                inputValue: '',
                inputSeconds: 0,
                inputMinutes: 0,
                inputHours: 0,
            })
        }
    };

    changeTimerNumbers = () => {
        const { inputSeconds, inputMinutes, inputHours} = this.state;
        const { seconds, minutes, hours} = solveExcessInTimeUnitsOfTwoDigits(inputSeconds, inputMinutes, inputHours);

        this.setState({ 
            inputSeconds: seconds,
            inputMinutes: minutes,
            inputHours: hours,
        });
    }

    handleOnInputFocus = (focusOnInput = !this.state.focusOnInput) => {

        if (!focusOnInput) {
            this.changeTimerNumbers();
        }

        if (!focusOnInput && document.activeElement === this.inputClockRef.current) {
            this.inputClockRef.current.blur();
        }

        this.setState({ 
            focusOnInput: focusOnInput,
            inputValue: '',
        });
    };

    setPositionOfCursorInInput = position => {
        if (!this.state.inputValue.length) return;

        const value = this.state.inputValue.length - position;
        this.inputClockRef.current.setSelectionRange(value, value);
    }

    handleOnBlur = () => {

        if (document.activeElement === this.inputClockRef.current) return; 
        //Avoid losing focus when changing tab or going out of browser

        if (this.state.clickedInClockContainer) {

            this.setState({ clickedInClockContainer: false });
            return;
        }

        this.handleOnInputFocus(false);
        this.setState({ numberClicked: null })

        return;
    }

    handleOnFocus = () => {
        
        if (!this.state.focusOnInput) {

            this.handleOnInputFocus(true);
            this.inputClockRef.current.focus();

            return;
        }
    }

    handleOnMouseDown = () => {
        if (!this.state.clickedInClockContainer) this.setState({ clickedInClockContainer: true });
    }

    handleOnClick = (ev) => {

        if (ev.target.nodeName === 'SPAN') this.setState({ numberClicked: ev.target });
        
        if (!this.state.focusOnInput) this.handleOnInputFocus(true);

        this.inputClockRef.current.focus();
        this.setState({ clickedInClockContainer: false });

    }

    handleClockEvents = (ev) => {

        const eventsHandlers = {
            'blur': this.handleOnBlur,
            'click': this.handleOnClick,
            'focus': this.handleOnFocus,
            'mousedown': this.handleOnMouseDown,
        }

        const getEventHandler = (event) => eventsHandlers[event];
        const handler = getEventHandler(ev.type);

        return handler(ev);

    };
   
    render () {
        
        const { 
            focusOnInput, 
            inputValue,
            inputHours,
            inputMinutes,
            inputSeconds,
            numberClicked,
        } = this.state;

        return (
            <Clock
                hours={inputHours} 
                minutes={inputMinutes} 
                seconds={inputSeconds} 
                isCountDown={true}
                numberClicked={numberClicked}
                focusOnInput={focusOnInput}
                inputValueLength={inputValue.length}
                handleClockEvents={this.handleClockEvents}
                handleOnInputFocus={this.handleOnInputFocus}
                bellStarting={this.props.bellStarting}
                keyPressed={this.props.keyPressed}
                setPositionOfCursorInInput={this.setPositionOfCursorInInput}
                setHoursInClock={this.props.setHoursInClock}
                hoursDisplayedInClock={this.props.hoursDisplayedInClock}
                timeInactivity={this.props.timeInactivity}
                ariaIdForContainer={this.props.ariaIdForContainer}
            >
                <input
                    tabIndex={0}
                    ref={this.inputClockRef}
                    onBlur={this.handleClockEvents}
                    onFocus={this.handleClockEvents}
                    inputMode='numeric'
                    type='text'
                    onChange={this.onInputChange}
                    className={styles.hiddenInput}
                    value={inputValue}
                    aria-hidden="true"
                />
            </Clock>
        );  
    }       
}


Timer.propTypes = {
    seconds: PropTypes.number,
    minutes: PropTypes.number,
    hours: PropTypes.number,
    bellStarting: PropTypes.func,
    keyPressed: PropTypes.string,
    hoursDisplayedInClock: PropTypes.object,
    timeInactivity: PropTypes.shape({
        start: PropTypes.number,
        inactivityInSeconds: PropTypes.number,
        isWindowTabActive: PropTypes.bool,
    }),
    ariaIdForContainer: PropTypes.string,
};

export default Timer;
