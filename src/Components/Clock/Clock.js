import React from 'react';
import PropTypes from 'prop-types';
import './clock.scss';
import { NumbersOfClock, ClockLabels, ClockButtons } from './index.js';
import { noop } from '../../generalFunctions.js';
import { 
  convertOrdinaryNumbersInTimeNumbers,
  checkIfTimerIsInZero,
  getSettingsForButton, 
  setNextSecondAndNextMinute,
  getMethodsForEnterPressing,
} from './clock-functions.js';

class Clock extends React.Component {
  constructor(props) {
    super(props) 

    const { seconds: initialSeconds, minutes: initialMinutes, hours: initialHours } = this.props;

    this.state = {
      clockStarted: false,
      clockPaused: false,
      seconds: initialSeconds,
      minutes: initialMinutes,
      hours: initialHours,
    }

    this.clockMethods = {
      startClock: this.startClock, 
      pauseClock: this.pauseClock,
      stopClock: this.stopClock,
    };

  }
  
  tick = () => {
    const { seconds, minutes, hours } = this.state;

    if (this.props.isCountDown && seconds === 0 && minutes === 0 && hours === 0) {
        
      this.stopClock();
      this.props.bellStarting();
      return;

    }

    if (!this.props.isCountDown && seconds === 59 && minutes === 59 && hours === 99) {

      this.stopClock();
      return;

    }

    const { nextSecond, nextMinute, nextHour } = setNextSecondAndNextMinute(this.props.isCountDown, seconds, minutes, hours)

    const isTimeToRing = (Number.isInteger(nextMinute / this.props.ringEvery) && nextSecond === 0);

    if (!this.props.isCountDown && isTimeToRing) this.props.bellStarting();
    
    this.setState({
      seconds: nextSecond,
      minutes: nextMinute,
      hours: nextHour,
    })
  };

  startClock = () => {
    this.clockId = setInterval(this.tick, 1000);

    this.setState({ 
      clockStarted: true,
      clockPaused: false,
     });
  };

  pauseClock = () => {
    clearInterval(this.clockId);

    this.setState({ clockPaused: true });
  };


  stopClock = () => {
    const { seconds, minutes, hours } = this.props;

    clearInterval(this.clockId);

    this.setState({ 
      clockStarted: false,
      clockPaused: false,
      seconds: seconds,
      minutes: minutes,
      hours: hours,
     });
  };

  setNewTimer = (seconds, minutes, hours) => {
    const { 
      minutes: newMinutes,
      seconds: newSeconds,
      hours: newHours,
    } = convertOrdinaryNumbersInTimeNumbers(seconds, minutes, hours);

    this.setState({
      seconds: newSeconds,
      minutes: newMinutes,
      hours: newHours,
    });
  }

  keyPressingOnClock = (key) => {

    const { clockStarted, clockPaused } = this.state;
    const { isCountDown, focusOnInput, hours, minutes, seconds } = this.props;

    if (document.activeElement === this.startAndPauseButton) return;

    const arrayOfMethods = getMethodsForEnterPressing({
      clockStatus: { clockStarted, clockPaused },
      clockByUnits: { seconds, minutes, hours },
      clockMethods: this.clockMethods,
      focusOnInputSettings: {
        isFocused: focusOnInput,
        handleFocus: () => this.props.handleOnInputFocus(false),
      },
      setNewTimer: this.setNewTimer,
      isCountDown,
    });

    switch (key) {
      case 'Enter':
        arrayOfMethods.forEach(fn => fn());
        break;

      default:
        noop();
    };
  };

  componentDidUpdate(prevProps){

    const { clockStarted, clockPaused } = this.state;
    const { focusOnInput, inputValueLength, keyPressed } = this.props;

    const areHoursDisplayedInClock = (this.state.hours !== 0 || this.props.focusOnInput);

    const areConditionsForSettingANewTimer = (!this.props.inputValueLength && !clockStarted && !clockPaused &&
      (this.state.hours !== prevProps.hours ||
      this.state.minutes !== prevProps.minutes ||
      this.state.seconds !== prevProps.seconds));

    if (prevProps.keyPressed !== keyPressed) this.keyPressingOnClock(this.props.keyPressed);

    if (inputValueLength && clockPaused) this.stopClock();

    if (focusOnInput && !prevProps.focusOnInput && clockStarted) this.pauseClock();

    if (areConditionsForSettingANewTimer) {
      this.setNewTimer(prevProps.seconds, prevProps.minutes, prevProps.hours);
    }

    if (areHoursDisplayedInClock !== this.props.hoursDisplayedInClock.value) {
      
      const { setHoursInClock, stateName } = this.props.hoursDisplayedInClock;

      setHoursInClock(stateName, areHoursDisplayedInClock);
    }
  }
  
  render () {

    const { 
      clockStarted, 
      clockPaused,
    } = this.state;

    const seconds = (this.props.inputValueLength) ? this.props.seconds : this.state.seconds;
    const minutes = (this.props.inputValueLength) ? this.props.minutes : this.state.minutes;
    const hours = (this.props.inputValueLength) ? this.props.hours : this.state.hours;

    const isTimerInZero = checkIfTimerIsInZero(this.props.isCountDown, seconds, minutes, hours)

    let firstButtonProps = getSettingsForButton(clockStarted, clockPaused, this.clockMethods, isTimerInZero);
    const firstButtonRef = { ref: el => this.startAndPauseButton = el};
    firstButtonProps = Object.assign(firstButtonProps, firstButtonRef);
    
    return (
      <div id={this.props.ariaIdForContainer} aria-labelledby={this.props.ariaIdForContainer} role='tabpanel'>
        <div role='timer' className='clockContainer'>
          <NumbersOfClock 
            seconds={seconds}
            minutes={minutes}
            hours={hours}
            isCountDown={this.props.isCountDown}
            spanToBorder={this.props.numberClicked}
            focusOnInput={this.props.focusOnInput}
            inputValueLength={this.props.inputValueLength}
            handleClockEvents={this.props.handleClockEvents}
            setPositionOfCursorInInput={this.props.setPositionOfCursorInInput}
          />
          {this.props.children}
          <ClockLabels hoursDisplayed={this.props.hoursDisplayedInClock.value}/>
        </div>
        <ClockButtons
          firstButton={firstButtonProps}
          secondButton={{
            onClick: this.stopClock,
            text: 'Reset',
            className: `dangerButton ${(clockStarted) ? 'animateToRight' : 'hideBtn'}`
          }}
        />
      </div>
    );  
  }
}
 
Clock.propTypes = {
    seconds: PropTypes.number.isRequired,
    minutes: PropTypes.number.isRequired,
    hours: PropTypes.number.isRequired,
    isCountDown: PropTypes.bool.isRequired,
    children: PropTypes.element,
    handleOnInputFocus: PropTypes.func,
    numberClicked: PropTypes.object, //Span Element
    focusOnInput: PropTypes.bool,
    inputValueLength: PropTypes.number,
    handleClockEvents: PropTypes.func,
    bellStarting: PropTypes.func,
    keyPressed: PropTypes.string,
    ringEvery: PropTypes.number,
    setPositionOfCursorInInput: PropTypes.func,
    hoursDisplayedInClock: PropTypes.object,
    ariaIdForContainer: PropTypes.string,
};

Clock.defaultProps = {
    seconds: 0,
    minutes: 5,
    hours: 0,
    isCountDown: false,
    focusOnInput: false,
};

export default Clock;
