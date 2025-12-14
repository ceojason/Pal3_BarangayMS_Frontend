import classNames from 'classnames';

/**
 * Returns combined class names
 * @param {string} baseClass - Required base class
 * @param {string|string[]} customClass - Optional extra classes
 * @returns {string}
 */
export const buildClassNames = (...classes) => {
  return classNames(...classes);
};