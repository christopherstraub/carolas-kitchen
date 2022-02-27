import React from 'react';
import fmtQty from 'format-quantity';
import round from '../utils/numbers';

const FRACTIONS_STRINGS = {
  '½': '1/2',
  '⅓': '1/3',
  '⅔': '2/3',
  '¼': '1/4',
  '¾': '3/4',
  '⅛': '1/8',
  '⅜': '3/8',
  '⅝': '5/8',
  '⅞': '7/8',
};

function formatQuantity(summand1, summand2, scaleFactor) {
  return fmtQty((summand1 + summand2) * scaleFactor).includes('/')
    ? fmtQty((summand1 + summand2) * scaleFactor, true)
    : round(Number(fmtQty((summand1 + summand2) * scaleFactor)));
}

function getScaledIngredientsHtml(ingredientsHtml, scaleFactor) {
  /**
   * Regular expression capturing groups:
   * [1] Whole number if supplied a mixed fraction.
   * E.g., "2" from either "2¾" or "2 ¾".
   * [2] Fraction symbol.
   * E.g., "¾" from either "¾" or "2¾" or "2 ¾".
   */
  const fractionSymbolsRegex = /(?:(\d+) ?)?([½⅓⅔¼¾⅛⅜⅝⅞])/g;

  /**
   * Matches a whole number. Does not succeed nor precede a "/", which might
   * indicate it is the denominator and numerator, respectively, of a fraction
   * string. It is not necessary to match "^" and "$" in the positive
   * lookbehind and lookahead, respectively, since the string will start and
   * end in HTML opening and closing tags respectively.
   * E.g., matches "2" and "3" in "<li>2-3 1/4</li>".
   */
  const wholeNumbersRegex = /(?<=[^/])\d+(?=[^/])/g;

  /**
   * Regular expression capturing groups:
   * [1] Numerator of first or single fraction string.
   * E.g., "1" in "1/2".
   * [2] Denominator of first or single fraction string.
   * E.g., "2" in "1/2".
   * [3] Numerator of second fraction string, if supplied.
   * E.g., "3" in "2/1 3/4".
   * [4] Denominator of second fraction string, if supplied.
   * E.g., "4" in "2/1 3/4".
   */
  const fractionsRegex = /(\d+)\/(\d+)(?: (\d+)\/(\d+))?/g;

  return ingredientsHtml
    .replaceAll(fractionSymbolsRegex, (match, wholeNum, fractionSymbol) =>
      wholeNum === undefined
        ? FRACTIONS_STRINGS[fractionSymbol]
        : `${wholeNum} ${FRACTIONS_STRINGS[fractionSymbol]}`
    )
    .replaceAll(wholeNumbersRegex, '$&/1')
    .replaceAll(
      fractionsRegex,
      (match, numerator1, denominator1, numerator2, denominator2) =>
        numerator2 === undefined
          ? formatQuantity(
              Number(numerator1) / Number(denominator1),
              0,
              scaleFactor
            )
          : formatQuantity(
              Number(numerator1) / Number(denominator1),
              Number(numerator2) / Number(denominator2),
              scaleFactor
            )
    );
}

function handleChange(setServingsValue) {
  return function (e) {
    const { value, min } = e.target;
    if (value === '') return;
    setServingsValue(Number(value) < Number(min) ? Number(min) : Number(value));
  };
}

export default function Ingredients({
  servings,
  initialServingsValue,
  servingsValue,
  setServingsValue,
  ingredientsHtml,
}) {
  const html = getScaledIngredientsHtml(
    ingredientsHtml,
    servingsValue / initialServingsValue
  );

  return (
    <section>
      <h2>Ingredients</h2>
      <h3>{servings} servings</h3>
      <label htmlFor="servings">
        Change servings
        <input
          type="number"
          id="servings"
          min={2}
          step={2}
          value={servingsValue}
          onChange={handleChange(setServingsValue)}
        />
      </label>
      <ol>
        <li>
          <button
            type="button"
            onClick={() => setServingsValue(initialServingsValue * 0.5)}
          >
            .5x
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => setServingsValue(initialServingsValue)}
          >
            1x
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => setServingsValue(initialServingsValue * 2)}
          >
            2x
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => setServingsValue(initialServingsValue * 3)}
          >
            3x
          </button>
        </li>
      </ol>
      <div
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    </section>
  );
}
