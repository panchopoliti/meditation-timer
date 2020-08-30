import { noop } from '../../generalFunctions.js'

export const getClockMethod = (clockStarted, clockPaused, clockMethods, isTimerInZero = false) => {

    const { startClock, pauseClock } = clockMethods;

    if (isTimerInZero) return noop;

    if (clockStarted && !clockPaused) return pauseClock;

    return startClock;
};

export const checkIfTimerIsInZero = (isCountDown, seconds, minutes, hours) => (isCountDown && seconds === 0 && minutes === 0 && hours === 0);

export const getSettingsForButton = (clockStarted, clockPaused, onClickMethods, isTimerInZero) => {

    const clockMethod = getClockMethod(clockStarted, clockPaused, onClickMethods, isTimerInZero);

    const btnInfo = {
        onClick: clockMethod,
    };

    if (!clockStarted) {

        btnInfo.text = 'Start';
        btnInfo.className = `${(isTimerInZero) ? 'notAllow' : 'startButton'}`;


    } else if (!clockPaused) {

        btnInfo.text = 'Pause';
        btnInfo.className = 'warningButton animateToLeft';

    } else {

        btnInfo.text = 'Continue';
        btnInfo.className = 'successButton animateToLeft';
    }

    return btnInfo;
  
};

export const setNextSecondAndNextMinute = (isCountDown, seconds, minutes, hours) => {

    let nextSecond = seconds;
    let nextMinute = minutes;
    let nextHour = hours;

    if (isCountDown) {

      if (nextSecond === 0) {

        nextSecond = 59;

        if (nextMinute === 0) {

          nextMinute = 59;
          nextHour--;

        } else {

          nextMinute--;

        }
      } else {

        nextSecond--;

      }

    } else {

      if (nextSecond === 59) {

        nextSecond = 0;

        if (nextMinute === 59) {

          nextMinute = 0;
          nextHour++;

        } else {

        nextMinute++;

        }
      } else {

        nextSecond++;

      }
    }

    return {
        nextSecond,
        nextMinute,
        nextHour,
    }
};

export const getClosestSecond = (ms) => +ms.toFixed();

export const getMethodsForEnterPressing = ({
  clockStatus,
  clockByUnits, 
  clockMethods,
  setNewTimer, 
  focusOnInputSettings, 
  isCountDown
}) => {

  const { clockStarted, clockPaused } = clockStatus;
  const { seconds, minutes, hours } = clockByUnits;
  const { isFocused, handleFocus } = focusOnInputSettings

  let arrayOfMethods = [];

  if (!clockStarted && !clockPaused) {
    arrayOfMethods.push(() => setNewTimer(seconds, minutes, hours));
  }

  if (isCountDown && isFocused) arrayOfMethods.push(() => handleFocus(false));

  const isTimerInZero = checkIfTimerIsInZero(isCountDown, seconds, minutes, hours);

  const keyMethod = getClockMethod(clockStarted, clockPaused, clockMethods, isTimerInZero);
  arrayOfMethods.push(keyMethod);

  return arrayOfMethods;
};

export function makeTimeNumberOperations(firstNumInSeconds, secondNumInSeconds, operation = 'sum') {

  let result;

  switch(operation) {
    case 'sum':
      result = firstNumInSeconds + secondNumInSeconds; 
      return getTimeOutOfSeconds(result);
    case 'rest':
      result = firstNumInSeconds - secondNumInSeconds;
      return (result >= 0) ? getTimeOutOfSeconds(result) : getTimeOutOfSeconds(0);
    default: 
      result = firstNumInSeconds + secondNumInSeconds;
      return getTimeOutOfSeconds(result)
  }
}

export function getSecondsOutOfTime({ seconds, minutes, hours }) {
  return seconds + minutes * 60 + hours * 3600;
}

export function getTimeOutOfSeconds(numOfAnyDigitsInSeconds) {

  let num = numOfAnyDigitsInSeconds;
  const time = {
    seconds: 0,
    minutes: 0,
    hours: 0,
  }

  if (num < 60) {

    time.seconds = getClosestSecond(num);

    return time;
  }

  num = num / 60;
  if (num < 60) {

    time.minutes = Number.parseInt(num);
    const secondsWithDecimals = numOfAnyDigitsInSeconds - time.minutes * 60;

    time.seconds = getClosestSecond(secondsWithDecimals);

    return time;
  
  }

  num = num / 60;
  if (num <= 99) {

    time.hours = Number.parseInt(num);
    time.minutes = Number.parseInt(numOfAnyDigitsInSeconds / 60 - time.hours * 60);

    const secondsWithDecimals = numOfAnyDigitsInSeconds - time.minutes * 60 - time.hours * 3600;

    time.seconds = getClosestSecond(secondsWithDecimals);

    return time;

  }

  time.seconds = 59;
  time.minutes = 59;
  time.hours = 99;

}

// It recieves only Natural Numbers
export function solveExcessInTimeUnitsOfTwoDigits(numOfSeconds = 0, numOfMinutes = 0, numOfHours = 0, convertHours = true) {

  let seconds = numOfSeconds,
      minutes = numOfMinutes,
      hours = numOfHours;

  if (seconds <= 60 && minutes <= 60 && hours <= 99) return { seconds, minutes, hours };

  if (seconds > 60) {
      seconds -= 60;
      minutes += 1;
  }

  if (convertHours && minutes > 60) {
      minutes -= 60;
      hours += 1;
  }

  if (hours > 99) {

      hours = 99;
      minutes = 59;
      seconds = 59;
      
  }

  return {
      seconds,
      minutes,
      hours,
  };
};

export const addLeadingZero = num => {
  const stringNum = num.toString();

  return (num < 10) ? ['0', stringNum] : [stringNum[0], stringNum[1]];
};