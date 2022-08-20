"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeTimeStringHumanFriendly = exports.numberToHumanFriendlyText = exports.RelationToHour = exports.sanitizeInput = exports.convertDateToTimeString = exports.formatTimeString = void 0;
/** Takes a time string and converts it into `SanitizedTimeFormat` string format.
 *  @see SanitizedTimeFormat*/
function formatTimeString(timeString) {
    const colonIndex = timeString.indexOf(':');
    const trimmedTime = timeString.substring(0, colonIndex + 3); // remove seconds etc.
    if (trimmedTime[0] === '0')
        // strip leading 0
        return trimmedTime.substring(1, trimmedTime.length);
    return trimmedTime;
}
exports.formatTimeString = formatTimeString;
/** Takes a Date object and converts it into `SanitizedTimeFormat` string format.
 *  @see SanitizedTimeFormat*/
function convertDateToTimeString(date) {
    return formatTimeString(date.toLocaleTimeString('en-GB')); // TODO: don't hardcode this - but for this task I have done to get the builds working for now
}
exports.convertDateToTimeString = convertDateToTimeString;
/** Sanitizes input whether it is a string or a Date in to
 * `SanitizedTimeFormat` format.
 * @see SanitizedTimeFormat*/
function sanitizeInput(input) {
    return typeof input.getMonth === 'function'
        ? convertDateToTimeString(input)
        : formatTimeString(input);
}
exports.sanitizeInput = sanitizeInput;
var RelationToHour;
(function (RelationToHour) {
    RelationToHour["BeforeHalfPast"] = "past";
    RelationToHour["AfterHalfPast"] = "to";
})(RelationToHour = exports.RelationToHour || (exports.RelationToHour = {}));
function numberToHumanFriendlyText(input) {
    const [hours, minutes] = input.split(':').map((x) => +x);
    const oneToNineteen = [
        'one',
        'two',
        'three',
        'four',
        'five',
        'six',
        'seven',
        'eight',
        'nine',
        'ten',
        'eleven',
        'twelve',
        'thirteen',
        'fourteen',
        'quarter',
        'sixteen',
        'seventeen',
        'eighteen',
        'nineteen',
    ];
    const getHoursString = (relationToHour) => hours === 24 ||
        (relationToHour === RelationToHour.AfterHalfPast && hours === 23) ||
        (relationToHour === RelationToHour.BeforeHalfPast && hours === 0)
        ? 'midnight'
        : oneToNineteen[(hours - (relationToHour === RelationToHour.AfterHalfPast ? 0 : 1)) % 12];
    if (minutes === 0)
        return `${getHoursString()} o'clock`;
    const relativeMinutes = minutes > 30 ? 60 - minutes : minutes;
    let minutesString;
    if (minutes === 30)
        minutesString = 'half';
    else if (relativeMinutes >= 20 && relativeMinutes < 30)
        minutesString = `twenty${relativeMinutes > 20 ? ` ${oneToNineteen[(relativeMinutes - 1) % 20]}` : ''}`;
    else
        minutesString = oneToNineteen[relativeMinutes - 1];
    const pointInTime = minutes <= 30 ? RelationToHour.BeforeHalfPast : RelationToHour.AfterHalfPast;
    return `${minutesString} ${pointInTime} ${getHoursString(pointInTime)}`;
}
exports.numberToHumanFriendlyText = numberToHumanFriendlyText;
function makeTimeStringHumanFriendly(sanitizedTimeString) {
    const result = numberToHumanFriendlyText(sanitizedTimeString);
    return result[0].toUpperCase() + result.substring(1, result.length);
}
exports.makeTimeStringHumanFriendly = makeTimeStringHumanFriendly;
//# sourceMappingURL=conversion.js.map