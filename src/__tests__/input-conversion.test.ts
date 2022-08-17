import { convertDateToTimeString } from '../conversion';
const testCases = [
    { input: "1:00" },
    { input: "2:00" },
    { input: "13:00" },
    { input: "13:05" },
    { input: "13:10" },
    { input: "13:25" },
    { input: "13:30" },
    { input: "13:35" },
    { input: "13:55" }
];
describe("Test date time to time string conversion", () => {
    testCases.forEach(testCase => {
        const dateFromTime = new Date(`2022-01-01 ${testCase.input}`);
        it(`should return "${testCase.input}" when input is "${dateFromTime}"`, () => {
            const result = convertDateToTimeString(dateFromTime);
            expect(result).toEqual(testCase.input);
        })
    })
});
