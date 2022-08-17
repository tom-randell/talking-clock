import { formatTimeString } from '../conversion';
const testCases = [
  { input: '01:00', expected: '1:00' },
  { input: '2:00:20', expected: '2:00' },
  { input: '13:00', expected: '13:00' },
  { input: '05:07:34', expected: '5:07' },
];
describe('Test time string formatting to expected input format', () => {
  testCases.forEach((testCase) => {
    it(`should return "${testCase.expected}" when input is "${testCase.input}"`, () => {
      const result = formatTimeString(testCase.expected);
      expect(result).toEqual(testCase.expected);
    });
  });
});
