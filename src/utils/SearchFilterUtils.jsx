// SearchFilterUtils.jsx

/**
 * Extracts a list of { index, value } from any array of field-like objects.
 * Filters out fields with null, undefined, or empty string values.
 *
 * @param {Array} fields - An array of field objects (with at least `index` and `value`).
 * @returns {Array<{ index: string, value: any }>}
 */
export function getSearchFilterArray(fields) {
  if (!Array.isArray(fields)) {
    console.warn('getSearchFilterArray: Expected an array, received:', typeof fields);
    return [];
  }

  return fields
    .filter(
      (field) =>
        field &&
        typeof field.index === 'string'
    )
    .map((field) => ({
      index: field.index,
      value: field.value
    }));
}

/**
 * Converts search fields into a key-value object.
 * Example: [{ index: 'lrn', value: '22333' }] => { lrn: '22333' }
 *
 * @param {Array} fields
 * @returns {Object} - Plain object with key-value pairs.
 */
export function getSearchFilterObject(fields) {
  const result = {};

  if (!Array.isArray(fields)) {
    console.warn('getSearchFilterObject: Expected an array, received:', typeof fields);
    return result;
  }

  fields.forEach((field) => {
    if (
      field &&
      typeof field.index === 'string' &&
      field.value !== null &&
      field.value !== ''
    ) {
      result[field.index] = field.value;
    }
  });

  return result;
}

// Optional: default export to allow import * as SearchFilterUtils
export default {
  getSearchFilterArray,
  getSearchFilterObject
};
