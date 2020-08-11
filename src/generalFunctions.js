export const noop = () => {};

export function getNumberWithTimeUnitLabel(maxMinutes, notIncludedNumbersCb) {
    
    const minutesAndHoursArray = [];

    const getLabel = (minute, hour) => {

        const units = {
            minute: 'minute',
            hour: 'hour',
        };
        const setUnit = (num, unit) => (num === 1) ? unit : `${unit}s`;
        const getNumWithUnit = (num, unit) => `${num} ${setUnit(num, unit)}`;

        const hourWithUnit = getNumWithUnit(hour, units.hour);;
        const minuteWithUnit = getNumWithUnit(minute, units.minute);

        if (!hour) return minuteWithUnit;

        if (!minute) return hourWithUnit;

        return `${hourWithUnit} ${minuteWithUnit}`;
    }

    for ( let num = 1; num <= maxMinutes; num++) {

        const numberNotIncluded = notIncludedNumbersCb(num);

        if (numberNotIncluded) continue;

        const hourNum = parseInt(num/60);
        const minuteNum = num % 60;

        const label = getLabel(minuteNum, hourNum);

        minutesAndHoursArray.push({
            label: label,
            value: num,
        });
    }

    return minutesAndHoursArray;
};

export function isNaturalNumber (num) {

    if (num[num.length -1] === '.') return false;

    const numberToTest = Number(num);

    if (Number.isNaN(numberToTest)) return false;

    if (!Number.isInteger(numberToTest)) return false;

    return true;
};