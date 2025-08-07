export const convertToDesiredFormat = (str) => {
  // Remove single quotes, commas, and spaces
  const cleanedStr = str.replace(/[',\s]/g, '');

  // Insert space before 'Airport' if it's not already present
  const formattedStr = cleanedStr.replace(/(Airport)$/i, ' $1');

  // Capitalize first letter of each word
  const capitalizedStr = formattedStr.replace(/\b\w/g, (match) =>
    match.toUpperCase()
  );

  return capitalizedStr;
};
