import { double } from './double';

test('double 2 to equal 4', () => {
    expect(double(2)).toBe(4);
    expect(double(2)).toBeGreaterThanOrEqual(3);
    expect(double(2)).toBeLessThan(8);
})