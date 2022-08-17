import { makeTimeStringHumanFriendly } from '../conversion';
const testCases = [
  { input: "1:00", expected: "One o'clock" },
  { input: "2:00", expected: "Two o'clock" },
  { input: "13:00", expected: "One o'clock" },
  { input: "13:05", expected: "Five past one" },
  { input: "13:10", expected: "Ten past one" },
  { input: "13:25", expected: "Twenty five past one" },
  { input: "13:30", expected: "Half past one" },
  { input: "13:35", expected: "Twenty five to two" },
  { input: "13:55", expected: "Five to two" },
  { input: "20:45", expected: "Quarter to nine" },
  { input: "23:10", expected: "Ten past eleven" },
  { input: "23:50", expected: "Ten to midnight" }
];
describe("Test time outputs", () => {
  testCases.forEach(testCase => {
    it(`should return "${testCase.expected}" when input is "${testCase.input}"`, () => {
      const result = makeTimeStringHumanFriendly(testCase.input);
      expect(result).toEqual(testCase.expected);
    })
  })
});
