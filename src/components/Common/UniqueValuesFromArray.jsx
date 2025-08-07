const UniqueValuesFromArray = (arr, key) => {
  const uniqueSet = new Set(arr.map((item) => item?.[key]));
  return [...uniqueSet];
};

export default UniqueValuesFromArray;
