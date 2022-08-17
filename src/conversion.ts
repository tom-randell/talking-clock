
export function formatTimeString(timeString: string) {
    const trimmedTime = timeString.substring(0, 5); // remove seconds etc.
    if (trimmedTime[0] === "0") // strip leading 0
        return trimmedTime.substring(1, trimmedTime.length);
    return trimmedTime;
}
export function convertDateToTimeString(date: Date) {
    return formatTimeString(date.toLocaleTimeString());
}

export enum RelationToHour {
    BeforeHalfPast = "past",
    AfterHalfPast = "to"
}

export function numberToHumanFriendlyText(input: string) {
    const [hours, minutes] = input.split(":").map(x => +x);
    const ones = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "quarter", "sixteen", "seventeen", "eighteen", "nineteen"];

    const getHoursString = (relationToHour?: RelationToHour) =>
        hours === 24 || relationToHour === RelationToHour.AfterHalfPast && hours === 23 ?
            "midnight" :
            ones[(hours - (relationToHour === RelationToHour.AfterHalfPast ? 0 : 1)) % 12];

    if (minutes === 0)
        return `${getHoursString()} o'clock`;

    const relativeMinutes = minutes > 30 ? 60 - minutes : minutes;
    let minutesString;
    if (minutes === 30)
        minutesString = "half";
    else if (relativeMinutes >= 20 && relativeMinutes < 30)
        minutesString = `twenty${relativeMinutes > 20 ? ` ${ones[(relativeMinutes - 1) % 20]}` : ''}`;
    else
        minutesString = ones[(relativeMinutes - 1)];

    const pointInTime: RelationToHour = minutes <= 30 ?
        RelationToHour.BeforeHalfPast : RelationToHour.AfterHalfPast;

    return `${minutesString} ${pointInTime} ${getHoursString(pointInTime)}`;
}
export function makeTimeStringHumanFriendly(input: string | Date) {
    const timeString = typeof (input as Date).getMonth === 'function' ?
        convertDateToTimeString(input as Date) :
        formatTimeString(input as string);
    const result = numberToHumanFriendlyText(timeString);
    return result[0].toUpperCase() + result.substring(1, result.length);
}