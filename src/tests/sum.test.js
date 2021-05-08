const sum = require('../modules/sum');

test('sum of 1 and 2 gives 3', () => {
  expect(sum(1, 2)).toBe(3);
});