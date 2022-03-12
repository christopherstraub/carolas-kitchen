/**
 * @param {number} value - The number to round.
 * @param {precision} value - The number of decimal places to round to.
 */
export default function round(value, precision) {
  const multiplier = 10 ** precision;
  return Math.round(value * multiplier) / multiplier;
}
