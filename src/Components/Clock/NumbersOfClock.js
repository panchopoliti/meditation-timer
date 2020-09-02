import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './clock.scss';
import { addLeadingZero } from './clock-functions.js';
import { noop } from '../../generalFunctions.js';
import { ThemeContextConsumer } from '../../ThemeContext.js';

const TIME_UNITS = {
    seconds: 'seconds',
    minutes: 'minutes',
    hours: 'hours',
}

class NumbersOfClock extends Component {

    constructor(props){
        super(props);

        this.state = {
            activeSpan: null,
        };

        this.spanRefsSettings = [
            {
                positionInClockRightToLeft: 6,
                ref: 'secondDigitHours',
                unit: TIME_UNITS.hours,
            },
            {
                positionInClockRightToLeft: 5,
                ref: 'firstDigitHours',
                unit: TIME_UNITS.hours,
            },
            {
                positionInClockRightToLeft: 4,
                ref: 'secondDigitMinutes',
                unit: TIME_UNITS.minutes,
            },
            {
                positionInClockRightToLeft: 3,
                ref: 'firstDigitMinutes',
                unit: TIME_UNITS.minutes,
            },
            {
                positionInClockRightToLeft: 2,
                ref: 'secondDigitSeconds',
                unit: TIME_UNITS.seconds,
            },
            {
                positionInClockRightToLeft: 1,
                ref: 'firstDigitSeconds',
                unit: TIME_UNITS.seconds,
            },
        ]
    }

    removeClassOfSpanExceptTargeted = (spanRefsArr, target) => {

        let targetSpan = spanRefsArr.find(({ element }) => element === target);

        if ( !targetSpan ) return this.setState({ activeSpan: null })

        this.setState({ activeSpan: targetSpan.element});
        this.props.setPositionOfCursorInInput(targetSpan.positionInClockRightToLeft - 1);

        return;

    };

    selectBorderForSpan = () => {

        const { spanToBorder, focusOnInput } = this.props;

        const spanRefs = this.spanRefsSettings.map((spanSettings) => {
            const cloneObj = Object.assign({}, spanSettings);
            const { positionInClockRightToLeft, ref} = cloneObj;

            cloneObj.element = this[ref];
            cloneObj.defaultSelectedSpan = (positionInClockRightToLeft === 1)
            
            return cloneObj;
        });

        if (!focusOnInput) {
            this.removeClassOfSpanExceptTargeted(spanRefs, null);

            return;
        }

        const spanElements = spanRefs.map(e => e.element)
        const activeSpan = spanElements.find( elem => (elem.classList.contains('activeSpan')) ? elem : undefined);
        const isSpanAvailableToBorder = (spanToBorder) ? spanToBorder.classList.contains('defaultSpanColor') : false;

        if ( (activeSpan && !isSpanAvailableToBorder) ||
        (activeSpan && !spanToBorder) ||
        (spanToBorder && !spanElements.includes(spanToBorder))) return;

        if ( (!activeSpan && !spanToBorder) || (!activeSpan && !isSpanAvailableToBorder) ) {

            const { element: targetSpan } = spanRefs.find(({ defaultSelectedSpan }) => (defaultSelectedSpan === true));

            this.removeClassOfSpanExceptTargeted(spanRefs, targetSpan);

            return;
        }

        this.removeClassOfSpanExceptTargeted(spanRefs, spanToBorder);
    };

    componentDidUpdate(prevProps) {

        if (prevProps.spanToBorder !== this.props.spanToBorder ||
            prevProps.focusOnInput !== this.props.focusOnInput) {
            
            this.selectBorderForSpan();
        }
    }

    render () {
        
        const { hours, focusOnInput, inputValueLength, handleClockEvents, isCountDown } = this.props;
        const { activeSpan } = this.state;

        const numbersByUnit = {
            [TIME_UNITS.seconds]: addLeadingZero(this.props.seconds),
            [TIME_UNITS.minutes]: addLeadingZero(this.props.minutes),
            [TIME_UNITS.hours]: addLeadingZero(this.props.hours),
        };

        const spanRefsSettings = this.spanRefsSettings.map((obj, i) => {
            const cloneObj = Object.assign({}, obj);

            const unitArray = numbersByUnit[obj.unit];
            const value = unitArray[i % 2];

            cloneObj.value = value

            return cloneObj;
        });

        const clockSpans = spanRefsSettings.map(({ 
            positionInClockRightToLeft: inputLength,
            ref,
            value,
        }) => {
        return <span
            key={ref}
            ref={e => this[ref] = e}
            className={
                `${(activeSpan === this[ref]) ? 'activeSpan' : ''} ${(focusOnInput && inputValueLength < inputLength) ?
                'withoutInputValue' : (isCountDown) ? 'defaultSpanColor' : ''}`
            } 
        >
            {value}
        </span>
    });

        const hoursToDisplay = clockSpans.slice(0,2)
        const minutesToDisplay = clockSpans.slice(2, 4);
        const secondsToDisplay = clockSpans.slice(4, 6);

        return (
            <div 
                className={`numbersContainer ${(!focusOnInput && isCountDown) ? 'clockDefined' : ''}`}
                onClick={handleClockEvents}
                onMouseDown={handleClockEvents}
            >
                <ThemeContextConsumer>
                    {
                        ({ theme }) => (
                            <React.Fragment>
                                <div className={`hoursContainer ${(hours === 0 && !focusOnInput) ? 'hide' : ''}`}>
                                    <div className={`${theme}Numbers`}>{hoursToDisplay}</div>
                                    <div className={`${theme}Numbers`}>:</div>
                                </div>
                                <div className={`${theme}Numbers`}>{minutesToDisplay}</div>
                                <div className={`${theme}Numbers`}>:</div>
                                <div className={`${theme}Numbers`}>{secondsToDisplay}</div>
                            </React.Fragment>
                        )
                    }
                </ThemeContextConsumer>

            </div>
        );
    }
}

NumbersOfClock.propTypes = {
    seconds: PropTypes.number,
    minutes: PropTypes.number,
    hours: PropTypes.number,
    isCountDown: PropTypes.bool,
    spanToBorder: PropTypes.object, //Span Element
    focusOnInput: PropTypes.bool,
    inputValueLength: PropTypes.number,
    handleClockEvents: PropTypes.func,
    setPositionOfCursorInInput: PropTypes.func,
};

NumbersOfClock.defaultProps = {
    seconds: 0,
    minutes: 0,
    hours: 0,
    focusOnInput: false,
    inputValueLength: 0,
    handleClockEvents: noop,
};


export default NumbersOfClock;