import React from 'react';
import round from '../utils/numbers';
import useAppTranslations from '../hooks/use-static-query/use-app-translations';
import * as styles from './nutrition-facts-label.module.scss';

/**
 * Source of daily values:
 * https://www.fda.gov/food/new-nutrition-facts-label/daily-value-new-nutrition-and-supplement-facts-labels
 * Current as of 2020-05-05.
 * Updated 2022-02-21.
 */
const NUTRIENTS = {
  CALORIES: {
    IDENTIFIER: 'calories',
    ID: 208,
    DAILY_VALUE: 2000,
  },
  TOTAL_FAT: {
    IDENTIFIER: 'totalFat',
    ID: 204,
    UNIT: 'g',
    DAILY_VALUE: 78,
  },
  SATURATED_FAT: {
    IDENTIFIER: 'saturatedFat',
    ID: 606,
    UNIT: 'g',
    DAILY_VALUE: 20,
  },
  TRANS_FAT: {
    IDENTIFIER: 'transFat',
    ID: 605,
    UNIT: 'g',
  },
  CHOLESTEROL: {
    IDENTIFIER: 'cholesterol',
    ID: 601,
    UNIT: 'mg',
    DAILY_VALUE: 300,
  },
  SODIUM: {
    IDENTIFIER: 'sodium',
    ID: 307,
    UNIT: 'mg',
    DAILY_VALUE: 2300,
  },
  TOTAL_CARBOHYDRATE: {
    IDENTIFIER: 'totalCarbohydrate',
    ID: 205,
    UNIT: 'g',
    DAILY_VALUE: 275,
  },
  DIETARY_FIBER: {
    IDENTIFIER: 'dietaryFiber',
    ID: 291,
    UNIT: 'g',
    DAILY_VALUE: 28,
  },
  TOTAL_SUGARS: {
    IDENTIFIER: 'totalSugars',
    ID: 269,
    UNIT: 'g',
  },
  ADDED_SUGARS: {
    IDENTIFIER: 'addedSugars',
    ID: 10009,
    UNIT: 'g',
    DAILY_VALUE: 50,
  },
  PROTEIN: {
    IDENTIFIER: 'protein',
    ID: 203,
    UNIT: 'g',
  },
  /**
   * Vitamin D is received in IU; this must be converted to mcg.
   * Conversion factor: 1 IU Vitamin D = 0.025 mcg Vitamin D.
   */
  VITAMIN_D: {
    ID: 324,
    IDENTIFIER: 'vitaminD',
    CONVERSION_FACTOR: 0.025,
    UNIT: 'mcg',
    DAILY_VALUE: 20,
  },
  CALCIUM: {
    ID: 301,
    IDENTIFIER: 'calcium',
    UNIT: 'mg',
    DAILY_VALUE: 1300,
  },
  IRON: {
    ID: 303,
    IDENTIFIER: 'iron',
    UNIT: 'mg',
    DAILY_VALUE: 18,
  },
  POTASSIUM: {
    ID: 306,
    IDENTIFIER: 'potassium',
    UNIT: 'mg',
    DAILY_VALUE: 4700,
  },
};

/**
 *
 * @param {number} id The id of the nutrient to get.
 * @param {number} conversionFactor The conversion factor (if the unit of the
 * value received does not coincide with the unit that should be displayed).
 * @param {Object[]} nutrients The nutrient data being received.
 * @param {number} servings The servings per recipe.
 * @returns {number} The value of the nutrient.
 */
function getNutrientValue(id, conversionFactor, nutrients, servings) {
  return (
    (nutrients.find((nutrient) => nutrient.id === id).amount / servings) *
    (conversionFactor ?? 1)
  );
}

/**
 *
 * @param {number} nutrientValue The value of the nutrient.
 * @param {number} dailyValue The daily value of the nutrient.
 * @returns {string} The daily value percentage string.
 */
function getNutrientDailyValuePct(nutrientValue, dailyValue) {
  return round((nutrientValue / dailyValue) * 100, 0)
    .toString()
    .concat('%');
}

/**
 *
 * @param {Object[]} nutrients The nutrient data being received.
 * @param {number} servings The servings per recipe.
 * @returns {Object} The nutrient amounts and daily value percentages to be
 * displayed on the label.
 */
function getNutrients(nutrients, servings) {
  return Object.fromEntries(
    Object.values(NUTRIENTS).map((NUTRIENT) => {
      const nutrientValue = getNutrientValue(
        NUTRIENT.ID,
        NUTRIENT.CONVERSION_FACTOR,
        nutrients,
        servings
      );

      return [
        NUTRIENT.IDENTIFIER,
        {
          amount: round(nutrientValue, 1)
            .toString()
            .concat(NUTRIENT.UNIT ?? ''),
          dailyValuePct:
            NUTRIENT.DAILY_VALUE !== undefined
              ? getNutrientDailyValuePct(nutrientValue, NUTRIENT.DAILY_VALUE)
              : null,
        },
      ];
    })
  );
}

export default function NutritionFactsLabel({
  nutrients,
  initialServingsValue,
  servingsValue,
  locale,
}) {
  const {
    calories,
    totalFat,
    saturatedFat,
    transFat,
    cholesterol,
    sodium,
    totalCarbohydrate,
    dietaryFiber,
    totalSugars,
    addedSugars,
    protein,
    vitaminD,
    calcium,
    iron,
    potassium,
  } = getNutrients(nutrients, initialServingsValue);

  const {
    title: tTitle,
    servingsPerRecipe: tServingsPerRecipe,
    amountPerServing: tAmountPerServing,
    calories: tCalories,
    dailyValue: tDailyValue,
    totalFat: tTotalFat,
    saturatedFat: tSaturatedFat,
    transFat: tTransFat,
    cholesterol: tCholesterol,
    sodium: tSodium,
    totalCarbohydrate: tTotalCarbohydrate,
    dietaryFiber: tDietaryFiber,
    totalSugars: tTotalSugars,
    includes: tIncludes,
    addedSugars: tAddedSugars,
    protein: tProtein,
    vitaminD: tVitaminD,
    calcium: tCalcium,
    iron: tIron,
    potassium: tPotassium,
    footnote: tFootnote,
  } = useAppTranslations(locale).nutritionFacts;

  return (
    <section className={styles.label}>
      <div className={styles.rowBorderBottom}>
        <h3 className={styles.title}>{tTitle}</h3>
      </div>
      <div className={styles.rowBorderBottomThicker}>
        <p className={styles.fontMd}>
          {servingsValue} {tServingsPerRecipe}
        </p>
      </div>
      <div className={`${styles.row} ${styles.paddingBottom0}`}>
        <p className={styles.fontBlack}>{tAmountPerServing}</p>
      </div>
      <div
        className={`${styles.rowAlignEndBorderBottomThick} ${styles.paddingTop0}`}
      >
        <p className={styles.fontBlackMd}>{tCalories}</p>
        <p className={styles.fontBlackLg}>{calories.amount}</p>
      </div>
      <div className={styles.rowJustifyEndBorderBottom}>
        <p className={styles.fontBlack}>% {tDailyValue}*</p>
      </div>
      <div className={styles.rowBorderBottom}>
        <p>
          <span className={styles.fontBlack}>{tTotalFat}</span>{' '}
          {totalFat.amount}
        </p>
        <p className={styles.fontBlack}>{totalFat.dailyValuePct}</p>
      </div>
      <div className={`${styles.rowBorderBottom} ${styles.indent1}`}>
        <p>
          {tSaturatedFat} {saturatedFat.amount}
        </p>
        <p className={styles.fontBlack}>{saturatedFat.dailyValuePct}</p>
      </div>
      <div className={`${styles.rowBorderBottom} ${styles.indent1}`}>
        <p>
          {tTransFat} {transFat.amount}
        </p>
      </div>
      <div className={styles.rowBorderBottom}>
        <p>
          <span className={styles.fontBlack}>{tCholesterol}</span>{' '}
          {cholesterol.amount}
        </p>
        <p className={styles.fontBlack}>{cholesterol.dailyValuePct}</p>
      </div>
      <div className={styles.rowBorderBottom}>
        <p>
          <span className={styles.fontBlack}>{tSodium}</span> {sodium.amount}
        </p>
        <p className={styles.fontBlack}>{sodium.dailyValuePct}</p>
      </div>
      <div className={styles.rowBorderBottom}>
        <p>
          <span className={styles.fontBlack}>{tTotalCarbohydrate}</span>{' '}
          {totalCarbohydrate.amount}
        </p>
        <p className={styles.fontBlack}>{totalCarbohydrate.dailyValuePct}</p>
      </div>
      <div className={`${styles.rowBorderBottom} ${styles.indent1}`}>
        <p>
          {tDietaryFiber} {dietaryFiber.amount}
        </p>
        <p className={styles.fontBlack}>{dietaryFiber.dailyValuePct}</p>
      </div>
      <div className={`${styles.rowBorderBottom} ${styles.marginIndent2}`}>
        <p className={styles.totalSugars}>
          {tTotalSugars} {totalSugars.amount}
        </p>
      </div>
      <div className={`${styles.rowBorderBottom} ${styles.indent2}`}>
        <p>
          {tIncludes} {addedSugars.amount} {tAddedSugars}
        </p>
        <p className={styles.fontBlack}>{addedSugars.dailyValuePct}</p>
      </div>
      <div className={styles.rowBorderBottomThicker}>
        <p>
          <span className={styles.fontBlack}>{tProtein}</span> {protein.amount}
        </p>
      </div>
      <div className={styles.rowBorderBottom}>
        <p>
          {tVitaminD} {vitaminD.amount}
        </p>
        <p>{vitaminD.dailyValuePct}</p>
      </div>
      <div className={styles.rowBorderBottom}>
        <p>
          {tCalcium} {calcium.amount}
        </p>
        <p>{calcium.dailyValuePct}</p>
      </div>
      <div className={styles.rowBorderBottom}>
        <p>
          {tIron} {iron.amount}
        </p>
        <p>{iron.dailyValuePct}</p>
      </div>
      <div className={styles.rowBorderBottomThick}>
        <p>
          {tPotassium} {potassium.amount}
        </p>
        <p>{potassium.dailyValuePct}</p>
      </div>
      <div className={styles.dailyValueFootnote}>
        <p>*</p>
        <p className={styles.marginLeft}>{tFootnote}</p>
      </div>
    </section>
  );
}
