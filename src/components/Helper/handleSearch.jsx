// Helper function
export const handleSearchChange = (setSearchTerm) => (event) => {
  setSearchTerm(event.target.value);
};

export const searchFilter = (data, searchTerm, searchFields, initialData) => {
  return data
    ? data.filter((item) => {
        const normalizedSearchTerm = searchTerm.toLowerCase();
        return searchFields.some((field) =>
          item[field].toLowerCase().includes(normalizedSearchTerm)
        );
      })
    : initialData;
};

export const checkLocation = (depart, arrival) => {
  if (depart.slice(-2) === 'BD' && arrival.slice(-2) === 'BD') {
    return 'Domestic';
  } else {
    return 'International';
  }
};
