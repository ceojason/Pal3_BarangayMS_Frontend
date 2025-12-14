export const EnrolleeTypeEnum = {
  DEFAULT: { key: 0, value: '', isRegular: false },
  NEW_ENROLLEE: { key: 1, value: 'New Enrollee', isRegular: true },
  OLD_ENROLLEE: { key: 2, value: 'Old Enrollee', isRegular: false },
  TRANSFEREE: { key: 3, value: 'Transferee Enrollee', isRegular: false },
  FOREIGN: { key: 4, value: 'Foreign Enrollee', isRegular: true }
};

// Optional: Return a sorted list of values
export const getSortedEnrolleeTypeList = () =>
  Object.values(EnrolleeTypeEnum).sort((a, b) =>
    a.value.localeCompare(b.value)
  );