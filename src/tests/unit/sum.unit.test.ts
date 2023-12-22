import { sum } from '../../scripts/ExampleFunction';

describe('Sum Function Example Test', () => {
  it('correctly adds two numbers', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
