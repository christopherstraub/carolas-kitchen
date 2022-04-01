import React from 'react';
import fmtQty from 'format-quantity';
import round from '../utils/numbers';
import useAppTranslations from '../hooks/use-static-query/use-app-translations';

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
    : round(Number(fmtQty((summand1 + summand2) * scaleFactor)), 1);
}

function shouldBePluralized(wholeNumber, fraction) {
  return (
    Number(wholeNumber) >= 2 ||
    (Number(wholeNumber) === 1 && fraction !== undefined)
  );
}

function pluralize(string) {
  return !string.endsWith('s') ? `${string}s` : string;
}

function singularize(string) {
  return string.endsWith('s') ? string.slice(0, -1) : string;
}

function getScaledIngredientsHtml(
  ingredientsHtml,
  scaleFactor,
  scaleWhitelists
) {
  /**
   * Regular expression capturing groups:
   * [0] A fraction or mixed fraction using fraction symbols.
   * E.g., "¾", "2¾", or "2 ¾".
   * [1] Whole number if supplied a mixed fraction.
   * E.g., "2" from either "2¾" or "2 ¾".
   * [2] Fraction symbol.
   * E.g., "¾" from either "¾", "2¾", or "2 ¾".
   */
  const fractionSymbolsRegex = /(?:(\d+) ?)?([½⅓⅔¼¾⅛⅜⅝⅞])/g;

  /**
   * Regular expression capturing groups:
   * [0] A whole number (and the character it succeeds) that does not succeed
   * nor precede a "/", which might indicate it is the denominator and
   * numerator, respectively, of a fraction string. It is not necessary to
   * match a "^" and "$" before and after the string, respectively, since it
   * will start and end in HTML opening and closing tags respectively.
   * E.g., ">2" and "-3" in "<li>2-3 1/4</li>".
   * [1] Whole number.
   * E.g., "2" and "3" in ">2" and "-3" respectively.
   */
  const wholeNumbersRegex = /[^/](\d+)(?=[^/])/g;

  /**
   * Regular expression capturing groups:
   * [0] One or two fractions using a "/" between the numerator and denominator.
   * E.g., "1/2" or "2/1 3/4"
   * [1] Numerator of first fraction.
   * E.g., "1" in "1/2".
   * [2] Denominator of first fraction.
   * E.g., "2" in "1/2".
   * [3] Numerator of second fraction, if supplied.
   * E.g., "3" in "2/1 3/4".
   * [4] Denominator of second fraction, if supplied.
   * E.g., "4" in "2/1 3/4".
   */
  const fractionsRegex = /(\d+)\/(\d+)(?: (\d+)\/(\d+))?/g;

  /**
   * Regular expression capturing groups:
   * [0] A mixed fraction, decimal numeral, or fraction preceding one or two
   * words. Only matches fractions using fraction symbols.
   * E.g., "2 cups", "2½ cups", "1.3 tablespoons", or "¼ teaspoon".
   * [1] Whole number either alone or as part of a mixed fraction, or
   * decimal numeral.
   * E.g., "2" in either "2 teaspoons", "2½ teaspoons", or "2.3 teaspoons".
   * [2] Fraction symbol in mixed fraction or decimal.
   * E.g., "½" in "2½ teaspoons" or ".3" in "2.3 teaspoons".
   * [3] Two words.
   * E.g., "Medjool dates" in "6 Medjool dates".
   * [4] Word.
   * E.g., "cup" in "½ cup".
   */
  const ingredientMeasurementsRegex =
    /(?:(?:(\d+)([½⅓⅔¼¾⅛⅜⅝⅞⅕⅖⅗⅘]|\.\d)?)|[½⅓⅔¼¾⅛⅜⅝⅞⅕⅖⅗⅘]) ((([A-zÀ-ú-]+)(?: [A-zÀ-ú-]+)?)(?: [A-zÀ-ú-]+)?)/g;

  return ingredientsHtml
    .replaceAll(fractionSymbolsRegex, (match, wholeNumber, fractionSymbol) =>
      wholeNumber === undefined
        ? FRACTIONS_STRINGS[fractionSymbol]
        : `${wholeNumber} ${FRACTIONS_STRINGS[fractionSymbol]}`
    )
    .replaceAll(
      wholeNumbersRegex,
      (match, wholeNumber) => `${match[0]}${wholeNumber}/1`
    )
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
    )
    .replaceAll(
      ingredientMeasurementsRegex,
      (match, wholeNumber, fraction, threeWords, twoWords, word) => {
        if (scaleWhitelists.threeWords.join().includes(threeWords))
          return shouldBePluralized(wholeNumber, fraction)
            ? match.replace(threeWords, pluralize(threeWords))
            : match.replace(threeWords, singularize(threeWords));

        if (scaleWhitelists.twoWords.join().includes(twoWords))
          return shouldBePluralized(wholeNumber, fraction)
            ? match.replace(twoWords, pluralize(twoWords))
            : match.replace(twoWords, singularize(twoWords));

        if (scaleWhitelists.oneWord.join().includes(word))
          return shouldBePluralized(wholeNumber, fraction)
            ? match.replace(word, pluralize(word))
            : match.replace(word, singularize(word));

        return match;
      }
    );
}

export default function Ingredients({
  ingredients,
  servings,
  yieldAmount,
  initialServingsValue,
  servingsValue,
  setServingsValue,
  locale,
}) {
  const scaleWhitelists = Object.fromEntries(
    ingredients.scaleWhitelists.map((node) => [
      [node.key],
      node.whitelist ?? [],
    ])
  );

  const scaleFactor = servingsValue / initialServingsValue;
  const html = getScaledIngredientsHtml(
    ingredients.childMarkdownRemark.html,
    scaleFactor,
    scaleWhitelists
  );

  const {
    title: tTitle,
    makes: tMakes,
    to: tTo,
    servings: tServings,
  } = useAppTranslations(locale).ingredients;

  return (
    <section>
      <h2>{tTitle}</h2>
      <h3>
        {yieldAmount
          ? `${tMakes} ${yieldAmount
              .replaceAll(/\d+/g, (number) => number * scaleFactor)
              .replace('-', ` ${tTo} `)}`
          : `${servings
              .replaceAll(/\d+/g, (number) => number * scaleFactor)
              .replace('-', ` ${tTo} `)} ${tServings}`}
      </h3>
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
