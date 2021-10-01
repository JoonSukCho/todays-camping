/**
 * min <= result <= max
 * @param min
 * @param max
 * @returns number;
 */
export const rangeRandom = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
