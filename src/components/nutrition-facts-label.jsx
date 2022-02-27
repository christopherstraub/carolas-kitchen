import React from 'react';
import round from '../utils/numbers';
import * as styles from './nutrition-facts-label.module.scss';

/**
 * Source: https://www.fda.gov/food/new-nutrition-facts-label/daily-value-new-nutrition-and-supplement-facts-labels
 * Current as of 2020-05-05.
 * Updated 2022-02-21.
 */
const DAILY_VALUES = {
  CALORIES: 2000,
  TOTAL_FAT: 78,
  SATURATED_FAT: 20,
  CHOLESTEROL: 300,
  SODIUM: 2300,
  TOTAL_CARBOHYDRATE: 275,
  DIETARY_FIBER: 28,
  ADDED_SUGARS: 50,
  VITAMIN_D: 20,
  CALCIUM: 1300,
  IRON: 18,
  POTASSIUM: 4700,
};

const NUTRIENTS = {
  CALORIES: {
    NAME: 'calories',
    ID: 208,
  },
  TOTAL_FAT: {
    NAME: 'totalFat',
    ID: 204,
    UNIT: 'g',
    DAILY_VALUE_KEY: 'TOTAL_FAT',
  },
  SATURATED_FAT: {
    NAME: 'saturatedFat',
    ID: 606,
    UNIT: 'g',
    DAILY_VALUE_KEY: 'SATURATED_FAT',
  },
  TRANS_FAT: {
    NAME: 'transFat',
    ID: 605,
    UNIT: 'g',
  },
  CHOLESTEROL: {
    NAME: 'cholesterol',
    ID: 601,
    UNIT: 'mg',
    DAILY_VALUE_KEY: 'CHOLESTEROL',
  },
  SODIUM: {
    NAME: 'sodium',
    ID: 307,
    UNIT: 'mg',
    DAILY_VALUE_KEY: 'SODIUM',
  },
  TOTAL_CARBOHYDRATE: {
    NAME: 'totalCarbohydrate',
    ID: 205,
    UNIT: 'g',
    DAILY_VALUE_KEY: 'TOTAL_CARBOHYDRATE',
  },
  DIETARY_FIBER: {
    NAME: 'dietaryFiber',
    ID: 291,
    UNIT: 'g',
    DAILY_VALUE_KEY: 'DIETARY_FIBER',
  },
  TOTAL_SUGARS: {
    NAME: 'totalSugars',
    ID: 269,
    UNIT: 'g',
  },
  ADDED_SUGARS: {
    NAME: 'addedSugars',
    ID: 10009,
    UNIT: 'g',
    DAILY_VALUE_KEY: 'ADDED_SUGARS',
  },
  PROTEIN: {
    NAME: 'protein',
    ID: 203,
    UNIT: 'g',
  },

  /**
   * Vitamin D is received in IU; this unit must be converted to mcg.
   * Conversion factor: 1 IU Vitamin D = 0.025 mcg Vitamin D.
   */
  VITAMIN_D: {
    ID: 324,
    NAME: 'vitaminD',
    CONVERSION_FACTOR: 0.025,
    UNIT: 'mcg',
    DAILY_VALUE_KEY: 'VITAMIN_D',
  },
  CALCIUM: {
    ID: 301,
    NAME: 'calcium',
    UNIT: 'mg',
    DAILY_VALUE_KEY: 'CALCIUM',
  },
  IRON: {
    ID: 303,
    NAME: 'iron',
    UNIT: 'mg',
    DAILY_VALUE_KEY: 'IRON',
  },
  POTASSIUM: {
    ID: 306,
    NAME: 'potassium',
    UNIT: 'mg',
    DAILY_VALUE_KEY: 'POTASSIUM',
  },
};

/**
 *
 * @param {number} id The id of the nutrient to get.
 * @param {number} conversionFactor The conversion factor (if the unit of the
 * value received does not coincide with the unit specified in DAILY_VALUES).
 * @param {Array<Object>} nutrients The array of nutrient objects.
 * @param {number} servings The servings per recipe.
 * @returns {number} The value of the nutrient.
 */
function getNutrientValue(id, conversionFactor, nutrients, servings) {
  return (
    (nutrients.find((nutrient) => nutrient.id === id).amount / servings) *
    (conversionFactor || 1)
  );
}

/**
 *
 * @param {string} DAILY_VALUE_KEY The DAILY_VALUES key that corresponds
 * to the nutrient.
 * @param {number} nutrientValue The value of the nutrient.
 * @returns The daily value percentage string or null if the nutrient should
 * not specify a daily value percentage.
 */
function getNutrientDailyValuePct(DAILY_VALUE_KEY, nutrientValue) {
  return DAILY_VALUES[DAILY_VALUE_KEY]
    ? round((nutrientValue / DAILY_VALUES[DAILY_VALUE_KEY]) * 100, 0)
        .toString()
        .concat('%')
    : null;
}

/**
 *
 * @param {Array<Object>} nutrients The array of nutrient objects.
 * @param {number} servings The servings per recipe.
 * @returns {Object} The nutrient values to be displayed on the label.
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
        NUTRIENT.NAME,
        {
          amount: round(nutrientValue)
            .toString()
            .concat(NUTRIENT.UNIT ?? ''),
          dailyValuePct: getNutrientDailyValuePct(
            NUTRIENT.DAILY_VALUE_KEY,
            nutrientValue
          ),
        },
      ];
    })
  );
}

export default function NutritionFactsLabel({
  nutrients,
  initialServingsValue,
  servingsValue,
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

  return (
    <section className={styles.label}>
      <h3 className={styles.fontBlackLg}>Nutrition Facts</h3>
      <div className={styles.line} />
      <p className={styles.fontMd}>{servingsValue} servings per recipe</p>
      <div className={styles.lineThicker} />
      <p className={styles.fontBlack}>Amount per serving</p>
      <div className={styles.row}>
        <p className={`${styles.fontBlackMd} ${styles.alignSelfEnd}`}>
          Calories
        </p>
        <p className={`${styles.fontBlackLg} ${styles.textRight}`}>
          {calories.amount}
        </p>
      </div>
      <div className={styles.lineThick} />
      <p className={`${styles.fontBlack} ${styles.textRight}`}>
        % Daily Value*
      </p>
      <div className={styles.line} />
      <div className={styles.row}>
        <p>
          <span className={styles.fontBlack}>Total Fat</span> {totalFat.amount}
        </p>
        <p className={styles.textRight}>{totalFat.dailyValuePct}</p>
      </div>
      <div className={styles.line} />
      <div className={styles.rowIndent1}>
        <p>Saturated Fat {saturatedFat.amount}</p>
        <p className={styles.textRight}>{saturatedFat.dailyValuePct}</p>
      </div>
      <div className={styles.line} />
      <div className={styles.rowIndent1}>
        <p>Trans Fat {transFat.amount}</p>
      </div>
      <div className={styles.line} />
      <div className={styles.row}>
        <p>
          <span className={styles.fontBlack}>Cholesterol</span>{' '}
          {cholesterol.amount}
        </p>
        <p className={styles.textRight}>{cholesterol.dailyValuePct}</p>
      </div>
      <div className={styles.line} />
      <div className={styles.row}>
        <p>
          <span className={styles.fontBlack}>Sodium</span> {sodium.amount}
        </p>
        <p className={styles.textRight}>{sodium.dailyValuePct}</p>
      </div>
      <div className={styles.line} />
      <div className={styles.row}>
        <p>
          <span className={styles.fontBlack}>Total Carbohydrate</span>{' '}
          {totalCarbohydrate.amount}
        </p>
        <p className={styles.textRight}>{totalCarbohydrate.dailyValuePct}</p>
      </div>
      <div className={styles.line} />
      <div className={styles.rowIndent1}>
        <p>Dietary Fiber {dietaryFiber.amount}</p>
        <p className={styles.textRight}>{dietaryFiber.dailyValuePct}</p>
      </div>
      <div className={styles.line} />
      <div className={styles.rowIndent1}>
        <p>Total Sugars {totalSugars.amount}</p>
      </div>
      <div className={styles.lineIndent} />
      <div className={styles.rowIndent2}>
        <p>Includes {addedSugars.amount} Added Sugars</p>
        <p>{addedSugars.dailyValuePct}</p>
      </div>
      <div className={styles.line} />
      <div>
        <p>
          <span className={styles.fontBlack}>Protein</span> {protein.amount}
        </p>
      </div>
      <div className={styles.lineThicker} />
      <div className={styles.row}>
        <p>Vitamin D {vitaminD.amount}</p>
        <p className={styles.textRight}>{vitaminD.dailyValuePct}</p>
      </div>
      <div className={styles.line} />
      <div className={styles.row}>
        <p>Calcium {calcium.amount}</p>
        <p className={styles.textRight}>{calcium.dailyValuePct}</p>
      </div>
      <div className={styles.line} />
      <div className={styles.row}>
        <p>Iron {iron.amount}</p>
        <p className={styles.textRight}>{iron.dailyValuePct}</p>
      </div>
      <div className={styles.line} />
      <div className={styles.row}>
        <p>Potassium {potassium.amount}</p>
        <p className={styles.textRight}>{potassium.dailyValuePct}</p>
      </div>
      <div className={styles.lineThick} />
      <div className={`${styles.row} ${styles.fontSm}`}>
        <p>*</p>
        <p className={styles.marginLeft}>
          The % Daily Value (DV) tells you how much a nutrient in a serving of
          food contributes to a daily diet. 2,000 calories a day is used for
          general nutrition advice.
        </p>
      </div>
    </section>
  );
}
