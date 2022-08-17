type singleDigitHours = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type doubleDigitHours = 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24;
type allowedMinutes =
  | doubleDigitHours
  | (
      | '00'
      | '01'
      | '02'
      | '03'
      | '04'
      | '05'
      | '06'
      | '07'
      | '08'
      | '09'
      | 25
      | 26
      | 27
      | 28
      | 29
      | 30
      | 31
      | 32
      | 33
      | 34
      | 35
      | 36
      | 37
      | 38
      | 39
      | 40
      | 41
      | 42
      | 43
      | 44
      | 45
      | 46
      | 47
      | 48
      | 49
      | 50
      | 51
      | 52
      | 53
      | 54
      | 55
      | 56
      | 57
      | 58
      | 59
    );
/** Type representation of the allowed sanitized time format (HH:MM or H:MM). */
export type SanitizedTimeFormat = `${singleDigitHours | doubleDigitHours}:${allowedMinutes}`;

/** Takes a time string and converts it into `SanitizedTimeFormat` string format.
 *  @see SanitizedTimeFormat*/
export function formatTimeString(timeString: string): SanitizedTimeFormat {
  const colonIndex = timeString.indexOf(':');
  const trimmedTime = timeString.substring(0, colonIndex + 3); // remove seconds etc.
  if (trimmedTime[0] === '0')
    // strip leading 0
    return trimmedTime.substring(1, trimmedTime.length) as SanitizedTimeFormat;
  return trimmedTime as SanitizedTimeFormat;
}

/** Takes a Date object and converts it into `SanitizedTimeFormat` string format.
 *  @see SanitizedTimeFormat*/
export function convertDateToTimeString(date: Date) {
  return formatTimeString(date.toLocaleTimeString('en-GB')); // TODO: don't hardcode this - but for this task I have done to get the builds working for now
}

/** Sanitizes input whether it is a string or a Date in to
 * `SanitizedTimeFormat` format.
 * @see SanitizedTimeFormat*/
export function sanitizeInput(input: string | Date) {
  return typeof (input as Date).getMonth === 'function'
    ? convertDateToTimeString(input as Date)
    : formatTimeString(input as string);
}

export enum RelationToHour {
  BeforeHalfPast = 'past',
  AfterHalfPast = 'to',
}

export function numberToHumanFriendlyText(input: SanitizedTimeFormat) {
  const [hours, minutes] = input.split(':').map((x) => +x);
  const ones = [
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

  const getHoursString = (relationToHour?: RelationToHour) =>
    hours === 24 || (relationToHour === RelationToHour.AfterHalfPast && hours === 23)
      ? 'midnight'
      : ones[(hours - (relationToHour === RelationToHour.AfterHalfPast ? 0 : 1)) % 12];

  if (minutes === 0) return `${getHoursString()} o'clock`;

  const relativeMinutes = minutes > 30 ? 60 - minutes : minutes;
  let minutesString;
  if (minutes === 30) minutesString = 'half';
  else if (relativeMinutes >= 20 && relativeMinutes < 30)
    minutesString = `twenty${relativeMinutes > 20 ? ` ${ones[(relativeMinutes - 1) % 20]}` : ''}`;
  else minutesString = ones[relativeMinutes - 1];

  const pointInTime: RelationToHour = minutes <= 30 ? RelationToHour.BeforeHalfPast : RelationToHour.AfterHalfPast;

  return `${minutesString} ${pointInTime} ${getHoursString(pointInTime)}`;
}
export function makeTimeStringHumanFriendly(sanitizedTimeString: SanitizedTimeFormat) {
  const result = numberToHumanFriendlyText(sanitizedTimeString);
  return result[0].toUpperCase() + result.substring(1, result.length);
}
